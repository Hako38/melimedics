export type GuideSection = {
  title: string;
  paragraphs?: string[];
  points?: string[];
};

export type GuideArticle = {
  slug: string;
  tag: string;
  title: string;
  teaser: string;
  intro: string;
  readingTime: string;
  mediaKey: "doctorPortrait" | "facialConsultation" | "hairLossExamination";
  sections: GuideSection[];
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "beratungsgespraech-vorbereiten",
    tag: "Ästhetische Medizin",
    title: "Gut vorbereitet ins Beratungsgespräch",
    teaser: "Welche Fragen helfen, Behandlungsziele und Erwartungen realistisch zu besprechen?",
    intro: "Eine gute ästhetisch-medizinische Beratung beginnt nicht mit einem Produkt oder einer Methode. Sie beginnt mit Ihrem Anliegen, Ihrer gesundheitlichen Ausgangssituation und einer verständlichen Abwägung von Möglichkeiten und Grenzen.",
    readingTime: "5 Min. Lesezeit",
    mediaKey: "doctorPortrait",
    sections: [
      {
        title: "Formulieren Sie Ihr Ziel – nicht die Methode",
        paragraphs: [
          "Hilfreicher als der Wunsch nach einer bestimmten Behandlung ist zunächst die Beschreibung dessen, was Sie stört oder verändern möchten. Geht es um einen müden Ausdruck, mimische Linien, Konturen oder die Hautstruktur? So kann im Gespräch offen geprüft werden, ob die vermutete Methode überhaupt zum Anliegen passt.",
          "Bringen Sie gern ein realistisches Wunschbild in Worten mit. Stark bearbeitete Fotos oder Trends aus sozialen Medien eignen sich dagegen nur eingeschränkt als medizinische Orientierung.",
        ],
      },
      {
        title: "Diese Informationen gehören ins Gespräch",
        points: [
          "Vorerkrankungen, Allergien und frühere Eingriffe oder Behandlungen",
          "regelmäßig oder aktuell eingenommene Medikamente und Nahrungsergänzungsmittel",
          "Schwangerschaft, Stillzeit oder akute Infektionen",
          "frühere unerwünschte Reaktionen, Narben- oder Pigmentneigung",
          "bevorstehende Reisen, Veranstaltungen oder sportliche Belastungen",
        ],
      },
      {
        title: "Fragen, die Klarheit schaffen",
        points: [
          "Welche Alternativen gibt es – einschließlich der Möglichkeit, zunächst nicht zu behandeln?",
          "Welche Wirkung ist realistisch und welche Grenzen bleiben bestehen?",
          "Welche häufigen und welche seltenen Risiken sind für mich relevant?",
          "Welche Erholungszeit und Nachsorge sollte ich einplanen?",
          "Welche Kosten entstehen für den besprochenen Umfang?",
        ],
      },
      {
        title: "Eine gute Entscheidung darf Zeit brauchen",
        paragraphs: [
          "Sie sollten die Erklärung nachvollziehen können und Gelegenheit für Rückfragen haben. Bei Unsicherheit ist es sinnvoll, Informationen mitzunehmen und erst später zu entscheiden. Ein Beratungsgespräch verpflichtet nicht zu einer Behandlung.",
        ],
      },
    ],
  },
  {
    slug: "hautanalyse-am-anfang",
    tag: "Haut & Laser",
    title: "Warum eine Hautanalyse am Anfang steht",
    teaser: "Hautzustand, Anliegen und Alltag beeinflussen die Wahl eines Behandlungskonzepts.",
    intro: "Rötungen, Pigmentverschiebungen, Unreinheiten, Narben oder feine Linien können ähnlich wirken und dennoch unterschiedliche Ursachen haben. Eine persönliche Hautanalyse hilft, Ziel, Methode und Risiko sinnvoll zusammenzubringen.",
    readingTime: "6 Min. Lesezeit",
    mediaKey: "facialConsultation",
    sections: [
      {
        title: "Mehr als ein Blick auf die Oberfläche",
        paragraphs: [
          "Bei der ersten Einordnung werden unter anderem Hauttyp, aktuelle Reizung, Pigmentneigung, Narbenverhalten und die betroffene Region betrachtet. Ebenso wichtig sind Verlauf, bisherige Pflege, frühere Behandlungen und mögliche Auslöser.",
          "Unklare, neu entstandene oder auffällige Hautveränderungen gehören gegebenenfalls zunächst dermatologisch abgeklärt. Eine kosmetische oder ästhetische Behandlung ersetzt diese Diagnostik nicht.",
        ],
      },
      {
        title: "Was die Planung beeinflusst",
        points: [
          "aktuelle Entzündungen, Infektionen oder offene Hautstellen",
          "Hauttyp, Bräunung und Neigung zu hellen oder dunklen Pigmentveränderungen",
          "Medikamente sowie Erkrankungen, die Lichtempfindlichkeit oder Heilung beeinflussen",
          "Sonnenexposition, Pflegegewohnheiten und verfügbare Erholungszeit",
          "Behandlungsziel und realistische Erwartung an das Ergebnis",
        ],
      },
      {
        title: "Technologie folgt der Fragestellung",
        paragraphs: [
          "Laser, Microneedling, Peelings oder pflegende Verfahren sind keine austauschbaren Standardlösungen. Je nach Hautzustand können Intensität, Behandlungsabstände und Nachsorge deutlich variieren. Manchmal ist eine sanftere Vorbereitung sinnvoller als ein sofortiger intensiver Eingriff.",
        ],
      },
      {
        title: "Nachsorge gehört bereits zur Analyse",
        paragraphs: [
          "Ob konsequenter Lichtschutz, eine reduzierte Pflegeroutine oder eine bestimmte Ausfallzeit eingeplant werden muss, sollte vor der Behandlung geklärt sein. Erst wenn diese Rahmenbedingungen passen, entsteht ein verantwortbarer Behandlungsplan.",
        ],
      },
    ],
  },
  {
    slug: "haarausfall-verstehen",
    tag: "Haare",
    title: "Haarausfall: erst verstehen, dann behandeln",
    teaser: "Ein Überblick über die Bedeutung von Anamnese und diagnostischer Einordnung.",
    intro: "Haarausfall beschreibt zunächst ein Symptom. Verlauf, Muster, Kopfhaut, familiäre Faktoren und mögliche gesundheitliche Einflüsse entscheiden darüber, welche nächsten Schritte sinnvoll sein können.",
    readingTime: "7 Min. Lesezeit",
    mediaKey: "hairLossExamination",
    sections: [
      {
        title: "Verlauf und Muster geben erste Hinweise",
        paragraphs: [
          "Ein langsam zunehmender Rückgang an bestimmten Bereichen unterscheidet sich von plötzlich verstärktem, diffusem Haarverlust. Auch Juckreiz, Schmerzen, Schuppung oder entzündete Stellen verändern die medizinische Einordnung.",
          "Für das Gespräch ist hilfreich, seit wann die Veränderung besteht, ob sie schubweise auftritt und ob vergleichbare Muster in der Familie vorkommen.",
        ],
      },
      {
        title: "Mögliche Einflussfaktoren werden gemeinsam betrachtet",
        points: [
          "familiäre Veranlagung und hormonelle Veränderungen",
          "akute Erkrankungen, Operationen, starke Belastungsphasen oder Gewichtsveränderungen",
          "Medikamente, Nährstoffmangel oder relevante Vorerkrankungen",
          "Frisuren, mechanische Belastung und Pflegegewohnheiten",
          "Entzündungen oder Erkrankungen der Kopfhaut",
        ],
      },
      {
        title: "Diagnostik richtet sich nach der Fragestellung",
        paragraphs: [
          "Nicht jede Person benötigt dieselben Untersuchungen. Nach Anamnese und Betrachtung von Haaren und Kopfhaut kann entschieden werden, ob weitere ärztliche Diagnostik oder ausgewählte Laborwerte sinnvoll sind. Pauschale Testpakete ersetzen diese persönliche Fragestellung nicht.",
        ],
      },
      {
        title: "PRP oder Haartransplantation sind keine Startdiagnose",
        paragraphs: [
          "PRP kann bei geeigneter Ausgangssituation als möglicher Baustein besprochen werden. Eine Haartransplantation verlagert vorhandene Haarwurzeln und löst nicht automatisch die Ursache eines fortschreitenden Haarverlusts. Deshalb gehören Stabilität, Spenderbereich, Erwartungen und langfristige Perspektive in die Planung.",
        ],
      },
      {
        title: "Wann zeitnahe Abklärung wichtig ist",
        paragraphs: [
          "Plötzlicher starker Haarverlust, klar begrenzte kahle Stellen, entzündete oder schmerzhafte Kopfhaut sowie weitere körperliche Beschwerden sollten zeitnah ärztlich abgeklärt werden. Dieser Ratgeber bietet allgemeine Orientierung und ersetzt keine Diagnose.",
        ],
      },
    ],
  },
];

export const guideBySlug = Object.fromEntries(guideArticles.map((article) => [article.slug, article])) as Record<string, GuideArticle>;
