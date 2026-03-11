import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { safeFetch, urlFor } from '@/lib/sanity'
import { ArticleJsonLd } from '@/components/seo/JsonLd'
import PortableText from '@/components/ui/PortableText'
import InlineLeadForm from '@/components/forms/InlineLeadForm'
import BottomCTA from '@/components/sections/BottomCTA'
import NewsletterForm from '@/components/forms/NewsletterForm'

export async function generateStaticParams() {
  const slugs: Array<{ current: string }> =
    (await (await import('@/lib/sanity')).safeFetch(`*[_type == "newsArticle"].slug`)) ?? []
  return slugs.map((s) => ({ slug: s.current }))
}

interface NewsArticle {
  _id: string
  headline: string
  slug: { current: string }
  publishedAt: string | null
  category: string | null
  excerpt: string | null
  featuredImage: unknown
  body: unknown[]
  author: string | null
  seo?: { metaTitle?: string | null; metaDescription?: string | null } | null
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  return safeFetch(
    `*[_type == "newsArticle" && slug.current == $slug][0]{
      _id, headline, slug, publishedAt, category, excerpt, featuredImage, body, author,
      seo{ metaTitle, metaDescription }
    }`,
    { slug }
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article Not Found' }
  const title = article.seo?.metaTitle ?? article.headline
  const description = article.seo?.metaDescription ?? article.excerpt ?? `${article.headline} — AZAGC news.`
  return { title, description }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const imageUrl =
    article.featuredImage && typeof article.featuredImage === 'object'
      ? urlFor(article.featuredImage).width(900).height(500).fit('crop').url()
      : null

  return (
    <>
      <ArticleJsonLd
        headline={article.headline}
        datePublished={article.publishedAt ?? undefined}
        url={`https://www.azagc.org/news-media/${slug}`}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy no-underline">Home</a>
          <span>/</span>
          <a href="/news-media" className="hover:text-navy no-underline">News & Media</a>
          <span>/</span>
          <span className="truncate max-w-[200px]">{article.headline}</span>
        </div>
      </div>

      <article className="bg-white">
        <div className="container-site max-w-3xl mx-auto py-10 md:py-14">
          {article.category && (
            <span className="inline-block font-body font-semibold text-xs uppercase tracking-widest text-red mb-3">
              {article.category}
            </span>
          )}
          {formattedDate && (
            <time
              className="block font-body text-sm text-slate mb-4"
              dateTime={article.publishedAt ?? undefined}
            >
              {formattedDate}
            </time>
          )}
          <h1 className="font-normal text-3xl sm:text-4xl md:text-[2.5rem] text-navy leading-tight mb-6">
            {article.headline}
          </h1>
          {article.excerpt && (
            <p className="font-body text-lg text-slate leading-relaxed mb-8 border-l-4 border-red pl-5 py-1">
              {article.excerpt}
            </p>
          )}
          {imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-10">
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
                priority
              />
            </div>
          )}
          <div className="prose prose-slate max-w-none font-body text-slate leading-relaxed [&_p]:mb-4">
            <PortableText value={Array.isArray(article.body) ? article.body : null} />
          </div>
          {article.author && (
            <p className="font-body text-sm text-slate mt-10 pt-6 border-t border-warm-gray">
              By {article.author}
            </p>
          )}

          <div className="mt-14 pt-10 border-t border-warm-gray">
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

      <section className="bg-navy-deep py-10">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-normal text-lg text-white">Get AZAGC news in your inbox</p>
            <p className="font-body text-sm text-white/60 mt-0.5">
              Industry updates, advocacy alerts, and event invites.
            </p>
          </div>
          <NewsletterForm className="w-full sm:w-auto sm:min-w-[320px]" />
        </div>
      </section>

      <BottomCTA source="news-article-bottom" />
    </>
  )
}
