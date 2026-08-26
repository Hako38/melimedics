import {
  HAIR_CHECK_ACCEPTED_TYPES,
  HAIR_CHECK_MAX_FILE_SIZE,
  HAIR_CHECK_MAX_MESSAGE_LENGTH,
  HAIR_CHECK_MAX_NOTE_LENGTH,
  type HairCheckAnswers,
  type HairCheckStep,
} from "../_data/hair-check";

export type HairCheckErrors = Record<string, string>;
export type UploadCandidate = { name: string; size: number; type: string };

export function validateHairPhoto(file: UploadCandidate): string | null {
  if (!HAIR_CHECK_ACCEPTED_TYPES.includes(file.type as (typeof HAIR_CHECK_ACCEPTED_TYPES)[number])) return "Bitte wählen Sie eine JPEG- oder PNG-Datei.";
  if (file.size > HAIR_CHECK_MAX_FILE_SIZE) return "Die Datei ist größer als 5 MB. Bitte wählen Sie eine kleinere Aufnahme.";
  if (file.size <= 0) return "Die Datei ist leer und kann nicht verwendet werden.";
  return null;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string) {
  const normalized = value.replace(/[\s()+./-]/g, "");
  return /^\d{7,15}$/.test(normalized);
}

export function validateHairCheckStep(step: HairCheckStep, answers: HairCheckAnswers): HairCheckErrors {
  const errors: HairCheckErrors = {};
  if (step === "basics") {
    if (!answers.ageRange) errors.ageRange = "Bitte wählen Sie eine Altersgruppe.";
    if (!answers.duration) errors.duration = "Bitte wählen Sie, seit wann Sie die Veränderung beobachten.";
  }
  if (step === "concern" && answers.concernAreas.length === 0) errors.concernAreas = "Bitte wählen Sie mindestens einen Bereich.";
  if (step === "progression") {
    if (!answers.progression) errors.progression = "Bitte wählen Sie, wie sich die Situation entwickelt hat.";
    if (!answers.ongoingLoss) errors.ongoingLoss = "Bitte wählen Sie eine Antwort zum aktuellen Verlauf.";
  }
  if (step === "treatments") {
    if (answers.previousTreatments.length === 0) errors.previousTreatments = "Bitte wählen Sie mindestens eine Antwort.";
    if (answers.previousTreatmentNote.length > HAIR_CHECK_MAX_NOTE_LENGTH) errors.previousTreatmentNote = `Bitte kürzen Sie die Angabe auf höchstens ${HAIR_CHECK_MAX_NOTE_LENGTH} Zeichen.`;
  }
  if (step === "interest" && answers.interest.length === 0) errors.interest = "Bitte wählen Sie mindestens ein aktuelles Interesse.";
  if (step === "timeframe" && !answers.timeframe) errors.timeframe = "Bitte wählen Sie einen ungefähren Zeitraum.";
  if (step === "contact") {
    if (!answers.firstName.trim()) errors.firstName = "Bitte geben Sie Ihren Vornamen ein.";
    if (!answers.lastName.trim()) errors.lastName = "Bitte geben Sie Ihren Nachnamen ein.";
    if (!isValidEmail(answers.email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!isValidPhone(answers.phone)) errors.phone = "Bitte geben Sie eine erreichbare Telefonnummer mit 7 bis 15 Ziffern ein.";
    if (answers.message.length > HAIR_CHECK_MAX_MESSAGE_LENGTH) errors.message = `Bitte kürzen Sie Ihre Nachricht auf höchstens ${HAIR_CHECK_MAX_MESSAGE_LENGTH} Zeichen.`;
    if (!answers.consent) errors.consent = "Die vorbereitete Datenschutz-Einwilligung ist erforderlich.";
    if (Object.keys(answers.photos).length > 0 && !answers.photoConsent) errors.photoConsent = "Für die geplante Übermittlung Ihrer Fotos ist eine separate Zustimmung erforderlich.";
  }
  return errors;
}

export function validateCompleteHairCheck(answers: HairCheckAnswers): HairCheckErrors {
  return ["basics", "concern", "progression", "treatments", "interest", "timeframe", "contact"].reduce<HairCheckErrors>((all, step) => ({ ...all, ...validateHairCheckStep(step as HairCheckStep, answers) }), {});
}
