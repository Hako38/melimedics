import { doctor } from "../_data/home";
import { mediaSlots } from "../_data/media";
import { practice } from "../_data/practice";
import { finderMappings, finderResultGroups } from "../_data/treatment-finder";
import { priceCategories, treatments, type MedicalApprovalStatus } from "../_data/treatments";

export type ContentStatusItem = {
  id: string;
  area: "treatment" | "price" | "practice" | "doctor" | "media" | "finder_mapping";
  label: string;
  status: MedicalApprovalStatus;
  todos: string[];
};

export function getContentStatusReport() {
  const practiceItems = Object.entries(practice).flatMap<ContentStatusItem>(([key, value]) => {
    if (typeof value !== "object" || value === null || !("status" in value)) return [];
    const status: MedicalApprovalStatus = value.status === "verified" ? "approved" : value.status;
    return [{ id: `practice:${key}`, area: "practice", label: key, status, todos: "todo" in value && value.todo ? [value.todo] : [] }];
  });
  const doctorItems: ContentStatusItem[] = [
    { id: "doctor:name", area: "doctor", label: doctor.name, status: "needs_review", todos: doctor.contentTodos },
    { id: "doctor:title", area: "doctor", label: "Titel / Berufsbezeichnung", status: doctor.title ? "needs_review" : "missing", todos: ["Titel und Berufsbezeichnung verifizieren."] },
    { id: "doctor:biography", area: "doctor", label: "Vita", status: doctor.biography ? "needs_review" : "missing", todos: ["Vita bereitstellen und freigeben."] },
    { id: "doctor:qualifications", area: "doctor", label: "Qualifikationen", status: doctor.qualifications.length ? "needs_review" : "missing", todos: ["Qualifikationen dokumentieren und verifizieren."] },
    { id: "doctor:training", area: "doctor", label: "Weiterbildungen", status: doctor.training.length ? "needs_review" : "missing", todos: ["Weiterbildungen dokumentieren und verifizieren."] },
    { id: "doctor:focus", area: "doctor", label: "Tätigkeitsschwerpunkte", status: doctor.focusAreas.length ? "needs_review" : "missing", todos: ["Tätigkeitsschwerpunkte freigeben."] },
    { id: "doctor:photo", area: "doctor", label: "Originalporträt", status: doctor.originalPhoto ? "needs_review" : "missing", todos: ["Freigegebenes Originalporträt bereitstellen."] },
  ];
  const finderMappingItems = Object.entries(finderMappings).flatMap<ContentStatusItem>(([concernId, mappings]) => mappings.map((mapping) => ({
    id: `finder:${concernId}:${mapping.resultId}`,
    area: "finder_mapping",
    label: `${concernId} → ${finderResultGroups.find(({ id }) => id === mapping.resultId)?.title ?? mapping.resultId}`,
    status: mapping.medicalApprovalStatus,
    todos: mapping.medicalApprovalStatus === "approved" ? [] : [`Finder-Zuordnung ärztlich freigeben: ${mapping.internalRationale}`],
  })));
  const items: ContentStatusItem[] = [
    ...treatments.map<ContentStatusItem>((treatment) => ({
      id: `treatment:${treatment.slug}`,
      area: "treatment" as const,
      label: treatment.title,
      status: treatment.medicalApprovalStatus,
      todos: treatment.contentTodos,
    })),
    ...priceCategories.flatMap((category) => category.items.map<ContentStatusItem>((item) => ({
      id: `price:${item.treatmentSlug}`,
      area: "price" as const,
      label: `${category.title}: ${item.label}`,
      status: item.approvalStatus,
      todos: item.price ? [] : ["Finalen Preis kaufmännisch und medizinisch freigeben."],
    }))),
    ...practiceItems,
    ...Object.values(mediaSlots).map<ContentStatusItem>((media) => ({ id: `media:${media.id}`, area: "media", label: media.alt, status: media.approvalStatus, todos: [media.todo] })),
    ...doctorItems,
    ...finderMappingItems,
  ];

  const summary = items.reduce<Record<MedicalApprovalStatus, number>>((counts, item) => {
    counts[item.status] += 1;
    return counts;
  }, { approved: 0, needs_review: 0, missing: 0 });

  return { generatedAt: new Date().toISOString(), summary, items };
}
