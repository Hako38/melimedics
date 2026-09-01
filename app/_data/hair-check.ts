import type { MedicalApprovalStatus } from "./treatments";

export type HairCheckStep = "start" | "basics" | "concern" | "progression" | "treatments" | "interest" | "timeframe" | "photos" | "contact" | "review" | "success";
export type AgeRange = "under-20" | "20-29" | "30-39" | "40-49" | "50-plus";
export type HairGender = "female" | "male" | "diverse" | "no-answer";
export type HairDuration = "under-6-months" | "6-12-months" | "1-3-years" | "over-3-years" | "unsure";
export type ConcernArea = "temples" | "hairline" | "top" | "crown" | "diffuse" | "multiple" | "unsure";
export type HairProgression = "slowly-years" | "recently-stronger" | "stable" | "hard-to-judge";
export type OngoingLoss = "yes" | "no-stable" | "unsure";
export type PreviousTreatment = "prp-prf" | "transplant" | "medical" | "cosmetic" | "none" | "other";
export type HairInterest = "understand-cause" | "prp" | "transplant" | "combination" | "consultation" | "unsure";
export type HairTimeframe = "soon" | "1-3-months" | "later" | "information";
export type PreferredContact = "email" | "phone" | "no-preference";
export type HairPhotoSlotId = "front" | "top" | "left" | "right" | "back";
export type HairSubmissionStatus = "draft" | "ready_for_secure_backend" | "submitted" | "failed";

export type HairCheckPhoto = {
  slotId: HairPhotoSlotId;
  file: File;
  previewUrl: string;
};

export type HairCheckAnswers = {
  ageRange: AgeRange | null;
  gender: HairGender | null;
  duration: HairDuration | null;
  concernAreas: ConcernArea[];
  progression: HairProgression | null;
  ongoingLoss: OngoingLoss | null;
  previousTreatments: PreviousTreatment[];
  previousTreatmentNote: string;
  interest: HairInterest[];
  timeframe: HairTimeframe | null;
  photos: Partial<Record<HairPhotoSlotId, HairCheckPhoto>>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact | null;
  message: string;
  consent: boolean;
  photoConsent: boolean;
};

export type HairCheckSubmission = HairCheckAnswers & {
  id: string;
  createdAt: string;
  submissionStatus: HairSubmissionStatus;
};

export type HairCheckOption<T extends string = string> = { id: T; label: string; description?: string };

export const HAIR_CHECK_MAX_FILE_SIZE = 5 * 1024 * 1024;
export const HAIR_CHECK_MAX_MESSAGE_LENGTH = 800;
export const HAIR_CHECK_MAX_NOTE_LENGTH = 240;
export const HAIR_CHECK_ACCEPTED_TYPES = ["image/jpeg", "image/png"] as const;

export const initialHairCheckAnswers: HairCheckAnswers = {
  ageRange: null,
  gender: null,
  duration: null,
  concernAreas: [],
  progression: null,
  ongoingLoss: null,
  previousTreatments: [],
  previousTreatmentNote: "",
  interest: [],
  timeframe: null,
  photos: {},
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: null,
  message: "",
  consent: false,
  photoConsent: false,
};

export const hairCheckSteps: Exclude<HairCheckStep, "start" | "review" | "success">[] = ["basics", "concern", "progression", "treatments", "interest", "timeframe", "photos", "contact"];

