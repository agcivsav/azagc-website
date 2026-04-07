'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFormSubmission } from '@/useFormSubmission'
import Button from '@/components/ui/Button'

// ── Props ──────────────────────────────────────────────────────────────
interface ExitIntentPopupProps {
  source?: string
  formId?: string
  siteId?: string
  data?: any
}

export default function ExitIntentPopup({ source, formId, siteId, data }: ExitIntentPopupProps) {
  const [open, setOpen] = useState(false)
  const [fired, setFired] = useState(false)
  const popupStorageKey = 'exit-popup-shown'

  // ── Form logic ───────────────────────────────────────────────────────
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId: formId ?? data?.formId ?? '69cbeaa7',
    formName: 'lead_form',
    additionalFields: {
      source: source ?? 'exit-intent',
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

  // ── Exit intent detection ─────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const forcePopup = params.get('showPopup') === '1'

    if (!forcePopup && sessionStorage.getItem(popupStorageKey)) return

    const triggerPopup = () => {
      if (fired) return
      setFired(true)
      setOpen(true)
      sessionStorage.setItem(popupStorageKey, '1')
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup()
    }

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = (window.scrollY / max) * 100
      if (pct >= 65) triggerPopup()
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })
    const fallbackTimer = window.setTimeout(triggerPopup, 15000)

    return () => {
      window.clearTimeout(fallbackTimer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fired, popupStorageKey])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white w-full max-w-md shadow-2xl rounded-sm p-8 animate-in fade-in zoom-in-95 duration-200'
        )}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-light-slate hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-red mb-2">
          Before You Go
        </p>
        <h2 className="font-normal text-2xl text-navy mb-3">
          Get your free membership benefits guide.
        </h2>
        <p className="font-body text-sm text-slate mb-6">
          See everything AZAGC membership includes — advocacy, training, networking, and exclusive industry resources.
        </p>

        {/* Form */}
        {isSubmitSuccessful ? (
          <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
            <X className="w-12 h-12 text-green-500" />
            <h3 className="font-normal text-xl text-navy">You're on your way!</h3>
            <p className="font-body text-sm text-slate max-w-xs">
              A membership coordinator will be in touch within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitCompletedForm)} noValidate className="space-y-4">
            {/* First Name */}
            <div>
              <label className="font-body font-semibold text-xs uppercase tracking-wide block mb-1.5 text-charcoal">
                First Name *
              </label>
              <input
                {...registerWithTracking('first_name', { required: 'Required' })}
                className="w-full bg-white border px-4 py-2 text-sm rounded-sm border-warm-gray focus:border-red focus:ring-1 focus:ring-red"
                placeholder="Jane"
              />
              {errors.first_name && <p className="text-red text-xs mt-1">{errors.first_name.message?.toString()}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="font-body font-semibold text-xs uppercase tracking-wide block mb-1.5 text-charcoal">
                Last Name *
              </label>
              <input
                {...registerWithTracking('last_name', { required: 'Required' })}
                className="w-full bg-white border px-4 py-2 text-sm rounded-sm border-warm-gray focus:border-red focus:ring-1 focus:ring-red"
                placeholder="Smith"
              />
              {errors.last_name && <p className="text-red text-xs mt-1">{errors.last_name.message?.toString()}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="font-body font-semibold text-xs uppercase tracking-wide block mb-1.5 text-charcoal">
                Email *
              </label>
              <input
                type="email"
                {...registerWithTracking('email', {
                  required: 'Required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                })}
                className="w-full bg-white border px-4 py-2 text-sm rounded-sm border-warm-gray focus:border-red focus:ring-1 focus:ring-red"
                placeholder="jane@company.com"
              />
              {errors.email && <p className="text-red text-xs mt-1">{errors.email.message?.toString()}</p>}
            </div>

            {/* Company */}
            <div>
              <label className="font-body font-semibold text-xs uppercase tracking-wide block mb-1.5 text-charcoal">
                Company *
              </label>
              <input
                {...registerWithTracking('company', { required: 'Required' })}
                className="w-full bg-white border px-4 py-2 text-sm rounded-sm border-warm-gray focus:border-red focus:ring-1 focus:ring-red"
                placeholder="Acme Ag, LLC"
              />
              {errors.company && <p className="text-red text-xs mt-1">{errors.company.message?.toString()}</p>}
            </div>

            {/* Submit */}
            <Button type="submit" variant="primary" className="w-full justify-center">
              Send Me the Guide →
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}