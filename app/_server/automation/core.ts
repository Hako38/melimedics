export type AutomationEventName =
  | "consultation_submitted"
  | "consultation_contacted"
  | "appointment_booked"
  | "appointment_upcoming"
  | "treatment_completed"
  | "followup_due"
  | "review_request_due";

export type AutomationTemplateId =
  | "consultation_received"
  | "internal_new_consultation"
  | "appointment_preparation"
  | "followup_open_consultation"
  | "treatment_aftercare"
  | "control_reminder"
  | "review_request";

export type ApprovalStatus = "approved" | "needs_review" | "missing";
export type CommunicationChannel = "email";
export type CommunicationPurpose = "service" | "marketing" | "internal";
export type AutomationJobStatus = "scheduled" | "processing" | "completed" | "failed" | "cancelled" | "blocked";

export type ConsentSnapshot = {
  serviceContact: boolean;
  marketing: boolean;
  version: string;
  recordedAt: string;
};

export type TemplateVariables = {
  firstName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  appointmentDate?: string;
  treatmentName?: string;
  bookingLink?: string;
  referenceId?: string;
  desiredTimeframe?: string;
  photosPresent?: string;
  reviewUrl?: string;
  approvedMedicalContent?: string;
};

export type CommunicationTemplate = {
  id: AutomationTemplateId;
  version: string;
  approvalStatus: ApprovalStatus;
  purpose: CommunicationPurpose;
  subject: string;
  text: string;
  requiredVariables: (keyof TemplateVariables)[];
};

export type AutomationSubject = {
  consultationId: string;
  referenceId: string;
  firstName: string;
  contactName: string;
  email?: string;
  phone?: string;
  desiredTimeframe?: string;
  photoCount?: number;
  consent: ConsentSnapshot;
};

export type AutomationEvent = {
  id: string;
  name: AutomationEventName;
  occurredAt: string;
  scheduledFor?: string;
  subject: AutomationSubject;
  treatmentName?: string;
  appointmentDate?: string;
  bookingLink?: string;
  approvedMedicalContent?: string;
  medicalContentApprovalStatus?: ApprovalStatus;
};

export type AutomationJob = {
  id: string;
  eventId: string;
  eventName: AutomationEventName;
  automation: AutomationTemplateId;
  templateId: AutomationTemplateId;
  templateVersion: string;
  channel: CommunicationChannel;
  purpose: CommunicationPurpose;
  provider: string;
  recipient: string;
  recipientKind: "patient" | "internal";
  variables: TemplateVariables;
  consent: ConsentSnapshot;
  status: AutomationJobStatus;
  scheduledAt: string;
  idempotencyKey: string;
  retryCount: number;
  maxRetries: number;
  completedAt: string | null;
  lastFailureCode: string | null;
};

export type RenderedCommunication = {
  subject: string;
  text: string;
};

export type CommunicationSendResult =
  | { ok: true; providerMessageId?: string }
  | { ok: false; code: "transient" | "permanent" | "unavailable" };

export interface CommunicationProvider {
  readonly name: string;
  readonly channel: CommunicationChannel;
  readonly configured: boolean;
  send(input: {
    recipient: string;
    subject: string;
    text: string;
    idempotencyKey: string;
  }): Promise<CommunicationSendResult>;
}

export interface AutomationScheduler {
  readonly configured: boolean;
  schedule(job: AutomationJob): Promise<{ created: boolean; job: AutomationJob }>;
  cancel(jobId: string, cancelledAt: string): Promise<AutomationJob | null>;
  executeDueJobs(now: string, limit: number): Promise<AutomationJob[]>;
  markCompleted(jobId: string, completedAt: string): Promise<void>;
  markFailed(input: {
    jobId: string;
    failedAt: string;
    failureCode: string;
    retryAt: string | null;
    terminal: boolean;
  }): Promise<void>;
  getById(jobId: string): Promise<AutomationJob | null>;
}

