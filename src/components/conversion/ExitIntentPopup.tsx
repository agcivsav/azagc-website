'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LeadForm from '@/components/forms/LeadForm'

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    // Don't show if already seen this session
    if (sessionStorage.getItem('exit-popup-shown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !fired) {
        setFired(true)
        setOpen(true)
        sessionStorage.setItem('exit-popup-shown', '1')
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [fired])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      {/* Modal */}
      <div className={cn(
        'relative bg-white w-full max-w-md shadow-2xl rounded-sm p-8 animate-in fade-in zoom-in-95 duration-200',
      )}>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-light-slate hover:text-charcoal transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <p className="font-body font-semibold text-xs uppercase tracking-[0.15em] text-red mb-2">Before You Go</p>
        <h2 className="font-display text-2xl text-navy mb-2">Don&apos;t miss out on AZAGC membership</h2>
        <p className="font-body text-sm text-slate mb-6">
          Join hundreds of Arizona agribusiness professionals. Advocacy, training, and networking — all in one place.
        </p>
        <LeadForm
          source="exit-intent"
          
          headline=""
          subheadline=""
          submitLabel="Claim My Membership →"
          showRoleSelect={false} showPhone={false}
        />
      </div>
    </div>
  )
}
