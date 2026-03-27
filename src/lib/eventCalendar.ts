/** Outlook on the web — compose a new event (works for Outlook.com / Microsoft account). */
export function outlookCalendarComposeUrl(
  title: string,
  startDate: string,
  endDate: string | null,
  body?: string,
): string {
  const start = new Date(startDate);
  const end = endDate
    ? new Date(endDate)
    : new Date(start.getTime() + 60 * 60 * 1000);
  const p = new URLSearchParams({
    rru: "addevent",
    subject: title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
  });
  if (body) p.set("body", body);
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p.toString()}`;
}

function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\n|\r/g, "\\n");
}

function formatIcsUtc(d: Date): string {
  return `${d.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

export function buildEventIcsString(opts: {
  uid: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  url?: string;
}): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AZAGC//Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${opts.uid}`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(opts.start)}`,
    `DTEND:${formatIcsUtc(opts.end)}`,
    `SUMMARY:${escapeIcsText(opts.title)}`,
  ];
  if (opts.description) {
    lines.push(`DESCRIPTION:${escapeIcsText(opts.description)}`);
  }
  if (opts.url) {
    lines.push(`URL:${opts.url.replace(/\\/g, "\\\\")}`);
  }
  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.join("\r\n");
}
