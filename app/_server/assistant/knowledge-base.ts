import "server-only";
import { practice } from "../../_data/practice";
import { priceCategories, treatments } from "../../_data/treatments";
import type { KnowledgeEntry } from "./core";

const lastUpdated = "2026-08-31";

const administrativeEntries: KnowledgeEntry[] = [
  {
    id: "practice-location",
    title: "Praxisstandort",
    category: "practice",
    content: `Melimedics befindet sich in der ${practice.street.value} in ${practice.city.value}. Eine Postleitzahl wird erst nach Klärung widersprüchlicher Bestandsangaben veröffentlicht.`,
    url: "/kontakt/",
    medicalApprovalStatus: practice.city.status === "verified" ? "approved" : practice.city.status,
    keywords: ["praxis", "standort", "mainz", "gonsenheim", "adresse", "kontakt"],
    lastUpdated,
  },
  {
    id: "practice-phone",
    title: "Telefonischer Kontakt",
    category: "practice",
    content: `Melimedics ist telefonisch unter ${practice.phone.value} erreichbar.`,
    url: "/kontakt/",
    medicalApprovalStatus: practice.phone.status === "verified" ? "approved" : practice.phone.status,
    keywords: ["telefon", "anrufen", "kontakt", "erreichbar"],
    lastUpdated,
  },
  {
    id: "practice-email",
    title: "Kontakt per E-Mail",
    category: "practice",
    content: `Die verifizierte Kontaktadresse lautet ${practice.email.value}.`,
    url: "/kontakt/",
    medicalApprovalStatus: practice.email.status === "verified" ? "approved" : practice.email.status,
    keywords: ["email", "e-mail", "mail", "kontakt", "schreiben"],
    lastUpdated,
  },
  {
    id: "appointment-booking",
    title: "Terminbuchung",
    category: "booking",
    content: "Termine können über die Terminseite der Website gebucht werden. Dort führt Melimedics zum verifizierten Planity-Buchungsprofil weiter.",
    url: "/termin/",
    medicalApprovalStatus: practice.bookingUrl.status === "verified" ? "approved" : practice.bookingUrl.status,
    keywords: ["termin", "buchen", "buchung", "planity", "beratung"],
    lastUpdated,
  },
  {
    id: "treatment-navigation",
    title: "Behandlungsbereiche auf der Website",
    category: "navigation",
    content: "Die Website gliedert die Navigation in Ästhetische Medizin, Haut und Laser, Haare, Gesundheit und Kosmetik. Medizinische Einzelheiten werden nur aus freigegebenen Quellen beantwortet.",
    url: "/behandlungen/",
    medicalApprovalStatus: "approved",
    keywords: ["behandlungen", "angebot", "bereiche", "ästhetik", "haut", "laser", "haare", "gesundheit", "kosmetik", "finden"],
    lastUpdated,
  },
  {
    id: "hair-navigation",
    title: "Haarmedizin und Haar-Check",
    category: "navigation",
    content: "Die Website bietet einen Bereich Haarmedizin sowie einen freiwilligen Haar-Check zur strukturierten Vorbereitung einer persönlichen Anfrage. Der Haar-Check stellt keine Diagnose und keine Eignungsentscheidung.",
    url: "/haare/haar-check/",
    medicalApprovalStatus: "approved",
    keywords: ["haare", "haarmedizin", "haar-check", "haarcheck", "anfrage", "vorbereitung"],
    lastUpdated,
  },
];

const treatmentEntries: KnowledgeEntry[] = treatments.flatMap((treatment) => {
  const base: KnowledgeEntry = {
    id: `treatment-${treatment.slug}`,
    title: treatment.title,
    category: treatment.category === "hair" ? "hair" : "treatment",
    content: treatment.assistantSummary,
    url: treatment.href,
    medicalApprovalStatus: treatment.assistantApprovalStatus,
    keywords: [treatment.title, treatment.slug, treatment.category, ...(treatment.concerns ?? [])],
    lastUpdated,
  };
  return [base];
});

const priceEntries: KnowledgeEntry[] = priceCategories.flatMap((category) => category.items.map((item) => ({
  id: `price-${item.id}`,
  title: `${category.title}: ${item.label}`,
  category: "price" as const,
  content: `${item.label}: ${item.price} (${item.duration})`,
  url: "/preise/",
  medicalApprovalStatus: item.approvalStatus,
  keywords: ["preis", "kosten", category.title, item.label],
  lastUpdated,
})));

export const melimedicsKnowledgeBase: readonly KnowledgeEntry[] = [...administrativeEntries, ...treatmentEntries, ...priceEntries];
