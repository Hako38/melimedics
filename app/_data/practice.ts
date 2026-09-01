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
  postalCode: { value: "55122", status: "verified" } satisfies VerifiedValue,
  phone: { value: "01575 8272466", status: "verified" } satisfies VerifiedValue,
  phoneHref: "tel:+4915758272466",
  email: { value: "info@melimedics.de", status: "verified" } satisfies VerifiedValue,
  emailHref: "mailto:info@melimedics.de",
  openingHours: { value: null, status: "missing", todo: "Freigegebene Öffnungs- oder Sprechzeiten ergänzen." } satisfies VerifiedValue,
  mapsUrl: { value: "https://www.google.com/maps/place/Melimedics/@50.0055131,8.2227146,17z/data=!3m1!4b1!4m6!3m5!1s0x47bd953ce8ea976f:0x9e7f5112b0983871!8m2!3d50.0055131!4d8.2227146!16s%2Fg%2F11x80pbclq", status: "verified" } satisfies VerifiedValue,
  bookingUrl: { value: "https://www.planity.com/de-DE/melimedics-55122-mainz", status: "verified" } satisfies VerifiedValue,
} as const;

export const visibleContact = {
  street: practice.street.value,
  postalCode: practice.postalCode.value,
  location: practice.city.value,
  phone: practice.phone.value,
  phoneHref: practice.phoneHref,
  email: practice.email.value,
  emailHref: practice.emailHref,
  mapsUrl: practice.mapsUrl.value,
  bookingUrl: practice.bookingUrl.value,
};
