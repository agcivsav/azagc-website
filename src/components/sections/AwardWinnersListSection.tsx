import { cn } from '@/lib/utils'

export type AwardWinnerEntry = {
  companyName: string
  details?: string | null
}

interface AwardWinnersListSectionProps {
  heading: string
  items: AwardWinnerEntry[]
  className?: string
}

function splitDetails(details: string | null | undefined): string[] {
  if (!details || !details.trim()) return []
  return details
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export default function AwardWinnersListSection({
  heading,
  items,
  className,
}: AwardWinnersListSectionProps) {
  const list = items.filter((i) => i?.companyName?.trim())
  if (list.length === 0) return null

  const cols = 3
  const perCol = Math.ceil(list.length / cols)
  const columns: AwardWinnerEntry[][] = []
  for (let c = 0; c < cols; c++) {
    columns.push(list.slice(c * perCol, (c + 1) * perCol))
  }

  return (
    <section className={cn('bg-white py-12 md:py-16', className)}>
      <div className="container-site">
        <h2 className="font-normal text-2xl md:text-3xl text-navy mb-8">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {col.map((entry, i) => {
                const lines = splitDetails(entry.details)
                return (
                  <div key={i} className="border-b border-warm-gray/50 pb-6 last:border-0">
                    <h3 className="font-semibold text-navy text-base leading-tight">
                      {entry.companyName}
                    </h3>
                    {lines.length > 0 && (
                      <div className="font-body text-slate text-sm mt-2 space-y-1">
                        {lines.map((line, j) => (
                          <p key={j} className="leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
