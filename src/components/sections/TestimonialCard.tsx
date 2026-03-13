'use client'

import { cn } from '@/lib/utils'

export type TestimonialItem = {
  _id: string
  quote: string
  personName: string
  personTitle?: string | null
  companyName?: string | null
  logoUrl?: string | null
}

type TestimonialCardProps = {
  item: TestimonialItem
  className?: string
}

export default function TestimonialCard({ item, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'grid grid-cols-1 md:grid-cols-[1fr,auto] gap-8 md:gap-10 items-start bg-white rounded-xl border border-warm-gray p-6 sm:p-8 transition-all duration-200 hover:border-red/40 hover:shadow-md',
        className
      )}
      aria-labelledby={`testimonial-name-${item._id}`}
    >
      <div className="min-w-0">
        <blockquote className="font-body text-slate text-base leading-relaxed">
          {item.quote}
        </blockquote>

        <footer className="mt-4">
          <p id={`testimonial-name-${item._id}`} className="font-semibold text-navy">
            {item.personName}

            {item.personTitle && (
              <span className="font-normal text-slate text-sm block mt-0.5">
                {item.personTitle}
              </span>
            )}
          </p>
        </footer>
      </div>

      <div className="flex items-center justify-center gap-3 md:pt-2">
        {item.logoUrl && item.logoUrl.startsWith('http') ? (
          <div className="w-28 h-16 md:w-32 md:h-20 flex items-center justify-center shrink-0 bg-white/50 rounded p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.logoUrl}
              alt={item.companyName ?? 'Company logo'}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-28 h-16 md:w-32 md:h-20 rounded bg-warm-gray/30 flex items-center justify-center">
            <span className="text-navy/40 font-body text-xs">No logo</span>
          </div>
        )}

        {item.companyName && (
          <p className="font-body text-sm text-slate text-center max-w-[140px]">
            {item.companyName}
          </p>
        )}
      </div>
    </article>
  )
}