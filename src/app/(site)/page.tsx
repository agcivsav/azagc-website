import { Metadata } from 'next'
import ProofBar from '@/components/sections/ProofBar'
import CTABand from '@/components/sections/CTABand'
import BottomCTA from '@/components/sections/BottomCTA'
import LeadForm from '@/components/forms/LeadForm'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import ExitIntentPopup from '@/components/conversion/ExitIntentPopup'
import ScrollTriggerCTA from '@/components/conversion/ScrollTriggerCTA'

export const metadata: Metadata = {
  title: 'Arizona Agribusiness & Equine Center | AZAGC',
  description: 'AZAGC advances Arizona agriculture through workforce development, advocacy, and industry partnerships. Join the community that shapes the future of Arizona agribusiness.',
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      {/* TODO: Replace with <Hero /> once azagc-final.html is provided */}
      <section className="relative min-h-[85vh] bg-navy-deep flex items-center overflow-hidden">
        {/* Hero bg placeholder — will be replaced with Sanity image */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep to-navy opacity-90" />
        <div className="relative container-site py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel className="text-gold mb-4">Arizona&apos;s Premier Agricultural Association</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Advancing Arizona <em className="not-italic text-gold">Agriculture</em> &amp; Equine Industries
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              From legislative advocacy to workforce training — AZAGC is the unified voice for Arizona agribusiness contractors and affiliates.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/join" variant="primary" size="lg">Become a Member</Button>
              <Button href="/membership" variant="ghost" size="lg">See Benefits</Button>
            </div>
          </div>
          {/* Hero form card */}
          <div className="bg-white p-7 shadow-2xl rounded-sm w-full">
            <LeadForm
              source="hero-form"
              tags={['hero-form', 'website-lead']}
              headline="Start Your Membership"
              subtext="Join hundreds of Arizona agribusiness professionals."
              ctaLabel="Get Started →"
            />
          </div>
        </div>
      </section>

      {/* ── PROOF BAR ───────────────────────────────────────────── */}
      <ProofBar />

      {/* ── MEMBERSHIP OVERVIEW ─────────────────────────────────── */}
      {/* TODO: Replace with <MembershipCards /> once design is confirmed */}
      <section className="bg-cream py-20">
        <div className="container-site text-center max-w-3xl mx-auto mb-12">
          <SectionLabel className="mb-3">Membership</SectionLabel>
          <SectionTitle>Built for Arizona&apos;s <em>Agribusiness Community</em></SectionTitle>
        </div>
        <div className="container-site grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Contractor Members', desc: 'Agricultural contractors, growers, ranchers, and equine operations.', href: '/membership/contractor' },
            { title: 'Affiliate Members', desc: 'Suppliers, vendors, lenders, and industry service providers.', href: '/membership/affiliate' },
            { title: 'Member Benefits', desc: 'Advocacy, training, events, networking, and exclusive discounts.', href: '/membership/benefits' },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-warm-gray p-7 flex flex-col">
              <h3 className="font-display text-xl text-navy mb-3">{card.title}</h3>
              <p className="font-body text-slate text-sm leading-relaxed mb-5 flex-1">{card.desc}</p>
              <Button href={card.href} variant="primary" size="sm">Learn More →</Button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ────────────────────────────────────────────── */}
      <CTABand />

      {/* ── EVENTS PLACEHOLDER ──────────────────────────────────── */}
      {/* TODO: Replace with <EventsGrid /> pulling from Sanity */}
      <section className="bg-white py-20">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <SectionLabel className="mb-3">Upcoming Events</SectionLabel>
              <SectionTitle>Industry Events &amp; <em>Conferences</em></SectionTitle>
            </div>
            <Button href="/events" variant="primary" size="sm" className="hidden sm:flex">All Events →</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-warm-gray bg-cream animate-pulse h-56 rounded-sm" />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
      <BottomCTA source="homepage-bottom" />

      {/* ── CONVERSION OVERLAYS ─────────────────────────────────── */}
      <ExitIntentPopup />
      <ScrollTriggerCTA />
    </>
  )
}
