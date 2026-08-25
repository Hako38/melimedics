export type MedicalApprovalStatus = "approved" | "needs_review" | "missing";
export type TreatmentCategory = "aesthetics" | "skin_laser" | "prp" | "hair" | "health" | "cosmetics";
export type BookingType = "consultation" | "treatment";

export type TreatmentLink = {
  title: string;
  href: string;
  category: TreatmentCategory;
  shortDescription: string;
};

export type TreatmentContent = TreatmentLink & {
  slug: string;
  eyebrow: string;
  hero: string;
  concerns?: string[];
  explanation?: string[];
  facts?: { label: string; value: string }[];
  procedure?: { title: string; copy: string }[];
  benefits?: string[];
  risks?: string[];
  price?: string;
  faq?: { question: string; answer: string }[];
  relatedTreatments?: string[];
  bookingType: BookingType;
  medicalApprovalStatus: MedicalApprovalStatus;
  contentTodos: string[];
  theme?: "default" | "hair";
};

const consultationProcess = [
  { title: "Beratung", copy: "Anliegen, Erwartungen und medizinische Ausgangssituation werden persönlich besprochen." },
  { title: "Einordnung", copy: "Die Eignung und mögliche Alternativen werden ärztlich eingeordnet." },
  { title: "Planung", copy: "Erst danach entsteht ein individueller Behandlungs- und Nachsorgeplan." },
];

