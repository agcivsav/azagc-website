import type { Metadata } from "next";
import Link from "next/link";
import CTABandFromSanity from "@/components/sections/CTABandFromSanity";
import PageBuilderHero from "@/components/sections/PageBuilderHero";
import PageBuilderTextBlock from "@/components/sections/SimpleContent";
import EventsListSection from "@/components/sections/EventsListSection";
import { safeFetch, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Events Calendar | AZAGC",
  description:
    "Full AZAGC events calendar — filter by category, month, and year. Networking, training, and construction industry events.",
};

const PAGE_QUERY = `*[_type == "eventsCalendarPage"][0]{
  sections[]{ _type, _key, title, subtitle, backgroundImage, heading, body, ctaLabel, ctaHref }
}`;
const EVENTS_QUERY = `*[_type == "event" && startDate >= $now] | order(startDate asc){ title, "slug": slug.current, startDate, category }`;

type Section =
  | {
      _type: "hero";
      _key?: string;
      title?: string | null;
      subtitle?: string | null;
      backgroundImage?: unknown;
    }
  | {
      _type: "pageBuilderTextBlock";
      _key?: string;
      heading?: string | null;
      body?: string | null;
      ctaLabel?: string | null;
      ctaHref?: string | null;
    }
  | { _type: "pageBuilderEventsList"; _key?: string; heading?: string | null };

type EventItem = {
  title: string;
  slug: string;
  startDate: string;
  category: string | null;
};

function buildImageUrl(image: unknown): string | null {
  if (!image || typeof image !== "object") return null;
  try {
    const url = urlFor(image).width(1200).height(800).fit("crop").url();
    return typeof url === "string" && url.startsWith("http") ? url : null;
  } catch {
    return null;
  }
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
  const [pageData, eventsList] = await Promise.all([
    safeFetch<{ sections?: Section[] | null }>(PAGE_QUERY),
    safeFetch<EventItem[]>(EVENTS_QUERY, { now }),
  ]);
  const sections = pageData?.sections ?? [];
  const events = Array.isArray(eventsList) ? eventsList : [];
  const filtered = events.filter((e) => {
    if (params.category && e.category !== params.category) return false;
    if (
      params.month &&
      String(new Date(e.startDate).getMonth() + 1) !== params.month
    )
      return false;
    if (
      params.year &&
      String(new Date(e.startDate).getFullYear()) !== params.year
    )
      return false;
    return true;
  });
  const categories = Array.from(
    new Set(events.map((e) => e.category).filter(Boolean)),
  ) as string[];
  const months = Array.from(
    new Set(events.map((e) => new Date(e.startDate).getMonth() + 1)),
  ).sort((a, b) => a - b);
  const years = Array.from(
    new Set(events.map((e) => new Date(e.startDate).getFullYear())),
  ).sort((a, b) => a - b);

  return (
    <>
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a
            href="/"
            className="hover:text-navy transition-colors no-underline"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/events"
            className="hover:text-navy transition-colors no-underline"
          >
            Events
          </a>
          <span>/</span>
          <Link
            href="/events/events-calendar"
            className="hover:text-navy transition-colors no-underline"
          >
            Events Calendar
          </Link>
        </div>
      </div>

      {sections.length === 0 ? (
        <>
          <section className="bg-navy py-16">
            <div className="container-site">
              <h1 className="font-normal text-4xl md:text-5xl text-white">
                Events Calendar
              </h1>
              <p className="font-body text-white/80 mt-3 max-w-2xl">
                Full AZAGC events calendar — filter by category, date, and
                membership type.
              </p>
            </div>
          </section>
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
      ) : (
        sections.map((section, i) => {
          const key = section._key ?? `${section._type}-${i}`;
          if (section._type === "hero") {
            return (
              <PageBuilderHero
                key={key}
                title={section.title ?? ""}
                subtitle={section.subtitle ?? null}
                backgroundImageUrl={buildImageUrl(section.backgroundImage)}
              />
            );
          }
          if (section._type === "pageBuilderTextBlock") {
            return (
              <PageBuilderTextBlock
                key={key}
                heading={section.heading ?? ""}
                body={section.body ?? null}
                ctaLabel={section.ctaLabel ?? null}
                ctaHref={section.ctaHref ?? null}
              />
            );
          }
          if (section._type === "pageBuilderEventsList") {
            return (
              <EventsListSection
                key={key}
                events={events}
                filteredEvents={filtered}
                categories={categories}
                months={months.map((m) => ({
                  value: String(m),
                  label: MONTH_NAMES[m] ?? "",
                }))}
                years={years.map((y) => ({
                  value: String(y),
                  label: String(y),
                }))}
                currentCategory={params.category ?? ""}
                currentMonth={params.month ?? ""}
                currentYear={params.year ?? ""}
                heading={section.heading ?? null}
              />
            );
          }
          return null;
        })
      )}

      <CTABandFromSanity />
    </>
  );
}
