'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { CheckCircle, Loader2 } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipType?: string
  message?: string
}

interface LeadFormProps {
  source?: string
  tags?: string[]
  headline?: string
  subtext?: string
  ctaLabel?: string
  showMembership?: boolean
  showMessage?: boolean
  className?: string
  dark?: boolean  // white text labels for dark backgrounds
}

export default function LeadForm({
  source = 'website-form',
  tags = ['website-lead'],
  headline = 'Start Your Membership',
  subtext = "Fill out the form and we'll be in touch within one business day.",
  ctaLabel = 'Get Started →',
  showMembership = true,
  showMessage = false,
  className,
  dark = false,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [utms, setUtms] = useState<Record<string, string>>({})

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  useEffect(() => {
    // Capture UTMs client-side
    const params = new URLSearchParams(window.location.search)
    const captured: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const val = params.get(key)
      if (val) captured[key] = val
    }
    setUtms(captured)
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch('/api/ghl-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source, tags, ...utms }),
      })
      setSubmitted(true)
    } catch {
      setLoading(false)
    }
  }

  const labelClass = cn('font-body font-semibold text-xs uppercase tracking-wide block mb-1.5', dark ? 'text-white/80' : 'text-charcoal')
  const inputClass = 'w-full bg-white border border-warm-gray px-4 py-2.5 text-sm font-body text-charcoal focus:outline-none focus:border-red focus:ring-1 focus:ring-red rounded-sm transition-colors'
  const errorClass = 'text-red text-xs mt-1 font-body'

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center gap-3', className)}>
        <CheckCircle className="w-12 h-12 text-gold" />
        <h3 className={cn('font-display text-xl', dark ? 'text-white' : 'text-navy')}>You&apos;re on your way!</h3>
        <p className={cn('font-body text-sm', dark ? 'text-white/70' : 'text-slate')}>
          We&apos;ll be in touch within one business day to complete your membership.
        </p>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      {headline && (
        <div className="mb-5">
          <h3 className={cn('font-display text-xl mb-1', dark ? 'text-white' : 'text-navy')}>{headline}</h3>
          {subtext && <p className={cn('font-body text-sm', dark ? 'text-white/70' : 'text-slate')}>{subtext}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name *</label>
            <input {...register('firstName', { required: 'Required' })} className={inputClass} placeholder="Jane" />
            {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Last Name *</label>
            <input {...register('lastName', { required: 'Required' })} className={inputClass} placeholder="Smith" />
            {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
            className={inputClass}
            placeholder="jane@company.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            {...register('phone', { required: 'Required' })}
            className={inputClass}
            placeholder="(555) 000-0000"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        {showMembership && (
          <div>
            <label className={labelClass}>Membership Type</label>
            <select {...register('membershipType')} className={inputClass}>
              <option value="">Select type…</option>
              <option value="contractor">Contractor Member</option>
              <option value="affiliate">Affiliate Member</option>
              <option value="unsure">Not sure yet</option>
            </select>
          </div>
        )}

        {showMessage && (
          <div>
            <label className={labelClass}>Message</label>
            <textarea {...register('message')} className={cn(inputClass, 'resize-none')} rows={3} placeholder="Questions or comments…" />
          </div>
        )}

        <Button type="submit" variant="primary" className="w-full justify-center" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : ctaLabel}
        </Button>

        <p className={cn('text-xs font-body text-center', dark ? 'text-white/40' : 'text-light-slate')}>
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
