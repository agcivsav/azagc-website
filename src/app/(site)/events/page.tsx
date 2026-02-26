import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Events Calendar | AZAGC",
  description: "AZAGC events calendar — networking mixers, golf tournaments, awards gala, safety training, and construction industry events for Arizona contractors.",
  alternates: { canonical: "https://www.azagc.org/events/" },
}

const FAQS = [{"question":"Do I need to be a member to attend AZAGC events?","answer":"Most AZAGC events are open to non-members, though members receive priority registration and discounted pricing. Some events are member-only."},{"question":"How do I register for events?","answer":"Event registration is available on the AZAGC website member portal. Fill out the form on this page to get notified of upcoming events."},{"question":"How can I sponsor an AZAGC event?","answer":"Affiliate members and non-members can sponsor AZAGC events. Sponsorships are available for the golf tournament, gala, safety awards, and other events. Contact us for the sponsorship prospectus."},{"question":"Are events open to my employees?","answer":"Yes. Contractor membership covers your entire company. Any employee of an AZAGC member company can attend events at member pricing."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Events", url: "https://www.azagc.org/events/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Events</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">AZAGC Events</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">From our Premier Golf Scramble to the annual Awards Gala — AZAGC hosts 25+ events per year that build the relationships powering Arizona construction.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Signature Annual Events</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC's flagship events are among the most attended construction industry gatherings in Arizona. The <strong>Premier Golf Scramble</strong> brings together hundreds of contractors and affiliates for a day of competition and networking. The <strong>Annual Awards Gala</strong> celebrates outstanding member achievements in safety, workforce development, and community service. The <strong>Arizona Construction Summit</strong> is our industry conference featuring keynote speakers, educational sessions, and a trade show.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Networking & Committee Events</h2>
            <p className="font-body text-base text-slate leading-relaxed">Throughout the year, AZAGC hosts networking mixers, committee meetings, and joint events with other Arizona construction associations. The Joint Construction Association Mixer is Arizona's largest annual cross-association networking event, drawing GCs, subs, suppliers, and affiliates from across the industry.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">BWiC — Building Women in Construction</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC's BWiC chapter hosts events throughout the year celebrating and advancing women in Arizona construction — including the annual Inspire Awards Luncheon, mentorship programs, and networking events specifically for women in the industry.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="events-page" headline="Get Event Invitations" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
