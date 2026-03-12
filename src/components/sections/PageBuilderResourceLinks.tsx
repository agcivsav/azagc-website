import Link from 'next/link'
import { cn } from '@/lib/utils'

export type ResourceLink = { label: string; url: string }
export type ResourceGroup = { title: string; links: ResourceLink[] }

interface PageBuilderResourceLinksProps {
  body?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  resourceGroups?: ResourceGroup[]
  className?: string
}

export default function PageBuilderResourceLinks({
  body,
  ctaLabel,
  ctaHref,
  resourceGroups = [],
  className,
}: PageBuilderResourceLinksProps) {
  const showCta = ctaLabel && ctaHref
  const hasRight = resourceGroups.some((g) => g.links?.length > 0)

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-10 lg:gap-14 items-start">
          <div className="min-w-0">
            {body && (
              <p className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-8">
                {body}
              </p>
            )}
            {showCta && (
              <Link
  href={ctaHref.startsWith('/') ? ctaHref : `/${ctaHref}`}                className="inline-block font-body font-semibold text-sm uppercase tracking-wide py-3.5 px-6 rounded-lg bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover shadow-sm"
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          {hasRight && (
            <aside className="lg:sticky lg:top-6 space-y-8">
              {resourceGroups.map((group, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-warm-gray/60 bg-cream/50 p-6"
                >
                  <h3 className="font-semibold text-navy text-lg mb-4 pb-3 border-b border-warm-gray/80">
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {(group.links ?? []).map((link, j) => (
                      <li key={j}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-red hover:text-navy transition-colors no-underline inline-flex items-center gap-2"
                        >
                          <span className="text-navy/60 shrink-0" aria-hidden>
                            →
                          </span>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
