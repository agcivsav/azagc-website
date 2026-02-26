import type { Metadata } from 'next'
import BottomCTA from '@/components/sections/BottomCTA'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import LeadForm from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Join AZAGC',
  description: 'Become an AZAGC member today. Join Arizona&apos;s premier agricultural association.',
}

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span><a href="/join" className="hover:text-navy transition-colors no-underline">Join</a>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">AZAGC</SectionLabel>
          <SectionTitle as="h1" className="text-white">Join AZAGC</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            Become an AZAGC member today. Join Arizona's premier agricultural association.
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
      
      <section className="bg-teal py-20">
        <div className="container-site max-w-xl mx-auto">
          <SectionLabel color="gold" className="mb-3 text-center block">Membership Application</SectionLabel>
          <SectionTitle className="mb-6 text-center text-white">Join AZAGC Today</SectionTitle>
          <div className="bg-white p-8">
            <LeadForm
              source="join-page"
              headline="Start Your Application"
              subheadline="A membership coordinator will contact you within one business day."
              submitLabel="Submit Application →"
            />
          </div>
        </div>
      </section>
      
      
    </>
  )
}
