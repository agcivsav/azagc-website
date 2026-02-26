'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

interface NewsletterData { email: string }

export default function NewsletterForm({ className }: { className?: string }) {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<NewsletterData>()

  const onSubmit = async ({ email }: NewsletterData) => {
    await fetch('/api/ghl-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'newsletter', tags: ['newsletter-signup'] }),
    })
    setDone(true)
  }

  if (done) return (
    <div className={`flex items-center gap-2 text-sm font-body ${className}`}>
      <CheckCircle className="w-4 h-4 text-gold" />
      <span>You&apos;re subscribed!</span>
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
        placeholder="Your email address"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-body px-4 py-2.5 focus:outline-none focus:border-gold rounded-sm"
      />
      <Button type="submit" variant="gold" size="sm">Subscribe</Button>
    </form>
  )
}
