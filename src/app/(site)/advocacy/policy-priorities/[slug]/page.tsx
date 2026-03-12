import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import PageBuilderTextBlock from '@/components/sections/PageBuilderTextBlock'
import AwardWinnersListSection from '@/components/sections/AwardWinnersListSection'
import { safeFetch } from '@/lib/sanity'

const PRIORITY_QUERY = `
*[_type == "policyPriority" && slug.current == $slug][0]{
  _id,
  title,
  description,
  sections[]{
    _type,
    _key,
    heading,
    body,
    ctaLabel,
    ctaHref,
    items[] { companyName, details }
  }
}
`

type SectionItem = {
  _type: string
  _key?: string
  heading?: string | null
  body?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  items?: Array<{ companyName?: string | null; details?: string | null }> | null
}

type PriorityDoc = {
  _id?: string
  title?: string | null
  description?: string | null
  sections?: SectionItem[] | null
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await safeFetch<PriorityDoc>(PRIORITY_QUERY, { slug })
  const title = data?.title ? `${data.title} | Policy Priorities` : ''
  return {
    title,
    description: data?.description ?? '',
  }
}

export default async function PolicyPriorityPage({ params }: Props) {
  const { slug } = await params
  const data = await safeFetch<PriorityDoc>(PRIORITY_QUERY, { slug })

  if (!data?.title) notFound()

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link href="/" className="hover:text-navy transition-colors no-underline">Home</Link>
          <span>/</span>
          <Link href="/advocacy" className="hover:text-navy transition-colors no-underline">Advocacy</Link>
          <span>/</span>
          <Link href="/advocacy/policy-priorities" className="hover:text-navy transition-colors no-underline">
            Policy Priorities
          </Link>
          <span>/</span>
          <span className="text-slate line-clamp-1">{data.title}</span>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">Advocacy</SectionLabel>
          <SectionTitle as="h1" className="text-white">{data.title}</SectionTitle>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-site max-w-3xl">
          {data.description ? (
            <div className="prose prose-navy max-w-none">
              <p className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
                {data.description}
              </p>
            </div>
          ) : (
            <p className="font-body text-slate">No description available.</p>
          )}
          <Link
            href="/advocacy/policy-priorities"
            className="inline-block font-body text-sm font-semibold text-red hover:text-navy transition-colors mt-8"
          >
            ← Back to Policy Priorities
          </Link>
        </div>
      </section>

      {Array.isArray(data.sections) &&
        data.sections.map((section) => {
          if (section._type === 'pageBuilderTextBlock' && section.heading) {
            return (
              <PageBuilderTextBlock
                key={section._key ?? section._type}
                heading={section.heading}
                body={section.body}
                ctaLabel={section.ctaLabel}
                ctaHref={section.ctaHref}
              />
            )
          }
          if (section._type === 'pageBuilderAwardWinnersList') {
            const items = (section.items ?? []).map((i) => ({
              companyName: i.companyName ?? '',
              details: i.details ?? null,
            }))
            return (
              <AwardWinnersListSection
                key={section._key ?? section._type}
                heading={section.heading ?? 'Award Winners'}
                items={items}
              />
            )
          }
          return null
        })}

      <CTABandFromSanity />
    </>
  )
}
