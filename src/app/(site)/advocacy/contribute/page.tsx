import type { Metadata } from 'next'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import ContributionForm from '@/components/forms/ContributionForm'
import { safeFetch } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Contribute',
  description:
    "Support AZAGC's political action committee to elect pro-construction candidates in Arizona.",
}

const PAGE_QUERY = `
*[_type == "contributePage"][0]{
  heroTitle,
  heroSubtitle,
  body,
  formHeadline,
  formSubheadline,
  formSubmitLabel
}
`

type ContributePageData = {
  heroTitle?: string | null
  heroSubtitle?: string | null
  body?: string | null
  formHeadline?: string | null
  formSubheadline?: string | null
  formSubmitLabel?: string | null
} | null

export default async function ContributePage() {
  const data = await safeFetch<ContributePageData>(PAGE_QUERY)

  const heroTitle = data?.heroTitle ?? 'Contribute'
  const heroSubtitle =
    data?.heroSubtitle ??
    "Support AZAGC's political action committee to elect pro-construction candidates in Arizona."
  const body =
    data?.body ??
    "The AZAGC Political Action Committee (PAC) was established to allow us to pool voluntary contributions to help elect candidates who support construction industry priorities. The AZAGC PAC is non-partisan in its support of candidates. Please note: The AZAGC PAC accepts contributions from individuals only. By law, corporations cannot make contributions to the AZAGC PAC. Contributions to the AZAGC PAC are not tax deductible."
  const formHeadline = data?.formHeadline ?? 'Make a Contribution'
  const formSubheadline =
    data?.formSubheadline ?? "Complete the form below and we'll follow up with contribution details and options."
  const formSubmitLabel = data?.formSubmitLabel ?? 'Submit →'

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/advocacy" className="hover:text-navy transition-colors no-underline">Advocacy</a>
          <span>/</span>
          <a href="/advocacy/contribute" className="hover:text-navy transition-colors no-underline">
            Contribute
          </a>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">Advocacy</SectionLabel>
          <SectionTitle as="h1" className="text-white">{heroTitle}</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{heroSubtitle}</p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="prose prose-navy max-w-none">
            <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
              {body}
            </div>
          </div>
          <div className="bg-navy border border-white/20 p-7 rounded-sm">
            <ContributionForm
              headline={formHeadline}
              subheadline={formSubheadline}
              submitLabel={formSubmitLabel}
              dark
            />
          </div>
        </div>
      </section>

      <CTABandFromSanity />
    </>
  )
}
