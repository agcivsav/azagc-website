'use client'

import { useEffect, useState } from 'react'
import { X, Loader2, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFormSubmission } from '@/useFormSubmission'

interface ScrollTriggerCTAProps {
  threshold?: number
  source?: string
  formId?: string
  siteId?: string
  data?: any
}

export default function ScrollTriggerCTA({
  threshold = 60,
  source,
  formId,
  siteId,
  data,
}: ScrollTriggerCTAProps) {
  const [visible, setVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  // ── Show after scroll threshold ───────────────────────────────
  useEffect(() => {
    if (dismissed) return
    if (sessionStorage.getItem('scroll-cta-done')) return

    const handleScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (pct >= threshold) setVisible(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, dismissed])

  // ── useFormSubmission hook ─────────────────────────────────
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId: formId ?? data?.formId ?? '69cbec7d',
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
      'honeypot',
    ],
  })

  if (dismissed || !visible) return null

  // ── Submission handler ──────────────────────────────────────
const onSubmit = async (formData: any) => {
  console.log('Submitting ScrollTriggerCTA with data:', formData)
  setLoading(true)
  try {
    await submitCompletedForm(formData)
    setDone(true)
    sessionStorage.setItem('scroll-cta-done', 'true')
  } catch (err) {
    console.error('ScrollTriggerCTA submission failed:', err)
    setLoading(false)
  }
}

  return (
    <div
      className={cn(
        'fixed bottom-[67px] right-6 z-40 w-72 bg-navy shadow-2xl p-5 rounded-sm border border-white/10',
        'hidden sm:block',
        'animate-in slide-in-from-right-4 fade-in duration-300',
      )}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      {done || isSubmitSuccessful ? (
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <CheckCircle className="w-8 h-8 text-gold" />
          <p className="font-body text-sm text-white">You&apos;re all set!</p>
        </div>
      ) : (
        <>
          <p className="font-normal text-base text-white mb-1 pr-4">
            Ready to join 200+ AZ contractors?
          </p>
          <p className="font-body text-xs text-white/60 mb-4">
            Drop your email and we&apos;ll send the membership guide.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
              type="email"
              {...registerWithTracking('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
              })}
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                'w-full bg-white/10 border text-white text-sm font-body px-3 py-2 focus:outline-none rounded-sm placeholder:text-white/40',
                errors.email ? 'border-red' : 'border-white/20 focus:border-gold',
              )}
            />
            {errors.email && (
              <p className="text-xs text-red">{errors.email.message?.toString()}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-body font-semibold text-sm py-2 rounded-sm hover:bg-red-hover transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get the Guide →'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}