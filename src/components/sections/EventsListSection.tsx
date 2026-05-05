import Link from "next/link";
import { cn } from "@/lib/utils";
import EventsCalendarFilters from "@/components/sections/EventsCalendarFilters";

export type EventsListEvent = {
  title: string;
  slug: string;
  startDate: string;
  category?: string | null;
};

interface EventsListSectionProps {
  events: EventsListEvent[];
  filteredEvents: EventsListEvent[];
  categories: string[];
  months: { value: string; label: string }[];
  years: { value: string; label: string }[];
  currentCategory: string;
  currentMonth: string;
  currentYear: string;
  heading?: string | null;
  className?: string;
}

function formatListDate(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${mm}-${dd}-${yyyy}`;
}

export default function EventsListSection({
  events,
  filteredEvents,
  categories,
  months,
  years,
  currentCategory,
  currentMonth,
  currentYear,
  heading,
  className,
}: EventsListSectionProps) {
  return (
    <section className={cn("bg-white py-10 md:py-14", className)}>
      <div className="container-site">
        {heading && (
          <h2 className="font-normal text-2xl text-navy mb-6">{heading}</h2>
        )}
        <EventsCalendarFilters
          categories={categories}
          months={months}
          years={years}
          currentCategory={currentCategory}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
        <div className="mt-10 border-t border-warm-gray pt-8">
          {filteredEvents.length === 0 ? (
            <p className="font-body text-slate">
              No upcoming events match your filters.
            </p>
          ) : (
            <ul className="space-y-4">
              {filteredEvents.map((event) => (
                <li
                  key={event.slug}
                  className="flex flex-wrap items-baseline gap-2 font-body"
                >
                  <time
                    className="text-slate shrink-0"
                    dateTime={event.startDate}
                  >
                    {formatListDate(event.startDate)}
                  </time>
                  <span className="text-slate">:</span>
                  <Link
                    href={`/events/events-calendar/${event.slug}`}
                    className="text-red underline hover:text-navy transition-colors"
                  >
                    {event.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
