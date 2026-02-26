import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Contractor Membership | AZAGC",
  description: "Join AZAGC as a contractor member. Access legislative advocacy, OSHA training, safety resources, legal support, and 500+ member network. Starting at $800/year.",
  alternates: { canonical: "https://www.azagc.org/membership/contractor/" },
}

const FAQS = [{"question":"Do AZAGC membership benefits cover my whole company?","answer":"Yes. Contractor membership covers your entire firm. All employees can participate in AZAGC events, training programs, and use member resources."},{"question":"Can subcontractors join AZAGC?","answer":"Absolutely. Subcontractors of all trades and sizes are welcome and make up a significant portion of our membership. All contractor members receive the same full benefits."},{"question":"How quickly can I start using member benefits?","answer":"Access to digital resources and event registration begins immediately upon enrollment, typically within 2-3 business days."},{"question":"Is AZAGC membership required to bid on AZAGC projects?","answer":"No, AZAGC membership is not required to bid on any project. However, members often gain access to bid opportunities and pre-qualification support through our network."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Membership", url: "https://www.azagc.org/membership/" },
        { name: "Contractor", url: "https://www.azagc.org/membership/contractor/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Membership</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Contractor Membership</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">AZAGC contractor membership gives GCs, subcontractors, and specialty contractors the advocacy, training, and network they need to win more work and protect their business.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Built for Arizona Contractors</h2>
            <p className="font-body text-base text-slate leading-relaxed">Whether you're a $2M specialty sub or a $200M general contractor, AZAGC membership is calibrated to deliver value at every firm size. Our advocacy team fights your battles at the Capitol while you focus on building. Our training programs develop your workforce. Our events build the relationships that generate work.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">What's Included in Contractor Membership</h2>
            <p className="font-body text-base text-slate leading-relaxed">Full membership includes: year-round legislative advocacy and lobbying representation; OSHA training at subsidized rates; safety resources, benchmarking, and awards program; legal resources and construction contract templates; group insurance program access; 25+ networking events per year; quarterly Arizona Construction Outlook report; and full access to AGC of America's national programs, publications, and 27,000-member network.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Contractor Dues</h2>
            <p className="font-body text-base text-slate leading-relaxed">Contractor dues are based on annual revenue from Arizona construction work — starting at $800/year for firms under $1M and scaling to $3,200+/year for $30M+ contractors. Dues are fully tax-deductible as a business expense. Payment plans available. View the full <a href="/membership/dues/" className="text-red hover:underline">dues schedule</a> or request a custom quote using the form below.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="contractor-page" headline="Request Contractor Membership Info" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
