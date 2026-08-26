import assert from "node:assert/strict";

const baseUrl = new URL(process.env.BASE_URL ?? "http://localhost:3000/");
const productionOrigin = "https://melimedics.de";

const redirects = {
  "/botox/": "/behandlungen/gesicht/",
  "/gesichtsbehandlung/": "/behandlungen/haut-laser/",
  "/ueber-uns/": "/arzt-praxis/",
  "/prp-prf-therapie/": "/behandlungen/prp/",
  "/mediziniches-schroepfen/": "/gesundheit/",
  "/infusionstherapie/": "/gesundheit/",
  "/fett-weg-spritze/": "/behandlungen/gesicht/",
  "/datenschutzerklaerung/": "/datenschutz/",
};

const fetchLocal = (path, init = {}) => fetch(new URL(path, baseUrl), init);
const matchContent = (html, pattern, label) => {
  const match = html.match(pattern);
  assert.ok(match?.[1], `${label} fehlt`);
  return match[1];
};

const sitemapResponse = await fetchLocal("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "sitemap.xml ist nicht erreichbar");
const sitemapXml = await sitemapResponse.text();
const routes = [...sitemapXml.matchAll(/<loc>https:\/\/melimedics\.de([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
assert.ok(routes.length >= 25, `Zu wenige Sitemap-Routen: ${routes.length}`);
assert.equal(new Set(routes).size, routes.length, "Doppelte URLs in der Sitemap");

const robotsResponse = await fetchLocal("/robots.txt");
assert.equal(robotsResponse.status, 200, "robots.txt ist nicht erreichbar");
const robotsText = await robotsResponse.text();
assert.match(robotsText, /Disallow: \//, "Lokale Vorschau muss Crawling blockieren");
assert.match(robotsText, /Sitemap: https:\/\/melimedics\.de\/sitemap\.xml/);

const titles = new Map();
const descriptions = new Map();
const discoveredInternalLinks = new Set();

for (const route of routes) {
  const response = await fetchLocal(route, { redirect: "manual" });
  assert.equal(response.status, 200, `${route} liefert nicht HTTP 200`);
  const html = await response.text();
  const title = matchContent(html, /<title>([^<]+)<\/title>/, `${route}: Title`);
  const description = matchContent(html, /<meta name="description" content="([^"]+)"/, `${route}: Meta Description`);
  const canonical = matchContent(html, /<link rel="canonical" href="([^"]+)"/, `${route}: Canonical`);
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  assert.equal(h1Count, 1, `${route}: erwartet genau eine H1, gefunden ${h1Count}`);
  assert.equal(canonical, new URL(route, productionOrigin).toString(), `${route}: falscher Canonical`);
  assert.match(html, /property="og:title"/i, `${route}: OpenGraph Title fehlt`);
  assert.match(html, /property="og:description"/i, `${route}: OpenGraph Description fehlt`);
  assert.match(html, /name="twitter:card"/i, `${route}: Twitter Card fehlt`);
  assert.match(html, /"@type":"MedicalClinic"/, `${route}: MedicalClinic Schema fehlt`);
  if (route !== "/") assert.match(html, /"@type":"BreadcrumbList"/, `${route}: BreadcrumbList Schema fehlt`);
  assert.ok(!titles.has(title), `${route}: doppelter Title mit ${titles.get(title)}`);
  assert.ok(!descriptions.has(description), `${route}: doppelte Description mit ${descriptions.get(description)}`);
  titles.set(title, route);
  descriptions.set(description, route);

  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    const href = match[1];
    assert.ok(href && href !== "#" && !href.startsWith("javascript:"), `${route}: Dummy-Link ${href || "(leer)"}`);
    if (href.startsWith("/")) discoveredInternalLinks.add(new URL(href, baseUrl).pathname);
  }
}

for (const route of routes.filter((route) => route !== "/")) {
  assert.ok(discoveredInternalLinks.has(route), `Orphan Page ohne internen Link: ${route}`);
}

for (const route of ["/ratgeber/", "/impressum/", "/datenschutz/"]) {
  assert.ok(!routes.includes(route), `${route} darf als noindex-Seite nicht in der Sitemap stehen`);
  const response = await fetchLocal(route);
  assert.equal(response.status, 200, `${route} ist nicht erreichbar`);
  assert.match(await response.text(), /<meta name="robots" content="noindex, follow"/i, `${route}: noindex fehlt`);
}

for (const path of discoveredInternalLinks) {
  if (path.startsWith("/_next/") || path === "/favicon.png" || path === "/og.jpg") continue;
  const response = await fetchLocal(path, { redirect: "manual" });
  assert.equal(response.status, 200, `Interner Link ${path} liefert ${response.status}`);
}

for (const [source, target] of Object.entries(redirects)) {
  const response = await fetchLocal(source, { redirect: "manual" });
  assert.equal(response.status, 308, `${source} ist nicht permanent`);
  const location = new URL(response.headers.get("location"), baseUrl);
  assert.equal(location.pathname, target, `${source} zeigt auf ein falsches Ziel`);
  const targetResponse = await fetchLocal(location.pathname, { redirect: "manual" });
  assert.equal(targetResponse.status, 200, `${source} erzeugt eine Redirect-Kette`);
}

const appointmentHtml = await (await fetchLocal("/termin/")).text();
assert.match(appointmentHtml, /https:\/\/www\.planity\.com\/de-DE\/melimedics-55122-mainz/);
assert.match(appointmentHtml, /rel="noreferrer"|rel="noopener noreferrer"/);

const homeHtml = await (await fetchLocal("/")).text();
const transplantHtml = await (await fetchLocal("/behandlungen/haartransplantation/")).text();
const botoxHtml = await (await fetchLocal("/behandlungen/botulinumtoxin/")).text();
assert.match(homeHtml, /"@type":"FAQPage"/);
assert.match(transplantHtml, /"@type":"FAQPage"/);
assert.doesNotMatch(botoxHtml, /"@type":"FAQPage"/);

const headersResponse = await fetchLocal("/");
for (const header of ["content-security-policy", "referrer-policy", "x-content-type-options", "x-frame-options", "permissions-policy"]) {
  assert.ok(headersResponse.headers.get(header), `Security Header fehlt: ${header}`);
}

console.log(`Runtime-Audit erfolgreich: ${routes.length} Seiten, ${discoveredInternalLinks.size} interne Ziele, ${Object.keys(redirects).length} Redirects.`);
