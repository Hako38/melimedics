import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Melimedics homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Medizinische Präzision/);
  assert.match(html, /Ärztliche Ästhetik, Haut- und Haarmedizin/);
  assert.doesNotMatch(html, /codex-preview|Building your site|Lorem ipsum/i);
});

test("renders a representative treatment category", async () => {
  const response = await render("/behandlungen/haut-laser");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Hautmedizin/);
  assert.match(html, /CO₂-Laser/);
});
