import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import PolicyPrioritiesSection from '@/components/sections/PolicyPrioritiesSection'
import type { PolicyPriorityItem } from '@/components/sections/PolicyPrioritiesSection'
import { safeFetch } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Policy Priorities',
  description:
    "AZAGC's legislative priorities for Arizona — infrastructure, workforce, environment, and more. Where we stand on key issues.",
}

const PAGE_QUERY = `
*[_type == "policyPrioritiesPage"][0]{
  heroHeadline,
  heroSubtitle,
  sectionTitle,
  sectionIntro
}
`

const PRIORITIES_QUERY = `
*[_type == "policyPriority" && active != false && defined(slug.current)] | order(displayOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  description
}
`

type PolicyPrioritiesPageData = {
  heroHeadline?: string | null
  heroSubtitle?: string | null
  sectionTitle?: string | null
  sectionIntro?: string | null
} | null

type PriorityDoc = {
  _id?: string | null
  title?: string | null
  slug?: string | null
  description?: string | null
}

export default async function PolicyPrioritiesPage() {
  const [pageData, priorityDocs] = await Promise.all([
    safeFetch<PolicyPrioritiesPageData>(PAGE_QUERY),
    safeFetch<PriorityDoc[]>(PRIORITIES_QUERY),
  ])

  const headline = pageData?.heroHeadline ?? ''
  const subtitle =
    pageData?.heroSubtitle ??
    ""
  const sectionTitle = pageData?.sectionTitle ?? ''
  const sectionIntro = pageData?.sectionIntro ?? null

  const priorities: PolicyPriorityItem[] = Array.isArray(priorityDocs)
    ? priorityDocs
        .filter((p): p is PriorityDoc => !!p?.title && !!p?.slug)
        .map((p) => ({
          _id: p._id ?? '',
          title: p.title!,
          slug: p.slug!,
          description: p.description ?? null,
        }))
    : []

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/advocacy" className="hover:text-navy transition-colors no-underline">Advocacy</a>
          <span>/</span>
          <a href="/advocacy/policy-priorities" className="hover:text-navy transition-colors no-underline">
            Policy Priorities
          </a>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">Advocacy</SectionLabel>
          <SectionTitle as="h1" className="text-white">{headline}</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{subtitle}</p>
        </div>
      </section>

      <PolicyPrioritiesSection
        sectionTitle={sectionTitle}
        sectionIntro={sectionIntro}
        priorities={priorities}
      />

      <CTABandFromSanity />
    </>
  )
}
