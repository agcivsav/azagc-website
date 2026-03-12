import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
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
  title: 'About AZAGC | Arizona Chapter AGC Since 1934',
  description:
    'Learn about AZAGC — the Arizona Chapter of the Associated General Contractors of America. Our history, mission, leadership, and impact since 1934.',
  alternates: { canonical: 'https://www.azagc.org/about/' },
}

const FAQS = [
  { question: 'What does AZAGC stand for?', answer: 'AZAGC stands for Arizona Chapter of the Associated General Contractors of America. We are the Arizona affiliate of the national AGC organization.' },
  { question: 'Where is AZAGC located?', answer: 'AZAGC is located at 1825 W. Adams St., Phoenix, AZ 85007. You can reach us by phone at (602) 252-3926.' },
  { question: 'How is AZAGC different from other construction associations?', answer: 'AZAGC is the only Arizona construction association with full-time Capitol lobbyists, a DOL-registered apprenticeship program, and 90 years of continuous operation. We are part of the AGC of America national network with 27,000+ member companies.' },
  { question: 'Is AZAGC a nonprofit?', answer: 'Yes. AZAGC is a nonprofit trade association organized under Section 501(c)(6) of the Internal Revenue Code.' },
]

const ABOUT_PAGE_QUERY = `
*[_type == "aboutPage"][0]{
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
  ctaLabel?: string | null
  ctaHref?: string | null
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

function AboutStaticContent() {
  return (
    <>
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">About</p>
          <h1 className="font-normal text-4xl md:text-5xl text-white mb-4">About AZAGC</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Arizona&apos;s oldest construction association, founded in 1934. For 90+ years, AZAGC has been the voice of Arizona contractors — advocating, educating, and building community.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Our History</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC was founded in 1934 as the Arizona Chapter of the Associated General Contractors of America — part of the national AGC network established in 1918. For over 90 years, AZAGC has represented Arizona contractors through economic booms and downturns, legislative battles and infrastructure surges. We have been here for every chapter of Arizona&apos;s built environment.
            </p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Our Mission</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC&apos;s mission is to support the construction industry through advocacy, education, and building community. We exist to give Arizona contractors a unified voice in the political process, develop the workforce the industry needs, and create the relationships that make Arizona construction a community — not just a market.
            </p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Our Impact</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC represents 500+ member companies responsible for over $1 billion in annual construction volume across Arizona. Our members build the infrastructure, commercial facilities, and public works that make Arizona function. Our apprenticeship programs have trained thousands of Arizona tradespeople. Our advocacy has produced hundreds of legislative wins.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl bg-navy p-7 mx-auto">
          <LeadForm source="about-page" headline="Questions? Talk to Our Team." subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
    </>
  )
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>
}) {
  const params = await searchParams
  const now = new Date().toISOString().slice(0, 10)
  const [pageData, newsList, eventsList] = await Promise.all([
    safeFetch<{ sections?: Section[] | null }>(ABOUT_PAGE_QUERY),
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

  const defaultTitle = 'About AZAGC'
  const defaultSubtitle = "Arizona's oldest construction association, founded in 1934. For 90+ years, AZAGC has been the voice of Arizona contractors."

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'About', url: 'https://www.azagc.org/about/' },
        ]}
      />

      {sections.length === 0 ? (
        <AboutStaticContent />
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
                heading={section.heading ?? ""}
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
                heading={section.heading ?? ''}
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
                heading={section.heading ?? ''}
                items={winnerItems}
              />
            )
          }
          return null
        })
      )}

      <BottomCTA />
    </>
  )
}
