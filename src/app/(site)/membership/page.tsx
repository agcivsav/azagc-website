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
  title: 'Membership | AZAGC',
  description: 'Join AZAGC — the Arizona Chapter of the Associated General Contractors of America. Contractor, Affiliate, and YCF membership options.',
  alternates: { canonical: 'https://www.azagc.org/membership/' },
}

const FAQS = [
  { question: 'What is AZAGC?', answer: 'AZAGC is the Arizona Chapter of the Associated General Contractors of America — the oldest and most respected construction trade association in Arizona, founded in 1934.' },
  { question: 'How do I join AZAGC?', answer: 'Fill out the membership inquiry form on this page. A membership coordinator will follow up within one business day with your custom membership proposal.' },
  { question: 'Are dues tax-deductible?', answer: 'Yes, AZAGC dues are generally tax-deductible as a business expense, minus the portion attributable to lobbying activities (disclosed annually).' },
  { question: 'Can a company have multiple members?', answer: 'Yes. Company membership covers all employees. Multiple staff members can attend events and use member resources under a single company membership.' },
]

const MEMBERSHIP_PAGE_QUERY = `*[_type == "membershipPage"][0]{
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

function MembershipStaticContent() {
  return (
    <>
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">Membership</p>
          <h1 className="font-normal text-4xl md:text-5xl text-white mb-4">AZAGC Membership</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">Join Arizona&apos;s oldest and most influential construction association. 500+ member firms. 90+ years of advocacy, education, and industry leadership.</p>
        </div>
      </section>
      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Three Ways to Join</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC offers membership for every company in the construction ecosystem. <strong>Contractor members</strong> include GCs, subcontractors, and specialty contractors. <strong>Affiliate members</strong> are suppliers, vendors, and service providers. <strong>Young Constructors Forum (YCF)</strong> members are construction professionals under 40 within member companies.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Why Join AZAGC?</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC is the only construction association in Arizona with full-time lobbyists at the Capitol, a DOL-registered apprenticeship program, and a 90-year track record of protecting contractor interests.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Membership Dues</h2>
            <p className="font-body text-base text-slate leading-relaxed">Contractor dues are revenue-based, starting at $800/year. Affiliate dues are $650/year flat. View our <a href="/membership/dues/" className="text-red hover:underline">full dues schedule</a> or <a href="/membership/benefits/" className="text-red hover:underline">all member benefits</a>.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl bg-navy p-7 mx-auto">
          <LeadForm source="membership-overview" headline="Request Membership Info" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>
      <FAQAccordion items={FAQS} />
    </>
  )
}

export default async function MembershipPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>
}) {
  const params = await searchParams
  const now = new Date().toISOString().slice(0, 10)
  const [pageData, newsList, eventsList] = await Promise.all([
    safeFetch<{ sections?: FullPageBuilderSection[] | null }>(MEMBERSHIP_PAGE_QUERY),
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
    defaultTitle: 'AZAGC Membership',
    defaultSubtitle: "Join Arizona's oldest and most influential construction association.",
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
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://www.azagc.org' }, { name: 'Membership', url: 'https://www.azagc.org/membership/' }]} />
      {sections.length === 0 ? <MembershipStaticContent /> : <FullPageBuilderSections sections={sections} context={context} />}
      <BottomCTA />
    </>
  )
}
