import { cn } from '@/lib/utils'

export type StaffItem = {
  name: string
  title?: string | null
  company?: string | null
  role?: string | null
}

interface PageBuilderStaffListProps {
  heading: string
  items: StaffItem[]
  className?: string
}

export default function PageBuilderStaffList({
  heading,
  items,
  className,
}: PageBuilderStaffListProps) {
  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container-site max-w-3xl">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">
          {heading}
        </h2>
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((person, i) => (
              <li key={i} className="font-body text-slate text-base leading-relaxed border-b border-warm-gray/50 pb-4 last:border-0">
                <span className="font-semibold text-navy">{person.name}</span>
                {[person.title, person.company, person.role].filter(Boolean).length > 0 && (
                  <span className="text-slate">
                    {' — '}
                    {[person.title, person.company, person.role].filter(Boolean).join(' · ')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-body text-slate/70">No staff listed yet.</p>
        )}
      </div>
    </section>
  )
}
