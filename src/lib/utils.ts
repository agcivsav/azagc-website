import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract UTM params from URL search string */
export function getUtmParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search)
  const utms: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const val = params.get(key)
    if (val) utms[key] = val
  }
  return utms
}

/** Format date for events */
export function formatEventDate(dateStr: string): { month: string; day: string; full: string } {
  const date = new Date(dateStr)
  return {
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate().toString(),
    full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  }
}

/** Format event date range and time for display (e.g. "03-18-2026 - 03-19-2026" and "7:00 am - 4:00 pm MST") */
export function formatEventDateRange(
  startStr: string,
  endStr: string | null
): { dateRange: string; timeRange: string } {
  const start = new Date(startStr)
  const end = endStr ? new Date(endStr) : null
  const toLocal = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`
  const toTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' })
  const dateRange = end && toLocal(end) !== toLocal(start) ? `${toLocal(start)} - ${toLocal(end)}` : toLocal(start)
  const timeRange = end ? `${toTime(start)} - ${toTime(end)}` : toTime(start)
  return { dateRange, timeRange }
}

/** Google Calendar "Add to calendar" URL */
export function googleCalendarUrl(
  title: string,
  startDate: string,
  endDate: string | null,
  details?: string,
  location?: string
): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 60 * 60 * 1000)
  const format = (d: Date) => d.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${format(start)}/${format(end)}`,
    ...(details && { details }),
    ...(location && { location }),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
