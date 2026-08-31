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
  assert.match(practice, /postalCode: \{ value: null, status: "needs_review"/);
  assert.doesNotMatch(contact, />5512[24]</);
  assert.match(treatments, /medicalApprovalStatus: "needs_review"/);
  assert.match(treatments, /assistantApprovalStatus: "approved"/);
  assert.doesNotMatch(treatments, /grafts?\s*[:=]\s*\d+/i);
  assert.doesNotMatch(treatments, /\b\d+\s*(?:€|Euro)\b/i);
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
  assert.equal(localSources.length, 22);
  assert.match(media, /brandLogo/);
  assert.ok(localSources.every((source) => source.startsWith("/images/")));
});
