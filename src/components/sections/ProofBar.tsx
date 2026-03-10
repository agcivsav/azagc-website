import AnimatedCounter from '@/components/ui/AnimatedCounter'

export interface ProofStat {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface ProofBarProps {
  stats?: ProofStat[]
}

export default function ProofBar({ stats }: ProofBarProps) {

  if (!stats || stats.length === 0) return null

  return (
    <section className="bg-navy py-10 border-y border-white/10">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-normal text-4xl text-white mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <p className="font-body text-xs uppercase tracking-[0.12em] text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}