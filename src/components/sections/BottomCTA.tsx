import LeadForm from '@/components/forms/LeadForm'

const TRUST_POINTS = [
  'Access to exclusive member events and networking',
  'Legislative advocacy on your behalf in Phoenix & DC',
  'Workforce training and certification programs',
  'Industry research, news, and market intelligence',
  'Discounts on equipment, insurance, and services',
]

interface BottomCTAProps {
  source?: string
}

export default function BottomCTA({ source = 'bottom-cta' }: BottomCTAProps) {
  return (
    <section className="bg-teal py-16">
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Trust list */}
        <div>
          <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-gold mb-3">Member Benefits</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-6 leading-tight">
            Everything You Get as an AZAGC Member
          </h2>
          <ul className="space-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </span>
                <span className="font-body text-white/80 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="bg-white/10 border border-white/20 p-7 rounded-sm">
          <LeadForm
            source={source}
            
            headline="Join AZAGC Today"
            subheadline="We'll reach out within one business day to complete your membership."
            submitLabel="Start My Membership →"
            dark
          />
        </div>
      </div>
    </section>
  )
}
