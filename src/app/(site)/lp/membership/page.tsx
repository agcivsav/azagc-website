import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import TestimonialSlider from '@/components/sections/TestimonialSlider'
import ProofBar from '@/components/sections/ProofBar'

export const metadata: Metadata = {
  title: 'Join AZAGC | Arizona Contractor Membership',
  description:
    'Join 500+ Arizona contractors in AZAGC. Access advocacy, training, safety resources, and the largest contractor network in Arizona.',
  robots: { index: false, follow: false },
}

const TESTIMONIALS = [
  {
    quote:
      'AZAGC has been essential to growing our business. The advocacy wins alone — on licensing, prevailing wage, and bonding — have saved us more money than our dues cost by a factor of ten.',
    personName: 'Rick Rummel',
    personTitle: 'President',
    companyName: 'Rummel Construction',
  },
  {
    quote:
      'The networking events AZAGC puts on are where real business gets done. Some of our most valuable subcontractor relationships started at AZAGC events. It pays for itself every year.',
    personName: 'Tom Drysdale',
    personTitle: 'Owner',
    companyName: 'DBA Construction',
  },
  {
    quote:
      'The OSHA training programs AZAGC offers are top-notch. We put all our foremen through OSHA 30 through AZAGC and the savings on our workers\' comp premiums alone covered the dues.',
    personName: 'Jason Fann',
    personTitle: 'President',
    companyName: 'Fann Contracting',
  },
  {
    quote:
      'AZAGC gives us a real seat at the table in Phoenix. When construction policy is being made, AZAGC is in the room making sure contractors\' interests are represented. That matters.',
    personName: 'Gary Haydon',
    personTitle: 'CEO',
    companyName: 'Haydon Building Corp',
  },
]

const FAQS = [
  {
    question: 'Why should I join AZAGC?',
    answer:
      'AZAGC gives Arizona contractors advocacy representation, workforce training resources, safety programs, legal tools, insurance programs, and a network of 500+ peer contractors. Members consistently report the value received far exceeds the cost of dues. If you bid on public work, hold a workforce, or compete for commercial projects in Arizona, AZAGC membership is a competitive advantage.',
  },
  {
    question: 'How much does AZAGC membership cost?',
    answer:
      'Contractor dues are revenue-based, starting at $800/year for companies under $1M in revenue and scaling to $3,200+/year for $30M+ contractors. Affiliate membership is $650/year flat. All dues are tax-deductible as a business expense. Fill out the form to get a custom quote for your company.',
  },
  {
    question: 'What do I get for my membership dues?',
    answer:
      'Legislative advocacy, OSHA training at subsidized rates, safety resources and awards program, access to group insurance programs, legal resources and contract templates, 25+ networking events per year, quarterly industry outlook reports, and full access to AGC of America\'s national programs and network.',
  },
  {
    question: 'Can I join AZAGC as a subcontractor?',
    answer:
      'Absolutely. Subcontractors make up a significant portion of our membership. Contractor membership (both GC and sub tiers) provides the same full benefits. Your dues are calculated on your company\'s annual revenue just like any contractor member.',
  },
  {
    question: 'How quickly can I start using member benefits?',
    answer:
      'Access to digital member resources begins immediately upon enrollment. Your company will be listed in the AZAGC member directory right away. Training registrations, event registrations, and insurance program access are available as soon as your membership is confirmed — typically within 2–3 business days.',
  },
]

const BENEFITS = [
  { icon: '🏛️', title: 'Legislative Advocacy', desc: 'Full-time lobbyists in Phoenix and D.C. fighting for contractor interests.' },
  { icon: '🛡️', title: 'Safety Resources', desc: 'OSHA training, toolbox talks, benchmarking, and safety awards.' },
  { icon: '📊', title: 'Industry Data', desc: 'Quarterly construction outlook and wage survey reports.' },
]

export default function LpMembershipPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero with form */}
      <section className="bg-gradient-to-br from-navy-deep to-navy py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Arizona Chapter AGC
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
                Join 500+ Arizona Contractors
              </h1>
              <p className="font-body text-lg text-white/75 mb-6">
                AZAGC gives Arizona contractors the advocacy, training, and resources to build
                a more successful business. The ROI on membership pays for itself.
              </p>
              <ul className="space-y-2">
                {['Full legislative advocacy representation', 'Subsidized OSHA training', 'Legal resources & contract templates', '25+ networking events per year'].map((b) => (
                  <li key={b} className="flex items-center gap-2 font-body text-sm text-white/80">
                    <span className="text-gold">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6">
              <LeadForm
                source="lp-membership"
                headline="Request Membership Info"
                subheadline="A membership coordinator will follow up within one business day."
                submitLabel="Get My Benefits Overview →"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <ProofBar />

      {/* Benefit cards */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl text-navy text-center mb-10">
            Why 500+ Arizona Contractors Choose AZAGC
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon, title, desc }) => (
              <div key={title} className="bg-cream border border-warm-gray rounded-sm p-6 text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-body font-bold text-navy mb-2">{title}</h3>
                <p className="font-body text-sm text-slate">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider testimonials={TESTIMONIALS} dark />

      {/* FAQ */}
      <FAQAccordion items={FAQS} title="Common Questions About AZAGC Membership" />

      {/* Bottom form */}
      <section className="py-20 bg-navy px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="lp-membership-bottom"
            headline="Ready to Join AZAGC?"
            subheadline="Fill out the form and a membership coordinator will follow up with your custom membership proposal."
            submitLabel="Start My Membership →"
            dark
          />
        </div>
      </section>

      {/* Minimal footer */}
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
