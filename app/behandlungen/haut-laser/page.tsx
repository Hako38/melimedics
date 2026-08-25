import type { Metadata } from "next";
import { CategoryPage } from "../../_components/CategoryPage";

export const metadata: Metadata = { title: "Haut & Laser", description: "Ärztlich begleitete Haut- und Laserbehandlungen bei Melimedics in Mainz." };
export default function SkinLaserPage(){return <CategoryPage eyebrow="Haut & Laser" title={<>Hautmedizin mit<br/><em>klarem Konzept.</em></>} intro="Hautbehandlungen werden nach Anliegen, Hautzustand und medizinischer Einschätzung geplant. Geräte allein sind noch kein Behandlungskonzept." note="Behandlungsparameter, Ausfallzeiten und Risiken werden erst nach ärztlicher Freigabe veröffentlicht." groups={[
  {title:"CO₂-Laser",items:["Hautstruktur","Individuelle Indikationsprüfung"]},
  {title:"Tattoo-Laser",items:["Beratung und Einschätzung","Behandlungsserie nach individuellem Plan"]},
  {title:"HIFU",items:["Nicht-invasive Technologie","Eignung nach ärztlicher Beratung"]}
]}/>}
