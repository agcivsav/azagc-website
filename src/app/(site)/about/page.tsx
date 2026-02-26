import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "About AZAGC | Arizona Chapter AGC Since 1934",
  description: "Learn about AZAGC — the Arizona Chapter of the Associated General Contractors of America. Our history, mission, leadership, and impact since 1934.",
  alternates: { canonical: "https://www.azagc.org/about/" },
}

const FAQS = [{"question":"What does AZAGC stand for?","answer":"AZAGC stands for Arizona Chapter of the Associated General Contractors of America. We are the Arizona affiliate of the national AGC organization."},{"question":"Where is AZAGC located?","answer":"AZAGC is located at 1825 W. Adams St., Phoenix, AZ 85007. You can reach us by phone at (602) 252-3926."},{"question":"How is AZAGC different from other construction associations?","answer":"AZAGC is the only Arizona construction association with full-time Capitol lobbyists, a DOL-registered apprenticeship program, and 90 years of continuous operation. We are part of the AGC of America national network with 27,000+ member companies."},{"question":"Is AZAGC a nonprofit?","answer":"Yes. AZAGC is a nonprofit trade association organized under Section 501(c)(6) of the Internal Revenue Code."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "About", url: "https://www.azagc.org/about/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">About</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">About AZAGC</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">Arizona's oldest construction association, founded in 1934. For 90+ years, AZAGC has been the voice of Arizona contractors — advocating, educating, and building community.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Our History</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC was founded in 1934 as the Arizona Chapter of the Associated General Contractors of America — part of the national AGC network established in 1918. For over 90 years, AZAGC has represented Arizona contractors through economic booms and downturns, legislative battles and infrastructure surges. We have been here for every chapter of Arizona's built environment.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Our Mission</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC's mission is to support the construction industry through advocacy, education, and building community. We exist to give Arizona contractors a unified voice in the political process, develop the workforce the industry needs, and create the relationships that make Arizona construction a community — not just a market.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Our Impact</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC represents 500+ member companies responsible for over $1 billion in annual construction volume across Arizona. Our members build the infrastructure, commercial facilities, and public works that make Arizona function. Our apprenticeship programs have trained thousands of Arizona tradespeople. Our advocacy has produced hundreds of legislative wins.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="about-page" headline="Questions? Talk to Our Team." subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
