'use client'

import Link from 'next/link'

interface Option {
  value: string
  label: string
}

interface EventsCalendarFiltersProps {
  categories: string[]
  months: Option[]
  years: Option[]
  currentCategory: string
  currentMonth: string
  currentYear: string
}

export default function EventsCalendarFilters({
  categories,
  months,
  years,
  currentCategory,
  currentMonth,
  currentYear,
}: EventsCalendarFiltersProps) {
  const hasFilters = currentCategory || currentMonth || currentYear

  return (
    <div className="flex flex-col gap-6">
      <h2 className="sr-only">Filter events</h2>
      <form method="get" action="/events/events-calendar" className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">Category</span>
          <select
            name="category"
            defaultValue={currentCategory}
            className="min-w-[180px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
            aria-label="Filter by category"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">Month</span>
          <select
            name="month"
            defaultValue={currentMonth}
            className="min-w-[160px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
            aria-label="Filter by month"
          >
            <option value="">Select month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">Year</span>
          <select
            name="year"
            defaultValue={currentYear}
            className="min-w-[120px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
            aria-label="Filter by year"
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y.value} value={y.value}>
                {y.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            className="font-body font-semibold text-sm uppercase tracking-wide px-5 py-2.5 rounded bg-navy text-white border-0 cursor-pointer hover:bg-navy/90 transition-colors"
          >
            Apply
          </button>
          {hasFilters && (
            <Link
              href="/events/events-calendar"
              className="font-body font-semibold text-sm uppercase tracking-wide px-5 py-2.5 rounded bg-[#ea0a2a] text-white no-underline hover:bg-red-700 transition-colors inline-flex items-center"
            >
              Clear filters
            </Link>
          )}
        </div>
      </form>
    </div>
  )
}
