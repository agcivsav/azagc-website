/** Strip characters that break GROQ `match` glob patterns. */
const GLOB_UNSAFE = /[*?"\\]/g

/**
 * Normalized news search string for Sanity `match`, or null if search should be ignored.
 * Requires at least 2 characters; caps length to avoid abuse.
 */
export function sanitizeNewsSearchQuery(raw: string | undefined | null): string | null {
  let t = (raw ?? '').trim().replace(GLOB_UNSAFE, ' ').replace(/\s+/g, ' ')
  if (t.length < 2) return null
  if (t.length > 80) t = t.slice(0, 80).trim()
  return t || null
}

/** GROQ glob: substring match (case-sensitive in standard GROQ). */
export function newsSearchGlobPattern(q: string): string {
  return `*${q.replace(/\*/g, '')}*`
}
