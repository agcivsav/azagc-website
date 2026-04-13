'use client'

import { useId } from 'react'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useFormSubmission } from '@/useFormSubmission'

// ── Props ──────────────────────────────────────────────────────────────
interface NewsletterFormProps {
  className?: string
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const emailFieldId = useId()

  // ── useFormSubmission hook ───────────────────────────────────────────
  const {
    registerWithTracking,
    handleSubmit,
    errors,
    isSubmitSuccessful,
    submitCompletedForm,
  } = useFormSubmission({
    formId: '69cbec7d', // Make sure this matches your dashboard
    formName: 'newsletter_form',
    additionalFields: {
      formId: '69cbec7d',
      name: 'Newsletter Subscriber',
      first_name: 'Newsletter',
      last_name: 'Subscriber',
      source: 'newsletter-signup',
      landing_page: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      company: '',
    },
    trackingFields: ['email', ''],
  })

  // ── Already submitted UI ─────────────────────────────────────────────
  if (isSubmitSuccessful) {
    return (
      <div className={`flex items-center gap-2 text-sm font-body ${className}`}>
        <CheckCircle className="w-4 h-4 text-gold" />
        <span>You&apos;re subscribed!</span>
      </div>
    )
  }

  // ── Form UI ─────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(submitCompletedForm)}
      className={`flex flex-col gap-2 sm:flex-row sm:items-start ${className}`}
      noValidate
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label htmlFor={emailFieldId} className="sr-only">
          Email address
        </label>
        <input
          id={emailFieldId}
          type="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailFieldId}-error` : undefined}
          {...registerWithTracking('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
          })}
          placeholder="Your email address"
          autoComplete="email"
          className="w-full flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-body px-4 py-2.5 focus:outline-none focus:border-gold rounded-sm"
        />
        {errors.email && (
          <p className="text-xs text-red" id={`${emailFieldId}-error`} role="alert">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>
      <Button type="submit" variant="gold" size="sm" className="shrink-0 self-stretch sm:self-auto">
        Subscribe
      </Button>
    </form>
  )
}