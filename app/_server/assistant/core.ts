export type MedicalApprovalStatus = "approved" | "needs_review" | "missing";
export type KnowledgeCategory = "practice" | "booking" | "navigation" | "treatment" | "price" | "faq" | "hair";

export type KnowledgeEntry = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  url: string;
  medicalApprovalStatus: MedicalApprovalStatus;
  keywords: string[];
  lastUpdated: string;
};

export type InquiryCategory = "botulinumtoxin" | "hyaluronsaeure" | "biostimulatoren" | "polynukleotide" | "co2_laser" | "tattoo_laser" | "hifu" | "prp" | "haarausfall" | "haartransplantation" | "gesundheit" | "diagnostik" | "kosmetik" | "termin" | "allgemeine_anfrage" | "unknown";
export type InquiryIntent = "navigation" | "information" | "price" | "booking" | "consultation" | "hair_check" | "unknown";

export type InquiryClassification = {
  category: InquiryCategory;
  intent: InquiryIntent;
  nextAction: "open_page" | "book_appointment" | "start_hair_check" | "personal_consultation";
  relevantUrl: string;
};

export type AssistantAction = { label: string; href: string };
export type ConversationTurn = { role: "user" | "assistant"; content: string };
export type AssistantProviderInput = { message: string; history: ConversationTurn[]; knowledge: KnowledgeEntry[]; maxOutputTokens: number };
export type ProviderResult<T> = { ok: true; value: T } | { ok: false; code: "unavailable" | "invalid_response" | "request_failed" };

export interface AIProvider {
  readonly name: string;
  readonly configured: boolean;
  generateAssistantResponse(input: AssistantProviderInput): Promise<ProviderResult<{ text: string }>>;
  classifyInquiry(input: { message: string }): Promise<ProviderResult<InquiryClassification>>;
  summarizeConsultation(input: { deterministicSummary: string; maxOutputTokens: number }): Promise<ProviderResult<{ text: string }>>;
}

export type AssistantAnswer = {
  mode: "provider" | "fallback" | "guardrail";
  code: string;
  text: string;
  actions: AssistantAction[];
  classification: InquiryClassification;
};

const normalized = (value: string) => value.toLocaleLowerCase("de-DE").normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
const includesAny = (value: string, terms: string[]) => terms.some((term) => value.includes(term));
const words = (value: string) => [...new Set(normalized(value).split(/[^a-z0-9äöüß]+/).filter((word) => word.length >= 3))];

const categoryRules: { category: InquiryCategory; terms: string[]; url: string }[] = [
  { category: "botulinumtoxin", terms: ["botox", "botulinum"], url: "/behandlungen/botulinumtoxin/" },
  { category: "hyaluronsaeure", terms: ["hyaluron", "filler"], url: "/behandlungen/hyaluronsaeure/" },
  { category: "biostimulatoren", terms: ["biostimulator", "sculptra", "radiesse", "nctf"], url: "/behandlungen/biostimulatoren/" },
  { category: "polynukleotide", terms: ["polynukleotid", "lachs-dna", "lachsdna"], url: "/behandlungen/polynukleotide/" },
  { category: "co2_laser", terms: ["co2", "co₂"], url: "/behandlungen/co2-laser/" },
  { category: "tattoo_laser", terms: ["tattoo", "tatowierung"], url: "/behandlungen/tattoo-laser/" },
  { category: "hifu", terms: ["hifu"], url: "/behandlungen/hifu/" },
  { category: "haartransplantation", terms: ["haartransplant", "graft"], url: "/behandlungen/haartransplantation/" },
  { category: "prp", terms: ["prp", "prf", "plasma"], url: "/behandlungen/prp/" },
  { category: "haarausfall", terms: ["haarausfall", "haarverlust", "geheimrat", "haarlinie", "haare"], url: "/haare/" },
  { category: "diagnostik", terms: ["diagnostik", "blutuntersuch", "labor"], url: "/gesundheit/" },
  { category: "gesundheit", terms: ["gesundheit", "infusion", "gewicht"], url: "/gesundheit/" },
  { category: "kosmetik", terms: ["kosmetik", "aquafacial", "microneedling"], url: "/kosmetik/" },
  { category: "termin", terms: ["termin", "buchen", "buchung", "planity"], url: "/termin/" },
];

