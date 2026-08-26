import "server-only";
import { randomUUID } from "node:crypto";
import { createConsultationService, type ConsultationNotifier, type ConsultationRepository, type FileContentScanner, type PrivateFileStorage } from "./core";
import { FileSystemConsultationRepository, FileSystemPrivateFileStorage } from "./filesystem";

class DisabledRepository implements ConsultationRepository {
  private unavailable(): never { throw new Error("repository unavailable"); }
  create(): Promise<void> { return Promise.reject(this.unavailable()); }
  getById(): Promise<null> { return Promise.reject(this.unavailable()); }
  update(): Promise<void> { return Promise.reject(this.unavailable()); }
  findCreatedBefore(): Promise<[]> { return Promise.reject(this.unavailable()); }
  deleteWithTombstone(): Promise<void> { return Promise.reject(this.unavailable()); }
}

class DisabledStorage implements PrivateFileStorage {
  put(): Promise<never> { return Promise.reject(new Error("storage unavailable")); }
  delete(): Promise<void> { return Promise.reject(new Error("storage unavailable")); }
}

class DisabledNotifier implements ConsultationNotifier {
  async notify() { return { delivered: false }; }
}

class UnconfiguredScanner implements FileContentScanner {
  readonly configured = false;
  async scan() { return { safe: true }; }
}

const integer = (value: string | undefined, fallback: number, min: number, max: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
};

export function getConsultationRuntimeConfig() {
  return {
    storageProvider: process.env.STORAGE_PROVIDER ?? "disabled",
    repositoryProvider: process.env.CONSULTATION_REPOSITORY ?? "disabled",
    dataDirectory: process.env.CONSULTATION_DATA_DIR ?? "",
    mailProvider: process.env.MAIL_PROVIDER ?? "disabled",
    maxFileSize: 5 * 1024 * 1024,
    maxRequestSize: integer(process.env.CONSULTATION_MAX_REQUEST_BYTES, 27 * 1024 * 1024, 1_000_000, 40_000_000),
    retentionDays: integer(process.env.RETENTION_DAYS, 0, 0, 3650),
    contactConsentVersion: process.env.CONSENT_CONTACT_VERSION ?? "needs_review",
    photoConsentVersion: process.env.CONSENT_PHOTO_VERSION ?? "needs_review",
    requireMalwareScan: process.env.REQUIRE_MALWARE_SCAN !== "false",
    rateLimitMax: integer(process.env.RATE_LIMIT_MAX, 5, 1, 100),
    rateLimitWindowMs: integer(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000, 1000, 86_400_000),
    rateLimitSalt: process.env.RATE_LIMIT_SALT ?? "",
  };
}

export function getHairConsultationService() {
  const config = getConsultationRuntimeConfig();
  const filesystemReady = config.dataDirectory.length > 0;
  const repository = config.repositoryProvider === "filesystem" && filesystemReady ? new FileSystemConsultationRepository(config.dataDirectory) : new DisabledRepository();
  const storage = config.storageProvider === "filesystem" && filesystemReady ? new FileSystemPrivateFileStorage(config.dataDirectory) : new DisabledStorage();
  return createConsultationService({
    repository,
    storage,
    notifier: new DisabledNotifier(),
    scanner: new UnconfiguredScanner(),
    config: {
      maxFileSize: config.maxFileSize,
      retentionDays: config.retentionDays,
      contactConsentVersion: config.contactConsentVersion,
      photoConsentVersion: config.photoConsentVersion,
      requireMalwareScan: config.requireMalwareScan,
    },
    now: () => new Date(),
    createId: randomUUID,
  });
}
