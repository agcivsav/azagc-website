import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import PortableText from '@/components/ui/PortableText'
import { safeFetch, urlFor } from '@/lib/sanity'

const COMMITTEE_QUERY = `
*[_type == "committee" && (slug.current == $slug || slug.current == $slugWithSlash)][0]{
  _id,
  name,
  description,
  chair,
  meetingSchedule,
  body,
  sections[]{
    _type,
    _key,
    heading,
    body,
    items[]{
      image,
      heading,
      description,
      url
    },
    leftHeading,
    leftDescription,
    leftDatesHeading,
    leftDates,
    rightHeading,
    rightBody,
    rightLinks[]{ label, url }
  }
}
`

type CommitteeSection =
  | { _type: 'committeeTextBlock'; _key?: string; heading?: string | null; body?: string | null }
  | {
      _type: 'committeeGridSection'
      _key?: string
      items?: Array<{ image?: unknown; heading?: string | null; description?: string | null; url?: string | null }> | null
    }
  | {
      _type: 'committeeMeetingInfoResources'
      _key?: string
      leftHeading?: string | null
      leftDescription?: string | null
      leftDatesHeading?: string | null
      leftDates?: string[] | null
      rightHeading?: string | null
      rightBody?: string | null
      rightLinks?: Array<{ label?: string | null; url?: string | null }> | null
    }

type CommitteeDoc = {
  _id?: string
  name?: string | null
  description?: string | null
  chair?: string | null
  meetingSchedule?: string | null
  body?: string | null
  sections?: CommitteeSection[] | null
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const raw = await (await import('@/lib/sanity')).safeFetch<unknown>(
    `*[_type == "committee"].slug`
  )
  const slugs = Array.isArray(raw) ? raw : []
  const safe = slugs.filter(
    (s): s is { current: string } =>
      s != null && typeof (s as { current?: unknown }).current === 'string'
  )
  return safe
    .map((s) => ({ slug: (s.current || '').replace(/\/$/, '') }))
    .filter((p) => p.slug.length > 0)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const slugNorm = (slug || '').replace(/\/$/, '')
  const data = await safeFetch<CommitteeDoc>(COMMITTEE_QUERY, { slug: slugNorm, slugWithSlash: slugNorm + '/' })
  const title = data?.name ? `${data.name} | Committees` : 'Committee'
  return {
    title,
    description: data?.description ?? 'AZAGC committee. Learn how to get involved.',
  }
}

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  try {
    const url = urlFor(image).width(600).height(400).fit('crop').url()
    return typeof url === 'string' && url.startsWith('http') ? url : null
  } catch {
    return null
  }
}

