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
  eyebrow?: string
  title?: string
  points?: string[]
  formHeadline?: string
  formSubheadline?: string
  formSubmitLabel?: string
}

export default function BottomCTA({
  source = 'bottom-cta',
  eyebrow,
  title,
  points,
  formHeadline,
  formSubheadline,
  formSubmitLabel,
}: BottomCTAProps) {
  const resolvedEyebrow = eyebrow ?? 'Member Benefits'
  const resolvedTitle = title ?? 'Everything You Get as an AZAGC Member'
  const resolvedPoints = points && points.length > 0 ? points : TRUST_POINTS
  const resolvedFormHeadline = formHeadline ?? 'Join AZAGC Today'
  const resolvedFormSubheadline =
    formSubheadline ?? "We'll reach out within one business day to complete your membership."
  const resolvedFormSubmitLabel = formSubmitLabel ?? 'Start My Membership →'
  return (
    <section className="bg-white py-16">
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Trust list */}
        <div>
          <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-3">
            {resolvedEyebrow}
          </p>
          <h2 className="font-normal text-3xl sm:text-4xl text-navy mb-6 leading-tight">
            {resolvedTitle}
          </h2>
          <ul className="space-y-3">
            {resolvedPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-red/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-body text-navy/80 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="bg-navy border border-white/20 p-7 rounded-sm">
          <LeadForm
            source={source}
            headline={resolvedFormHeadline}
            subheadline={resolvedFormSubheadline}
            submitLabel={resolvedFormSubmitLabel}
            dark
          />
        </div>
      </div>
    </section>
  )
}
