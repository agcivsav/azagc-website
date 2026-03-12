'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { HardHat, Handshake, Zap } from 'lucide-react'

const DEFAULT_CARDS = [
  {
    icon: HardHat,
    title: '',
    href: '',
    description:
      "",
    imgSrc: '',
    imgAlt: '',
  },

]

type MembershipCard = {
  title: string
  href: string
  description: string
  imgSrc?: string
  imgAlt?: string
}

interface MembershipCardsProps {
  className?: string
  cards?: MembershipCard[]
}

export default function MembershipCards({ className, cards }: MembershipCardsProps) {
  const cardsToRender: MembershipCard[] =
    cards && cards.length > 0 ? cards : DEFAULT_CARDS
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-5', className)}>
      {cardsToRender.map((card, index) => {
        const fallback = DEFAULT_CARDS[index] ?? DEFAULT_CARDS[0]
        const Icon = fallback.icon
        const imgSrc = card.imgSrc || fallback.imgSrc
        const imgAlt = card.imgAlt || fallback.imgAlt || card.title

        return (
        <article
  key={card.title}
          className="bg-white rounded-xl overflow-hidden border border-warm-gray transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(26,34,56,0.1)] hover:border-red group"
        >
          {/* Image with overlay + icon badge */}
          <div className="h-[180px] relative overflow-hidden">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/15 to-navy/[0.02]" />
            {/* Icon badge */}
            <div className="absolute bottom-3.5 left-4 z-10 w-[42px] h-[42px] bg-red rounded-[9px] grid place-items-center shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <h3 className="font-normal text-[1.2rem] text-navy mb-1.5">{card.title}</h3>
            <p className="font-body text-[0.84rem] text-light-slate leading-[1.55] mb-4">
              {card.description}
            </p>
            <a
              href={card.href}
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              Learn more →
            </a>
          </div>
        </article>
        )
      })}
    </div>
  )
}