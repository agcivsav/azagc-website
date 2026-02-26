import Image from 'next/image'
import { cn } from '@/lib/utils'

const CARDS = [
  {
    icon: '🏗️',
    title: 'Contractors',
    href: '/membership/contractor/',
    description:
      'General, sub, and specialty contractors shaping Arizona\'s built environment. Access bid opportunities, safety programs, and labor relations support.',
    imgSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    imgAlt: 'Construction site with heavy equipment',
  },
  {
    icon: '🤝',
    title: 'Affiliates',
    href: '/membership/affiliate/',
    description:
      'Suppliers, vendors, and service providers who support the construction industry. Connect directly with decision-makers at top AZ firms.',
    imgSrc: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop',
    imgAlt: 'Business professionals shaking hands',
  },
  {
    icon: '⚡',
    title: 'Young Constructors',
    href: '/membership/ycf/',
    description:
      'Ages 25–40. Build your network, develop leadership skills, and shape the next generation of Arizona\'s construction industry.',
    imgSrc: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop&crop=top',
    imgAlt: 'Young professionals collaborating',
  },
]

interface MembershipCardsProps {
  className?: string
}

export default function MembershipCards({ className }: MembershipCardsProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-5', className)}>
      {CARDS.map(({ icon, title, href, description, imgSrc, imgAlt }) => (
        <article
          key={title}
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
            <div className="absolute bottom-3.5 left-4 z-10 w-[42px] h-[42px] bg-red rounded-[9px] grid place-items-center text-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              {icon}
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <h3 className="font-display text-[1.2rem] text-navy mb-1.5">{title}</h3>
            <p className="font-body text-[0.84rem] text-light-slate leading-[1.55] mb-4">
              {description}
            </p>
            <a
              href={href}
              className="font-body text-[0.82rem] font-semibold text-red no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:gap-3 hover:text-navy"
            >
              Learn more →
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}
