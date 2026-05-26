import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  HERO_BACKGROUND_SIZES,
  HERO_BACKGROUND_WIDTH,
  optimizeSanityCdnUrl,
} from '@/lib/sanity-image'

interface AdvocacyHeroProps {
  title: string
  backgroundImageUrl?: string | null
  className?: string
}

export default function AdvocacyHero({
  title,
  backgroundImageUrl,
  className,
}: AdvocacyHeroProps) {
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
            src={optimizeSanityCdnUrl(backgroundImageUrl, HERO_BACKGROUND_WIDTH)}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
            sizes={HERO_BACKGROUND_SIZES}
          />
          <div className="absolute inset-0 bg-navy/50" />
        </>
      )}
      <div className="container-site relative z-10 py-16">
        <h1 className="font-normal text-4xl md:text-5xl text-white tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  )
}
