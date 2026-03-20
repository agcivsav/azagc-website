import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

const isSanityConfigured = projectId && projectId !== 'REPLACE_WITH_PROJECT_ID'

// #region agent log
function debugLog(msg: string, data: Record<string, unknown>) {
  const payload = {
    sessionId: 'ffe859',
    location: 'sanity.ts',
    message: msg,
    data,
    timestamp: Date.now(),
  }
  fetch('http://127.0.0.1:7689/ingest/dd476711-20e1-47cb-ad77-c1e839861eba', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ffe859' },
    body: JSON.stringify(payload),
  }).catch(() => { })
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      const fs = require('fs')
      const path = require('path')
      const logPath = path.join(process.cwd(), 'debug-ffe859.log')
      fs.appendFileSync(logPath, JSON.stringify(payload) + '\n')
    } catch {
      /* ignore */
    }
  }
}
// #endregion

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
})

// #region agent log
if (typeof window === 'undefined') {
  debugLog('Sanity init', {
    hypothesisId: 'H1',
    projectId: projectId ?? '(undefined)',
    dataset,
    isSanityConfigured,
    hasToken: !!process.env.SANITY_API_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  })
}
// #endregion

/** Safe fetch — returns null instead of throwing when Sanity is not configured */
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  // #region agent log
  debugLog('safeFetch entry', {
    hypothesisId: 'H1',
    isSanityConfigured,
    queryPreview: query.slice(0, 60),
  })
  // #endregion
  if (!isSanityConfigured) return null
  try {
    const result = await client.fetch<T>(query, params ?? {}, { next: { revalidate: 3600 } })
    // #region agent log
    debugLog('safeFetch success', {
      hypothesisId: 'H3',
      resultType: result === null ? 'null' : typeof result,
      resultKeys: result && typeof result === 'object' ? Object.keys(result).slice(0, 5) : null,
    })
    // #endregion
    return result
  } catch (err) {
    // #region agent log
    debugLog('safeFetch error', {
      hypothesisId: 'H3',
      errorName: err instanceof Error ? err.name : 'unknown',
      errorMessage: err instanceof Error ? err.message : String(err),
    })
    // #endregion
    return null
  }
}

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Revalidation helper for ISR
export const revalidate = 3600 // 1 hour
