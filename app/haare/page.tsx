import type { Metadata } from "next";
import { CategoryPage } from "../_components/CategoryPage";

export const metadata: Metadata = { title: "Haare & Haarmedizin", description: "Haarmedizin, PRP Haare und Perspektiven zur Haartransplantation bei Melimedics in Mainz." };
export default function HairPage(){return <CategoryPage eyebrow="Haarmedizin" title={<>Haarausfall verstehen.<br/><em>Gezielt handeln.</em></>} intro="Haarmedizin braucht Ursachenklärung und einen realistischen Plan. Wir bündeln Beratung, ausgewählte Behandlungen und die Perspektive Haartransplantation." note="Die Detailseiten werden in einer späteren Inhaltsphase medizinisch ausgearbeitet." groups={[{title:"Haarausfall",items:["Anamnese","Diagnostische Einordnung","Individueller Behandlungsweg"]},{title:"PRP Haare",items:["Ärztliche Indikationsprüfung","Behandlungsserie nach Plan"],href:"/behandlungen/prp/"},{title:"Haartransplantation",items:["Persönliche Beratung","Planung und Nachsorge"]}]}/>}
