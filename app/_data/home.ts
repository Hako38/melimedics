export type LinkCard = {
  title: string;
  copy: string;
  href: string;
  label?: string;
};

export const concerns: LinkCard[] = [
  { title: "Gesicht", copy: "Mimik, Kontur und einen frischen Ausdruck behutsam betrachten.", href: "/behandlungen/gesicht/", label: "Ästhetische Medizin" },
  { title: "Haut", copy: "Hautbild, Struktur und Regeneration individuell einordnen.", href: "/behandlungen/haut-laser/", label: "Haut & Laser" },
  { title: "Haare", copy: "Haarausfall verstehen und passende Perspektiven besprechen.", href: "/haare/", label: "Haarmedizin" },
  { title: "Körper & Gesundheit", copy: "Gesundheitliche Anliegen im persönlichen Gesamtbild betrachten.", href: "/gesundheit/", label: "Gesundheit" },
];

export const featuredTreatments: LinkCard[] = [
  { title: "Botox (Botulinumtoxin)", copy: "Ärztlich geplante Behandlung für ausgewählte mimische und medizinische Anliegen.", href: "/behandlungen/botulinumtoxin/", label: "Gesicht" },
  { title: "Hyaluronsäure", copy: "Individuelle Planung mit Blick auf Proportionen und einen natürlichen Gesamteindruck.", href: "/behandlungen/hyaluronsaeure/", label: "Gesicht" },
  { title: "Biostimulatoren", copy: "Behandlungskonzepte nach persönlicher Beratung und ärztlicher Einschätzung.", href: "/behandlungen/biostimulatoren/", label: "Gesicht" },
  { title: "CO₂-Laser", copy: "Hautbehandlung auf Grundlage von Hautzustand, Anliegen und medizinischer Einschätzung.", href: "/behandlungen/co2-laser/", label: "Haut & Laser" },
  { title: "PRP Haare", copy: "Ein möglicher Baustein eines individuell geplanten Wegs bei Haarausfall.", href: "/behandlungen/prp-haare/", label: "Haarmedizin" },
  { title: "Haartransplantation", copy: "Persönliche Beratung, sorgfältige Planung und eine klare Nachsorgeperspektive.", href: "/behandlungen/haartransplantation/", label: "Haarmedizin" },
];

export const doctor = {
  name: "Melih Kandemir",
  title: null,
  biography: null,
  qualifications: [] as string[],
  training: [] as string[],
  focusAreas: [] as string[],
  originalPhoto: "/images/doctor/melih-kandemir-prp.webp",
  contentTodos: [
    "Vollständigen Namen anhand eines Primärnachweises bestätigen",
    "Korrekte Berufsbezeichnung und Titel freigeben",
    "Vita ärztlich/redaktionell freigeben",
    "Qualifikationen und Fortbildungen verifizieren",
    "Tätigkeitsschwerpunkte bestätigen",
    "Praxisteam und Praxisinformationen ergänzen",
  ],
};

export type VerifiedTestimonial = {
  quote: string;
  displayName: string;
  source: string;
  sourceUrl?: string;
  verifiedAt: string;
};

// Erst nach dokumentierter Verifizierung befüllen. Leere Liste rendert keine Bewertung.
export const verifiedTestimonials: VerifiedTestimonial[] = [];

export const googleReviewSummary = {
  rating: "5,0",
  count: 136,
  label: "Google-Bewertungen",
  sourceUrl: "https://www.google.com/maps/place/Melimedics/@50.0055131,8.2227146,17z/data=!3m1!4b1!4m6!3m5!1s0x47bd953ce8ea976f:0x9e7f5112b0983871!8m2!3d50.0055131!4d8.2227146!16s%2Fg%2F11x80pbclq",
  verifiedAt: "2026-09-01",
} as const;

export const generalFaq = [
  { question: "Wie beginnt eine Behandlung bei Melimedics?", answer: "Am Anfang steht ein persönliches Gespräch. Dabei werden Ihr Anliegen, Ihre Erwartungen und die medizinische Ausgangssituation besprochen, bevor ein möglicher Behandlungsweg geplant wird." },
  { question: "Kann ich direkt einen Beratungstermin vereinbaren?", answer: "Ja. Über die Terminseite erreichen Sie die bestehende Online-Buchung sowie die telefonischen und schriftlichen Kontaktmöglichkeiten der Praxis." },
  { question: "Wie erfahre ich, welche Kosten entstehen?", answer: "Der genaue Preis hängt von Indikation und Behandlungsumfang ab. Sie erhalten eine transparente Auskunft, bevor eine Behandlung durchgeführt wird." },
  { question: "Wo befindet sich die Praxis?", answer: "Melimedics befindet sich in Mainz-Gonsenheim. Die aktuellen Kontaktdaten und Hinweise zur Anschrift finden Sie auf der Kontaktseite." },
];