export type AutomationAnalyticsEvent =
  | { name: "automation_scheduled"; automation: AutomationTemplateId }
  | { name: "automation_cancelled"; automation: AutomationTemplateId }
  | { name: "message_send_success"; automation: AutomationTemplateId; provider: string }
  | { name: "message_send_failed"; automation: AutomationTemplateId; provider: string; code: string }
  | { name: "followup_triggered" }
  | { name: "review_request_triggered" };

export interface AutomationAnalytics {
  emit(event: AutomationAnalyticsEvent): void;
}

export type AutomationAuditEntry = {
  eventId: string;
  eventName: AutomationEventName;
  automation: AutomationTemplateId;
  occurredAt: string;
  status: AutomationJobStatus | "skipped";
  templateVersion: string;
  provider: string;
  failureCode?: string;
};

export interface AutomationAuditSink {
  record(entry: AutomationAuditEntry): Promise<void>;
}

export interface ConsentVerifier {
  canSend(job: AutomationJob): Promise<boolean>;
}

export type AutomationServiceConfig = {
  enabled: boolean;
  communicationEnabled: boolean;
  notificationRecipient: string;
  reviewUrl: string;
  maxRetries: number;
  retryBaseMs: number;
  dueJobLimit: number;
};

export type AutomationDependencies = {
  scheduler: AutomationScheduler;
  provider: CommunicationProvider;
  templates: ReadonlyMap<AutomationTemplateId, CommunicationTemplate>;
  analytics: AutomationAnalytics;
  audit: AutomationAuditSink;
  consentVerifier: ConsentVerifier;
  config: AutomationServiceConfig;
  now: () => Date;
  createId: () => string;
};

export type AutomationActionResult = {
  templateId: AutomationTemplateId;
  status: "scheduled" | "duplicate" | "skipped";
  reason?: "disabled" | "scheduler_unavailable" | "missing_recipient" | "missing_consent" | "content_unapproved" | "missing_configuration";
  jobId?: string;
};

