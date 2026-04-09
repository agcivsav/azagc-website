import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import { PageBuilderSections } from "@/components/sections/PageBuilderSections";
import { safeFetch } from "@/lib/sanity";
import type { IPage } from "@/types/common";
import { PAGE_BUILDER_SECTIONS_GROQ } from "@/lib/queries/pageBuilderSectionsGroq";

type SanityPageMeta = {
  title?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset?: { url?: string } };
    noIndex?: boolean;
  };
};

const SEO_PAGE_META_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset-> {
        url
      }
    },
    noIndex
  }
}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pages: string[] }>;
}): Promise<Metadata> {
  const pageParams = await params;
  const slugPath = pageParams.pages.join("/");
  const data = await safeFetch<SanityPageMeta | null>(SEO_PAGE_META_QUERY, {
    slug: slugPath,
  });
  if (!data) {
    return { title: "Page Not Found | AZAGC" };
  }

  const pageTitle = data.title ?? "AZAGC";
  const title = data.seo?.metaTitle ?? pageTitle;
  const description = data.seo?.metaDescription?.trim() || undefined;
  const canonicalPath = slugPath ? `/${slugPath}` : "";
  const ogImageUrl = data.seo?.ogImage?.asset?.url;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.azagc.org${canonicalPath}`,
    },
    openGraph: ogImageUrl
      ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
      : undefined,
    robots: data.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

const PAGE_QUERY = `
*[_type == "page" && slug.current == $slug][0]{
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset-> {
        url
      }
    },
    noIndex
  },
  title,
  slug,
  hero {
    title,
    subtitle,
    backgroundImage {
        asset-> {
          url
        }
    }
  },
  ${PAGE_BUILDER_SECTIONS_GROQ}
}
`;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ pages: string[] }>;
  searchParams: Promise<{ category?: string; month?: string; year?: string }>;
}) {
  const pageParams = await params;
  const [pageData] = await Promise.all([
    safeFetch<IPage | null>(PAGE_QUERY, {
      slug: pageParams.pages.join("/"),
    }),
  ]);

  if (!pageData) {
    notFound();
  }

  const sections = pageData.pageBuilderSections ?? [];
  const pageSlug = pageParams.pages.join("/");
  const advocacyImagePresentation =
    pageSlug === "advocacy" ? ("contain" as const) : ("crop" as const);

  const affiliateSecondTextAnchorByKey = (() => {
    const map = new Map<string, string>();
    if (pageSlug !== "membership/affiliate") return map;
    let ordinal = 0;
    sections.forEach((s, i) => {
      if (s._type !== "contentSection") return;
      const k = s._key ?? `${s._type}-${i}`;
      if (ordinal === 1) map.set(k, "affiliatedues");
      ordinal += 1;
    });
    return map;
  })();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.azagc.org" },
          {
            name: pageParams.pages.join("/"),
            url: `https://www.azagc.org/${pageParams.pages.join("/")}`,
          },
        ]}
      />

      <PageBuilderHero title={pageData.title ?? ""} hero={pageData.hero} />
      <PageBuilderSections
        sections={sections}
        affiliateSecondTextAnchorByKey={affiliateSecondTextAnchorByKey}
        imagePresentation={advocacyImagePresentation}
      />
    </>
  );
}
