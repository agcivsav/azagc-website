import { NextResponse } from "next/server";
import { safeFetch } from "@/lib/sanity";
import { buildEventIcsString } from "@/lib/eventCalendar";

const EVENT_ICS_QUERY = `*[_type == "agcEvent" && slug.current == $slug][0]{
  title,
  startDate,
  endDate,
  excerpt,
  "slug": slug.current
}`;

type EventIcs = {
  title: string;
  startDate: string;
  endDate?: string | null;
  excerpt?: string | null;
  slug: { current: string };
} | null;

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const event = await safeFetch<EventIcs>(EVENT_ICS_QUERY, { slug });
  if (!event?.title || !event.startDate) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const start = new Date(event.startDate);
  const end = event.endDate
    ? new Date(event.endDate)
    : new Date(start.getTime() + 60 * 60 * 1000);

  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://azagc.org";
  const eventUrl = `${site}/events/events-calendar/${slug}`;

  const ics = buildEventIcsString({
    uid: `${slug}-${start.getTime()}@azagc.org`,
    title: event.title,
    start,
    end,
    description: event.excerpt ?? undefined,
    url: eventUrl,
  });

  const safeName = slug.replace(/[^a-zA-Z0-9-_]/g, "-") || "event";

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeName}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
