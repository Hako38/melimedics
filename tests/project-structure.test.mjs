import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("uses a portable standard Next.js runtime", async () => {
  const [packageJson, nextConfig] = await Promise.all([read("package.json"), read("next.config.ts")]);
  assert.match(packageJson, /"next":/);
  assert.match(packageJson, /"dev": "next dev"/);
  assert.match(nextConfig, /output: "standalone"/);
  assert.doesNotMatch(packageJson, /vinext|cloudflare|wrangler|sites-vite/i);
});

test("contains the complete Phase 1B homepage with verified Google proof", async () => {
  const [homepage, content] = await Promise.all([read("app/page.tsx"), read("app/_data/home.ts")]);
  assert.match(homepage, /Ästhetische Medizin,.*Haut &amp; Haare.*in Mainz/s);
  assert.match(homepage, /Was möchten Sie/);
  assert.match(homepage, /Haare ganzheitlich/);
  assert.match(homepage, /Testimonials items=\{verifiedTestimonials\}/);
  assert.match(content, /verifiedTestimonials: VerifiedTestimonial\[\] = \[\]/);
  assert.match(content, /rating: "5,0"/);
  assert.match(content, /count: 137/);
  assert.match(homepage, /hero-google-rating/);
  assert.doesNotMatch(`${homepage}\n${content}`, /Lorem ipsum|Sarah J\.|Michael T\.|five-star reviews/i);
});

test("uses local, documented images from the existing Melimedics website", async () => {
  const [media, homepage, shell, practice, sources, inventorySource, templateFiles] = await Promise.all([
    read("app/_data/media.ts"),
    read("app/page.tsx"),
    read("app/_components/SiteShell.tsx"),
    read("app/arzt-praxis/page.tsx"),
    read("docs/IMAGE-SOURCES.md"),
    read("docs/LEGACY-ASSET-INVENTORY.json"),
    readdir(new URL("../public/images/legacy/template-demo/", import.meta.url)),
  ]);
  const inventory = JSON.parse(inventorySource);
  assert.equal(inventory.length, 235);
  assert.equal(inventory.filter(({ classification }) => classification === "verified_authentic").length, 26);
  assert.equal(inventory.filter(({ classification }) => classification === "template_demo").length, 209);
  assert.equal(templateFiles.length, 209);
  assert.match(media, /sourceUrl: `https:\/\/\$\{string\}`/);
  assert.match(homepage, /mediaSlots\.homeHero\.src/);
  assert.match(shell, /mediaSlots\.doctorPortrait\.src/);
  assert.match(shell, /interior-art-photo/);
  assert.match(practice, /mediaSlots\.doctorBotulinumtoxin/);
  assert.match(sources, /keine Hotlinks/);
  assert.doesNotMatch(`${homepage}\n${shell}\n${practice}`, /https:\/\/melimedics\.de\/wp-content\/uploads/);
});

test("keeps SEO redirects and legal routes", async () => {
  const [botox, privacy, imprint] = await Promise.all([read("app/botox/page.tsx"), read("app/datenschutz/page.tsx"), read("app/impressum/page.tsx")]);
  assert.match(botox, /permanentRedirect/);
  assert.match(privacy, /Datenschutz/);
  assert.match(imprint, /Impressum/);
});

