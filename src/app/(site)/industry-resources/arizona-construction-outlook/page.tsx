import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Arizona Construction Industry Outlook 2026',
  description:
    'AZAGC\'s Arizona construction industry outlook for 2026. Market data, active project pipeline, workforce trends, and sector analysis for Arizona contractors.',
  openGraph: {
    title: 'Arizona Construction Industry Outlook 2026',
    description:
      'AZAGC\'s Arizona construction industry outlook for 2026. Market data, active project pipeline, workforce trends, and sector analysis for Arizona contractors.',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/industry-resources/arizona-construction-outlook/',
  },
}

const FAQS = [
  {
    question: 'How is Arizona construction performing in 2026?',
    answer:
      'Arizona construction remains one of the strongest markets in the country heading into 2026. Phoenix and the surrounding metro continue to lead the nation in commercial construction starts, and major infrastructure investments — including I-10 expansion, Loop 303 completion, and water infrastructure — are driving significant public works activity.',
  },
  {
    question: 'What are the biggest construction projects in Arizona right now?',
    answer:
      'Major active projects include the I-10 widening through Phoenix ($1.2B+), Loop 303 extensions in the West Valley, I-17 improvements north of Phoenix, several large data center campuses in the East Valley and Goodyear, semiconductor fab expansions (TSMC in North Phoenix), and multiple hospital and healthcare facility projects throughout the metro.',
  },
  {
    question: 'What is driving construction demand in Arizona?',
    answer:
      'Arizona construction demand is driven by population growth (one of the fastest-growing states in the U.S.), semiconductor and tech manufacturing expansion (Intel, TSMC, Microchip), federal infrastructure funding through IIJA, strong commercial real estate demand, and ongoing housing development in the Phoenix and Tucson metros.',
  },
  {
    question: 'How is the labor market for construction in Arizona?',
    answer:
      'Arizona faces a significant construction labor shortage. Industry data projects a need for 40,000+ additional construction workers in the state over the next decade. Wage rates for skilled trades have increased 8–12% year-over-year as contractors compete for talent. AZAGC\'s apprenticeship programs are directly addressing this gap.',
  },
  {
    question: 'Where can I find detailed Arizona construction industry data?',
    answer:
      'AZAGC members receive the full quarterly Arizona Construction Outlook report, which includes project-level data, wage surveys, material cost indices, and workforce analytics. Non-members can access summary data on this page. Join AZAGC to access the complete dataset.',
  },
]

const SECTORS = [
  { name: 'Transportation & Infrastructure', trend: '↑ Very Strong', note: 'IIJA funding + ADOT pipeline' },
  { name: 'Commercial / Industrial', trend: '↑ Strong', note: 'Semiconductor, data centers, logistics' },
  { name: 'Healthcare', trend: '↑ Moderate', note: 'Hospital expansions, medical office' },
  { name: 'Multifamily Residential', trend: '→ Stable', note: 'Normalization after 2021–23 peak' },
  { name: 'Water & Utilities', trend: '↑ Strong', note: 'CAP, SRP, municipal water projects' },
  { name: 'K-12 & Higher Education', trend: '↑ Moderate', note: 'Bond programs statewide' },
]

export default function AZConstructionOutlookPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Industry Resources', url: 'https://www.azagc.org/industry-resources/' },
          { name: 'Arizona Construction Outlook 2026', url: 'https://www.azagc.org/industry-resources/arizona-construction-outlook/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Industry Resources · Updated Q1 2026
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Arizona Construction Industry Outlook 2026
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            AZAGC tracks Arizona&apos;s construction market so you don&apos;t have to. Here&apos;s
            what the data says about where your industry is headed in 2026.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Arizona remains one of the nation&apos;s most active construction markets. Driven by
            population growth, federal infrastructure investment, and a wave of semiconductor and
            technology manufacturing expansion, the state&apos;s construction pipeline heading into
            2026 is robust across virtually every sector. AZAGC compiles quarterly market data from
            ADOT, Dodge Construction, the U.S. Census Bureau, and proprietary member surveys to
            give Arizona contractors the most accurate picture of where the work is.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-4">Market Summary: Q1 2026</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { stat: '$15B+', label: 'Active AZ construction pipeline' },
                { stat: '8.2%', label: 'YoY construction employment growth' },
                { stat: '$1.2B', label: 'I-10 expansion project value' },
                { stat: '40,000+', label: 'Workers needed over next decade' },
                { stat: '#3', label: 'AZ rank for commercial construction starts (national)' },
                { stat: '12%', label: 'Skilled trades wage increase YoY' },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-white border border-warm-gray p-5 rounded-sm">
                  <div className="font-display text-3xl text-red mb-1">{stat}</div>
                  <p className="font-body text-xs text-slate">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-4">Sector Outlook</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm border-collapse">
                <thead>
                  <tr className="bg-teal text-white">
                    <th className="text-left px-4 py-3">Sector</th>
                    <th className="text-left px-4 py-3">Trend</th>
                    <th className="text-left px-4 py-3">Key Drivers</th>
                  </tr>
                </thead>
                <tbody>
                  {SECTORS.map(({ name, trend, note }, i) => (
                    <tr key={name} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold text-navy">{name}</td>
                      <td className="px-4 py-3 text-charcoal">{trend}</td>
                      <td className="px-4 py-3 text-slate">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              Major Active Projects in Arizona
            </h2>
            <ul className="space-y-3">
              {[
                { project: 'I-10 South Mountain Freeway / Loop 202', value: '$2.1B', sector: 'Transportation' },
                { project: 'TSMC Fab 21 (North Phoenix)', value: '$40B+', sector: 'Industrial / Manufacturing' },
                { project: 'Loop 303 Corridor (West Valley)', value: '$850M', sector: 'Transportation' },
                { project: 'Phoenix Children\'s Hospital Expansion', value: '$500M', sector: 'Healthcare' },
                { project: 'I-17 Widening (Black Canyon City to Anthem)', value: '$400M', sector: 'Transportation' },
                { project: 'Phoenix Sky Harbor International Airport (concourse expansion)', value: '$300M', sector: 'Aviation' },
              ].map(({ project, value, sector }) => (
                <li key={project} className="flex items-start gap-4 bg-white border border-warm-gray p-4 rounded-sm">
                  <div className="flex-1">
                    <p className="font-body font-semibold text-navy text-sm">{project}</p>
                    <p className="font-body text-xs text-slate">{sector}</p>
                  </div>
                  <span className="font-body font-bold text-red text-sm flex-shrink-0">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-body text-sm text-slate">
            AZAGC members receive the full quarterly report with detailed project-level data, bid
            schedules, subcontractor opportunities, and wage benchmarking. Explore{' '}
            <Link href="/membership/" className="text-red hover:underline">
              AZAGC membership
            </Link>{' '}
            to access the complete dataset.
          </p>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="construction-outlook"
            headline="Get the Full Industry Report"
            subheadline="AZAGC members receive the full quarterly Arizona Construction Outlook with project-level data and wage benchmarking."
            submitLabel="Access the Report →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Arizona Construction Outlook — Common Questions" />

      <BottomCTA />
    </>
  )
}
