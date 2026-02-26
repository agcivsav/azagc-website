'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  title?: string
  dark?: boolean
  className?: string
}

export default function FAQAccordion({
  items,
  title = 'Frequently Asked Questions',
  dark = false,
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className={cn('py-12', className)}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4">
        {title && (
          <h2 className={cn('font-display text-3xl mb-8 text-center', dark ? 'text-white' : 'text-navy')}>
            {title}
          </h2>
        )}

        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={cn(
                'border rounded-sm overflow-hidden',
                dark
                  ? 'border-white/10 bg-navy-deep'
                  : 'border-warm-gray bg-white',
              )}
            >
              <button
                onClick={() => toggle(i)}
                className={cn(
                  'w-full flex items-center justify-between px-6 py-4 text-left transition-colors',
                  dark
                    ? 'text-white hover:bg-white/5'
                    : 'text-navy hover:bg-cream',
                )}
                aria-expanded={openIndex === i}
              >
                <span className="font-body font-semibold text-base pr-4">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                    dark ? 'text-gold' : 'text-red',
                    openIndex === i && 'rotate-180',
                  )}
                />
              </button>

              {openIndex === i && (
                <div
                  className={cn(
                    'px-6 pb-5 font-body text-sm leading-relaxed',
                    dark ? 'text-white/75' : 'text-slate',
                  )}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