export const ageOptions: HairCheckOption<AgeRange>[] = [
  { id: "under-20", label: "Unter 20" }, { id: "20-29", label: "20–29" }, { id: "30-39", label: "30–39" }, { id: "40-49", label: "40–49" }, { id: "50-plus", label: "50+" },
];
export const genderOptions: HairCheckOption<HairGender>[] = [
  { id: "female", label: "Weiblich" }, { id: "male", label: "Männlich" }, { id: "diverse", label: "Divers" }, { id: "no-answer", label: "Keine Angabe" },
];
export const durationOptions: HairCheckOption<HairDuration>[] = [
  { id: "under-6-months", label: "Unter 6 Monaten" }, { id: "6-12-months", label: "6–12 Monate" }, { id: "1-3-years", label: "1–3 Jahre" }, { id: "over-3-years", label: "Länger als 3 Jahre" }, { id: "unsure", label: "Schwer einzuschätzen" },
];
export const concernOptions: HairCheckOption<ConcernArea>[] = [
  { id: "temples", label: "Geheimratsecken" }, { id: "hairline", label: "Haarlinie" }, { id: "top", label: "Oberkopf" }, { id: "crown", label: "Tonsur" }, { id: "diffuse", label: "Diffuser Haarverlust" }, { id: "multiple", label: "Mehrere Bereiche" }, { id: "unsure", label: "Noch unsicher" },
];
export const progressionOptions: HairCheckOption<HairProgression>[] = [
  { id: "slowly-years", label: "Langsam über Jahre" }, { id: "recently-stronger", label: "In den letzten Monaten stärker" }, { id: "stable", label: "Seit einiger Zeit stabil" }, { id: "hard-to-judge", label: "Schwer einzuschätzen" },
];
export const ongoingOptions: HairCheckOption<OngoingLoss>[] = [
  { id: "yes", label: "Ja" }, { id: "no-stable", label: "Nein, eher stabil" }, { id: "unsure", label: "Unsicher" },
];
export const previousTreatmentOptions: HairCheckOption<PreviousTreatment>[] = [
  { id: "prp-prf", label: "PRP / PRF" }, { id: "transplant", label: "Frühere Haartransplantation" }, { id: "medical", label: "Medizinische Behandlung" }, { id: "cosmetic", label: "Kosmetische Produkte" }, { id: "none", label: "Noch keine Behandlung" }, { id: "other", label: "Andere" },
];
export const interestOptions: HairCheckOption<HairInterest>[] = [
  { id: "understand-cause", label: "Ursache besser verstehen" }, { id: "prp", label: "PRP / regenerative Haarbehandlung" }, { id: "transplant", label: "Haartransplantation" }, { id: "combination", label: "Kombination verschiedener Möglichkeiten" }, { id: "consultation", label: "Zunächst nur Beratung" }, { id: "unsure", label: "Noch unsicher" },
];
export const timeframeOptions: HairCheckOption<HairTimeframe>[] = [
  { id: "soon", label: "Möglichst bald" }, { id: "1-3-months", label: "In den nächsten 1–3 Monaten" }, { id: "later", label: "Später" }, { id: "information", label: "Zunächst nur informieren" },
];
export const preferredContactOptions: HairCheckOption<PreferredContact>[] = [
  { id: "email", label: "E-Mail" }, { id: "phone", label: "Telefon" }, { id: "no-preference", label: "Keine Präferenz" },
];
export const photoSlots: { id: HairPhotoSlotId; label: string; instruction: string }[] = [
  { id: "front", label: "Frontal", instruction: "Gesicht gerade zur Kamera, Haare gut sichtbar." },
  { id: "top", label: "Oberkopf", instruction: "Kamera möglichst senkrecht über dem Kopf halten." },
  { id: "left", label: "Linke Seite", instruction: "Linke Schläfe und seitliche Haarlinie vollständig zeigen." },
  { id: "right", label: "Rechte Seite", instruction: "Rechte Schläfe und seitliche Haarlinie vollständig zeigen." },
  { id: "back", label: "Hinterkopf", instruction: "Wirbel und Hinterkopf bei gleichmäßigem Licht aufnehmen." },
];

export const hairCheckApprovalItems: { id: string; label: string; status: MedicalApprovalStatus; todo: string }[] = [
  { id: "privacy-consent", label: "Datenschutz-Einwilligung Haar-Check", status: "approved", todo: "Einwilligungstext Version 2026-09-01 bei Änderungen am Anfrageprozess erneut prüfen." },
  { id: "photo-consent", label: "Separate Foto-Einwilligung", status: "approved", todo: "Foto-Einwilligung Version 2026-09-01 bei Aktivierung oder Änderung des Speichers erneut prüfen." },
  { id: "secure-upload", label: "Sicherer Foto-Upload", status: "missing", todo: "Privaten Production-Storage und Malware-Scanner konfigurieren; Zugriff, Löschung und Retention operativ freigeben." },
  { id: "notification", label: "Serverseitige Anfrage-Benachrichtigung", status: "missing", todo: "Mailprovider, Absender und internen Empfänger freigeben und serverseitig konfigurieren." },
  { id: "retention", label: "Retention und Löschkonzept", status: "needs_review", todo: "Aufbewahrungsdauer, Löschfrequenz und Verantwortlichkeit rechtlich sowie organisatorisch freigeben." },
];

export const optionLabel = <T extends string>(options: HairCheckOption<T>[], id: T | null) => options.find((option) => option.id === id)?.label ?? "Nicht angegeben";
export const optionLabels = <T extends string>(options: HairCheckOption<T>[], ids: T[]) => ids.map((id) => optionLabel(options, id));
