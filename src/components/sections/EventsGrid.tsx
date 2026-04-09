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

interface EventsGridProps {
  events?: Event[]
  className?: string
}

export default function EventsGrid({ events, className }: EventsGridProps) {
  const list = (events ?? []).filter((e) => e.title?.trim())
  if (list.length === 0) return null

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-5', className)}>
      {list.map((event, i) => {
        const inner = (
          <>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="bg-white text-navy border border-gray-300 rounded-[7px] px-2.5 py-1.5 text-center min-w-[46px]">
                <div className="text-[0.6rem] uppercase tracking-[0.1em] text-primary font-semibold">
                  {event.month}
                </div>
                <div className="font-normal text-[1.25rem] leading-tight">{event.day}</div>
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
          </>
        )

        return event.href ? (
          <Link
            key={`${event.href}-${i}`}
            href={event.href}
            className="bg-white rounded-xl p-[22px] border border-warm-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(26,34,56,0.07)] hover:border-red no-underline text-inherit block"
          >
            {inner}
          </Link>
        ) : (
          <article
            key={i}
            className="bg-white rounded-xl p-[22px] border border-warm-gray transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(26,34,56,0.07)] hover:border-red"
          >
            {inner}
          </article>
        )
      })}
    </div>
  )
}
