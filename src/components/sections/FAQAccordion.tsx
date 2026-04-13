'use client'
import { useId, useState } from 'react'
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
  const baseId = useId()

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4">
        {title && (
          <h2 className={cn('font-normal text-3xl mb-8 text-center', dark ? 'text-white' : 'text-navy')}>
            {title}
          </h2>
        )}

        <div className="space-y-3">
          {items.map((item, i) => {
            const questionId = `${baseId}-q-${i}`
            const answerId = `${baseId}-a-${i}`
            const expanded = openIndex === i
            return (
              <div
                key={`${baseId}-${i}`}
                className={cn(
                  'border rounded-sm overflow-hidden',
                  dark
                    ? 'border-white/10 bg-navy-deep'
                    : 'border-warm-gray bg-white',
                )}
              >
                <h3 className="m-0 font-body text-base font-semibold">
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={expanded}
                    aria-controls={answerId}
                    onClick={() => toggle(i)}
                    className={cn(
                      'w-full flex items-center justify-between px-6 py-4 text-left transition-colors',
                      dark
                        ? 'text-white hover:bg-white/5'
                        : 'text-navy hover:bg-cream',
                    )}
                  >
                    <span className="pr-4">{item.question}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                        dark ? 'text-gold' : 'text-red',
                        expanded && 'rotate-180',
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  hidden={!expanded}
                  className={cn(
                    'px-6 pb-5 font-body text-sm leading-relaxed',
                    dark ? 'text-white/75' : 'text-slate',
                  )}
                >
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