const templates: CommunicationTemplate[] = [
  {
    id: "consultation_received",
    version: "2026-08-31.1",
    approvalStatus: "approved",
    purpose: "service",
    subject: "Ihre Anfrage bei Melimedics",
    text: "Guten Tag {{firstName}},\n\nvielen Dank für Ihre Anfrage. Ihre Angaben sind bei Melimedics eingegangen und werden geprüft. Dies ist noch keine medizinische Bewertung. Die weitere Kontaktaufnahme erfolgt separat.\n\nIhr Melimedics-Team",
    requiredVariables: ["firstName"],
  },
  {
    id: "internal_new_consultation",
    version: "2026-08-31.1",
    approvalStatus: "approved",
    purpose: "internal",
    subject: "Neue Haar-Check-Anfrage {{referenceId}}",
    text: "Neue Anfrage\n\nReferenz: {{referenceId}}\nName: {{contactName}}\nE-Mail: {{email}}\nTelefon: {{phone}}\nKategorie: Haar-Check\nGewünschter Zeitraum: {{desiredTimeframe}}\nFotos vorhanden: {{photosPresent}}\n\nDie Angaben sind intern ärztlich zu prüfen. Es wurde keine Diagnose oder Eignungsbewertung erstellt.",
    requiredVariables: ["referenceId", "contactName", "email", "phone", "desiredTimeframe", "photosPresent"],
  },
  {
    id: "appointment_preparation",
    version: "2026-08-31.1",
    approvalStatus: "needs_review",
    purpose: "service",
    subject: "Vorbereitung auf Ihren Termin bei Melimedics",
    text: "Guten Tag {{firstName}},\n\nfür Ihren Termin am {{appointmentDate}} zur Leistung {{treatmentName}} beachten Sie bitte folgende ärztlich freigegebene Hinweise:\n\n{{approvedMedicalContent}}\n\nIhr Melimedics-Team",
    requiredVariables: ["firstName", "appointmentDate", "treatmentName", "approvedMedicalContent"],
  },
  {
    id: "followup_open_consultation",
    version: "2026-08-31.1",
    approvalStatus: "approved",
    purpose: "service",
    subject: "Ihre offene Anfrage bei Melimedics",
    text: "Guten Tag {{firstName}},\n\nwir möchten freundlich nachfragen, ob zu Ihrer Anfrage {{referenceId}} noch Klärungsbedarf besteht. Sie können uns bei Fragen jederzeit über die bekannten Kontaktwege erreichen.\n\nIhr Melimedics-Team",
    requiredVariables: ["firstName", "referenceId"],
  },
  {
    id: "treatment_aftercare",
    version: "2026-08-31.1",
    approvalStatus: "needs_review",
    purpose: "service",
    subject: "Hinweise nach Ihrer Behandlung bei Melimedics",
    text: "Guten Tag {{firstName}},\n\nbitte beachten Sie die folgenden ärztlich freigegebenen Nachsorgehinweise zu {{treatmentName}}:\n\n{{approvedMedicalContent}}\n\nBei Rückfragen wenden Sie sich bitte direkt an die Praxis.\n\nIhr Melimedics-Team",
    requiredVariables: ["firstName", "treatmentName", "approvedMedicalContent"],
  },
  {
    id: "control_reminder",
    version: "2026-08-31.1",
    approvalStatus: "needs_review",
    purpose: "service",
    subject: "Erinnerung an Ihren Kontrolltermin bei Melimedics",
    text: "Guten Tag {{firstName}},\n\ndies ist eine Erinnerung an Ihren abgestimmten Kontrolltermin am {{appointmentDate}} zur Leistung {{treatmentName}}.\n\nIhr Melimedics-Team",
    requiredVariables: ["firstName", "appointmentDate", "treatmentName"],
  },
  {
    id: "review_request",
    version: "2026-08-31.1",
    approvalStatus: "needs_review",
    purpose: "marketing",
    subject: "Ihre Rückmeldung an Melimedics",
    text: "Guten Tag {{firstName}},\n\nwir freuen uns über eine ehrliche Rückmeldung zu Ihrem Besuch bei Melimedics. Die Bewertungsmöglichkeit ist für alle Patientinnen und Patienten gleich: {{reviewUrl}}\n\nVielen Dank.\nIhr Melimedics-Team",
    requiredVariables: ["firstName", "reviewUrl"],
  },
];

export const defaultCommunicationTemplates = new Map(templates.map((template) => [template.id, template]));

const compactTextValue = (value: string) => value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();

export function renderCommunicationTemplate(template: CommunicationTemplate, variables: TemplateVariables): RenderedCommunication | null {
  if (template.approvalStatus !== "approved") return null;
  if (template.requiredVariables.some((key) => typeof variables[key] !== "string" || compactTextValue(variables[key] as string).length === 0)) return null;
  const interpolate = (input: string) => input.replace(/\{\{([a-zA-Z]+)\}\}/g, (_match, key: keyof TemplateVariables) => compactTextValue(String(variables[key] ?? "")));
  return { subject: interpolate(template.subject), text: interpolate(template.text) };
}

export class DisabledCommunicationProvider implements CommunicationProvider {
  readonly name = "disabled";
  readonly channel = "email" as const;
  readonly configured = false;
  async send(): Promise<CommunicationSendResult> { return { ok: false, code: "unavailable" }; }
}

export class DisabledAutomationScheduler implements AutomationScheduler {
  readonly configured = false;
  async schedule(job: AutomationJob) { return { created: false, job }; }
  async cancel() { return null; }
  async executeDueJobs() { return []; }
  async markCompleted() { /* disabled */ }
  async markFailed() { /* disabled */ }
  async getById() { return null; }
}

