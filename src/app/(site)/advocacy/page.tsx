import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Legislative Advocacy for Arizona Contractors | AZAGC",
  description: "AZAGC advocates for Arizona contractors at the state Capitol and in Washington D.C. Legislative priorities, policy updates, and tools to make your voice heard.",
  alternates: { canonical: "https://www.azagc.org/advocacy/" },
}

const FAQS = [{"question":"How does AZAGC advocacy benefit my business?","answer":"AZAGC's lobbying has produced real wins for Arizona contractors — protecting lien rights, defeating costly mandates, securing infrastructure funding, and shaping licensing policy. These wins translate directly to your bottom line."},{"question":"How can I get involved in AZAGC advocacy?","answer":"AZAGC members can participate through our Government Affairs Committee, attend advocacy days at the Capitol, use our voter tools, and receive legislative action alerts when bills need contractor input."},{"question":"Does AZAGC endorse political candidates?","answer":"AZAGC does not endorse candidates for elected office. We engage with elected officials of all parties based on their position on construction industry issues."},{"question":"Can I donate to AZAGC's political efforts?","answer":"AZAGC maintains a Political Action Committee (PAC) that allows members to voluntarily support candidates who champion construction industry priorities. Visit our Contribute page for details."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Advocacy", url: "https://www.azagc.org/advocacy/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Advocacy</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Advocacy for Arizona Contractors</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">AZAGC employs full-time lobbyists at the Arizona Capitol and maintains a presence in Washington D.C. — fighting year-round to protect contractor interests and advance the industry.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Why Advocacy Matters for Contractors</h2>
            <p className="font-body text-base text-slate leading-relaxed">Every session, the Arizona Legislature considers hundreds of bills that affect contractors — from lien law changes to bonding requirements, licensing regulations, prevailing wage, environmental compliance, and workforce policy. Without a dedicated advocate in the room, contractor interests get overlooked. AZAGC makes sure that doesn't happen.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Our Legislative Priorities</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC's current legislative priorities include: protecting contractor lien rights and prompt payment protections; opposing excessive bonding and insurance mandates that disadvantage small contractors; advocating for infrastructure investment in the state budget; supporting apprenticeship and workforce development funding; and advancing regulatory streamlining to reduce permitting delays on construction projects.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Federal Advocacy Through AGC of America</h2>
            <p className="font-body text-base text-slate leading-relaxed">Through our partnership with AGC of America, AZAGC members have a voice in Washington D.C. on federal issues including the Davis-Bacon Act, OSHA regulations, federal contracting thresholds, infrastructure funding, and immigration policy as it affects the construction workforce. AGC of America's government relations team tracks every relevant federal bill and regulation.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="advocacy-page" headline="Stay Connected on Advocacy" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
