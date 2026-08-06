const SITE_HOSTS = new Set(['azagc.org', 'www.azagc.org'])

export type NormalizedSiteHref = {
  href: string
  isInternal: boolean
}

/** Rewrite http(s)://(www.)azagc.org URLs to same-origin paths; leave others unchanged. */
export function normalizeSiteHref(raw: string): NormalizedSiteHref {
  const href = raw.trim()
  if (!href) return { href, isInternal: false }

  if (href.startsWith('/') && !href.startsWith('//')) {
    return { href, isInternal: true }
  }

  try {
    const absolute = href.startsWith('//') ? `https:${href}` : href
    const url = new URL(absolute)
    if (!SITE_HOSTS.has(url.hostname.toLowerCase())) {
      return { href, isInternal: false }
    }
    const path = `${url.pathname}${url.search}${url.hash}`
    return { href: path || '/', isInternal: true }
  } catch {
    return { href, isInternal: false }
  }
}