export class InMemoryAutomationScheduler implements AutomationScheduler {
  readonly configured = true;
  private readonly jobs = new Map<string, AutomationJob>();
  private readonly idempotencyIndex = new Map<string, string>();

  async schedule(job: AutomationJob) {
    const existingId = this.idempotencyIndex.get(job.idempotencyKey);
    const existing = existingId ? this.jobs.get(existingId) : undefined;
    if (existing) return { created: false, job: structuredClone(existing) };
    this.jobs.set(job.id, structuredClone(job));
    this.idempotencyIndex.set(job.idempotencyKey, job.id);
    return { created: true, job: structuredClone(job) };
  }

  async cancel(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job || ["completed", "cancelled"].includes(job.status)) return null;
    const cancelled = { ...job, status: "cancelled" as const };
    this.jobs.set(jobId, cancelled);
    return structuredClone(cancelled);
  }

  async executeDueJobs(now: string, limit: number) {
    const due = [...this.jobs.values()]
      .filter((job) => job.status === "scheduled" && job.scheduledAt <= now)
      .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
      .slice(0, Math.max(0, limit));
    for (const job of due) this.jobs.set(job.id, { ...job, status: "processing" });
    return due.map((job) => structuredClone({ ...job, status: "processing" as const }));
  }

  async markCompleted(jobId: string, completedAt: string) {
    const job = this.jobs.get(jobId);
    if (job) this.jobs.set(jobId, { ...job, status: "completed", completedAt, lastFailureCode: null });
  }

  async markFailed(input: { jobId: string; failedAt: string; failureCode: string; retryAt: string | null; terminal: boolean }) {
    const job = this.jobs.get(input.jobId);
    if (!job) return;
    this.jobs.set(input.jobId, {
      ...job,
      status: input.terminal ? (input.failureCode.startsWith("blocked_") ? "blocked" : "failed") : "scheduled",
      scheduledAt: input.retryAt ?? job.scheduledAt,
      retryCount: job.retryCount + 1,
      lastFailureCode: input.failureCode,
    });
  }

  async getById(jobId: string) {
    const job = this.jobs.get(jobId);
    return job ? structuredClone(job) : null;
  }
}

export class InMemoryAutomationAuditSink implements AutomationAuditSink {
  readonly entries: AutomationAuditEntry[] = [];
  async record(entry: AutomationAuditEntry) { this.entries.push(structuredClone(entry)); }
}

export class SnapshotConsentVerifier implements ConsentVerifier {
  async canSend(job: AutomationJob) {
    if (job.purpose === "internal") return job.consent.serviceContact;
    if (job.purpose === "service") return job.consent.serviceContact;
    return job.consent.marketing;
  }
}

type PlannedAction = {
  templateId: AutomationTemplateId;
  recipientKind: "patient" | "internal";
};

const actionsByEvent: Record<AutomationEventName, PlannedAction[]> = {
  consultation_submitted: [
    { templateId: "consultation_received", recipientKind: "patient" },
    { templateId: "internal_new_consultation", recipientKind: "internal" },
  ],
  consultation_contacted: [],
  appointment_booked: [{ templateId: "appointment_preparation", recipientKind: "patient" }],
  appointment_upcoming: [{ templateId: "control_reminder", recipientKind: "patient" }],
  treatment_completed: [{ templateId: "treatment_aftercare", recipientKind: "patient" }],
  followup_due: [{ templateId: "followup_open_consultation", recipientKind: "patient" }],
  review_request_due: [{ templateId: "review_request", recipientKind: "patient" }],
};

const requiresMedicalApproval = new Set<AutomationTemplateId>(["appointment_preparation", "treatment_aftercare", "control_reminder"]);

const hasConsentForPurpose = (purpose: CommunicationPurpose, consent: ConsentSnapshot) => purpose === "marketing" ? consent.marketing : consent.serviceContact;

