import LeadForm from '@/components/forms/LeadForm'
import type { ContactPageLeadFormSection } from '@/lib/queries/contactPage'

const DEFAULT_EYEBROW = ''
const DEFAULT_HEADING = ''
const DEFAULT_INTRO =
  ''
const DEFAULT_BULLET_POINTS = [
  '',
  '',
  '',
] as const

function resolveLeadFormCopy(section: ContactPageLeadFormSection | null | undefined) {
  const hasSection = section != null

  const eyebrow = section?.eyebrow?.trim() || DEFAULT_EYEBROW
  const heading = section?.heading?.trim() || DEFAULT_HEADING

  const intro = !hasSection
    ? DEFAULT_INTRO
    : section.intro === undefined || section.intro === null
      ? DEFAULT_INTRO
      : section.intro.trim() || null

  const bulletPoints = !hasSection
    ? [...DEFAULT_BULLET_POINTS]
    : Array.isArray(section.bulletPoints)
      ? section.bulletPoints.map((s) => String(s).trim()).filter(Boolean)
      : [...DEFAULT_BULLET_POINTS]

  return { eyebrow, heading, intro, bulletPoints }
}

export type ContactLeadSectionProps = {
  leadFormSection?: ContactPageLeadFormSection | null
}

export function ContactLeadSection({ leadFormSection }: ContactLeadSectionProps) {
  const { eyebrow, heading, intro, bulletPoints } = resolveLeadFormCopy(leadFormSection)

  return (
    <section
      className="bg-cream border-t border-warm-gray py-16 md:py-20"
      aria-labelledby="contact-form-heading"
    >
      <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="max-w-lg">
          <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-primary mb-3">
            {eyebrow}
          </p>
          <h2
            id="contact-form-heading"
            className="font-normal text-3xl sm:text-4xl text-navy mb-5 leading-tight tracking-tight"
          >
            {heading}
          </h2>
          {intro ? (
            <p className="font-body text-base text-slate leading-relaxed mb-8">{intro}</p>
          ) : null}
         {/* {bulletPoints?.length ? (
  <ul className="space-y-3">
    {bulletPoints.map((point, i) => (
      <li
        key={`${i}-${point.slice(0, 24)}`}
        className="flex items-start gap-3"
      >
        <span className="w-5 h-5 rounded-full bg-red/20 flex items-center justify-center shrink-0 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        </span>
        <span className="font-body text-navy/80 text-sm leading-relaxed">
          {point}
        </span>
      </li>
    ))}
  </ul>
) : null} */}
        </div>

        <div className="w-full bg-white border border-warm-gray p-7 md:p-8 rounded-sm shadow-sm">
          <LeadForm
            source="contact-page"
            headline=""
            subheadline=""
            submitLabel="Submit →"
          />
        </div>
      </div>
    </section>
  )
}
