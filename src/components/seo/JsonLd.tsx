interface OrganizationJsonLdProps {
  name?: string
  url?: string
  logo?: string
  sameAs?: string[]
  phone?: string
  email?: string
}

export function OrganizationJsonLd({
  name = 'Arizona Chapter Associated General Contractors of America',
  url = 'https://www.azagc.org',
  logo = 'https://www.azagc.org/logo.png',
  sameAs = [],
  phone = '+1-602-252-3926',
  email,
}: OrganizationJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    alternateName: 'AZAGC',
    url,
    logo,
    foundingDate: '1934',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1825 W. Adams St.',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      postalCode: '85007',
      addressCountry: 'US',
    },
    sameAs,
    ...(phone && { telephone: phone }),
    ...(email && { email }),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AZAGC',
    url: 'https://www.azagc.org',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.azagc.org/news-media/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface BreadcrumbItem { name: string; url: string }
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface EventJsonLdProps {
  name: string
  startDate: string
  endDate?: string
  location?: string
  description?: string
  url?: string
  image?: string
}
export function EventJsonLd({ name, startDate, endDate, location, description, url, image }: EventJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    ...(endDate && { endDate }),
    ...(description && { description }),
    ...(url && { url }),
    ...(image && { image }),
    ...(location && { location: { '@type': 'Place', name: location } }),
    organizer: { '@type': 'Organization', name: 'AZAGC', url: 'https://www.azagc.org' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

interface ArticleJsonLdProps {
  headline: string
  datePublished: string
  url: string
  image?: string
  authorName?: string
}
export function ArticleJsonLd({ headline, datePublished, url, image, authorName }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    url,
    ...(image && { image }),
    author: { '@type': 'Organization', name: authorName || 'AZAGC' },
    publisher: { '@type': 'Organization', name: 'AZAGC', url: 'https://www.azagc.org' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
