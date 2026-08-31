import "server-only";
import type { HairConsultation } from "../hair-consultations/core";
import {
  createAutomationService,
  defaultCommunicationTemplates,
  DisabledAutomationScheduler,
  DisabledCommunicationProvider,
  SnapshotConsentVerifier,
  type AutomationAnalytics,
  type AutomationAuditSink,
  type AutomationEvent,
} from "./core";

class DisabledAutomationAnalytics implements AutomationAnalytics {
  emit() { /* Analytics remain disabled until an approved provider exists. */ }
}

class DisabledAutomationAuditSink implements AutomationAuditSink {
  async record() { /* A persistent audit adapter is required before activation. */ }
}

const integer = (value: string | undefined, fallback: number, min: number, max: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
};

export function getAutomationRuntimeConfig() {
  return {
    enabled: process.env.AUTOMATION_ENABLED === "true",
    communicationEnabled: process.env.COMMUNICATION_ENABLED === "true",
    communicationProvider: process.env.COMMUNICATION_PROVIDER ?? "",
    mailFrom: process.env.MAIL_FROM ?? "",
    notificationRecipient: process.env.MELIMEDICS_NOTIFICATION_RECIPIENT ?? "",
    reviewUrl: process.env.REVIEW_URL ?? "",
    maxRetries: integer(process.env.AUTOMATION_MAX_RETRIES, 3, 0, 10),
  };
}

export function getAutomationService() {
  const config = getAutomationRuntimeConfig();
  return createAutomationService({
    scheduler: new DisabledAutomationScheduler(),
    provider: new DisabledCommunicationProvider(),
    templates: defaultCommunicationTemplates,
    analytics: new DisabledAutomationAnalytics(),
    audit: new DisabledAutomationAuditSink(),
    consentVerifier: new SnapshotConsentVerifier(),
    config: {
      enabled: config.enabled,
      communicationEnabled: config.communicationEnabled,
      notificationRecipient: config.notificationRecipient,
      reviewUrl: config.reviewUrl,
      maxRetries: config.maxRetries,
      retryBaseMs: 60_000,
      dueJobLimit: 25,
    },
    now: () => new Date(),
    createId: () => crypto.randomUUID(),
  });
}

export class AutomationConsultationNotifier {
  async notify(input: { consultation: HairConsultation }) {
    const { consultation } = input;
    const contactConsent = consultation.consentRecords.find((record) => record.type === "contact");
    const event: AutomationEvent = {
      id: `consultation:${consultation.id}:submitted`,
      name: "consultation_submitted",
      occurredAt: consultation.createdAt,
      subject: {
        consultationId: consultation.id,
        referenceId: `HC-${consultation.id.slice(0, 8).toUpperCase()}`,
        firstName: consultation.firstName || consultation.contactName.trim().split(/\s+/)[0] || "",
        contactName: consultation.contactName,
        email: consultation.email,
        phone: consultation.phone,
        desiredTimeframe: consultation.desiredTimeframe,
        photoCount: consultation.photoReferences.length,
        consent: {
          serviceContact: contactConsent?.accepted === true,
          marketing: false,
          version: contactConsent?.textVersion ?? "missing",
          recordedAt: contactConsent?.acceptedAt ?? consultation.createdAt,
        },
      },
    };
    const actions = await getAutomationService().handleEvent(event);
    return { delivered: false, scheduled: actions.some((action) => action.status === "scheduled") };
  }
}
