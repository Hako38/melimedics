import { Breadcrumbs, PageShell } from "../_components/SiteShell";
import { TreatmentFinder } from "../_components/TreatmentFinder";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata(
  "Behandlungsfinder",
  "Strukturieren Sie Ihr Anliegen und entdecken Sie mögliche Beratungsbereiche bei Melimedics in Mainz – ohne automatische Diagnose.",
  "/behandlungsfinder/",
);

export default function TreatmentFinderPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Behandlungsfinder", href: "/behandlungsfinder/" }]}/>
    <header className="finder-hero">
      <div>
        <p className="eyebrow">Orientierung in 60–120 Sekunden</p>
        <h1>Welcher Bereich passt<br/><em>zu Ihrem Anliegen?</em></h1>
      </div>
      <p>Der Behandlungsfinder hilft Ihnen, Ihr Anliegen zu strukturieren und passende Bereiche für ein ärztliches Beratungsgespräch zu entdecken. Er stellt keine Diagnose und ersetzt keine persönliche Untersuchung.</p>
    </header>
    <TreatmentFinder/>
  </PageShell>;
}
