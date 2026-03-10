import Link from 'next/link'
import { cn } from '@/lib/utils'

export type VoterToolLink = { label: string; url: string }

interface VoterToolsContentProps {
  mainHeading: string
  introParagraph?: string | null
  subheading?: string | null
  descriptionParagraph?: string | null
  bulletItems?: string[]
  concludingParagraph?: string | null
  ctaLabel: string
  ctaUrl?: string | null
  sidebarTitle: string
  sidebarLinks: VoterToolLink[]
  className?: string
}

export default function VoterToolsContent({
  mainHeading,
  introParagraph,
  subheading,
  descriptionParagraph,
  bulletItems = [],
  concludingParagraph,
  ctaLabel,
  ctaUrl,
  sidebarTitle,
  sidebarLinks,
  className,
}: VoterToolsContentProps) {
  return (
    <section className={cn('bg-cream py-16', className)}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-12">
          <div className="min-w-0">
            <h2 className="font-normal text-3xl text-navy mb-6">{mainHeading}</h2>
            {introParagraph && (
              <p className="font-body text-slate text-base leading-relaxed mb-6">{introParagraph}</p>
            )}
            {subheading && (
              <h3 className="font-semibold text-navy text-xl mb-3">{subheading}</h3>
            )}
            {descriptionParagraph && (
              <p className="font-body text-slate text-base leading-relaxed mb-6">
                {descriptionParagraph}
              </p>
            )}
            {bulletItems.length > 0 && (
              <ul className="list-disc list-inside font-body text-slate text-base space-y-2 mb-6">
                {bulletItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {concludingParagraph && (
              <p className="font-body text-slate text-base leading-relaxed mb-6">
                {concludingParagraph}
              </p>
            )}
            {ctaLabel && (
              ctaUrl ? (
                <Link
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-semibold text-red underline hover:text-navy transition-colors"
                >
                  {ctaLabel}
                </Link>
              ) : (
                <span className="font-body font-semibold text-slate">{ctaLabel}</span>
              )
            )}
          </div>

          <aside className="lg:pl-4">
            <div className="bg-white border border-warm-gray rounded-xl p-6 sticky top-6">
              <h3 className="font-semibold text-navy text-lg mb-4">{sidebarTitle}</h3>
              <ul className="space-y-3">
                {sidebarLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-red hover:text-navy transition-colors no-underline inline-flex items-center gap-2"
                    >
                      <span className="text-navy/60" aria-hidden>↗</span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {sidebarLinks.length === 0 && (
                <p className="font-body text-slate text-sm">Add links in Sanity Studio.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
