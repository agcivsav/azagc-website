import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type CtaItem = { label: string; href: string }

interface PageBuilderTwoColumnProps {
  imagePosition: 'left' | 'right'
  heading?: string | null
  body?: string | null
  imageUrl?: string | null
  ctas?: CtaItem[]
  className?: string
}

export default function PageBuilderTwoColumn({
  imagePosition,
  heading,
  body,
  imageUrl,
  ctas = [],
  className,
}: PageBuilderTwoColumnProps) {
  const imageBlock = imageUrl && imageUrl.startsWith('http') ? (
    <div className="relative aspect-[4/3] min-h-[240px] rounded-xl overflow-hidden bg-warm-gray/20">
      <Image
        src={imageUrl}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  ) : (
    <div className="aspect-[4/3] min-h-[240px] rounded-xl bg-warm-gray/20 flex items-center justify-center">
      <span className="font-body text-slate/40 text-sm">Image</span>
    </div>
  )


  const textBlock = (
    <div className="flex flex-col justify-center">
      {heading && (
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
          {heading}
        </h2>
      )}
      {body && (
        <p className="font-body text-slate text-base leading-relaxed whitespace-pre-wrap mb-6">
          {body}
        </p>
      )}
      {ctas.length > 0 && (
        <ul className="space-y-3">
          {ctas.map((cta, i) => (
            <li key={i}>
              <Link
                href={cta.href}
                className="block w-full text-center font-body font-semibold text-sm py-3 px-5 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover"
              >
                {cta.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container-site">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center',
            imagePosition === 'right' && 'lg:grid-flow-dense',
          )}
        >
          <div className={imagePosition === 'left' ? undefined : 'lg:col-start-2'}>
            {imageBlock}
          </div>
          <div className={imagePosition === 'right' ? 'lg:col-start-1 lg:row-start-1' : undefined}>
            {textBlock}
          </div>
        </div>
      </div>
    </section>
  )
}
