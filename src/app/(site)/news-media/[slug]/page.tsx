import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { safeFetch, urlFor } from "@/lib/sanity";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import PortableText from "@/components/ui/PortableText";
import InlineLeadForm from "@/components/forms/InlineLeadForm";
import BottomCTA from "@/components/sections/BottomCTA";
import NewsletterForm from "@/components/forms/NewsletterForm";
import type { PortableTextBlock } from "@portabletext/types";

export async function generateStaticParams() {
  const raw = await (
    await import("@/lib/sanity")
  ).safeFetch<unknown>(`*[_type == "newsArticle"].slug`);
  const slugs: Array<{ current: string } | null> = Array.isArray(raw)
    ? raw
    : ((raw ?? []) as Array<{ current: string } | null>);
  const safeSlugs = (slugs ?? []).filter(
    (s): s is { current: string } =>
      s != null && typeof (s as { current?: unknown }).current === "string",
  );
  return safeSlugs.map((s) => ({ slug: s.current }));
}

interface NewsArticle {
  _id: string;
  title: string;
  headline?: string | null;
  slug: { current: string };
  publishedAt: string | null;
  excerpt: string | null;
  featuredImage: unknown;
  body: PortableTextBlock[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: unknown;
    noIndex?: boolean | null;
  } | null;
}

const ARTICLE_QUERY = `*[_type == "newsArticle" && slug.current == $slug][0]{
  _id,
  title,
  headline,
  slug,
  publishedAt,
  excerpt,
  featuredImage,
  body,
  seo{
    metaTitle,
    metaDescription,
    ogImage,
    noIndex
  }
}`;

async function getArticle(slug: string): Promise<NewsArticle | null> {
  return safeFetch(ARTICLE_QUERY, { slug });
}

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(630).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found" };

  const displayHeadline = article.headline ?? article.title;
  const title = article.seo?.metaTitle ?? displayHeadline;
  const description =
    article.seo?.metaDescription ??
    article.excerpt ??
    `${displayHeadline} — AZAGC news.`;
  const ogImage = article.seo?.ogImage
    ? buildImageUrl(article.seo.ogImage)
    : article.featuredImage
      ? buildImageUrl(article.featuredImage)
      : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.azagc.org/news-media/${slug}`,
    },
    openGraph: ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630 }] }
      : undefined,
    robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const displayHeadline = article.headline ?? article.title;
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const imageUrl =
    article.featuredImage && typeof article.featuredImage === "object"
      ? urlFor(article.featuredImage).width(900).height(506).fit("crop").url()
      : null;

  return (
    <>
      {article.publishedAt && (
        <ArticleJsonLd
          headline={displayHeadline}
          datePublished={article.publishedAt}
          url={`https://www.azagc.org/news-media/${slug}`}
          image={imageUrl ?? undefined}
        />
      )}

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.azagc.org" },
          { name: "News & Media", url: "https://www.azagc.org/news-media/" },
          {
            name: displayHeadline,
            url: `https://www.azagc.org/news-media/${slug}`,
          },
        ]}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/news-media"
            className="hover:text-navy transition-colors no-underline"
          >
            News & Media
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate max-w-48 sm:max-w-none">
            {displayHeadline}
          </span>
        </div>
      </div>

      <article className="bg-white">
        <header className="container-site max-w-3xl mx-auto pt-12 md:pt-16 pb-8">
          {formattedDate && (
            <time
              className="block font-body text-xs uppercase tracking-widest text-slate mb-4"
              dateTime={article.publishedAt ?? undefined}
            >
              {formattedDate}
            </time>
          )}
          <h1 className="font-normal text-3xl sm:text-4xl md:text-[2.75rem] text-navy leading-[1.15] tracking-tight">
            {displayHeadline}
          </h1>
          {article.excerpt && (
            <p className="font-body text-lg text-slate leading-relaxed mt-5 border-l-4 border-red pl-5 py-1">
              {article.excerpt}
            </p>
          )}
        </header>

        {imageUrl && (
          <figure className="container-site max-w-4xl mx-auto px-4 sm:px-6 mb-12">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          </figure>
        )}

        <div className="container-site max-w-3xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
          <div className="prose prose-slate max-w-none font-body text-slate leading-relaxed [&_p]:mb-5 [&_p:last-child]:mb-0">
            <PortableText
              value={Array.isArray(article.body) ? article.body : null}
            />
          </div>

          <div className="mt-16 pt-12 border-t border-warm-gray">
            <div className="bg-navy rounded-xl p-8 md:p-10">
              <InlineLeadForm
                source="post-inline"
                headline="Stay ahead of Arizona construction news"
                subheadline="Join AZAGC and get industry updates, advocacy alerts, and event invites."
                dark
              />
            </div>
          </div>
        </div>
      </article>

      <section className="bg-navy-deep py-12 md:py-14">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-normal text-lg text-white">
              Get AZAGC news in your inbox
            </p>
            <p className="font-body text-sm text-white/60 mt-0.5">
              Industry updates, advocacy alerts, and event invites.
            </p>
          </div>
          {/* <NewsletterForm className="w-full sm:w-auto sm:min-w-[320px]" /> */}
        </div>
      </section>

      {/* <BottomCTA source="news-article-bottom" /> */}
    </>
  );
}
