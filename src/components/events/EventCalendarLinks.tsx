import Link from "next/link";
import { CalendarPlus, Mail, Download } from "lucide-react";
import { cn, googleCalendarUrl } from "@/lib/utils";
import { outlookCalendarComposeUrl } from "@/lib/eventCalendar";

interface EventCalendarLinksProps {
  title: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  slug: string;
  className?: string;
}

const linkBase =
  "inline-flex h-12 w-12 items-center justify-center rounded-xl border border-warm-gray bg-white text-navy shadow-sm transition-all hover:border-gold hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function EventCalendarLinks({
  title,
  startDate,
  endDate,
  description,
  slug,
  className,
}: EventCalendarLinksProps) {
  const details = description ?? undefined;
  const googleHref = googleCalendarUrl(
    title,
    startDate,
    endDate ?? null,
    details,
  );
  const outlookHref = outlookCalendarComposeUrl(
    title,
    startDate,
    endDate ?? null,
    details,
  );
  const icsHref = `/api/events/${slug}/ics`;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4",
        className,
      )}
    >
      <p className="font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy shrink-0">
        Add to calendar
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className={linkBase}
          aria-label="Add this event to Google Calendar"
          title="Google Calendar"
        >
          <CalendarPlus className="h-6 w-6 text-[#4285F4]" strokeWidth={2} aria-hidden />
        </a>
        <a
          href={outlookHref}
          target="_blank"
          rel="noopener noreferrer"
          className={linkBase}
          aria-label="Add this event to Outlook on the web"
          title="Outlook"
        >
          <Mail className="h-6 w-6 text-[#0078D4]" strokeWidth={2} aria-hidden />
        </a>
        <Link
          href={icsHref}
          className={linkBase}
          aria-label="Download iCalendar file for Apple Calendar, Outlook desktop, and other apps"
          title="Download .ics (iCalendar)"
          prefetch={false}
        >
          <Download className="h-6 w-6 text-teal" strokeWidth={2} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
