import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import BottomCTA from '@/components/sections/BottomCTA'
import LeadForm from '@/components/forms/LeadForm'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Contractor Membership',
  description: 'AZAGC contractor membership connects GCs, subcontractors, and specialty contractors with advocacy, training, and networking.',
}

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span><a href="/membership" className="hover:text-navy transition-colors no-underline">Membership</a> <span>/</span><a href="/membership/contractor" className="hover:text-navy transition-colors no-underline">Contractor</a>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">Membership</SectionLabel>
          <SectionTitle as="h1" className="text-white">Contractor Membership</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            AZAGC contractor membership connects GCs, subcontractors, and specialty contractors with advocacy, training, and network...
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
      <BottomCTA source="contractor-page" />
    </>
  )
}
