import type { MedicalApprovalStatus } from "./treatments";

export type FinderCategoryId = "face" | "skin" | "hair" | "health" | "unsure";
export type FinderPriorityId = "natural" | "low-downtime" | "long-term" | "consultation" | "unsure";
export type FinderTimingId = "soon" | "weeks" | "later" | "information";
export type FinderStep = "category" | "concern" | "priority" | "timing" | "results";

export type FinderOption = {
  id: string;
  label: string;
  description?: string;
};

export type FinderCategory = FinderOption & {
  id: FinderCategoryId;
  number: string;
  concerns: FinderOption[];
};

export type FinderResult = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  medicalApprovalStatus: MedicalApprovalStatus;
  hairResult?: boolean;
};

export type FinderMapping = {
  resultId: string;
  medicalApprovalStatus: MedicalApprovalStatus;
  internalRationale: string;
};

export const finderCategories: FinderCategory[] = [
  {
    id: "face",
    number: "01",
    label: "Gesicht",
    description: "Mimik, Proportionen, Konturen oder Hautqualität",
    concerns: [
      { id: "face-forehead-lines", label: "Stirnfalten" },
      { id: "face-frown-line", label: "Zornesfalte" },
      { id: "face-eye-area", label: "Augenbereich" },
      { id: "face-lips", label: "Lippen" },
      { id: "face-nose", label: "Nase" },
      { id: "face-jawline", label: "Jawline" },
      { id: "face-chin", label: "Kinn" },
      { id: "face-under-eyes", label: "Augenringe" },
      { id: "face-nasolabial", label: "Nasolabialfalten" },
      { id: "face-marionette", label: "Marionettenfalten" },
      { id: "face-skin-quality", label: "Hautqualität" },
      { id: "face-volume-loss", label: "Volumenverlust" },
      { id: "face-general", label: "Allgemeine Beratung" },
    ],
  },
  {
    id: "skin",
    number: "02",
    label: "Haut",
    description: "Struktur, Narben, Pigmentierung oder Straffung",
    concerns: [
      { id: "skin-acne-scars", label: "Aknenarben" },
      { id: "skin-texture", label: "Hautstruktur" },
      { id: "skin-pores", label: "Poren" },
      { id: "skin-ageing", label: "Hautalterung" },
      { id: "skin-pigmentation", label: "Pigmentierung" },
      { id: "skin-tattoo", label: "Tattoo entfernen" },
      { id: "skin-tightening", label: "Straffung" },
      { id: "skin-quality", label: "Hautqualität" },
      { id: "skin-general", label: "Allgemeine Beratung" },
    ],
  },
  {
    id: "hair",
    number: "03",
    label: "Haare",
    description: "Haarausfall einordnen und mögliche Wege besprechen",
    concerns: [
      { id: "hair-temples", label: "Geheimratsecken" },
      { id: "hair-hairline", label: "Zurückweichende Haarlinie" },
      { id: "hair-thinning", label: "Dünner werdendes Haar" },
      { id: "hair-crown", label: "Tonsur" },
      { id: "hair-diffuse", label: "Diffuser Haarausfall" },
      { id: "hair-general-loss", label: "Allgemeiner Haarverlust" },
      { id: "hair-transplant-interest", label: "Interesse an Haartransplantation" },
      { id: "hair-prp-interest", label: "Interesse an PRP" },
      { id: "hair-unsure", label: "Noch unsicher" },
    ],
  },
  {
    id: "health",
    number: "04",
    label: "Körper & Gesundheit",
    description: "Gesundheitliche Anliegen zunächst ärztlich einordnen",
    concerns: [
      { id: "health-weight", label: "Gewichtsmanagement" },
      { id: "health-diagnostics", label: "Blutuntersuchungen / Diagnostik" },
      { id: "health-general", label: "Allgemeine Gesundheitsberatung" },
    ],
  },
  {
    id: "unsure",
    number: "05",
    label: "Ich bin noch unsicher",
    description: "Mit einer offenen ärztlichen Beratung beginnen",
    concerns: [],
  },
];

export const finderFollowUpQuestions = {
  priority: {
    id: "priority",
    question: "Was ist Ihnen besonders wichtig?",
    options: [
      { id: "natural", label: "Möglichst natürliches Ergebnis" },
      { id: "low-downtime", label: "Möglichst geringe Ausfallzeit" },
      { id: "long-term", label: "Langfristiger Ansatz" },
      { id: "consultation", label: "Zunächst nur Beratung" },
      { id: "unsure", label: "Weiß ich noch nicht" },
    ] satisfies FinderOption[],
  },
  timing: {
    id: "timing",
    question: "Wann möchten Sie starten?",
    options: [
      { id: "soon", label: "Möglichst bald" },
      { id: "weeks", label: "Innerhalb der nächsten Wochen" },
      { id: "later", label: "Später" },
      { id: "information", label: "Nur informieren" },
    ] satisfies FinderOption[],
  },
} as const;

