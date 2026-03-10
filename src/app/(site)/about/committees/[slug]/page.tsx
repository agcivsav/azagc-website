import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import { safeFetch } from '@/lib/sanity'

const COMMITTEE_QUERY = `
*[_type == "committee" && slug.current == $slug][0]{
  _id,
  name,
  description,
  chair,
  meetingSchedule,
  body
}
`

type CommitteeDoc = {
  _id?: string
  name?: string | null
  description?: string | null
  chair?: string | null
  meetingSchedule?: string | null
  body?: unknown[]
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await safeFetch<CommitteeDoc>(COMMITTEE_QUERY, { slug })
  const title = data?.name ? `${data.name} | Committees` : 'Committee'
  return {
    title,
    description: data?.description ?? 'AZAGC committee. Learn how to get involved.',
  }
}

export default async function CommitteePage({ params }: Props) {
  const { slug } = await params
  const data = await safeFetch<CommitteeDoc>(COMMITTEE_QUERY, { slug })

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
            <div className="font-body text-slate prose prose-navy max-w-none">
              {/* TODO: <PortableText blocks={data.body} /> */}
              <p className="text-sm text-slate/80">Full committee details can be added here via Sanity block content.</p>
            </div>
          )}
          <Link
            href="/about/committees"
            className="inline-block font-body text-sm font-semibold text-red hover:text-navy transition-colors mt-6"
          >
            ← Back to Committees
          </Link>
        </div>
      </section>

      <CTABand />
    </>
  )
}
