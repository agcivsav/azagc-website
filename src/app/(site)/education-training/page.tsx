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
  title: 'Education & Training for Arizona Contractors | AZAGC',
  description: 'AZAGC education and training programs for Arizona contractors — OSHA 10 & 30, construction apprenticeship, management development, and AGC of America courses.',
  alternates: { canonical: 'https://www.azagc.org/education-training/' },
}

const FAQS = [
  { question: 'Are training programs only for AZAGC members?', answer: 'Most programs are open to both members and non-members, though member companies receive significantly discounted rates — often saving $200+ per participant on OSHA courses.' },
  { question: 'Do you offer on-site training at my jobsite?', answer: 'Yes. AZAGC can arrange on-site OSHA training and safety programs for member companies with sufficient participant numbers. Contact us to discuss scheduling.' },
  { question: 'How do I register for a training program?', answer: 'Fill out the form on this page and our training coordinator will send you the current schedule and registration information.' },
  { question: 'Does AZAGC offer bilingual training?', answer: 'Yes. Many of our OSHA training courses are available in both English and Spanish.' },
]

const EDUCATION_PAGE_QUERY = `*[_type == "educationTrainingPage"][0]{
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

function EducationStaticContent() {
  return (
    <>
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-primary mb-3">Education & Training</p>
          <h1 className="font-normal text-4xl md:text-5xl text-white mb-4">Education & Training</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">From OSHA certifications to management development to DOL-registered apprenticeships — AZAGC delivers the workforce training Arizona contractors need.</p>
        </div>
      </section>
      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Safety Training</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC partners with OSHA-authorized trainers to deliver OSHA 10-Hour and OSHA 30-Hour Construction courses throughout Arizona. View our <a href="/education-training/osha-training/" className="text-red hover:underline">OSHA training page</a> for the current schedule.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">Apprenticeship Programs</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC operates Registered Apprenticeship programs in multiple construction trades. Learn more about our <a href="/education-training/construction-apprenticeship-arizona/" className="text-red hover:underline">construction apprenticeship programs</a>.</p>
          </div>
          <div>
            <h2 className="font-normal text-2xl text-navy mb-3">AGC of America Education</h2>
            <p className="font-body text-base text-slate leading-relaxed">As an AGC chapter, AZAGC members have full access to AGC of America&apos;s extensive education catalog — including Supervisory Training Program (STP), Project Manager Development Program (PMDP), and leadership courses.</p>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl bg-navy p-7 mx-auto">
          <LeadForm source="education-overview" headline="Request Training Information" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>
      <FAQAccordion items={FAQS} />
    </>
  )
}

export default async function EducationTrainingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>
}) {
  const params = await searchParams
  const now = new Date().toISOString().slice(0, 10)
  const [pageData, newsList, eventsList] = await Promise.all([
    safeFetch<{ sections?: FullPageBuilderSection[] | null }>(EDUCATION_PAGE_QUERY),
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
    defaultTitle: 'Education & Training',
    defaultSubtitle: 'From OSHA certifications to management development to DOL-registered apprenticeships.',
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
      <BreadcrumbJsonLd items={[{ name: 'Home', url: 'https://www.azagc.org' }, { name: 'Education Training', url: 'https://www.azagc.org/education-training/' }]} />
      {sections.length === 0 ? <EducationStaticContent /> : <FullPageBuilderSections sections={sections} context={context} />}
      <BottomCTA />
    </>
  )
}
