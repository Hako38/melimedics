import { CategoryPage } from "../../_components/CategoryPage";
import { mediaSlots } from "../../_data/media";
import { pageMetadata } from "../../_lib/metadata";

export const metadata = pageMetadata("Haut & Laser", "CO₂-Laser, Tattoo-Laser und HIFU – ärztlich eingeordnete Haut- und Technologiebehandlungen in Mainz.", "/behandlungen/haut-laser/");

export default function SkinLaserPage(){return <CategoryPage path="/behandlungen/haut-laser/" eyebrow="Haut & Laser" title={<>Hautmedizin mit<br/><em>klarem Konzept.</em></>} intro="Hautbehandlungen werden nach Anliegen, Hautzustand und medizinischer Einschätzung geplant. Technologie ist dabei Teil eines individuellen Konzepts." note="Geräte, Behandlungsparameter, mögliche Ausfallzeiten und Risiken werden im persönlichen ärztlichen Gespräch eingeordnet." media={mediaSlots.laserTreatment} mediaLabel="Laserbehandlung bei Melimedics" showFinder groups={[
  {title:"CO₂-Laser",items:["Hautzustand beurteilen","Individuelle Indikationsprüfung","Nachsorge mitplanen"],href:"/behandlungen/co2-laser/"},
  {title:"Tattoo-Laser",items:["Tattoo und Haut beurteilen","Realistische Planung","Persönliche Nachsorge"],href:"/behandlungen/tattoo-laser/"},
  {title:"HIFU",items:["Eignung ärztlich klären","Ziele realistisch besprechen","Alternativen abwägen"],href:"/behandlungen/hifu/"}
]}/>}
