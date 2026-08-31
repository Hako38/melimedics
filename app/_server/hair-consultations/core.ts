export type ConsultationStatus = "submitted" | "reviewing" | "contacted" | "closed";
export type MedicalReviewStatus = "pending" | "in_review" | "completed";
export type PhotoSlot = "front" | "top" | "left" | "right" | "back";
export type StoredMediaType = "image/jpeg" | "image/png";

export type HairConsultationInput = {
  ageRange: string;
  gender?: string;
  duration: string;
  affectedAreas: string[];
  progression: string;
  ongoingLoss: string;
  previousTreatments: string[];
  previousTreatmentNote?: string;
  interest: string[];
  desiredTimeframe: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact?: string;
  message?: string;
  consentContact: true;
  consentPhotos: boolean;
  source: "website_hair_check";
  spamTrap?: string;
};

export type IncomingPhoto = {
  slot: PhotoSlot;
  mediaType: string;
  bytes: Uint8Array;
};

export type PhotoReference = {
  id: string;
  slot: PhotoSlot;
  mediaType: StoredMediaType;
  size: number;
  createdAt: string;
};

export type ConsentRecord = {
  type: "contact" | "photos";
  accepted: boolean;
  acceptedAt: string | null;
  textVersion: string;
};

export type HairConsultation = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ConsultationStatus;
  ageRange: string;
  gender?: string;
  duration: string;
  affectedAreas: string[];
  progression: string;
  ongoingLoss: string;
  previousTreatments: string[];
  previousTreatmentNote?: string;
  interest: string[];
  desiredTimeframe: string;
  firstName: string;
  lastName: string;
  contactName: string;
  email: string;
  phone: string;
  preferredContact?: string;
  message?: string;
  consentContact: true;
  consentPhotos: boolean;
  consentRecords: ConsentRecord[];
  photoReferences: PhotoReference[];
  source: "website_hair_check";
  medicalReviewStatus: MedicalReviewStatus;
  deletionStatus: "active" | "pending";
};

export type DeletionReceipt = { id: string; deletedAt: string; deletedPhotoCount: number };

export interface ConsultationRepository {
  create(record: HairConsultation): Promise<void>;
  getById(id: string): Promise<HairConsultation | null>;
  update(record: HairConsultation): Promise<void>;
  findCreatedBefore(isoDate: string): Promise<HairConsultation[]>;
  deleteWithTombstone(receipt: DeletionReceipt): Promise<void>;
}

export interface PrivateFileStorage {
  put(input: { consultationId: string; slot: PhotoSlot; mediaType: StoredMediaType; bytes: Uint8Array }): Promise<PhotoReference>;
  delete(reference: PhotoReference): Promise<void>;
}

export interface ConsultationNotifier {
  notify(input: { consultation: HairConsultation }): Promise<{ delivered: boolean }>;
}

export interface FileContentScanner {
  readonly configured: boolean;
  scan(input: { mediaType: StoredMediaType; bytes: Uint8Array }): Promise<{ safe: boolean }>;
}

export type ConsultationServiceConfig = {
  maxFileSize: number;
  retentionDays: number;
  contactConsentVersion: string;
  photoConsentVersion: string;
  requireMalwareScan: boolean;
};

export type ConsultationServiceDependencies = {
  repository: ConsultationRepository;
  storage: PrivateFileStorage;
  notifier: ConsultationNotifier;
  scanner: FileContentScanner;
  config: ConsultationServiceConfig;
  now: () => Date;
  createId: () => string;
};

export type ConsultationErrorCode = "validation_failed" | "upload_failed" | "storage_error" | "scanner_unavailable" | "not_found" | "delete_failed";

export class ConsultationServiceError extends Error {
  constructor(public readonly code: ConsultationErrorCode, public readonly fields: string[] = []) {
    super(code);
    this.name = "ConsultationServiceError";
  }
}

