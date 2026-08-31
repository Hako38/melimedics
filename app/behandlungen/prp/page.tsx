import { CategoryPage } from "../../_components/CategoryPage";
import { mediaSlots } from "../../_data/media";
import { pageMetadata } from "../../_lib/metadata";

export const metadata = pageMetadata("PRP-Behandlungen", "PRP für ausgewählte ästhetische und haarmedizinische Anliegen bei Melimedics in Mainz.", "/behandlungen/prp/");

export default function PrpPage(){return <CategoryPage path="/behandlungen/prp/" eyebrow="PRP" title={<>Eigenmaterial.<br/><em>Individuell eingesetzt.</em></>} intro="PRP wird aus dem eigenen Blut aufbereitet. Ob eine Behandlung für Ihr Anliegen geeignet ist, wird im ärztlichen Gespräch geprüft." note="Aufbereitung, Sitzungsplanung, mögliche Wirkung und Risiken gehören in die individuelle ärztliche Aufklärung." media={mediaSlots.prpPreparation} mediaLabel="Vorbereitung einer PRP-Behandlung" groups={[
  {title:"PRP-Behandlung",items:["Ästhetische Anwendung einordnen","Individuellen Plan besprechen"],href:"/behandlungen/prp-behandlung/"},
  {title:"PRP Haare",items:["Haarausfall ärztlich einordnen","Eignung für PRP prüfen","Mit dem Haarbereich verknüpft"],href:"/behandlungen/prp-haare/"}
]}/>}
