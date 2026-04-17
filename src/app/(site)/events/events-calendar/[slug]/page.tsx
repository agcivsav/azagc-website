import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PortableTextBlock } from "@portabletext/types";
import { safeFetch } from "@/lib/sanity";
import { EventJsonLd } from "@/components/seo/JsonLd";
import { formatEventDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import PortableText from "@/components/ui/PortableText";
import { EventCalendarLinks } from "@/components/events/EventCalendarLinks";

const EVENT_TYPE = "agcEvent";

const EVENT_QUERY = `*[_type == "${EVENT_TYPE}" && slug.current == $slug][0]{
  title,
  slug,
  startDate,
  endDate,
  timezone,
  excerpt,
  "body": body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  registrationUrl
}`;

export async function generateStaticParams() {
  try {
    const rows =
      (await (
        await import("@/lib/sanity")
      ).safeFetch<Array<{ slug: string }>>(
        `*[_type == "${EVENT_TYPE}" && defined(slug.current)]{ "slug": slug.current }`,
      )) || [];
    return rows.map((r) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  startDate: string;
  endDate?: string;
  timezone?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  registrationUrl?: string;
}

async function getEvent(slug: string): Promise<Event | null> {
  return safeFetch<Event | null>(EVENT_QUERY, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description:
      event.excerpt ||
      `${event.title} — Arizona Chapter Associated General Contractors of America.`,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const tz = event.timezone || "America/Phoenix";
  const date = formatEventDate(event.startDate, tz);

  return (
    <>
      <EventJsonLd
        name={event.title}
        startDate={event.startDate}
        endDate={event.endDate}
        description={event.excerpt}
        url={`https://azagc.org/events/events-calendar/${slug}`}
      />

      <section className="bg-navy py-16">
        <div className="container-site">
          <div className="flex items-start gap-6">
            <div className="bg-teal px-5 py-4 text-center shrink-0 min-w-[72px]">
              <div className="font-body font-bold text-xs uppercase tracking-wide text-gold">
                {date.month}
              </div>
              <div className="font-normal text-3xl text-white">{date.day}</div>
            </div>
            <div>
              <h1 className="font-normal text-3xl sm:text-4xl text-white mb-3">
                {event.title}
              </h1>
              <p className="font-body text-white/70 text-sm">
                {date.full}
                {tz ? (
                  <span className="text-white/50">
                    {" "}
                    · {tz.replace(/_/g, " ")}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container-site grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {event.body && event.body.length > 0 && (
              <div className="font-body text-slate leading-relaxed prose prose-slate max-w-none">
                <PortableText value={event.body} />
              </div>
            )}
            <EventCalendarLinks
              title={event.title}
              startDate={event.startDate}
              endDate={event.endDate}
              description={event.excerpt}
              slug={slug}
              className="pt-1"
            />
          </div>
          <div className="space-y-4">
            {event.registrationUrl && (
              <div className="bg-white border border-warm-gray p-6">
                <h2 className="font-normal text-lg text-navy mb-3">
                  Register for this event
                </h2>
                <Button
                  href={event.registrationUrl}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Register now →
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
