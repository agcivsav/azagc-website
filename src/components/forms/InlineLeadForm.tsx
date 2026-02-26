'use client'
/**
 * InlineLeadForm — compact horizontal form for interior pages.
 * Sits inline within content sections (e.g., after benefits list).
 */
import LeadForm from './LeadForm'

interface InlineLeadFormProps {
  source: string
  headline?: string
  subheadline?: string
  dark?: boolean
  className?: string
}

export default function InlineLeadForm({
  source,
  headline = 'Get Your Benefits Overview',
  subheadline = 'We\'ll send you the full membership guide within one business day.',
  dark = false,
  className,
}: InlineLeadFormProps) {
  return (
    <LeadForm
      source={source}
      headline={headline}
      subheadline={subheadline}
      submitLabel="Send Me the Details →"
      variant="inline"
      showRoleSelect={false}
      showPhone={false}
      dark={dark}
      className={className}
    />
  )
}
