import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Major Arizona Infrastructure Projects 2026 | AZAGC',
  description:
    'Track Arizona\'s biggest active infrastructure projects — I-10, Loop 303, I-17, water infrastructure, and more. AZAGC tracks the pipeline and advocates for Arizona contractors.',
  openGraph: {
    title: 'Major Arizona Infrastructure Projects 2026 | AZAGC',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: { canonical: 'https://www.azagc.org/resources/arizona-infrastructure-projects/' },
}

const FAQS = [
  {
    question: 'What are the biggest infrastructure projects in Arizona right now?',
    answer:
      'Major active projects include the TSMC Fab 21 semiconductor campus in North Phoenix (40B+), I-10 South Mountain Freeway / Loop 202 ($2.1B), Loop 303 extensions in the West Valley, SRP and CAP water infrastructure upgrades, Phoenix Sky Harbor expansion, and several large hospital and data center projects across the metro.',
  },
  {
    question: 'How is federal infrastructure funding affecting Arizona?',
    answer:
      'Arizona is receiving billions in federal infrastructure dollars through the Infrastructure Investment and Jobs Act (IIJA). ADOT alone has identified $8B+ in projects funded partly by IIJA. This federal funding is creating significant opportunities for Arizona contractors, particularly in transportation, water, and broadband infrastructure.',
  },
  {
    question: 'Where can I find upcoming infrastructure bid opportunities in Arizona?',
    answer:
      'AZAGC members receive a quarterly project pipeline report with upcoming bid opportunities from ADOT, ADWR, Phoenix Metro, and other agencies. ADOT also publishes its Five-Year Transportation Facilities Construction Program annually. Register with the Arizona Procurement Portal for state bid notifications.',
  },
  {
    question: 'How does AZAGC advocate for infrastructure investment?',
    answer:
      'AZAGC actively lobbies for adequate transportation and infrastructure funding at both the state and federal levels. We work with ADOT on the Statewide Transportation Improvement Program (STIP), advocate for increased infrastructure appropriations in the state budget, and engage with Arizona\'s congressional delegation on federal funding priorities.',
  },
  {
    question: 'Can AZAGC help me find subcontract opportunities on large projects?',
    answer:
      'AZAGC\'s network of 500+ member contractors provides informal subcontract opportunity sharing through our networking events and member directory. Large AZAGC member GCs frequently look to other AZAGC members when sourcing subcontractors. Membership is the most direct path to these opportunities.',
  },
]

const PROJECTS = [
  { name: 'TSMC Fab 21 (North Phoenix)', value: '$40B+', type: 'Industrial/Manufacturing', status: 'Active' },
  { name: 'I-10 / Loop 202 South Mountain Freeway', value: '$2.1B', type: 'Transportation', status: 'Active' },
  { name: 'Loop 303 West Valley Extensions', value: '$850M', type: 'Transportation', status: 'Active' },
  { name: 'Phoenix Sky Harbor Terminal 3 Modernization', value: '$590M', type: 'Aviation', status: 'Active' },
  { name: 'Phoenix Children\'s Hospital Expansion', value: '$500M', type: 'Healthcare', status: 'Under Construction' },
  { name: 'I-17 Widening (Black Canyon City to Anthem)', value: '$400M', type: 'Transportation', status: 'In Design' },
  { name: 'SRP Water Infrastructure Upgrades', value: '$350M+', type: 'Utilities/Water', status: 'Active' },
  { name: 'ASU Campus Development (Tempe)', value: '$300M+', type: 'Higher Education', status: 'Active' },
]

export default function AZInfrastructureProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Resources', url: 'https://www.azagc.org/resources/' },
          { name: 'Arizona Infrastructure Projects', url: 'https://www.azagc.org/resources/arizona-infrastructure-projects/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Resources · Infrastructure
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Major Arizona Infrastructure Projects 2026
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Arizona&apos;s construction pipeline is one of the busiest in the country. AZAGC tracks
            the major active and upcoming projects that create work for our member contractors.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            From the $40B+ TSMC semiconductor campus in North Phoenix to the I-10 South Mountain
            Freeway, Arizona is in the middle of a generational construction surge. Federal
            infrastructure funding through IIJA, a technology manufacturing boom, sustained
            population growth, and significant water infrastructure investment are all converging
            to create one of the strongest construction pipelines in the state&apos;s history.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-4">Major Active Projects</h2>
            <div className="space-y-3">
              {PROJECTS.map(({ name, value, type, status }) => (
                <div
                  key={name}
                  className="bg-white border border-warm-gray rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1">
                    <p className="font-body font-semibold text-navy text-sm">{name}</p>
                    <p className="font-body text-xs text-slate">{type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-body font-bold text-red text-sm">{value}</span>
                    <span className="font-body text-xs bg-cream px-2 py-1 rounded-sm text-slate">{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">AZAGC&apos;s Role in Arizona Infrastructure</h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              AZAGC advocates for the infrastructure investment that creates work for Arizona
              contractors. Our Government Affairs Committee works with ADOT, the Governor&apos;s
              office, the state legislature, and Arizona&apos;s congressional delegation to ensure
              that Arizona receives its fair share of federal infrastructure dollars and that the
              state budget prioritizes construction and maintenance of public facilities.
            </p>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC members are the contractors who build these projects. From the GCs who prime
              the largest contracts to the specialty subs who do the detailed work, our membership
              represents every tier of Arizona&apos;s construction ecosystem. Learn about{' '}
              <Link href="/membership/" className="text-red hover:underline">
                AZAGC membership
              </Link>{' '}
              and our{' '}
              <Link href="/advocacy/" className="text-red hover:underline">
                advocacy for Arizona contractors
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="infrastructure-projects"
            headline="Get the Full Project Pipeline Report"
            subheadline="AZAGC members receive our quarterly Arizona project pipeline report with upcoming bid opportunities."
            submitLabel="Access the Pipeline Report →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Arizona Infrastructure — Common Questions" />
      <BottomCTA />
    </>
  )
}
