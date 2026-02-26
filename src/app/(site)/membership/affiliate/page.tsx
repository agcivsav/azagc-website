import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Affiliate Membership | AZAGC",
  description: "AZAGC Affiliate Membership for suppliers, vendors, engineers, and service providers. $650/year flat rate. Access 500+ Arizona contractors through events, directory, and sponsorships.",
  alternates: { canonical: "https://www.azagc.org/membership/affiliate/" },
}

const FAQS = [{"question":"Can I exhibit at AZAGC events as an affiliate?","answer":"Yes. Affiliate members receive preferred pricing on exhibitor booths at the Arizona Construction Summit and other flagship AZAGC events."},{"question":"How do I access the contractor member directory?","answer":"The AZAGC member directory is accessible to all members online. You can search by trade, company size, and geography to find the contractors most relevant to your business."},{"question":"Can I sponsor AZAGC events?","answer":"Yes. Sponsorship opportunities at AZAGC's annual golf tournament, gala, safety awards, and other events are available to affiliate members at preferred rates."},{"question":"What is the difference between Contractor and Affiliate membership?","answer":"Contractor membership is for companies that perform construction work. Affiliate membership is for companies that supply goods or services to the construction industry."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Membership", url: "https://www.azagc.org/membership/" },
        { name: "Affiliate", url: "https://www.azagc.org/membership/affiliate/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Membership</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Affiliate Membership</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">Connect your business directly with 500+ Arizona contractors. AZAGC Affiliate Membership is the most direct path to Arizona's construction decision-makers.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Who Is Affiliate Membership For?</h2>
            <p className="font-body text-base text-slate leading-relaxed">Affiliate membership is open to any company that sells products, provides services, or supports the construction industry — suppliers, manufacturers, distributors, engineers, architects, attorneys, financial advisors, insurance providers, technology companies, and more. If Arizona contractors are your market, AZAGC is your distribution channel.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">What Affiliate Members Receive</h2>
            <p className="font-body text-base text-slate leading-relaxed">Affiliate membership includes: access to all AZAGC contractor networking events (golf, gala, mixers, safety awards); company listing in the AZAGC member directory; preferred rates on event sponsorships and exhibitor booths; inclusion in AZAGC member communications; access to industry data and publications; and full access to AGC of America national affiliate benefits.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Affiliate Dues — $650/Year</h2>
            <p className="font-body text-base text-slate leading-relaxed">Affiliate membership is a flat $650/year regardless of company size. Dues are tax-deductible as a business expense. Most affiliates recover their dues cost through a single meaningful contractor relationship made through AZAGC.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="affiliate-page" headline="Request Affiliate Membership Info" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
