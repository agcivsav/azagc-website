import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PageBuilderTextBlockProps {
  heading: string
  body?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  className?: string
}

export default function PageBuilderTextBlock({
  heading,
  body,
  ctaLabel,
  ctaHref,
  className,
}: PageBuilderTextBlockProps) {
  const showButton = ctaLabel && ctaHref
  return (
    <section className={cn('bg-cream py-12 md:py-16', className)}>
      <div className="container-site max-w-3xl">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
          {heading}
        </h2>
        {body && (
          <p className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
            {body}
          </p>
        )}
        {showButton && (
          <Link
            href={ctaHref}
            className="inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
