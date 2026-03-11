import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import BottomCTA from '@/components/sections/BottomCTA'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import PageBuilderCourseCard from '@/components/sections/PageBuilderCourseCard'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Erosion Control Coordinator Training',
  description:
    'Erosion Control Coordinator (ECC) training and certification for Arizona contractors — 16-hour in-person, 6-hour online refresher, and commercial construction courses.',
}

const PAGE_QUERY = `
*[_type == "erosionControlTrainingPage"][0]{
  sections[]{
    _type,
    _key,
    title,
    subtitle,
    backgroundImage,
    heading,
    body,
    details,
    ctaLabel,
    ctaHref
  }
}
`

type SectionItem = {
  _type: string
  _key?: string
  title?: string | null
  subtitle?: string | null
  backgroundImage?: unknown
  heading?: string | null
  body?: string | null
  details?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

type PageData = { sections?: SectionItem[] | null } | null

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(1200).height(800).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

export default async function ErosionControlCoordinatorTrainingPage() {
  const data = await safeFetch<PageData>(PAGE_QUERY)
  const sections = data?.sections ?? []

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span>
          <a href="/education-training" className="hover:text-navy transition-colors no-underline">
            Education & Training
          </a>
          <span>/</span>
          <a href="/education-training/erosion-control-coordinator-training" className="hover:text-navy transition-colors no-underline">
            Erosion Control Coordinator Training
          </a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <PageBuilderHero
            title="Erosion Control Coordinator Training"
            subtitle="ECC training and certification for Arizona contractors."
          />
          <section className="bg-cream py-16">
            <div className="container-site max-w-2xl text-center">
              <p className="font-body text-slate">
                Add sections in Sanity Studio (Erosion Control Coordinator Training Page) to build this page. Add a Hero, then one or more Course cards.
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
                title={section.title ?? 'Erosion Control Coordinator Training'}
                subtitle={section.subtitle ?? null}
                backgroundImageUrl={buildImageUrl(section.backgroundImage)}
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
                alternateBg={i % 2 === 1}
              />
            )
          }
          return null
        })
      )}

      <CTABand />
      <BottomCTA source="erosion-control" />
    </>
  )
}
