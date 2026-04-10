/** Hostnames allowed for iframe map embeds (must match Sanity `contactPage.mapEmbedUrl` validation). */
export function isTrustedMapEmbedUrl(url: string): boolean {
  try {
    const u = new URL(url.trim())
    if (u.protocol !== 'https:') return false
    const host = u.hostname.replace(/^www\./, '')
    return (
      host === 'google.com' ||
      host.endsWith('.google.com') ||
      host === 'maps.google.com' ||
      host === 'openstreetmap.org' ||
      host.endsWith('.openstreetmap.org')
    )
  } catch {
    return false
  }
}
