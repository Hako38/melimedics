import type { Metadata } from "next";
import { CategoryPage } from "../_components/CategoryPage";
export const metadata: Metadata = { title: "Kosmetik", description: "Kosmetische Zusatzbehandlungen bei Melimedics in Mainz." };
export default function CosmeticsPage(){return <CategoryPage eyebrow="Kosmetik" title={<>Pflege, die das<br/><em>Konzept ergänzt.</em></>} intro="Kosmetische Behandlungen verstehen wir als gezielte Ergänzung – abgestimmt auf Hautzustand und Behandlungsziel." groups={[{title:"Microneedling",items:["Hautanalyse vor Behandlung","Individueller Behandlungsplan"]},{title:"Aquafacial",items:["Reinigung und Pflege","Abstimmung auf den Hautzustand"]}]}/>}
