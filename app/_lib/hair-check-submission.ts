import type { HairCheckAnswers } from "../_data/hair-check";
import { validateCompleteHairCheck } from "./hair-check-validation";

export type HairConsultationErrorCode = "validation_failed" | "upload_failed" | "rate_limited" | "submission_unavailable" | "network_error" | "request_too_large" | "scanner_unavailable" | "invalid_request" | "origin_rejected" | "unsupported_media_type";

export type HairConsultationResult =
  | { ok: true; submissionId: string; reference: string }
  | { ok: false; code: HairConsultationErrorCode; message: string; fields?: string[] };

export type HairConsultationTransport = (body: FormData) => Promise<HairConsultationResult>;

export function buildHairConsultationFormData(answers: HairCheckAnswers) {
  const body = new FormData();
  body.set("payload", JSON.stringify({
    ageRange: answers.ageRange,
    gender: answers.gender ?? undefined,
    duration: answers.duration,
    affectedAreas: answers.concernAreas,
    progression: answers.progression,
    ongoingLoss: answers.ongoingLoss,
    previousTreatments: answers.previousTreatments,
    previousTreatmentNote: answers.previousTreatmentNote || undefined,
    interest: answers.interest,
    desiredTimeframe: answers.timeframe,
    firstName: answers.firstName,
    lastName: answers.lastName,
    email: answers.email,
    phone: answers.phone,
    preferredContact: answers.preferredContact ?? undefined,
    message: answers.message || undefined,
    consentContact: answers.consent,
    consentPhotos: answers.photoConsent,
    source: "website_hair_check",
    spamTrap: "",
  }));
  for (const [slot, photo] of Object.entries(answers.photos)) {
    if (photo) body.set(`photo_${slot}`, photo.file, "private-upload");
  }
  return body;
}

const apiTransport: HairConsultationTransport = async (body) => {
  try {
    const response = await fetch("/api/hair-consultations/", { method: "POST", body, credentials: "same-origin", headers: { Accept: "application/json" } });
    const result = await response.json().catch(() => null) as HairConsultationResult | null;
    if (result && typeof result === "object" && "ok" in result) return result;
    return { ok: false, code: "submission_unavailable", message: "Die Anfrage konnte derzeit nicht sicher gespeichert werden. Bitte versuchen Sie es später erneut." };
  } catch {
    return { ok: false, code: "network_error", message: "Die Verbindung konnte nicht hergestellt werden. Ihre Angaben bleiben erhalten; bitte versuchen Sie es erneut." };
  }
};

export async function submitHairConsultation(answers: HairCheckAnswers, transport: HairConsultationTransport = apiTransport): Promise<HairConsultationResult> {
  if (Object.keys(validateCompleteHairCheck(answers)).length > 0) return { ok: false, code: "validation_failed", message: "Bitte prüfen Sie die markierten Angaben." };
  return transport(buildHairConsultationFormData(answers));
}
