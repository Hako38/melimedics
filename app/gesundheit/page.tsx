import type { Metadata } from "next";
import { CategoryPage } from "../_components/CategoryPage";
export const metadata: Metadata = { title: "Gesundheit", description: "Ausgewählte Gesundheitsleistungen bei Melimedics in Mainz." };
export default function HealthPage(){return <CategoryPage eyebrow="Gesundheit" title={<>Gesundheit<br/><em>im Gesamtbild.</em></>} intro="Ausgewählte ärztliche Leistungen ergänzen die drei medizinischen Hauptbereiche. Diagnostik und Beratung stehen am Anfang." groups={[{title:"Gewichtsmanagement",items:["Ärztliche Beratung","Individuelle Zielsetzung","Verlaufskontrolle"]},{title:"Blutuntersuchungen & Diagnostik",items:["Auswahl nach ärztlicher Indikation","Besprechung der Ergebnisse"]}]}/>}
