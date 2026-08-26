export type AssistantAnalyticsEvent =
  | { name: "assistant_opened" }
  | { name: "assistant_closed" }
  | { name: "assistant_question_submitted" }
  | { name: "assistant_answer_received"; mode: "provider" | "fallback" | "guardrail" }
  | { name: "assistant_fallback"; code: string }
  | { name: "assistant_cta_clicked"; target: string };

type AssistantAnalyticsAdapter = (event: AssistantAnalyticsEvent) => void;
let adapter: AssistantAnalyticsAdapter = () => undefined;

export const setAssistantAnalyticsAdapter = (nextAdapter: AssistantAnalyticsAdapter) => { adapter = nextAdapter; };
export const emitAssistantEvent = (event: AssistantAnalyticsEvent) => adapter(event);
