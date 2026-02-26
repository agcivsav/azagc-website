import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: "Education & Training for Arizona Contractors | AZAGC",
  description: "AZAGC education and training programs for Arizona contractors — OSHA 10 & 30, construction apprenticeship, management development, and AGC of America courses.",
  alternates: { canonical: "https://www.azagc.org/education-training/" },
}

const FAQS = [{"question":"Are training programs only for AZAGC members?","answer":"Most programs are open to both members and non-members, though member companies receive significantly discounted rates — often saving $200+ per participant on OSHA courses."},{"question":"Do you offer on-site training at my jobsite?","answer":"Yes. AZAGC can arrange on-site OSHA training and safety programs for member companies with sufficient participant numbers. Contact us to discuss scheduling."},{"question":"How do I register for a training program?","answer":"Fill out the form on this page and our training coordinator will send you the current schedule and registration information."},{"question":"Does AZAGC offer bilingual training?","answer":"Yes. Many of our OSHA training courses are available in both English and Spanish."}]

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.azagc.org' },
        { name: "Education Training", url: "https://www.azagc.org/education-training/" }
      ]} />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">Education & Training</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Education & Training</h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">From OSHA certifications to management development to DOL-registered apprenticeships — AZAGC delivers the workforce training Arizona contractors need.</p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Safety Training</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC partners with OSHA-authorized trainers to deliver OSHA 10-Hour and OSHA 30-Hour Construction courses throughout Arizona. We also offer Competent Person training for excavation, scaffolding, and fall protection. Member companies receive subsidized rates. View our <a href="/education-training/osha-training/" className="text-red hover:underline">OSHA training page</a> for the current schedule.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">Apprenticeship Programs</h2>
            <p className="font-body text-base text-slate leading-relaxed">AZAGC operates Registered Apprenticeship programs in multiple construction trades — a DOL-recognized earn-while-you-learn pathway to journeyman certification. Our programs place motivated applicants with sponsoring AZAGC member contractors from day one. Learn more about our <a href="/education-training/construction-apprenticeship-arizona/" className="text-red hover:underline">construction apprenticeship programs</a>.</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-navy mb-3">AGC of America Education</h2>
            <p className="font-body text-base text-slate leading-relaxed">As an AGC chapter, AZAGC members have full access to AGC of America's extensive education catalog — including Supervisory Training Program (STP), Project Manager Development Program (PMDP), and leadership courses. These nationally-recognized programs are specifically designed for construction professionals.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm source="education-overview" headline="Request Training Information" subheadline="A membership coordinator will follow up within one business day." submitLabel="Get Started →" dark />
        </div>
      </section>

      <FAQAccordion items={FAQS} />
      <BottomCTA />
    </>
  )
}
