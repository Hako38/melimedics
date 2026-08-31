import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../app/_server/automation/core.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }, fileName: "core.ts" }).outputText;
const core = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

const consent = (overrides = {}) => ({ serviceContact: true, marketing: false, version: "contact-v-test", recordedAt: "2026-08-31T10:00:00.000Z", ...overrides });
const event = (name = "followup_due", overrides = {}) => ({
  id: `event-${name}`,
  name,
  occurredAt: "2026-08-31T10:00:00.000Z",
  subject: {
    consultationId: "consultation-1",
    referenceId: "HC-TEST1234",
    firstName: "Test",
    contactName: "Test Person",
    email: "test@example.com",
    phone: "+49 6131 1234567",
    desiredTimeframe: "1-3 Monate",
    photoCount: 2,
    consent: consent(),
  },
  ...overrides,
});

function harness(options = {}) {
  let now = new Date("2026-08-31T10:00:00.000Z");
  let id = 0;
  const scheduler = new core.InMemoryAutomationScheduler();
  const audit = new core.InMemoryAutomationAuditSink();
  const analytics = { events: [], emit(item) { this.events.push(structuredClone(item)); } };
  const results = [...(options.providerResults ?? [{ ok: true }])];
  const provider = {
    name: options.providerConfigured === false ? "disabled" : "test-mail",
    channel: "email",
    configured: options.providerConfigured !== false,
    calls: [],
    async send(input) {
      this.calls.push(structuredClone(input));
      const next = results.shift() ?? { ok: true };
      if (next === "throw") throw new Error("provider unavailable");
      return next;
    },
  };
  const templates = new Map(core.defaultCommunicationTemplates);
  for (const [templateId, update] of Object.entries(options.templateOverrides ?? {})) {
    templates.set(templateId, { ...templates.get(templateId), ...update });
  }
  const service = core.createAutomationService({
    scheduler,
    provider,
    templates,
    analytics,
    audit,
    consentVerifier: options.consentVerifier ?? new core.SnapshotConsentVerifier(),
    config: {
      enabled: options.enabled ?? true,
      communicationEnabled: options.communicationEnabled ?? true,
      notificationRecipient: options.notificationRecipient ?? "praxis@example.com",
      reviewUrl: options.reviewUrl ?? "",
      maxRetries: options.maxRetries ?? 2,
      retryBaseMs: 60_000,
      dueJobLimit: 25,
    },
    now: () => now,
    createId: () => `job-${++id}`,
  });
  return { service, scheduler, provider, analytics, audit, setNow: (value) => { now = new Date(value); } };
}

test("does not schedule external communication without the appropriate consent", async () => {
  const h = harness();
  const result = await h.service.handleEvent(event("followup_due", { subject: { ...event().subject, consent: consent({ serviceContact: false }) } }));
  assert.deepEqual(result, [{ templateId: "followup_open_consultation", status: "skipped", reason: "missing_consent" }]);
  assert.equal(h.provider.calls.length, 0);
});

test("blocks needs_review and medically unapproved content", async () => {
  const h = harness({ templateOverrides: { appointment_preparation: { approvalStatus: "approved" } } });
  const unapprovedMedical = await h.service.handleEvent(event("appointment_booked", { appointmentDate: "10. September", treatmentName: "PRP", approvedMedicalContent: "Hinweis", medicalContentApprovalStatus: "needs_review" }));
  assert.equal(unapprovedMedical[0].reason, "content_unapproved");
  const unapprovedTemplate = await harness().service.handleEvent(event("treatment_completed", { treatmentName: "PRP", approvedMedicalContent: "Hinweis", medicalContentApprovalStatus: "approved" }));
  assert.equal(unapprovedTemplate[0].reason, "content_unapproved");
});

test("renders and sends an approved plain-text template", async () => {
  const h = harness();
  const scheduled = await h.service.handleEvent(event());
  assert.equal(scheduled[0].status, "scheduled");
  const executed = await h.service.executeDueJobs();
  assert.equal(executed[0].status, "completed");
  assert.match(h.provider.calls[0].text, /keine Diagnose|noch Klärungsbedarf/);
  assert.ok(!("html" in h.provider.calls[0]));
});

