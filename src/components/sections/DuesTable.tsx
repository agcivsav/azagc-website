import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

const CONTRACTOR_TIERS = [
  { tier: 'Under $1M annual revenue', dues: '$800/year' },
  { tier: '$1M – $5M annual revenue', dues: '$1,200/year' },
  { tier: '$5M – $15M annual revenue', dues: '$1,800/year' },
  { tier: '$15M – $30M annual revenue', dues: '$2,400/year' },
  { tier: '$30M+ annual revenue', dues: '$3,200+/year' },
]

interface DuesTableProps {
  className?: string
}

export default function DuesTable({ className }: DuesTableProps) {
  return (
    <section className={cn('py-16', className)}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contractor */}
          <div className="bg-white border border-warm-gray rounded-sm overflow-hidden">
            <div className="bg-teal px-6 py-4">
              <h3 className="font-display text-xl text-white">Contractor Membership</h3>
              <p className="font-body text-sm text-white/75 mt-1">
                General contractors, subcontractors, specialty contractors
              </p>
            </div>
            <div>
              {CONTRACTOR_TIERS.map(({ tier, dues }, i) => (
                <div
                  key={tier}
                  className={cn(
                    'flex justify-between items-center px-6 py-3 font-body text-sm',
                    i % 2 === 0 ? 'bg-cream' : 'bg-white',
                  )}
                >
                  <span className="text-charcoal">{tier}</span>
                  <span className="font-semibold text-navy">{dues}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-warm-gray">
              <Button variant="primary" size="sm" className="w-full justify-center" href="/join/">
                Join as Contractor →
              </Button>
            </div>
          </div>

          {/* Affiliate */}
          <div className="bg-white border border-warm-gray rounded-sm overflow-hidden">
            <div className="bg-navy px-6 py-4">
              <h3 className="font-display text-xl text-white">Affiliate Membership</h3>
              <p className="font-body text-sm text-white/75 mt-1">
                Suppliers, manufacturers, engineers, service providers
              </p>
            </div>
            <div className="px-6 py-8 flex flex-col items-center justify-center text-center gap-2">
              <div className="text-5xl font-display text-navy">$650</div>
              <div className="font-body text-sm text-slate">per year, flat rate</div>
              <ul className="mt-4 space-y-2 text-left w-full max-w-xs">
                {[
                  'Access to all contractor networking events',
                  'Exhibitor & sponsorship opportunities',
                  'Industry news & resource library',
                  'AGC national affiliate benefits',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 font-body text-sm text-charcoal">
                    <span className="text-red flex-shrink-0 mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 border-t border-warm-gray">
              <Button variant="primary" size="sm" className="w-full justify-center" href="/join/">
                Join as Affiliate →
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center font-body text-sm text-slate mt-6">
          * Dues are tax-deductible as a business expense. Need a custom quote?{' '}
          <a href="#dues-form" className="text-red underline hover:no-underline">
            Contact our membership team.
          </a>
        </p>
      </div>
    </section>
  )
}
