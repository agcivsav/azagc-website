import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Prevailing Wage Compliance Guide for Arizona Contractors',
  description:
    'Complete guide to prevailing wage laws and Davis-Bacon compliance for Arizona contractors. AZAGC helps members navigate wage rates, certified payroll, and recordkeeping requirements.',
  openGraph: {
    title: 'Prevailing Wage Compliance Guide for Arizona Contractors',
    description:
      'Complete guide to prevailing wage laws and Davis-Bacon compliance for Arizona contractors. AZAGC helps members navigate wage rates, certified payroll, and recordkeeping requirements.',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/industry-resources/prevailing-wage-arizona/',
  },
}

const FAQS = [
  {
    question: 'What is prevailing wage in Arizona?',
    answer:
      'Prevailing wage is the minimum hourly wage and fringe benefit rate that must be paid to workers on public works construction projects. Rates are set by trade and geographic area. For federally funded projects, the Davis-Bacon Act governs prevailing wage. Arizona also has its own state prevailing wage law (A.R.S. § 34-321) applicable to state-funded public works.',
  },
  {
    question: 'Does the Davis-Bacon Act apply to Arizona construction projects?',
    answer:
      'Yes. Davis-Bacon applies to federally funded or federally assisted construction contracts exceeding $2,000 for the construction, alteration, or repair of public buildings or public works. With the massive influx of federal infrastructure funding through IIJA, more Arizona projects are subject to Davis-Bacon than ever before.',
  },
  {
    question: 'How are prevailing wage rates set in Arizona?',
    answer:
      'For Davis-Bacon projects, rates are set by the U.S. Department of Labor based on surveys of wages paid in the geographic area. For state projects, the Arizona Department of Administration conducts its own surveys. Rates are published by trade classification (e.g., Carpenter, Electrician, Iron Worker) and must be posted at the jobsite.',
  },
  {
    question: 'What are the penalties for prevailing wage violations in Arizona?',
    answer:
      'Penalties for Davis-Bacon violations can include back wages owed to all affected workers, debarment from federal contracts for up to 3 years, contract termination, and referral to the Department of Justice in cases of fraud. State prevailing wage violations can result in similar penalties. Ignorance of the requirement is not a defense.',
  },
  {
    question: 'Does AZAGC help members with prevailing wage compliance?',
    answer:
      'Yes. AZAGC provides members with compliance resources including certified payroll report templates, guidance on wage determination lookups, links to current DOL wage rates, and access to labor attorneys familiar with Arizona prevailing wage law. AZAGC also advocates at the state level on prevailing wage policy affecting Arizona contractors.',
  },
]

export default function PrevailingWagePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Industry Resources', url: 'https://www.azagc.org/industry-resources/' },
          { name: 'Prevailing Wage Arizona', url: 'https://www.azagc.org/industry-resources/prevailing-wage-arizona/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Industry Resources
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Prevailing Wage Compliance Guide for Arizona Contractors
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Everything Arizona contractors need to know about prevailing wage laws, Davis-Bacon
            requirements, certified payroll, and how to stay compliant on public works projects.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Prevailing wage compliance is one of the most common sources of risk for Arizona
            contractors bidding on public works projects. With billions in new federal infrastructure
            dollars flowing into Arizona through the Infrastructure Investment and Jobs Act (IIJA),
            more contractors than ever are encountering Davis-Bacon requirements — sometimes for the
            first time. This guide will help you understand your obligations and avoid costly
            violations.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              What Is the Davis-Bacon Act?
            </h2>
            <p className="font-body text-base text-slate leading-relaxed">
              The Davis-Bacon Act (40 U.S.C. §§ 3141–3148) requires contractors and subcontractors
              on federal construction contracts exceeding $2,000 to pay workers at least the locally
              prevailing wages and fringe benefits for corresponding work on similar projects. The
              law applies to contractors and subcontractors — if you&apos;re a sub on a federally
              funded project, you are bound by Davis-Bacon even if your direct contract is not with
              the federal agency.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              Arizona State Prevailing Wage Law
            </h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              Arizona&apos;s prevailing wage statute (A.R.S. § 34-321) applies to state-funded
              public works construction contracts. Wage determinations are issued by the Arizona
              Department of Administration for projects within state jurisdiction. Key differences
              from Davis-Bacon include:
            </p>
            <ul className="space-y-2">
              {[
                'Dollar threshold varies from Davis-Bacon federal threshold',
                'Rates are determined by state surveys, not U.S. DOL surveys',
                'Applies to state agency contracts — cities and counties may have their own ordinances',
                'Certified payroll requirements mirror Davis-Bacon format',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-charcoal">
                  <span className="text-teal flex-shrink-0 mt-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              Certified Payroll Requirements
            </h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              Contractors on prevailing wage projects must submit weekly certified payroll reports
              (Form WH-347 for Davis-Bacon projects) to the contracting agency. These reports must
              include: employee name, address, and Social Security number; work classification;
              hours worked by day and week; wage rate paid; deductions; and net wages.
            </p>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC members have access to certified payroll templates and guidance documents.
              Contact our resources team using the form below to download the compliance checklist.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              How AZAGC Helps Members Stay Compliant
            </h2>
            <ul className="space-y-2">
              {[
                'Certified payroll report templates (WH-347 compliant)',
                'Wage determination lookup guides for Arizona counties',
                'Access to labor attorneys specializing in prevailing wage',
                'Legislative advocacy — AZAGC monitors prevailing wage law changes',
                'Educational seminars on Davis-Bacon compliance best practices',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-base text-charcoal">
                  <span className="text-red flex-shrink-0 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-slate mt-4">
              Also see our{' '}
              <Link href="/advocacy/" className="text-red hover:underline">
                advocacy page
              </Link>{' '}
              for AZAGC&apos;s position on prevailing wage legislation and our{' '}
              <Link href="/industry-resources/contractor-licensing-arizona/" className="text-red hover:underline">
                contractor licensing guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="prevailing-wage"
            headline="Get the Compliance Checklist"
            subheadline="AZAGC members receive the full prevailing wage compliance toolkit — certified payroll templates, wage determination guides, and more."
            submitLabel="Download Checklist →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Prevailing Wage — Common Questions" />

      <BottomCTA />
    </>
  )
}
