'use client'

import Link from 'next/link'
import { useId } from 'react'
import { cn } from '@/lib/utils'

export type NewsGridArticle = {
  headline: string
  slug: string
  publishedAt: string | null
  excerpt: string | null
  /** When set, use for the link (detail page or external URL). Otherwise /news-media/[slug] */
  href?: string
}

interface NewsGridSectionProps {
  articles: NewsGridArticle[]
  heading?: string | null
  className?: string
  /** Override default empty-state copy */
  emptyMessage?: string | null
}

function formatDateUppercase(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    .toUpperCase()
}

export default function NewsGridSection({
  articles,
  heading,
  className,
  emptyMessage,
}: NewsGridSectionProps) {
  const headingId = useId()
  return (
    <section
      className={cn('bg-white py-12 md:py-16', className)}
      aria-labelledby={heading ? headingId : undefined}
    >
      <div className="container-site">
        {heading && (
          <h2 id={headingId} className="font-normal text-2xl text-navy mb-8">
            {heading}
          </h2>
        )}
        {articles.length === 0 ? (
          <p className="font-body text-slate">
            {emptyMessage != null && emptyMessage !== ''
              ? emptyMessage
              : heading === 'Policy Priorities'
                ? 'There are no related Policy Priorities at this time. Visit our main page to see all AZAGC Policy Priorities.'
                : 'No news articles yet. Add content in Sanity under News Articles.'}
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {articles.map((article, i) => {
              const linkHref = article.href ?? `/news-media/${article.slug}`
              const isExternal = linkHref.startsWith('http')
              return (
                <li
                  key={article.slug || `item-${i}`}
                  className="flex flex-col py-6 border-b border-warm-gray last:border-b-0"
                >
                  <h3 className="font-normal text-lg md:text-xl text-navy leading-snug mb-2 transition-colors">
                    {isExternal ? (
                      <a href={linkHref} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-red transition-colors">
                        {article.headline}
                      </a>
                    ) : (
                      <Link href={linkHref} className="no-underline hover:text-red transition-colors">
                        {article.headline}
                      </Link>
                    )}
                  </h3>
                  <time
                    className="font-body text-xs text-slate uppercase tracking-wide mb-3 block"
                    dateTime={article.publishedAt ?? undefined}
                  >
                    {formatDateUppercase(article.publishedAt)}
                  </time>
                  {article.excerpt && (
                    <p className="font-body text-sm text-slate leading-relaxed mb-4 grow">
                      {article.excerpt}
                    </p>
                  )}
                  {isExternal ? (
                    <a href={linkHref} target="_blank" rel="noopener noreferrer" className="font-body font-semibold text-xs uppercase tracking-wide text-red hover:text-navy transition-colors no-underline inline-flex items-center gap-1">
                      READ MORE
                      <span aria-hidden>&gt;</span>
                    </a>
                  ) : (
                    <Link href={linkHref} className="font-body font-semibold text-xs uppercase tracking-wide text-red hover:text-navy transition-colors no-underline inline-flex items-center gap-1">
                      READ MORE
                      <span aria-hidden>&gt;</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
