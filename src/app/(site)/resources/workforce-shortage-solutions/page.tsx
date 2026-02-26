import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Solving the Construction Workforce Shortage in Arizona | AZAGC',
  description:
    'Arizona needs 40,000+ more construction workers. AZAGC addresses the labor gap through apprenticeship programs, K-12 outreach, workforce development, and advocacy.',
  openGraph: {
    title: 'Solving the Construction Workforce Shortage in Arizona | AZAGC',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: { canonical: 'https://www.azagc.org/resources/workforce-shortage-solutions/' },
}

const FAQS = [
  {
    question: 'How severe is the construction workforce shortage in Arizona?',
    answer:
      'Arizona faces a shortage of an estimated 40,000+ construction workers over the next decade, based on industry projections from ABC and AGC of America. The shortage is most acute in skilled trades — particularly electricians, plumbers, HVAC technicians, and carpenters. Wage competition is intense, with skilled trade wages increasing 8–12% year-over-year.',
  },
  {
    question: 'What is AZAGC doing to address the workforce shortage?',
    answer:
      'AZAGC operates Registered Apprenticeship programs in multiple trades, partners with Arizona high schools through Build Your Future Arizona (BYF-AZ) outreach, funds workforce development programs, and advocates at the state level for policies that support craft workforce development.',
  },
  {
    question: 'How can construction companies recruit through AZAGC?',
    answer:
      'AZAGC member companies can sponsor apprentices through our apprenticeship program, participate in career fairs and school outreach events, and tap the AZAGC member network for experienced worker referrals. Our apprenticeship program also serves as a pipeline of trained workers to member companies.',
  },
  {
    question: 'What is Build Your Future Arizona (BYF-AZ)?',
    answer:
      'Build Your Future Arizona is a program supported by AZAGC and other construction associations that introduces construction careers to Arizona high school students. It includes school visits, career fairs, and the Build Your Future website that connects students with apprenticeship and training opportunities.',
  },
  {
    question: 'Does AZAGC support diversity in construction hiring?',
    answer:
      'Yes. AZAGC supports expanding the construction workforce to include underrepresented groups — women, veterans, and others who have historically been underrepresented in the trades. We partner with programs that recruit from these communities and encourage member companies to adopt inclusive hiring practices.',
  },
]

export default function WorkforceShortageePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Resources', url: 'https://www.azagc.org/resources/' },
          { name: 'Workforce Shortage Solutions', url: 'https://www.azagc.org/resources/workforce-shortage-solutions/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Resources · Workforce
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Solving the Construction Workforce Shortage in Arizona
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Arizona construction needs 40,000+ more workers. Here&apos;s how AZAGC is addressing
            the labor gap — and what it means for your company.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            The construction workforce shortage is not a future problem — it is happening now.
            Nationally, the industry needs 400,000+ additional workers. In Arizona, the gap is
            particularly acute because population growth and a booming construction pipeline are
            creating demand that far outpaces the available workforce. For Arizona contractors, the
            shortage means higher labor costs, longer project timelines, and difficulty staffing
            projects. AZAGC is directly addressing this challenge.
          </p>

          {[
            {
              title: 'Registered Apprenticeship Programs',
              body: `AZAGC operates Registered Apprenticeship programs recognized by the U.S. Department of Labor. These programs create a pipeline of trained, credentialed workers who come up through member companies. Apprentices earn while they learn, and sponsoring companies get loyal, trained workers at controlled cost. Learn more about our <a href="/education-training/construction-apprenticeship-arizona/" class="text-red hover:underline">construction apprenticeship programs</a>.`,
            },
            {
              title: 'K-12 Outreach: Build Your Future Arizona',
              body: 'AZAGC partners in the Build Your Future Arizona (BYF-AZ) initiative, which visits Arizona high schools to introduce students to construction careers. BYF-AZ career events demonstrate the earning potential of the skilled trades and connect students with apprenticeship and training opportunities.',
            },
            {
              title: 'Workforce Development Advocacy',
              body: 'AZAGC advocates at the state level for policies that support workforce development — including Career and Technical Education (CTE) funding in Arizona high schools, Perkins Act implementation, and apprenticeship expansion incentives for employers.',
            },
            {
              title: 'Diversity & Inclusion Initiatives',
              body: 'Expanding the construction workforce requires reaching communities that have historically been underrepresented in the trades. AZAGC supports programs that recruit women, veterans, formerly incarcerated individuals, and other underrepresented groups into construction careers.',
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display text-2xl text-navy mb-3">{title}</h2>
              <p
                className="font-body text-base text-slate leading-relaxed"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </div>
          ))}

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">What Contractors Can Do</h2>
            <ul className="space-y-2">
              {[
                'Sponsor apprentices through the AZAGC apprenticeship program',
                'Participate in BYF-AZ career fairs and school visits',
                'Offer competitive wages and benefits to attract and retain skilled workers',
                'Invest in your existing workforce through OSHA and leadership training',
                'Join AZAGC to access workforce resources and the member network',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-base text-charcoal">
                  <span className="text-red flex-shrink-0 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-slate mt-4">
              Also see:{' '}
              <Link href="/education-training/construction-apprenticeship-arizona/" className="text-red hover:underline">
                Apprenticeship programs
              </Link>
              {' · '}
              <Link href="/education-training/osha-training/" className="text-red hover:underline">
                OSHA training
              </Link>
              {' · '}
              <Link href="/membership/" className="text-red hover:underline">
                AZAGC membership
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="workforce-shortage"
            headline="Partner with AZAGC on Workforce"
            subheadline="Learn how to sponsor apprentices, access member workforce resources, and join the network solving Arizona's labor gap."
            submitLabel="Talk to Our Team →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Workforce Shortage — Common Questions" />
      <BottomCTA />
    </>
  )
}
