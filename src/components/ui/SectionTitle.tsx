import { cn } from '@/lib/utils'

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * Instrument Serif display heading.
 * Wrap words in <em> to render them in gold italic.
 * e.g. <SectionTitle>Advancing Arizona <em>Agriculture</em></SectionTitle>
 */
export default function SectionTitle({ children, className, as: Tag = 'h2' }: SectionTitleProps) {
  return (
    <Tag className={cn(
      'font-display text-3xl sm:text-4xl text-navy leading-tight [&_em]:not-italic [&_em]:text-gold',
      className,
    )}>
      {children}
    </Tag>
  )
}
