import type { Metadata } from "next";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import NewsGridSection from "@/components/sections/NewsGridSection";
import Pagination from "@/components/ui/Pagination";
import { safeFetch, urlFor } from "@/lib/sanity";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const PER_PAGE = 15;

const PAGE_QUERY = `*[_type == "newsMediaPolicyPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  },
  hero{
    title,
    subtitle,
    backgroundImage{
      asset->{
        _id,
        url,
        metadata{dimensions}
      }
    }
  }
}`;

const POLICIES_COUNT_QUERY = `count(*[_type == "newsMediaPolicies"])`;

const POLICIES_PAGINATED_QUERY = `*[_type == "newsMediaPolicies"] | order(title asc) [$start...$end]{
  title,
  "slug": slug.current,
  excerpt
}`;

type PageData = {
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: unknown;
    noIndex?: boolean | null;
  } | null;
  hero?: {
    title?: string | null;
    subtitle?: string | null;
    backgroundImage?: { asset?: { url?: string } } | null;
  } | null;
};

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(800).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await safeFetch<PageData>(PAGE_QUERY);
  const seo = pageData?.seo;

  const title = seo?.metaTitle ?? "News & Media Policies | AZAGC";
  const description =
    seo?.metaDescription ??
    "AZAGC news and media policies — guidelines and resources for members and the press.";

  const ogImage = seo?.ogImage ? buildImageUrl(seo.ogImage) : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: "https://azagc.org/news-media/policies/",
    },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const [pageData, totalCount, policies] = await Promise.all([
    safeFetch<PageData>(PAGE_QUERY),
    safeFetch<number>(POLICIES_COUNT_QUERY),
    safeFetch<
      Array<{
        title: string;
        slug: string;
        excerpt: string | null;
      }>
    >(POLICIES_PAGINATED_QUERY, { start, end }),
  ]);

  const hero = pageData?.hero ?? null;
  const totalItems = typeof totalCount === "number" ? totalCount : 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const allPolicies = Array.isArray(policies) ? policies : [];
  const gridItems = allPolicies
    .filter((p) => p?.slug && typeof p.slug === "string")
    .map((p) => ({
      headline: p.title || "Untitled",
      slug: p.slug,
      publishedAt: null as string | null,
      excerpt: p.excerpt ?? null,
      href: `/news-media/policies/${p.slug}`,
    }));

  const heroForComponent = hero
    ? {
        title: hero.title ?? "Policies",
        subtitle: hero.subtitle ?? undefined,
        backgroundImage: hero.backgroundImage?.asset?.url
          ? { asset: { url: hero.backgroundImage.asset.url } }
          : undefined,
      }
    : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://azagc.org" },
          { name: "News & Media", url: "https://azagc.org/news-media/" },
          {
            name: "Policies",
            url: "https://azagc.org/news-media/policies/",
          },
        ]}
      />

      {hero ? (
        <PageBuilderHero
          title={hero.title ?? "News & Media Policies"}
          hero={heroForComponent}
        />
      ) : (
        <section className="relative bg-navy py-20 overflow-hidden">
          <div className="container-site relative z-10">
            <h1 className="font-normal text-4xl md:text-5xl text-white">
              News & Media Policies
            </h1>
            <p className="font-body text-lg text-white/80 mt-3 max-w-2xl">
              Guidelines and policy documents for news, media, and member
              communications.
            </p>
          </div>
        </section>
      )}

      <NewsGridSection
        articles={gridItems}
        heading="Policies"
        className="border-t border-warm-gray"
        emptyMessage="No policies yet. Add documents in Sanity under News Media Policies."
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/news-media/policies"
        ariaLabel="Policies pagination"
      />
    </>
  );
}