export const finderResultGroups: FinderResult[] = [
  { id: "botulinumtoxin", title: "Botox (Botulinumtoxin)", eyebrow: "Ästhetische Medizin", description: "Eine mögliche ärztliche Beratungsperspektive für ausgewählte mimische Anliegen.", href: "/behandlungen/botulinumtoxin/", medicalApprovalStatus: "needs_review" },
  { id: "hyaluronsaeure", title: "Hyaluronsäure", eyebrow: "Ästhetische Medizin", description: "Eine mögliche Beratungsperspektive für Proportionen, Konturen oder ausgewählte Volumenthemen.", href: "/behandlungen/hyaluronsaeure/", medicalApprovalStatus: "needs_review" },
  { id: "biostimulatoren", title: "Biostimulatoren", eyebrow: "Ästhetische Medizin", description: "Ein Bereich für die ärztliche Einordnung regenerativer und strukturbezogener Behandlungsansätze.", href: "/behandlungen/biostimulatoren/", medicalApprovalStatus: "needs_review" },
  { id: "polynukleotide", title: "Polynukleotide", eyebrow: "Ästhetische Medizin", description: "Ein möglicher Beratungsbereich rund um Hautqualität und regenerative Ansätze.", href: "/behandlungen/polynukleotide/", medicalApprovalStatus: "needs_review" },
  { id: "co2-laser", title: "CO₂-Laser", eyebrow: "Haut & Laser", description: "Ein möglicher ärztlicher Beratungsbereich für ausgewählte Struktur- und Hautthemen.", href: "/behandlungen/co2-laser/", medicalApprovalStatus: "needs_review" },
  { id: "tattoo-laser", title: "Tattoo-Laser", eyebrow: "Haut & Laser", description: "Eine Beratungsperspektive für die individuell zu planende Tattoo-Laserbehandlung.", href: "/behandlungen/tattoo-laser/", medicalApprovalStatus: "needs_review" },
  { id: "hifu", title: "HIFU", eyebrow: "Haut & Technologie", description: "Ein möglicher Bereich für die ärztliche Einordnung technologiegestützter Straffungsansätze.", href: "/behandlungen/hifu/", medicalApprovalStatus: "needs_review" },
  { id: "microneedling", title: "Microneedling", eyebrow: "Kosmetik", description: "Eine mögliche ergänzende Perspektive für ausgewählte Anliegen an Hautbild und Struktur.", href: "/behandlungen/microneedling/", medicalApprovalStatus: "needs_review" },
  { id: "aquafacial", title: "Aquafacial", eyebrow: "Kosmetik", description: "Eine mögliche kosmetische Ergänzung für Reinigung, Pflege und Hautqualität.", href: "/behandlungen/aquafacial/", medicalApprovalStatus: "needs_review" },
  { id: "hair-consultation", title: "Haarberatung", eyebrow: "Haarmedizin", description: "Der ärztliche Ausgangspunkt, um Verlauf, mögliche Ursachen und nächste Schritte persönlich einzuordnen.", href: "/behandlungen/haarausfall/", medicalApprovalStatus: "needs_review", hairResult: true },
  { id: "prp-hair", title: "PRP Haare", eyebrow: "Haarmedizin", description: "Ein möglicher Baustein, dessen Eignung erst nach ärztlicher Einordnung beurteilt wird.", href: "/behandlungen/prp-haare/", medicalApprovalStatus: "needs_review", hairResult: true },
  { id: "hair-transplantation", title: "Haartransplantationsberatung", eyebrow: "Haarmedizin", description: "Eine persönliche Beratung zur Frage, ob eine operative Perspektive überhaupt infrage kommt.", href: "/behandlungen/haartransplantation/", medicalApprovalStatus: "needs_review", hairResult: true },
  { id: "weight-consultation", title: "Gewichtsmanagement", eyebrow: "Körper & Gesundheit", description: "Eine ärztliche Beratung zu Ausgangssituation, realistischen Zielen und sinnvollen nächsten Schritten.", href: "/behandlungen/gewichtsmanagement/", medicalApprovalStatus: "needs_review" },
  { id: "diagnostics-consultation", title: "Blutuntersuchungen & Diagnostik", eyebrow: "Körper & Gesundheit", description: "Eine ärztliche Beratung dazu, welche diagnostische Einordnung zur individuellen Fragestellung passen kann.", href: "/behandlungen/diagnostik/", medicalApprovalStatus: "needs_review" },
  { id: "health-consultation", title: "Allgemeine Gesundheitsberatung", eyebrow: "Körper & Gesundheit", description: "Ein offenes ärztliches Gespräch, bevor einzelne Untersuchungen oder Behandlungswege betrachtet werden.", href: "/gesundheit/", medicalApprovalStatus: "approved" },
  { id: "general-consultation", title: "Allgemeine ärztliche Beratung", eyebrow: "Persönliche Orientierung", description: "Wenn Sie noch unsicher sind, kann ein offenes Gespräch helfen, Ihr Anliegen medizinisch einzuordnen.", href: "/termin/", medicalApprovalStatus: "approved" },
];

