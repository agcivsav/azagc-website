import { safeFetch } from '@/lib/sanity'
import CTABand from './CTABand'

const CTA_BAND_QUERY = `*[_type == "ctaBand"][0]{
  headline,
  subtext,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref
}`

type CtaBandDoc = {
  headline?: string | null
  subtext?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
}

const DEFAULTS = {
  headline: 'Ready to Grow Your Construction Business?',
  subtext:
    'Join 500+ Arizona contractors. Request a personalized membership overview — no commitment required.',
  primaryCta: { label: 'Become a Member', href: '/join/' },
  secondaryCta: { label: 'See Benefits', href: '/membership/benefits/' },
}

export default async function CTABandFromSanity() {
  const data = await safeFetch<CtaBandDoc>(CTA_BAND_QUERY)

  const headline = data?.headline?.trim() || DEFAULTS.headline
  const subtext = data?.subtext?.trim() || DEFAULTS.subtext
  const primaryCta = {
    label: data?.primaryCtaLabel?.trim() || DEFAULTS.primaryCta.label,
    href: data?.primaryCtaHref?.trim() || DEFAULTS.primaryCta.href,
  }
  const secondaryCta = {
    label: data?.secondaryCtaLabel?.trim() || DEFAULTS.secondaryCta.label,
    href: data?.secondaryCtaHref?.trim() || DEFAULTS.secondaryCta.href,
  }

  return (
    <CTABand
      headline={headline}
      subtext={subtext}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  )
}
