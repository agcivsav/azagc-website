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
    title: 'Legislative Advocacy',
    description: 'Full-time lobbyists fighting for Arizona contractor interests at the state and federal level.',
  },
  {
    icon: GraduationCap,
    title: 'Workforce Training',
    description: 'OSHA courses, apprenticeship programs, and management training that develops your team.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety Resources',
    description: 'Toolbox talks, safety data, incident benchmarking, and a dedicated safety awards program.',
  },
  {
    icon: Users,
    title: 'Networking Events',
    description: '25+ annual events — from golf tournaments to gala dinners — that generate real business.',
  },
  {
    icon: Scale,
    title: 'Legal Resources',
    description: 'Contract templates, legal guidance, and access to attorneys familiar with construction law.',
  },
  {
    icon: BadgeCheck,
    title: 'Insurance Programs',
    description: 'Member-exclusive group rates on workers\' comp, general liability, and health insurance.',
  },
  {
    icon: BarChart3,
    title: 'Industry Data',
    description: 'Quarterly construction outlook reports, wage surveys, and bid-letting data for AZ projects.',
  },
  {
    icon: Globe,
    title: 'AGC National Network',
    description: 'Access to AGC of America\'s national programs, publications, and 27,000-member contractor network.',
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
