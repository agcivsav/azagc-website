import type { Metadata } from 'next'
import BottomCTA from '@/components/sections/BottomCTA'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import LeadForm from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Contact AZAGC',
  description: 'Contact the Arizona Agribusiness & Equine Center — membership, events, advocacy, and general inquiries.',
}

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span><a href="/contact" className="hover:text-navy transition-colors no-underline">Contact</a>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">AZAGC</SectionLabel>
          <SectionTitle as="h1" className="text-white">Contact AZAGC</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            Contact the Arizona Agribusiness & Equine Center — membership, events, advocacy, and general inquiries.
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
      
      <section className="bg-cream py-20">
        <div className="container-site max-w-2xl mx-auto">
          <SectionLabel className="mb-3">Get in Touch</SectionLabel>
          <SectionTitle className="mb-6">Contact AZAGC</SectionTitle>
          <div className="bg-white border border-warm-gray p-8">
            <LeadForm
              source="contact-page"
              headline="Send Us a Message"
              subheadline="We'll respond within one business day."
              submitLabel="Send Message →"
              showRoleSelect={true}
            />
          </div>
        </div>
      </section>
      
      
    </>
  )
}
