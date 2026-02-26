import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Young Constructors Forum (YCF) | AZAGC",
  description: "Join AZAGC Young Constructors Forum (YCF). Networking, leadership development, and mentorship for Arizona construction professionals under 40.",
  alternates: { canonical: "https://www.azagc.org/membership/ycf/" },
}

const FAQS = [{"question":"What age range is YCF for?","answer":"YCF is open to construction professionals between the ages of 18 and 40 who work for AZAGC member companies."},{"question":"Do I need to be an AZAGC member to join YCF?","answer":"YCF membership is part of your company's AZAGC membership. If your employer is an AZAGC contractor or affiliate member, you can join YCF at no additional cost."},{"question":"How do I get involved with YCF?","answer":"Fill out the form on this page and we'll connect you with the YCF chair and upcoming events."},{"question":"Can I participate in both YCF and regular AZAGC events?","answer":"Yes. YCF membership includes access to all standard AZAGC events, plus YCF-specific programming."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Membership", url: "https://www.azagc.org/membership/" },
        { name: "Ycf", url: "https://www.azagc.org/membership/ycf/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Membership</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Young Constructors Forum</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">AZAGC's Young Constructors Forum (YCF) is Arizona's leading network for construction professionals under 40 — focused on leadership, mentorship, and the next generation of industry leaders.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">What Is the Young Constructors Forum?</h2>
            <p className="font-body text-base text-slate leading-relaxed">The Young Constructors Forum (YCF) is AZAGC's program for construction professionals ages 18-40. YCF exists to develop the next generation of Arizona's construction leaders through peer networking, leadership training, and connection to the broader AZAGC membership. YCF members are tomorrow's project managers, superintendents, owners, and industry advocates.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">YCF Programs & Events</h2>
            <p className="font-body text-base text-slate leading-relaxed">YCF hosts its own events throughout the year — social mixers, leadership workshops, site tours, and community service projects. YCF members also participate in all AZAGC events alongside senior members. The annual YCF leadership retreat brings together Arizona's most promising young construction professionals for a focused development experience.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Mentorship Connections</h2>
            <p className="font-body text-base text-slate leading-relaxed">One of YCF's most valuable benefits is access to AZAGC's senior membership. Through our formal mentorship program, YCF members are paired with experienced contractors and industry leaders who have navigated the same challenges. These relationships have shaped careers and built businesses.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="ycf-page" headline="Join the Young Constructors Forum" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
