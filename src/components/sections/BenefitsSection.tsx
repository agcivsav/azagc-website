import Image from 'next/image'
import { cn } from '@/lib/utils'

const BENEFITS = [
  {
    icon: '🏛️',
    title: 'Legislative Advocacy',
    description:
      'Our lobbyists work year-round at the Arizona Capitol to protect your business interests and advance the industry.',
  },
  {
    icon: '👷',
    title: 'Workforce Development',
    description:
      'DOL-approved apprenticeship programs, training, and pipeline programs to solve your workforce challenges.',
  },
  {
    icon: '🔗',
    title: 'Industry Networking',
    description:
      '50+ events per year — mixers, golf scrambles, awards galas, and committee meetings that build real relationships.',
  },
  {
    icon: '🛡️',
    title: 'Safety & Compliance',
    description:
      'Stay ahead of OSHA requirements with safety training, resources, and environmental compliance guidance.',
  },
]

interface BenefitsSectionProps {
  className?: string
}

export default function BenefitsSection({ className }: BenefitsSectionProps) {
  return (
    <section className={cn('bg-white py-[72px]', className)} id="benefits">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: benefit list */}
          <div>
            <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
              Why Members Stay
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy mb-3">
              Built to Support <em className="italic text-red">Your Business</em>
            </h2>
            <p className="font-body text-[0.95rem] text-light-slate max-w-[520px] leading-[1.6] mb-7">
              AZAGC isn&apos;t just an association — it&apos;s a competitive advantage for
              construction businesses operating in Arizona.
            </p>

            <div className="flex flex-col gap-2">
              {BENEFITS.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-3.5 rounded-[10px] transition-colors duration-200 hover:bg-cream"
                >
                  <div className="flex-shrink-0 w-[42px] h-[42px] bg-red/[0.12] rounded-[9px] grid place-items-center text-[1.15rem]">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-[0.92rem] text-navy mb-0.5">
                      {title}
                    </h4>
                    <p className="font-body text-[0.82rem] text-light-slate leading-[1.5]">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: teal testimonial panel */}
          <div className="rounded-2xl relative overflow-hidden min-h-[440px] flex flex-col items-center justify-center text-center">
            <Image
              src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=600&h=800&fit=crop"
              alt="Arizona highway construction"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
            {/* Teal overlay */}
            <div className="absolute inset-0 bg-teal/[0.88]" />

            {/* Content */}
            <div className="relative z-10 p-10 max-w-[400px]">
              <div className="font-display text-[4.5rem] text-gold/50 leading-none mb-[-12px]">
                &ldquo;
              </div>
              <blockquote className="text-white font-display text-[1.2rem] italic leading-[1.4] mb-4">
                AZAGC has been instrumental in helping our firm navigate regulatory challenges and
                build relationships that have directly led to new project opportunities.
              </blockquote>
              <cite className="not-italic text-gold text-[0.84rem] font-semibold">
                — AZAGC Member Contractor
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
