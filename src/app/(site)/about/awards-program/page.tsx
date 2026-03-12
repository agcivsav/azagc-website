import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import PageBuilderTextBlock from '@/components/sections/PageBuilderTextBlock'
import PageBuilderTwoColumn from '@/components/sections/PageBuilderTwoColumn'
import PageBuilderTwoImages from '@/components/sections/PageBuilderTwoImages'
import PageBuilderResourceLinks from '@/components/sections/PageBuilderResourceLinks'
import type { ResourceGroup } from '@/components/sections/PageBuilderResourceLinks'
import PageBuilderStaffList from '@/components/sections/PageBuilderStaffList'
import PageBuilderVideo from '@/components/sections/PageBuilderVideo'
import PageBuilderCourseCard from '@/components/sections/PageBuilderCourseCard'
import PageBuilderTabs from '@/components/sections/PageBuilderTabs'
import NewsGridSection from '@/components/sections/NewsGridSection'
import EventsListSection from '@/components/sections/EventsListSection'
import TeamImageCardGrid from '@/components/sections/TeamImageCardGrid'
import AwardWinnersListSection from '@/components/sections/AwardWinnersListSection'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Awards Program',
  description:
    'AZAGC Chapter Awards Program — Build Arizona Awards, Safety Professional of the Year, Young Constructors Forum, and Building Women in Construction.',
}

const AWARDS_PAGE_QUERY = `
*[_type == "awardsPage"][0]{
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
    leftImage,
    rightImage,
    leftCaption,
    rightCaption,
    ctas[]{ label, href },
    resourceGroups[]{ title, links[]{ label, url } },
    items[]{ name, title, company, role, headline, publishedAt, excerpt, "articleSlug": article->slug.current, "articleHeadline": article->headline, "articlePublishedAt": article->publishedAt, "articleExcerpt": article->excerpt, url, image, heading, subheading, companyName, details },
    videoUrl,
    details,
    limit,
    sectionTitle,
    description,
    columns,
    ctaLabel,
    ctaHref,
    intro,
    tabs[]{ title, content, image }
  }
}
`

const NEWS_QUERY = `*[_type == "newsArticle"] | order(publishedAt desc)[0...50]{ headline, "slug": slug.current, publishedAt, excerpt }`
const EVENTS_QUERY = `*[_type == "event" && startDate >= $now] | order(startDate asc){ title, "slug": slug.current, startDate, category }`

type Section = {
  _type: string
  _key?: string
  title?: string | null
  subtitle?: string | null
  backgroundImage?: unknown
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  imagePosition?: string | null
  image?: unknown
  leftImage?: unknown
  rightImage?: unknown
  leftCaption?: string | null
  rightCaption?: string | null
  ctas?: Array<{ label?: string | null; href?: string | null }> | null
  resourceGroups?: Array<{ title?: string | null; links?: Array<{ label?: string | null; url?: string | null }> | null }> | null
  items?: Array<{
    name?: string | null
    title?: string | null
    company?: string | null
    role?: string | null
    headline?: string | null
    publishedAt?: string | null
    excerpt?: string | null
    articleSlug?: string | null
    articleHeadline?: string | null
    articlePublishedAt?: string | null
    articleExcerpt?: string | null
    url?: string | null
    image?: unknown
    heading?: string | null
    subheading?: string | null
    companyName?: string | null
    details?: string | null
  }> | null
  videoUrl?: string | null
  details?: string | null
  limit?: number | null
  sectionTitle?: string | null
  description?: string | null
  columns?: string | null

  intro?: string | null
  tabs?: Array<{ title?: string | null; content?: string | null; image?: unknown }> | null
}

