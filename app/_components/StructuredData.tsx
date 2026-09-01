import { visibleContact } from "../_data/practice";
import { absoluteUrl } from "../_lib/site-config";

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

export function StructuredData({ data, id }: { data: JsonLdValue; id: string }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script id={id} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }}/>;
}

export const medicalClinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${absoluteUrl("/")}#medical-clinic`,
  name: "Melimedics",
  url: absoluteUrl("/"),
  telephone: visibleContact.phone,
  email: visibleContact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: visibleContact.street,
    postalCode: visibleContact.postalCode,
    addressLocality: "Mainz",
    addressCountry: "DE",
  },
  areaServed: { "@type": "City", name: "Mainz" },
};

export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Start", href: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
