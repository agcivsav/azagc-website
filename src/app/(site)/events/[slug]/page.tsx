import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFetch } from '@/lib/sanity'
import { EventJsonLd } from '@/components/seo/JsonLd'
import { formatEventDate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import LeadForm from '@/components/forms/LeadForm'
import CTABand from '@/components/sections/CTABand'

export async function generateStaticParams() {
  try {
    const slugs: Array<{current: string}> = await (await import('@/lib/sanity')).safeFetch(
      `*[_type == "event"].slug`
    ) || []
    return slugs.map((s) => ({ slug: s.current }))
  } catch {
    return []
  }
}


interface Event {
  _id: string
  title: string
  slug: { current: string }
  startDate: string
  endDate?: string
  location?: string
  locationUrl?: string
  excerpt?: string
  registrationUrl?: string
  category?: string
  membersOnly?: boolean
}

async function getEvent(slug: string): Promise<Event | null> {
  return safeFetch(`*[_type == "event" && slug.current == $slug][0]`, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: 'Event Not Found' }
  return {
    title: event.title,
    description: event.excerpt || `${event.title} — AZAGC event in ${event.location || 'Arizona'}.`,
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()

  const date = formatEventDate(event.startDate)

  return (
    <>
      <EventJsonLd
        name={event.title}
        startDate={event.startDate}
        endDate={event.endDate}
        location={event.location}
        description={event.excerpt}
        url={`https://www.azagc.org/events/${slug}`}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy no-underline">Home</a>
          <span>/</span>
          <a href="/events" className="hover:text-navy no-underline">Events</a>
          <span>/</span>
          <span>{event.title}</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <div className="flex items-start gap-6">
            {/* Date box */}
            <div className="bg-teal px-5 py-4 text-center shrink-0 min-w-[72px]">
              <div className="font-body font-bold text-xs uppercase tracking-wide text-gold">{date.month}</div>
              <div className="font-display text-3xl text-white">{date.day}</div>
            </div>
            <div>
              {event.category && (
                <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-gold mb-2">{event.category}</p>
              )}
              <h1 className="font-display text-3xl sm:text-4xl text-white mb-3">{event.title}</h1>
              {event.location && (
                <p className="font-body text-white/60 text-sm">{event.location} · {date.full}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-16">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="font-body text-slate leading-relaxed mb-8">{event.excerpt}</p>
            {/* TODO: <PortableTextRenderer blocks={event.body} /> */}
          </div>
          {/* Sidebar */}
          <div className="space-y-4">
            {event.registrationUrl && (
              <div className="bg-white border border-warm-gray p-6">
                <h3 className="font-display text-lg text-navy mb-3">Register for This Event</h3>
                <Button href={event.registrationUrl} variant="primary" className="w-full justify-center">
                  Register Now →
                </Button>
              </div>
            )}
            {event.membersOnly && (
              <div className="bg-teal p-6">
                <p className="font-body font-semibold text-xs uppercase tracking-wide text-gold mb-2">Members Only</p>
                <p className="font-body text-white/80 text-sm mb-4">This event is exclusive to AZAGC members.</p>
                <LeadForm
                  source="event-not-member"
                  headline="Not a member yet?"
                  subheadline="Join today to access this event and all member benefits."
                  submitLabel="Get Member Access →"
                  variant="compact"
                  showRoleSelect={false}
                  dark
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <CTABand
        headline="Get Access to All AZAGC Events"
        subtext="AZAGC members get priority registration and member-only pricing on all events."
        primaryCta={{ label: 'Join AZAGC', href: '/join' }}
        secondaryCta={{ label: 'View All Events', href: '/events' }}
      />
    </>
  )
}
