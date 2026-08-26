import "server-only";
import { DisabledAIProvider, GenericJsonAIProvider } from "./provider";

const integer = (value: string | undefined, fallback: number, min: number, max: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= min && parsed <= max ? parsed : fallback;
};

const isSafeEndpoint = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname));
  } catch { return false; }
};

export function getAssistantRuntimeConfig() {
  return {
    enabled: process.env.AI_ENABLED === "true",
    provider: process.env.AI_PROVIDER ?? "",
    endpoint: process.env.AI_BASE_URL ?? "",
    apiKey: process.env.AI_API_KEY ?? "",
    model: process.env.AI_MODEL ?? "",
    maxOutputTokens: integer(process.env.AI_MAX_OUTPUT_TOKENS, 300, 80, 600),
    timeoutMs: integer(process.env.AI_TIMEOUT_MS, 12_000, 1_000, 30_000),
    consultationEnhancerEnabled: process.env.AI_CONSULTATION_ENHANCER_ENABLED === "true",
    rateLimitMax: integer(process.env.AI_RATE_LIMIT_MAX, 12, 1, 100),
    rateLimitWindowMs: integer(process.env.AI_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000, 1000, 86_400_000),
    rateLimitSalt: process.env.AI_RATE_LIMIT_SALT ?? "",
  };
}
export function getAIProvider() {
  const config = getAssistantRuntimeConfig();
  if (!config.enabled || config.provider !== "generic-json" || !config.apiKey || !config.model || !isSafeEndpoint(config.endpoint)) return new DisabledAIProvider();
  return new GenericJsonAIProvider({ endpoint: config.endpoint, apiKey: config.apiKey, model: config.model, timeoutMs: config.timeoutMs });
}