export const treatments: TreatmentContent[] = [
  {
    slug: "botulinumtoxin", title: "Botulinumtoxin", href: "/behandlungen/botulinumtoxin/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Mimik verstehen. Persönlich beraten.", shortDescription: "Ärztliche Beratung zu einer Behandlung mit Botulinumtoxin bei Melimedics in Mainz.",
    concerns: ["Veränderungen der Gesichtsmimik", "Wunsch nach einer ärztlichen Einschätzung", "Abwägung möglicher Behandlungswege"],
    explanation: ["Botulinumtoxin ist eine ärztliche Behandlung. Ob sie zum individuellen Anliegen passt, wird erst nach Anamnese und persönlicher Untersuchung entschieden."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review",
    relatedTreatments: ["hyaluronsaeure", "biostimulatoren", "polynukleotide"],
    contentTodos: ["Indikationen, Wirkweise, Dosierung und Behandlungsareale medizinisch freigeben.", "Risiken, Kontraindikationen, Wirkeintritt und Haltbarkeit ergänzen.", "Preis freigeben."]
  },
  {
    slug: "hyaluronsaeure", title: "Hyaluronsäure", href: "/behandlungen/hyaluronsaeure/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Proportionen mit Ruhe betrachten.", shortDescription: "Individuelle ärztliche Beratung zu Hyaluronsäure-Behandlungen in Mainz.",
    concerns: ["Lippen", "Nase", "Jawline", "Kinn", "Augenringe", "Nasolabialfalten", "Marionettenfalten"],
    explanation: ["Die genannten Behandlungsbereiche sind mögliche Beratungsthemen. Ob und wie behandelt wird, richtet sich nach Anatomie, Ausgangssituation und ärztlicher Einschätzung."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review",
    relatedTreatments: ["botulinumtoxin", "biostimulatoren", "polynukleotide"],
    contentTodos: ["Produkte, Technik und Behandlungsdetails medizinisch freigeben.", "Risiken, Kontraindikationen, Haltbarkeit und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "biostimulatoren", title: "Biostimulatoren", href: "/behandlungen/biostimulatoren/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Behandlungsoptionen differenziert einordnen.", shortDescription: "Ärztliche Beratung zu Biostimulatoren wie Sculptra, Radiesse und NCTF in Mainz.",
    concerns: ["Sculptra", "Radiesse", "NCTF"], explanation: ["Unter dem Begriff Biostimulatoren werden unterschiedliche Behandlungsoptionen zusammengefasst. Die Auswahl setzt eine persönliche ärztliche Beratung voraus."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["hyaluronsaeure", "polynukleotide"],
    contentTodos: ["Einordnung der genannten Produkte und zugelassenen Anwendungen prüfen.", "Risiken, Kontraindikationen, Ablauf und Nachsorge freigeben.", "Preis freigeben."]
  },
  {
    slug: "polynukleotide", title: "Polynukleotide", href: "/behandlungen/polynukleotide/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Regenerative Ansätze persönlich besprechen.", shortDescription: "Ärztliche Beratung zu Polynukleotiden, ergänzend auch als Lachs-DNA bezeichnet, in Mainz.",
    concerns: ["Polynukleotide", "Verständliche Nutzerbezeichnung: Lachs-DNA"], explanation: ["„Lachs-DNA“ ist eine verbreitete, vereinfachende Nutzerbezeichnung. Maßgeblich ist die ärztliche Einordnung des konkreten Produkts und seiner Eignung."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["biostimulatoren", "hyaluronsaeure"],
    contentTodos: ["Medizinische Einordnung, Produkte, Indikationen und Evidenz prüfen.", "Risiken, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "co2-laser", title: "CO₂-Laser", href: "/behandlungen/co2-laser/", category: "skin_laser", eyebrow: "Haut & Laser",
    hero: "Hautbehandlung braucht ein klares Konzept.", shortDescription: "Ärztliche Beratung zu CO₂-Laser-Behandlungen bei Melimedics in Mainz.",
    concerns: ["Individuelle Einschätzung des Hautzustands", "Besprechung möglicher Behandlungsziele", "Abwägung geeigneter Alternativen"],
    explanation: ["Vor einer Laserbehandlung werden Hautzustand, Ziel und mögliche Alternativen ärztlich eingeordnet. Konkrete Parameter werden nicht pauschal festgelegt."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["microneedling", "hifu"],
    contentTodos: ["Gerät, Indikationen und Behandlungsparameter verifizieren.", "Risiken, Kontraindikationen, Ausfallzeit und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "tattoo-laser", title: "Tattoo-Laser", href: "/behandlungen/tattoo-laser/", category: "skin_laser", eyebrow: "Haut & Laser",
    hero: "Tattoo-Entfernung sorgfältig planen.", shortDescription: "Persönliche ärztliche Beratung zur Tattoo-Laserbehandlung in Mainz.",
    concerns: ["Tattoo und Hautzustand beurteilen", "Realistische Planung besprechen", "Nachsorge von Anfang an mitdenken"],
    explanation: ["Eine mögliche Tattoo-Laserbehandlung wird anhand der individuellen Ausgangssituation geplant. Aussagen zu Umfang und Ergebnis benötigen die persönliche Untersuchung."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser"],
    contentTodos: ["Lasersystem und geeignete Indikationen verifizieren.", "Sitzungsplanung, Risiken, Kontraindikationen und Nachsorge freigeben.", "Preis freigeben."]
  },
  {
    slug: "hifu", title: "HIFU", href: "/behandlungen/hifu/", category: "skin_laser", eyebrow: "Haut & Technologie",
    hero: "Technologie sinnvoll einordnen.", shortDescription: "Ärztliche Beratung zu HIFU bei Melimedics in Mainz.",
    concerns: ["Persönliche Eignung klären", "Behandlungsziele realistisch besprechen", "Alternativen ärztlich abwägen"],
    explanation: ["Ob HIFU für ein Anliegen infrage kommt, lässt sich nicht pauschal beurteilen. Grundlage ist eine persönliche ärztliche Einschätzung."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser", "biostimulatoren"],
    contentTodos: ["Gerät, Wirkprinzip und Indikationen medizinisch freigeben.", "Risiken, Kontraindikationen, Ergebnisentwicklung und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "prp-behandlung", title: "PRP-Behandlung", href: "/behandlungen/prp-behandlung/", category: "prp", eyebrow: "PRP",
    hero: "Eigenmaterial individuell einsetzen.", shortDescription: "Ärztliche Beratung zu PRP-Behandlungen bei Melimedics in Mainz.",
    concerns: ["Ästhetische Anwendung ärztlich prüfen", "Ausgangssituation und Ziel besprechen", "Alternativen einordnen"],
    explanation: ["PRP wird aus dem eigenen Blut aufbereitet. Die medizinische Eignung und der mögliche Einsatzbereich werden vorab persönlich geprüft."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["prp-haare", "polynukleotide"],
    contentTodos: ["Aufbereitung, Indikationen und Ablauf medizinisch freigeben.", "Risiken, Kontraindikationen, Sitzungsplanung und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "haarausfall", title: "Haarausfall", href: "/behandlungen/haarausfall/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Haarausfall verstehen, bevor behandelt wird.", shortDescription: "Ärztliche Beratung und diagnostische Einordnung bei Haarausfall in Mainz.",
    concerns: ["Veränderungen frühzeitig einordnen", "Mögliche Ursachen ärztlich besprechen", "Einen realistischen nächsten Schritt planen"],
    explanation: ["Haarausfall kann unterschiedliche Hintergründe haben. Deshalb steht die individuelle ärztliche Einordnung vor jeder möglichen Behandlung."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["prp-haare", "haartransplantation"],
    contentTodos: ["Anamnese, Diagnostik und Differenzialdiagnosen medizinisch ausarbeiten.", "Konkrete Untersuchungen und Behandlungsoptionen erst nach Freigabe ergänzen.", "Beratungspreis freigeben."]
  },
  {
    slug: "prp-haare", title: "PRP Haare", href: "/behandlungen/prp-haare/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Haare stärken – als Teil eines Plans.", shortDescription: "Ärztliche Beratung zu PRP für Haare bei Melimedics in Mainz.",
    concerns: ["Haarausfall ärztlich einordnen", "Eignung für PRP prüfen", "Verlauf und Alternativen besprechen"],
    explanation: ["PRP Haare kann nach ärztlicher Prüfung ein Baustein eines individuellen Behandlungskonzepts sein. Eine pauschale Empfehlung ist nicht möglich."],
    procedure: consultationProcess, bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["haarausfall", "haartransplantation", "prp-behandlung"],
    contentTodos: ["Indikationen, Aufbereitung und Behandlungsprotokoll medizinisch freigeben.", "Risiken, Kontraindikationen, Sitzungsanzahl und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "haartransplantation", title: "Haartransplantation", href: "/behandlungen/haartransplantation/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Eine operative Option braucht sorgfältige Planung.", shortDescription: "Persönliche Beratung zur möglichen Haartransplantation bei Melimedics in Mainz.",
    concerns: ["Wenn Haarausfall dauerhaft belastet", "Wenn nicht-operative Wege besprochen wurden", "Wenn eine realistische ärztliche Einschätzung gewünscht ist"],
    explanation: ["Bei einer Haartransplantation werden körpereigene Haarwurzeln aus einem geeigneten Bereich in einen geplanten Zielbereich übertragen. Ob dieser operative Weg infrage kommt, wird individuell ärztlich beurteilt."],
    procedure: [
      { title: "Beratung", copy: "Anliegen, Ausgangssituation und Erwartungen werden persönlich besprochen." },
      { title: "Planung", copy: "Erst nach ärztlicher Einschätzung kann ein individueller Plan entstehen." },
      { title: "Eingriff", copy: "Operateur, Standort, Methode und Umfang werden erst nach medizinischer Freigabe veröffentlicht." },
      { title: "Heilungsphase", copy: "Die individuelle Heilungsphase und alle Verhaltenshinweise werden im Beratungsgespräch erklärt." },
      { title: "Nachsorge", copy: "Kontrollen und Erreichbarkeit werden als fester Teil des Behandlungskonzepts geplant." },
    ],
    faq: [
      { question: "Für wen kann eine Beratung interessant sein?", answer: "Für Menschen, die eine operative Option bei Haarausfall ärztlich und realistisch einordnen lassen möchten. Die Eignung wird individuell geprüft." },
      { question: "Wird bereits eine bestimmte Methode empfohlen?", answer: "Nein. Methode, möglicher Standort und Umfang werden erst nach ärztlicher Freigabe und persönlicher Untersuchung benannt." },
      { question: "Erhalte ich vorab einen konkreten Preis?", answer: "Noch liegt keine freigegebene Preisliste vor. Eine belastbare Kalkulation setzt außerdem die individuelle Planung voraus." },
      { question: "Was gehört zur Nachsorge?", answer: "Der genaue Nachsorgeplan wird passend zum freigegebenen Behandlungskonzept und zur persönlichen Situation festgelegt." },
    ],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["haarausfall", "prp-haare"],
    contentTodos: ["Operateur, Standort und Methode medizinisch und vertraglich bestätigen.", "Eignungskriterien, Risiken, Kontraindikationen und Heilungsverlauf freigeben.", "Keine Graft-Zahlen oder Preise ohne individuelle Planung veröffentlichen."]
  },
  {
    slug: "microneedling", title: "Microneedling", href: "/behandlungen/microneedling/", category: "cosmetics", eyebrow: "Kosmetik",
    hero: "Kosmetische Pflege gezielt ergänzen.", shortDescription: "Kosmetisches Microneedling als ergänzende Behandlung bei Melimedics in Mainz.",
    concerns: ["Hautzustand vorab betrachten", "Pflegeziel gemeinsam besprechen", "Abgrenzung zu ärztlichen Verfahren klären"],
    explanation: ["Microneedling wird bei Melimedics als kosmetische Zusatzbehandlung klar von ärztlichen Kernleistungen abgegrenzt."],
    procedure: consultationProcess, bookingType: "treatment", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser", "aquafacial"],
    contentTodos: ["Gerät, Ablauf, Indikationen und Abgrenzung medizinisch/kosmetisch prüfen.", "Hinweise, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "aquafacial", title: "Aquafacial", href: "/behandlungen/aquafacial/", category: "cosmetics", eyebrow: "Kosmetik",
    hero: "Pflege passend zum Hautzustand.", shortDescription: "Aquafacial als kosmetische Zusatzbehandlung bei Melimedics in Mainz.",
    concerns: ["Reinigung und Pflege", "Individuelle Abstimmung auf den Hautzustand", "Ergänzung eines bestehenden Hautkonzepts"],
    explanation: ["Aquafacial ist als kosmetische Zusatzbehandlung innerhalb der Melimedics-Marke eingeordnet und ersetzt keine ärztliche Diagnostik."],
    procedure: consultationProcess, bookingType: "treatment", medicalApprovalStatus: "needs_review", relatedTreatments: ["microneedling"],
    contentTodos: ["Gerät, Produkte und Behandlungsablauf verifizieren.", "Hinweise, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
];

export const treatmentBySlug = Object.fromEntries(treatments.map((treatment) => [treatment.slug, treatment])) as Record<string, TreatmentContent>;
export const treatmentsByCategory = (category: TreatmentCategory) => treatments.filter((treatment) => treatment.category === category);

export type PriceCategory = {
  title: string;
  items: { treatmentSlug: string; label: string; price: string | null; approvalStatus: MedicalApprovalStatus }[];
};

export const priceCategories: PriceCategory[] = [
  { title: "Botulinumtoxin", items: [{ treatmentSlug: "botulinumtoxin", label: "Botulinumtoxin", price: null, approvalStatus: "missing" }] },
  { title: "Hyaluronsäure", items: [{ treatmentSlug: "hyaluronsaeure", label: "Hyaluronsäure", price: null, approvalStatus: "missing" }] },
  { title: "Biostimulatoren", items: [{ treatmentSlug: "biostimulatoren", label: "Biostimulatoren", price: null, approvalStatus: "missing" }] },
  { title: "Polynukleotide", items: [{ treatmentSlug: "polynukleotide", label: "Polynukleotide", price: null, approvalStatus: "missing" }] },
  { title: "Haut & Laser", items: ["co2-laser", "tattoo-laser", "hifu"].map((slug) => ({ treatmentSlug: slug, label: treatmentBySlug[slug].title, price: null, approvalStatus: "missing" as const })) },
  { title: "PRP", items: ["prp-behandlung", "prp-haare"].map((slug) => ({ treatmentSlug: slug, label: treatmentBySlug[slug].title, price: null, approvalStatus: "missing" as const })) },
  { title: "Haare", items: ["haarausfall", "haartransplantation"].map((slug) => ({ treatmentSlug: slug, label: treatmentBySlug[slug].title, price: null, approvalStatus: "missing" as const })) },
  { title: "Gesundheit", items: [{ treatmentSlug: "gewichtsmanagement", label: "Gewichtsmanagement", price: null, approvalStatus: "missing" }, { treatmentSlug: "diagnostik", label: "Blutuntersuchungen & Diagnostik", price: null, approvalStatus: "missing" }] },
  { title: "Kosmetik", items: ["microneedling", "aquafacial"].map((slug) => ({ treatmentSlug: slug, label: treatmentBySlug[slug].title, price: null, approvalStatus: "missing" as const })) },
];
