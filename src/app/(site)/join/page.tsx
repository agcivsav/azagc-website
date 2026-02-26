import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Join AZAGC | Become a Member",
  description: "Join AZAGC — Arizona Chapter AGC. Contractor membership from $800/year. Affiliate membership $650/year. Request your membership proposal today.",
  alternates: { canonical: "https://www.azagc.org/join/" },
}

const FAQS = [{"question":"How long does the enrollment process take?","answer":"Once you submit the form, expect a response within one business day. Full enrollment typically takes 2-3 business days after you confirm your membership."},{"question":"Is there a joining fee?","answer":"There is no separate joining fee. You pay the annual dues for your membership tier, prorated if you join mid-year."},{"question":"When does my membership start?","answer":"Your membership and access to benefits begins immediately upon enrollment confirmation."},{"question":"Can I try AZAGC before committing?","answer":"We offer prospective members the opportunity to attend one AZAGC event as a guest. Contact us to arrange a guest pass for an upcoming event."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Join", url: "https://www.azagc.org/join/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Membership</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Join AZAGC</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">Fill out the form and a membership coordinator will follow up within one business day with your personalized membership proposal.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">What Happens After You Submit</h2>
            <p className="font-body text-base text-slate leading-relaxed">A membership coordinator will review your submission and follow up within one business day with: your custom dues quote based on company size; a breakdown of the benefits most relevant to your business; and next steps to complete enrollment. There's no commitment required at this stage — just information.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Membership Options</h2>
            <p className="font-body text-base text-slate leading-relaxed"><strong>Contractor Membership:</strong> For GCs, subs, and specialty contractors. Revenue-based dues starting at $800/year.<br/><br/><strong>Affiliate Membership:</strong> For suppliers, vendors, and service providers. $650/year flat rate.<br/><br/><strong>Young Constructors Forum:</strong> Included with company membership for professionals under 40.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Already a Member?</h2>
            <p className="font-body text-base text-slate leading-relaxed">If you're a current member and need to update your information, add employees, or renew your membership, log in to the member portal at <a href="https://membersonly.azagc.org" className="text-red hover:underline" target="_blank" rel="noopener">membersonly.azagc.org</a>.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="join-page" headline="Request Your Membership Proposal" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
