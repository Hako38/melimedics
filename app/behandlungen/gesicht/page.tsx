import { CategoryPage } from "../../_components/CategoryPage";
import { pageMetadata } from "../../_lib/metadata";

export const metadata = pageMetadata("Ästhetische Gesichtsbehandlungen", "Botulinumtoxin, Hyaluronsäure, Biostimulatoren und Polynukleotide – ärztlich geplant bei Melimedics in Mainz.", "/behandlungen/gesicht/");

export default function FacePage(){return <CategoryPage path="/behandlungen/gesicht/" eyebrow="Ästhetische Medizin" title={<>Frische, die nach<br/><em>Ihnen aussieht.</em></>} intro="Ästhetische Medizin beginnt für uns nicht mit einer Methode, sondern mit einem genauen Blick auf Mimik, Proportionen und Ihre persönlichen Wünsche." note="Medizinische Detailangaben werden erst nach ärztlicher Prüfung veröffentlicht." showFinder groups={[
  {title:"Botulinumtoxin",items:["Mimik individuell betrachten","Mögliche Behandlungswege einordnen"],href:"/behandlungen/botulinumtoxin/"},
  {title:"Hyaluronsäure",items:["Lippen","Nase","Jawline","Kinn","Augenringe","Nasolabialfalten","Marionettenfalten"],href:"/behandlungen/hyaluronsaeure/"},
  {title:"Biostimulatoren",items:["Sculptra","Radiesse","NCTF"],href:"/behandlungen/biostimulatoren/"},
  {title:"Polynukleotide",items:["Polynukleotide","Ergänzende Nutzerbezeichnung: Lachs-DNA"],href:"/behandlungen/polynukleotide/"}
]}/>}
