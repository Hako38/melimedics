import type { Metadata } from "next";
import { CategoryPage } from "../../_components/CategoryPage";

export const metadata: Metadata = { title: "Ästhetische Gesichtsbehandlungen", description: "Ärztlich geplante ästhetische Gesichtsbehandlungen bei Melimedics in Mainz." };
export default function FacePage(){return <CategoryPage eyebrow="Ästhetische Medizin" title={<>Frische, die nach<br/><em>Ihnen aussieht.</em></>} intro="Ästhetische Medizin beginnt für uns nicht mit einer Behandlung, sondern mit einem genauen Blick auf Mimik, Proportionen und Ihre persönlichen Wünsche." note="Einzelseiten werden ergänzt, sobald medizinisch geprüfte Inhalte vorliegen." groups={[
  {title:"Botulinumtoxin",items:["Mimische Falten","Ausgewählte medizinische Indikationen"]},
  {title:"Hyaluronsäure",items:["Lippen","Nase","Jawline","Kinn","Augenringe","Nasolabialfalten","Marionettenfalten"]},
  {title:"Biostimulatoren",items:["Sculptra","Radiesse","NCTF"]},
  {title:"Polynukleotide",items:["Indikation und Behandlungsplan nach Beratung"]}
]}/>}
