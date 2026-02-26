import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import TestimonialSlider from '@/components/sections/TestimonialSlider'
import ProofBar from '@/components/sections/ProofBar'

export const metadata: Metadata = {
  title: 'AZAGC Contractor Membership | Built for Arizona General Contractors',
  description:
    'AZAGC contractor membership for Arizona GCs and subs. Advocacy, OSHA training, legal resources, insurance programs, and 500+ contractor network.',
  robots: { index: false, follow: false },
}

const TESTIMONIALS = [
  {
    quote:
      'The legal resources alone have saved us thousands. Contract templates, labor law guidance, lien law updates — AZAGC keeps us protected and competitive.',
    personName: 'Jason Fann',
    personTitle: 'President',
    companyName: 'Fann Contracting',
  },
  {
    quote:
      'We\'ve been AZAGC members for 20+ years. The advocacy AZAGC does at the Capitol protects our margins and our ability to bid on public work.',
    personName: 'Gary Haydon',
    personTitle: 'CEO',
    companyName: 'Haydon Building Corp',
  },
  {
    quote:
      'AZAGC events are where relationships get built. The relationships we\'ve made through AZAGC have led to millions in subcontract work over the years.',
    personName: 'Tom Drysdale',
    personTitle: 'Owner',
    companyName: 'DBA Construction',
  },
]

const FAQS = [
  {
    question: 'What is AZAGC?',
    answer:
      'AZAGC is the Arizona Chapter of the Associated General Contractors of America — the largest, most respected construction trade association in Arizona. We represent 500+ member companies from small specialty contractors to the state\'s largest GCs.',
  },
  {
    question: 'Is AZAGC membership just for general contractors?',
    answer:
      'No. Contractor membership is open to general contractors, specialty contractors, and subcontractors of all sizes. All contractor members receive the same full benefits regardless of size or specialty.',
  },
  {
    question: 'How does AZAGC advocacy help my contracting business?',
    answer:
      'AZAGC employs full-time lobbyists who monitor Arizona legislation that affects contractors — lien laws, bonding requirements, prevailing wage, contractor licensing, and more. When bad legislation appears, AZAGC fights it. When opportunities arise, we advance them. All members benefit from this representation.',
  },
  {
    question: 'What is the cost of contractor membership?',
    answer:
      'Dues are revenue-based, starting at $800/year. Most contractor members find the value they receive exceeds their dues cost within the first year. Fill out the form for a custom quote based on your company\'s revenue.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Fill out the form on this page. A membership coordinator will follow up with your custom membership proposal within one business day.',
  },
]

export default function LpContractorMembershipPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-navy-deep to-navy py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Built for General Contractors
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
                Built for General Contractors. Proven in Arizona.
              </h1>
              <p className="font-body text-lg text-white/75 mb-6">
                AZAGC has been the voice of Arizona contractors since 1934. Membership delivers
                real, measurable ROI through advocacy wins, training savings, and the connections
                that drive business.
              </p>
              <ul className="space-y-2">
                {[
                  'Full-time lobbyists at the Arizona Capitol',
                  'OSHA training at subsidized rates',
                  'Access to AGC national programs',
                  'Legal resources, contract templates, & attorney network',
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2 font-body text-sm text-white/80">
                    <span className="text-gold">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6">
              <LeadForm
                source="lp-contractor"
                headline="Get Your Membership Proposal"
                subheadline="Fill out the form and we'll follow up with a custom membership proposal within one business day."
                submitLabel="Get My Proposal →"
                showRoleSelect={false}
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <ProofBar />

      <TestimonialSlider testimonials={TESTIMONIALS} dark />

      <FAQAccordion items={FAQS} title="Contractor Membership — Common Questions" />

      <section className="py-20 bg-navy px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="lp-contractor-bottom"
            headline="Join AZAGC Today"
            subheadline="500+ Arizona contractors can't be wrong. Let's talk about what membership looks like for your company."
            submitLabel="Start My Membership →"
            showRoleSelect={false}
            dark
          />
        </div>
      </section>

      <footer className="bg-navy-deep py-6 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">© 2026 AZAGC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy/" className="font-body text-xs text-white/40 hover:text-white/70">Privacy Policy</a>
            <a href="/accessibility-statement/" className="font-body text-xs text-white/40 hover:text-white/70">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
