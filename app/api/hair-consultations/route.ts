import { NextResponse } from "next/server";
import { ConsultationServiceError, type IncomingPhoto, type PhotoSlot } from "../../_server/hair-consultations/core";
import { checkConsultationRateLimit } from "../../_server/hair-consultations/rate-limit";
import { getConsultationRuntimeConfig, getHairConsultationService } from "../../_server/hair-consultations/runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const photoFields: Record<string, PhotoSlot> = { photo_front: "front", photo_top: "top", photo_left: "left", photo_right: "right", photo_back: "back" };
const response = (status: number, code: string, message: string, headers?: HeadersInit, fields?: string[]) => NextResponse.json({ ok: false, code, message, ...(fields?.length ? { fields } : {}) }, { status, headers });

export async function POST(request: Request) {
  const config = getConsultationRuntimeConfig();
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data;")) return response(415, "unsupported_media_type", "Die Anfrage konnte nicht verarbeitet werden.");
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > config.maxRequestSize) return response(413, "request_too_large", "Die ausgewählten Dateien sind insgesamt zu groß.");

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return response(403, "origin_rejected", "Die Anfrage konnte nicht verarbeitet werden.");

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const identifier = forwarded || request.headers.get("x-real-ip") || "unknown";
  const limit = checkConsultationRateLimit({ identifier, salt: config.rateLimitSalt, maxRequests: config.rateLimitMax, windowMs: config.rateLimitWindowMs });
  if (!limit.allowed) return response(429, "rate_limited", "Bitte warten Sie kurz und versuchen Sie es anschließend erneut.", { "Retry-After": String(limit.retryAfterSeconds) });

  let formData: FormData;
  try { formData = await request.formData(); }
  catch { return response(400, "invalid_request", "Die Anfrage konnte nicht gelesen werden."); }

  const allowedFields = new Set(["payload", ...Object.keys(photoFields)]);
  for (const key of new Set(formData.keys())) {
    if (!allowedFields.has(key) || formData.getAll(key).length !== 1) return response(400, "invalid_request", "Die Anfrage konnte nicht verarbeitet werden.");
  }

  const payloadValue = formData.get("payload");
  if (typeof payloadValue !== "string" || payloadValue.length > 10_000) return response(400, "validation_failed", "Bitte prüfen Sie Ihre Angaben.");
  let payload: unknown;
  try { payload = JSON.parse(payloadValue); }
  catch { return response(400, "validation_failed", "Bitte prüfen Sie Ihre Angaben."); }

  const photos: IncomingPhoto[] = [];
  let actualRequestSize = payloadValue.length;
  for (const [field, slot] of Object.entries(photoFields)) {
    const value = formData.get(field);
    if (value === null) continue;
    if (!(value instanceof File) || value.size <= 0 || value.size > config.maxFileSize) return response(400, "upload_failed", "Mindestens eine Bilddatei konnte nicht verarbeitet werden.", undefined, [`photo:${slot}`]);
    actualRequestSize += value.size;
    if (actualRequestSize > config.maxRequestSize) return response(413, "request_too_large", "Die ausgewählten Dateien sind insgesamt zu groß.");
    photos.push({ slot, mediaType: value.type, bytes: new Uint8Array(await value.arrayBuffer()) });
  }

  try {
    const record = await getHairConsultationService().createConsultation(payload, photos);
    return NextResponse.json({ ok: true, submissionId: record.id, reference: `HC-${record.id.slice(0, 8).toUpperCase()}` }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ConsultationServiceError) {
      if (error.code === "validation_failed") return response(400, error.code, "Bitte prüfen Sie Ihre Angaben.");
      if (error.code === "upload_failed") return response(400, error.code, "Mindestens eine Bilddatei konnte nicht verarbeitet werden.", undefined, error.fields.filter((field) => /^photo:(front|top|left|right|back)$/.test(field)));
      if (error.code === "scanner_unavailable") return response(503, error.code, "Der sichere Foto-Upload ist derzeit nicht verfügbar. Ihre Anfrage wurde nicht gespeichert.");
      return response(503, "submission_unavailable", "Die Anfrage konnte derzeit nicht sicher gespeichert werden. Bitte versuchen Sie es später erneut.");
    }
    return response(503, "submission_unavailable", "Die Anfrage konnte derzeit nicht sicher gespeichert werden. Bitte versuchen Sie es später erneut.");
  }
}
