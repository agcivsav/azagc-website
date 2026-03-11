import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import PageBuilderTextBlock from '@/components/sections/PageBuilderTextBlock'
import PageBuilderTwoColumn from '@/components/sections/PageBuilderTwoColumn'
import PageBuilderTwoImages from '@/components/sections/PageBuilderTwoImages'
import NewsGridSection from '@/components/sections/NewsGridSection'
import { safeFetch, urlFor } from '@/lib/sanity'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'News & Media | AZAGC',
  description:
    'AZAGC news and media — construction industry updates, legislative alerts, member news, and advocacy developments for Arizona contractors.',
  alternates: { canonical: 'https://www.azagc.org/news-media/' },
}

const PAGE_QUERY = `*[_type == "newsMediaPage"][0]{
  sections[]{
    _type, _key,
    title, subtitle, backgroundImage,
    heading, body, ctaLabel, ctaHref,
    imagePosition, image, leftImage, rightImage, leftCaption, rightCaption,
    ctas[]{ label, href },
    limit,
    items[]{ headline, publishedAt, excerpt, "articleSlug": article->slug.current, "articleHeadline": article->headline, "articlePublishedAt": article->publishedAt, "articleExcerpt": article->excerpt, url }
  }
}`
const NEWS_QUERY = `*[_type == "newsArticle"] | order(publishedAt desc)[0...50]{ headline, "slug": slug.current, publishedAt, excerpt }`

type Section =
  | { _type: 'pageBuilderHero'; _key?: string; title?: string | null; subtitle?: string | null; backgroundImage?: unknown }
  | { _type: 'pageBuilderTextBlock'; _key?: string; heading?: string | null; body?: string | null; ctaLabel?: string | null; ctaHref?: string | null }
  | { _type: 'pageBuilderTwoColumn'; _key?: string; imagePosition?: string | null; heading?: string | null; body?: string | null; image?: unknown; ctas?: Array<{ label?: string | null; href?: string | null }> | null }
  | { _type: 'pageBuilderTwoImages'; _key?: string; heading?: string | null; leftImage?: unknown; rightImage?: unknown; leftCaption?: string | null; rightCaption?: string | null }
  | {
      _type: 'pageBuilderNewsGrid'
      _key?: string
      heading?: string | null
      limit?: number | null
      items?: Array<{
        headline?: string | null
        publishedAt?: string | null
        excerpt?: string | null
        articleSlug?: string | null
        articleHeadline?: string | null
        articlePublishedAt?: string | null
        articleExcerpt?: string | null
        url?: string | null
      }> | null
    }

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(1200).height(800).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

export default async function NewsMediaPage() {
  const [pageData, newsList] = await Promise.all([
    safeFetch<{ sections?: Section[] | null }>(PAGE_QUERY),
    safeFetch<Array<{ headline: string; slug: string; publishedAt: string | null; excerpt: string | null }>>(NEWS_QUERY),
  ])
  const sections = pageData?.sections ?? []
  const allArticles = Array.isArray(newsList) ? newsList : []
  const articles = allArticles.filter((a) => a?.slug && typeof a.slug === 'string')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'News & Media', url: 'https://www.azagc.org/news-media/' },
        ]}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/news-media" className="hover:text-navy transition-colors no-underline">News & Media</a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <section className="relative bg-navy py-20 overflow-hidden">
            <div className="container-site relative z-10">
              <h1 className="font-normal text-4xl md:text-5xl text-white">News & Media</h1>
              <p className="font-body text-lg text-white/80 mt-3 max-w-2xl">
                The latest news, advocacy updates, member spotlights, and industry analysis from AZAGC.
              </p>
            </div>
          </section>
          <NewsGridSection articles={articles.slice(0, 24)} />
        </>
      ) : (
        sections.map((section, i) => {
          const key = section._key ?? `${section._type}-${i}`
          if (section._type === 'pageBuilderHero') {
            return (
              <PageBuilderHero
                key={key}
                title={section.title ?? 'News & Media'}
                subtitle={section.subtitle ?? null}
                backgroundImageUrl={buildImageUrl(section.backgroundImage)}
              />
            )
          }
          if (section._type === 'pageBuilderTextBlock') {
            return (
              <PageBuilderTextBlock
                key={key}
                heading={section.heading ?? ''}
                body={section.body ?? null}
                ctaLabel={section.ctaLabel ?? null}
                ctaHref={section.ctaHref ?? null}
              />
            )
          }
          if (section._type === 'pageBuilderTwoColumn') {
            const ctas = (section.ctas ?? [])
              .filter((c): c is { label: string; href: string } => !!c?.label && !!c?.href)
              .map((c) => ({ label: c.label, href: c.href }))
            return (
              <PageBuilderTwoColumn
                key={key}
                imagePosition={section.imagePosition === 'right' ? 'right' : 'left'}
                heading={section.heading ?? null}
                body={section.body ?? null}
                imageUrl={buildImageUrl(section.image)}
                ctas={ctas}
              />
            )
          }
          if (section._type === 'pageBuilderTwoImages') {
            return (
              <PageBuilderTwoImages
                key={key}
                heading={section.heading ?? null}
                leftImageUrl={buildImageUrl(section.leftImage)}
                leftCaption={section.leftCaption ?? null}
                rightImageUrl={buildImageUrl(section.rightImage)}
                rightCaption={section.rightCaption ?? null}
              />
            )
          }
          if (section._type === 'pageBuilderNewsGrid') {
            const limit = section.limit ?? 24
            const manualItems = section.items ?? []
            const gridArticles =
              manualItems.length > 0
                ? manualItems.map((item) => ({
                    headline: item.headline ?? item.articleHeadline ?? '',
                    slug: item.articleSlug ?? '',
                    publishedAt: item.publishedAt ?? item.articlePublishedAt ?? null,
                    excerpt: item.excerpt ?? item.articleExcerpt ?? null,
                    href:
                      item.articleSlug
                        ? `/news-media/${item.articleSlug}`
                        : item.url ?? undefined,
                  }))
                : articles.slice(0, limit).map((a) => ({
                    headline: a.headline,
                    slug: a.slug,
                    publishedAt: a.publishedAt,
                    excerpt: a.excerpt,
                  }))
            return (
              <NewsGridSection
                key={key}
                articles={gridArticles}
                heading={section.heading ?? null}
              />
            )
          }
          return null
        })
      )}

      <CTABand />
    </>
  )
}
