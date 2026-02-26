import { cn } from '@/lib/utils'

interface Sponsor {
  name: string
  logoUrl?: string
  website?: string
}

interface SponsorLogosProps {
  sponsors?: Sponsor[]
  title?: string
  className?: string
}

const DEFAULT_SPONSORS: Sponsor[] = [
  { name: 'Sundt Construction', website: 'https://www.sundt.com' },
  { name: 'McCarthy Building Companies', website: 'https://www.mccarthy.com' },
  { name: 'Haydon Building Corp', website: 'https://www.haydon.com' },
  { name: 'Fann Contracting', website: 'https://www.fanncontracting.com' },
  { name: 'DBA Construction', website: 'https://www.dbaconstruction.com' },
  { name: 'Rummel Construction', website: '#' },
]

export default function SponsorLogos({
  sponsors = DEFAULT_SPONSORS,
  title = 'Pioneer Sponsors',
  className,
}: SponsorLogosProps) {
  return (
    <section className={cn('py-12 bg-cream', className)}>
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-slate text-center mb-8">
            {title}
          </p>
        )}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {sponsors.map(({ name, logoUrl, website }) => {
            const content = logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={name}
                className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ) : (
              <span className="font-body text-xs font-semibold text-slate hover:text-navy transition-colors text-center leading-tight">
                {name}
              </span>
            )

            return (
              <div key={name} className="flex items-center justify-center min-h-[48px]">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex items-center justify-center"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
