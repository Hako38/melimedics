export type HairCheckEvent =
  | { name: "hair_check_started" }
  | { name: "hair_check_step_completed"; step: number }
  | { name: "hair_photo_added"; slot: number }
  | { name: "hair_check_completed" }
  | { name: "hair_consultation_submitted" }
  | { name: "hair_booking_clicked" };

/**
 * Privacy-safe analytics adapter. It intentionally has no provider and never
 * accepts answers, medical details, free text, file names or photos.
 */
export function emitHairCheckEvent(event: HairCheckEvent): void {
  void event;
  // Intentionally disabled until a consent-aware analytics provider is approved.
}
