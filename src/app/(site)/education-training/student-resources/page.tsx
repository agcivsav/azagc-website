import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import BottomCTA from '@/components/sections/BottomCTA'
import PageBuilderHero from '@/components/sections/PageBuilderHero'
import PageBuilderTextBlock from '@/components/sections/PageBuilderTextBlock'
import PageBuilderTwoColumn from '@/components/sections/PageBuilderTwoColumn'
import PageBuilderTwoImages from '@/components/sections/PageBuilderTwoImages'
import PageBuilderStaffList from '@/components/sections/PageBuilderStaffList'
import PageBuilderVideo from '@/components/sections/PageBuilderVideo'
import { safeFetch, urlFor } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Student Resources',
  description:
    'Student resources and scholarship opportunities through AZAGC — university chapters, career matching events, and AGC Education Foundation scholarships.',
}

const PAGE_QUERY = `
*[_type == "studentResourcesPage"][0]{
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
    items[]{ name, title, company, role },
    videoUrl
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
  ctaLabel?: string | null
  ctaHref?: string | null
  imagePosition?: string | null
  image?: unknown
  leftImage?: unknown
  rightImage?: unknown
  leftCaption?: string | null
  rightCaption?: string | null
  ctas?: Array<{ label?: string | null; href?: string | null }> | null
  items?: Array<{ name?: string | null; title?: string | null; company?: string | null; role?: string | null }> | null
  videoUrl?: string | null
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

export default async function StudentResourcesPage() {
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
          <a href="/education-training/student-resources" className="hover:text-navy transition-colors no-underline">
            Student Resources
          </a>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <PageBuilderHero
            title="Student Resources"
            subtitle="Opportunities to enhance the student learning experience — chapters, scholarships, and career events."
          />
          <section className="bg-cream py-16">
            <div className="container-site max-w-2xl text-center">
              <p className="font-body text-slate">
                Add sections in Sanity Studio (Student Resources Page) to build this page.
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
                title={section.title ?? 'Student Resources'}
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
          if (section._type === 'pageBuilderStaffList') {
            const items = (section.items ?? [])
              .filter((p): p is { name: string; title?: string | null; company?: string | null; role?: string | null } => !!p?.name)
              .map((p) => ({ name: p.name, title: p.title ?? null, company: p.company ?? null, role: p.role ?? null }))
            return (
              <PageBuilderStaffList key={key} heading={section.heading ?? ''} items={items} />
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
          return null
        })
      )}

      <CTABand />
      <BottomCTA source="student-resources" />
    </>
  )
}
