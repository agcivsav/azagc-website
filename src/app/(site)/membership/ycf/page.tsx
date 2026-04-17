import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import { PageBuilderSections } from "@/components/sections/PageBuilderSections";
import { safeFetch } from "@/lib/sanity";
import type { IPageHero, ISection } from "@/types/common";
import { PAGE_BUILDER_SECTIONS_GROQ } from "@/lib/queries/pageBuilderSectionsGroq";

type YcfPageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { asset?: { url?: string } };
  noIndex?: boolean;
};

type YcfPageData = {
  seo?: YcfPageSeo;
  hero?: IPageHero;
  pageBuilderSections?: ISection[] | null;
};

const SEO_QUERY = `*[_type == "ycfPage" && _id == "ycfPage"][0]{
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset-> { url }
    },
    noIndex
  },
  hero { title }
}`;

const PAGE_QUERY = `*[_type == "ycfPage" && _id == "ycfPage"][0]{
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset-> { url }
    },
    noIndex
  },
  hero {
    title,
    subtitle,
    backgroundImage {
      asset-> { url }
    }
  },
  ${PAGE_BUILDER_SECTIONS_GROQ}
}`;

const CANONICAL = "https://azagc.org/membership/ycf/";

export async function generateMetadata(): Promise<Metadata> {
  const data = await safeFetch<YcfPageData | null>(SEO_QUERY);
  if (!data) {
    return { title: "Young Constructors Forum (YCF) | AZAGC" };
  }
  const fallbackTitle = "Young Constructors Forum (YCF) | AZAGC";
  const title =
    data.seo?.metaTitle?.trim() ||
    data.hero?.title?.trim() ||
    fallbackTitle;
  const description = data.seo?.metaDescription?.trim() || undefined;
  const ogImageUrl = data.seo?.ogImage?.asset?.url;

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: ogImageUrl
      ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
      : undefined,
    robots: data.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function YcfPage() {
  const pageData = await safeFetch<YcfPageData | null>(PAGE_QUERY);
  if (!pageData) {
    notFound();
  }

  const sections = pageData.pageBuilderSections ?? [];
  const breadcrumbName =
    pageData.hero?.title?.trim() || "Young Constructors Forum";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://azagc.org" },
          { name: "Membership", url: "https://azagc.org/membership/" },
          { name: breadcrumbName, url: CANONICAL },
        ]}
      />

      <PageBuilderHero title="" hero={pageData.hero} />
      <PageBuilderSections
        sections={sections}
        affiliateSecondTextAnchorByKey={new Map()}
        imagePresentation="crop"
      />
    </>
  );
}
