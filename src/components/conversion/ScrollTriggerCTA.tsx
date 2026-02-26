'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScrollTriggerCTAProps {
  threshold?: number // % of page scrolled before showing
  href?: string
  headline?: string
  subtext?: string
}

export default function ScrollTriggerCTA({
  threshold = 60,
  href = '/join',
  headline = 'Ready to join AZAGC?',
  subtext = 'Hundreds of Arizona agribusiness professionals already have.',
}: ScrollTriggerCTAProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrolled >= threshold) setVisible(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, dismissed])

  if (dismissed || !visible) return null

  return (
    <div className={cn(
      'fixed bottom-20 right-6 z-40 w-72 bg-navy shadow-2xl p-5 rounded-sm border border-white/10',
      'animate-in slide-in-from-right-4 fade-in duration-300',
    )}>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-white/40 hover:text-white/80"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <p className="font-display text-base text-white mb-1">{headline}</p>
      <p className="font-body text-xs text-white/60 mb-4">{subtext}</p>
      <Link
        href={href}
        className="block text-center bg-red text-white font-body font-semibold text-sm py-2.5 rounded-sm hover:bg-red-hover transition-colors"
      >
        Become a Member →
      </Link>
    </div>
  )
}
