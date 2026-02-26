import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Event {
  month: string
  day: string
  tag: string
  title: string
  description: string
  href?: string
}

// Static seed events — will be replaced by Sanity CMS data
const SEED_EVENTS: Event[] = [
  {
    month: 'Feb',
    day: '27',
    tag: 'Awards',
    title: 'BWiC Inspire Awards Luncheon',
    description:
      'Celebrating the achievements of women in Arizona\'s construction industry.',
    href: '/events/',
  },
  {
    month: 'Mar',
    day: '20',
    tag: 'Networking',
    title: 'Joint Construction Association Mixer',
    description:
      "Arizona's largest annual cross-association networking event with GCs, subs, and suppliers.",
    href: '/events/',
  },
  {
    month: 'May',
    day: '7',
    tag: 'Golf',
    title: 'Premier Golf Scramble',
    description:
      'Our flagship golf event bringing together industry leaders for competition and networking.',
    href: '/events/',
  },
]

interface EventsGridProps {
  events?: Event[]
  className?: string
}

export default function EventsGrid({ events = SEED_EVENTS, className }: EventsGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-5', className)}>
      {events.map((event, i) => (
        <article
          key={i}
          className="bg-white rounded-xl p-[22px] border border-warm-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(26,34,56,0.07)] hover:border-red"
        >
          {/* Date + tag row */}
          <div className="flex items-center gap-2.5 mb-3">
            {/* Teal date box */}
            <div className="bg-teal text-white rounded-[7px] px-2.5 py-1.5 text-center min-w-[46px]">
              <div className="text-[0.6rem] uppercase tracking-[0.1em] text-gold font-semibold">
                {event.month}
              </div>
              <div className="font-display text-[1.25rem] leading-tight">{event.day}</div>
            </div>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.06em] px-2 py-1 rounded bg-red/10 text-red">
              {event.tag}
            </span>
          </div>

          <h3 className="font-body font-semibold text-[1rem] text-navy mb-1.5 leading-[1.3]">
            {event.title}
          </h3>
          <p className="font-body text-[0.8rem] text-light-slate leading-[1.5]">
            {event.description}
          </p>
        </article>
      ))}
    </div>
  )
}
