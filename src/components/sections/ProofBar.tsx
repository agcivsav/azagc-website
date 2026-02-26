import AnimatedCounter from '@/components/ui/AnimatedCounter'

const STATS = [
  { value: 500, suffix: '+', label: 'Member Companies' },
  { value: 40, suffix: '+', label: 'Years Advocating' },
  { value: 25000, suffix: '+', label: 'Workforce Trained' },
  { value: 12, suffix: 'B', prefix: '$', label: 'Industry Economic Impact' },
]

export default function ProofBar() {
  return (
    <section className="bg-navy py-10 border-y border-white/10">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl text-white mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <p className="font-body text-xs uppercase tracking-[0.12em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
