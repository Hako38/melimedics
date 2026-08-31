export type VerificationStatus = "verified" | "needs_review" | "missing";

export type VerifiedValue = {
  value: string | null;
  status: VerificationStatus;
  todo?: string;
};

export const practice = {
  name: "Melimedics",
  city: { value: "Mainz-Gonsenheim", status: "verified" } satisfies VerifiedValue,
  street: { value: "Elbestraße 90", status: "verified" } satisfies VerifiedValue,
  postalCode: { value: null, status: "needs_review", todo: "Widerspruch zwischen 55122 und 55124 vor Veröffentlichung auflösen." } satisfies VerifiedValue,
  phone: { value: "01575 8272466", status: "verified" } satisfies VerifiedValue,
  phoneHref: "tel:+4915758272466",
  email: { value: "info@melimedics.de", status: "verified" } satisfies VerifiedValue,
  emailHref: "mailto:info@melimedics.de",
  openingHours: { value: null, status: "missing", todo: "Freigegebene Öffnungs- oder Sprechzeiten ergänzen." } satisfies VerifiedValue,
  mapsUrl: { value: null, status: "missing", todo: "Verifizierten Maps-Link nach Adressfreigabe ergänzen." } satisfies VerifiedValue,
  bookingUrl: { value: "https://www.planity.com/de-DE/melimedics-55122-mainz", status: "verified" } satisfies VerifiedValue,
} as const;

export const visibleContact = {
  street: practice.street.value,
  location: practice.city.value,
  phone: practice.phone.value,
  phoneHref: practice.phoneHref,
  email: practice.email.value,
  emailHref: practice.emailHref,
  bookingUrl: practice.bookingUrl.value,
};
