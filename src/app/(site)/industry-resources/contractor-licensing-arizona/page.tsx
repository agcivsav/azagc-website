import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Arizona Contractor License Requirements | Complete Guide',
  description:
    'Everything you need to know about Arizona contractor licensing through the ROC. Classifications, bonding, insurance, application process, and how AZAGC helps members.',
  openGraph: {
    title: 'Arizona Contractor License Requirements | Complete Guide',
    description:
      'Everything you need to know about Arizona contractor licensing through the ROC. Classifications, bonding, insurance, application process, and how AZAGC helps members.',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/industry-resources/contractor-licensing-arizona/',
  },
}

const FAQS = [
  {
    question: 'Do I need a license to be a contractor in Arizona?',
    answer:
      'Yes. Arizona law requires that any person or entity performing construction work for compensation of $1,000 or more (including materials and labor) must hold a valid contractor\'s license issued by the Arizona Registrar of Contractors (ROC). Working without a license is a misdemeanor and can result in significant fines.',
  },
  {
    question: 'What is the Arizona Registrar of Contractors (ROC)?',
    answer:
      'The Arizona Registrar of Contractors (ROC) is the state agency responsible for licensing and regulating contractors in Arizona. The ROC processes license applications, investigates complaints, and takes disciplinary action against contractors who violate Arizona contracting laws. All contractor licenses in Arizona are issued by the ROC.',
  },
  {
    question: 'What are the different contractor license classifications in Arizona?',
    answer:
      'Arizona contractor licenses fall into three main categories: (A) General Engineering Contractor — for large-scale infrastructure and civil work; (B) General Commercial Contractor — for commercial, industrial, and multifamily building construction; (C) Specialty Contractor — for specific trades like electrical, plumbing, HVAC, roofing, painting, and more. Each category has subcategories with specific scope of work.',
  },
  {
    question: 'How much does an Arizona contractor license cost?',
    answer:
      'ROC license fees vary by classification but generally range from $250–$650 for initial licensure. Additional costs include the licensing exam fee ($50–$100), fingerprint clearance card, bonding ($2,500–$15,000+ depending on classification), and general liability insurance. Total initial investment typically ranges from $1,000–$3,000+.',
  },
  {
    question: 'Does AZAGC help with Arizona contractor licensing?',
    answer:
      'Yes. AZAGC members have access to guidance on the licensing process, referrals to attorneys and consultants who specialize in ROC matters, and resources for understanding licensing requirements across different classifications. We also advocate at the state level on licensing policy that affects our members.',
  },
]

const CLASSIFICATIONS = [
  { code: 'A', name: 'General Engineering', examples: 'Highways, bridges, pipelines, dams, grading' },
  { code: 'B', name: 'General Commercial', examples: 'Commercial buildings, industrial facilities, multifamily' },
  { code: 'C-01', name: 'Electrical (Residential)', examples: 'Single-family and duplex residential electrical' },
  { code: 'C-11', name: 'Electrical (Commercial)', examples: 'Commercial and industrial electrical systems' },
  { code: 'C-37', name: 'Plumbing', examples: 'Piping, drainage, fixtures, water heaters' },
  { code: 'C-39', name: 'HVAC', examples: 'Heating, ventilation, air conditioning systems' },
  { code: 'C-36', name: 'Roofing', examples: 'Roof installation, repair, and waterproofing' },
  { code: 'C-09', name: 'Painting', examples: 'Interior and exterior painting, coatings' },
]

export default function ContractorLicensingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Industry Resources', url: 'https://www.azagc.org/industry-resources/' },
          { name: 'Arizona Contractor License Requirements', url: 'https://www.azagc.org/industry-resources/contractor-licensing-arizona/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Industry Resources
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Arizona Contractor License Requirements
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            A complete guide to getting and maintaining your Arizona contractor license through the
            Registrar of Contractors (ROC) — classifications, application steps, bonding,
            insurance, and renewal.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Arizona requires all contractors performing work valued at $1,000 or more to hold a
            valid license from the Arizona Registrar of Contractors (ROC). This requirement
            protects consumers and maintains professional standards in the industry. Understanding
            the licensing requirements — and staying compliant — is a fundamental obligation for
            every Arizona contractor.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-4">License Classifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm border-collapse">
                <thead>
                  <tr className="bg-teal text-white">
                    <th className="text-left px-4 py-3">Code</th>
                    <th className="text-left px-4 py-3">Classification</th>
                    <th className="text-left px-4 py-3">Typical Work</th>
                  </tr>
                </thead>
                <tbody>
                  {CLASSIFICATIONS.map(({ code, name, examples }, i) => (
                    <tr key={code} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold text-navy">{code}</td>
                      <td className="px-4 py-3 font-semibold text-charcoal">{name}</td>
                      <td className="px-4 py-3 text-slate">{examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-body text-xs text-slate mt-2">
              Arizona has 60+ specialty contractor classifications. Contact the ROC or AZAGC for
              the full list.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Application Process</h2>
            <ol className="space-y-4">
              {[
                { step: 'Determine your classification', desc: 'Identify which license class matches your scope of work.' },
                { step: 'Pass the licensing exam', desc: 'Most classifications require passing a written exam covering trade knowledge, business and law.' },
                { step: 'Obtain fingerprint clearance', desc: 'All qualifying partners, officers, and members must obtain an Arizona fingerprint clearance card.' },
                { step: 'Secure bonding and insurance', desc: 'Provide proof of the required surety bond ($2,500–$15,000) and general liability insurance.' },
                { step: 'Submit application to the ROC', desc: 'File your completed application with all supporting documents and pay the application fee.' },
                { step: 'Receive your license', desc: 'Processing typically takes 2–6 weeks. Your license number must be displayed on all contracts, vehicles, and advertising.' },
              ].map(({ step, desc }, i) => (
                <li key={step} className="flex gap-4">
                  <span className="w-7 h-7 bg-red text-white rounded-full flex items-center justify-center font-body font-bold text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-body font-bold text-navy">{step}: </span>
                    <span className="font-body text-slate text-sm">{desc}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">License Renewal</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              Arizona contractor licenses must be renewed every two years. Renewal requirements
              include: continuing education hours (varies by classification), updated bonding and
              insurance certificates, renewal fee payment, and any outstanding complaint resolution.
              Lapsed licenses can result in a stop-work order on active projects.
            </p>
          </div>

          <p className="font-body text-sm text-slate">
            Related resources:{' '}
            <Link href="/industry-resources/prevailing-wage-arizona/" className="text-red hover:underline">
              Prevailing wage compliance
            </Link>
            {' · '}
            <Link href="/membership/benefits/" className="text-red hover:underline">
              AZAGC member benefits
            </Link>
            {' · '}
            <Link href="/advocacy/" className="text-red hover:underline">
              AZAGC advocacy for contractors
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="contractor-licensing"
            headline="AZAGC Members Get Licensing Support"
            subheadline="Our membership team can connect you with resources and experts to help navigate the Arizona licensing process."
            submitLabel="Talk to a Membership Coordinator →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Arizona Contractor Licensing — Common Questions" />

      <BottomCTA />
    </>
  )
}
