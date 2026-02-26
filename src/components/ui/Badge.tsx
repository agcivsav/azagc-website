import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'gold' | 'navy' | 'red'
}

export default function Badge({ children, className, variant = 'gold' }: BadgeProps) {
  const variants = {
    gold:  'border-gold text-gold',
    navy:  'border-navy text-navy',
    red:   'border-red text-red',
  }
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 border rounded-full px-3 py-0.5 font-body font-semibold text-xs uppercase tracking-wide',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  )
}
