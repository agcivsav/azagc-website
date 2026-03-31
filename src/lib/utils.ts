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

/** Format date for events (optional IANA `timeZone` for wall-clock display). */
export function formatEventDate(
  dateStr: string,
  timeZone?: string,
): { month: string; day: string; full: string } {
  const date = new Date(dateStr)
  const tz = timeZone || undefined
  return {
    month: date.toLocaleString("en-US", { month: "short", timeZone: tz }).toUpperCase(),
    day: date.toLocaleString("en-US", { day: "numeric", timeZone: tz }),
    full: date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: tz,
    }),
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

// Utility for generating and persisting a device id for idempotency

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .map((v) => v.split("="))
    .find(([k]) => k === name);
  return match ? decodeURIComponent(match[1]) : null;
}

interface CookieOptions {
  path?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

function setCookie(
  name: string,
  value: string,
  opts: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${opts.path || "/"}`,
    `Max-Age=${opts.maxAge || 60 * 60 * 24 * 365}`,
  ];
  if (opts.secure) parts.push("Secure");
  if (opts.sameSite) parts.push(`SameSite=${opts.sameSite}`);
  document.cookie = parts.join("; ");
}

/**
 * Gets or creates an app device ID for the given form name
 * Uses synchronous ID generation to avoid Promise issues
 */
export function getAppDeviceId(formName: string): string | null {
  if (typeof document === "undefined") return null;

  let appDeviceId = getCookie(formName);
  if (!appDeviceId) {
    // Generate a unique ID synchronously using timestamp and random values
    appDeviceId = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${Math.random().toString(36).slice(2)}`;

    setCookie(formName, appDeviceId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
  }
  return appDeviceId;
}

/**
 * Read existing id without creating; returns null if missing
 */
export function readAppDeviceId(formName: string): string | null {
  if (typeof document === "undefined") return null;
  return getCookie(formName);
}

/**
 * Delete the device ID cookie for the given form name
 */
export function deleteAppDeviceId(formName: string): void {
  if (typeof document === "undefined") return;
  // Delete cookie by setting Max-Age=0
  document.cookie = `${formName}=; Max-Age=0; Path=/`;
}
