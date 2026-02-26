import type { Metadata } from 'next'
import CTABand from '@/components/sections/CTABand'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'News & Media',
  description: 'AZAGC news, press releases, and industry updates for Arizona agribusiness professionals.',
}

export default function Page() {
  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy transition-colors no-underline">Home</a>
          <span>/</span><a href="/news-media" className="hover:text-navy transition-colors no-underline">News Media</a>
        </div>
      </div>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section className="bg-navy py-16">
        <div className="container-site">
          <SectionLabel color="gold" className="mb-3">AZAGC</SectionLabel>
          <SectionTitle as="h1" className="text-white">News & Media</SectionTitle>
          <p className="font-body text-white/60 mt-3 max-w-2xl text-base">
            {/* TODO: Pull from Sanity siteSettings or page.heroSubtitle */}
            AZAGC news, press releases, and industry updates for Arizona agribusiness professionals.
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
