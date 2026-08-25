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