test("schedules and executes an idempotent job only once", async () => {
  const h = harness();
  const first = await h.service.handleEvent(event());
  const duplicate = await h.service.handleEvent(event());
  assert.equal(first[0].status, "scheduled");
  assert.equal(duplicate[0].status, "duplicate");
  await h.service.executeDueJobs();
  await h.service.executeDueJobs();
  assert.equal(h.provider.calls.length, 1);
});

test("retries transient failures with backoff and then succeeds", async () => {
  const h = harness({ providerResults: [{ ok: false, code: "transient" }, { ok: true }] });
  const [{ jobId }] = await h.service.handleEvent(event());
  assert.equal((await h.service.executeDueJobs())[0].status, "scheduled");
  let job = await h.scheduler.getById(jobId);
  assert.equal(job.retryCount, 1);
  assert.equal(job.scheduledAt, "2026-08-31T10:01:00.000Z");
  h.setNow("2026-08-31T10:01:00.000Z");
  assert.equal((await h.service.executeDueJobs())[0].status, "completed");
});

test("stops retrying at the configured retry limit", async () => {
  const h = harness({ maxRetries: 1, providerResults: [{ ok: false, code: "transient" }, { ok: false, code: "transient" }] });
  const [{ jobId }] = await h.service.handleEvent(event());
  await h.service.executeDueJobs();
  h.setNow("2026-08-31T10:01:00.000Z");
  assert.equal((await h.service.executeDueJobs())[0].status, "failed");
  const job = await h.scheduler.getById(jobId);
  assert.equal(job.status, "failed");
  assert.equal(job.lastFailureCode, "retry_limit");
});

test("provider failure does not mutate or invalidate the source inquiry event", async () => {
  const h = harness({ providerResults: ["throw"] });
  const sourceEvent = event();
  const snapshot = structuredClone(sourceEvent);
  await h.service.handleEvent(sourceEvent);
  await h.service.executeDueJobs();
  assert.deepEqual(sourceEvent, snapshot);
});

test("analytics contain no contact, health, message or photo data", async () => {
  const h = harness();
  await h.service.handleEvent(event());
  await h.service.executeDueJobs();
  const serialized = JSON.stringify(h.analytics.events);
  for (const sensitive of ["test@example.com", "1234567", "Test Person", "photoCount", "messageText", "healthData"]) assert.doesNotMatch(serialized, new RegExp(sensitive, "i"));
});

test("an open follow-up can be cancelled before execution", async () => {
  const h = harness();
  const [{ jobId }] = await h.service.handleEvent(event());
  assert.equal(await h.service.cancel(jobId), true);
  assert.deepEqual(await h.service.executeDueJobs(), []);
  assert.equal(h.provider.calls.length, 0);
});

test("disabled automation schedules and sends nothing", async () => {
  const h = harness({ enabled: false });
  const result = await h.service.handleEvent(event());
  assert.equal(result[0].reason, "disabled");
  assert.deepEqual(await h.service.executeDueJobs(), []);
  assert.equal(h.provider.calls.length, 0);
});

test("a missing provider produces a blocked status instead of fake success", async () => {
  const h = harness({ providerConfigured: false });
  const [{ jobId }] = await h.service.handleEvent(event());
  assert.equal((await h.service.executeDueJobs())[0].status, "blocked");
  const job = await h.scheduler.getById(jobId);
  assert.equal(job.status, "blocked");
  assert.equal(job.completedAt, null);
  assert.equal(h.provider.calls.length, 0);
  assert.equal(h.analytics.events.some(({ name }) => name === "message_send_success"), false);
});

test("revoked consent is checked again immediately before sending", async () => {
  const h = harness({ consentVerifier: { async canSend() { return false; } } });
  const [{ jobId }] = await h.service.handleEvent(event());
  assert.equal((await h.service.executeDueJobs())[0].status, "blocked");
  assert.equal((await h.scheduler.getById(jobId)).lastFailureCode, "blocked_consent");
  assert.equal(h.provider.calls.length, 0);
});
