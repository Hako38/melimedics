import type { MedicalApprovalStatus } from "./treatments";

export type MediaSlot = {
  id: string;
  src: string;
  alt: string;
  aspectRatio: `${number}/${number}`;
  width: number;
  height: number;
  sourceUrl: `https://${string}`;
  mediaKind: "original" | "ai-generated";
  disclosure?: string;
  approvalStatus: MedicalApprovalStatus;
  todo: string;
};

const approvedMedia = (id: string, src: string, alt: string, width: number, height: number, sourceUrl: `https://${string}`): MediaSlot => ({
  id, src, alt, width, height, sourceUrl,
  aspectRatio: `${width}/${height}`,
  mediaKind: "original",
  approvalStatus: "approved",
  todo: "",
});

const generatedMedia = (id: string, src: string, alt: string): MediaSlot => ({
  id,
  src,
  alt,
  width: 1200,
  height: 1800,
  sourceUrl: "https://openai.com/",
  aspectRatio: "1200/1800",
  mediaKind: "ai-generated",
  disclosure: "KI-Visualisierung",
  approvalStatus: "approved",
  todo: "",
});

export const mediaSlots = {
  brandLogo: approvedMedia("brand-logo", "/images/miscellaneous/melimedics-logo-header.webp", "Melimedics Beauty & Health Logo", 631, 445, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Logo-2.png"),
  homeHero: approvedMedia("home-hero", "/images/practice/praxis-behandlung.webp", "Melih Kandemir während einer Behandlung in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics.webp"),
  doctorPortrait: approvedMedia("doctor-portrait", "/images/doctor/melih-kandemir-prp.webp", "Melih Kandemir bereitet eine PRP-Behandlung vor", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melih-Kandemir-.jpeg"),
  doctorBotulinumtoxin: approvedMedia("doctor-botulinumtoxin", "/images/doctor/melih-kandemir-botulinumtoxin.webp", "Melih Kandemir bei einer ästhetischen Behandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melih-Kandemir-Botox.jpeg"),
  doctorFacialTreatment: approvedMedia("doctor-facial-treatment", "/images/doctor/gesichtsbehandlung.webp", "Melih Kandemir bei einer Gesichtsbehandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/H6.jpeg"),
  laserFacialTreatment: approvedMedia("laser-facial-treatment", "/images/doctor/laser-gesichtsbehandlung.webp", "Vorbereitung einer Gesichtsbehandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H31.jpeg"),
  treatmentPreparation: approvedMedia("treatment-preparation", "/images/doctor/behandlung-vorbereitung.webp", "Sorgfältige Vorbereitung einer Behandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/H2.jpeg"),
  practiceDetail: approvedMedia("practice-detail", "/images/practice/praxis-detail.webp", "Detailansicht aus den Räumen der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2024/01/Willkommen-bei-Melimedics.jpeg"),
  practiceGloves: approvedMedia("practice-gloves", "/images/doctor/praxis-detail-handschuhe.webp", "Behandlungsutensilien in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H30.jpeg"),
  practiceDecor: approvedMedia("practice-decor", "/images/doctor/praxis-detail-dekor.webp", "Dekoratives Detail in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H29.jpeg"),
  practiceReception: approvedMedia("practice-reception", "/images/practice/melimedics-empfang.jpg", "Empfang und Wartebereich der Melimedics Praxis in Mainz-Gonsenheim", 574, 1020, "https://www.google.com/maps/search/?api=1&query=Melimedics+Mainz"),
  botulinumtoxinTreatment: approvedMedia("botulinumtoxin-treatment", "/images/treatments/aesthetics/botulinumtoxin-behandlung.webp", "Botulinumtoxin-Behandlung einer Patientin bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Botox-Behandlung.jpeg"),
  aestheticTreatment: approvedMedia("aesthetic-treatment", "/images/treatments/aesthetics/aesthetische-behandlung.webp", "Ästhetische Behandlung in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Spritze.jpeg"),
  facialConsultation: approvedMedia("facial-consultation", "/images/treatments/aesthetics/gesichtsberatung.webp", "Betrachtung des Gesichts einer Patientin bei Melimedics", 1024, 1024, "https://melimedics.de/wp-content/uploads/2025/03/instagram-4.webp"),
  facialTreatment: approvedMedia("facial-treatment", "/images/treatments/aesthetics/gesichtspflege.webp", "Patientin während einer professionellen Gesichtspflege bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Gesichtspflege.jpeg"),
  slimmingInjectionArchive: approvedMedia("slimming-injection-archive", "/images/treatments/aesthetics/fett-weg-spritze.webp", "Dokumentierte frühere Injektionsbehandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2024/01/Melimedics-Fett-Weg-Spritze.jpeg"),
  laserTreatment: approvedMedia("laser-treatment", "/images/skin-laser/laserbehandlung.webp", "Laserbehandlung in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Laser-Behandlungen.jpeg"),
  prpPreparation: approvedMedia("prp-preparation", "/images/hair/prp-eigenblut.webp", "Vorbereitung von Eigenblut für eine PRP-Behandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melihmedics-Eigenblut.jpeg"),
  prpBlood: approvedMedia("prp-blood", "/images/hair/prp-blut.webp", "Blutentnahme als Schritt einer möglichen PRP-Behandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Blut.webp"),
  infusionTreatment: approvedMedia("infusion-treatment", "/images/treatments/health/infusionstherapie.webp", "Dokumentierte Infusionsbehandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2024/01/Infusionstherapie-Melimedics.jpeg"),
  cuppingDetail: approvedMedia("cupping-detail", "/images/treatments/health/schroepfen-detail.webp", "Detail einer Schröpfbehandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Schroepfen.jpeg"),
  cuppingBack: approvedMedia("cupping-back", "/images/treatments/health/schroepfen-ruecken.webp", "Schröpfgläser während einer Behandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Schroepfen-Ruecken.jpeg"),
  cuppingTreatment: approvedMedia("cupping-treatment", "/images/treatments/health/schroepfen-behandlung.webp", "Melih Kandemir führt eine Schröpfbehandlung durch", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Schroepfen-Ruecken-2.jpeg"),
  hairLossExamination: generatedMedia("hair-loss-examination", "/images/ai/haarausfall-untersuchung.jpg", "Ärztliche Untersuchung der Kopfhaut zur Einordnung von Haarausfall"),
  hairTransplantConsultation: generatedMedia("hair-transplant-consultation", "/images/ai/haartransplantation-beratung.jpg", "Ärztliche Beratung und Untersuchung der Haarlinie vor einer möglichen Haartransplantation"),
  treatmentRoomVisualization: generatedMedia("treatment-room-visualization", "/images/ai/behandlungsraum-visualisierung.jpg", "Visualisierung einer ruhigen medizinischen Behandlungsumgebung"),
  treatmentPreparationVisualization: generatedMedia("treatment-preparation-visualization", "/images/ai/behandlungsvorbereitung-visualisierung.jpg", "Visualisierung einer sorgfältig vorbereiteten medizinischen Behandlung"),
  practiceDetailVisualization: generatedMedia("practice-detail-visualization", "/images/ai/praxisdetails-visualisierung.jpg", "Visualisierung ruhiger und zurückhaltend gestalteter Praxisdetails"),
  consultationVisualization: generatedMedia("consultation-visualization", "/images/ai/beratungsgespraech-visualisierung.jpg", "Visualisierung eines ruhigen ärztlichen Beratungsgesprächs"),
} satisfies Record<string, MediaSlot>;
