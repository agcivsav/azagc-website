import type { Metadata } from "next";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import ContributionForm from "@/components/forms/ContributionForm";
import PageBuilderTextBlock from "@/components/sections/SimpleContent";
import { safeFetch } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Support AZAGC's political action committee to elect pro-construction candidates in Arizona.",
};

const PAGE_QUERY = `
*[_type == "contributePage"][0]{
  heroTitle,
  heroSubtitle,
  body,
  formHeadline,
  formSubheadline,
  formSubmitLabel,
  sections[]{
    _type,
    _key,
    heading,
    body
  }
}
`;

type PageSection = {
  _type: string;
  _key?: string;
  heading?: string | null;
  body?: string | null;
};

type ContributePageData = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  body?: string | null;
  formHeadline?: string | null;
  formSubheadline?: string | null;
  formSubmitLabel?: string | null;
  sections?: PageSection[];
} | null;

export default async function ContributePage() {
  const data = await safeFetch<ContributePageData>(PAGE_QUERY);

  const heroTitle = data?.heroTitle ?? "";
  const heroSubtitle = data?.heroSubtitle ?? "";
  const body = data?.body ?? "";
  const formHeadline = data?.formHeadline ?? "";
  const formSubheadline = data?.formSubheadline ?? "";
  const formSubmitLabel = data?.formSubmitLabel ?? "";

  return (
    <>
      {/* Breadcrumb */}
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
            href="/advocacy"
            className="hover:text-navy transition-colors no-underline"
          >
            Advocacy
          </a>
          <span>/</span>
          <a
            href="/advocacy/contribute"
            className="hover:text-navy transition-colors no-underline"
          >
            Contribute
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">
            Advocacy
          </SectionLabel>

          <SectionTitle as="h1" className="text-white">
            {heroTitle}
          </SectionTitle>

          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="bg-cream py-16">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="prose prose-navy max-w-none">
            <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
              {body}
            </div>
          </div>

          <div className="bg-navy border border-white/20 p-7 rounded-sm">
            <ContributionForm
              headline={formHeadline}
              subheadline={formSubheadline}
              submitLabel={formSubmitLabel}
              dark
            />
          </div>
        </div>
      </section>

      {/* Page Builder Sections */}
      {data?.sections?.map((section: PageSection, i: number) => {
        const key = section._key ?? `${section._type}-${i}`;

        if (section._type === "pageBuilderTextBlock") {
          return (
            <PageBuilderTextBlock
              key={key}
              heading={section.heading ?? ""}
              body={section.body ?? null}
            />
          );
        }

        if (section._type === "ctaBand") {
          return <CTABandFromSanity key={key} />;
        }

        return null;
      })}

      {/* Default CTA */}
      <CTABandFromSanity />
    </>
  );
}