export function createAutomationService(deps: AutomationDependencies) {
  const recordSkipped = async (event: AutomationEvent, template: CommunicationTemplate, reason: AutomationActionResult["reason"]) => {
    await deps.audit.record({
      eventId: event.id,
      eventName: event.name,
      automation: template.id,
      occurredAt: deps.now().toISOString(),
      status: "skipped",
      templateVersion: template.version,
      provider: deps.provider.name,
      failureCode: reason,
    });
  };

  const buildVariables = (event: AutomationEvent): TemplateVariables => ({
    firstName: event.subject.firstName,
    contactName: event.subject.contactName,
    email: event.subject.email,
    phone: event.subject.phone,
    appointmentDate: event.appointmentDate,
    treatmentName: event.treatmentName,
    bookingLink: event.bookingLink,
    referenceId: event.subject.referenceId,
    desiredTimeframe: event.subject.desiredTimeframe,
    photosPresent: (event.subject.photoCount ?? 0) > 0 ? "ja" : "nein",
    reviewUrl: deps.config.reviewUrl || undefined,
    approvedMedicalContent: event.approvedMedicalContent,
  });

  const handleEvent = async (event: AutomationEvent): Promise<AutomationActionResult[]> => {
    const actions = actionsByEvent[event.name];
    const results: AutomationActionResult[] = [];
    for (const action of actions) {
      const template = deps.templates.get(action.templateId);
      if (!template) continue;
      const skip = async (reason: NonNullable<AutomationActionResult["reason"]>) => {
        await recordSkipped(event, template, reason);
        results.push({ templateId: template.id, status: "skipped", reason });
      };
      if (!deps.config.enabled || !deps.config.communicationEnabled) { await skip("disabled"); continue; }
      if (!deps.scheduler.configured) { await skip("scheduler_unavailable"); continue; }
      if (template.approvalStatus !== "approved") { await skip("content_unapproved"); continue; }
      if (requiresMedicalApproval.has(template.id) && (event.medicalContentApprovalStatus !== "approved" || !event.approvedMedicalContent)) { await skip("content_unapproved"); continue; }
      if (!hasConsentForPurpose(template.purpose, event.subject.consent)) { await skip("missing_consent"); continue; }
      const recipient = action.recipientKind === "internal" ? deps.config.notificationRecipient : event.subject.email;
      if (!recipient) { await skip("missing_recipient"); continue; }
      if (template.id === "review_request" && !deps.config.reviewUrl) { await skip("missing_configuration"); continue; }
      const variables = buildVariables(event);
      if (!renderCommunicationTemplate(template, variables)) { await skip("missing_configuration"); continue; }
      const idempotencyKey = `${event.id}:${template.id}:${action.recipientKind}`;
      const job: AutomationJob = {
        id: deps.createId(),
        eventId: event.id,
        eventName: event.name,
        automation: template.id,
        templateId: template.id,
        templateVersion: template.version,
        channel: deps.provider.channel,
        purpose: template.purpose,
        provider: deps.provider.name,
        recipient,
        recipientKind: action.recipientKind,
        variables,
        consent: event.subject.consent,
        status: "scheduled",
        scheduledAt: event.scheduledFor ?? event.occurredAt,
        idempotencyKey,
        retryCount: 0,
        maxRetries: deps.config.maxRetries,
        completedAt: null,
        lastFailureCode: null,
      };
      const scheduled = await deps.scheduler.schedule(job);
      if (scheduled.created) {
        deps.analytics.emit({ name: "automation_scheduled", automation: template.id });
        await deps.audit.record({ eventId: event.id, eventName: event.name, automation: template.id, occurredAt: deps.now().toISOString(), status: "scheduled", templateVersion: template.version, provider: deps.provider.name });
        results.push({ templateId: template.id, status: "scheduled", jobId: scheduled.job.id });
      } else {
        results.push({ templateId: template.id, status: "duplicate", jobId: scheduled.job.id });
      }
    }
    return results;
  };

  const executeDueJobs = async () => {
    if (!deps.config.enabled || !deps.config.communicationEnabled || !deps.scheduler.configured) return [];
    const now = deps.now();
    const jobs = await deps.scheduler.executeDueJobs(now.toISOString(), deps.config.dueJobLimit);
    const results: { jobId: string; status: AutomationJobStatus }[] = [];
    for (const job of jobs) {
      const template = deps.templates.get(job.templateId);
      const consentGranted = await deps.consentVerifier.canSend(job);
      const rendered = template ? renderCommunicationTemplate(template, job.variables) : null;
      if (!template || !rendered || !consentGranted || !deps.provider.configured) {
        const code = !template || !rendered ? "blocked_template" : !consentGranted ? "blocked_consent" : "blocked_provider";
        await deps.scheduler.markFailed({ jobId: job.id, failedAt: now.toISOString(), failureCode: code, retryAt: null, terminal: true });
        deps.analytics.emit({ name: "message_send_failed", automation: job.automation, provider: deps.provider.name, code });
        await deps.audit.record({ eventId: job.eventId, eventName: job.eventName, automation: job.automation, occurredAt: now.toISOString(), status: "blocked", templateVersion: job.templateVersion, provider: deps.provider.name, failureCode: code });
        results.push({ jobId: job.id, status: "blocked" });
        continue;
      }
      let sendResult: CommunicationSendResult;
      try { sendResult = await deps.provider.send({ recipient: job.recipient, ...rendered, idempotencyKey: job.idempotencyKey }); }
      catch { sendResult = { ok: false, code: "transient" }; }
      if (sendResult.ok) {
        await deps.scheduler.markCompleted(job.id, now.toISOString());
        deps.analytics.emit({ name: "message_send_success", automation: job.automation, provider: deps.provider.name });
        if (job.automation === "followup_open_consultation") deps.analytics.emit({ name: "followup_triggered" });
        if (job.automation === "review_request") deps.analytics.emit({ name: "review_request_triggered" });
        await deps.audit.record({ eventId: job.eventId, eventName: job.eventName, automation: job.automation, occurredAt: now.toISOString(), status: "completed", templateVersion: job.templateVersion, provider: deps.provider.name });
        results.push({ jobId: job.id, status: "completed" });
        continue;
      }
      const nextRetry = job.retryCount + 1;
      const terminal = sendResult.code !== "transient" || nextRetry > job.maxRetries;
      const retryAt = terminal ? null : new Date(now.getTime() + deps.config.retryBaseMs * 2 ** job.retryCount).toISOString();
      const failureCode = terminal && nextRetry > job.maxRetries ? "retry_limit" : `provider_${sendResult.code}`;
      await deps.scheduler.markFailed({ jobId: job.id, failedAt: now.toISOString(), failureCode, retryAt, terminal });
      deps.analytics.emit({ name: "message_send_failed", automation: job.automation, provider: deps.provider.name, code: failureCode });
      await deps.audit.record({ eventId: job.eventId, eventName: job.eventName, automation: job.automation, occurredAt: now.toISOString(), status: terminal ? "failed" : "scheduled", templateVersion: job.templateVersion, provider: deps.provider.name, failureCode });
      results.push({ jobId: job.id, status: terminal ? "failed" : "scheduled" });
    }
    return results;
  };

  const cancel = async (jobId: string) => {
    const cancelled = await deps.scheduler.cancel(jobId, deps.now().toISOString());
    if (!cancelled) return false;
    deps.analytics.emit({ name: "automation_cancelled", automation: cancelled.automation });
    await deps.audit.record({ eventId: cancelled.eventId, eventName: cancelled.eventName, automation: cancelled.automation, occurredAt: deps.now().toISOString(), status: "cancelled", templateVersion: cancelled.templateVersion, provider: deps.provider.name });
    return true;
  };

  return { handleEvent, executeDueJobs, cancel };
}
