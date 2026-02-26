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
