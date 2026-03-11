import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PageBuilderTwoImagesProps {
  heading?: string | null
  leftImageUrl?: string | null
  leftCaption?: string | null
  rightImageUrl?: string | null
  rightCaption?: string | null
  className?: string
}

export default function PageBuilderTwoImages({
  heading,
  leftImageUrl,
  leftCaption,
  rightImageUrl,
  rightCaption,
  className,
}: PageBuilderTwoImagesProps) {
  const hasLeft = leftImageUrl && leftImageUrl.startsWith('http')
  const hasRight = rightImageUrl && rightImageUrl.startsWith('http')
  if (!hasLeft && !hasRight) return null

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container-site">
        {heading && (
          <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {hasLeft && (
            <figure className="overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-gray/10 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={leftImageUrl}
                  alt={leftCaption ?? ''}
                  fill
                  className="object-cover"
                  sizes="auto"
                />
              </div>
              {leftCaption && (
                <figcaption className="p-4 font-body text-sm text-slate">
                  {leftCaption}
                </figcaption>
              )}
            </figure>
          )}
          {hasRight && (
            <figure className="overflow-hidden rounded-xl border border-warm-gray/50 bg-warm-gray/10 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={rightImageUrl}
                  alt={rightCaption ?? ''}
                  fill
                  className="object-cover"
                  sizes="auto"
                />
              </div>
              {rightCaption && (
                <figcaption className="p-4 font-body text-sm text-slate">
                  {rightCaption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}
