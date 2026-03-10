import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import TestimonialsSection, { type TestimonialsByCategory } from '@/components/sections/TestimonialsSection'
import type { TestimonialItem } from '@/components/sections/TestimonialCard'
import { safeFetch, urlFor } from '@/lib/sanity'

const TESTIMONIAL_CATEGORY_VALUES = [
  'contractors',
  'affiliates',
  'ycf',
  'industry-partners',
] as const

export const metadata: Metadata = {
  title: 'Member Testimonials',
  description:
    'Hear from AZAGC members and industry partners about the value of our services and the construction association of choice in Arizona.',
}

const PAGE_QUERY = `
*[_type == "testimonialsPage"][0]{
  heroHeadline,
  heroSubtitle
}
`

const TESTIMONIALS_QUERY = `
*[_type == "testimonial" && defined(category)] | order(displayOrder asc, personName asc) {
  _id,
  quote,
  personName,
  personTitle,
  companyName,
  companyLogo,
  category
}
`

type TestimonialsPageData = {
  heroHeadline?: string | null
  heroSubtitle?: string | null
} | null

type TestimonialDoc = {
  _id?: string | null
  quote?: string | null
  personName?: string | null
  personTitle?: string | null
  companyName?: string | null
  companyLogo?: unknown
  category?: string | null
}

function buildLogoUrl(logo: unknown): string | null {
  if (!logo || typeof logo !== 'object') return null
  try {
    const url = urlFor(logo).width(200).height(120).fit('max').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

function groupByCategory(docs: TestimonialDoc[]): TestimonialsByCategory {
  const out: TestimonialsByCategory = {}
  for (const value of TESTIMONIAL_CATEGORY_VALUES) {
    out[value] = []
  }
  for (const doc of docs) {
    const category = doc.category
    if (!category || !out[category]) continue
    const item: TestimonialItem = {
      _id: doc._id ?? '',
      quote: doc.quote ?? '',
      personName: doc.personName ?? '',
      personTitle: doc.personTitle ?? null,
      companyName: doc.companyName ?? null,
      logoUrl: buildLogoUrl(doc.companyLogo),
    }
    out[category].push(item)
  }
  return out
}

export default async function TestimonialsPage() {
  const [pageData, testimonialDocs] = await Promise.all([
    safeFetch<TestimonialsPageData>(PAGE_QUERY),
    safeFetch<TestimonialDoc[]>(TESTIMONIALS_QUERY),
  ])

  const headline = pageData?.heroHeadline ?? 'We Are The Construction Association Of Choice In Arizona'
  const subtitle =
    pageData?.heroSubtitle ??
    'We work hard to build and sustain trust and credibility as the oldest and most influential construction association. Read what some of our satisfied members and industry partners say about the value of our services, and the continuous improvements we make to the construction industry.'

  const docs = Array.isArray(testimonialDocs) ? testimonialDocs : []
  const testimonialsByCategory = groupByCategory(docs)

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/about" className="hover:text-navy transition-colors no-underline">About</a>
          <span>/</span>
          <a href="/about/testimonials" className="hover:text-navy transition-colors no-underline">
            Testimonials
          </a>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">
            About
          </SectionLabel>
          <SectionTitle as="h1" className="text-white">
            {headline}
          </SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{subtitle}</p>
        </div>
      </section>

      <TestimonialsSection testimonialsByCategory={testimonialsByCategory} />

      <CTABand />
    </>
  )
}
