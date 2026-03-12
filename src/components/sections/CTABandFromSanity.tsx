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
  headline: '',
  subtext:
    '',
 
}

export default async function CTABandFromSanity() {
  const data = await safeFetch<CtaBandDoc>(CTA_BAND_QUERY)

  const headline = data?.headline?.trim() || DEFAULTS.headline
  const subtext = data?.subtext?.trim() || DEFAULTS.subtext
  const primaryCta = {
    label: data?.primaryCtaLabel?.trim() || "",
    href: data?.primaryCtaHref?.trim() || "",
  }
  const secondaryCta = {
    label: data?.secondaryCtaLabel?.trim() || "",
    href: data?.secondaryCtaHref?.trim() || "",
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
