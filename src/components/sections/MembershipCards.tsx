import { HardHat, Briefcase, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const CARDS = [
  {
    icon: HardHat,
    title: 'Contractor Member',
    href: '/membership/contractor/',
    description:
      'For general contractors, subcontractors, and specialty contractors actively working in Arizona construction.',
    benefits: [
      'Full legislative advocacy & lobbying representation',
      'Safety & risk management resources',
      'Access to AZAGC apprenticeship programs',
    ],
  },
  {
    icon: Briefcase,
    title: 'Affiliate Member',
    href: '/membership/affiliate/',
    description:
      'For suppliers, manufacturers, engineers, attorneys, and service providers that support the construction industry.',
    benefits: [
      'Direct access to 500+ Arizona contractors',
      'Networking events & trade shows',
      'Business development resources',
    ],
  },
  {
    icon: Users,
    title: 'Young Constructors Forum',
    href: '/membership/ycf/',
    description:
      'For construction professionals under 40 — the next generation of Arizona contractors and industry leaders.',
    benefits: [
      'Peer networking & mentorship programs',
      'Leadership development workshops',
      'Connection to senior AZAGC members',
    ],
  },
]

interface MembershipCardsProps {
  className?: string
}

export default function MembershipCards({ className }: MembershipCardsProps) {
  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map(({ icon: Icon, title, href, description, benefits }) => (
            <div
              key={title}
              className="bg-white border border-warm-gray rounded-sm p-6 flex flex-col group hover:border-red transition-colors"
            >
              <div className="w-12 h-12 rounded-sm bg-cream flex items-center justify-center mb-4 group-hover:bg-red transition-colors">
                <Icon className="w-6 h-6 text-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl text-navy mb-2">{title}</h3>
              <p className="font-body text-sm text-slate leading-relaxed mb-4">{description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-charcoal">
                    <span className="text-red mt-0.5 flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className="w-full justify-center border-navy text-navy hover:bg-navy hover:text-white" href={href}>
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
