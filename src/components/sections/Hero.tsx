import Image from 'next/image'
import Button from '@/components/ui/Button'
import LeadForm from '@/components/forms/LeadForm'

export default function Hero() {
  return (
    <section className="relative bg-[#111828] overflow-hidden" style={{ padding: '56px 0 64px' }}>
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&h=900&fit=crop"
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
            <div className="inline-flex items-center gap-2 bg-[rgba(212,155,44,0.1)] border border-[rgba(212,155,44,0.2)] text-[#D49B2C] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-3.5 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-[#D49B2C] rounded-full" />
              Arizona AGC Chapter
            </div>

            <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.4rem)] leading-[1.06] tracking-[-0.025em] text-white mb-5">
              Building Arizona&apos;s Future,{' '}
              <em className="italic text-[#D49B2C]">Together</em>
            </h1>

            <p className="font-body text-[1.02rem] text-white/60 leading-[1.65] max-w-[480px] mb-7">
              Join 500+ contractors, suppliers, and service providers who rely on AZAGC for
              advocacy, workforce development, and the relationships that power Arizona&apos;s
              construction industry.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Button href="/join/" variant="primary" size="lg">
                Become a Member
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Button>
              <Button href="/membership/benefits/" variant="ghost" size="lg">
                See Benefits
              </Button>
            </div>
          </div>

          {/* Right: form card */}
          <div className="bg-white rounded-[14px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22),0_0_0_1px_rgba(200,70,42,0.05)]">
            <LeadForm
              source="hero-form"
              headline="Request Membership Info"
              subheadline="Get a personalized benefits overview for your business."
              submitLabel="Get My Benefits Overview →"
              variant="card"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
