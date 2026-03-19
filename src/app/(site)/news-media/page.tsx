import type { Metadata } from "next";
import Link from "next/link";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import NewsGridSection from "@/components/sections/NewsGridSection";
import Pagination from "@/components/ui/Pagination";
import { safeFetch, urlFor } from "@/lib/sanity";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

const PER_PAGE = 15;

const PAGE_QUERY = `*[_type == "newsMediaPage"][0]{
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

const NEWS_COUNT_QUERY = `count(*[_type == "newsArticle"])`;

const NEWS_PAGINATED_QUERY = `*[_type == "newsArticle"] | order(publishedAt desc) [$start...$end]{
  headline,
  title,
  "slug": slug.current,
  publishedAt,
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

  const title = seo?.metaTitle ?? "News & Media | AZAGC";
  const description =
    seo?.metaDescription ??
    "AZAGC news and media — construction industry updates, legislative alerts, member news, and advocacy developments for Arizona contractors.";

  const ogImage = seo?.ogImage ? buildImageUrl(seo.ogImage) : undefined;

  return {
    title,
    description,
    alternates: { canonical: "https://www.azagc.org/news-media/" },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function NewsMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const [pageData, totalCount, articles] = await Promise.all([
    safeFetch<PageData>(PAGE_QUERY),
    safeFetch<number>(NEWS_COUNT_QUERY),
    safeFetch<
      Array<{
        headline?: string | null;
        title?: string | null;
        slug: string;
        publishedAt: string | null;
        excerpt: string | null;
      }>
    >(NEWS_PAGINATED_QUERY, { start, end }),
  ]);

  const hero = pageData?.hero ?? null;
  const totalArticles = typeof totalCount === "number" ? totalCount : 0;
  const totalPages = Math.max(1, Math.ceil(totalArticles / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const allArticles = Array.isArray(articles) ? articles : [];
  const filteredArticles = allArticles
    .filter((a) => a?.slug && typeof a.slug === "string")
    .map((a) => ({
      ...a,
      headline: a.headline ?? a.title ?? "Untitled",
    }));

  const heroForComponent = hero
    ? {
        title: hero.title ?? "News & Media",
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
          { name: "Home", url: "https://www.azagc.org" },
          { name: "News & Media", url: "https://www.azagc.org/news-media/" },
        ]}
      />

      {hero ? (
        <PageBuilderHero
          title={hero.title ?? "News & Media"}
          hero={heroForComponent}
        />
      ) : (
        <section className="relative bg-navy py-20 overflow-hidden">
          <div className="container-site relative z-10">
            <h1 className="font-normal text-4xl md:text-5xl text-white">
              News & Media
            </h1>
            <p className="font-body text-lg text-white/80 mt-3 max-w-2xl">
              The latest news, advocacy updates, member spotlights, and industry
              analysis from AZAGC.
            </p>
          </div>
        </section>
      )}

      <NewsGridSection
        articles={filteredArticles}
        heading="Latest News"
        className="border-t border-warm-gray"
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/news-media"
      />
    </>
  );
}
