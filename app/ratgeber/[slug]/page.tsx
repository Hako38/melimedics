import { notFound } from "next/navigation";
import { Breadcrumbs, CTA, InteriorHero, PageShell } from "../../_components/SiteShell";
import { guideArticles, guideBySlug } from "../../_data/guides";
import { mediaSlots } from "../../_data/media";
import { pageMetadata } from "../../_lib/metadata";

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = guideBySlug[slug];
  if (!article) return {};
  return pageMetadata(article.title, article.teaser, `/ratgeber/${article.slug}/`);
}

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = guideBySlug[slug];
  if (!article) notFound();
  const media = mediaSlots[article.mediaKey];

  return <PageShell>
    <Breadcrumbs items={[{ label: "Ratgeber", href: "/ratgeber/" }, { label: article.title, href: `/ratgeber/${article.slug}/` }]}/>
    <InteriorHero eyebrow={`${article.tag} · ${article.readingTime}`} title={article.title} intro={article.intro} media={media} mediaLabel="Melimedics Ratgeber"/>
    <article className="guide-article">
      {article.sections.map((section, index) => <section key={section.title}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
        </div>
      </section>)}
      <aside><strong>Medizinischer Hinweis</strong><p>Die Inhalte dienen der allgemeinen Orientierung. Sie ersetzen keine persönliche Anamnese, Untersuchung, Diagnose oder ärztliche Aufklärung.</p></aside>
    </article>
    <CTA title="Offene Fragen klären wir im persönlichen Gespräch."/>
  </PageShell>;
}
