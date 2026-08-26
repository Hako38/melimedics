import { NextResponse } from "next/server";
import { answerPublicAssistant, type ConversationTurn } from "../../_server/assistant/core";
import { melimedicsKnowledgeBase } from "../../_server/assistant/knowledge-base";
import { getAIProvider, getAssistantRuntimeConfig } from "../../_server/assistant/runtime";
import { checkConsultationRateLimit } from "../../_server/hair-consultations/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function parseRequest(value: unknown): { message: string; history: ConversationTurn[] } | null {
  if (!isRecord(value) || Object.keys(value).some((key) => !["message", "history", "website"].includes(key))) return null;
  if (typeof value.website === "string" && value.website.length > 0) return null;
  if (typeof value.message !== "string" || value.message.trim().length < 2 || value.message.trim().length > 600) return null;
  if (value.history !== undefined && !Array.isArray(value.history)) return null;
  const rawHistory = Array.isArray(value.history) ? value.history : [];
  if (rawHistory.length > 6) return null;
  const history: ConversationTurn[] = [];
  for (const turn of rawHistory) {
    if (!isRecord(turn) || (turn.role !== "user" && turn.role !== "assistant") || typeof turn.content !== "string" || turn.content.trim().length === 0 || turn.content.length > 600) return null;
    history.push({ role: turn.role, content: turn.content.trim() });
  }
  return { message: value.message.trim(), history };
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, code: "origin_rejected", message: "Die Anfrage konnte nicht verarbeitet werden." }, 403);
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) return json({ ok: false, code: "unsupported_media_type", message: "Die Anfrage konnte nicht verarbeitet werden." }, 415);
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 8_192) return json({ ok: false, code: "request_too_large", message: "Die Anfrage ist zu lang." }, 413);

  const config = getAssistantRuntimeConfig();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const identifier = `assistant:${forwarded || request.headers.get("x-real-ip") || "unknown"}`;
  const limit = checkConsultationRateLimit({ identifier, salt: config.rateLimitSalt, maxRequests: config.rateLimitMax, windowMs: config.rateLimitWindowMs });
  if (!limit.allowed) return json({ ok: false, code: "rate_limited", message: "Bitte warten Sie kurz und versuchen Sie es anschließend erneut." }, 429, { "Retry-After": String(limit.retryAfterSeconds) });

  let text = "";
  try { text = await request.text(); }
  catch { return json({ ok: false, code: "invalid_request", message: "Die Anfrage konnte nicht gelesen werden." }, 400); }
  if (text.length > 8_192) return json({ ok: false, code: "request_too_large", message: "Die Anfrage ist zu lang." }, 413);
  let body: unknown;
  try { body = JSON.parse(text); }
  catch { return json({ ok: false, code: "invalid_request", message: "Die Anfrage konnte nicht gelesen werden." }, 400); }
  const parsed = parseRequest(body);
  if (!parsed) return json({ ok: false, code: "validation_failed", message: "Bitte prüfen Sie Ihre Eingabe." }, 400);

  const answer = await answerPublicAssistant({ ...parsed, knowledge: [...melimedicsKnowledgeBase], provider: getAIProvider(), maxOutputTokens: config.maxOutputTokens });
  return json({ ok: true, answer });
}
