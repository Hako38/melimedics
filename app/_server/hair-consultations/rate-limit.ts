import { createHash } from "node:crypto";

type Bucket = { count: number; resetsAt: number };
const buckets = new Map<string, Bucket>();

export function checkConsultationRateLimit(input: { identifier: string; salt: string; maxRequests: number; windowMs: number; now?: number }) {
  const now = input.now ?? Date.now();
  const key = input.salt ? createHash("sha256").update(`${input.salt}:${input.identifier}`).digest("hex") : "unconfigured-local-bucket";
  const current = buckets.get(key);
  if (!current || current.resetsAt <= now) {
    buckets.set(key, { count: 1, resetsAt: now + input.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (current.count >= input.maxRequests) return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetsAt - now) / 1000)) };
  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