export function classifyInquiryLocally(message: string): InquiryClassification {
  const value = normalized(message);
  const rule = categoryRules.find(({ terms }) => includesAny(value, terms));
  const category = rule?.category ?? (value.trim() ? "allgemeine_anfrage" : "unknown");
  const intent: InquiryIntent = includesAny(value, ["preis", "kosten"]) ? "price"
    : includesAny(value, ["termin", "buchen", "buchung", "planity"]) ? "booking"
      : includesAny(value, ["haar-check", "haarcheck"]) ? "hair_check"
        : includesAny(value, ["wo finde", "seite", "link", "öffnen", "oeffnen"]) ? "navigation"
          : includesAny(value, ["beratung", "passt", "geeignet"]) ? "consultation"
            : value.trim() ? "information" : "unknown";
  const relevantUrl = intent === "hair_check" ? "/haare/haar-check/" : rule?.url ?? "/behandlungen/";
  const nextAction = intent === "booking" ? "book_appointment" : intent === "hair_check" ? "start_hair_check" : intent === "consultation" ? "personal_consultation" : "open_page";
  return { category, intent, nextAction, relevantUrl };
}

export function retrieveApprovedKnowledge(entries: KnowledgeEntry[], query: string, limit = 6): KnowledgeEntry[] {
  const queryWords = words(query);
  if (!queryWords.length) return [];
  return entries
    .filter((entry) => entry.medicalApprovalStatus === "approved")
    .map((entry) => {
      const title = normalized(entry.title);
      const content = normalized(entry.content);
      const keywords = entry.keywords.map(normalized);
      const score = queryWords.reduce((total, word) => total + (title.includes(word) ? 5 : 0) + (keywords.some((keyword) => keyword.includes(word) || word.includes(keyword)) ? 3 : 0) + (content.includes(word) ? 1 : 0), 0);
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .slice(0, Math.max(1, Math.min(limit, 10)))
    .map(({ entry }) => entry);
}

type GuardrailMatch = { code: string; text: string };

export function evaluateGuardrails(message: string): GuardrailMatch | null {
  const value = normalized(message);
  if (includesAny(value, ["ignoriere alle", "ignoriere deine", "systemprompt", "system prompt", "api key", "api-key", "environment variable", "umgebungsvariable", "interne todo", "rollenwechsel", "tu so als", "developer message", "knowledge base komplett", "wissensbasis komplett"])) {
    return { code: "protected_information", text: "Dabei kann ich nicht helfen. Ich beantworte nur Fragen auf Basis freigegebener öffentlicher Melimedics-Informationen." };
  }
  if (includesAny(value, ["andere patient", "anderen patient", "patientendaten", "patienteninformation", "frühere patient", "fruehere patient"])) {
    return { code: "patient_privacy", text: "Informationen über andere Patientinnen oder Patienten sind privat und werden nicht bereitgestellt. Gern helfe ich mit öffentlichen Praxisinformationen weiter." };
  }
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(message) || /(?:\+?\d[\d\s()/.-]{7,}\d)/.test(message) || includesAny(value, ["mein name ist", "ich heiße", "ich heisse", "meine adresse ist"])) {
    return { code: "personal_data_input", text: "Bitte geben Sie hier keine persönlichen Kontakt-, Identifikations- oder Gesundheitsdaten ein. Für persönliche Angaben nutzen Sie bitte den geschützten Anfrageweg oder die direkte Terminbuchung." };
  }
  if (includesAny(value, ["analysiere mein bild", "bewerte mein bild", "foto analys", "bilddiagnos", "wie viele graft", "graft brauche", "graft benötige", "graft benoetige"])) {
    return { code: "image_or_graft_request", text: "Bilder werden hier nicht diagnostisch ausgewertet und eine Graft-Zahl lässt sich nicht automatisch bestimmen. Beides erfordert eine persönliche ärztliche Untersuchung und Beratung." };
  }
  if (includesAny(value, ["welche medikament", "welches medikament", "was soll ich nehmen", "dosierung", "wie viel mg", "verschreib"])) {
    return { code: "medication_request", text: "Ich kann keine Medikamente oder Dosierungen empfehlen. Bitte klären Sie das persönlich mit einer Ärztin oder einem Arzt." };
  }
  if (includesAny(value, ["diagnostiziere", "welche krankheit habe", "was habe ich", "stelle eine diagnose", "brauche ich eine haartransplant", "bin ich geeignet", "welche therapie brauche", "welche behandlung brauche", "entscheide meine behandlung"])) {
    return { code: "individual_medical_decision", text: "Eine Diagnose, Eignungs- oder Therapieentscheidung ist hier nicht möglich. Ich kann allgemeine freigegebene Informationen zeigen und Sie zur persönlichen ärztlichen Beratung führen." };
  }
  if (includesAny(value, ["garantiert", "garantie", "erfolg garant", "sicher neue haare", "100 prozent erfolg"])) {
    return { code: "guarantee_request", text: "Medizinische Ergebnisse können nicht garantiert oder automatisch prognostiziert werden. Realistische Möglichkeiten und Grenzen werden im persönlichen Beratungsgespräch geklärt." };
  }
  if (includesAny(value, ["akuter notfall", "bewusstlos", "starke blutung", "atemnot", "brustschmerz"])) {
    return { code: "urgent_symptoms", text: "Akute Beschwerden kann dieser Assistent nicht beurteilen. Bitte wenden Sie sich umgehend an professionelle medizinische Hilfe oder im akuten Notfall an den örtlichen Notruf." };
  }
  return null;
}

const medicalTerms = ["diagnose", "therapie", "risiko", "nebenwirkung", "kontraindikation", "wirkt", "wirkung", "geeignet", "erforderlich", "haarausfall", "haartransplant", "botox", "botulinum", "hyaluron", "laser", "prp", "medikament", "dosierung", "behandlung passt"];
const medicalCategories = new Set<KnowledgeCategory>(["treatment", "faq", "hair"]);

function actionsFor(classification: InquiryClassification): AssistantAction[] {
  const primaryLabel = classification.intent === "booking" ? "Termin vereinbaren" : classification.intent === "hair_check" ? "Haar-Check starten" : classification.category === "haarausfall" || classification.category === "haartransplantation" ? "Zur Haarmedizin" : "Passende Seite öffnen";
  const actions: AssistantAction[] = [{ label: primaryLabel, href: classification.relevantUrl }];
  if (classification.relevantUrl !== "/termin/") actions.push({ label: "Termin vereinbaren", href: "/termin/" });
  return actions;
}

const unsafeOutputPatterns = [
  /(?:sie|du) (?:haben|hast|leiden|leidest) (?:an|unter)/i,
  /(?:sie sind|du bist) (?:für .* )?geeignet/i,
  /\b\d{2,5}\s*grafts?\b/i,
  /\b\d+(?:[.,]\d+)?\s*(?:mg|ml)\b/i,
  /(?:garantiert|garantiere|sicherer erfolg|100\s*%)/i,
  /(?:api[_ -]?key|systemprompt|environment variable|patientendaten anderer)/i,
  /\b(?:diagnose|norwood|therapieempfehl\w*|dringlich\w*|prognose)\b/i,
];

export function isUnsafeProviderOutput(text: string) {
  return unsafeOutputPatterns.some((pattern) => pattern.test(text));
}

const unavailableText = "Der digitale Assistent ist momentan nicht verfügbar. Sie können direkt eine Behandlung auswählen oder einen Termin vereinbaren.";
const unknownText = "Dazu liegt mir aktuell keine freigegebene Melimedics-Information vor. Diese Frage lässt sich am besten im persönlichen Beratungsgespräch klären.";

export async function answerPublicAssistant(input: { message: string; history?: ConversationTurn[]; knowledge: KnowledgeEntry[]; provider: AIProvider; maxOutputTokens?: number }): Promise<AssistantAnswer> {
  const message = input.message.trim().slice(0, 600);
  const classification = classifyInquiryLocally(message);
  const actions = actionsFor(classification);
  const guardrail = evaluateGuardrails(message);
  if (guardrail) return { mode: "guardrail", code: guardrail.code, text: guardrail.text, actions, classification };

  const knowledge = retrieveApprovedKnowledge(input.knowledge, message);
  const asksMedicalQuestion = includesAny(normalized(message), medicalTerms);
  if (asksMedicalQuestion && !knowledge.some((entry) => medicalCategories.has(entry.category))) {
    return { mode: "guardrail", code: "medical_knowledge_unapproved", text: unknownText, actions, classification };
  }
  if (!knowledge.length) return { mode: "fallback", code: "knowledge_unavailable", text: unknownText, actions, classification };
  if (!input.provider.configured) return { mode: "fallback", code: "provider_unavailable", text: unavailableText, actions, classification };

  // Prior turns stay in the active browser UI but never enter an external provider request.
  const history: ConversationTurn[] = [];
  let result: ProviderResult<{ text: string }>;
  try { result = await input.provider.generateAssistantResponse({ message, history, knowledge, maxOutputTokens: Math.max(80, Math.min(input.maxOutputTokens ?? 300, 600)) }); }
  catch { return { mode: "fallback", code: "provider_unavailable", text: unavailableText, actions, classification }; }
  if (!result.ok) return { mode: "fallback", code: "provider_unavailable", text: unavailableText, actions, classification };
  const text = result.value.text.trim().slice(0, 1200);
  if (!text || isUnsafeProviderOutput(text)) return { mode: "guardrail", code: "unsafe_provider_output", text: unknownText, actions, classification };
  return { mode: "provider", code: "ok", text, actions, classification };
}
