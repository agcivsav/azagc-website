'use client'
/**
 * ScrollTriggerCTA — slides in from bottom-right after 60% scroll.
 * Email-only capture. Does NOT show if sticky desktop CTA is visible.
 */
import { useEffect, useState } from 'react'
import { X, Loader2, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface EmailForm { email: string }

export default function ScrollTriggerCTA({ threshold = 60 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<EmailForm>()

  useEffect(() => {
    if (dismissed) return

    // Don't show if user already submitted or dismissed this session
    if (sessionStorage.getItem('scroll-cta-done')) return

    const handleScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (pct >= threshold) setVisible(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, dismissed])

  const onSubmit = async ({ email }: EmailForm) => {
    setLoading(true)
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Scroll',
        last_name: 'Lead',
        email,
        company: '',
        source: 'scroll-trigger-cta',
        landing_page: window.location.href,
        referrer: document.referrer,
      }),
    }).catch(() => {})
    setLoading(false)
    setDone(true)
    sessionStorage.setItem('scroll-cta-done', '1')
    setTimeout(() => { setDismissed(true) }, 3000)
  }

  if (dismissed || !visible) return null

  return (
    <div className={cn(
      // Hidden on mobile (sticky mobile bar handles that), hidden when sticky desktop CTA is showing
      'fixed bottom-6 right-6 z-40 w-72 bg-navy shadow-2xl p-5 rounded-sm border border-white/10',
      'hidden sm:block',
      'animate-in slide-in-from-right-4 fade-in duration-300',
    )}>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>

      {done ? (
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <CheckCircle className="w-8 h-8 text-gold" />
          <p className="font-body text-sm text-white">You&apos;re all set!</p>
        </div>
      ) : (
        <>
          <p className="font-display text-base text-white mb-1 pr-4">
            Ready to join 500+ AZ contractors?
          </p>
          <p className="font-body text-xs text-white/60 mb-4">
            Drop your email and we&apos;ll send the membership guide.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
              type="email"
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
              placeholder="your@email.com"
              className={cn(
                'w-full bg-white/10 border text-white text-sm font-body px-3 py-2 focus:outline-none rounded-sm placeholder:text-white/40',
                errors.email ? 'border-red' : 'border-white/20 focus:border-gold',
              )}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red text-white font-body font-semibold text-sm py-2 rounded-sm hover:bg-red-hover transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get the Guide →'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
