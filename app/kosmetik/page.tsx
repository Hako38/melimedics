import { CategoryPage } from "../_components/CategoryPage";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Kosmetik", "Microneedling und Aquafacial als kosmetische Zusatzbehandlungen bei Melimedics in Mainz.", "/kosmetik/");

export default function CosmeticsPage(){return <div className="cosmetics-page"><CategoryPage eyebrow="Kosmetik" title={<>Pflege, die das<br/><em>Konzept ergänzt.</em></>} intro="Kosmetische Behandlungen sind bei Melimedics klar von den ärztlichen Kernleistungen getrennt – und zugleich Teil derselben ruhigen, hochwertigen Beratungskultur." note="Geräte, Produkte, Abläufe und Kontraindikationen werden vor Veröffentlichung fachlich geprüft." groups={[
  {title:"Microneedling",items:["Hautzustand vorab betrachten","Pflegeziel gemeinsam besprechen","Ärztliche Verfahren klar abgrenzen"],href:"/behandlungen/microneedling/"},
  {title:"Aquafacial",items:["Reinigung und Pflege","Individuelle Abstimmung","Ergänzung eines Hautkonzepts"],href:"/behandlungen/aquafacial/"}
]}/></div>}
