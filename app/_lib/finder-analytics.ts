export type FinderEventName = "finder_started" | "category_selected" | "finder_completed" | "result_clicked" | "booking_clicked";

export type FinderEventDetail = {
  name: FinderEventName;
  category?: string;
  result?: string;
};

/**
 * Lokale Event-Abstraktion ohne Netzwerkrequest, Cookies oder Drittanbieter.
 * Eine spätere Consent-gesteuerte Integration kann gezielt auf dieses Event hören.
 */
export function emitFinderEvent(detail: FinderEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<FinderEventDetail>("melimedics:finder-event", { detail }));
}
