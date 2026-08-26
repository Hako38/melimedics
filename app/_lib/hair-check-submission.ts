import type { HairCheckAnswers, HairCheckSubmission } from "../_data/hair-check";
import { validateCompleteHairCheck } from "./hair-check-validation";

export type HairConsultationResult =
  | { ok: true; submissionId: string }
  | { ok: false; code: "validation_failed" | "secure_backend_unavailable"; message: string };

export type HairConsultationTransport = (submission: HairCheckSubmission) => Promise<{ submissionId: string }>;

export function prepareHairConsultation(answers: HairCheckAnswers): HairCheckSubmission {
  return {
    ...answers,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    submissionStatus: "ready_for_secure_backend",
  };
}

/**
 * Provider-neutral service boundary. Phase 2B deliberately performs no fetch,
 * persistence or logging. A production adapter must be server-side and must not
 * expose storage credentials or public object URLs.
 */
export async function submitHairConsultation(answers: HairCheckAnswers, transport?: HairConsultationTransport): Promise<HairConsultationResult> {
  if (Object.keys(validateCompleteHairCheck(answers)).length > 0) {
    return { ok: false, code: "validation_failed", message: "Bitte prüfen Sie die markierten Angaben." };
  }
  const submission = prepareHairConsultation(answers);
  if (transport) {
    const result = await transport(submission);
    return { ok: true, submissionId: result.submissionId };
  }
  return {
    ok: false,
    code: "secure_backend_unavailable",
    message: "Die sichere Übermittlung ist in dieser lokalen Phase noch nicht aktiviert. Ihre Angaben und Fotos wurden nicht gesendet.",
  };
}