const allowed = {
  ageRange: new Set(["under-20", "20-29", "30-39", "40-49", "50-plus"]),
  gender: new Set(["female", "male", "diverse", "no-answer"]),
  duration: new Set(["under-6-months", "6-12-months", "1-3-years", "over-3-years", "unsure"]),
  affectedAreas: new Set(["temples", "hairline", "top", "crown", "diffuse", "multiple", "unsure"]),
  progression: new Set(["slowly-years", "recently-stronger", "stable", "hard-to-judge"]),
  ongoingLoss: new Set(["yes", "no-stable", "unsure"]),
  previousTreatments: new Set(["prp-prf", "transplant", "medical", "cosmetic", "none", "other"]),
  interest: new Set(["understand-cause", "prp", "transplant", "combination", "consultation", "unsure"]),
  desiredTimeframe: new Set(["soon", "1-3-months", "later", "information"]),
  preferredContact: new Set(["email", "phone", "no-preference"]),
  photoSlots: new Set<PhotoSlot>(["front", "top", "left", "right", "back"]),
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const cleanString = (value: unknown, max: number) => typeof value === "string" && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null;
const cleanOptionalString = (value: unknown, max: number) => value === undefined || value === "" ? undefined : cleanString(value, max) ?? null;
const cleanEnum = (value: unknown, values: Set<string>) => typeof value === "string" && values.has(value) ? value : null;
const cleanArray = (value: unknown, values: Set<string>, maxItems = 8) => Array.isArray(value) && value.length > 0 && value.length <= maxItems && value.every((item) => typeof item === "string" && values.has(item)) ? [...new Set(value as string[])] : null;
const validEmail = (value: string) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validPhone = (value: string) => /^\d{7,15}$/.test(value.replace(/[\s()+./-]/g, ""));

export function parseConsultationInput(value: unknown, hasPhotos: boolean): { ok: true; value: HairConsultationInput } | { ok: false; fields: string[] } {
  if (!isRecord(value)) return { ok: false, fields: ["payload"] };
  const fields: string[] = [];
  const ageRange = cleanEnum(value.ageRange, allowed.ageRange) ?? (fields.push("ageRange"), "");
  const gender = value.gender == null ? undefined : cleanEnum(value.gender, allowed.gender) ?? (fields.push("gender"), undefined);
  const duration = cleanEnum(value.duration, allowed.duration) ?? (fields.push("duration"), "");
  const affectedAreas = cleanArray(value.affectedAreas, allowed.affectedAreas) ?? (fields.push("affectedAreas"), []);
  const progression = cleanEnum(value.progression, allowed.progression) ?? (fields.push("progression"), "");
  const ongoingLoss = cleanEnum(value.ongoingLoss, allowed.ongoingLoss) ?? (fields.push("ongoingLoss"), "");
  const previousTreatments = cleanArray(value.previousTreatments, allowed.previousTreatments) ?? (fields.push("previousTreatments"), []);
  const previousTreatmentNote = cleanOptionalString(value.previousTreatmentNote, 240);
  if (previousTreatmentNote === null) fields.push("previousTreatmentNote");
  const interest = cleanArray(value.interest, allowed.interest) ?? (fields.push("interest"), []);
  const desiredTimeframe = cleanEnum(value.desiredTimeframe, allowed.desiredTimeframe) ?? (fields.push("desiredTimeframe"), "");
  const firstName = cleanString(value.firstName, 80) ?? (fields.push("firstName"), "");
  const lastName = cleanString(value.lastName, 80) ?? (fields.push("lastName"), "");
  const email = cleanString(value.email, 254) ?? (fields.push("email"), "");
  if (email && !validEmail(email)) fields.push("email");
  const phone = cleanString(value.phone, 32) ?? (fields.push("phone"), "");
  if (phone && !validPhone(phone)) fields.push("phone");
  const preferredContact = value.preferredContact == null ? undefined : cleanEnum(value.preferredContact, allowed.preferredContact) ?? (fields.push("preferredContact"), undefined);
  const message = cleanOptionalString(value.message, 800);
  if (message === null) fields.push("message");
  if (value.consentContact !== true) fields.push("consentContact");
  if (hasPhotos && value.consentPhotos !== true) fields.push("consentPhotos");
  if (value.source !== "website_hair_check") fields.push("source");
  if (typeof value.spamTrap === "string" && value.spamTrap.length > 0) fields.push("spamTrap");
  if (fields.length) return { ok: false, fields: [...new Set(fields)] };
  return { ok: true, value: { ageRange, gender, duration, affectedAreas, progression, ongoingLoss, previousTreatments, previousTreatmentNote: previousTreatmentNote ?? undefined, interest, desiredTimeframe, firstName, lastName, email, phone, preferredContact, message: message ?? undefined, consentContact: true, consentPhotos: hasPhotos, source: "website_hair_check", spamTrap: "" } };
}

export function detectImageMediaType(bytes: Uint8Array): StoredMediaType | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (bytes.length >= png.length && png.every((byte, index) => bytes[index] === byte)) return "image/png";
  return null;
}

