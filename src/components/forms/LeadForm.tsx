'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

// ── Types ────────────────────────────────────────────────────────────
interface FormFields {
  first_name: string
  last_name: string
  email: string
  company: string
  phone?: string
  member_type?: string
}

export interface LeadFormProps {
  source: string
  headline?: string
  subheadline?: string
  submitLabel?: string
  variant?: 'card' | 'inline' | 'compact'
  showRoleSelect?: boolean   // default true
  showPhone?: boolean        // default true
  dark?: boolean
  className?: string
  tags?: string[]
}

// ── Declare browser globals so TS doesn't complain ───────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

// ── Member type options ──────────────────────────────────────────────
const MEMBER_TYPES = [
  { value: '',                  label: 'Select type…' },
  { value: 'GC',                label: 'General Contractor' },
  { value: 'Sub',               label: 'Subcontractor' },
  { value: 'Specialty',         label: 'Specialty Contractor' },
  { value: 'Supplier',          label: 'Supplier' },
  { value: 'Service Provider',  label: 'Service Provider' },
  { value: 'Other',             label: 'Other' },
]

// ── Component ────────────────────────────────────────────────────────
export default function LeadForm({
  source,
  headline = 'Request Membership Info',
  subheadline = 'A membership coordinator will follow up within one business day.',
  submitLabel = 'Get My Benefits Overview →',
  variant = 'card',
  showRoleSelect = true,
  showPhone = true,
  dark = false,
  className,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  // Capture UTMs + page context once on mount
  const contextRef = useRef<{
    utm_source: string; utm_medium: string; utm_campaign: string; utm_content: string
    landing_page: string; referrer: string
  } | null>(null)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    contextRef.current = {
      utm_source:   p.get('utm_source')   || '',
      utm_medium:   p.get('utm_medium')   || '',
      utm_campaign: p.get('utm_campaign') || '',
      utm_content:  p.get('utm_content')  || '',
      landing_page: window.location.href,
      referrer:     document.referrer,
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>()

  const onSubmit = async (data: FormFields) => {
    setLoading(true)
    setServerError(false)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source, ...contextRef.current }),
      })

      if (!res.ok) throw new Error('server error')

      // ── Client-side tracking ────────────────────────────────────
      const memberType = data.member_type || ''

      // Meta Pixel
      window.fbq?.('track', 'Lead', {
        content_name:     'Membership Inquiry',
        content_category: memberType,
      })

      // GA4
      window.gtag?.('event', 'generate_lead', {
        event_category: 'membership',
        event_label:    source,
        value:          1,
      })

      // GTM dataLayer
      window.dataLayer?.push({
        event:       'form_submission',
        form_source: source,
        member_type: memberType,
      })

      setSubmitted(true)
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

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
  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center gap-3', className)}>
        <CheckCircle className="w-12 h-12 text-gold" />
        <h3 className={cn('font-display text-xl', dark ? 'text-white' : 'text-navy')}>
          You&apos;re on your way!
        </h3>
        <p className={cn('font-body text-sm max-w-xs', dark ? 'text-white/70' : 'text-slate')}>
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
          <h3 className={cn('font-display text-xl mb-1', dark ? 'text-white' : 'text-navy')}>
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
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn('space-y-4', variant === 'inline' && 'grid grid-cols-2 gap-4 space-y-0')}
      >
        {/* Name row */}
        <div className={cn('grid grid-cols-2 gap-4', variant === 'inline' && 'col-span-2')}>
          <div>
            <label className={labelCls}>First Name *</label>
            <input
              {...register('first_name', { required: 'Required' })}
              className={inputCls}
              placeholder="Jane"
              autoComplete="given-name"
            />
            {errors.first_name && <p className={errCls}>{errors.first_name.message}</p>}
          </div>
          <div>
            <label className={labelCls}>Last Name *</label>
            <input
              {...register('last_name', { required: 'Required' })}
              className={inputCls}
              placeholder="Smith"
              autoComplete="family-name"
            />
            {errors.last_name && <p className={errCls}>{errors.last_name.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className={variant === 'inline' ? 'col-span-1' : undefined}>
          <label className={labelCls}>Email *</label>
          <input
            type="email"
            {...register('email', {
              required: 'Required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
            })}
            className={inputCls}
            placeholder="jane@company.com"
            autoComplete="email"
          />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>

        {/* Company */}
        <div className={variant === 'inline' ? 'col-span-1' : undefined}>
          <label className={labelCls}>Company *</label>
          <input
            {...register('company', { required: 'Required' })}
            className={inputCls}
            placeholder="Acme Ag, LLC"
            autoComplete="organization"
          />
          {errors.company && <p className={errCls}>{errors.company.message}</p>}
        </div>

        {/* Phone */}
        {showPhone && (
          <div className={variant === 'inline' ? 'col-span-1' : undefined}>
            <label className={labelCls}>Phone</label>
            <input
              type="tel"
              {...register('phone')}
              className={inputCls}
              placeholder="(555) 000-0000"
              autoComplete="tel"
            />
          </div>
        )}

        {/* Member type */}
        {showRoleSelect && (
          <div className={variant === 'inline' ? 'col-span-1' : undefined}>
            <label className={labelCls}>I am a…</label>
            <select {...register('member_type')} className={inputCls}>
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
            disabled={loading}
          >
            {loading
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : submitLabel
            }
          </Button>
          {serverError && (
            <p className="text-red text-xs mt-2 text-center font-body">
              Something went wrong — please try again.
            </p>
          )}
          <p className={cn('text-xs font-body text-center mt-2', dark ? 'text-white/40' : 'text-light-slate')}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </form>
    </div>
  )
}
