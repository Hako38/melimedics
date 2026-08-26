import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/_server/hair-consultations/core.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }, fileName: "core.ts" }).outputText;
const core = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const validInput = (overrides = {}) => ({
  ageRange: "30-39", duration: "1-3-years", affectedAreas: ["hairline"], progression: "slowly-years", ongoingLoss: "yes",
  previousTreatments: ["none"], interest: ["consultation"], desiredTimeframe: "later", firstName: "Test", lastName: "Person",
  email: "test@example.com", phone: "+49 6131 1234567", consentContact: true, consentPhotos: false, source: "website_hair_check", spamTrap: "", ...overrides,
});

const pngBytes = () => new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
const makePhoto = (overrides = {}) => ({ slot: "front", mediaType: "image/png", bytes: pngBytes(), ...overrides });

function harness(options = {}) {
  const records = new Map();
  const files = new Map();
  const tombstones = [];
  let now = new Date("2026-08-26T10:00:00.000Z");
  let idCounter = 0;
  const repository = {
    async create(record) { if (options.repositoryFails) throw new Error("repository"); records.set(record.id, structuredClone(record)); },
    async getById(id) { return records.get(id) ? structuredClone(records.get(id)) : null; },
    async update(record) { records.set(record.id, structuredClone(record)); },
    async findCreatedBefore(cutoff) { return [...records.values()].filter((record) => record.createdAt < cutoff).map(structuredClone); },
    async deleteWithTombstone(receipt) { tombstones.push(receipt); records.delete(receipt.id); },
  };
  const storage = {
    deleted: [],
    async put(input) { if (options.storageFails) throw new Error("storage"); const id = `photo-${++idCounter}-00000000000000`; const ref = { id, slot: input.slot, mediaType: input.mediaType, size: input.bytes.length, createdAt: now.toISOString() }; files.set(id, ref); return ref; },
    async delete(reference) { if (options.deleteFails) throw new Error("delete"); storage.deleted.push(reference.id); files.delete(reference.id); },
  };
  const notifier = { async notify() { if (options.notifierFails) throw new Error("mail"); return { delivered: true }; } };
  const scanner = { configured: options.scannerConfigured ?? true, async scan() { return { safe: options.scanSafe ?? true }; } };
  const service = core.createConsultationService({ repository, storage, notifier, scanner, config: { maxFileSize: 5 * 1024 * 1024, retentionDays: options.retentionDays ?? 30, contactConsentVersion: "contact-v-test", photoConsentVersion: "photo-v-test", requireMalwareScan: options.requireMalwareScan ?? true }, now: () => now, createId: () => `consultation-${++idCounter}-0000000` });
  return { service, records, files, tombstones, storage, setNow: (value) => { now = new Date(value); } };
}

test("valid submission stores a structured non-diagnostic record and consent versions", async () => {
  const h = harness();
  const record = await h.service.createConsultation(validInput(), []);
  assert.equal(record.status, "submitted");
  assert.equal(record.medicalReviewStatus, "pending");
  assert.equal(record.contactName, "Test Person");
  assert.equal(record.consentRecords[0].textVersion, "contact-v-test");
  assert.deepEqual(record.photoReferences, []);
  assert.ok(!("diagnosis" in record));
});

test("invalid submission rejects missing consent and malformed email", async () => {
  const h = harness();
  await assert.rejects(() => h.service.createConsultation(validInput({ consentContact: false, email: "invalid" }), []), (error) => error.code === "validation_failed" && error.fields.includes("consentContact") && error.fields.includes("email"));
  assert.equal(h.records.size, 0);
});

test("file validation checks magic bytes, MIME type and size", () => {
  assert.equal(core.validateIncomingPhotos([makePhoto()], 100).ok, true);
  assert.equal(core.validateIncomingPhotos([makePhoto({ mediaType: "image/jpeg" })], 100).ok, false);
  assert.equal(core.validateIncomingPhotos([makePhoto({ bytes: new Uint8Array([1, 2, 3]) })], 100).ok, false);
  assert.equal(core.validateIncomingPhotos([makePhoto()], 5).ok, false);
});

test("upload and repository failures leave no successful record or orphaned photo", async () => {
  const uploadFailure = harness({ storageFails: true });
  await assert.rejects(() => uploadFailure.service.createConsultation(validInput({ consentPhotos: true }), [makePhoto()]), (error) => error.code === "storage_error");
  assert.equal(uploadFailure.records.size, 0);

  const repositoryFailure = harness({ repositoryFails: true });
  await assert.rejects(() => repositoryFailure.service.createConsultation(validInput({ consentPhotos: true }), [makePhoto()]), (error) => error.code === "storage_error");
  assert.equal(repositoryFailure.files.size, 0);
  assert.equal(repositoryFailure.storage.deleted.length, 1);
});

test("required scanner fails closed while an optional mail failure preserves success", async () => {
  const scannerMissing = harness({ scannerConfigured: false });
  await assert.rejects(() => scannerMissing.service.createConsultation(validInput({ consentPhotos: true }), [makePhoto()]), (error) => error.code === "scanner_unavailable");
  const mailMissing = harness({ notifierFails: true });
  const record = await mailMissing.service.createConsultation(validInput(), []);
  assert.ok(mailMissing.records.has(record.id));
});

test("photo and consultation deletion remove private files and leave a minimal tombstone", async () => {
  const h = harness();
  let record = await h.service.createConsultation(validInput({ consentPhotos: true }), [makePhoto()]);
  const firstReference = record.photoReferences[0];
  record = await h.service.deletePhoto(record.id, firstReference.id);
  assert.equal(record.photoReferences.length, 0);
  record = await h.service.attachPhoto(record.id, makePhoto({ slot: "back" }));
  assert.equal(record.photoReferences[0].slot, "back");
  const receipt = await h.service.deleteConsultation(record.id);
  assert.equal(receipt.deletedPhotoCount, 1);
  assert.equal(h.records.size, 0);
  assert.deepEqual(Object.keys(h.tombstones[0]).sort(), ["deletedAt", "deletedPhotoCount", "id"]);
});

test("retention deletes only consultations older than the configured cutoff", async () => {
  const h = harness();
  const old = await h.service.createConsultation(validInput({ email: "old@example.com" }), []);
  h.setNow("2026-10-01T10:00:00.000Z");
  const current = await h.service.createConsultation(validInput({ email: "current@example.com" }), []);
  const deleted = await h.service.deleteExpiredConsultations();
  assert.deepEqual(deleted.map(({ id }) => id), [old.id]);
  assert.ok(h.records.has(current.id));
});

test("retention remains disabled until an explicit legal duration is configured", async () => {
  const h = harness({ retentionDays: 0 });
  const record = await h.service.createConsultation(validInput(), []);
  h.setNow("2036-08-26T10:00:00.000Z");
  assert.deepEqual(await h.service.deleteExpiredConsultations(), []);
  assert.ok(h.records.has(record.id));
});
