import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Membership | AZAGC",
  description: "Join AZAGC — the Arizona Chapter of the Associated General Contractors of America. Contractor, Affiliate, and YCF membership options. Benefits, advocacy, training, and 500+ member network.",
  alternates: { canonical: "https://www.azagc.org/membership/" },
}

const FAQS = [{"question":"What is AZAGC?","answer":"AZAGC is the Arizona Chapter of the Associated General Contractors of America — the oldest and most respected construction trade association in Arizona, founded in 1934."},{"question":"How do I join AZAGC?","answer":"Fill out the membership inquiry form on this page. A membership coordinator will follow up within one business day with your custom membership proposal."},{"question":"Are dues tax-deductible?","answer":"Yes, AZAGC dues are generally tax-deductible as a business expense, minus the portion attributable to lobbying activities (disclosed annually)."},{"question":"Can a company have multiple members?","answer":"Yes. Company membership covers all employees. Multiple staff members can attend events and use member resources under a single company membership."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Membership", url: "https://www.azagc.org/membership/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Membership</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">AZAGC Membership</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">Join Arizona's oldest and most influential construction association. 500+ member firms. 90+ years of advocacy, education, and industry leadership.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Three Ways to Join</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC offers membership for every company in the construction ecosystem. <strong>Contractor members</strong> include GCs, subcontractors, and specialty contractors who perform construction work. <strong>Affiliate members</strong> are suppliers, vendors, and service providers who support the industry. <strong>Young Constructors Forum (YCF)</strong> members are construction professionals under 40 within member companies.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Why Join AZAGC?</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC is the only construction association in Arizona with full-time lobbyists at the Capitol, a DOL-registered apprenticeship program, and a 90-year track record of protecting contractor interests. When you join AZAGC, you join every other contractor who has decided that having a seat at the table is worth the investment.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Membership Dues</h2>
            <p className="font-body text-base text-slate leading-relaxed">Contractor dues are revenue-based, starting at $800/year. Affiliate dues are $650/year flat. All dues are tax-deductible as a business expense. View our <a href="/membership/dues/" class="text-red hover:underline">full dues schedule</a> or explore <a href="/membership/benefits/" class="text-red hover:underline">all member benefits</a>.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="membership-overview" headline="Request Membership Info" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
