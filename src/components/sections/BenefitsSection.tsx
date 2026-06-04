'use client'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Users, Link2, Shield, Banknote } from 'lucide-react'

const BENEFIT_ICONS = [
  <Banknote key="advocacy" className="w-6 h-6 text-red" />,
  <Users key="workforce" className="w-6 h-6 text-red" />,
  <Link2 key="networking" className="w-6 h-6 text-red" />,
  <Shield key="safety" className="w-6 h-6 text-red" />,
]

type Benefit = {
  title: string
  description: string
}

interface BenefitsSectionProps {
  className?: string
  eyebrow?: string
  title?: string
  body?: string
  benefits?: Benefit[]
  quoteTitle?: string
  quoteDescription?: string
  quoteImage?: {
    url: string
    alt?: string
  }
}

export default function BenefitsSection({
  className,
  eyebrow,
  title,
  body,
  benefits,
  quoteTitle,
  quoteDescription,
  quoteImage,
}: BenefitsSectionProps) {

  if (!benefits || benefits.length === 0) return null

  return (
    <section className={cn('bg-white py-[72px]', className)} id="benefits">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            {eyebrow && (
              <p className="font-body text-[0.72rem] font-bold tracking-[0.1em] uppercase text-red mb-2">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="font-normal text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.02em] text-navy mb-3">
                {title}
              </h2>
            )}

            {body && (
              <p className="font-body text-[0.95rem] text-light-slate max-w-[520px] leading-[1.6] mb-7">
                {body}
              </p>
            )}

            <div className="flex flex-col gap-2">
              {benefits.map(({ title, description }, index) => {
                const icon = BENEFIT_ICONS[index] ?? BENEFIT_ICONS[0]

                return (
                  <div
                    key={title}
                    className="flex gap-4 p-3.5 rounded-[10px] transition-colors duration-200 hover:bg-cream"
                  >
                    <div className="flex-shrink-0 w-[42px] h-[42px] bg-red/[0.12] rounded-[9px] grid place-items-center">
                      {icon}
                    </div>

                    <div>
                      <h3 className="font-body font-semibold text-[0.92rem] text-navy mb-0.5">
                        {title}
                      </h3>

                      <p className="font-body text-[0.82rem] text-light-slate leading-[1.5]">
                        {description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Quote Block */}
          <div className="rounded-2xl relative overflow-hidden min-h-[440px] flex flex-col items-center justify-center text-center">

            {quoteImage?.url && (
              <Image
                src={quoteImage.url}
                alt={quoteImage.alt ?? 'Testimonial image'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}

            <div className="absolute inset-0 bg-navy/[0.88]" />

            <div className="relative z-10 p-10 max-w-[400px]">
              <div className="font-normal text-[4.5rem] text-red/50 leading-none mb-[-12px]">
                &ldquo;
              </div>

              {quoteDescription && (
                <blockquote className="text-white font-normal text-[1.2rem] italic leading-[1.4] mb-4">
                  {quoteDescription}
                </blockquote>
              )}

              {quoteTitle && (
                <cite className="not-italic text-primary text-[0.84rem] font-semibold">
                  — {quoteTitle}
                </cite>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}