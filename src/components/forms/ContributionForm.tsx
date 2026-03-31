'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import LeadForm from './LeadForm'

interface ContributionFormFields {
  first_name: string
  last_name: string
  email: string
  company: string
  phone?: string
  amount?: string
  message?: string
}

export interface ContributionFormProps {
    source: string

  headline?: string
  subheadline?: string
  submitLabel?: string
  dark?: boolean
  className?: string
}

const AMOUNT_OPTIONS = [
  { value: '', label: 'Select amount…' },
  { value: '100', label: '$100' },
  { value: '250', label: '$250' },
  { value: '500', label: '$500' },
  { value: '1000', label: '$1,000' },
  { value: 'other', label: 'Other (specify in message)' },
]

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export default function ContributionForm({
   source,
  headline = 'Make a Contribution',
  subheadline = 'Complete the form below and we’ll follow up with contribution details and options.',
  submitLabel = 'Submit →',
  dark = false,
  className,
}: ContributionFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const contextRef = useRef<{
    utm_source: string
    utm_medium: string
    utm_campaign: string
    utm_content: string
    landing_page: string
    referrer: string
  } | null>(null)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    contextRef.current = {
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
      utm_content: p.get('utm_content') || '',
      landing_page: window.location.href,
      referrer: document.referrer,
    }
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<ContributionFormFields>()

  const onSubmit = async (data: ContributionFormFields) => {
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          company: data.company || '',
          phone: data.phone || '',
          source: 'contribute',
          contribution_amount: data.amount || '',
          contribution_note: data.message || '',
          ...contextRef.current,
        }),
      })
      if (!res.ok) throw new Error('server error')
      window.fbq?.('track', 'Lead', { content_name: 'PAC Contribution', content_category: 'contribute' })
      window.gtag?.('event', 'generate_lead', { event_category: 'advocacy', event_label: 'contribute', value: 1 })
      window.dataLayer?.push({ event: 'form_submission', form_source: 'contribute' })
      setSubmitted(true)
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  const labelCls = cn(
    'font-body font-semibold text-xs uppercase tracking-wide block mb-1.5',
    dark ? 'text-white/80' : 'text-charcoal',
  )
  const inputCls = cn(
    'w-full bg-white border px-4 py-2.5 text-sm font-body text-charcoal focus:outline-none transition-colors rounded-sm',
    'border-warm-gray focus:border-red focus:ring-1 focus:ring-red',
  )
  const errCls = 'text-red text-xs mt-1 font-body'

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center gap-3', className)}>
        <CheckCircle className="w-12 h-12 text-gold" />
        <h3 className={cn('font-normal text-xl', dark ? 'text-white' : 'text-navy')}>
          Thank you
        </h3>
        <p className={cn('font-body text-sm max-w-xs', dark ? 'text-white/70' : 'text-slate')}>
          We’ll be in touch with contribution details shortly.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      {headline && (
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
{/* 
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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

        <div>
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

        <div>
          <label className={labelCls}>Company</label>
          <input
            {...register('company')}
            className={inputCls}
            placeholder="Acme Construction"
            autoComplete="organization"
          />
        </div>

        <div>
          <label className={labelCls}>Phone</label>
          <input
            type="tel"
            {...register('phone')}
            className={inputCls}
            placeholder="(602) 000-0000"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className={labelCls}>Interest level / amount</label>
          <select {...register('amount')} className={inputCls}>
            {AMOUNT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls}>Message (optional)</label>
          <textarea
            {...register('message')}
            className={cn(inputCls, 'min-h-[80px] resize-y')}
            placeholder="Questions or custom amount..."
            rows={3}
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : submitLabel}
          </Button>
          {serverError && (
            <p className="text-red text-xs mt-2 text-center font-body">
              Something went wrong — please try again.
            </p>
          )}
        </div>
      </form> */}
    </div>
  )
}
