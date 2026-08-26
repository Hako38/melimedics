import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentTemplate } from "../../_components/TreatmentTemplate";
import { treatmentBySlug, treatments } from "../../_data/treatments";
import { pageMetadata } from "../../_lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatments.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = treatmentBySlug[slug];
  if (!treatment) return {};
  return pageMetadata(treatment.title, treatment.shortDescription, treatment.href, { shareImage: false });
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = treatmentBySlug[slug];
  if (!treatment) notFound();
  return <TreatmentTemplate treatment={treatment}/>;
}
