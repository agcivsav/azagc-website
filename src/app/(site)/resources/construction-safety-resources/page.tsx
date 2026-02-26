import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'
import BottomCTA from '@/components/sections/BottomCTA'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Construction Safety Resources for Arizona Contractors | AZAGC',
  description:
    'AZAGC construction safety resources — toolbox talks, OSHA programs, safety awards, incident rate benchmarking, and safety training for Arizona contractors.',
  openGraph: {
    title: 'Construction Safety Resources for Arizona Contractors | AZAGC',
    type: 'article',
    siteName: 'AZAGC',
  },
  alternates: { canonical: 'https://www.azagc.org/resources/construction-safety-resources/' },
}

const FAQS = [
  {
    question: 'What safety resources does AZAGC provide to members?',
    answer:
      'AZAGC provides toolbox talk materials, jobsite safety checklists, OSHA compliance guides, incident rate benchmarking data, safety manual templates, and access to OSHA-authorized training courses at subsidized member rates. Members also participate in our annual Safety Awards program.',
  },
  {
    question: 'What is the AZAGC Safety Awards program?',
    answer:
      'The AZAGC Safety Awards program recognizes member companies for exceptional safety performance. Awards are based on incident rate data (TRIR and DART rates), safety program documentation, and hours worked without recordable incidents. Winning the Safety Award is a significant competitive differentiator for AZAGC member contractors.',
  },
  {
    question: 'How can I get OSHA training through AZAGC?',
    answer:
      'AZAGC partners with OSHA-authorized trainers to deliver OSHA 10-Hour and OSHA 30-Hour Construction courses at subsidized member rates. We also offer Competent Person training and site-specific safety programs. Fill out the form on this page to request a training schedule.',
  },
  {
    question: 'Does AZAGC provide safety resources for small contractors?',
    answer:
      'Yes. Safety resources are available to all AZAGC members regardless of size. Small contractors often benefit most — they may not have a dedicated safety officer, and AZAGC\'s toolbox talks, checklists, and training programs essentially serve as a safety department for smaller companies.',
  },
  {
    question: 'How does AZAGC benchmark safety performance?',
    answer:
      'AZAGC compiles anonymized incident rate data from member companies and produces industry benchmarks for Arizona construction. This allows members to compare their TRIR (Total Recordable Incident Rate) against peers in the same trade and size category — a valuable tool for internal safety improvement and prequalification submissions.',
  },
]

export default function ConstructionSafetyResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://www.azagc.org' },
          { name: 'Resources', url: 'https://www.azagc.org/resources/' },
          { name: 'Construction Safety Resources', url: 'https://www.azagc.org/resources/construction-safety-resources/' },
        ]}
      />

      <section className="bg-navy py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-3">
            Resources · Safety
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Construction Safety Resources for Arizona Contractors
          </h1>
          <p className="font-body text-lg text-white/75 max-w-2xl">
            AZAGC is committed to making Arizona construction the safest in the nation. Our safety
            resources, training programs, and benchmarking tools give members everything they need
            to protect their workers and their business.
          </p>
        </div>
      </section>

      <section className="py-12 bg-cream px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <p className="font-body text-base text-charcoal leading-relaxed">
            Workplace safety is not just a regulatory requirement — it is a core value for AZAGC
            and our member contractors. A safe jobsite means lower insurance costs, better
            prequalification scores, higher worker morale, and fewer project delays. AZAGC
            invests in safety programs that deliver real results for Arizona contractors.
          </p>

          {[
            {
              title: 'Toolbox Talks & Safety Materials',
              body: 'AZAGC provides a library of ready-to-use toolbox talk scripts covering the most common construction hazards — fall protection, struck-by, electrocution, caught-in/between, heat illness, and more. Materials are available in English and Spanish. Members can download and print materials for free.',
            },
            {
              title: 'OSHA Training Programs',
              body: 'Through our partnership with OSHA-authorized trainers, AZAGC delivers OSHA 10-Hour and OSHA 30-Hour Construction courses throughout the year. We also offer Competent Person training for excavation, scaffolding, and fall protection. Member companies receive subsidized rates.',
            },
            {
              title: 'Safety Awards Program',
              body: 'The AZAGC Safety Awards recognize member companies that achieve exceptional safety performance. Categories include recognition by company size and by total hours worked. Award-winning contractors gain a competitive advantage in prequalification and can display the AZAGC Safety Award seal in their marketing.',
            },
            {
              title: 'Incident Rate Benchmarking',
              body: 'AZAGC compiles annual incident rate data from member companies to produce Arizona-specific construction safety benchmarks. Participating members receive a confidential report comparing their TRIR and DART rates to anonymous peers in the same trade category.',
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="font-display text-2xl text-navy mb-3">{title}</h2>
              <p className="font-body text-base text-slate leading-relaxed">{body}</p>
            </div>
          ))}

          <p className="font-body text-sm text-slate">
            Also see:{' '}
            <Link href="/education-training/osha-training/" className="text-red hover:underline">
              OSHA training courses
            </Link>
            {' · '}
            <Link href="/membership/benefits/" className="text-red hover:underline">
              Full member benefits
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-teal px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="safety-resources"
            headline="Access AZAGC Safety Resources"
            subheadline="Fill out the form and we'll send you our safety resource library and upcoming training dates."
            submitLabel="Get Safety Resources →"
            dark
          />
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Construction Safety — Common Questions" />
      <BottomCTA />
    </>
  )
}