export const finderMappings: Record<string, FinderMapping[]> = {
  "face-forehead-lines": [{ resultId: "botulinumtoxin", medicalApprovalStatus: "needs_review", internalRationale: "Mimisches Anliegen; ärztliche Prüfung erforderlich." }],
  "face-frown-line": [{ resultId: "botulinumtoxin", medicalApprovalStatus: "needs_review", internalRationale: "Mimisches Anliegen; ärztliche Prüfung erforderlich." }],
  "face-eye-area": [
    { resultId: "botulinumtoxin", medicalApprovalStatus: "needs_review", internalRationale: "Mehrdeutiger Bereich; Mimik kann relevant sein." },
    { resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Mehrdeutiger Bereich; Anatomie und Anliegen müssen geprüft werden." },
    { resultId: "polynukleotide", medicalApprovalStatus: "needs_review", internalRationale: "Hautqualität kann relevant sein; Produkt und Eignung offen." },
  ],
  "face-lips": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal im bestehenden Content-Modell." }],
  "face-nose": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; individuelle Anatomie entscheidend." }],
  "face-jawline": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; individuelle Anatomie entscheidend." }],
  "face-chin": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; individuelle Anatomie entscheidend." }],
  "face-under-eyes": [
    { resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; besondere ärztliche Abwägung nötig." },
    { resultId: "polynukleotide", medicalApprovalStatus: "needs_review", internalRationale: "Hautqualität kann relevant sein; medizinisch freigeben." },
  ],
  "face-nasolabial": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; Ursachen und Anatomie prüfen." }],
  "face-marionette": [{ resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Direktes Beratungsareal; Ursachen und Anatomie prüfen." }],
  "face-skin-quality": [
    { resultId: "polynukleotide", medicalApprovalStatus: "needs_review", internalRationale: "Regenerativer Beratungsbereich; fachliche Freigabe offen." },
    { resultId: "biostimulatoren", medicalApprovalStatus: "needs_review", internalRationale: "Strukturbezogener Beratungsbereich; fachliche Freigabe offen." },
  ],
  "face-volume-loss": [
    { resultId: "hyaluronsaeure", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche Volumenperspektive; individuelle Anatomie prüfen." },
    { resultId: "biostimulatoren", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche strukturbezogene Perspektive; fachliche Freigabe offen." },
  ],
  "face-general": [{ resultId: "general-consultation", medicalApprovalStatus: "approved", internalRationale: "Offene Beratung ohne Behandlungszuordnung." }],
  "skin-acne-scars": [
    { resultId: "co2-laser", medicalApprovalStatus: "needs_review", internalRationale: "Plausibler Haut-/Laserbereich; Indikation und Gerät verifizieren." },
    { resultId: "microneedling", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche kosmetische Ergänzung; Abgrenzung medizinisch prüfen." },
  ],
  "skin-texture": [
    { resultId: "co2-laser", medicalApprovalStatus: "needs_review", internalRationale: "Plausibler Strukturbezug; Indikation offen." },
    { resultId: "microneedling", medicalApprovalStatus: "needs_review", internalRationale: "Plausibler Strukturbezug; kosmetische Eignung offen." },
    { resultId: "aquafacial", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche Pflegeperspektive; Erwartungsabgrenzung nötig." },
  ],
  "skin-pores": [
    { resultId: "microneedling", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher kosmetischer Strukturbezug; freigeben." },
    { resultId: "aquafacial", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche Pflegeperspektive; keine Ergebniszusage." },
  ],
  "skin-ageing": [
    { resultId: "co2-laser", medicalApprovalStatus: "needs_review", internalRationale: "Mehrdeutiges Anliegen; Hautzustand entscheidend." },
    { resultId: "hifu", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche Technologieperspektive; Eignung offen." },
    { resultId: "biostimulatoren", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche regenerative Perspektive; fachliche Freigabe offen." },
  ],
  "skin-pigmentation": [{ resultId: "co2-laser", medicalApprovalStatus: "needs_review", internalRationale: "Unsichere Zuordnung; Diagnose, Gerät und Indikation zwingend prüfen." }],
  "skin-tattoo": [{ resultId: "tattoo-laser", medicalApprovalStatus: "needs_review", internalRationale: "Direkter Leistungsbereich; Haut und Tattoo müssen untersucht werden." }],
  "skin-tightening": [
    { resultId: "hifu", medicalApprovalStatus: "needs_review", internalRationale: "Plausibler Technologiebezug; individuelle Eignung offen." },
    { resultId: "biostimulatoren", medicalApprovalStatus: "needs_review", internalRationale: "Mögliche strukturbezogene Perspektive; fachliche Freigabe offen." },
  ],
  "skin-quality": [
    { resultId: "polynukleotide", medicalApprovalStatus: "needs_review", internalRationale: "Plausibler regenerativer Beratungsbereich; freigeben." },
    { resultId: "microneedling", medicalApprovalStatus: "needs_review", internalRationale: "Plausible kosmetische Perspektive; Eignung offen." },
    { resultId: "aquafacial", medicalApprovalStatus: "needs_review", internalRationale: "Plausible Pflegeperspektive; Eignung offen." },
  ],
  "skin-general": [{ resultId: "general-consultation", medicalApprovalStatus: "approved", internalRationale: "Offene Beratung ohne Behandlungszuordnung." }],
  "hair-temples": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung zuerst." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein nach ärztlicher Prüfung." },
    { resultId: "hair-transplantation", medicalApprovalStatus: "needs_review", internalRationale: "Operative Perspektive nur nach Untersuchung." },
  ],
  "hair-hairline": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung zuerst." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein nach ärztlicher Prüfung." },
    { resultId: "hair-transplantation", medicalApprovalStatus: "needs_review", internalRationale: "Operative Perspektive nur nach Untersuchung." },
  ],
  "hair-thinning": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung zuerst." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein nach ärztlicher Prüfung." },
  ],
  "hair-crown": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung zuerst." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein nach ärztlicher Prüfung." },
    { resultId: "hair-transplantation", medicalApprovalStatus: "needs_review", internalRationale: "Operative Perspektive nur nach Untersuchung." },
  ],
  "hair-diffuse": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Ursachenklärung vor jeder Methode." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein erst nach Ursachenklärung." },
  ],
  "hair-general-loss": [
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Ursachenklärung vor jeder Methode." },
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Möglicher Baustein erst nach Ursachenklärung." },
  ],
  "hair-transplant-interest": [
    { resultId: "hair-transplantation", medicalApprovalStatus: "needs_review", internalRationale: "Explizites Informationsinteresse, keine Eignungsaussage." },
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung bleibt Voraussetzung." },
  ],
  "hair-prp-interest": [
    { resultId: "prp-hair", medicalApprovalStatus: "needs_review", internalRationale: "Explizites Informationsinteresse, keine Eignungsaussage." },
    { resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Diagnostische Einordnung bleibt Voraussetzung." },
  ],
  "hair-unsure": [{ resultId: "hair-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Offene Haarberatung ohne Methodenfestlegung." }],
  "health-weight": [{ resultId: "weight-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Beratungsbereich ohne Medikamenten- oder Therapieempfehlung." }],
  "health-diagnostics": [{ resultId: "diagnostics-consultation", medicalApprovalStatus: "needs_review", internalRationale: "Beratungsbereich ohne automatische Laborempfehlung." }],
  "health-general": [{ resultId: "health-consultation", medicalApprovalStatus: "approved", internalRationale: "Offene Gesundheitsberatung ohne Behandlungszuordnung." }],
  "unsure-general": [{ resultId: "general-consultation", medicalApprovalStatus: "approved", internalRationale: "Offene Beratung ohne Behandlungszuordnung." }],
};

export function getFinderCategory(categoryId: FinderCategoryId | null) {
  return finderCategories.find((category) => category.id === categoryId);
}

export function getFinderResults({ concernId, priorityId }: { concernId: string | null; priorityId?: FinderPriorityId | null }): FinderResult[] {
  const mappedIds = (concernId ? finderMappings[concernId] : undefined)?.map(({ resultId }) => resultId) ?? ["general-consultation"];
  const orderedIds = priorityId === "consultation" && !mappedIds.includes("general-consultation")
    ? ["general-consultation", ...mappedIds]
    : mappedIds;
  return [...new Set(orderedIds)]
    .slice(0, 3)
    .map((resultId) => finderResultGroups.find((result) => result.id === resultId))
    .filter((result): result is FinderResult => Boolean(result));
}

export function getNextFinderStep(step: FinderStep, categoryId: FinderCategoryId | null): FinderStep {
  if (step === "category") return categoryId === "unsure" ? "priority" : "concern";
  if (step === "concern") return "priority";
  if (step === "priority") return "timing";
  if (step === "timing") return "results";
  return "results";
}

export function getPreviousFinderStep(step: FinderStep, categoryId: FinderCategoryId | null): FinderStep {
  if (step === "results") return "timing";
  if (step === "timing") return "priority";
  if (step === "priority") return categoryId === "unsure" ? "category" : "concern";
  return "category";
}
