import {
  Megaphone,
  GraduationCap,
  ShieldCheck,
  Users,
  Scale,
  BadgeCheck,
  BarChart3,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const DEFAULT_BENEFITS = [
  {
    icon: Megaphone,
    title: '',
    description: '',
  },


]

interface Benefit {
  icon?: string
  title: string
  description: string
}

interface BenefitsGridProps {
  benefits?: Benefit[]
  className?: string
}

export default function BenefitsGrid({ benefits, className }: BenefitsGridProps) {
  const items = DEFAULT_BENEFITS

  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-10 h-10 bg-red/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-red" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm text-navy mb-1">{title}</h3>
                <p className="font-body text-sm text-slate leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
