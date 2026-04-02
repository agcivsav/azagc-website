import Image from 'next/image'
import Button from '@/components/ui/Button'
import LeadForm from '@/components/forms/LeadForm'

interface HeroProps {
  title?: string
  subtitle?: string
   description?: string
  backgroundImageUrl?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export default function Hero({
  title,
  subtitle,
  description,
  backgroundImageUrl,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) {
  const resolvedTitle =
    title ??
    ", " +
      '' // keep JSX-compatible string, em remains below
  const resolvedSubtitle =
    subtitle ??
    ""
  const resolvedPrimaryCtaLabel = primaryCtaLabel ?? ''
  const resolvedPrimaryCtaHref = primaryCtaHref ?? '/join/'
  const resolvedSecondaryCtaLabel = secondaryCtaLabel ?? 'See Benefits'
  const resolvedSecondaryCtaHref = secondaryCtaHref ?? '/membership/benefits/'
  const resolvedDescription = description
  const resolvedBackgroundImageUrl =
    backgroundImageUrl ??
    ''
  return (
    <section className="relative bg-[#111828] overflow-hidden" style={{ padding: '56px 0 64px' }}>
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={resolvedBackgroundImageUrl}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(200,70,42,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 10% 80%, rgba(27,77,92,0.15) 0%, transparent 50%)',
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="max-w-[1180px] mx-auto px-6 relative z-[2]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(212,155,44,0.1)] border border-[rgba(212,155,44,0.2)] text-[#ea0a2a] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#ea0a2a] rounded-full" />
   {resolvedSubtitle}            </div>

            <h1 className="font-normal text-[clamp(2.4rem,4.5vw,3.4rem)] leading-[1.06] tracking-[-0.025em] text-white mb-5">
              {resolvedTitle}{' '}
              {/* <em className="italic text-[#ea0a2a]">Together</em> */}
            </h1>

            <p className="font-body text-[1.02rem] text-white/60 leading-[1.65] max-w-[480px] mb-7">
           {resolvedDescription}
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Button href={resolvedPrimaryCtaHref} className="bg-[#ea0a2a]" size="lg">
                {resolvedPrimaryCtaLabel}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              {/* <Button href={resolvedSecondaryCtaHref} variant="ghost" size="lg">
                {resolvedSecondaryCtaLabel}
              </Button> */}
            </div>
          </div>

          {/* Right: form card */}
          <div className="bg-navy  p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22),0_0_0_1px_rgba(200,70,42,0.05)]">
            <LeadForm
              source="hero-form"
              headline="Request Membership Info"
              subheadline="Get a personalized benefits overview for your business."
              submitLabel="Get My Benefits Overview →"
              variant="card"
               dark={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
