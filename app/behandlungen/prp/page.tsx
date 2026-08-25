import type { Metadata } from "next";
import { CategoryPage } from "../../_components/CategoryPage";

export const metadata: Metadata = { title: "PRP-Behandlungen", description: "PRP für ausgewählte Haut- und Haaranliegen bei Melimedics in Mainz." };
export default function PrpPage(){return <CategoryPage eyebrow="PRP" title={<>Eigenmaterial.<br/><em>Individuell eingesetzt.</em></>} intro="PRP wird aus dem eigenen Blut aufbereitet. Ob eine Behandlung für Ihr Anliegen geeignet ist, wird im ärztlichen Gespräch geprüft." note="Medizinische Angaben zu Sitzungsanzahl, Wirkung und Risiken sind als redaktionelle Freigabe offen." groups={[{title:"PRP-Behandlungen",items:["Ausgewählte ästhetische Anwendungen","Individuelle Behandlungsplanung"]},{title:"PRP Haare",items:["Haarausfall einordnen","Behandlungsplan nach Befund"],href:"/haare/"}]}/>}
