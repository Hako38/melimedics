import "server-only";
import { getAutomationService } from "./runtime";

/**
 * Provider-neutral entry point for a future IONOS cron process or worker.
 * The current disabled adapters make this a safe no-op until persistence,
 * audit storage and a communication provider have been approved.
 */
export async function runDueAutomationJobs() {
  return getAutomationService().executeDueJobs();
}
