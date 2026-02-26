import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Events Calendar',
  description: 'Full AZAGC events calendar — filter by category, date, and membership type.',
}

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span><a href="/events" className="hover:text-navy transition-colors no-underline">Events</a> <span>/</span><a href="/events/events-calendar" className="hover:text-navy transition-colors no-underline">Events Calendar</a>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">Events</SectionLabel>
          <SectionTitle as="h1" className="text-white">Events Calendar</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            Full AZAGC events calendar — filter by category, date, and membership type.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="container-site max-w-4xl">
          {/* TODO: Add <PortableTextRenderer blocks={page.body} /> once Sanity is connected */}
          <div className="bg-white border border-warm-gray p-10">
            <p className="font-body text-slate text-sm text-center">
              Content managed via <a href="/studio" className="text-red hover:underline">/studio</a> — connect Sanity to populate this section.
            </p>
          </div>
        </div>
      </section>
      
      <CTABand />
      
    </>
  )
}
