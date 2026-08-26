import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("uses a portable standard Next.js runtime", async () => {
  const [packageJson, nextConfig] = await Promise.all([read("package.json"), read("next.config.ts")]);
  assert.match(packageJson, /"next":/);
  assert.match(packageJson, /"dev": "next dev"/);
  assert.match(nextConfig, /output: "standalone"/);
  assert.doesNotMatch(packageJson, /vinext|cloudflare|wrangler|sites-vite/i);
});

test("contains the complete Phase 1B homepage without fabricated proof", async () => {
  const [homepage, content] = await Promise.all([read("app/page.tsx"), read("app/_data/home.ts")]);
  assert.match(homepage, /Ästhetische Medizin,.*Haut &amp; Haare.*in Mainz/s);
  assert.match(homepage, /Was möchten Sie/);
  assert.match(homepage, /Haare ganzheitlich/);
  assert.match(homepage, /Testimonials items=\{verifiedTestimonials\}/);
  assert.match(content, /verifiedTestimonials: VerifiedTestimonial\[\] = \[\]/);
  assert.doesNotMatch(`${homepage}\n${content}`, /Lorem ipsum|Sarah J\.|Michael T\.|five-star reviews/i);
});

test("keeps SEO redirects and legal routes", async () => {
  const [botox, privacy, imprint] = await Promise.all([read("app/botox/page.tsx"), read("app/datenschutz/page.tsx"), read("app/impressum/page.tsx")]);
  assert.match(botox, /permanentRedirect/);
  assert.match(privacy, /Datenschutz/);
  assert.match(imprint, /Impressum/);
});

test("provides the Phase 1C treatment architecture without fabricated prices", async () => {
  const [data, template, prices, hair, contact] = await Promise.all([
    read("app/_data/treatments.ts"),
    read("app/_components/TreatmentTemplate.tsx"),
    read("app/preise/page.tsx"),
    read("app/haare/page.tsx"),
    read("app/_data/practice.ts"),
  ]);
  assert.match(data, /"approved" \| "needs_review" \| "missing"/);
  assert.match(data, /medicalApprovalStatus/);
  assert.match(data, /slug: "haartransplantation"/);
  assert.match(template, /treatment\.concerns\?\.length/);
  assert.match(template, /relatedTreatments/);
  assert.match(prices, /priceCategories/);
  assert.doesNotMatch(prices, /€|EUR|\d{2,}[,.]\d{2}/);
  assert.match(hair, /Haarausfall verstehen/);
  assert.match(contact, /postalCode: \{ value: null/);
});

test("adds canonical metadata and detail routes", async () => {
  const [metadata, route, sitemap] = await Promise.all([
    read("app/_lib/metadata.ts"),
    read("app/behandlungen/[slug]/page.tsx"),
    read("app/sitemap.ts"),
  ]);
  assert.match(metadata, /alternates: \{ canonical \}/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /generateMetadata/);
  assert.match(sitemap, /treatments\.map/);
});

test("hardens Phase 1D SEO, accessibility, security and error states", async () => {
  const [layout, robots, config, shell, notFound, errorState, structuredData] = await Promise.all([
    read("app/layout.tsx"),
    read("app/robots.ts"),
    read("next.config.ts"),
    read("app/_components/SiteShell.tsx"),
    read("app/not-found.tsx"),
    read("app/error.tsx"),
    read("app/_components/StructuredData.tsx"),
  ]);
  assert.match(layout, /skip-link/);
  assert.match(layout, /isIndexableEnvironment/);
  assert.match(robots, /disallow/);
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /Permissions-Policy/);
  assert.match(shell, /breadcrumbSchema/);
  assert.match(shell, /faqSchema/);
  assert.match(notFound, /Fehler 404/);
  assert.match(errorState, /Erneut versuchen/);
  assert.match(structuredData, /MedicalClinic/);
  assert.doesNotMatch(structuredData, /PostalAddress|openingHours|aggregateRating|priceRange/);
});

test("provides a private centralized content approval report", async () => {
  const status = await read("app/_lib/content-status.ts");
  assert.match(status, /getContentStatusReport/);
  assert.match(status, /approved: 0, needs_review: 0, missing: 0/);
  assert.match(status, /area: "treatment"/);
  assert.match(status, /area: "price"/);
  assert.match(status, /area: "practice"/);
  assert.match(status, /area: "doctor"/);
  assert.match(status, /area: "media"/);
  assert.match(status, /area: "finder_mapping"/);
});

test("integrates the Phase 2A finder without tracking or diagnosis features", async () => {
  const [page, component, analytics, sitemap, homepage, treatments, category, hair] = await Promise.all([
    read("app/behandlungsfinder/page.tsx"),
    read("app/_components/TreatmentFinder.tsx"),
    read("app/_lib/finder-analytics.ts"),
    read("app/sitemap.ts"),
    read("app/page.tsx"),
    read("app/behandlungen/page.tsx"),
    read("app/_components/CategoryPage.tsx"),
    read("app/haare/page.tsx"),
  ]);
  assert.match(page, /pageMetadata/);
  assert.match(page, /keine Diagnose/);
  assert.match(component, /type="radio"/);
  assert.match(component, /Zurück/);
  assert.match(component, /Finder neu starten/);
  assert.match(component, /Die endgültige Beurteilung erfolgt nach ärztlicher Beratung/);
  for (const event of ["finder_started", "category_selected", "finder_completed", "result_clicked", "booking_clicked"]) assert.match(analytics, new RegExp(event));
  assert.doesNotMatch(analytics, /fetch\(|sendBeacon|google|meta|pixel/i);
  assert.match(sitemap, /behandlungsfinder/);
  for (const source of [homepage, treatments, category, hair]) assert.match(source, /behandlungsfinder/);
  assert.doesNotMatch(`${page}\n${component}`, /Foto-Upload|Haaranalyse|Lead-Scoring|CRM|Chatbot/i);
});

test("integrates the Phase 2B hair check and its privacy-safe funnel", async () => {
  const [page, component, service, analytics, sitemap, hair, template, finder, status] = await Promise.all([
    read("app/haare/haar-check/page.tsx"),
    read("app/_components/HairCheck.tsx"),
    read("app/_lib/hair-check-submission.ts"),
    read("app/_lib/hair-check-analytics.ts"),
    read("app/sitemap.ts"),
    read("app/haare/page.tsx"),
    read("app/_components/TreatmentTemplate.tsx"),
    read("app/_components/TreatmentFinder.tsx"),
    read("app/_lib/content-status.ts"),
  ]);
  assert.match(page, /pageMetadata/);
  assert.match(component, /Keine automatische Diagnose/);
  assert.match(component, /Keine KI-Bildauswertung/);
  assert.match(component, /Nur lokale Vorschau/);
  assert.match(component, /JPEG oder PNG/);
  assert.match(service, /secure_backend_unavailable/);
  assert.doesNotMatch(service, /fetch\(|console\./);
  assert.match(analytics, /hair_check_started/);
  assert.match(sitemap, /haare\/haar-check/);
  for (const source of [hair, template, finder]) assert.match(source, /haare\/haar-check/);
  assert.match(status, /hair_check/);
});
