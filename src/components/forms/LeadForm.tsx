'use client'
import { useId } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { useFormSubmission } from '../../useFormSubmission'

// ── Types ────────────────────────────────────────────────────────────
export interface LeadFormProps {
  source: string
  formId?: string
  siteId?: string
  headline?: string
  subheadline?: string
  submitLabel?: string
  variant?: 'card' | 'inline' | 'compact'
  showRoleSelect?: boolean
  showPhone?: boolean
  dark?: boolean
  className?: string
  tags?: string[]
}

// ── Declare browser globals ───────────────────────────────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
dataLayer?: Object[]  }
}

// ── Member type options ──────────────────────────────────────────────
const MEMBER_TYPES = [
  { value: '',                 label: 'Select type…' },
  { value: 'GC',               label: 'General Contractor' },
  { value: 'Sub',              label: 'Subcontractor' },
  { value: 'Specialty',        label: 'Specialty Contractor' },
  { value: 'Supplier',         label: 'Supplier' },
  { value: 'Service Provider', label: 'Service Provider' },
  { value: 'Other',            label: 'Other' },
]

// ── Component ────────────────────────────────────────────────────────
export default function LeadForm({
  source,
  formId,
  siteId,
  data,
  headline = 'Request Membership Info',
  subheadline = 'A membership coordinator will follow up within one business day.',
  submitLabel = 'Get My Benefits Overview →',
  variant = 'card',
  showRoleSelect = true,
  showPhone = true,
  dark = false,
  className,
}: LeadFormProps & { data?: any }) {
  const formIdPrefix = useId()
  const fieldId = (name: string) => `${formIdPrefix}-${name}`

  // ── useFormSubmission (mirrors Form.tsx) ─────────────────────────
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId: formId ?? data?.formId ?? '69caceab',
    formName: 'lead_form',
    additionalFields: {
      source,
      ...(siteId ? { siteId } : {}),
    },
    trackingFields: [
      'first_name',
      'last_name',
      'email',
      'company',
      'phone',
      'member_type',
    ],
  })

  // ── Style helpers ────────────────────────────────────────────────
  const isCompact = variant === 'compact'
  const labelCls = cn(
    'font-body font-semibold text-xs uppercase tracking-wide block mb-1.5',
    dark ? 'text-white/80' : 'text-charcoal',
  )
  const inputCls = cn(
    'w-full bg-white border px-4 text-sm font-body text-charcoal focus:outline-none transition-colors rounded-sm',
    isCompact ? 'py-2' : 'py-2.5',
    'border-warm-gray focus:border-red focus:ring-1 focus:ring-red',
  )
  const errCls = 'text-red text-xs mt-1 font-body'

  // ── Success state ────────────────────────────────────────────────
  if (isSubmitSuccessful) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center gap-3', className)}>
        <CheckCircle className="w-12 h-12 text-gold" />
        <h3 className={cn('font-normal text-xl', dark ? 'text-white' : 'text-navy')}>
          You&apos;re on your way!
        </h3>
        <p className={cn('font-body text-sm max-w-xs', dark ? 'text-white/80' : 'text-slate')}>
          A membership coordinator will be in touch within one business day.
        </p>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────
  return (
    <div className={cn(className)}>
      {/* Header */}
      {headline && !isCompact && (
        <div className="mb-5">
          <h3 className={cn('font-normal text-xl mb-1', dark ? 'text-white' : 'text-navy')}>
            {headline}
          </h3>
          {subheadline && (
            <p className={cn('font-body text-sm leading-relaxed', dark ? 'text-white/70' : 'text-slate')}>
              {subheadline}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit(submitCompletedForm)}
        noValidate
        className={cn('space-y-4', variant === 'inline' && 'grid grid-cols-2 gap-4 space-y-0')}
      >
        {/* Name row */}
        <div className={cn('grid grid-cols-2 gap-4', variant === 'inline' && 'col-span-2')}>
          <div>
            <label className={labelCls} htmlFor={fieldId('first_name')}>
              First Name *
            </label>
            <input
              id={fieldId('first_name')}
              aria-invalid={errors.first_name ? true : undefined}
              aria-describedby={
                errors.first_name ? `${fieldId('first_name')}-error` : undefined
              }
              {...registerWithTracking('first_name', { required: 'Required' })}
              className={inputCls}
              placeholder="Jane"
              autoComplete="given-name"
            />
            {errors.first_name && (
              <p className={errCls} id={`${fieldId('first_name')}-error`} role="alert">
                {errors.first_name.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label className={labelCls} htmlFor={fieldId('last_name')}>
              Last Name *
            </label>
            <input
              id={fieldId('last_name')}
              aria-invalid={errors.last_name ? true : undefined}
              aria-describedby={
                errors.last_name ? `${fieldId('last_name')}-error` : undefined
              }
              {...registerWithTracking('last_name', { required: 'Required' })}
              className={inputCls}
              placeholder="Smith"
              autoComplete="family-name"
            />
            {errors.last_name && (
              <p className={errCls} id={`${fieldId('last_name')}-error`} role="alert">
                {errors.last_name.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className={variant === 'inline' ? 'col-span-1' : undefined}>
          <label className={labelCls} htmlFor={fieldId('email')}>
            Email *
          </label>
          <input
            id={fieldId('email')}
            type="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${fieldId('email')}-error` : undefined}
            {...registerWithTracking('email', {
              required: 'Required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
            })}
            className={inputCls}
            placeholder="jane@company.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className={errCls} id={`${fieldId('email')}-error`} role="alert">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>

        {/* Company */}
        <div className={variant === 'inline' ? 'col-span-1' : undefined}>
          <label className={labelCls} htmlFor={fieldId('company')}>
            Company *
          </label>
          <input
            id={fieldId('company')}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? `${fieldId('company')}-error` : undefined}
            {...registerWithTracking('company', { required: 'Required' })}
            className={inputCls}
            placeholder="Acme Ag, LLC"
            autoComplete="organization"
          />
          {errors.company && (
            <p className={errCls} id={`${fieldId('company')}-error`} role="alert">
              {errors.company.message?.toString()}
            </p>
          )}
        </div>

        {/* Phone */}
        {showPhone && (
          <div className={variant === 'inline' ? 'col-span-1' : undefined}>
            <label className={labelCls} htmlFor={fieldId('phone')}>
              Phone
            </label>
            <input
              id={fieldId('phone')}
              type="tel"
              {...registerWithTracking('phone')}
              className={inputCls}
              placeholder="(555) 000-0000"
              autoComplete="tel"
            />
          </div>
        )}

        {/* Member type */}
        {showRoleSelect && (
          <div className={variant === 'inline' ? 'col-span-1' : undefined}>
            <label className={labelCls} htmlFor={fieldId('member_type')}>
              I am a…
            </label>
            <select
              id={fieldId('member_type')}
              {...registerWithTracking('member_type')}
              className={inputCls}
            >
              {MEMBER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        )}

      

        {/* Submit */}
        <div className={variant === 'inline' ? 'col-span-2' : undefined}>
          <Button
            type="submit"
            variant="primary"
            size={isCompact ? 'sm' : 'md'}
            className="w-full justify-center"
            disabled={isSubmitSuccessful}
          >
            {submitLabel}
          </Button>
          <p className={cn('text-xs font-body text-center mt-2', dark ? 'text-white' : 'text-light-slate')}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </form>
    </div>
  )
}