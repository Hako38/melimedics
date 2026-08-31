export type PublicAutomationAnalyticsEvent =
  | { name: "automation_scheduled"; automation: string }
  | { name: "automation_cancelled"; automation: string }
  | { name: "message_send_success"; provider: string }
  | { name: "message_send_failed"; provider: string; code: string }
  | { name: "followup_triggered" }
  | { name: "review_request_triggered" };

/**
 * Deliberately disabled adapter. Its schema excludes contact data, health data,
 * communication bodies and uploaded-file metadata.
 */
export function emitAutomationEvent(event: PublicAutomationAnalyticsEvent): void {
  void event;
}
