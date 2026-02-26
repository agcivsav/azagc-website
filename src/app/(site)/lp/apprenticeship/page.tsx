import type { Metadata } from 'next'
import LeadForm from '@/components/forms/LeadForm'
import FAQAccordion from '@/components/sections/FAQAccordion'

export const metadata: Metadata = {
  title: 'Apply for AZAGC Construction Apprenticeship | Launch Your Career',
  description:
    'Apply for AZAGC\'s Registered Apprenticeship program in Arizona. Earn while you learn in carpentry, electrical, plumbing, HVAC, and more. Journeyman wages in 3–5 years.',
  robots: { index: false, follow: false },
}

const FAQS = [
  {
    question: 'What trades are available?',
    answer:
      'AZAGC offers apprenticeship programs in carpentry, electrical, plumbing, HVAC/sheet metal, ironwork, masonry, and painting. Availability varies by enrollment period — fill out the form to learn what\'s currently open.',
  },
  {
    question: 'Do I need prior construction experience to apply?',
    answer:
      'No prior experience is required. You need to be at least 18 years old, have a high school diploma or GED, and be physically able to perform the work. Basic math skills and a valid driver\'s license are helpful.',
  },
  {
    question: 'Will I get paid while in the program?',
    answer:
      'Yes — from day one. Apprentices are employed by a sponsoring AZAGC member contractor and earn wages that increase with each year of the program. Apprentice wages typically start at 50–60% of journeyman rate and reach 90%+ in the final year.',
  },
  {
    question: 'How long is the program?',
    answer:
      'Most trades take 3–5 years to complete. During that time you work full-time and attend related technical instruction (RTI) classes — typically a few evenings per week.',
  },
  {
    question: 'What happens when I finish?',
    answer:
      'Upon graduation you earn a U.S. Department of Labor Journeyman Certificate — a nationally recognized credential that commands full journeyman wages anywhere in the country. Many AZAGC apprenticeship graduates go on to become forepersons, superintendents, and business owners.',
  },
]

export default function LpApprenticeshipPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="bg-gradient-to-br from-navy-deep to-navy py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-gold mb-4">
                AZAGC Apprenticeship Program
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4 leading-tight">
                Launch Your Construction Career
              </h1>
              <p className="font-body text-lg text-white/75 mb-6">
                AZAGC&apos;s Registered Apprenticeship program is a earn-while-you-learn pathway
                to a high-paying career in the skilled trades. Work full-time, earn real wages,
                graduate as a certified journeyman.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: '$60K–$100K', label: 'Average journeyman wage in AZ' },
                  { stat: '3–5 Years', label: 'To journeyman certification' },
                  { stat: 'Day One', label: 'Start earning right away' },
                  { stat: '100%', label: 'Nationally recognized credential' },
                ].map(({ stat, label }) => (
                  <div key={stat} className="bg-white/10 rounded-sm p-3">
                    <div className="font-display text-xl text-gold">{stat}</div>
                    <div className="font-body text-xs text-white/70 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6">
              <LeadForm
                source="lp-apprenticeship"
                headline="Apply for AZAGC Apprenticeship"
                subheadline="Fill out the form and our apprenticeship coordinator will follow up with enrollment details and available trades."
                submitLabel="Start My Application →"
                showRoleSelect={false}
                dark
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-navy text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Apply & Get Placed', desc: 'Complete the application and get matched with a sponsoring AZAGC member contractor.' },
              { step: '2', title: 'Work & Learn', desc: 'Work full-time on real projects and attend evening training classes to build your trade knowledge.' },
              { step: '3', title: 'Graduate as a Journeyman', desc: 'After 3–5 years, earn your U.S. DOL Journeyman Certificate and full journeyman wages.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-red text-white rounded-full flex items-center justify-center font-display text-xl mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-body font-bold text-navy mb-2">{title}</h3>
                <p className="font-body text-sm text-slate">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={FAQS} title="Apprenticeship — Common Questions" />

      <section className="py-20 bg-navy px-4">
        <div className="max-w-xl mx-auto">
          <LeadForm
            source="lp-apprenticeship-bottom"
            headline="Ready to Start Your Career?"
            subheadline="Applications are accepted year-round. Get started today."
            submitLabel="Apply Now →"
            showRoleSelect={false}
            dark
          />
        </div>
      </section>

      <footer className="bg-navy-deep py-6 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">© 2026 AZAGC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy-policy/" className="font-body text-xs text-white/40 hover:text-white/70">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
