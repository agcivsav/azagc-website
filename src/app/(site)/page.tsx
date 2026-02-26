import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import ProofBar from '@/components/sections/ProofBar'
import MembershipCards from '@/components/sections/MembershipCards'
import BenefitsSection from '@/components/sections/BenefitsSection'
import CTABand from '@/components/sections/CTABand'
import EventsGrid from '@/components/sections/EventsGrid'
import NewsGrid from '@/components/sections/NewsGrid'
import BottomCTA from '@/components/sections/BottomCTA'
import ExitIntentPopup from '@/components/conversion/ExitIntentPopup'
import ScrollTriggerCTA from '@/components/conversion/ScrollTriggerCTA'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: "AZAGC — Arizona's Premier Construction Association Since 1934",
  description:
    'Arizona Chapter of the Associated General Contractors of America. Join 500+ contractors, suppliers and service providers building Arizona\'s future.',
  openGraph: {
    title: 'AZAGC — Building Arizona Since 1934',
    description: "Arizona's oldest and most influential construction association. Join 500+ member firms.",
    type: 'website',
    siteName: 'AZAGC',
    url: 'https://www.azagc.org',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://www.azagc.org/',
  },
}

export default function HomePage() {
  return (
    <>
      {/* ── Structured data ── */}
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* ── HERO ── */}
      <Hero />

      {/* ── PROOF BAR ── */}
      <ProofBar />

      {/* ── WHO JOINS — Membership cards ── */}
      <section className="bg-cream py-[72px]" id="membership">
        <div className="max-w-[1180px] mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
              Membership
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy mb-3">
              Who Should Join <em className="italic text-red">AZAGC?</em>
            </h2>
            <p className="font-body text-[0.95rem] text-light-slate max-w-[520px] mx-auto leading-[1.6]">
              Whether you&apos;re a general contractor, specialty sub, or industry supplier —
              AZAGC membership is built to grow your business and protect your interests.
            </p>
          </div>
          <MembershipCards />
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <BenefitsSection />

      {/* ── CTA MID — red band ── */}
      <section
        className="relative py-[52px] text-center overflow-hidden"
        style={{ background: '#C8462A' }}
      >
        {/* Radial overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08), transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.1), transparent 50%)',
          }}
        />
        <div className="max-w-[1180px] mx-auto px-6 relative z-10">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] text-white mb-2">
            Ready to Grow Your Construction Business?
          </h2>
          <p className="font-body text-white/85 text-[1rem] mb-6">
            Request a personalized membership overview — no commitment required.
          </p>
          <Link
            href="/#join"
            className="inline-flex items-center gap-2 bg-[#111828] text-white font-body font-semibold text-[0.92rem] px-7 py-3.5 rounded-[9px] no-underline transition-all duration-300 hover:bg-[#1A2238] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(26,34,56,0.3)]"
          >
            Get Started Today
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="bg-cream py-[72px]" id="events">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex justify-between items-end mb-9">
            <div>
              <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
                Upcoming Events
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Connect &amp; <em className="italic text-red">Grow</em>
              </h2>
            </div>
            <Link
              href="/events/"
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              View full calendar →
            </Link>
          </div>
          <EventsGrid />
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="bg-white py-[72px]" id="news">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex justify-between items-end mb-9">
            <div>
              <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
                Industry News
              </p>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Stay <em className="italic text-red">Informed</em>
              </h2>
            </div>
            <Link
              href="/news-media/"
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              All news →
            </Link>
          </div>
          <NewsGrid />
        </div>
      </section>

      {/* ── BOTTOM CTA — teal ── */}
      <BottomCTA source="homepage-bottom" />

      {/* ── CONVERSION OVERLAYS ── */}
      <ExitIntentPopup />
      <ScrollTriggerCTA />
    </>
  )
}
