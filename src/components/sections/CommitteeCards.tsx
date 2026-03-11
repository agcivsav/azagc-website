'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export type CommitteeCardItem = {
  _id: string
  name: string
  slug: string
  description?: string | null
  imageUrl?: string | null
  buttonLabel?: string | null
}

interface CommitteeCardsProps {
  committees: CommitteeCardItem[]
  className?: string
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop'

export default function CommitteeCards({ committees, className }: CommitteeCardsProps) {
  if (!committees?.length) return null

  return (
    <section className={cn('bg-cream py-16', className)} aria-label="Committees">
      <div className="container-site">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee) => {
            const href = `/about/committees/${committee.slug}`
            const imgSrc = committee.imageUrl && committee.imageUrl.startsWith('http')
              ? committee.imageUrl
              : PLACEHOLDER_IMAGE
            const imgAlt = committee.name

            return (
              <li key={committee._id}>
                <Link
                  href={href}
                  className="block h-full bg-white rounded-xl overflow-hidden border border-warm-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red/40 group no-underline text-inherit"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-warm-gray/20">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <h2 className="font-normal text-xl text-navy mb-2 group-hover:text-red transition-colors">
                      {committee.name}
                    </h2>
                    {committee.description && (
                      <p className="font-body text-sm text-slate leading-relaxed line-clamp-2 mb-4">
                        {committee.description}
                      </p>
                    )}
                    <span
                      className="inline-flex items-center justify-center font-body font-semibold text-sm px-5 py-2.5 rounded-sm bg-[#ea0a2a] text-white transition-colors group-hover:bg-red-hover"
                      aria-hidden
                    >
                      {committee.buttonLabel ?? 'Learn more'}
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
