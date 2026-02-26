import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Industry Resources for Arizona Contractors | AZAGC',
  description:
    'AZAGC resource library for Arizona contractors — construction safety, infrastructure projects, workforce data, prevailing wage guides, and licensing information.',
  openGraph: {
    title: 'Industry Resources for Arizona Contractors | AZAGC',
    description:
      'AZAGC resource library for Arizona contractors — construction safety, infrastructure projects, workforce data, prevailing wage guides, and licensing information.',
    type: 'website',
    siteName: 'AZAGC',
  },
  alternates: { canonical: 'https://www.azagc.org/resources/' },
}

const RESOURCES = [
  {
    title: 'Construction Safety Resources',
    href: '/resources/construction-safety-resources/',
    desc: 'Safety programs, OSHA partnerships, safety awards, and incident rate benchmarking for Arizona contractors.',
    category: 'Safety',
  },
  {
    title: 'Arizona Infrastructure Projects 2026',
    href: '/resources/arizona-infrastructure-projects/',
    desc: 'Track major active and upcoming infrastructure projects across Arizona — I-10, Loop 303, I-17, and more.',
    category: 'Infrastructure',
  },
  {
    title: 'Construction Workforce Shortage Solutions',
    href: '/resources/workforce-shortage-solutions/',
    desc: 'How AZAGC is addressing Arizona\'s construction labor gap through apprenticeships, outreach, and workforce programs.',
    category: 'Workforce',
  },
  {
    title: 'Arizona Construction Industry Outlook 2026',
    href: '/industry-resources/arizona-construction-outlook/',
    desc: 'Market data, project pipeline, sector analysis, and wage trends for Arizona\'s construction industry.',
    category: 'Industry Data',
  },
  {
    title: 'Prevailing Wage Compliance Guide',
    href: '/industry-resources/prevailing-wage-arizona/',
    desc: 'Davis-Bacon Act, Arizona state prevailing wage law, certified payroll requirements, and compliance tools.',
    category: 'Compliance',
  },
  {
    title: 'Arizona Contractor License Requirements',
    href: '/industry-resources/contractor-licensing-arizona/',
    desc: 'ROC licensing classifications, application process, bonding, insurance, and renewal requirements.',
    category: 'Licensing',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Safety: 'bg-red/10 text-red',
  Infrastructure: 'bg-teal/10 text-teal',
  Workforce: 'bg-gold/10 text-navy',
  'Industry Data': 'bg-navy/10 text-navy',
  Compliance: 'bg-red/10 text-red',
  Licensing: 'bg-teal/10 text-teal',
}

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Resources', url: 'https://www.azagc.org/resources/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Resources
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Industry Resources for Arizona Contractors
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            AZAGC compiles the data, guides, and tools Arizona contractors need to run safer,
            smarter, more compliant businesses.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.map(({ title, href, desc, category }) => (
              <Link
                key={title}
                href={href}
                className="bg-white border border-warm-gray rounded-sm p-6 flex flex-col gap-3 hover:border-red transition-colors group"
              >
                <span className={`inline-block text-xs font-body font-semibold uppercase tracking-wide px-2 py-1 rounded-sm w-fit ${CATEGORY_COLORS[category] || 'bg-cream text-slate'}`}>
                  {category}
                </span>
                <h2 className="font-display text-lg text-navy group-hover:text-red transition-colors">
                  {title}
                </h2>
                <p className="font-body text-sm text-slate leading-relaxed flex-1">{desc}</p>
                <span className="font-body text-sm font-semibold text-red">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="resources-hub"
            headline="Looking for something specific?"
            subheadline="Our membership team can point you to the right resources or connect you with an AZAGC expert."
            submitLabel="Get Help →"
            dark
          />
        </div>
      </section>

      <BottomCTA />
    </>
  )
}
