import type { AIProvider, ProviderResult } from "./core";
import type { HairConsultation } from "../hair-consultations/core";

const labels: Record<string, string> = {
  "under-20": "unter 20 Jahre", "20-29": "20–29 Jahre", "30-39": "30–39 Jahre", "40-49": "40–49 Jahre", "50-plus": "50 Jahre oder älter",
  "under-6-months": "unter 6 Monaten", "6-12-months": "6–12 Monaten", "1-3-years": "1–3 Jahren", "over-3-years": "mehr als 3 Jahren", unsure: "nicht sicher einschätzbar",
  female: "weiblich", male: "männlich", diverse: "divers", "no-answer": "keine Angabe",
  temples: "Geheimratsecken", hairline: "Haarlinie", top: "Oberkopf", crown: "Tonsur", diffuse: "diffuser Haarverlust", multiple: "mehrere Bereiche",
  "slowly-years": "langsam über Jahre", "recently-stronger": "in den letzten Monaten stärker", stable: "seit einiger Zeit stabil", "hard-to-judge": "schwer einzuschätzen",
  yes: "ja", "no-stable": "nein, eher stabil",
  "prp-prf": "PRP / PRF", transplant: "frühere Haartransplantation", medical: "medizinische Behandlung", cosmetic: "kosmetische Produkte", none: "keine bisherige Behandlung", other: "andere Behandlung",
  "understand-cause": "Ursache besser verstehen", prp: "PRP / regenerative Haarbehandlung", combination: "Kombination verschiedener Möglichkeiten", consultation: "zunächst Beratung",
  soon: "möglichst bald", "1-3-months": "in den nächsten 1–3 Monaten", later: "später", information: "zunächst Information",
};

const display = (value: string) => labels[value] ?? value;
const list = (values: string[]) => values.map(display).join(", ");
const interestList = (values: string[]) => values.map((value) => value === "transplant" ? "Haartransplantationsberatung" : value === "unsure" ? "noch unsicher" : display(value)).join(", ");
const unsafeEnhancement = (text: string) => /\b(?:diagnose|norwood|grafts?|eignung|therapieempfehl\w*|dringlich\w*|prognose|erfolgsaussicht)\b/i.test(text) || /\b\d+(?:[.,]\d+)?\s*(?:mg|ml)\b/i.test(text);

export function summarizeHairConsultationLocally(record: HairConsultation): string {
  const lines = [
    `Altersgruppe: ${display(record.ageRange)}.`,
    record.gender ? `Geschlechtsangabe: ${display(record.gender)}.` : "",
    `Veränderung beobachtet seit: ${display(record.duration)}.`,
    record.affectedAreas.length ? `Betroffene Bereiche: ${list(record.affectedAreas)}.` : "",
    `Verlauf: ${display(record.progression)}.`,
    `Aktuell weiterer Haarverlust: ${display(record.ongoingLoss)}.`,
    record.previousTreatments.length ? `Bisherige Behandlung: ${list(record.previousTreatments)}.` : "",
    record.previousTreatmentNote ? `Vorhandener Zusatzhinweis: ${record.previousTreatmentNote}.` : "",
    record.interest.length ? `Interesse: ${interestList(record.interest)}.` : "",
    `Gewünschter Zeitraum: ${display(record.desiredTimeframe)}.`,
    `${record.photoReferences.length}/5 optionale Foto-Slots vorhanden.`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function optionallyEnhanceConsultationSummary(input: { record: HairConsultation; provider: AIProvider; enabled: boolean; maxOutputTokens?: number }): Promise<{ text: string; enhanced: boolean; providerResult?: ProviderResult<{ text: string }> }> {
  const deterministicSummary = summarizeHairConsultationLocally(input.record);
  if (!input.enabled || !input.provider.configured) return { text: deterministicSummary, enhanced: false };
  const providerResult = await input.provider.summarizeConsultation({ deterministicSummary, maxOutputTokens: Math.max(80, Math.min(input.maxOutputTokens ?? 240, 400)) });
  if (!providerResult.ok || !providerResult.value.text.trim() || unsafeEnhancement(providerResult.value.text)) return { text: deterministicSummary, enhanced: false, providerResult };
  return { text: providerResult.value.text.trim().slice(0, 1800), enhanced: true, providerResult };
}