export function validateIncomingPhotos(photos: IncomingPhoto[], maxFileSize: number): { ok: true; photos: (IncomingPhoto & { mediaType: StoredMediaType })[] } | { ok: false; fields: string[] } {
  if (photos.length > 5) return { ok: false, fields: ["photos"] };
  const seen = new Set<PhotoSlot>();
  const fields: string[] = [];
  const validated: (IncomingPhoto & { mediaType: StoredMediaType })[] = [];
  for (const photo of photos) {
    const actualType = detectImageMediaType(photo.bytes);
    if (!allowed.photoSlots.has(photo.slot) || seen.has(photo.slot) || photo.bytes.length === 0 || photo.bytes.length > maxFileSize || !actualType || actualType !== photo.mediaType) {
      fields.push(`photo:${photo.slot}`);
      continue;
    }
    seen.add(photo.slot);
    validated.push({ ...photo, mediaType: actualType });
  }
  return fields.length ? { ok: false, fields } : { ok: true, photos: validated };
}

export function createConsultationService(deps: ConsultationServiceDependencies) {
  const createConsultation = async (rawInput: unknown, photos: IncomingPhoto[]) => {
    const parsed = parseConsultationInput(rawInput, photos.length > 0);
    if (!parsed.ok) throw new ConsultationServiceError("validation_failed", parsed.fields);
    const checkedPhotos = validateIncomingPhotos(photos, deps.config.maxFileSize);
    if (!checkedPhotos.ok) throw new ConsultationServiceError("upload_failed", checkedPhotos.fields);
    if (checkedPhotos.photos.length > 0 && deps.config.requireMalwareScan && !deps.scanner.configured) throw new ConsultationServiceError("scanner_unavailable");

    const id = deps.createId();
    const createdAt = deps.now().toISOString();
    const uploaded: PhotoReference[] = [];
    try {
      for (const photo of checkedPhotos.photos) {
        const scan = await deps.scanner.scan({ mediaType: photo.mediaType, bytes: photo.bytes });
        if (!scan.safe) throw new ConsultationServiceError("upload_failed", [`photo:${photo.slot}`]);
        uploaded.push(await deps.storage.put({ consultationId: id, slot: photo.slot, mediaType: photo.mediaType, bytes: photo.bytes }));
      }
    } catch (error) {
      await Promise.allSettled(uploaded.map((reference) => deps.storage.delete(reference)));
      if (error instanceof ConsultationServiceError) throw error;
      throw new ConsultationServiceError("storage_error");
    }

    const input = parsed.value;
    const record: HairConsultation = {
      id,
      createdAt,
      updatedAt: createdAt,
      status: "submitted",
      ageRange: input.ageRange,
      gender: input.gender,
      duration: input.duration,
      affectedAreas: input.affectedAreas,
      progression: input.progression,
      ongoingLoss: input.ongoingLoss,
      previousTreatments: input.previousTreatments,
      previousTreatmentNote: input.previousTreatmentNote,
      interest: input.interest,
      desiredTimeframe: input.desiredTimeframe,
      firstName: input.firstName,
      lastName: input.lastName,
      contactName: `${input.firstName} ${input.lastName}`,
      email: input.email,
      phone: input.phone,
      preferredContact: input.preferredContact,
      message: input.message,
      consentContact: true,
      consentPhotos: input.consentPhotos,
      consentRecords: [
        { type: "contact", accepted: true, acceptedAt: createdAt, textVersion: deps.config.contactConsentVersion },
        { type: "photos", accepted: input.consentPhotos, acceptedAt: input.consentPhotos ? createdAt : null, textVersion: deps.config.photoConsentVersion },
      ],
      photoReferences: uploaded,
      source: "website_hair_check",
      medicalReviewStatus: "pending",
      deletionStatus: "active",
    };
    try {
      await deps.repository.create(record);
    } catch {
      await Promise.allSettled(uploaded.map((reference) => deps.storage.delete(reference)));
      throw new ConsultationServiceError("storage_error");
    }
    try {
      await deps.notifier.notify({ consultation: record });
    } catch {
      // Notification is an optional side effect. The persisted submission remains valid.
    }
    return record;
  };

  const getConsultationById = (id: string) => deps.repository.getById(id);

  const updateConsultationStatus = async (id: string, status: ConsultationStatus) => {
    const record = await deps.repository.getById(id);
    if (!record) throw new ConsultationServiceError("not_found");
    const updated = { ...record, status, updatedAt: deps.now().toISOString() };
    await deps.repository.update(updated);
    return updated;
  };

  const attachPhoto = async (id: string, photo: IncomingPhoto) => {
    const record = await deps.repository.getById(id);
    if (!record) throw new ConsultationServiceError("not_found");
    if (!record.consentPhotos) throw new ConsultationServiceError("validation_failed", ["consentPhotos"]);
    const checked = validateIncomingPhotos([photo], deps.config.maxFileSize);
    if (!checked.ok) throw new ConsultationServiceError("upload_failed", checked.fields);
    if (deps.config.requireMalwareScan && !deps.scanner.configured) throw new ConsultationServiceError("scanner_unavailable");
    const candidate = checked.photos[0];
    const scan = await deps.scanner.scan({ mediaType: candidate.mediaType, bytes: candidate.bytes });
    if (!scan.safe) throw new ConsultationServiceError("upload_failed", [`photo:${candidate.slot}`]);
    let reference: PhotoReference;
    try { reference = await deps.storage.put({ consultationId: id, slot: candidate.slot, mediaType: candidate.mediaType, bytes: candidate.bytes }); }
    catch { throw new ConsultationServiceError("storage_error"); }
    const replaced = record.photoReferences.find((item) => item.slot === candidate.slot);
    const updated = { ...record, photoReferences: [...record.photoReferences.filter((item) => item.slot !== candidate.slot), reference], updatedAt: deps.now().toISOString() };
    try { await deps.repository.update(updated); }
    catch { await deps.storage.delete(reference).catch(() => undefined); throw new ConsultationServiceError("storage_error"); }
    if (replaced) await deps.storage.delete(replaced).catch(() => undefined);
    return updated;
  };

  const deletePhoto = async (id: string, referenceId: string) => {
    const record = await deps.repository.getById(id);
    if (!record) throw new ConsultationServiceError("not_found");
    const reference = record.photoReferences.find((item) => item.id === referenceId);
    if (!reference) throw new ConsultationServiceError("not_found");
    try { await deps.storage.delete(reference); }
    catch { throw new ConsultationServiceError("delete_failed"); }
    const updated = { ...record, photoReferences: record.photoReferences.filter((item) => item.id !== referenceId), updatedAt: deps.now().toISOString() };
    await deps.repository.update(updated);
    return updated;
  };

  const deleteConsultation = async (id: string): Promise<DeletionReceipt> => {
    const record = await deps.repository.getById(id);
    if (!record) throw new ConsultationServiceError("not_found");
    await deps.repository.update({ ...record, deletionStatus: "pending", updatedAt: deps.now().toISOString() });
    try { for (const reference of record.photoReferences) await deps.storage.delete(reference); }
    catch { throw new ConsultationServiceError("delete_failed"); }
    const receipt = { id, deletedAt: deps.now().toISOString(), deletedPhotoCount: record.photoReferences.length };
    await deps.repository.deleteWithTombstone(receipt);
    return receipt;
  };

  const deleteExpiredConsultations = async () => {
    if (deps.config.retentionDays <= 0) return [];
    const cutoff = new Date(deps.now().getTime() - deps.config.retentionDays * 86_400_000).toISOString();
    const expired = await deps.repository.findCreatedBefore(cutoff);
    const results = [];
    for (const record of expired) {
      try { results.push(await deleteConsultation(record.id)); }
      catch { /* A later retention run can retry pending records. */ }
    }
    return results;
  };

  return { createConsultation, getConsultationById, updateConsultationStatus, attachPhoto, deletePhoto, deleteConsultation, deleteExpiredConsultations };
}
