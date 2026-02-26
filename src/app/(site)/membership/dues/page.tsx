import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import DuesTable from '@/components/sections/DuesTable'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'AZAGC Membership Dues & Pricing',
  description:
    'View AZAGC contractor and affiliate membership dues. Revenue-based pricing starting at $800/year. All dues tax-deductible. Get a custom quote from our membership team.',
  openGraph: {
    title: 'AZAGC Membership Dues & Pricing',
    description:
      'View AZAGC contractor and affiliate membership dues. Revenue-based pricing starting at $800/year. All dues tax-deductible. Get a custom quote from our membership team.',
    type: 'website',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/membership/dues/',
  },
}

const FAQS = [
  {
    question: 'How are contractor membership dues calculated?',
    answer:
      'AZAGC contractor dues are based on your company\'s annual revenue from Arizona construction work. Revenue tiers range from Under $1M ($800/year) up to $30M+ ($3,200+/year). This tiered structure ensures that dues scale appropriately with your company\'s size and capacity to invest in association membership.',
  },
  {
    question: 'Can I get a custom dues quote?',
    answer:
      'Yes. For large contractors ($30M+) or companies with complex situations, we provide custom dues quotes. Contact our membership team using the form below and we\'ll follow up with a quote tailored to your company.',
  },
  {
    question: 'Are AZAGC membership dues tax-deductible?',
    answer:
      'Yes, AZAGC membership dues are generally tax-deductible as an ordinary and necessary business expense under IRS guidelines. The portion of dues attributable to lobbying activities is not deductible — we provide a disclosure of this amount annually. Consult your tax advisor for your specific situation.',
  },
  {
    question: 'Does AZAGC offer payment plans?',
    answer:
      'Yes. We understand cash flow matters for contractors. We offer quarterly payment plans for contractor members who prefer to spread their dues over the year. Contact our membership team to set up a payment arrangement.',
  },
  {
    question: 'What happens if I join mid-year?',
    answer:
      'Dues are prorated when you join mid-year — you only pay for the remaining months of the membership year. Membership runs on a calendar year (January–December). New members who join in Q4 may receive the following year\'s membership at no additional cost.',
  },
]

export default function MembershipDuesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Membership', url: 'https://www.azagc.org/membership/' },
          { name: 'Dues & Pricing', url: 'https://www.azagc.org/membership/dues/' },
        ]}
      />

      {/* Hero */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Membership
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            AZAGC Membership Dues &amp; Pricing
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Straightforward, revenue-based pricing for contractor members. Flat-rate for affiliates.
            All dues are tax-deductible as a business expense.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 bg-cream px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-base text-charcoal leading-relaxed">
            AZAGC membership is designed to deliver a measurable return on investment. Contractor
            members consistently report that the value they receive — through advocacy wins, training
            discounts, insurance savings, and business connections — far exceeds the cost of their
            annual dues. View the full dues schedule below and{' '}
            <Link href="/membership/benefits/" className="text-red hover:underline">
              explore our member benefits
            </Link>{' '}
            to see exactly what you&apos;re getting.
          </p>
        </div>
      </section>

      {/* Dues tables */}
      <DuesTable />

      {/* ROI section */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl text-navy mb-6">
            The ROI of AZAGC Membership
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '$2,000+', label: 'Average savings on OSHA training per year for a 10-person crew' },
              { stat: '$3,500+', label: 'Estimated insurance premium savings through AZAGC group programs' },
              { stat: '90 years', label: 'Of advocacy protecting Arizona contractor interests' },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-cream p-6 rounded-sm text-center">
                <div className="font-display text-4xl text-red mb-2">{stat}</div>
                <p className="font-body text-sm text-slate">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="dues-form" className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="membership-dues"
            headline="Get a custom dues quote"
            subheadline="Tell us about your company and we'll follow up with a personalized membership proposal."
            submitLabel="Request a Quote →"
            showRoleSelect
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Dues & Pricing — Common Questions" />

      <BottomCTA />
    </>
  )
}
