import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageBuilderHeroProps {
  title: string
  subtitle?: string | null
  backgroundImageUrl?: string | null
  className?: string
}

export default function PageBuilderHero({
  title,
  subtitle,
  backgroundImageUrl,
  className,
}: PageBuilderHeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[220px] md:min-h-[280px] flex items-center overflow-hidden bg-navy',
        className,
      )}
    >
      {backgroundImageUrl && backgroundImageUrl.startsWith('http') && (
        <>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/50" />
        </>
      )}
      <div className="container-site relative z-10 py-16">
        <h1 className="font-normal text-4xl md:text-5xl text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-white/70 mt-3 max-w-2xl text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
