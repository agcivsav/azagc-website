import Button from '@/components/ui/Button'

interface CTABandProps {
  headline?: string
  subtext?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export default function CTABand({
  headline = 'Ready to Join Arizona's Premier Agricultural Association?',
  subtext = 'Connect with industry leaders, shape legislation, and grow your business.',
  primaryCta = { label: 'Become a Member', href: '/join' },
  secondaryCta = { label: 'Learn More', href: '/membership' },
}: CTABandProps) {
  return (
    <section className="bg-red py-14">
      <div className="container-site flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-3xl text-white mb-2">{headline}</h2>
          <p className="font-body text-white/80 text-base max-w-xl">{subtext}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Button href={primaryCta.href} variant="dark">{primaryCta.label}</Button>
          <Button href={secondaryCta.href} variant="ghost">{secondaryCta.label}</Button>
        </div>
      </div>
    </section>
  )
}
