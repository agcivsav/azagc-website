import { ChevronDown } from 'lucide-react'

type FaqItem = {
  _key?: string
  question: string
  answer: string
}

type ArticleFaqSectionProps = {
  title?: string
  items?: FaqItem[]
}

export function ArticleFaqSection({ title, items }: ArticleFaqSectionProps) {
  if (!items?.length) return null

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
    <section className="not-prose my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {title ? (
        <h2 className="font-normal text-xl text-navy mb-4">{title}</h2>
      ) : null}
      <div className="divide-y divide-warm-gray overflow-hidden rounded-lg border border-warm-gray bg-white">
        {items.map((item, index) => (
          <details key={item._key || `faq-${index}`} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-body text-base font-semibold text-navy transition-colors hover:bg-cream [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-red transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="px-5 pb-4 font-body text-sm leading-relaxed text-slate sm:text-base">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
