import type { Metadata } from "next";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import BottomCTA from "@/components/sections/BottomCTA";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import PageBuilderTextBlock from "@/components/sections/PageBuilderTextBlock";
import PageBuilderTwoColumn from "@/components/sections/PageBuilderTwoColumn";
import { safeFetch, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Workforce Development Programs",
  description:
    "Workforce development programs for Arizona construction contractors — safety, supervisory, partnerships, and technical training.",
};

const PAGE_QUERY = `
*[_type == "workforceDevelopmentPage"][0]{
  sections[]{
    _type,
    _key,
    title,
    subtitle,
    backgroundImage,
    heading,
    body,
    ctaLabel,
    ctaHref,
    imagePosition,
    image,
    ctas[]{ label, href }
  }
}
`;

type SectionItem = {
  _type: string;
  _key?: string;
  title?: string | null;
  subtitle?: string | null;
  backgroundImage?: unknown;
  heading?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  imagePosition?: string | null;
  image?: unknown;
  ctas?: Array<{ label?: string | null; href?: string | null }> | null;
};

type PageData = {
  sections?: SectionItem[] | null;
} | null;

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(800).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

export default async function WorkforceDevelopmentProgramsPage() {
  const data = await safeFetch<PageData>(PAGE_QUERY);
  const sections = data?.sections ?? [];

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/education-training"
            className="hover:text-navy transition-colors no-underline"
          >
            Education & Training
          </a>
          <span>/</span>
          <a
            href="/education-training/workforce-development-programs"
            className="hover:text-navy transition-colors no-underline"
          >
            Workforce Development Programs
          </a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <PageBuilderHero title="" subtitle="" />
          <section className="bg-cream py-16">
            <div className="container-site max-w-2xl text-center">
              <p className="font-body text-slate">
                Add sections in Sanity Studio (Workforce Development Page) to
                build this page.
              </p>
            </div>
          </section>
        </>
      ) : (
        sections.map((section, i) => {
          if (section._type === "hero") {
            return (
              <PageBuilderHero
                key={section._key ?? `hero-${i}`}
                title={section.title ?? ""}
                subtitle={section.subtitle ?? null}
                backgroundImageUrl={buildImageUrl(section.backgroundImage)}
              />
            );
          }
          if (section._type === "pageBuilderTextBlock") {
            return (
              <PageBuilderTextBlock
                key={section._key ?? `text-${i}`}
                heading={section.heading ?? ""}
                body={section.body ?? null}
                ctaLabel={section.ctaLabel ?? null}
                ctaHref={section.ctaHref ?? null}
              />
            );
          }
          if (section._type === "pageBuilderTwoColumn") {
            const ctas = (section.ctas ?? [])
              .filter(
                (c): c is { label: string; href: string } =>
                  !!c?.label && !!c?.href,
              )
              .map((c) => ({ label: c.label, href: c.href }));
            return (
              <PageBuilderTwoColumn
                key={section._key ?? `two-${i}`}
                imagePosition={
                  section.imagePosition === "right" ? "right" : "left"
                }
                heading={section.heading ?? null}
                body={section.body ?? null}
                imageUrl={buildImageUrl(section.image)}
                ctas={ctas}
              />
            );
          }
          return null;
        })
      )}

      <CTABandFromSanity />
      <BottomCTA source="workforce" />
    </>
  );
}
