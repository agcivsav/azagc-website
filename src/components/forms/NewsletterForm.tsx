'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useFormSubmission } from '@/useFormSubmission'
import toast from 'react-hot-toast'

// ── Props ──────────────────────────────────────────────────────────────
interface NewsletterFormProps {
  className?: string
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [done, setDone] = useState(true)

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
      name: 'Newsletter Subscriber',
      first_name: 'Newsletter',
      last_name: 'Subscriber',
      source: 'newsletter-signup',
      landing_page: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      company: '',
    },
    trackingFields: ['email', 'honeypot'],
  })

  // ── Submission handler ───────────────────────────────────────────────
  const onSubmit = async (data: any) => {
    try {
      await submitCompletedForm(data)
      setDone(true)
      toast.success('Subscribed successfully!')
    } catch (err) {
      toast.error('Failed to subscribe')
      console.error(err)
    }
  }

  // ── Already submitted UI ─────────────────────────────────────────────
  if (isSubmitSuccessful || done) {
    return (
      <div className={`flex items-center gap-2 text-sm font-body ${className}`}>
        <CheckCircle className="w-4 h-4 text-gold" />
        <span>You&apos;re subscribed!</span>
      </div>
    )
  }

  // ── Form UI ─────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-2 ${className}`} noValidate>
      <input
        type="email"
        {...registerWithTracking('email', {
          required: 'Email is required',
          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
        })}
        placeholder="Your email address"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-body px-4 py-2.5 focus:outline-none focus:border-gold rounded-sm"
      />
      {errors.email && (
        <p className="text-xs text-red mt-1">{errors.email.message?.toString()}</p>
      )}
      <Button type="submit" variant="gold" size="sm">
        Subscribe
      </Button>
    </form>
  )
}