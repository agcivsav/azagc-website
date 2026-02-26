import Button from '@/components/ui/Button'

interface CTABandProps {
  headline?: string
  subtext?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export default function CTABand({
  headline = "Ready to Grow Your Construction Business?",
  subtext = 'Join 500+ Arizona contractors. Request a personalized membership overview — no commitment required.',
  primaryCta = { label: 'Become a Member', href: '/join/' },
  secondaryCta = { label: 'See Benefits', href: '/membership/benefits/' },
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
