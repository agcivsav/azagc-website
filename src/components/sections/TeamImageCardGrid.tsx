'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export type TeamImageCardItem = {
  imageUrl: string | null
  heading: string
  subheading?: string | null
  url: string | null
   ctaLabel?: string | null
  ctaHref?: string | null
}

export type TeamImageCardSectionData = {
  sectionTitle: string
  description?: string | null
  columns?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  items: TeamImageCardItem[]
}

interface TeamImageCardGridProps {
  section: TeamImageCardSectionData
  className?: string
}

export default function TeamImageCardGrid({ section, className }: TeamImageCardGridProps) {
  const cols =
    section.columns === '4'
      ? 'md:grid-cols-2 lg:grid-cols-4'
      : 'md:grid-cols-2 lg:grid-cols-3'
  const items = section.items?.filter((i) => i?.heading) ?? []

  if (items.length === 0) return null

  return (
    <section className={cn('py-12', className)}>
      <div className="container-site">
        <h2 className="font-normal text-lg sm:text-xl text-navy mb-4">{section.sectionTitle}</h2>
        {section.description && (
          <p className="font-body text-slate text-base mb-8 max-w-2xl">{section.description}</p>
        )}
        <ul
          className={cn('grid grid-cols-1 gap-6', cols)}
          aria-label={`Cards: ${section.sectionTitle}`}
        >
          {items.map((item, i) => {
            const href =
              item.url && item.url.startsWith('http') ? item.url : null
            const card = (
              <div className="h-full flex flex-col bg-white rounded-xl border border-warm-gray overflow-hidden hover:shadow-lg transition">
                {item.imageUrl && (
                  <div className="relative w-full aspect-video bg-warm-gray/30 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 text-center flex-grow">
                  <h3 className="font-semibold text-navy text-lg">{item.heading}</h3>
                  {item.subheading && (
                    <p className="font-body text-slate text-sm mt-1">{item.subheading}</p>
                  )}
                   {/* {item.ctaLabel && item.ctaHref && (
          <div className="mt-8 text-center">
            <a
              href={item.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold text-white bg-red hover:bg-red/90 px-6 py-3 rounded-lg min-h-[44px] transition-colors"
            >
              {item.ctaLabel}
            </a>
          </div>
        )} */}
                </div>
                   
              </div>
            )
            return (
              <li key={i}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline text-inherit h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </li>
            )
          })}
        </ul>
        {section.ctaLabel && section.ctaHref && (
          <div className="mt-8 text-center">
            <a
              href={section.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold text-white bg-red hover:bg-red/90 px-6 py-3 rounded-lg min-h-[44px] transition-colors"
            >
              {section.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
