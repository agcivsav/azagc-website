import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'OSHA Safety Training for Arizona Contractors | AZAGC',
  description:
    'OSHA 10 and OSHA 30-hour courses for Arizona contractors through AZAGC. Competent person training, safety certifications, and subsidized rates for members. Enroll today.',
  openGraph: {
    title: 'OSHA Safety Training for Arizona Contractors | AZAGC',
    description:
      'OSHA 10 and OSHA 30-hour courses for Arizona contractors through AZAGC. Competent person training, safety certifications, and subsidized rates for members. Enroll today.',
    type: 'website',
    siteName: 'AZAGC',
  },
  alternates: { canonical: 'https://www.azagc.org/education-training/osha-training/' },
}

const FAQS = [
  {
    question: 'What OSHA courses does AZAGC offer?',
    answer:
      'AZAGC offers OSHA 10-Hour Construction, OSHA 30-Hour Construction, Competent Person training, First Aid/CPR, and site-specific safety programs. We work with OSHA-authorized trainers to deliver subsidized courses for member companies.',
  },
  {
    question: 'Is OSHA 30 required for contractors in Arizona?',
    answer:
      'OSHA 30 is not universally required by Arizona state law, but it is required on many public works projects and federal contracts. Many general contractors require subcontractors and supervisors to hold OSHA 30 cards. It is strongly recommended for all foremen and supervisors in Arizona construction.',
  },
  {
    question: 'How long does OSHA 10 certification take?',
    answer:
      'The OSHA 10-Hour Construction course is delivered over two days (10 contact hours). The OSHA 30-Hour course is typically delivered over four days or in multiple sessions. Upon successful completion, you receive an OSHA card issued by the U.S. Department of Labor.',
  },
  {
    question: 'Do OSHA cards expire?',
    answer:
      'OSHA 10 and OSHA 30 cards do not technically expire — once earned, they do not have a formal renewal requirement from OSHA. However, many project owners and general contractors have their own policies requiring cards to be renewed every 3–5 years. We recommend refreshers every 3–4 years to stay current with updated standards.',
  },
  {
    question: 'Can I get OSHA training online through AZAGC?',
    answer:
      'AZAGC offers both in-person and online OSHA training options. Online courses are available for OSHA 10 and OSHA 30. In-person courses are recommended for field supervisors and workers, while online delivery works well for office-based project managers. Contact us for the current schedule.',
  },
]

export default function OshaTrainingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Education & Training', url: 'https://www.azagc.org/education-training/' },
          { name: 'OSHA Training', url: 'https://www.azagc.org/education-training/osha-training/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Education &amp; Training
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            OSHA Safety Training for Arizona Contractors
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            AZAGC delivers OSHA-authorized training to help Arizona contractors keep workers safe,
            meet project requirements, and reduce liability. Members receive subsidized rates on all
            safety courses.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Safety is not just a legal requirement — it is a competitive advantage. Contractors with
            strong safety records win more work, pay lower insurance premiums, and retain their best
            employees longer. AZAGC has partnered with OSHA-authorized training providers to deliver
            affordable, high-quality safety courses that meet the needs of Arizona construction
            companies of all sizes.
          </p>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">OSHA 10-Hour Construction</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              The OSHA 10-Hour course is designed for entry-level construction workers. It provides
              a broad overview of the most common jobsite hazards — fall protection, electrical
              safety, scaffolding, personal protective equipment, and more. This course is often
              required for workers on public works projects and larger commercial sites.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">OSHA 30-Hour Construction</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              The OSHA 30-Hour course is the standard for supervisors, foremen, and safety
              managers. It covers all the topics in OSHA 10 plus deeper dives into hazard
              recognition, recordkeeping requirements, OSHA inspection procedures, and
              industry-specific standards. OSHA 30 is required on virtually all federal projects
              and many state and municipal contracts in Arizona.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Competent Person Training</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              OSHA standards require a &quot;competent person&quot; be present for certain
              hazardous operations — trenching and excavation, scaffolding, fall protection, and
              others. AZAGC offers competent person training for each of these categories.
              Completing this training allows your supervisors to legally serve as the required
              competent person on your jobsites.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">
              Why Train Through AZAGC?
            </h2>
            <ul className="space-y-2">
              {[
                'Subsidized rates for AZAGC members — average savings of $200+ per participant',
                'OSHA-authorized instructors with Arizona construction experience',
                'Flexible scheduling — evening, weekend, and on-site options available',
                'Courses count toward AZAGC Safety Awards program points',
                'Multilingual instruction available (English and Spanish)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-base text-charcoal">
                  <span className="text-red flex-shrink-0 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-slate mt-4">
              Also explore our{' '}
              <Link href="/education-training/construction-apprenticeship-arizona/" className="text-red hover:underline">
                construction apprenticeship programs
              </Link>{' '}
              and full{' '}
              <Link href="/education-training/" className="text-red hover:underline">
                education &amp; training calendar
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="osha-training"
            headline="Enroll in OSHA Training"
            subheadline="Tell us your team size and we'll send you available course dates and member pricing."
            submitLabel="Request Training Info →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="OSHA Training — Common Questions" />

      <BottomCTA />
    </>
  )
}
