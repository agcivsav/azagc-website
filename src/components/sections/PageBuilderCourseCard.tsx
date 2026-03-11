import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PageBuilderCourseCardProps {
  heading: string
  body?: string | null
  details?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  alternateBg?: boolean
  className?: string
}

export default function PageBuilderCourseCard({
  heading,
  body,
  details,
  ctaLabel,
  ctaHref,
  alternateBg = false,
  className,
}: PageBuilderCourseCardProps) {
  return (
    <section
      className={cn(
        'py-12 md:py-16',
        alternateBg ? 'bg-cream' : 'bg-white',
        className,
      )}
    >
      <div className="container-site max-w-5xl">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
          {heading}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            {body && (
              <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap">
                {body}
              </div>
            )}
          </div>
          <div className="lg:pl-4">
            {details && (
              <div className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
                {details}
              </div>
            )}
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-block font-body font-semibold text-sm uppercase tracking-wide py-3 px-8 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
