import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import ProofBar from '@/components/sections/ProofBar'

export const metadata: Metadata = {
  title: 'AZAGC Affiliate Membership for Suppliers & Service Providers',
  description:
    'Connect with 500+ Arizona contractors through AZAGC Affiliate Membership. $650/year flat rate. Networking events, sponsorship, and business development for construction industry suppliers.',
  robots: { index: false, follow: false },
}

const FAQS = [
  {
    question: 'Who qualifies for AZAGC Affiliate membership?',
    answer:
      'Affiliate membership is open to suppliers, manufacturers, distributors, engineers, architects, attorneys, financial services firms, insurance providers, and any company that provides products or services to the construction industry. If your business serves contractors, you belong in AZAGC.',
  },
  {
    question: 'How does affiliate membership help me reach contractors?',
    answer:
      'AZAGC hosts 25+ events per year attended by Arizona\'s leading contractors. As an affiliate member, you attend the same events, can sponsor and exhibit at major events, are listed in the member directory, and can advertise in AZAGC communications. It is the most direct channel to Arizona\'s contractor market.',
  },
  {
    question: 'What is the cost of affiliate membership?',
    answer:
      'Affiliate membership is $650/year — a flat rate regardless of company size. Dues are tax-deductible as a business expense.',
  },
  {
    question: 'Can I sponsor AZAGC events as an affiliate member?',
    answer:
      'Yes. Sponsorship opportunities at AZAGC\'s annual golf tournament, gala, safety awards, and other events are available to affiliate members at preferred rates. Sponsorship puts your brand in front of Arizona\'s top contractors in a high-trust, relationship-building environment.',
  },
  {
    question: 'How quickly will I meet contractors after joining?',
    answer:
      'Your company is listed in the member directory immediately upon joining. Depending on event timing, you can be networking with Arizona contractors at your first AZAGC event within weeks of joining.',
  },
]

export default function LpSupplierMembershipPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-navy-deep to-navy py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                Affiliate Membership
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
                Connect with 500+ Arizona Contractors
              </h1>
              <p className="font-body text-lg text-white/75 mb-6">
                AZAGC Affiliate Membership puts your company in front of Arizona&apos;s most active
                contractors — at events, in the directory, and through AZAGC communications.
                $650/year flat rate.
              </p>
              <ul className="space-y-2">
                {[
                  'Access to all AZAGC contractor networking events',
                  'Exhibitor & sponsorship opportunities',
                  'Member directory listing',
                  'AZAGC e-news and communications placement',
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2 font-body text-sm text-white/80">
                    <span className="text-gold">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6">
              <LeadForm
                source="lp-supplier"
                headline="Join as an Affiliate Member"
                subheadline="$650/year. A membership coordinator will follow up within one business day."
                submitLabel="Get Membership Details →"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <ProofBar />

      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-navy text-center mb-10">
            What You Get as an AZAGC Affiliate
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Events Access', desc: 'Golf tournament, annual gala, safety awards, and 20+ more events per year — all attended by Arizona\'s top contractors.' },
              { title: 'Sponsorship Opportunities', desc: 'Preferred rates on event sponsorships and speaking opportunities. Put your brand in front of Arizona\'s construction decision-makers.' },
              { title: 'Member Directory', desc: 'Listed in the AZAGC member directory, the go-to resource contractors use when sourcing products and services.' },
              { title: 'Exhibitor Access', desc: 'Exhibit at the Arizona Construction Summit and other AZAGC flagship events. Meet hundreds of contractors face-to-face.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-cream border border-warm-gray p-6 rounded-sm">
                <h3 className="font-body font-bold text-navy mb-2">{title}</h3>
                <p className="font-body text-sm text-slate">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Affiliate Membership — Common Questions" />

      <section className="py-20 bg-navy px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="lp-supplier-bottom"
            headline="Ready to Reach Arizona Contractors?"
            subheadline="$650/year gets you into the room with 500+ of Arizona's most active contractors."
            submitLabel="Join as Affiliate →"
            dark
          />
        </div>
      </section>

      <footer className="bg-navy-deep py-6 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">© 2026 AZAGC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy/" className="font-body text-xs text-white/40 hover:text-white/70">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
