import type { Metadata } from "next";
import Link from "next/link";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import EventsListSection from "@/components/sections/EventsListSection";
import { safeFetch } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Events Calendar | AZAGC",
  description:
    "Full AZAGC events calendar — filter by category, month, and year. Networking, training, and construction industry events.",
};

const EVENTS_QUERY = `*[_type == "agcEvent" && startDate >= $now] | order(startDate asc){
  title,
  "slug": slug.current,
  startDate,
  category
}`;

type EventItem = {
  title: string;
  slug: string;
  startDate: string;
  category?: string | null;
};

function getUtcMonth(dateString: string): number {
  return new Date(dateString).getUTCMonth() + 1;
}

function getUtcYear(dateString: string): number {
  return new Date(dateString).getUTCFullYear();
}

const MONTH_NAMES: Record<number, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export default async function EventsCalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; month?: string; year?: string }>;
}) {
  const params = await searchParams;
  const now = new Date().toISOString().slice(0, 10);
  const eventsList = await safeFetch<EventItem[]>(EVENTS_QUERY, { now });
  const events = Array.isArray(eventsList) ? eventsList : [];
  const categories = [
    ...new Set(
      events
        .map((e) => e.category?.trim())
        .filter((c): c is string => Boolean(c)),
    ),
  ].sort((a, b) => a.localeCompare(b));

  const filtered = events.filter((e) => {
    if (params.category && e.category !== params.category) return false;
    if (params.month && String(getUtcMonth(e.startDate)) !== params.month)
      return false;
    if (params.year && String(getUtcYear(e.startDate)) !== params.year)
      return false;
    return true;
  });
  const months = Array.from(
    new Set(events.map((e) => getUtcMonth(e.startDate))),
  ).sort((a, b) => a - b);
  const years = Array.from(
    new Set(events.map((e) => getUtcYear(e.startDate))),
  ).sort((a, b) => a - b);

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <Link
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/events"
            className="hover:text-navy transition-colors no-underline"
          >
            Events
          </Link>
          <span>/</span>
          <Link
            href="/events/events-calendar"
            className="hover:text-navy transition-colors no-underline"
          >
            Events Calendar
          </Link>
        </div>
      </div>

      <CTABandFromSanity />
      <EventsListSection
        events={events}
        filteredEvents={filtered}
        categories={categories}
        months={months.map((m) => ({
          value: String(m),
          label: MONTH_NAMES[m] ?? "",
        }))}
        years={years.map((y) => ({ value: String(y), label: String(y) }))}
        currentCategory={params.category ?? ""}
        currentMonth={params.month ?? ""}
        currentYear={params.year ?? ""}
      />
    </>
  );
}
