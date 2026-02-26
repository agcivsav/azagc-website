import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  color?: 'red' | 'gold'
}

export default function SectionLabel({ children, className, color = 'red' }: SectionLabelProps) {
  return (
    <p className={cn(
      'font-body font-semibold text-xs uppercase tracking-[0.15em]',
      color === 'red' ? 'text-red' : 'text-gold',
      className,
    )}>
      {children}
    </p>
  )
}
