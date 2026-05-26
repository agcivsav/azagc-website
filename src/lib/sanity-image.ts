/** Max content column width (~1180px) + padding; use in hero `sizes`. */
export const SITE_LAYOUT_MAX_PX = 1280

export const HERO_BACKGROUND_SIZES = `(max-width: ${SITE_LAYOUT_MAX_PX}px) 100vw, ${SITE_LAYOUT_MAX_PX}px`

/** Sanity CDN width for full-bleed hero backgrounds. */
export const HERO_BACKGROUND_WIDTH = 1920

export const CONTENT_IMAGE_MAX_WIDTH = 1200
export const CARD_IMAGE_MAX_WIDTH = 640
export const GALLERY_IMAGE_MAX_WIDTH = 1200
export const LOGO_IMAGE_MAX_WIDTH = 400

/** Apply Sanity CDN transforms so Next.js receives a reasonably sized source. */
export function optimizeSanityCdnUrl(url: string, width: number): string {
  try {
    const u = new URL(url)
    u.searchParams.set('w', String(width))
    u.searchParams.set('fit', 'max')
    u.searchParams.set('auto', 'format')
    return u.toString()
  } catch {
    return url
  }
}
