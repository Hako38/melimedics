import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ConsultationRepository, DeletionReceipt, HairConsultation, PhotoReference, PrivateFileStorage, StoredMediaType } from "./core";

const safeId = (value: string) => /^[a-f0-9-]{20,64}$/i.test(value);

async function ensurePrivateDirectory(directory: string) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
}

async function atomicJsonWrite(filePath: string, value: unknown) {
  const temporary = `${filePath}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(value), { encoding: "utf8", mode: 0o600, flag: "wx" });
  await rename(temporary, filePath);
}

export class FileSystemConsultationRepository implements ConsultationRepository {
  private readonly recordsDirectory: string;
  private readonly tombstonesDirectory: string;

  constructor(baseDirectory: string) {
    this.recordsDirectory = path.resolve(baseDirectory, "consultations");
    this.tombstonesDirectory = path.resolve(baseDirectory, "deletions");
  }

  private recordPath(id: string) {
    if (!safeId(id)) throw new Error("invalid identifier");
    return path.join(this.recordsDirectory, `${id}.json`);
  }

  async create(record: HairConsultation) {
    await ensurePrivateDirectory(this.recordsDirectory);
    const filePath = this.recordPath(record.id);
    await writeFile(filePath, JSON.stringify(record), { encoding: "utf8", mode: 0o600, flag: "wx" });
  }

  async getById(id: string) {
    try {
      return JSON.parse(await readFile(this.recordPath(id), "utf8")) as HairConsultation;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw error;
    }
  }

  async update(record: HairConsultation) {
    await ensurePrivateDirectory(this.recordsDirectory);
    await atomicJsonWrite(this.recordPath(record.id), record);
  }

  async findCreatedBefore(isoDate: string) {
    await ensurePrivateDirectory(this.recordsDirectory);
    const records: HairConsultation[] = [];
    for (const fileName of await readdir(this.recordsDirectory)) {
      if (!/^[a-f0-9-]{20,64}\.json$/i.test(fileName)) continue;
      try {
        const record = JSON.parse(await readFile(path.join(this.recordsDirectory, fileName), "utf8")) as HairConsultation;
        if (record.createdAt < isoDate) records.push(record);
      } catch {
        // Corrupt records are not exposed and require controlled operator review.
      }
    }
    return records;
  }

  async deleteWithTombstone(receipt: DeletionReceipt) {
    await ensurePrivateDirectory(this.tombstonesDirectory);
    await atomicJsonWrite(path.join(this.tombstonesDirectory, `${receipt.id}.json`), receipt);
    try { await unlink(this.recordPath(receipt.id)); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }
}

export class FileSystemPrivateFileStorage implements PrivateFileStorage {
  private readonly filesDirectory: string;

  constructor(baseDirectory: string, private readonly now: () => Date = () => new Date()) {
    this.filesDirectory = path.resolve(baseDirectory, "private-files");
  }

  private filePath(id: string, mediaType: StoredMediaType) {
    if (!safeId(id)) throw new Error("invalid identifier");
    return path.join(this.filesDirectory, `${id}${mediaType === "image/jpeg" ? ".jpg" : ".png"}`);
  }

  async put(input: Parameters<PrivateFileStorage["put"]>[0]) {
    await ensurePrivateDirectory(this.filesDirectory);
    const id = randomUUID();
    await writeFile(this.filePath(id, input.mediaType), input.bytes, { mode: 0o600, flag: "wx" });
    return { id, slot: input.slot, mediaType: input.mediaType, size: input.bytes.length, createdAt: this.now().toISOString() } satisfies PhotoReference;
  }

  async delete(reference: PhotoReference) {
    try { await unlink(this.filePath(reference.id, reference.mediaType)); }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  }
}
