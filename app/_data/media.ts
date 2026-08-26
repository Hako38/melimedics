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

export const mediaSlots = {
  homeHero: {
    id: "home-hero",
    src: "/images/melimedics/praxis-behandlung.webp",
    alt: "Melih Kandemir bei der Vorbereitung einer Behandlung in der Melimedics Praxis in Mainz",
    aspectRatio: "2/3",
    width: 1707,
    height: 2560,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-scaled.webp",
    approvalStatus: "approved",
    todo: "",
  },
  doctorPortrait: {
    id: "doctor-portrait",
    src: "/images/melimedics/melih-kandemir-prp.jpeg",
    alt: "Melih Kandemir bereitet in der Melimedics Praxis eine PRP-Behandlung vor",
    aspectRatio: "2/3",
    width: 1707,
    height: 2560,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/Melih-Kandemir--scaled.jpeg",
    approvalStatus: "approved",
    todo: "",
  },
  facialConsultation: {
    id: "facial-consultation",
    src: "/images/melimedics/gesichtsberatung.webp",
    alt: "Ärztliche Betrachtung des Gesichts einer Patientin bei Melimedics",
    aspectRatio: "1/1",
    width: 1024,
    height: 1024,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/instagram-4.webp",
    approvalStatus: "approved",
    todo: "",
  },
  botulinumtoxinTreatment: {
    id: "botulinumtoxin-treatment",
    src: "/images/melimedics/botulinumtoxin-behandlung.jpeg",
    alt: "Botulinumtoxin-Behandlung einer Patientin bei Melimedics",
    aspectRatio: "2/3",
    width: 1707,
    height: 2560,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/Botox-Behandlung-scaled.jpeg",
    approvalStatus: "approved",
    todo: "",
  },
  facialTreatment: {
    id: "facial-treatment",
    src: "/images/melimedics/gesichtspflege.jpeg",
    alt: "Patientin während einer professionellen Gesichtspflege bei Melimedics",
    aspectRatio: "2/3",
    width: 1707,
    height: 2560,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/Gesichtspflege-scaled.jpeg",
    approvalStatus: "approved",
    todo: "",
  },
  cuppingTreatment: {
    id: "cupping-treatment",
    src: "/images/melimedics/schroepfen-behandlung.jpeg",
    alt: "Melih Kandemir führt in der Melimedics Praxis eine Schröpfbehandlung durch",
    aspectRatio: "2/3",
    width: 1707,
    height: 2560,
    sourceUrl: "https://melimedics.de/wp-content/uploads/2025/03/Melimedics-Schroepfen-Ruecken-2-scaled.jpeg",
    approvalStatus: "approved",
    todo: "",
  },
} satisfies Record<string, MediaSlot>;
