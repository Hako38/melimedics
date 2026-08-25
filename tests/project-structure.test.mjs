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
