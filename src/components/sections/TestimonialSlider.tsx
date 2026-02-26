'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Testimonial {
  quote: string
  personName: string
  personTitle?: string
  companyName?: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
  dark?: boolean
  className?: string
}

export default function TestimonialSlider({
  testimonials,
  dark = true,
  className,
}: TestimonialSliderProps) {
  const [active, setActive] = useState(0)
  const total = testimonials.length

  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(timer)
  }, [total])

  const prev = () => setActive((active - 1 + total) % total)
  const next = () => setActive((active + 1) % total)

  const bg = dark ? 'bg-navy-deep' : 'bg-cream'
  const textPrimary = dark ? 'text-white' : 'text-navy'
  const textMuted = dark ? 'text-white/60' : 'text-slate'
  const quoteColor = dark ? 'text-gold' : 'text-red'
  const dotActive = dark ? 'bg-gold' : 'bg-red'
  const dotInactive = dark ? 'bg-white/25' : 'bg-warm-gray'
  const btnCls = cn(
    'w-10 h-10 rounded-full flex items-center justify-center border transition-colors',
    dark
      ? 'border-white/20 text-white/60 hover:border-gold hover:text-gold'
      : 'border-warm-gray text-slate hover:border-red hover:text-red',
  )

  const t = testimonials[active]

  return (
    <section className={cn('py-16', bg, className)}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Quote className={cn('w-10 h-10 mx-auto mb-6', quoteColor)} />

        <blockquote
          key={active}
          className={cn('font-display text-xl md:text-2xl italic leading-relaxed mb-8', textPrimary)}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mb-8">
          <p className={cn('font-body font-semibold text-base', textPrimary)}>{t.personName}</p>
          {t.personTitle && (
            <p className={cn('font-body text-sm', textMuted)}>{t.personTitle}</p>
          )}
          {t.companyName && (
            <p className={cn('font-body text-sm font-semibold mt-0.5', quoteColor)}>
              {t.companyName}
            </p>
          )}
        </div>

        {/* Controls */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-6">
            <button onClick={prev} className={btnCls} aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    i === active ? dotActive : dotInactive,
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className={btnCls} aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
