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
  mechanism?: string[];
  limitations?: string[];
  contraindications?: string[];
  aftercare?: string[];
  risks?: string[];
  price?: string;
  faq?: { question: string; answer: string }[];
  relatedTreatments?: string[];
  bookingType: BookingType;
  medicalApprovalStatus: MedicalApprovalStatus;
  assistantSummary: string;
  assistantApprovalStatus: MedicalApprovalStatus;
  contentTodos: string[];
  theme?: "default" | "hair";
};

const consultationProcess = [
  { title: "Beratung", copy: "Anliegen, Erwartungen und medizinische Ausgangssituation werden persönlich besprochen." },
  { title: "Einordnung", copy: "Die Eignung und mögliche Alternativen werden ärztlich eingeordnet." },
  { title: "Planung", copy: "Erst danach entsteht ein individueller Behandlungs- und Nachsorgeplan." },
];

const injectionAftercare = [
  "Behandelte Bereiche zunächst nicht unnötig berühren oder massieren; individuelle Hinweise der Praxis gehen immer vor.",
  "Bei ungewöhnlich starken, zunehmenden oder anhaltenden Beschwerden zeitnah medizinischen Rat einholen.",
  "Kontroll- und Nachsorgetermine entsprechend der persönlichen Empfehlung wahrnehmen.",
];

const generalContraindications = [
  "Akute Infektionen oder Entzündungen im Behandlungsbereich sprechen gegen eine unmittelbare Behandlung.",
  "Schwangerschaft, Stillzeit, Vorerkrankungen, Allergien und regelmäßig eingenommene Medikamente müssen vorab besprochen werden.",
  "Die endgültige Eignungsentscheidung erfolgt erst nach Anamnese und persönlicher Untersuchung.",
];

