'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import TestimonialCard, { type TestimonialItem } from './TestimonialCard'

export const TESTIMONIAL_CATEGORIES = [
  { value: 'contractors', label: 'Contractors' },
  { value: 'affiliates', label: 'Affiliates' },
  { value: 'ycf', label: 'Young Constructors Forum (YCF)' },
  { value: 'industry-partners', label: 'Industry Partners & Owners' },
] as const

export type TestimonialsByCategory = Record<string, TestimonialItem[]>

interface TestimonialsSectionProps {
  testimonialsByCategory: TestimonialsByCategory
  className?: string
}

export default function TestimonialsSection({
  testimonialsByCategory,
  className,
}: TestimonialsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(TESTIMONIAL_CATEGORIES[0].value)

  const items = testimonialsByCategory[activeTab] ?? []
  const hasAny = Object.values(testimonialsByCategory).some(
    (arr) => arr && arr.length > 0
  )

  if (!hasAny) {
    return (
      <section className={cn('bg-cream py-16', className)}>
        <div className="container-site">
          <p className="font-body text-slate text-center py-12">
            No testimonials yet. Add testimonials in Sanity Studio and assign a
            category to see them here.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn('bg-cream py-16', className)}
      aria-label="Testimonials"
    >
      <div className="container-site">
        <div
          role="tablist"
          aria-label="Testimonial categories"
          className="flex flex-wrap gap-2 border-b border-warm-gray pb-4 mb-10"
        >
          {TESTIMONIAL_CATEGORIES.map(({ value, label }) => {
            const count = testimonialsByCategory[value]?.length ?? 0
            if (count === 0) return null

            const isActive = activeTab === value

            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${value}`}
                id={`tab-${value}`}
                onClick={() => setActiveTab(value)}
                className={cn(
                  'font-body text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors min-h-[44px]',
                  isActive
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy border border-warm-gray hover:border-navy/50 hover:bg-navy/5'
                )}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="space-y-8"
        >
          {items.length === 0 ? (
            <p className="font-body text-slate">
              No testimonials in this category.
            </p>
          ) : (
            items.map((item) => (
              <TestimonialCard key={item._id} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}