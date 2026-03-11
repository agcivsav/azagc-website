import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import FullPageBuilderSections, {
  type FullPageBuilderSection,
  type FullPageBuilderContext,
} from '@/components/sections/FullPageBuilderSections'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Legislative Advocacy for Arizona Contractors | AZAGC',
  description: 'AZAGC advocates for Arizona contractors at the state Capitol and in Washington D.C. Legislative priorities, policy updates, and tools to make your voice heard.',
  alternates: { canonical: 'https://www.azagc.org/advocacy/' },
}

const FAQS = [
  { question: 'How does AZAGC advocacy benefit my business?', answer: "AZAGC's lobbying has produced real wins for Arizona contractors — protecting lien rights, defeating costly mandates, securing infrastructure funding, and shaping licensing policy." },
  { question: 'How can I get involved in AZAGC advocacy?', answer: 'AZAGC members can participate through our Government Affairs Committee, attend advocacy days at the Capitol, use our voter tools, and receive legislative action alerts.' },
  { question: 'Does AZAGC endorse political candidates?', answer: 'AZAGC does not endorse candidates for elected office. We engage with elected officials of all parties based on their position on construction industry issues.' },
  { question: "Can I donate to AZAGC's political efforts?", answer: 'AZAGC maintains a Political Action Committee (PAC) that allows members to voluntarily support candidates who champion construction industry priorities. Visit our Contribute page for details.' },
]

const ADVOCACY_PAGE_QUERY = `*[_type == "advocacyPage"][0]{
  sections[]{
    _type, _key,
    title, subtitle, backgroundImage,
    heading, body, ctaLabel, ctaHref,
    imagePosition, image, leftImage, rightImage, leftCaption, rightCaption,
    ctas[]{ label, href },
    resourceGroups[]{ title, links[]{ label, url } },
    items[]{ name, title, company, role, headline, publishedAt, excerpt, "articleSlug": article->slug.current, "articleHeadline": article->headline, "articlePublishedAt": article->publishedAt, "articleExcerpt": article->excerpt, url, image, heading, subheading, companyName, details },
    videoUrl, details, limit,
    sectionTitle, description, columns, ctaLabel, ctaHref,
    intro, tabs[]{ title, content, image }
  }
}`

const NEWS_QUERY = `*[_type == "newsArticle"] | order(publishedAt desc)[0...50]{ headline, "slug": slug.current, publishedAt, excerpt }`
const EVENTS_QUERY = `*[_type == "event" && startDate >= $now] | order(startDate asc){ title, "slug": slug.current, startDate, category }`

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

function AdvocacyStaticContent() {
  return (
    <>
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">Advocacy</p>
          <h1 className="font-normal text-4xl md:text-5xl text-white mb-4">Advocacy for Arizona Contractors</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">AZAGC employs full-time lobbyists at the Arizona Capitol and maintains a presence in Washington D.C. — fighting year-round to protect contractor interests and advance the industry.</p>
        </div>
      </section>
      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Why Advocacy Matters for Contractors</h2>
            <p className="font-body text-base text-slate leading-relaxed">Every session, the Arizona Legislature considers hundreds of bills that affect contractors. AZAGC makes sure contractor interests are not overlooked.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Our Legislative Priorities</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC current legislative priorities include: protecting contractor lien rights and prompt payment protections; opposing excessive bonding and insurance mandates; advocating for infrastructure investment; supporting apprenticeship and workforce development funding.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Federal Advocacy Through AGC of America</h2>
            <p className="font-body text-base text-slate leading-relaxed">Through our partnership with AGC of America, AZAGC members have a voice in Washington D.C. on federal issues including the Davis-Bacon Act, OSHA regulations, federal contracting thresholds, and infrastructure funding.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl bg-navy p-7 mx-auto">
          <LeadForm source="advocacy-page" headline="Stay Connected on Advocacy" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>
      <FAQAccordion items={FAQS} />
    </>
  )
}

export default async function AdvocacyPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>
}) {
  const params = await searchParams
  const now = new Date().toISOString().slice(0, 10)
  const [pageData, newsList, eventsList] = await Promise.all([
    safeFetch<{ sections?: FullPageBuilderSection[] | null }>(ADVOCACY_PAGE_QUERY),
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

  const context: FullPageBuilderContext = {
    buildImageUrl,
    defaultTitle: 'Advocacy for Arizona Contractors',
    defaultSubtitle: 'AZAGC employs full-time lobbyists at the Arizona Capitol and maintains a presence in Washington D.C.',
    articles,
    events,
    filtered,
    categories,
    months: months.map((m) => ({ value: String(m), label: MONTH_NAMES[m] ?? '' })),
    years: years.map((y) => ({ value: String(y), label: String(y) })),
    searchParams: params,
  }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://www.azagc.org' }, { name: 'Advocacy', url: 'https://www.azagc.org/advocacy/' }]} />
      {sections.length === 0 ? <AdvocacyStaticContent /> : <FullPageBuilderSections sections={sections} context={context} />}
      <BottomCTA />
    </>
  )
}
