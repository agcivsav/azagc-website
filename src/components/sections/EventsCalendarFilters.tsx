"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface Option {
  value: string;
  label: string;
}

interface EventsCalendarFiltersProps {
  categories: string[];
  months: Option[];
  years: Option[];
  currentCategory: string;
  currentMonth: string;
  currentYear: string;
}

export default function EventsCalendarFilters({
  categories,
  months,
  years,
  currentCategory,
  currentMonth,
  currentYear,
}: EventsCalendarFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const hasFilters = currentCategory || currentMonth || currentYear;

  const pushFilters = useCallback(
    (patch: Partial<{ category: string; month: string; year: string }>) => {
      const category =
        patch.category !== undefined ? patch.category : currentCategory;
      const month = patch.month !== undefined ? patch.month : currentMonth;
      const year = patch.year !== undefined ? patch.year : currentYear;
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (month) params.set("month", month);
      if (year) params.set("year", year);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, currentCategory, currentMonth, currentYear],
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="sr-only">Filter events</h2>
      <div className="flex flex-wrap items-end gap-4">
        {categories.length > 0 && (
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">
              Category
            </span>
            <select
              value={currentCategory}
              onChange={(e) => pushFilters({ category: e.target.value })}
              className="min-w-[220px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
              aria-label="Filter by category"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">
            Month
          </span>
          <select
            value={currentMonth}
            onChange={(e) => pushFilters({ month: e.target.value })}
            className="min-w-[160px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
            aria-label="Filter by month"
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-slate">
            Year
          </span>
          <select
            value={currentYear}
            onChange={(e) => pushFilters({ year: e.target.value })}
            className="min-w-[120px] border border-warm-gray rounded px-3 py-2.5 font-body text-sm text-navy bg-white"
            aria-label="Filter by year"
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y.value} value={y.value}>
                {y.label}
              </option>
            ))}
          </select>
        </label>
        {hasFilters && (
          <Link
            href="/events/events-calendar"
            className="font-body font-semibold text-sm uppercase tracking-wide px-5 py-2.5 rounded bg-[#ea0a2a] text-white no-underline hover:bg-red-700 transition-colors inline-flex items-center self-end"
          >
            Clear filters
          </Link>
        )}
      </div>
    </div>
  );
}
