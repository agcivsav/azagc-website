import type { Metadata } from "next";
import Link from "next/link";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import NewsGridSection from "@/components/sections/NewsGridSection";
import Pagination from "@/components/ui/Pagination";
import { urlFor } from "@/lib/sanity";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { sanitizeNewsSearchQuery } from "@/lib/newsSearch";
import {
  fetchNewsArticleListForIndex,
  fetchNewsMediaLandingPageData,
} from "@/lib/queries/newsMediaList";

const PER_PAGE = 15;

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(800).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const { q: qParam } = await searchParams;
  const qRaw = Array.isArray(qParam) ? qParam[0] : qParam;
  const searchQuery = sanitizeNewsSearchQuery(qRaw);

  const pageData = await fetchNewsMediaLandingPageData();
  const seo = pageData?.seo;

  const baseTitle = seo?.metaTitle ?? "News & Media | AZAGC";
  const baseDescription =
    seo?.metaDescription ??
    "AZAGC news and media — construction industry updates, legislative alerts, member news, and advocacy developments for Arizona contractors.";

  const ogImage = seo?.ogImage ? buildImageUrl(seo.ogImage) : undefined;

  if (searchQuery) {
    return {
      title: `“${searchQuery}” — News search`,
      description: `News articles matching “${searchQuery}” — ${baseDescription}`,
      alternates: { canonical: "https://www.azagc.org/news-media/" },
      openGraph: ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
        : undefined,
      robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    };
  }

  return {
    title: baseTitle,
    description: baseDescription,
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
  searchParams: Promise<{ page?: string; q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const currentPage = Math.max(1, parseInt(String(sp.page || "1"), 10) || 1);
  const start = (currentPage - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const [pageData, list] = await Promise.all([
    fetchNewsMediaLandingPageData(),
    fetchNewsArticleListForIndex(sp.q, start, end),
  ]);

  const { searchQuery, totalCount, articles } = list;
  const hero = pageData?.hero ?? null;
  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const filteredArticles = articles
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

  const gridHeading = searchQuery
    ? `Search results for “${searchQuery}”`
    : "Latest News";

  const emptyMessage = searchQuery
    ? `No articles match “${searchQuery}”. Try different keywords or browse all news.`
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

      {searchQuery ? (
        <div className="bg-white border-b border-warm-gray">
          <div className="container-site py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-body text-sm text-slate m-0">
              {filteredArticles.length === 0 ? (
                <>
                  No matches for “{searchQuery}”.{" "}
                  <Link
                    href="/news-media/"
                    className="text-primary font-medium hover:text-red-hover underline-offset-2 hover:underline"
                  >
                    Clear search
                  </Link>
                </>
              ) : (
                <>
                  {totalCount} result{totalCount === 1 ? "" : "s"} for “{searchQuery}”.{" "}
                  <Link
                    href="/news-media/"
                    className="text-primary font-medium hover:text-red-hover underline-offset-2 hover:underline"
                  >
                    Clear search
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      ) : null}

      <NewsGridSection
        articles={filteredArticles}
        heading={gridHeading}
        emptyMessage={emptyMessage}
        className={searchQuery ? "" : "border-t border-warm-gray"}
      />

      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/news-media"
        ariaLabel="News pagination"
        extraQuery={searchQuery ? { q: searchQuery } : undefined}
      />

      <CTABandFromSanity />
    </>
  );
}
