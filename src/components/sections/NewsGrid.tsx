import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NewsItem {
  tag: string
  title: string
  excerpt: string
  href?: string
}

interface FeaturedArticle {
  tag: string
  title: string
  excerpt: string
  icon: string
  imgSrc: string
  imgAlt: string
  href?: string
}

const SEED_FEATURED: FeaturedArticle = {
  tag: 'Infrastructure',
  title: 'Coronado Generating Station Repower Project: Why It Matters to AZ Contractors',
  excerpt:
    "SRP's plan to repower the Coronado station near St. Johns represents major construction opportunities across the state.",
  icon: '⚡',
  imgSrc: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=700&h=500&fit=crop',
  imgAlt: 'Power station infrastructure project',
  href: '/news-media/',
}

const SEED_NEWS: NewsItem[] = [
  {
    tag: 'Membership',
    title: 'Welcome New Members — February 2026',
    excerpt: 'The latest firms to join the AZAGC community.',
    href: '/news-media/',
  },
  {
    tag: 'Compliance',
    title: 'ADEQ Briefing on Non-Road Engines and Air Compliance',
    excerpt: 'Important updates on ADEQ interpretations affecting contractor operations.',
    href: '/news-media/',
  },
  {
    tag: 'Advocacy',
    title: '2026 Legislative Session Update',
    excerpt: 'Key bills and policy priorities AZAGC is tracking this session.',
    href: '/news-media/',
  },
]

interface NewsGridProps {
  featured?: FeaturedArticle
  items?: NewsItem[]
  className?: string
}

export default function NewsGrid({
  featured = SEED_FEATURED,
  items = SEED_NEWS,
  className,
}: NewsGridProps) {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5', className)}>
      {/* Featured article */}
      <Link
        href={featured.href || '/news-media/'}
        className="relative rounded-[14px] overflow-hidden text-white flex flex-col items-center justify-center text-center min-h-[340px] group block no-underline"
      >
        <Image
          src={featured.imgSrc}
          alt={featured.imgAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 55vw"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/82 z-[1]" />

        <div className="relative z-[2] p-9 max-w-[420px]">
          {/* Icon */}
          <div className="w-[52px] h-[52px] rounded-xl bg-red/15 border border-red/25 grid place-items-center text-[1.4rem] mx-auto mb-4">
            {featured.icon}
          </div>
          <p className="text-gold text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-3">
            {featured.tag}
          </p>
          <h3 className="font-display text-[1.3rem] leading-[1.25] mb-2.5">{featured.title}</h3>
          <p className="text-white/60 text-[0.84rem] leading-[1.5]">{featured.excerpt}</p>
        </div>
      </Link>

      {/* List items */}
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href || '/news-media/'}
            className="bg-cream rounded-[10px] p-5 border border-warm-gray transition-all duration-200 hover:border-red hover:translate-x-1 block no-underline text-inherit"
          >
            <p className="text-[0.68rem] font-semibold uppercase text-red tracking-[0.06em] mb-1.5">
              {item.tag}
            </p>
            <h4 className="font-body font-semibold text-[0.92rem] text-navy mb-1 leading-[1.3]">
              {item.title}
            </h4>
            <p className="font-body text-[0.78rem] text-light-slate">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