export default async function CommitteePage({ params }: Props) {
  const { slug } = await params
  const slugNorm = (slug || '').replace(/\/$/, '')
  const data = await safeFetch<CommitteeDoc>(COMMITTEE_QUERY, { slug: slugNorm, slugWithSlash: slugNorm + '/' })
  if (!data?.name) notFound()

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link href="/" className="hover:text-navy transition-colors no-underline">Home</Link>
          <span>/</span>
          <Link href="/about" className="hover:text-navy transition-colors no-underline">About</Link>
          <span>/</span>
          <Link href="/about/committees" className="hover:text-navy transition-colors no-underline">Committees</Link>
          <span>/</span>
          <span className="text-slate">{data.name}</span>
        </div>
      </div>

      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">About</SectionLabel>
          <SectionTitle as="h1" className="text-white">{data.name}</SectionTitle>
          {data.description && (
            <p className="font-body text-white/60 mt-3 max-w-2xl text-base">{data.description}</p>
          )}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-site max-w-3xl">
          {(data.chair || data.meetingSchedule) && (
            <div className="bg-white border border-warm-gray rounded-xl p-6 mb-8">
              {data.chair && (
                <p className="font-body text-slate">
                  <span className="font-semibold text-navy">Chair:</span> {data.chair}
                </p>
              )}
              {data.meetingSchedule && (
                <p className="font-body text-slate mt-2">
                  <span className="font-semibold text-navy">Meeting schedule:</span> {data.meetingSchedule}
                </p>
              )}
            </div>
          )}
          {data.body && Array.isArray(data.body) && data.body.length > 0 && (
            <div className="font-body text-slate prose prose-navy max-w-none mb-10">
              <PortableText value={data.body} />
            </div>
          )}

          {(data.sections ?? []).map((section, i) => {
            const key = section._key ?? `${section._type}-${i}`
            if (section._type === 'committeeTextBlock') {
              return (
                <div key={key} className="mb-10">
                  {section.heading && (
                    <h2 className="font-normal text-2xl text-navy mb-4">{section.heading}</h2>
                  )}
                  {section.body && (
                    <p className="font-body text-slate leading-relaxed whitespace-pre-wrap">{section.body}</p>
                  )}
                </div>
              )
            }
            if (section._type === 'committeeGridSection' && section.items?.length) {
              return (
                <div key={key} className="mb-10">
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((item, j) => {
                      const imgUrl = buildImageUrl(item.image)
                      const href = item.url && item.url.startsWith('http') ? item.url : null
                      const cardContent = (
                        <div className="h-full flex flex-col">
                          {imgUrl && (
                            <div className="relative aspect-video shrink-0">
                              <Image
                                src={imgUrl}
                                alt={item.heading ?? ''}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                          )}
                          <div className="p-4 flex-grow">
                            {item.heading && (
                              <h3 className="font-semibold text-navy mb-2">{item.heading}</h3>
                            )}
                            {item.description && (
                              <p className="font-body text-sm text-slate leading-relaxed">{item.description}</p>
                            )}
                          </div>
                        </div>
                      )
                      return (
                        <li key={j} className="bg-white rounded-xl border border-warm-gray overflow-hidden transition-all hover:shadow-lg hover:border-red/30">
                          {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="block no-underline text-inherit h-full">
                              {cardContent}
                            </a>
                          ) : (
                            cardContent
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            }
            if (section._type === 'committeeMeetingInfoResources') {
              const leftDates = section.leftDates ?? []
              const rightLinks = (section.rightLinks ?? []).filter((l): l is { label: string; url: string } => !!l?.label && !!l?.url)
              return (
                <div key={key} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-warm-gray/30 rounded-xl p-6">
                    {section.leftHeading && (
                      <h2 className="font-normal text-xl text-navy mb-3 pb-2 border-b border-navy/20">
                        {section.leftHeading}
                      </h2>
                    )}
                    {section.leftDescription && (
                      <p className="font-body text-slate text-sm mb-4">{section.leftDescription}</p>
                    )}
                    {section.leftDatesHeading && (
                      <p className="font-semibold text-navy text-sm mb-2">{section.leftDatesHeading}</p>
                    )}
                    {leftDates.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 font-body text-slate text-sm">
                        {leftDates.map((line, k) => (
                          <li key={k}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="bg-white rounded-xl border border-warm-gray p-6">
                    {section.rightHeading && (
                      <h2 className="font-normal text-xl text-navy mb-3 pb-2 border-b border-navy/20">
                        {section.rightHeading}
                      </h2>
                    )}
                    {section.rightBody && (
                      <p className="font-body text-slate text-sm mb-4 whitespace-pre-wrap">{section.rightBody}</p>
                    )}
                    {rightLinks.length > 0 && (
                      <ul className="space-y-2">
                        {rightLinks.map((link, k) => (
                          <li key={k}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-red hover:text-navy">
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            }
            return null
          })}

          <Link
            href="/about/committees"
            className="inline-block font-body text-sm font-semibold text-red hover:text-navy transition-colors mt-6"
          >
            ← Back to Committees
          </Link>
        </div>
      </section>

      <CTABandFromSanity />
    </>
  )
}
