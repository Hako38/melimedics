import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

Object.defineProperty(globalThis, "crypto", { value: webcrypto, configurable: true });

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const importTs = async (source, fileName) => {
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }, fileName }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
};

const dataSource = await read("app/_data/hair-check.ts");
const data = await importTs(dataSource.replace(/import type[^;]+;/, ""), "hair-check.ts");
globalThis.__hairCheckData = data;

const validationSource = (await read("app/_lib/hair-check-validation.ts")).replace(
  /import \{[\s\S]*?\} from "\.\.\/_data\/hair-check";/,
  "const { HAIR_CHECK_ACCEPTED_TYPES, HAIR_CHECK_MAX_FILE_SIZE, HAIR_CHECK_MAX_MESSAGE_LENGTH, HAIR_CHECK_MAX_NOTE_LENGTH } = globalThis.__hairCheckData;",
);
const validation = await importTs(validationSource, "hair-check-validation.ts");
globalThis.__hairCheckValidation = validation;

const submissionSource = (await read("app/_lib/hair-check-submission.ts"))
  .replace(/import type[^;]+;/, "")
  .replace(/import \{ validateCompleteHairCheck \}[^;]+;/, "const { validateCompleteHairCheck } = globalThis.__hairCheckValidation;");
const submission = await importTs(submissionSource, "hair-check-submission.ts");

const validAnswers = () => ({
  ...data.initialHairCheckAnswers,
  ageRange: "30-39",
  duration: "1-3-years",
  concernAreas: ["hairline"],
  progression: "slowly-years",
  ongoingLoss: "yes",
  previousTreatments: ["none"],
  interest: ["consultation"],
  timeframe: "later",
  firstName: "Test",
  lastName: "Person",
  email: "test@example.com",
  phone: "+49 6131 1234567",
  consent: true,
});

test("A: validates a complete hair check without photos", () => {
  assert.deepEqual(validation.validateCompleteHairCheck(validAnswers()), {});
});

test("B/F/G: photo validation accepts JPEG/PNG and rejects large or executable files", () => {
  assert.equal(validation.validateHairPhoto({ name: "front.jpg", type: "image/jpeg", size: 1024 }), null);
  assert.equal(validation.validateHairPhoto({ name: "front.png", type: "image/png", size: 1024 }), null);
  assert.match(validation.validateHairPhoto({ name: "large.jpg", type: "image/jpeg", size: data.HAIR_CHECK_MAX_FILE_SIZE + 1 }), /größer als 5 MB/);
  assert.match(validation.validateHairPhoto({ name: "payload.exe", type: "application/x-msdownload", size: 1024 }), /JPEG- oder PNG/);
});

test("D/E: returns calm field errors for invalid contact and missing consent", () => {
  const errors = validation.validateHairCheckStep("contact", { ...validAnswers(), email: "invalid", phone: "12", consent: false });
  assert.match(errors.email, /gültige E-Mail/);
  assert.match(errors.phone, /Telefonnummer/);
  assert.match(errors.consent, /Einwilligung/);
});

test("E: separate photo consent is required only when a photo exists", () => {
  const withoutPhotos = validAnswers();
  assert.equal(validation.validateHairCheckStep("contact", withoutPhotos).photoConsent, undefined);
  const withPhotos = { ...withoutPhotos, photos: { front: { slotId: "front", file: {}, previewUrl: "blob:test" } }, photoConsent: false };
  assert.match(validation.validateHairCheckStep("contact", withPhotos).photoConsent, /separate Zustimmung/);
});

test("I: default submission remains safely unavailable and does not fake success", async () => {
  const result = await submission.submitHairConsultation(validAnswers());
  assert.deepEqual(result.ok, false);
  assert.equal(result.code, "secure_backend_unavailable");
  assert.match(result.message, /nicht gesendet/);
});

test("J: provider-neutral service supports a successful approved transport adapter", async () => {
  const result = await submission.submitHairConsultation(validAnswers(), async (prepared) => {
    assert.equal(prepared.submissionStatus, "ready_for_secure_backend");
    assert.equal(prepared.email, "test@example.com");
    return { submissionId: "approved-test-id" };
  });
  assert.deepEqual(result, { ok: true, submissionId: "approved-test-id" });
});

test("C/H/K/L: UI includes navigation, review, responsive and accessible upload states", async () => {
  const [component, css] = await Promise.all([read("app/_components/HairCheck.tsx"), read("app/globals.css")]);
  assert.match(component, /Zurück/);
  assert.match(component, /Angaben.*Ändern|Ändern/s);
  assert.match(component, /Beratungsanfrage senden/);
  assert.match(component, /type="file"/);
  assert.match(component, /aria-label=\{`\$\{slot\.label\}: Foto auswählen`\}/);
  assert.match(component, /headingRef\.current\?\.focus/);
  assert.match(css, /@media \(max-width: 48rem\)[\s\S]*\.hair-photo-grid/);
  assert.match(css, /prefers-reduced-motion/);
});

test("privacy boundary excludes persistence, network submission and medical analytics payloads", async () => {
  const [component, service, analytics] = await Promise.all([
    read("app/_components/HairCheck.tsx"), read("app/_lib/hair-check-submission.ts"), read("app/_lib/hair-check-analytics.ts"),
  ]);
  assert.doesNotMatch(`${component}\n${service}`, /localStorage|sessionStorage|indexedDB/);
  assert.doesNotMatch(service, /fetch\(|XMLHttpRequest|sendBeacon|console\./);
  assert.doesNotMatch(analytics, /concern|email|phone|message|photoName|File/);
  for (const event of ["hair_check_started", "hair_check_step_completed", "hair_photo_added", "hair_check_completed", "hair_consultation_submitted", "hair_booking_clicked"]) assert.match(analytics, new RegExp(event));
});
