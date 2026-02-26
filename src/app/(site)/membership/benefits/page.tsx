import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BenefitsGrid from '@/components/sections/BenefitsGrid'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'AZAGC Membership Benefits for Arizona Contractors',
  description:
    'Discover the full range of AZAGC contractor membership benefits — advocacy, workforce training, safety resources, legal support, and a statewide network of 500+ contractors.',
  openGraph: {
    title: 'AZAGC Membership Benefits for Arizona Contractors',
    description:
      'Discover the full range of AZAGC contractor membership benefits — advocacy, workforce training, safety resources, legal support, and a statewide network of 500+ contractors.',
    type: 'website',
    siteName: 'AZAGC',
  },
  alternates: {
    canonical: 'https://www.azagc.org/membership/benefits/',
  },
}

const FAQS = [
  {
    question: 'What benefits do AZAGC contractor members receive?',
    answer:
      'AZAGC contractor members receive full legislative advocacy at the state and federal level, access to workforce training programs including OSHA certifications and apprenticeship programs, safety resources and benchmarking data, legal resources and contract templates, group insurance programs, 25+ networking events per year, and full access to the AGC of America national network.',
  },
  {
    question: 'How does AZAGC advocacy benefit my construction business?',
    answer:
      'AZAGC employs full-time lobbyists who work year-round in Phoenix and Washington D.C. to represent contractor interests. This includes fighting against burdensome regulations, advocating for infrastructure funding, opposing unfair bidding practices, and shaping Arizona construction law. Members get a direct voice through committee participation.',
  },
  {
    question: 'What safety resources does AZAGC provide?',
    answer:
      'AZAGC provides members with toolbox talk materials, jobsite safety checklists, incident rate benchmarking data, OSHA compliance guidance, and a Safety Awards program that recognizes members for outstanding safety performance. We also partner with OSHA to deliver subsidized training courses.',
  },
  {
    question: 'How much does AZAGC membership cost?',
    answer:
      'Contractor membership dues are based on annual revenue, starting at $800/year for contractors under $1M in revenue and scaling up to $3,200+/year for $30M+ contractors. Affiliate membership is a flat $650/year. All dues are tax-deductible as a business expense. View the full dues schedule on our membership dues page.',
  },
  {
    question: 'Is AZAGC membership worth it for small contractors?',
    answer:
      'Absolutely. The legal resources alone — contract templates and access to construction attorneys — can save thousands per year. Add in the OSHA training discounts, insurance program savings, and advocacy representation, and most members recoup their dues investment within the first few months. We also offer payment plans for smaller contractors.',
  },
]

export default function MembershipBenefitsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Membership', url: 'https://www.azagc.org/membership/' },
          { name: 'Benefits', url: 'https://www.azagc.org/membership/benefits/' },
        ]}
      />

      {/* Hero */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Membership
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            AZAGC Membership Benefits for Arizona Contractors
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            Membership in AZAGC — the Arizona Chapter of the Associated General Contractors of
            America — delivers real, measurable value to every Arizona contractor, from the small
            specialty sub to the state&apos;s largest general contractors.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto prose prose-slate max-w-none">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Since 1934, AZAGC has served as the voice of Arizona&apos;s construction industry —
            advocating at the state Capitol, developing the next generation of craft workers, and
            delivering resources that help contractors run safer, more profitable businesses. When
            you join AZAGC, you join a network of 500+ member companies representing over $1 billion
            in annual construction volume across every sector of Arizona&apos;s market.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <BenefitsGrid />

      {/* Deep dive sections */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Legislative Advocacy</h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              AZAGC is the only construction association in Arizona with full-time, year-round
              lobbyists at the State Capitol. Our advocacy team tracks every bill that affects
              contractors — from lien law to prevailing wage to occupational licensing — and fights
              to protect your interests.
            </p>
            <p className="font-body text-base text-slate leading-relaxed">
              Through our partnership with AGC of America, we also have a presence in Washington
              D.C., working to secure federal infrastructure funding that creates work for Arizona
              contractors. Members participate directly through our Government Affairs Committee.
              Learn more on our{' '}
              <Link href="/advocacy/" className="text-red hover:underline">
                advocacy page
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Workforce Development & Training</h2>
            <p className="font-body text-base text-slate leading-relaxed mb-4">
              Arizona&apos;s construction industry faces a workforce shortage. AZAGC is directly
              addressing it through our{' '}
              <Link href="/education-training/construction-apprenticeship-arizona/" className="text-red hover:underline">
                apprenticeship programs
              </Link>{' '}
              that train the next generation of skilled trades workers, and our{' '}
              <Link href="/education-training/osha-training/" className="text-red hover:underline">
                OSHA safety training
              </Link>{' '}
              that keeps your workforce certified and compliant.
            </p>
            <p className="font-body text-base text-slate leading-relaxed">
              We also offer management development courses, foreman training, and leadership
              programs through our partnership with AGC of America Education. Members receive
              discounted rates on all programs.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Legal & Risk Resources</h2>
            <p className="font-body text-base text-slate leading-relaxed">
              AZAGC members have access to construction-specific contract templates vetted by
              Arizona attorneys, a legal resources hotline, and discounted rates with construction
              law specialists. When disputes arise, you&apos;ll have resources in your corner. We
              also offer guidance on{' '}
              <Link href="/industry-resources/contractor-licensing-arizona/" className="text-red hover:underline">
                Arizona contractor licensing
              </Link>{' '}
              and{' '}
              <Link href="/industry-resources/prevailing-wage-arizona/" className="text-red hover:underline">
                prevailing wage compliance
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Mid-page lead form */}
      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="membership-benefits"
            headline="Ready to access these benefits?"
            subheadline="A membership coordinator will follow up within one business day."
            submitLabel="Get My Benefits Overview →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Membership Benefits — Common Questions" />

      <BottomCTA />
    </>
  )
}
