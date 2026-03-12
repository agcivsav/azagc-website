import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { safeFetch } from '@/lib/sanity'
import { EventJsonLd } from '@/components/seo/JsonLd'
import { formatEventDateRange, googleCalendarUrl } from '@/lib/utils'
import PortableText from '@/components/ui/PortableText'
import Button from '@/components/ui/Button'
import LeadForm from '@/components/forms/LeadForm'
import CTABandFromSanity from '@/components/sections/CTABandFromSanity'
import type { PortableTextBlock } from '@portabletext/types'
export async function generateStaticParams() {
  const raw = await (await import('@/lib/sanity')).safeFetch<unknown>(`*[_type == "event"].slug`)
  const slugs: Array<{ current: string } | null> = Array.isArray(raw) ? raw : (raw ?? []) as Array<{ current: string } | null>
  const safeSlugs = (slugs ?? []).filter((s): s is { current: string } => s != null && typeof (s as { current?: unknown }).current === 'string')
  return safeSlugs.map((s) => ({ slug: s.current }))
}

interface Event {
  _id: string
  title: string
  slug: { current: string }
  startDate: string
  endDate: string | null
  location: string | null
  locationUrl: string | null
  excerpt: string | null
body: PortableTextBlock[] | null
  registrationUrl: string | null
  category: string | null
  membersOnly: boolean
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
}

async function getEvent(slug: string): Promise<Event | null> {
  return safeFetch(
    `*[_type == "event" && slug.current == $slug][0]{
      _id, title, slug, startDate, endDate, location, locationUrl, excerpt, body,
      registrationUrl, category, membersOnly,
      contactName, contactEmail, contactPhone
    }`,
    { slug }
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: 'Event Not Found' }
  return {
    title: event.title,
    description: event.excerpt ?? `${event.title} — AZAGC event in ${event.location ?? 'Arizona'}.`,
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()

  const { dateRange, timeRange } = formatEventDateRange(event.startDate, event.endDate)
  const googleCalUrl = googleCalendarUrl(
    event.title,
    event.startDate,
    event.endDate,
    event.excerpt ?? undefined,
    event.location ?? undefined
  )
  const hasContact = event.contactName || event.contactEmail || event.contactPhone
  const hasDescription = event.excerpt || (Array.isArray(event.body) && event.body.length > 0)

  return (
    <>
      <EventJsonLd
        name={event.title}
        startDate={event.startDate}
        endDate={event.endDate ?? undefined}
        location={event.location ?? undefined}
        description={event.excerpt ?? undefined}
        url={`https://www.azagc.org/events/${slug}`}
      />

      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy no-underline">Home</a>
          <span>/</span>
          <a href="/events" className="hover:text-navy no-underline">Events</a>
          <span>/</span>
          <Link href="/events/events-calendar" className="hover:text-navy no-underline">Events Calendar</Link>
          <span>/</span>
          <span className="truncate max-w-[200px]">{event.title}</span>
        </div>
      </div>

      <article className="bg-white py-10 md:py-14">
        <div className="container-site">
          <h1 className="font-normal text-3xl md:text-4xl text-navy mb-10 pb-4 border-b-2 border-red">
            {event.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">
            {/* Left: Date/Time, Register, Event type(s) */}
            <aside className="space-y-8 order-2 lg:order-1">
              <div>
                <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-2">Date / Time</h2>
                <p className="font-body text-slate text-base">{dateRange}</p>
                <p className="font-body text-slate text-base">{timeRange}</p>
              </div>
              {event.registrationUrl && (
                <div>
                  <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-3">Register</h2>
                  <Button
                    href={event.registrationUrl}
                    variant="primary"
                    className="w-full justify-center py-3.5"
                  >
                    Register for this event
                  </Button>
                </div>
              )}
              {event.category && (
                <div>
                  <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-2">Event type(s)</h2>
                  <p className="font-body text-slate text-base">{event.category}</p>
                </div>
              )}
            </aside>

            {/* Right: Description, Contact, Add to calendar */}
            <div className="space-y-8 order-1 lg:order-2">
              {hasDescription && (
                <div>
                  <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-3">Event description</h2>
                  {event.excerpt && (
                    <p className="font-body text-slate leading-relaxed mb-4">{event.excerpt}</p>
                  )}
                  <PortableText value={Array.isArray(event.body) ? event.body : null} />
                </div>
              )}
              {hasContact && (
                <div>
                  <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-3">Contact person</h2>
                  <div className="font-body text-slate text-base space-y-1.5">
                    {event.contactName && <p>Contact: {event.contactName}</p>}
                    {event.contactEmail && (
                      <p>
                        Email:{' '}
                        <a href={`mailto:${event.contactEmail}`} className="text-red hover:underline">
                          {event.contactEmail}
                        </a>
                      </p>
                    )}
                    {event.contactPhone && (
                      <p>
                        Phone:{' '}
                        <a href={`tel:${event.contactPhone.replace(/\D/g, '')}`} className="text-red hover:underline">
                          {event.contactPhone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div>
                <h2 className="font-semibold text-navy text-sm uppercase tracking-wide mb-3">
                  Outlook / Calendar / Google
                </h2>
                <p className="font-body text-slate text-sm mb-2">
                  Click the link below to add this event to your calendar.
                </p>
                <p className="font-body text-slate text-base mb-2">{dateRange}</p>
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-red hover:text-navy transition-colors underline focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2 rounded"
                >
                  Add to Google Calendar
                </a>
              </div>
            </div>
          </div>

          {event.membersOnly && (
            <div className="mt-14 bg-navy rounded-xl p-8">
              <p className="font-body font-semibold text-xs uppercase tracking-wide text-gold mb-2">Members only</p>
              <p className="font-body text-white/90 text-sm mb-6">This event is exclusive to AZAGC members.</p>
              <LeadForm
                source="event-not-member"
                headline="Not a member yet?"
                subheadline="Join today to access this event and all member benefits."
                submitLabel="Get member access"
                variant="compact"
                showRoleSelect={false}
                dark
              />
            </div>
          )}
        </div>
      </article>

      <CTABandFromSanity />
    </>
  )
}