test("provides the Phase 1C treatment architecture with Planity-verified prices", async () => {
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
  assert.match(data, /priceSourceUrl = "https:\/\/www\.planity\.com/);
  assert.match(data, /price: "400 €"/);
  assert.match(data, /approvalStatus: "approved"/);
  assert.match(hair, /Haarausfall verstehen/);
  assert.match(contact, /postalCode: \{ value: "55122", status: "verified"/);
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
  assert.match(structuredData, /PostalAddress/);
  assert.doesNotMatch(structuredData, /openingHours|aggregateRating|priceRange/);
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
  assert.match(component, /Freiwillige, private Übertragung/);
  assert.match(component, /JPEG oder PNG/);
  assert.match(service, /api\/hair-consultations/);
  assert.doesNotMatch(service, /https?:\/\/|console\./);
  assert.match(analytics, /hair_check_started/);
  assert.match(sitemap, /haare\/haar-check/);
  for (const source of [hair, template, finder]) assert.match(source, /haare\/haar-check/);
  assert.match(status, /hair_check/);
});

test("adds the Phase 3A server-only provider-neutral consultation infrastructure", async () => {
  const [route, core, runtime, filesystem, environment, analytics, component] = await Promise.all([
    read("app/api/hair-consultations/route.ts"),
    read("app/_server/hair-consultations/core.ts"),
    read("app/_server/hair-consultations/runtime.ts"),
    read("app/_server/hair-consultations/filesystem.ts"),
    read(".env.example"),
    read("app/_lib/hair-check-analytics.ts"),
    read("app/_components/HairCheck.tsx"),
  ]);
  assert.match(route, /runtime = "nodejs"/);
  assert.match(route, /multipart\/form-data/);
  assert.match(route, /content-length/);
  assert.match(route, /origin_rejected/);
  assert.match(route, /checkConsultationRateLimit/);
  assert.doesNotMatch(route, /console\.|searchParams|params\./);
  for (const name of ["createConsultation", "getConsultationById", "updateConsultationStatus", "deleteConsultation", "attachPhoto", "deletePhoto"]) assert.match(core, new RegExp(name));
  assert.match(core, /PrivateFileStorage/);
  assert.match(core, /ConsultationNotifier/);
  assert.match(core, /FileContentScanner/);
  assert.doesNotMatch(core, /diagnosis|graft/i);
  assert.match(runtime, /import "server-only"/);
  assert.match(filesystem, /mode: 0o700/);
  assert.match(filesystem, /mode: 0o600/);
  assert.match(filesystem, /randomUUID/);
  for (const key of ["STORAGE_PROVIDER", "CONSULTATION_REPOSITORY", "MAIL_PROVIDER", "MAIL_FROM", "CONSULTATION_RECIPIENT", "RETENTION_DAYS", "RATE_LIMIT_MAX"]) assert.match(environment, new RegExp(key));
  assert.doesNotMatch(environment, /sk-[A-Za-z0-9]|password\s*=\s*\S+/i);
  assert.match(component, /submissionReference/);
  assert.match(component, /keine medizinische Bewertung/);
  assert.doesNotMatch(analytics, /email|phone|contactName|affectedAreas|message/);
});

test("adds the Phase 3B approval-gated public assistant without exposing internal consultation AI", async () => {
  const [layout, loader, component, route, core, knowledge, provider, runtime, summary, analytics, environment] = await Promise.all([
    read("app/layout.tsx"),
    read("app/_components/AssistantLoader.tsx"),
    read("app/_components/PracticeAssistant.tsx"),
    read("app/api/assistant/route.ts"),
    read("app/_server/assistant/core.ts"),
    read("app/_server/assistant/knowledge-base.ts"),
    read("app/_server/assistant/provider.ts"),
    read("app/_server/assistant/runtime.ts"),
    read("app/_server/assistant/consultation-summary.ts"),
    read("app/_lib/assistant-analytics.ts"),
    read(".env.example"),
  ]);
  assert.match(layout, /AssistantLoader/);
  assert.match(loader, /dynamic\(/);
  assert.match(loader, /ssr: false/);
  assert.doesNotMatch(component, /localStorage|sessionStorage|sendBeacon|console\./);
  assert.match(component, /Keine Diagnose/);
  assert.match(route, /runtime = "nodejs"/);
  assert.match(route, /origin_rejected/);
  assert.match(route, /checkConsultationRateLimit/);
  assert.doesNotMatch(route, /console\.|searchParams|patient/);
  for (const name of ["generateAssistantResponse", "classifyInquiry", "summarizeConsultation"]) assert.match(core, new RegExp(name));
  assert.match(core, /medicalApprovalStatus === "approved"/);
  assert.match(core, /evaluateGuardrails/);
  assert.match(knowledge, /treatment\.assistantApprovalStatus/);
  assert.match(knowledge, /item\.approvalStatus/);
  assert.match(provider, /GenericJsonAIProvider/);
  assert.match(runtime, /import "server-only"/);
  assert.match(runtime, /AI_CONSULTATION_ENHANCER_ENABLED/);
  assert.match(summary, /summarizeHairConsultationLocally/);
  assert.doesNotMatch(summary, /contactName|record\.email|record\.phone|photo\.bytes/);
  assert.doesNotMatch(analytics, /email|phone|message|medical|content|payload|text/i);
  for (const event of ["assistant_opened", "assistant_closed", "assistant_question_submitted", "assistant_answer_received", "assistant_fallback", "assistant_cta_clicked"]) assert.match(analytics, new RegExp(event));
  for (const key of ["AI_ENABLED", "AI_PROVIDER", "AI_BASE_URL", "AI_MODEL", "AI_API_KEY", "AI_MAX_OUTPUT_TOKENS"]) assert.match(environment, new RegExp(key));
  assert.doesNotMatch(environment, /sk-[A-Za-z0-9]|AI_API_KEY=\S+/);
  const apiFiles = await readdir(new URL("../app/api/", import.meta.url), { recursive: true });
  assert.ok(!apiFiles.some((file) => /summary|consultation-ai|internal-ai/i.test(file)));
});

test("adds the Phase 3C provider-neutral and approval-gated automation architecture", async () => {
  const [core, runtime, analytics, environment, operations] = await Promise.all([
    read("app/_server/automation/core.ts"),
    read("app/_server/automation/runtime.ts"),
    read("app/_lib/automation-analytics.ts"),
    read(".env.example"),
    read("docs/PHASE-3C-OPERATIONS.md"),
  ]);
  for (const event of ["consultation_submitted", "consultation_contacted", "appointment_booked", "appointment_upcoming", "treatment_completed", "followup_due", "review_request_due"]) assert.match(core, new RegExp(event));
  for (const template of ["consultation_received", "internal_new_consultation", "appointment_preparation", "followup_open_consultation", "treatment_aftercare", "control_reminder", "review_request"]) assert.match(core, new RegExp(template));
  for (const method of ["schedule", "cancel", "executeDueJobs", "markCompleted", "markFailed"]) assert.match(core, new RegExp(method));
  assert.match(core, /idempotencyKey/);
  assert.match(core, /approvalStatus !== "approved"/);
  assert.match(runtime, /DisabledCommunicationProvider/);
  assert.match(runtime, /marketing: false/);
  assert.doesNotMatch(analytics, /\b(email|phone|contactName|healthData|messageText|photoData)\s*:/i);
  for (const key of ["COMMUNICATION_ENABLED", "COMMUNICATION_PROVIDER", "MAIL_FROM", "MELIMEDICS_NOTIFICATION_RECIPIENT", "AUTOMATION_ENABLED", "AUTOMATION_MAX_RETRIES", "REVIEW_URL"]) assert.match(environment, new RegExp(key));
  assert.match(operations, /IONOS/);
  assert.match(operations, /Cron/);
  assert.match(operations, /persistente/);
});
