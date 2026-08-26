import { Breadcrumbs, PageShell } from "../../_components/SiteShell";
import { HairCheck } from "../../_components/HairCheck";
import { pageMetadata } from "../../_lib/metadata";

export const metadata = pageMetadata(
  "Haar-Check",
  "Bereiten Sie Ihre Angaben für eine persönliche Haarberatung bei Melimedics in Mainz vor – freiwillig, ohne automatische Diagnose oder KI-Bildauswertung.",
  "/haare/haar-check/",
  { shareImage: false },
);

export default function HairCheckPage() {
  return <PageShell><Breadcrumbs items={[{ label: "Haarmedizin", href: "/haare/" }, { label: "Haar-Check", href: "/haare/haar-check/" }]}/><HairCheck/></PageShell>;
}