const MONTH_NAMES: Record<number, string> = {
  1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
  7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December',
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

export default async function AwardsProgramPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>
}) {
  const params = await searchParams
  const now = new Date().toISOString().slice(0, 10)
  const [pageData, newsList, eventsList] = await Promise.all([
    safeFetch<{ sections?: Section[] | null }>(AWARDS_PAGE_QUERY),
    safeFetch<Array<{ headline: string; slug: string; publishedAt: string | null; excerpt: string | null }>>(NEWS_QUERY),
    safeFetch<Array<{ title: string; slug: string; startDate: string; category: string | null }>>(EVENTS_QUERY, { now }),
  ])
  const sections = pageData?.sections ?? []
  const articles = Array.isArray(newsList) ? newsList.filter((a) => a?.slug) : []
  const events = Array.isArray(eventsList) ? eventsList : []
  const filtered = events.filter((e) => {
    if (params.category && e.category !== params.category) return false
    if (params.month && String(new Date(e.startDate).getMonth() + 1) !== params.month) return false
    if (params.year && String(new Date(e.startDate).getFullYear()) !== params.year) return false
    return true
  })
  const categories = Array.from(new Set(events.map((e) => e.category).filter(Boolean))) as string[]
  const months = Array.from(new Set(events.map((e) => new Date(e.startDate).getMonth() + 1))).sort((a, b) => a - b)
  const years = Array.from(new Set(events.map((e) => new Date(e.startDate).getFullYear()))).sort((a, b) => a - b)

  const defaultTitle = 'Chapter Awards Program'
  const defaultSubtitle = 'Our annual chapter awards program recognizes companies and individuals for excellence in construction, safety, leadership and dedication to the association and the industry.'

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-navy transition-colors no-underline">About</a>
          <span>/</span>
          <a href="/about/awards-program" className="hover:text-navy transition-colors no-underline">Awards Program</a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <PageBuilderHero
            title={defaultTitle}
            subtitle={defaultSubtitle}
            backgroundImageUrl={null}
          />
          <section className="bg-cream py-16">
            <div className="container-site max-w-2xl text-center">
              <p className="font-body text-slate">
                Add sections in Sanity Studio (Awards Program Page) to build this page. Use the &quot;Tab Section&quot; for award categories.
              </p>
            </div>
          </section>
        </>
      ) : (
        sections.map((section, i) => {
          const key = section._key ?? `${section._type}-${i}`
          if (section._type === 'pageBuilderHero') {
            return (
              <PageBuilderHero
                key={key}
                title={section.title ?? defaultTitle}
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
          if (section._type === 'pageBuilderResourceLinks') {
            const groups: ResourceGroup[] = (section.resourceGroups ?? [])
              .filter((g): g is NonNullable<typeof g> => !!g?.title)
              .map((g) => ({
                title: g.title!,
                links: (g.links ?? [])
                  .filter((l): l is { label: string; url: string } => !!l?.label && !!l?.url)
                  .map((l) => ({ label: l.label, url: l.url })),
              }))
            return (
              <PageBuilderResourceLinks
                key={key}
                body={section.body ?? null}
                ctaLabel={section.ctaLabel ?? null}
                ctaHref={section.ctaHref ?? null}
                resourceGroups={groups}
              />
            )
          }
          if (section._type === 'pageBuilderStaffList') {
            const staffItems = (section.items ?? [])
              .filter((x): x is NonNullable<typeof x> => !!x?.name)
              .map((x) => ({
                name: x.name!,
                title: x.title ?? null,
                company: x.company ?? null,
                role: x.role ?? null,
              }))
            return (
              <PageBuilderStaffList
                key={key}
                heading={section.heading ?? ''}
                items={staffItems}
              />
            )
          }
          if (section._type === 'pageBuilderVideo' && section.videoUrl) {
            return (
              <PageBuilderVideo
                key={key}
                heading={section.heading ?? null}
                body={section.body ?? null}
                videoUrl={section.videoUrl}
              />
            )
          }
          if (section._type === 'pageBuilderCourseCard') {
            return (
              <PageBuilderCourseCard
                key={key}
                heading={section.heading ?? ''}
                body={section.body ?? null}
                details={section.details ?? null}
                ctaLabel={section.ctaLabel ?? null}
                ctaHref={section.ctaHref ?? null}
              />
            )
          }
          if (section._type === 'pageBuilderNewsGrid') {
            const limit = section.limit ?? 24
            const manualItems = section.items ?? []
            const gridArticles =
              manualItems.some((item) => item?.headline ?? item?.articleHeadline)
                ? manualItems
                    .filter((item) => item?.headline ?? item?.articleHeadline)
                    .map((item) => ({
                      headline: (item.headline ?? item.articleHeadline) ?? '',
                      slug: item.articleSlug ?? '',
                      publishedAt: item.publishedAt ?? item.articlePublishedAt ?? null,
                      excerpt: item.excerpt ?? item.articleExcerpt ?? null,
                      href: item.articleSlug ? `/news-media/${item.articleSlug}` : item.url ?? undefined,
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
          if (section._type === 'pageBuilderEventsList') {
            return (
              <EventsListSection
                key={key}
                events={events}
                filteredEvents={filtered}
                categories={categories}
                months={months.map((m) => ({ value: String(m), label: MONTH_NAMES[m] ?? '' }))}
                years={years.map((y) => ({ value: String(y), label: String(y) }))}
                currentCategory={params.category ?? ''}
                currentMonth={params.month ?? ''}
                currentYear={params.year ?? ''}
                heading={section.heading ?? null}
              />
            )
          }
          if (section._type === 'pageBuilderTabs') {
            const tabItems = (section.tabs ?? [])
              .filter((t): t is NonNullable<typeof t> => !!t?.title)
              .map((t) => ({
                title: t.title!,
                content: t.content ?? null,
                imageUrl: buildImageUrl(t.image) ?? null,
              }))
            return (
              <PageBuilderTabs
                key={key}
                heading={section.heading ?? 'Awards'}
                intro={section.intro ?? null}
                tabs={tabItems}
              />
            )
          }
          if (section._type === 'teamImageCardSection') {
            const cardItems = (section.items ?? [])
              .filter((i): i is NonNullable<typeof i> => !!i?.heading)
              .map((i) => ({
                imageUrl: buildImageUrl(i.image),
                heading: i.heading!,
                subheading: i.subheading ?? null,
                url: i.url ?? null,
              }))
            return (
              <TeamImageCardGrid
                key={key}
                section={{
                  sectionTitle: section.sectionTitle ?? '',
                  description: section.description ?? null,
                  columns: section.columns ?? '3',
                  ctaLabel: section.ctaLabel ?? null,
                  ctaHref: section.ctaHref ?? null,
                  items: cardItems,
                }}
              />
            )
          }
          if (section._type === 'pageBuilderAwardWinnersList') {
            const winnerItems = (section.items ?? [])
              .filter((i): i is NonNullable<typeof i> => !!i?.companyName)
              .map((i) => ({ companyName: i.companyName!, details: i.details ?? null }))
            return (
              <AwardWinnersListSection
                key={key}
                heading={section.heading ?? 'Award Winners'}
                items={winnerItems}
              />
            )
          }
          return null
        })
      )}

      <CTABandFromSanity />
    </>
  )
}
