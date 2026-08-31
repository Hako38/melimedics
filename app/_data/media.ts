import type { MedicalApprovalStatus } from "./treatments";

export type MediaSlot = {
  id: string;
  src: string;
  alt: string;
  aspectRatio: `${number}/${number}`;
  width: number;
  height: number;
  sourceUrl: `https://${string}`;
  approvalStatus: MedicalApprovalStatus;
  todo: string;
};

const approvedMedia = (id: string, src: string, alt: string, width: number, height: number, sourceUrl: `https://${string}`): MediaSlot => ({
  id, src, alt, width, height, sourceUrl,
  aspectRatio: `${width}/${height}`,
  approvalStatus: "approved",
  todo: "",
});

export const mediaSlots = {
  homeHero: approvedMedia("home-hero", "/images/practice/praxis-behandlung.webp", "Melih Kandemir während einer Behandlung in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melimedics.webp"),
  doctorPortrait: approvedMedia("doctor-portrait", "/images/doctor/melih-kandemir-prp.webp", "Melih Kandemir bereitet eine PRP-Behandlung vor", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melih-Kandemir-.jpeg"),
  doctorBotulinumtoxin: approvedMedia("doctor-botulinumtoxin", "/images/doctor/melih-kandemir-botulinumtoxin.webp", "Melih Kandemir bei einer ästhetischen Behandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/Melih-Kandemir-Botox.jpeg"),
  doctorFacialTreatment: approvedMedia("doctor-facial-treatment", "/images/doctor/gesichtsbehandlung.webp", "Melih Kandemir bei einer Gesichtsbehandlung", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/H6.jpeg"),
  laserFacialTreatment: approvedMedia("laser-facial-treatment", "/images/doctor/laser-gesichtsbehandlung.webp", "Vorbereitung einer Gesichtsbehandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H31.jpeg"),
  treatmentPreparation: approvedMedia("treatment-preparation", "/images/doctor/behandlung-vorbereitung.webp", "Sorgfältige Vorbereitung einer Behandlung bei Melimedics", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/03/H2.jpeg"),
  practiceDetail: approvedMedia("practice-detail", "/images/practice/praxis-detail.webp", "Detailansicht aus den Räumen der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2024/01/Willkommen-bei-Melimedics.jpeg"),
  practiceGloves: approvedMedia("practice-gloves", "/images/doctor/praxis-detail-handschuhe.webp", "Behandlungsutensilien in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H30.jpeg"),
  practiceDecor: approvedMedia("practice-decor", "/images/doctor/praxis-detail-dekor.webp", "Dekoratives Detail in der Melimedics Praxis", 1200, 1800, "https://melimedics.de/wp-content/uploads/2025/04/H29.jpeg"),
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
} satisfies Record<string, MediaSlot>;
