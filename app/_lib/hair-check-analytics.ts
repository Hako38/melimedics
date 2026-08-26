export type HairCheckEvent =
  | { name: "hair_check_started" }
  | { name: "hair_check_step_completed"; step: number }
  | { name: "hair_photo_added"; slot: number }
  | { name: "hair_check_photo_added"; slot: number }
  | { name: "hair_check_completed" }
  | { name: "hair_consultation_submitted" }
  | { name: "hair_check_submit_started" }
  | { name: "hair_check_submit_success" }
  | { name: "hair_check_submit_error"; code: "validation_failed" | "upload_failed" | "rate_limited" | "submission_unavailable" | "network_error" | "request_too_large" | "scanner_unavailable" | "invalid_request" | "origin_rejected" | "unsupported_media_type" }
  | { name: "hair_booking_clicked" };

/**
 * Privacy-safe analytics adapter. It intentionally has no provider and never
 * accepts answers, medical details, free text, file names or photos.
 */
export function emitHairCheckEvent(event: HairCheckEvent): void {
  void event;
  // Intentionally disabled until a consent-aware analytics provider is approved.
}
