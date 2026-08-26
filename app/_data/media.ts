import type { MedicalApprovalStatus } from "./treatments";

export type MediaSlot = {
  id: string;
  src: string | null;
  alt: string;
  aspectRatio: `${number}/${number}`;
  approvalStatus: MedicalApprovalStatus;
  todo: string;
};

export const mediaSlots = {
  homeHero: {
    id: "home-hero",
    src: null,
    alt: "Ärztliche Beratung in der Melimedics Privatpraxis in Mainz",
    aspectRatio: "4/5",
    approvalStatus: "missing",
    todo: "Freigegebenes Originalfoto der Praxis oder einer ärztlichen Beratung bereitstellen.",
  },
  doctorPortrait: {
    id: "doctor-portrait",
    src: null,
    alt: "Porträt von Melih Kandemir in der Melimedics Privatpraxis",
    aspectRatio: "4/5",
    approvalStatus: "missing",
    todo: "Freigegebenes Originalporträt und finale Namensschreibweise bestätigen.",
  },
  practiceInterior: {
    id: "practice-interior",
    src: null,
    alt: "Innenansicht der Melimedics Privatpraxis in Mainz",
    aspectRatio: "3/2",
    approvalStatus: "missing",
    todo: "Freigegebene Originalaufnahme der Praxis bereitstellen.",
  },
} satisfies Record<string, MediaSlot>;
