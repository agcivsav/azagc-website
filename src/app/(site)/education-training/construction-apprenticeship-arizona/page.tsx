import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Construction Apprenticeship Programs in Arizona | AZAGC',
  description:
    'Apply for AZAGC construction apprenticeship programs in Arizona. Earn while you learn in carpentry, electrical, HVAC, ironwork, and more. Programs based in Phoenix and statewide.',
  openGraph: {
    title: 'Construction Apprenticeship Programs in Arizona | AZAGC',
    description:
      'Apply for AZAGC construction apprenticeship programs in Arizona. Earn while you learn in carpentry, electrical, HVAC, ironwork, and more. Programs based in Phoenix and statewide.',
    type: 'website',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/education-training/construction-apprenticeship-arizona/',
  },
}

const FAQS = [
  {
    question: 'What trades are covered in the AZAGC apprenticeship program?',
    answer:
      'AZAGC apprenticeship programs cover a range of construction trades including carpentry, electrical, plumbing, HVAC/sheet metal, ironwork, masonry, and painting. The specific trades available may vary by year and enrollment. Contact us for the current trade offerings.',
  },
  {
    question: 'Who is eligible to apply for the AZAGC apprenticeship?',
    answer:
      'Applicants must be at least 18 years old, have a high school diploma or GED, be physically able to perform the essential functions of the trade, and be legally authorized to work in the United States. Some programs have additional requirements such as a valid driver\'s license or basic math skills assessment.',
  },
  {
    question: 'How long is the AZAGC apprenticeship program?',
    answer:
      'Most AZAGC apprenticeship programs run 3–5 years, depending on the trade. During this time, apprentices work full-time for a sponsoring contractor (earning wages) and attend related technical instruction (RTI) classes — typically one evening per week or on scheduled training days.',
  },
  {
    question: 'How much do apprentices earn during the program?',
    answer:
      'Apprentice wages start at a percentage of the journeyman wage rate for your trade and increase as you advance through the program. Typically, apprentices start at 50–60% of journeyman wage and reach 90%+ by the final year. Upon graduation, you earn full journeyman wages — significantly above Arizona\'s minimum wage.',
  },
  {
    question: 'How do I apply for the AZAGC apprenticeship program?',
    answer:
      'Fill out the inquiry form on this page and our apprenticeship coordinator will follow up with current enrollment dates, required documents, and next steps. Applications are accepted on a rolling basis, with new cohorts starting throughout the year.',
  },
]

const TRADES = [
  'Carpentry', 'Electrical', 'Plumbing', 'HVAC / Sheet Metal',
  'Ironwork / Structural Steel', 'Masonry', 'Painting & Finishing', 'Pipefitting',
]

export default function ApprenticeshipPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Education & Training', url: 'https://www.azagc.org/education-training/' },
          { name: 'Construction Apprenticeship Arizona', url: 'https://www.azagc.org/education-training/construction-apprenticeship-arizona/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Education &amp; Training
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Construction Apprenticeship Programs in Arizona
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            AZAGC operates one of Arizona&apos;s leading construction apprenticeship programs —
            a structured, earn-while-you-learn pathway to a career in the skilled trades.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Arizona&apos;s construction industry needs skilled workers now. AZAGC&apos;s
            apprenticeship program is a Registered Apprenticeship — recognized by the U.S.
            Department of Labor — that connects motivated individuals with sponsoring contractors
            who need talent. As an apprentice, you earn a competitive wage from day one while
            working toward a journeyman certification that opens doors across the country.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-4">Trades Available</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TRADES.map((trade) => (
                <div
                  key={trade}
                  className="bg-white border border-warm-gray rounded-sm px-4 py-3 font-body text-sm font-semibold text-navy text-center"
                >
                  {trade}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">How the Program Works</h2>
            <ol className="space-y-4">
              {[
                {
                  step: '1. Apply',
                  desc: 'Submit your application and complete our intake assessment. We evaluate basic aptitude and fit for your chosen trade.',
                },
                {
                  step: '2. Get Placed',
                  desc: 'We match you with a sponsoring AZAGC member contractor in your trade. You become their employee from day one.',
                },
                {
                  step: '3. Work & Learn',
                  desc: 'Work full-time on real construction projects while attending Related Technical Instruction (RTI) classes to build your knowledge base.',
                },
                {
                  step: '4. Advance',
                  desc: 'Progress through apprenticeship levels as you accumulate hours and pass competency assessments. Your wages increase with each level.',
                },
                {
                  step: '5. Graduate as a Journeyman',
                  desc: 'After 3–5 years, you earn your journeyman certification — a nationally recognized credential that commands full journeyman wages.',
                },
              ].map(({ step, desc }) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-red text-lg font-bold flex-shrink-0 w-6">{step.split('.')[0]}.</span>
                  <div>
                    <span className="font-body font-bold text-navy">{step.split('. ')[1]}: </span>
                    <span className="font-body text-slate text-base">{desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Why Skilled Trades?</h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              The construction industry faces a shortage of 400,000+ workers nationally. In Arizona,
              that gap is especially acute as $15+ billion in infrastructure and commercial projects
              move through the pipeline. Skilled tradespeople are in demand — and that demand drives
              wages up. Journeymen in many trades earn $60,000–$100,000+ per year in Arizona.
            </p>
            <p className="font-body text-base text-slate leading-relaxed">
              Learn more about how AZAGC is addressing{' '}
              <Link href="/resources/workforce-shortage-solutions/" className="text-red hover:underline">
                Arizona&apos;s construction workforce shortage
              </Link>{' '}
              and explore{' '}
              <Link href="/membership/" className="text-red hover:underline">
                contractor membership
              </Link>{' '}
              if you&apos;re a company looking to sponsor apprentices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="apprenticeship"
            headline="Apply for AZAGC Apprenticeship"
            subheadline="Fill out the form and our apprenticeship coordinator will follow up with enrollment details."
            submitLabel="Start My Application →"
            showRoleSelect={false}
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Apprenticeship Program — Common Questions" />

      <BottomCTA />
    </>
  )
}
