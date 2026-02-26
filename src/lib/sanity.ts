import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
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
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch<T>(query, params ?? {}, { next: { revalidate: 3600 } })
  } catch {
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