export const treatments: TreatmentContent[] = [
  {
    slug: "botulinumtoxin", title: "Botulinumtoxin", href: "/behandlungen/botulinumtoxin/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Mimik verstehen. Persönlich beraten.", shortDescription: "Ärztliche Beratung zu einer Behandlung mit Botulinumtoxin bei Melimedics in Mainz.",
    concerns: ["Ausgeprägte mimische Linien", "Anspannung bestimmter Gesichtsmuskeln", "Wunsch nach einer zurückhaltenden Veränderung"],
    explanation: ["Botulinumtoxin ist ein verschreibungspflichtiger Wirkstoff. In ausgewählten Muskeln kann er die Signalübertragung vorübergehend reduzieren und damit die Aktivität dieser Muskeln beeinflussen.", "Welche Region behandelt werden kann und welches Maß sinnvoll ist, hängt von Mimik, Anatomie, Vorerkrankungen und dem persönlichen Ziel ab. Eine Behandlung erfolgt nur nach ärztlicher Aufklärung."],
    mechanism: ["Der Wirkstoff hemmt zeitlich begrenzt die Übertragung von Nervenimpulsen auf ausgewählte Muskeln.", "Die Wirkung baut sich nicht sofort auf und lässt mit der Zeit wieder nach; der Verlauf ist individuell."],
    facts: [{ label: "Planung", value: "Nach Mimik- und Gesichtsanalyse" }, { label: "Ergebnis", value: "Individuell und vorübergehend" }, { label: "Nachsorge", value: "Persönliche Hinweise beachten" }],
    procedure: consultationProcess,
    benefits: ["Gezielte Behandlung nach individueller Mimik-Analyse", "Dosierung und Ziel werden persönlich abgestimmt", "Zeitlich begrenzte Wirkung ermöglicht Verlaufskontrolle"],
    limitations: ["Statische Linien oder Hautveränderungen lassen sich durch eine Muskelentspannung nicht immer ausreichend beeinflussen.", "Symmetrie und vollständige Faltenfreiheit können nicht zugesichert werden."],
    contraindications: generalContraindications,
    aftercare: injectionAftercare,
    risks: ["Möglich sind vorübergehende Rötung, Schwellung, Blutergüsse, Druckgefühl oder Kopfschmerzen.", "Je nach Behandlungsregion können vorübergehende Asymmetrien, eine unerwünschte Muskelschwäche oder das Absinken benachbarter Strukturen auftreten.", "Seltene systemische Beschwerden wie Schluck-, Sprech- oder Atemprobleme erfordern umgehend medizinische Abklärung."],
    faq: [{ question: "Wann beginnt die Wirkung?", answer: "Sie entwickelt sich typischerweise schrittweise. Der individuelle Verlauf und ein sinnvoller Kontrollzeitpunkt werden im Gespräch erklärt." }, { question: "Ist das Ergebnis dauerhaft?", answer: "Nein. Die Wirkung ist zeitlich begrenzt und nimmt individuell wieder ab." }, { question: "Kann jede mimische Linie behandelt werden?", answer: "Nein. Anatomie, Ursache und Nutzen-Risiko-Abwägung entscheiden, ob eine Behandlung sinnvoll ist." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review",
    assistantSummary: "Botulinumtoxin ist eine verschreibungspflichtige ärztliche Behandlung. Eignung, Region und Dosierung werden erst nach persönlicher Anamnese und Untersuchung festgelegt; Ergebnisse sind vorübergehend und individuell.", assistantApprovalStatus: "approved",
    relatedTreatments: ["hyaluronsaeure", "biostimulatoren", "polynukleotide"],
    contentTodos: ["Indikationen, Wirkweise, Dosierung und Behandlungsareale medizinisch freigeben.", "Risiken, Kontraindikationen, Wirkeintritt und Haltbarkeit ergänzen.", "Preis freigeben."]
  },
  {
    slug: "hyaluronsaeure", title: "Hyaluronsäure", href: "/behandlungen/hyaluronsaeure/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Proportionen mit Ruhe betrachten.", shortDescription: "Individuelle ärztliche Beratung zu Hyaluronsäure-Behandlungen in Mainz.",
    concerns: ["Lippen", "Nase", "Jawline", "Kinn", "Augenringe", "Nasolabialfalten", "Marionettenfalten"],
    explanation: ["Hyaluronsäure-Filler können je nach Produkt und Region zur Konturierung, zum Volumenausgleich oder zur Unterstützung von Proportionen eingesetzt werden. Lippen, Nase, Jawline, Kinn, Tränenrinne, Nasolabial- und Marionettenfalten benötigen jeweils eine eigene anatomische Bewertung.", "Nicht jeder Wunsch lässt sich sicher oder sinnvoll mit Filler behandeln. Produkt, Menge und Technik werden nicht pauschal, sondern erst nach Untersuchung festgelegt."],
    mechanism: ["Vernetzte Hyaluronsäure bindet Wasser und kann Gewebe vorübergehend stützen oder konturieren.", "Produktwahl und Platzierung beeinflussen Wirkung und Risikoprofil."],
    facts: [{ label: "Bereiche", value: "Lippen, Nase, Kontur und Falten" }, { label: "Planung", value: "Anatomisch individuell" }, { label: "Ergebnis", value: "Vorübergehend" }],
    procedure: consultationProcess,
    benefits: ["Individuelle Planung nach Gesichtsanatomie", "Unterschiedliche Ziele von Kontur bis Volumenausgleich möglich", "Schrittweises Vorgehen kann Überkorrekturen vermeiden helfen"],
    limitations: ["Vorhandene Asymmetrien bleiben möglicherweise sichtbar; ein exakt symmetrisches Ergebnis ist nicht garantierbar.", "Nicht jedes Areal oder Behandlungsziel ist für Filler geeignet."],
    contraindications: generalContraindications,
    aftercare: injectionAftercare,
    risks: ["Häufiger sind vorübergehende Schwellung, Rötung, Druckempfindlichkeit oder Blutergüsse.", "Möglich sind tastbare Unebenheiten, Asymmetrien, Infektion oder länger anhaltende Schwellung.", "Eine unbeabsichtigte Injektion in ein Blutgefäß ist selten, kann aber Gewebeschäden sowie Seh- oder neurologische Störungen verursachen und ist ein medizinischer Notfall."],
    faq: [{ question: "Welche Region passt zu meinem Anliegen?", answer: "Das lässt sich erst nach Betrachtung von Anatomie, Proportionen und Gewebequalität seriös beantworten." }, { question: "Wie lange hält das Ergebnis?", answer: "Die Dauer variiert nach Produkt, Region, Stoffwechsel und weiteren individuellen Faktoren. Eine feste Haltbarkeit wird nicht zugesichert." }, { question: "Kann eine Nasenkorrektur ohne Operation jedes Problem lösen?", answer: "Nein. Eine Fillerbehandlung verändert keine knöchernen Strukturen und ist nicht für jede Ausgangssituation geeignet." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review",
    assistantSummary: "Hyaluronsäure-Filler können vorübergehend Volumen oder Konturen beeinflussen. Region, Produkt, Menge und Eignung werden nach persönlicher anatomischer Untersuchung festgelegt; seltene Gefäßkomplikationen erfordern sofortige Behandlung.", assistantApprovalStatus: "approved",
    relatedTreatments: ["botulinumtoxin", "biostimulatoren", "polynukleotide"],
    contentTodos: ["Produkte, Technik und Behandlungsdetails medizinisch freigeben.", "Risiken, Kontraindikationen, Haltbarkeit und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "biostimulatoren", title: "Biostimulatoren", href: "/behandlungen/biostimulatoren/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Behandlungsoptionen differenziert einordnen.", shortDescription: "Ärztliche Beratung zu Biostimulatoren wie Sculptra, Radiesse und NCTF in Mainz.",
    concerns: ["Nachlassende Hautfestigkeit", "Veränderungen von Volumen und Kontur", "Sculptra, Radiesse oder NCTF als Beratungsthema"], explanation: ["Biostimulatoren ist ein Sammelbegriff für unterschiedliche injizierbare Präparate. Sculptra, Radiesse und NCTF unterscheiden sich in Zusammensetzung, Wirkprinzip, Zulassung und Anwendung und sind deshalb nicht austauschbar.", "Eine mögliche Behandlung wird anhand von Haut, Gewebe, Ziel und Produktinformation ärztlich geplant. Markennamen beschreiben hier nur Beratungsthemen, keine pauschale Empfehlung."],
    mechanism: ["Je nach Präparat stehen eine Stimulation körpereigener Umbauprozesse, eine stützende Wirkung oder die Einbringung bestimmter Inhaltsstoffe im Vordergrund.", "Ergebnisse entwickeln sich je nach Produkt unterschiedlich und bleiben individuell."],
    facts: [{ label: "Produkte", value: "Unterschiedlich einzuordnen" }, { label: "Entwicklung", value: "Schrittweise und individuell" }, { label: "Auswahl", value: "Erst nach Untersuchung" }],
    procedure: consultationProcess,
    benefits: ["Produktwahl orientiert sich an Gewebe und Ziel", "Langsame Ergebnisentwicklung kann differenziert begleitet werden", "Alternativen werden in die Beratung einbezogen"],
    limitations: ["Die Präparate sind nicht für jedes Areal oder jedes Ziel geeignet.", "Ein bestimmtes Ausmaß oder eine bestimmte Dauer des Ergebnisses kann nicht versprochen werden."], contraindications: generalContraindications, aftercare: injectionAftercare,
    risks: ["Möglich sind Rötung, Schwellung, Druckempfindlichkeit, Blutergüsse oder vorübergehende Unebenheiten.", "Je nach Präparat können Knoten, Entzündungsreaktionen, Infektionen oder Asymmetrien auftreten.", "Produktspezifische seltene Risiken werden vor einer möglichen Behandlung gesondert erläutert."],
    faq: [{ question: "Sind Sculptra, Radiesse und NCTF dasselbe?", answer: "Nein. Es handelt sich um unterschiedliche Präparate mit eigener Zusammensetzung und Anwendung. Die konkrete Einordnung gehört in die ärztliche Beratung." }, { question: "Wann ist ein Ergebnis sichtbar?", answer: "Das hängt vom Präparat und der individuellen Reaktion ab. Einige Veränderungen entwickeln sich schrittweise." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["hyaluronsaeure", "polynukleotide"],
    assistantSummary: "Biostimulatoren umfassen unterschiedliche Präparate wie Sculptra, Radiesse und NCTF; sie sind nicht gleichzusetzen. Auswahl, Eignung, Wirkung und Risiken müssen produktbezogen ärztlich beurteilt werden.", assistantApprovalStatus: "approved",
    contentTodos: ["Einordnung der genannten Produkte und zugelassenen Anwendungen prüfen.", "Risiken, Kontraindikationen, Ablauf und Nachsorge freigeben.", "Preis freigeben."]
  },
  {
    slug: "polynukleotide", title: "Polynukleotide", href: "/behandlungen/polynukleotide/", category: "aesthetics", eyebrow: "Ästhetische Medizin",
    hero: "Regenerative Ansätze persönlich besprechen.", shortDescription: "Ärztliche Beratung zu Polynukleotiden, ergänzend auch als Lachs-DNA bezeichnet, in Mainz.",
    concerns: ["Hautqualität und feine Linien", "Empfindliche Regionen als Beratungsthema", "Polynukleotide beziehungsweise „Lachs-DNA“"], explanation: ["Polynukleotide sind Bestandteile bestimmter injizierbarer Präparate. Die Bezeichnung „Lachs-DNA“ ist eine vereinfachende Nutzerbezeichnung und ersetzt keine genaue Produkt- und Herkunftsinformation.", "Ob ein Präparat für das persönliche Ziel geeignet ist, hängt von Anamnese, Hautzustand, Allergien und der zugelassenen beziehungsweise vorgesehenen Anwendung ab."],
    mechanism: ["Produkte mit Polynukleotiden werden mit dem Ziel eingesetzt, regenerative Prozesse und die Hautqualität zu unterstützen.", "Aussagen zu Wirkung und Evidenz müssen immer auf das konkrete Präparat und den vorgesehenen Einsatz bezogen werden."],
    procedure: consultationProcess, benefits: ["Individuelle Einordnung von Hautzustand und Behandlungsziel", "Produktbezogene Aufklärung vor jeder Entscheidung", "Zurückhaltende Planung ohne Ergebnisversprechen"],
    limitations: ["Die wissenschaftliche Datenlage und zugelassene Anwendung unterscheiden sich je nach Produkt.", "Polynukleotide ersetzen keine Behandlung krankhafter Hautveränderungen."], contraindications: generalContraindications, aftercare: injectionAftercare,
    risks: ["Möglich sind Rötung, Schwellung, Druckempfindlichkeit, kleine Blutergüsse oder vorübergehende Unebenheiten.", "Allergische Reaktionen, Infektionen und produktbezogene Komplikationen sind möglich und werden individuell besprochen."],
    faq: [{ question: "Was bedeutet „Lachs-DNA“?", answer: "Es ist eine vereinfachende Bezeichnung für bestimmte Ausgangsmaterialien. Entscheidend sind das konkrete Medizinprodukt, seine Zusammensetzung und die ärztliche Aufklärung." }, { question: "Ist die Behandlung für jede Haut geeignet?", answer: "Nein. Hautzustand, Allergien, Erkrankungen und das konkrete Produkt müssen vorab geprüft werden." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["biostimulatoren", "hyaluronsaeure"],
    assistantSummary: "Polynukleotide sind Bestandteile bestimmter injizierbarer Präparate; „Lachs-DNA“ ist nur eine vereinfachte Bezeichnung. Eignung, Evidenz, Allergierisiko und Anwendung werden produktbezogen ärztlich geprüft.", assistantApprovalStatus: "approved",
    contentTodos: ["Medizinische Einordnung, Produkte, Indikationen und Evidenz prüfen.", "Risiken, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "co2-laser", title: "CO₂-Laser", href: "/behandlungen/co2-laser/", category: "skin_laser", eyebrow: "Haut & Laser",
    hero: "Hautbehandlung braucht ein klares Konzept.", shortDescription: "Ärztliche Beratung zu CO₂-Laser-Behandlungen bei Melimedics in Mainz.",
    concerns: ["Individuelle Einschätzung des Hautzustands", "Besprechung möglicher Behandlungsziele", "Abwägung geeigneter Alternativen"],
    explanation: ["Ein CO₂-Laser trägt kontrolliert oberflächliche Hautanteile ab und erzeugt thermische Zonen, die eine Hauterneuerung anstoßen können. Tiefe, Dichte und Behandlungsfläche müssen zum Hauttyp und Ziel passen.", "Da Lasersystem, konkrete Indikationen und Parameter für Melimedics noch nicht dokumentiert bestätigt sind, werden keine geräte- oder protokollspezifischen Aussagen gemacht."],
    mechanism: ["Laserenergie wird von Wasser im Gewebe aufgenommen und kann Haut kontrolliert abtragen beziehungsweise erwärmen.", "Behandlungsintensität und Erholungszeit stehen in einem individuellen Verhältnis."],
    facts: [{ label: "Voraussetzung", value: "Haut- und Risikoanalyse" }, { label: "Planung", value: "Parameter individuell" }, { label: "Nachsorge", value: "Konsequenter Hautschutz" }], procedure: consultationProcess,
    benefits: ["Gezielte Planung nach Hautzustand", "Behandlungstiefe kann grundsätzlich angepasst werden", "Nachsorge wird vorab festgelegt"],
    limitations: ["Nicht jeder Hauttyp, jede Jahreszeit oder jede Hautveränderung ist für die Behandlung geeignet.", "Narben, Poren oder Falten können verbessert, aber nicht vollständig beseitigt werden."],
    contraindications: ["Aktive Infektionen, offene Hautstellen oder gestörte Wundheilung können gegen eine Behandlung sprechen.", "Neigung zu überschießender Narbenbildung, Pigmentstörungen, bestimmte Medikamente und Vorerkrankungen müssen vorab geprüft werden.", "Schwangerschaft und Stillzeit werden in der persönlichen Risikoabwägung berücksichtigt."],
    aftercare: ["Haut entsprechend der individuellen Anleitung reinigen, pflegen und konsequent vor Sonne schützen.", "Krusten oder Schuppung nicht manipulieren; die empfohlene Erholungszeit einplanen.", "Bei zunehmendem Schmerz, Bläschen, Eiter, Fieber oder auffälliger Verfärbung die Praxis zeitnah kontaktieren."],
    risks: ["Zu erwarten sind je nach Intensität Rötung, Schwellung, Wärmegefühl, Nässen, Krusten und eine vorübergehende Erholungsphase.", "Möglich sind Infektion, länger anhaltende Rötung, Pigmentverschiebungen, Herpesreaktivierung und selten Narbenbildung.", "Augenschutz und qualifizierte Anwendung sind unverzichtbar."],
    faq: [{ question: "Wie lange ist die Haut gerötet?", answer: "Das hängt von Gerät, Intensität, Fläche und individueller Heilung ab. Eine belastbare Einschätzung ist erst nach festgelegtem Behandlungsplan möglich." }, { question: "Ist die Behandlung für jeden Hauttyp geeignet?", answer: "Nein. Hauttyp, Pigmentneigung, Vorerkrankungen und aktueller Hautzustand werden vorab geprüft." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["microneedling", "hifu"],
    assistantSummary: "CO₂-Laserbehandlungen erfordern eine persönliche Haut- und Risikoanalyse. Intensität, Erholungszeit, Pigmentrisiko und Nachsorge sind individuell; ein konkretes Melimedics-Gerät oder Protokoll ist noch nicht bestätigt.", assistantApprovalStatus: "approved",
    contentTodos: ["Gerät, Indikationen und Behandlungsparameter verifizieren.", "Risiken, Kontraindikationen, Ausfallzeit und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "tattoo-laser", title: "Tattoo-Laser", href: "/behandlungen/tattoo-laser/", category: "skin_laser", eyebrow: "Haut & Laser",
    hero: "Tattoo-Entfernung sorgfältig planen.", shortDescription: "Persönliche ärztliche Beratung zur Tattoo-Laserbehandlung in Mainz.",
    concerns: ["Tattoo und Hautzustand beurteilen", "Realistische Planung besprechen", "Nachsorge von Anfang an mitdenken"],
    explanation: ["Bei einer Laserbehandlung werden passende Lichtimpulse von bestimmten Farbpigmenten aufgenommen. Der Körper baut behandelte Pigmentbestandteile anschließend schrittweise ab.", "Farbe, Tiefe, Dichte, Hauttyp und mögliche Überlagerungen beeinflussen den Verlauf. Eine vollständige Entfernung oder eine feste Anzahl von Sitzungen kann nicht zugesichert werden."],
    mechanism: ["Kurze Lichtimpulse zielen auf Tattoo-Pigmente, ohne ein garantiertes vollständiges Verschwinden zu ermöglichen.", "Zwischen Behandlungen benötigt die Haut Zeit zur Abheilung und der Körper Zeit zum Abbau von Pigmentbestandteilen."],
    facts: [{ label: "Beurteilung", value: "Farbe, Haut und Tiefe" }, { label: "Verlauf", value: "Mehrstufig und individuell" }, { label: "Ergebnis", value: "Nicht garantierbar" }], procedure: consultationProcess,
    benefits: ["Individuelle Test- und Behandlungsplanung möglich", "Schrittweiser Verlauf kann kontrolliert werden", "Hauttyp und Tattoo-Eigenschaften werden berücksichtigt"],
    limitations: ["Bestimmte Farben oder tief liegende Pigmente können schwerer ansprechen.", "Restpigmente, Farbveränderungen oder eine sichtbare Hautstruktur können verbleiben."],
    contraindications: ["Akute Entzündungen, offene Stellen, starke Bräunung oder ungeklärte Hautveränderungen müssen vorab beurteilt werden.", "Medikamente mit Einfluss auf Lichtempfindlichkeit oder Heilung sowie Vorerkrankungen sind anzugeben.", "Schwangerschaft und Stillzeit werden vor einer Behandlung berücksichtigt."],
    aftercare: ["Die behandelte Stelle sauber halten und nach Anweisung pflegen; Blasen oder Krusten nicht öffnen.", "Konsequenter Sonnenschutz ist besonders wichtig.", "Bei zunehmender Rötung, Eiter, Fieber, starken Schmerzen oder anderen auffälligen Reaktionen medizinischen Rat einholen."],
    risks: ["Vorübergehend können Schmerz, Rötung, Schwellung, punktförmige Blutung, Blasen oder Krusten auftreten.", "Möglich sind Infektion, helle oder dunkle Pigmentveränderungen, Strukturveränderungen und selten Narben.", "Bestimmte Pigmente können sich unerwartet verfärben; das wird vorab besprochen."],
    faq: [{ question: "Wie viele Sitzungen sind nötig?", answer: "Das lässt sich ohne Untersuchung nicht zuverlässig angeben. Tattoo-Farbe, Tiefe, Dichte, Haut und Reaktion bestimmen den Verlauf." }, { question: "Verschwindet jedes Tattoo vollständig?", answer: "Nein. Eine Aufhellung ist möglich, aber Restpigmente oder Farbveränderungen können bleiben." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser"],
    assistantSummary: "Tattoo-Laserbehandlungen verlaufen meist mehrstufig. Farbe, Tiefe, Hauttyp und Reaktion beeinflussen das Ergebnis; vollständige Entfernung und Sitzungszahl können nicht garantiert werden, das verwendete Lasersystem ist noch zu bestätigen.", assistantApprovalStatus: "approved",
    contentTodos: ["Lasersystem und geeignete Indikationen verifizieren.", "Sitzungsplanung, Risiken, Kontraindikationen und Nachsorge freigeben.", "Preis freigeben."]
  },
  {
    slug: "hifu", title: "HIFU", href: "/behandlungen/hifu/", category: "skin_laser", eyebrow: "Haut & Technologie",
    hero: "Technologie sinnvoll einordnen.", shortDescription: "Ärztliche Beratung zu HIFU bei Melimedics in Mainz.",
    concerns: ["Persönliche Eignung klären", "Behandlungsziele realistisch besprechen", "Alternativen ärztlich abwägen"],
    explanation: ["HIFU steht für hochintensiven fokussierten Ultraschall. Energie wird in ausgewählten Gewebetiefen gebündelt, um dort kontrollierte thermische Reize zu setzen.", "Das Verfahren ist nicht mit diagnostischem Ultraschall gleichzusetzen. Ob es zum Anliegen passt, hängt von Anatomie, Gewebebeschaffenheit, Region und verwendetem System ab; Gerät und konkretes Protokoll bei Melimedics sind noch zu bestätigen."],
    mechanism: ["Fokussierte Ultraschallenergie kann in definierten Tiefen Wärmeimpulse erzeugen.", "Die darauf folgende Gewebereaktion entwickelt sich zeitversetzt und individuell."],
    facts: [{ label: "Technologie", value: "Fokussierter Ultraschall" }, { label: "Entwicklung", value: "Zeitversetzt" }, { label: "Eignung", value: "Individuell prüfen" }], procedure: consultationProcess,
    benefits: ["Nicht operativer Behandlungsansatz", "Planung nach Region und Gewebe möglich", "Ergebnisentwicklung kann kontrolliert begleitet werden"],
    limitations: ["HIFU ersetzt keine operative Straffung und ist nicht für jedes Ausmaß einer Gewebeveränderung geeignet.", "Ein sichtbares Ergebnis oder eine bestimmte Haltbarkeit kann nicht garantiert werden."], contraindications: generalContraindications,
    aftercare: ["Behandeltes Gewebe nach persönlicher Empfehlung schonen und Veränderungen beobachten.", "Bei anhaltender Taubheit, Muskelschwäche, Verbrennungszeichen oder starken Schmerzen zeitnah medizinisch abklären lassen."],
    risks: ["Möglich sind Rötung, Schwellung, Druckempfindlichkeit, Kribbeln oder vorübergehende Taubheit.", "Unsachgemäße oder ungeeignete Anwendung kann Verbrennungen, Nervenschädigungen, Konturunregelmäßigkeiten oder länger anhaltende Schmerzen verursachen."],
    faq: [{ question: "Wann entwickelt sich das Ergebnis?", answer: "Eine mögliche Gewebereaktion entwickelt sich schrittweise. Zeitpunkt und Ausmaß bleiben individuell." }, { question: "Ist HIFU eine Alternative zu jeder Operation?", answer: "Nein. Verfahren, Ausgangssituation und realistisches Ziel müssen persönlich verglichen werden." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser", "biostimulatoren"],
    assistantSummary: "HIFU bündelt Ultraschallenergie in ausgewählten Gewebetiefen. Eignung und Risiken hängen von Anatomie, Region und Gerät ab; Melimedics-Gerät und Protokoll sind noch nicht bestätigt, Ergebnisse sind nicht garantiert.", assistantApprovalStatus: "approved",
    contentTodos: ["Gerät, Wirkprinzip und Indikationen medizinisch freigeben.", "Risiken, Kontraindikationen, Ergebnisentwicklung und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "prp-behandlung", title: "PRP-Behandlung", href: "/behandlungen/prp-behandlung/", category: "prp", eyebrow: "PRP",
    hero: "Eigenmaterial individuell einsetzen.", shortDescription: "Ärztliche Beratung zu PRP-Behandlungen bei Melimedics in Mainz.",
    concerns: ["Ästhetische Anwendung ärztlich prüfen", "Ausgangssituation und Ziel besprechen", "Alternativen einordnen"],
    explanation: ["Für PRP wird Blut entnommen und so aufbereitet, dass ein plättchenreiches Plasma gewonnen wird. Dieses Eigenmaterial wird anschließend entsprechend dem individuell geplanten Einsatz verwendet.", "PRP ist kein allgemeines Verjüngungsversprechen. Hautzustand, Ziel, gesundheitliche Voraussetzungen und Alternativen werden vorab eingeordnet."],
    mechanism: ["Blutplättchen enthalten Signalstoffe, die an Reparatur- und Umbauprozessen beteiligt sind.", "Aufbereitung und Anwendung beeinflussen die Zusammensetzung; ein konkretes Melimedics-Protokoll wird erst nach Bestätigung benannt."],
    facts: [{ label: "Material", value: "Aus eigenem Blut" }, { label: "Planung", value: "Nach individueller Prüfung" }, { label: "Ergebnis", value: "Variabel" }],
    procedure: [{ title: "Beratung", copy: "Hautzustand, Ziel, Erkrankungen und Medikamente werden besprochen." }, { title: "Blutentnahme", copy: "Eine kleine Blutmenge wird unter hygienischen Bedingungen entnommen." }, { title: "Aufbereitung", copy: "Das Plasma wird für die geplante Anwendung vorbereitet; Details werden produkt- und prozessbezogen aufgeklärt." }, { title: "Anwendung", copy: "Das Eigenmaterial wird nach dem individuellen Plan eingesetzt." }, { title: "Nachsorge", copy: "Reaktionen und persönliche Verhaltenshinweise werden erklärt." }],
    benefits: ["Verwendung körpereigenen Ausgangsmaterials", "Behandlung wird auf Hautzustand und Ziel abgestimmt", "Kann als Baustein eines individuellen Konzepts eingeordnet werden"],
    limitations: ["Die Qualität und Konzentration des gewonnenen Materials unterscheiden sich individuell.", "Ein bestimmter Effekt oder eine feste Zahl von Anwendungen kann nicht zugesichert werden."],
    contraindications: ["Bestimmte Blut- oder Gerinnungsstörungen, akute Infektionen, relevante Blutarmut und bestimmte Medikamente können gegen eine Behandlung sprechen.", "Schwangerschaft, Stillzeit, Vorerkrankungen und laufende Therapien werden persönlich geprüft."], aftercare: injectionAftercare,
    risks: ["Möglich sind Schmerzen bei Blutentnahme oder Anwendung, Rötung, Schwellung und Blutergüsse.", "Trotz Eigenmaterial bleiben Infektionen, Entzündungen und unerwünschte lokale Reaktionen möglich."],
    faq: [{ question: "Ist PRP dasselbe wie ein Filler?", answer: "Nein. PRP ist aufbereitetes Eigenblutmaterial und ersetzt keinen Volumenfiller." }, { question: "Wie viele Anwendungen sind sinnvoll?", answer: "Das hängt von Ausgangssituation, Ziel und Verlauf ab. Ein individuelles Schema wird erst nach Beratung festgelegt." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["prp-haare", "polynukleotide"],
    assistantSummary: "PRP wird aus dem eigenen Blut aufbereitet. Eignung, Ablauf und Anzahl möglicher Anwendungen hängen von Ziel, Gesundheit und individuellem Verlauf ab; ein bestimmter Effekt wird nicht garantiert.", assistantApprovalStatus: "approved",
    contentTodos: ["Aufbereitung, Indikationen und Ablauf medizinisch freigeben.", "Risiken, Kontraindikationen, Sitzungsplanung und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "haarausfall", title: "Haarausfall", href: "/behandlungen/haarausfall/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Haarausfall verstehen, bevor behandelt wird.", shortDescription: "Ärztliche Beratung und diagnostische Einordnung bei Haarausfall in Mainz.",
    concerns: ["Veränderungen frühzeitig einordnen", "Mögliche Ursachen ärztlich besprechen", "Einen realistischen nächsten Schritt planen"],
    explanation: ["Haarausfall ist ein Symptom mit unterschiedlichen möglichen Ursachen. Verlauf, Verteilung, familiäre Faktoren, Ernährung, Stress, Erkrankungen und Medikamente können bei der Einordnung eine Rolle spielen.", "Vor einer Behandlung stehen Anamnese und Untersuchung der Kopfhaut. Weitere Diagnostik wird nur passend zur Fragestellung geplant; ein pauschales Laborprofil oder eine Ferndiagnose ist nicht sinnvoll."],
    mechanism: ["Haarwachstum verläuft in Zyklen. Verschiedene Störungen können mehr Haare gleichzeitig in eine Ruhe- oder Ausfallphase bringen oder Haarfollikel schrittweise verkleinern.", "Eine frühe Einordnung kann helfen, behandelbare Auslöser und realistische Optionen zu unterscheiden."],
    facts: [{ label: "Start", value: "Anamnese und Kopfhautbefund" }, { label: "Diagnostik", value: "Nach Fragestellung" }, { label: "Therapie", value: "Ursachenbezogen" }],
    procedure: [{ title: "Verlauf erfassen", copy: "Beginn, Muster, Beschwerden, familiäre Faktoren und bisherige Maßnahmen werden besprochen." }, { title: "Untersuchung", copy: "Haare und Kopfhaut werden persönlich beurteilt." }, { title: "Diagnostik planen", copy: "Nur wenn medizinisch sinnvoll, werden weitere Untersuchungen oder Laborwerte erwogen." }, { title: "Optionen einordnen", copy: "Behandlungsmöglichkeiten, Grenzen und Verlaufskontrollen werden verständlich besprochen." }],
    benefits: ["Ursachenorientierte statt pauschale Beratung", "Kopfhaut, Verlauf und allgemeine Gesundheit werden zusammen betrachtet", "Realistische Planung von Behandlung und Verlaufskontrolle"],
    limitations: ["Nicht jede Form von Haarverlust ist reversibel.", "Fotos und Online-Angaben können eine Untersuchung nicht ersetzen."],
    contraindications: ["Bei plötzlich starkem, fleckigem oder narbig wirkendem Haarverlust sowie entzündeter oder schmerzhafter Kopfhaut ist eine zeitnahe ärztliche Abklärung wichtig.", "Eigenmächtige Änderungen verordneter Medikamente sollten vermieden werden."],
    aftercare: ["Empfohlene Verlaufskontrollen möglichst unter vergleichbaren Bedingungen dokumentieren.", "Verordnete oder empfohlene Maßnahmen nur wie besprochen anwenden und Nebenwirkungen melden."],
    risks: ["Risiken hängen von der später gewählten Untersuchung oder Behandlung ab und werden vor deren Beginn gesondert erklärt.", "Verzögerte Diagnostik kann bei bestimmten Ursachen die Behandlungsmöglichkeiten einschränken."],
    faq: [{ question: "Welche Blutwerte werden untersucht?", answer: "Nur Werte, die sich aus Anamnese und Befund ergeben. Ein starres Laborpaket wird hier bewusst nicht versprochen." }, { question: "Reicht der Haar-Check für eine Diagnose?", answer: "Nein. Er strukturiert Angaben für die Anfrage, ersetzt aber weder Untersuchung noch Diagnose." }, { question: "Ist jeder Haarausfall erblich?", answer: "Nein. Es gibt verschiedene Muster und Auslöser, die ärztlich unterschieden werden müssen." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["prp-haare", "haartransplantation"],
    assistantSummary: "Haarausfall kann viele Ursachen haben. Anamnese und persönliche Untersuchung stehen vor einer ursachenbezogenen Diagnostik; der Haar-Check dient nur der Vorbereitung und stellt keine Diagnose.", assistantApprovalStatus: "approved",
    contentTodos: ["Anamnese, Diagnostik und Differenzialdiagnosen medizinisch ausarbeiten.", "Konkrete Untersuchungen und Behandlungsoptionen erst nach Freigabe ergänzen.", "Beratungspreis freigeben."]
  },
  {
    slug: "prp-haare", title: "PRP Haare", href: "/behandlungen/prp-haare/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Haare stärken – als Teil eines Plans.", shortDescription: "Ärztliche Beratung zu PRP für Haare bei Melimedics in Mainz.",
    concerns: ["Haarausfall ärztlich einordnen", "Eignung für PRP prüfen", "Verlauf und Alternativen besprechen"],
    explanation: ["Für eine Haar-PRP-Behandlung wird plättchenreiches Plasma aus eigenem Blut aufbereitet und nach einem individuellen Plan in die Kopfhaut eingebracht.", "PRP kann nur nach Diagnose und Eignungsprüfung als möglicher Baustein betrachtet werden. Es erzeugt keine neuen Haarfollikel und ersetzt bei unklarer Ursache nicht die Diagnostik."],
    mechanism: ["Freigesetzte Signalstoffe aus Blutplättchen sollen Prozesse im Umfeld vorhandener Haarfollikel unterstützen.", "Wie gut vorhandene Follikel reagieren, unterscheidet sich je nach Ursache, Stadium und persönlicher Ausgangslage."],
    facts: [{ label: "Voraussetzung", value: "Diagnose und Eignungsprüfung" }, { label: "Material", value: "Eigenblut" }, { label: "Ziel", value: "Vorhandene Follikel unterstützen" }],
    procedure: [{ title: "Diagnostische Einordnung", copy: "Ursache, Kopfhaut und Behandlungsziel werden vorab beurteilt." }, { title: "Blutentnahme", copy: "Eine kleine Blutmenge wird hygienisch entnommen." }, { title: "Aufbereitung", copy: "Das plättchenreiche Plasma wird vorbereitet; das konkrete Protokoll wird erst nach Bestätigung benannt." }, { title: "Anwendung", copy: "Das Eigenmaterial wird entsprechend der persönlichen Planung eingesetzt." }, { title: "Verlaufskontrolle", copy: "Reaktion und weiteres Vorgehen werden kontrolliert." }],
    benefits: ["Körpereigenes Ausgangsmaterial", "Kann in ein ursachenbezogenes Haarkonzept eingebettet werden", "Verlauf wird individuell kontrolliert"],
    limitations: ["PRP kann keine zerstörten oder fehlenden Haarfollikel neu bilden.", "Eine Zunahme der Haardichte oder ein Stopp des Haarverlusts kann nicht garantiert werden."],
    contraindications: ["Bestimmte Blut- und Gerinnungsstörungen, akute Infektionen der Kopfhaut, relevante Blutarmut und bestimmte Medikamente können gegen PRP sprechen.", "Vorerkrankungen, Schwangerschaft, Stillzeit und laufende Therapien werden persönlich geprüft."], aftercare: injectionAftercare,
    risks: ["Möglich sind Schmerzen, Druckempfindlichkeit, Rötung, Schwellung oder kleine Blutergüsse.", "Trotz Eigenmaterial bleiben Infektion, Entzündung und vorübergehend verstärkter Haarausfall mögliche Komplikationen."],
    faq: [{ question: "Entstehen durch PRP neue Haarwurzeln?", answer: "Nein. PRP wird als möglicher unterstützender Ansatz für vorhandene Haarfollikel besprochen." }, { question: "Wie viele Termine brauche ich?", answer: "Ein mögliches Schema hängt von Diagnose, Ausgangssituation und Verlauf ab und wird nicht pauschal festgelegt." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["haarausfall", "haartransplantation", "prp-behandlung"],
    assistantSummary: "Haar-PRP verwendet aufbereitetes Eigenblut und kann nach Diagnose als unterstützender Baustein erwogen werden. Es bildet keine neuen Haarfollikel; Erfolg und Terminzahl sind individuell und nicht garantiert.", assistantApprovalStatus: "approved",
    contentTodos: ["Indikationen, Aufbereitung und Behandlungsprotokoll medizinisch freigeben.", "Risiken, Kontraindikationen, Sitzungsanzahl und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "haartransplantation", title: "Haartransplantation", href: "/behandlungen/haartransplantation/", category: "hair", eyebrow: "Haarmedizin",
    hero: "Eine operative Option braucht sorgfältige Planung.", shortDescription: "Persönliche Beratung zur möglichen Haartransplantation bei Melimedics in Mainz.",
    concerns: ["Wenn Haarausfall dauerhaft belastet", "Wenn nicht-operative Wege besprochen wurden", "Wenn eine realistische ärztliche Einschätzung gewünscht ist"],
    explanation: ["Bei einer Haartransplantation werden körpereigene follikuläre Einheiten aus einem geeigneten Spenderbereich entnommen und in zuvor geplante Empfängerbereiche übertragen. Die vorhandene Spenderreserve begrenzt dauerhaft, was möglich ist.", "Eignung setzt eine persönliche Kopfhautuntersuchung, eine möglichst klare Diagnose, realistische Erwartungen und die Betrachtung des voraussichtlichen weiteren Haarverlusts voraus. Methode, Operateur und Operationsstandort sind für Melimedics noch nicht bestätigt und werden deshalb nicht benannt."],
    mechanism: ["Transplantierte Haarfollikel werden räumlich neu verteilt; es entstehen dadurch keine zusätzlichen Follikel.", "Planung von Haarlinie, Verteilung und Entnahme muss die begrenzte Spenderreserve langfristig berücksichtigen."],
    facts: [{ label: "Grundprinzip", value: "Umverteilung eigener Haarfollikel" }, { label: "Begrenzung", value: "Vorhandener Spenderbereich" }, { label: "Ergebnis", value: "Entwicklung über Monate" }],
    procedure: [
      { title: "Beratung", copy: "Anliegen, Ausgangssituation und Erwartungen werden persönlich besprochen." },
      { title: "Spender- und Empfängerplanung", copy: "Dichte, Haarqualität, Reserve, Zielbereiche und mögliche weitere Entwicklung werden gemeinsam betrachtet." },
      { title: "Entnahme", copy: "Follikuläre Einheiten werden aus einem geeigneten Spenderbereich entnommen; die konkrete Methode bleibt bis zur vertraglichen und medizinischen Bestätigung offen." },
      { title: "Transplantation", copy: "Die Einheiten werden nach dem individuellen Plan in die vorbereiteten Zielbereiche eingesetzt." },
      { title: "Heilungsphase", copy: "Kleine Krusten, Rötung und Schwellung können zunächst auftreten. Transplantierte Haare können vor dem späteren Wachstum vorübergehend ausfallen." },
      { title: "Nachsorge und Wachstum", copy: "Kontrollen, schonende Pflege und Geduld gehören dazu; ein endgültiger Eindruck entwickelt sich erst über Monate." },
    ],
    benefits: ["Planung berücksichtigt Haarlinie, Spenderreserve und möglichen weiteren Haarverlust", "Körpereigene Follikel werden verwendet", "Nachsorge und Verlaufskontrolle sind fester Bestandteil der Planung"],
    limitations: ["Die Spenderreserve ist begrenzt und kann nicht beliebig vermehrt werden.", "Eine jugendliche Ausgangsdichte, ein bestimmtes Ergebnis oder ein dauerhaft unveränderter Haarbestand kann nicht garantiert werden.", "Bestehender nicht transplantierter Haarverlust kann weiter fortschreiten."],
    contraindications: ["Ungeklärter, aktiver oder narbiger Haarverlust muss vor einer operativen Planung diagnostisch eingeordnet werden.", "Unzureichender Spenderbereich, unrealistische Erwartungen, relevante Erkrankungen, Medikamente oder Heilungsstörungen können gegen einen Eingriff sprechen.", "Die definitive Eignung kann nur im persönlichen ärztlichen Prozess festgestellt werden."],
    aftercare: ["Empfänger- und Spenderbereich nur nach konkreter Anleitung reinigen und schützen; Krusten nicht manipulieren.", "Belastung, Schlafposition, Kopfbedeckung und Sonnenschutz werden für den individuellen Eingriff vorgegeben.", "Bei zunehmender Rötung, Eiter, Fieber, stärkeren Schmerzen oder Blutung unverzüglich den vereinbarten medizinischen Kontakt nutzen."],
    risks: ["Möglich sind Schmerzen, Schwellung, Blutung, Infektion, vorübergehende Taubheit, Juckreiz und sichtbare Narben im Spender- oder Empfängerbereich.", "Es können ungleichmäßiges Wachstum, eine unnatürlich wirkende Verteilung, Verlust transplantierter Follikel oder vorübergehender Ausfall umliegender Haare auftreten.", "Zusätzliche Eingriffe können erforderlich werden; ihr Umfang ist nicht vorab versprechbar."],
    faq: [
      { question: "Für wen kann eine Beratung interessant sein?", answer: "Für Menschen, die eine operative Option bei Haarausfall ärztlich und realistisch einordnen lassen möchten. Die Eignung wird individuell geprüft." },
      { question: "Wird bereits eine bestimmte Methode empfohlen?", answer: "Nein. Methode, Operateur, Standort und Umfang werden erst nach dokumentierter Bestätigung und persönlicher Untersuchung benannt." },
      { question: "Erhalte ich vorab einen konkreten Preis?", answer: "Noch liegt keine freigegebene Preisliste vor. Eine belastbare Kalkulation setzt außerdem die individuelle Planung voraus." },
      { question: "Wann wachsen transplantierte Haare?", answer: "Die Haare können nach dem Eingriff zunächst ausfallen. Neues Wachstum entwickelt sich schrittweise über Monate und variiert individuell." },
      { question: "Was begrenzt die mögliche Dichte?", answer: "Vor allem Menge und Qualität des sicher nutzbaren Spenderbereichs sowie der vorhandene und künftig erwartbare Haarverlust." },
      { question: "Was gehört zur Nachsorge?", answer: "Reinigung, Schutz der behandelten Bereiche, Verhaltenshinweise und Kontrollen werden passend zum tatsächlichen Eingriff festgelegt." },
    ],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", theme: "hair", relatedTreatments: ["haarausfall", "prp-haare"],
    assistantSummary: "Eine Haartransplantation verteilt vorhandene eigene Haarfollikel neu und ist durch den Spenderbereich begrenzt. Eignung, Methode, Operateur und Standort sind vor einer persönlichen Prüfung nicht festgelegt; Wachstum entwickelt sich über Monate.", assistantApprovalStatus: "approved",
    contentTodos: ["Operateur, Standort und Methode medizinisch und vertraglich bestätigen.", "Eignungskriterien, Risiken, Kontraindikationen und Heilungsverlauf freigeben.", "Keine Graft-Zahlen oder Preise ohne individuelle Planung veröffentlichen."]
  },
  {
    slug: "microneedling", title: "Microneedling", href: "/behandlungen/microneedling/", category: "cosmetics", eyebrow: "Kosmetik",
    hero: "Kosmetische Pflege gezielt ergänzen.", shortDescription: "Kosmetisches Microneedling als ergänzende Behandlung bei Melimedics in Mainz.",
    concerns: ["Hautzustand vorab betrachten", "Pflegeziel gemeinsam besprechen", "Abgrenzung zu ärztlichen Verfahren klären"],
    explanation: ["Beim Microneedling erzeugen feine Nadeln kontrollierte Mikrokanäle in der Haut. Das Verfahren soll körpereigene Reparaturprozesse anregen und wird hier klar als kosmetische Zusatzbehandlung eingeordnet.", "Nadeltiefe, Gerät und Produkte dürfen nicht pauschal angenommen werden. Bei krankhaften Hautveränderungen oder einem medizinischen Behandlungsziel ist zunächst eine ärztliche Beurteilung notwendig."],
    mechanism: ["Kontrollierte Mikroverletzungen können Reparatur- und Umbauprozesse der Haut anstoßen.", "Intensität und Reaktion hängen von Gerät, Tiefe, Hautzustand und behandelter Region ab."],
    facts: [{ label: "Einordnung", value: "Kosmetische Zusatzbehandlung" }, { label: "Voraussetzung", value: "Intakte, geeignete Haut" }, { label: "Nachsorge", value: "Schonend und reizarm" }],
    procedure: [{ title: "Hautcheck", copy: "Hautzustand, Ziel und mögliche Ausschlussgründe werden betrachtet." }, { title: "Vorbereitung", copy: "Die Haut wird gereinigt und hygienisch vorbereitet." }, { title: "Behandlung", copy: "Das Needling erfolgt mit individuell festgelegten Parametern; das konkrete Gerät wird erst nach Bestätigung benannt." }, { title: "Pflege", copy: "Beruhigende Nachpflege und persönliche Heimpflegehinweise schließen die Behandlung ab." }],
    benefits: ["Behandlung kann auf Hautzustand und Ziel abgestimmt werden", "Kosmetischer Ansatz ohne Ergebnisversprechen", "Pflege und Nachsorge werden gemeinsam geplant"],
    limitations: ["Tiefe Narben, aktive Hautkrankheiten oder medizinische Beschwerden gehören in ärztliche Abklärung.", "Ein bestimmtes Ergebnis oder eine feste Zahl von Anwendungen kann nicht zugesichert werden."],
    contraindications: ["Aktive Akne, Herpes, Infektionen, offene Stellen, entzündliche Hauterkrankungen oder gestörte Wundheilung können gegen eine Behandlung sprechen.", "Neigung zu überschießender Narbenbildung, Medikamente, Schwangerschaft und Vorerkrankungen müssen vorab besprochen werden."],
    aftercare: ["Haut zunächst reizarm pflegen, nicht unnötig berühren und konsequent vor Sonne schützen.", "Starke Wirkstoffe, Peelings, Hitze und intensive Belastung nur entsprechend der individuellen Empfehlung wieder aufnehmen."],
    risks: ["Vorübergehend können Rötung, Wärmegefühl, Schwellung, Spannungsgefühl oder punktförmige Blutungen auftreten.", "Möglich sind Infektionen, Pigmentverschiebungen, Herpesreaktivierung und selten Narbenbildung."],
    faq: [{ question: "Ist Microneedling eine medizinische Behandlung?", answer: "Auf dieser Website wird es als kosmetische Zusatzbehandlung beschrieben. Tiefe, Ziel und regulatorische Einordnung müssen zum konkreten Gerät und Ablauf passen." }, { question: "Kann bei aktiver Akne behandelt werden?", answer: "Entzündete oder infizierte Haut sollte zunächst fachlich beurteilt werden." }],
    bookingType: "treatment", medicalApprovalStatus: "needs_review", relatedTreatments: ["co2-laser", "aquafacial"],
    assistantSummary: "Microneedling erzeugt kontrollierte Mikrokanäle und wird bei Melimedics als kosmetische Zusatzbehandlung eingeordnet. Aktive Entzündungen und weitere Risiken müssen vorab ausgeschlossen werden; Gerät und Parameter sind noch zu bestätigen.", assistantApprovalStatus: "approved",
    contentTodos: ["Gerät, Ablauf, Indikationen und Abgrenzung medizinisch/kosmetisch prüfen.", "Hinweise, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "aquafacial", title: "Aquafacial", href: "/behandlungen/aquafacial/", category: "cosmetics", eyebrow: "Kosmetik",
    hero: "Pflege passend zum Hautzustand.", shortDescription: "Aquafacial als kosmetische Zusatzbehandlung bei Melimedics in Mainz.",
    concerns: ["Reinigung und Pflege", "Individuelle Abstimmung auf den Hautzustand", "Ergänzung eines bestehenden Hautkonzepts"],
    explanation: ["Aquafacial bezeichnet eine apparative kosmetische Gesichtsbehandlung, bei der Reinigung, Flüssigkeit und Absaugung in mehreren Schritten kombiniert werden können. Konkretes Gerät, Aufsätze und verwendete Produkte bei Melimedics sind noch zu bestätigen.", "Die Behandlung dient der kosmetischen Pflege und ersetzt keine Diagnostik oder Therapie von Hauterkrankungen."],
    mechanism: ["Je nach System werden oberflächliche Reinigung, Flüssigkeitszufuhr und Absaugung miteinander verbunden.", "Produkte und Intensität müssen an Hautzustand und Verträglichkeit angepasst werden."],
    facts: [{ label: "Einordnung", value: "Kosmetische Pflege" }, { label: "Abstimmung", value: "Nach Hautzustand" }, { label: "Produkte", value: "Vor Anwendung prüfen" }],
    procedure: [{ title: "Hautcheck", copy: "Hautzustand, Empfindlichkeit und Pflegeziel werden besprochen." }, { title: "Reinigung", copy: "Die Haut wird passend zum geplanten Ablauf vorbereitet." }, { title: "Apparative Pflege", copy: "Schritte und Produkte werden nach Bestätigung des eingesetzten Systems individuell gewählt." }, { title: "Abschluss", copy: "Eine geeignete Abschlusspflege und Hinweise für zu Hause werden besprochen." }],
    benefits: ["Mehrstufige kosmetische Reinigung und Pflege", "Produkte können grundsätzlich an den Hautzustand angepasst werden", "Klare Abgrenzung von medizinischer Diagnostik"],
    limitations: ["Aquafacial behandelt keine Hautkrankheit und ersetzt keine ärztliche Untersuchung.", "Ein bestimmtes Hautbild oder eine dauerhafte Wirkung kann nicht versprochen werden."],
    contraindications: ["Offene Stellen, akute Infektionen, entzündliche Hauterkrankungen oder bekannte Unverträglichkeiten müssen vorab abgeklärt werden.", "Medikamente, frische Eingriffe und besondere Hautempfindlichkeit sind vor der Behandlung anzugeben."],
    aftercare: ["Haut nach persönlicher Empfehlung reizarm pflegen und vor Sonne schützen.", "Bei unerwartet starker oder anhaltender Reaktion die Praxis kontaktieren."],
    risks: ["Möglich sind vorübergehende Rötung, Trockenheit, Spannungsgefühl oder Reizung.", "Unverträglichkeiten gegenüber eingesetzten Produkten oder eine Verschlechterung bereits gereizter Haut sind möglich."],
    faq: [{ question: "Ist Aquafacial für jede Haut geeignet?", answer: "Nein. Empfindlichkeit, Entzündungen, Produkte und frühere Reaktionen werden vorab berücksichtigt." }, { question: "Ersetzt es eine dermatologische Behandlung?", answer: "Nein. Bei Erkrankungen oder unklaren Hautveränderungen ist eine ärztliche Abklärung erforderlich." }],
    bookingType: "treatment", medicalApprovalStatus: "needs_review", relatedTreatments: ["microneedling"],
    assistantSummary: "Aquafacial ist eine kosmetische, apparative Pflegebehandlung und ersetzt keine ärztliche Diagnostik. Hautzustand, Produkte und Verträglichkeit werden vorab geprüft; Gerät und genauer Ablauf sind noch zu bestätigen.", assistantApprovalStatus: "approved",
    contentTodos: ["Gerät, Produkte und Behandlungsablauf verifizieren.", "Hinweise, Kontraindikationen und Nachsorge ergänzen.", "Preis freigeben."]
  },
  {
    slug: "gewichtsmanagement", title: "Ärztliches Gewichtsmanagement", href: "/behandlungen/gewichtsmanagement/", category: "health", eyebrow: "Gesundheit",
    hero: "Gesundheit und Gewicht gemeinsam betrachten.", shortDescription: "Ärztliche Beratung zu Gewichtsmanagement und individuellen Gesundheitszielen in Mainz.",
    concerns: ["Gesundheitsrisiken und Gewicht einordnen", "Bisherige Versuche und Hindernisse besprechen", "Realistische langfristige Ziele entwickeln"],
    explanation: ["Körpergewicht wird von vielen biologischen, psychischen, sozialen und lebensstilbezogenen Faktoren beeinflusst. Eine medizinische Begleitung beginnt deshalb mit einer wertfreien Anamnese statt mit einer einzelnen Maßnahme.", "Mögliche Untersuchungen und Behandlungsoptionen richten sich nach der persönlichen Situation. Konkrete Medikamente werden auf dieser Seite nicht beworben oder ohne Untersuchung empfohlen."],
    mechanism: ["Anamnese, körperliche Befunde und gegebenenfalls gezielte Diagnostik helfen, Risiken und beeinflussende Faktoren einzuordnen.", "Ein tragfähiger Plan kann Ernährung, Bewegung, Verhalten, Begleiterkrankungen und – nur bei individueller Indikation – weitere ärztliche Optionen berücksichtigen."],
    facts: [{ label: "Ansatz", value: "Individuell und langfristig" }, { label: "Diagnostik", value: "Nach medizinischer Fragestellung" }, { label: "Ziel", value: "Gesundheit statt Schnelllösung" }],
    procedure: [{ title: "Ausgangssituation", copy: "Gesundheit, Gewichtsverlauf, Alltag, bisherige Maßnahmen und persönliche Ziele werden besprochen." }, { title: "Risikoabschätzung", copy: "Körpermaße, Begleiterkrankungen und weitere individuelle Risiken werden medizinisch eingeordnet." }, { title: "Gezielte Diagnostik", copy: "Weitere Untersuchungen werden nur bei entsprechender Fragestellung geplant." }, { title: "Gemeinsamer Plan", copy: "Realistische nächste Schritte, Grenzen und Verlaufskontrollen werden vereinbart." }],
    benefits: ["Wertfreie und medizinisch fundierte Einordnung", "Begleiterkrankungen und Alltag werden mitgedacht", "Ziele und Verlaufskontrollen werden gemeinsam festgelegt"],
    limitations: ["Schneller oder dauerhafter Gewichtsverlust kann nicht garantiert werden.", "Eine einzelne Untersuchung oder Maßnahme erklärt beziehungsweise löst nicht jede Gewichtsentwicklung."],
    contraindications: ["Akute Beschwerden, Essstörungen, Schwangerschaft, relevante Erkrankungen und Medikamente erfordern eine angepasste oder spezialisierte Betreuung.", "Behandlungen und Medikamente werden nur nach persönlicher Nutzen-Risiko-Prüfung erwogen."],
    aftercare: ["Verlauf, Verträglichkeit und gesundheitliche Parameter in vereinbarten Abständen prüfen.", "Bei neuen Beschwerden oder Nebenwirkungen zeitnah ärztlichen Kontakt aufnehmen."],
    risks: ["Risiken hängen von den nach der Beratung tatsächlich vereinbarten Untersuchungen und Maßnahmen ab.", "Unrealistische Ziele oder zu restriktive eigenständige Maßnahmen können körperlich und psychisch belasten."],
    faq: [{ question: "Werden bestimmte Abnehmmedikamente angeboten?", answer: "Eine konkrete medikamentöse Option wird hier nicht versprochen. Sie käme nur nach persönlicher Indikations- und Risikoprüfung infrage." }, { question: "Welche Laborwerte werden geprüft?", answer: "Das richtet sich nach Anamnese, Befund und medizinischer Fragestellung; ein pauschales Laborpaket wird nicht vorausgesetzt." }, { question: "Geht es nur um den BMI?", answer: "Nein. Gesundheitsrisiken, Fettverteilung, Begleiterkrankungen, Alltag und persönliche Ziele können ebenfalls relevant sein." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["diagnostik"],
    assistantSummary: "Ärztliches Gewichtsmanagement betrachtet Gesundheit, Verlauf, Alltag und mögliche Begleiterkrankungen gemeinsam. Diagnostik und Optionen werden individuell festgelegt; Medikamente und schnelle Ergebnisse werden nicht pauschal versprochen.", assistantApprovalStatus: "approved",
    contentTodos: ["Konkreten Leistungsumfang und mögliche Kooperationen intern freigeben.", "Medikamente, Programme, Laborprofile und Preise nur nach dokumentierter Bestätigung nennen."]
  },
  {
    slug: "diagnostik", title: "Blutuntersuchungen & Diagnostik", href: "/behandlungen/diagnostik/", category: "health", eyebrow: "Gesundheit",
    hero: "Untersuchen, was zur Frage passt.", shortDescription: "Ärztliche Beratung zu gezielten Blutuntersuchungen und diagnostischer Einordnung in Mainz.",
    concerns: ["Beschwerden strukturiert einordnen", "Eine konkrete medizinische Fragestellung klären", "Befunde verständlich besprechen"],
    explanation: ["Diagnostik ist dann sinnvoll, wenn sie eine konkrete medizinische Frage beantworten soll. Welche Blutwerte oder weiteren Schritte geeignet sind, ergibt sich aus Anamnese, Untersuchung und vorhandenen Befunden.", "Laborwerte benötigen Kontext: Referenzbereiche, Tageszeit, Medikamente und andere Faktoren können die Interpretation beeinflussen. Einzelwerte ersetzen keine Diagnose."],
    mechanism: ["Das Gespräch grenzt die Fragestellung ein und vermeidet unnötige oder irreführende Untersuchungen.", "Ergebnisse werden zusammen mit Beschwerden, Befunden und Verlauf interpretiert."],
    facts: [{ label: "Auswahl", value: "Nach Fragestellung" }, { label: "Bewertung", value: "Im klinischen Kontext" }, { label: "Weiteres Vorgehen", value: "Nach Befund" }],
    procedure: [{ title: "Anamnese", copy: "Beschwerden, Verlauf, Vorerkrankungen, Medikamente und vorhandene Befunde werden erfasst." }, { title: "Fragestellung", copy: "Gemeinsam wird geklärt, welche Information tatsächlich benötigt wird." }, { title: "Untersuchungsplan", copy: "Nur passende Untersuchungen werden besprochen; konkrete Laborprofile sind noch nicht veröffentlicht." }, { title: "Befundbesprechung", copy: "Ergebnisse und mögliche nächste Schritte werden verständlich eingeordnet." }],
    benefits: ["Gezielte Auswahl statt pauschaler Testpakete", "Befunde werden im persönlichen Kontext besprochen", "Nächste Schritte orientieren sich am Ergebnis"],
    limitations: ["Ein unauffälliger Einzelwert schließt nicht jede Erkrankung aus; ein auffälliger Wert beweist sie nicht automatisch.", "Der konkrete Melimedics-Leistungsumfang und externe Laborablauf sind noch zu bestätigen."],
    contraindications: ["Für eine Blutentnahme müssen individuelle Risiken wie Ohnmachtsneigung, Gerinnungsstörungen oder Medikamente vorab genannt werden.", "Akute Notfälle gehören nicht in eine reguläre diagnostische Terminplanung."],
    aftercare: ["Nach einer Blutentnahme die Punktionsstelle entsprechend der Anleitung komprimieren und bei Beschwerden melden.", "Befunde nicht isoliert selbst interpretieren; vereinbarte Besprechung und gegebenenfalls Weiterleitung wahrnehmen."],
    risks: ["Bei einer Blutentnahme können kurzzeitig Schmerz, Bluterguss, Nachblutung, Kreislaufreaktion oder selten Infektion auftreten.", "Ungezielte Tests können Zufallsbefunde, Unsicherheit und unnötige Folgeuntersuchungen verursachen."],
    faq: [{ question: "Kann ich ein komplettes Blutbild ohne Gespräch buchen?", answer: "Welche Untersuchung sinnvoll ist und wie sie organisatorisch erfolgt, wird erst nach Klärung der Fragestellung und des bestätigten Leistungsumfangs beantwortet." }, { question: "Erhalte ich direkt eine Diagnose?", answer: "Laborwerte sind ein Teil der Diagnostik. Eine Diagnose ergibt sich aus ihrem Zusammenhang mit Anamnese und Befund." }, { question: "Sind Öffnungszeiten für Blutentnahmen festgelegt?", answer: "Noch sind keine verifizierten Sprech- oder Abnahmezeiten veröffentlicht." }],
    bookingType: "consultation", medicalApprovalStatus: "needs_review", relatedTreatments: ["gewichtsmanagement", "haarausfall"],
    assistantSummary: "Blutuntersuchungen sollten eine konkrete medizinische Frage beantworten. Auswahl und Interpretation erfolgen im Zusammenhang mit Anamnese und Befund; Leistungsumfang, Laborprofile und Abnahmezeiten sind noch nicht bestätigt.", assistantApprovalStatus: "approved",
    contentTodos: ["Laborpartner, verfügbare Untersuchungen, Präanalytik und Abläufe bestätigen.", "Keine Testpakete, Zeiten oder Preise ohne dokumentierte Freigabe nennen."]
  },
];

export const treatmentBySlug = Object.fromEntries(treatments.map((treatment) => [treatment.slug, treatment])) as Record<string, TreatmentContent>;
export const treatmentsByCategory = (category: TreatmentCategory) => treatments.filter((treatment) => treatment.category === category);

export type PriceCategory = {
  title: string;
  items: {
    id: string;
    treatmentSlug?: string;
    label: string;
    duration: string;
    price: string;
    approvalStatus: MedicalApprovalStatus;
  }[];
};

export const priceSourceUrl = "https://www.planity.com/de-DE/melimedics-55122-mainz";

export const priceCategories: PriceCategory[] = [
  {
    title: "Biostimulatoren",
    items: [
      { id: "sculptra", treatmentSlug: "biostimulatoren", label: "Sculptra (Poly-L-Milchsäure)", duration: "30 Min.", price: "400 €", approvalStatus: "approved" },
      { id: "radiesse", treatmentSlug: "biostimulatoren", label: "Radiesse (Calciumhydroxylapatit)", duration: "30 Min.", price: "ab 400 €", approvalStatus: "approved" },
      { id: "paris-glow", treatmentSlug: "biostimulatoren", label: "Paris Glow (NCTF 135 HA)", duration: "30 Min.", price: "250 €", approvalStatus: "approved" },
      { id: "polynukleotide", treatmentSlug: "polynukleotide", label: "Polynukleotide (Lachs-DNA)", duration: "30 Min.", price: "ab 250 €", approvalStatus: "approved" },
      { id: "profhilo", treatmentSlug: "biostimulatoren", label: "Profhilo", duration: "30 Min.", price: "ab 250 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "PRP / Vampirlifting",
    items: [
      { id: "prp-einzeln", treatmentSlug: "prp-behandlung", label: "PRP-Behandlung", duration: "30 Min.", price: "150 €", approvalStatus: "approved" },
      { id: "prp-paket", treatmentSlug: "prp-behandlung", label: "PRP-Behandlung (3er-Paket)", duration: "30 Min.", price: "350 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Botulinumtoxin",
    items: [
      { id: "botulinumtoxin-zone-1", treatmentSlug: "botulinumtoxin", label: "Behandlung – 1 Zone", duration: "30 Min.", price: "200 €", approvalStatus: "approved" },
      { id: "botulinumtoxin-zonen-2", treatmentSlug: "botulinumtoxin", label: "Behandlung – 2 Zonen", duration: "30 Min.", price: "200 €", approvalStatus: "approved" },
      { id: "botulinumtoxin-zonen-3", treatmentSlug: "botulinumtoxin", label: "Behandlung – 3 Zonen", duration: "30 Min.", price: "300 €", approvalStatus: "approved" },
      { id: "botulinumtoxin-masseter", treatmentSlug: "botulinumtoxin", label: "Masseter-Behandlung", duration: "30 Min.", price: "350 €", approvalStatus: "approved" },
      { id: "nefertiti-lift", treatmentSlug: "botulinumtoxin", label: "Nefertiti Lift", duration: "30 Min.", price: "ab 400 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Fett-weg-Spritze",
    items: [
      { id: "injektionslipolyse", label: "Behandlung (Injektionslipolyse)", duration: "30 Min.", price: "200 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Hyaluronsäure / Filler",
    items: [
      { id: "filler-lippen", treatmentSlug: "hyaluronsaeure", label: "Lippen", duration: "30 Min.", price: "ab 180 €", approvalStatus: "approved" },
      { id: "filler-traenensaecke", treatmentSlug: "hyaluronsaeure", label: "Tränensäcke", duration: "30 Min.", price: "ab 250 €", approvalStatus: "approved" },
      { id: "filler-wangen", treatmentSlug: "hyaluronsaeure", label: "Wangen · 1 ml", duration: "30 Min.", price: "ab 300 €", approvalStatus: "approved" },
      { id: "filler-kinn", treatmentSlug: "hyaluronsaeure", label: "Kinn · 1 ml", duration: "30 Min.", price: "ab 250 €", approvalStatus: "approved" },
      { id: "filler-jawline", treatmentSlug: "hyaluronsaeure", label: "Jawline · 2 ml", duration: "30 Min.", price: "ab 350 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Hylase",
    items: [
      { id: "hylase", treatmentSlug: "hyaluronsaeure", label: "Auflösung von Filler", duration: "30 Min.", price: "100 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Medizinisches Schröpfen",
    items: [
      { id: "schroepfen-10", label: "Schröpfen · 10 Cups", duration: "30 Min.", price: "70 €", approvalStatus: "approved" },
      { id: "schroepfen-15", label: "Schröpfen · 15 Cups", duration: "30 Min.", price: "90 €", approvalStatus: "approved" },
      { id: "schroepfen-20", label: "Schröpfen · 20 Cups", duration: "30 Min.", price: "110 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Infusionstherapie",
    items: [
      { id: "infusion-multivitamin", label: "Multivitamin-Infusion", duration: "30 Min.", price: "100 €", approvalStatus: "approved" },
      { id: "infusion-vitamin-c", label: "Hochdosis Vitamin C", duration: "30 Min.", price: "100 €", approvalStatus: "approved" },
      { id: "infusion-eisen", label: "Eisen-Infusion", duration: "30 Min.", price: "100 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "Tattoo- & PMU-Entfernung",
    items: [
      { id: "tattoo-mini", treatmentSlug: "tattoo-laser", label: "Mini · bis 5 × 5 cm", duration: "30 Min.", price: "100 €", approvalStatus: "approved" },
      { id: "tattoo-klein", treatmentSlug: "tattoo-laser", label: "Klein · bis 5 × 10 cm", duration: "30 Min.", price: "130 €", approvalStatus: "approved" },
      { id: "tattoo-mittel", treatmentSlug: "tattoo-laser", label: "Mittel · bis 10 × 10 cm", duration: "30 Min.", price: "180 €", approvalStatus: "approved" },
      { id: "tattoo-gross", treatmentSlug: "tattoo-laser", label: "Groß · bis 10 × 20 cm", duration: "30 Min.", price: "250 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "CO₂-Laser",
    items: [
      { id: "co2-augenpartie", treatmentSlug: "co2-laser", label: "Augenpartie", duration: "30 Min.", price: "350 €", approvalStatus: "approved" },
      { id: "co2-gesicht", treatmentSlug: "co2-laser", label: "Gesicht komplett", duration: "60 Min.", price: "550 €", approvalStatus: "approved" },
      { id: "co2-narben", treatmentSlug: "co2-laser", label: "Narbenbehandlung", duration: "30 Min.", price: "ab 100 €", approvalStatus: "approved" },
    ],
  },
  {
    title: "HIFU",
    items: [
      { id: "hifu-nasolabial", treatmentSlug: "hifu", label: "Nasolabial", duration: "30 Min.", price: "250 €", approvalStatus: "approved" },
      { id: "hifu-jawline", treatmentSlug: "hifu", label: "Jawline", duration: "45 Min.", price: "250 €", approvalStatus: "approved" },
    ],
  },
];
