import { createClient } from 'next-sanity'
import {createImageUrlBuilder} from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

const isSanityConfigured = projectId && projectId !== 'REPLACE_WITH_PROJECT_ID'

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
})

/** Safe fetch — returns null instead of throwing when Sanity is not configured */
export async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  /** Next.js route cache; default 3600. Use a lower value for pages that must reflect CMS updates quickly on production. */
  revalidateSeconds?: number,
): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    const revalidate = revalidateSeconds ?? 3600
    return await client.fetch<T>(query, params ?? {}, { next: { revalidate } })
  } catch {
    return null
  }
}

// Image URL builder
const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/** Image object shape after GROQ `asset->{ url, _id }` (or reference-only). */
export type SanityImageField = {
  _type?: string
  crop?: unknown
  hotspot?: unknown
  asset?: {
    _ref?: string
    _id?: string
    url?: string | null
  } | null
} | null

/**
 * Resolve a usable CDN URL for next/image. Prefer API-provided `asset.url` so the path
 * always matches the asset's real project/dataset (avoids broken images when env mismatches urlFor).
 */
export function sanityImageUrl(image: SanityImageField | undefined, width: number): string | undefined {
  if (!image?.asset) return undefined

  const direct = image.asset.url
  if (typeof direct === 'string' && direct.length > 0) {
    try {
      const u = new URL(direct)
      if (!u.searchParams.has('w')) u.searchParams.set('w', String(width))
      u.searchParams.set('fit', 'max')
      u.searchParams.set('auto', 'format')
      return u.toString()
    } catch {
      /* fall through to urlFor */
    }
  }

  try {
    return urlFor(image).width(width).fit('max').auto('format').url()
  } catch {
    return undefined
  }
}

// Revalidation helper for ISR
export const revalidate = 3600 // 1 hour
