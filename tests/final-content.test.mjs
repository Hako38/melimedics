import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("contains complete conservative treatment content and health detail routes", async () => {
  const [treatments, template, health] = await Promise.all([
    read("app/_data/treatments.ts"),
    read("app/_components/TreatmentTemplate.tsx"),
    read("app/gesundheit/page.tsx"),
  ]);
  for (const field of ["mechanism", "limitations", "contraindications", "aftercare", "risks", "faq", "assistantSummary", "assistantApprovalStatus"]) {
    assert.match(treatments, new RegExp(field));
  }
  for (const slug of ["botulinumtoxin", "hyaluronsaeure", "biostimulatoren", "polynukleotide", "co2-laser", "tattoo-laser", "hifu", "prp-behandlung", "haarausfall", "prp-haare", "haartransplantation", "microneedling", "aquafacial", "gewichtsmanagement", "diagnostik"]) {
    assert.match(treatments, new RegExp(`slug: "${slug}"`));
  }
  assert.match(health, /\/behandlungen\/gewichtsmanagement\//);
  assert.match(health, /\/behandlungen\/diagnostik\//);
  assert.doesNotMatch(template, /Noch offen:/);
});

test("keeps uncertain practice, clinical and commercial claims gated", async () => {
  const [treatments, practice, contact, knowledge] = await Promise.all([
    read("app/_data/treatments.ts"),
    read("app/_data/practice.ts"),
    read("app/kontakt/page.tsx"),
    read("app/_server/assistant/knowledge-base.ts"),
  ]);
  assert.match(practice, /postalCode: \{ value: "55122", status: "verified"/);
  assert.match(contact, /visibleContact\.postalCode/);
  assert.match(treatments, /medicalApprovalStatus: "needs_review"/);
  assert.match(treatments, /assistantApprovalStatus: "approved"/);
  assert.doesNotMatch(treatments, /grafts?\s*[:=]\s*\d+/i);
  assert.match(treatments, /priceSourceUrl/);
  assert.match(treatments, /price: "150 €"/);
  assert.match(knowledge, /content: treatment\.assistantSummary/);
});

test("does not publish template assets or hotlink images", async () => {
  const [media, homepage, practice, template] = await Promise.all([
    read("app/_data/media.ts"),
    read("app/page.tsx"),
    read("app/arzt-praxis/page.tsx"),
    read("app/_components/TreatmentTemplate.tsx"),
  ]);
  const publicCode = `${homepage}\n${practice}\n${template}`;
  assert.doesNotMatch(publicCode, /\/images\/legacy\//);
  assert.doesNotMatch(publicCode, /https:\/\/melimedics\.de\/wp-content\/uploads/);
  const localSources = [...media.matchAll(/approvedMedia\("[^"]+",\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(localSources.length, 23);
  assert.match(media, /brandLogo/);
  assert.match(media, /practiceReception/);
  assert.ok(localSources.every((source) => source.startsWith("/images/")));
});

test("keeps every editorial interior hero connected to a real media slot", async () => {
  const pages = await Promise.all([
    read("app/behandlungen/page.tsx"),
    read("app/haare/page.tsx"),
    read("app/termin/page.tsx"),
    read("app/datenschutz/page.tsx"),
    read("app/impressum/page.tsx"),
  ]);
  for (const page of pages) {
    assert.match(page, /<InteriorHero/);
    assert.match(page, /media=\{mediaSlots\.[A-Za-z]+\}/);
  }
});

test("publishes the guide articles and clearly discloses generated visuals", async () => {
  const [guides, guideIndex, guideRoute, media, shell, homepage, practice] = await Promise.all([
    read("app/_data/guides.ts"),
    read("app/ratgeber/page.tsx"),
    read("app/ratgeber/[slug]/page.tsx"),
    read("app/_data/media.ts"),
    read("app/_components/SiteShell.tsx"),
    read("app/page.tsx"),
    read("app/arzt-praxis/page.tsx"),
  ]);
  for (const slug of ["beratungsgespraech-vorbereiten", "hautanalyse-am-anfang", "haarausfall-verstehen"]) assert.match(guides, new RegExp(`slug: "${slug}"`));
  assert.match(guideIndex, /Aktuelle Beiträge/);
  assert.doesNotMatch(guideIndex, /Redaktionell in Vorbereitung|Themen in Vorbereitung/);
  assert.match(guideRoute, /generateStaticParams/);
  assert.match(media, /mediaKind: "ai-generated"/);
  assert.match(media, /disclosure: "KI-Visualisierung"/);
  for (const source of [shell, homepage, practice]) assert.match(source, /ai-media-badge/);
});
