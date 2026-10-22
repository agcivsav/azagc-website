type TableRow = {
  _key?: string
  cells?: string[]
}

type ArticleTableSectionProps = {
  title?: string
  table?: {
    rows?: TableRow[]
  }
}

export function ArticleTableSection({ title, table }: ArticleTableSectionProps) {
  const rows = (table?.rows ?? []).filter((row) => (row.cells ?? []).length > 0)
  if (rows.length === 0) return null

  const [headerRow, ...bodyRows] = rows
  const hasHeader = (headerRow.cells ?? []).length > 1

  return (
    <section className="not-prose my-8">
      {title ? (
        <h2 className="font-normal text-xl text-navy mb-4">{title}</h2>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-warm-gray bg-white shadow-sm">
        <table className="min-w-full border-collapse font-body text-sm">
          {hasHeader ? (
            <thead className="bg-cream">
              <tr>
                {(headerRow.cells ?? []).map((cell, index) => (
                  <th
                    key={`${headerRow._key ?? 'head'}-${index}`}
                    scope="col"
                    className="px-4 py-3 text-left font-semibold uppercase tracking-wide text-slate"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {(hasHeader ? bodyRows : rows).map((row, rowIndex) => (
              <tr
                key={row._key || `row-${rowIndex}`}
                className="border-t border-warm-gray"
              >
                {(row.cells ?? []).map((cell, cellIndex) => (
                  <td
                    key={`${row._key || rowIndex}-${cellIndex}`}
                    className={`px-4 py-3 align-top text-slate ${
                      cellIndex === 0 ? 'font-semibold text-navy' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
