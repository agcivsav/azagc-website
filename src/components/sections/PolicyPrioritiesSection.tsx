import Link from 'next/link'
import { cn } from '@/lib/utils'

export type PolicyPriorityItem = {
  _id: string
  title: string
  slug: string
  description?: string | null
}

interface PolicyPrioritiesSectionProps {
  sectionTitle: string
  sectionIntro?: string | null
  priorities: PolicyPriorityItem[]
  readMoreLabel?: string
  className?: string
}

const TRUNCATE_LENGTH = 320

function truncateDescription(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength).lastIndexOf(' ')
  return (cut > 0 ? text.slice(0, cut) : text.slice(0, maxLength)) + '…'
}

export default function PolicyPrioritiesSection({
  sectionTitle,
  sectionIntro,
  priorities,
  readMoreLabel,
  className,
}: PolicyPrioritiesSectionProps) {
  const introParagraphs = sectionIntro
    ? sectionIntro.split(/\n\n+/).filter((p) => p.trim())
    : []

  return (
    <section className={cn('bg-white py-16', className)} aria-labelledby="where-we-stand-heading">
      <div className="container-site">
        <h2
          id="where-we-stand-heading"
          className="font-normal text-3xl sm:text-4xl text-navy mb-6"
        >
          {sectionTitle}
        </h2>
        {introParagraphs.length > 0 && (
          <div className="max-w-3xl mb-12 space-y-4">
            {introParagraphs.map((paragraph, i) => (
              <p key={i} className="font-body text-slate text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {priorities.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {priorities.map((item) => (
              <li key={item._id}>
                <article className="h-full flex flex-col">
                  <h3 className="font-semibold text-navy text-lg leading-tight mb-3">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="font-body text-slate text-sm leading-relaxed flex-grow">
                      {truncateDescription(item.description, TRUNCATE_LENGTH)}
                    </p>
                  )}
                  <Link
                    href={`/advocacy/policy-priorities/${item.slug}`}
                    className="font-body text-sm font-semibold text-red uppercase tracking-wide mt-4 inline-flex items-center gap-1.5 no-underline hover:text-navy transition-colors"
                  >
                    {readMoreLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-slate">
            Add policy priorities in Sanity Studio to display them here.
          </p>
        )}
      </div>
    </section>
  )
}
