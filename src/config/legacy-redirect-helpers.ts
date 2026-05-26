/** Legacy path → destination; adds trailing-slash variant when missing. */
export function legacy(source: string, destination: string) {
  const entries = [{ source, destination, permanent: true as const }]
  if (!source.endsWith('/') && !source.includes(':')) {
    entries.push({ source: `${source}/`, destination, permanent: true as const })
  }
  if (source.endsWith('/') && source.length > 1) {
    entries.push({ source: source.slice(0, -1), destination, permanent: true as const })
  }
  return entries
}

export const committeeNewTemplates: Array<[string, string]> = [
  ['employment-labor-affairs-new-template', 'employment-labor-affairs'],
  ['women-in-construction-new-template', 'women-in-construction'],
  [
    'azagc-arpa-asphalt-paving-and-technical-new-template',
    'azagc-arpa-asphalt-paving-and-technical',
  ],
  ['military-to-construction-new-template', 'military-to-construction'],
  ['utility-infrastructure-new-template', 'utility-infrastructure'],
  ['pavement-preservation-new-template', 'pavement-preservation'],
  ['apprenticeship-craft-training-new-template', 'apprenticeship-craft-training'],
  [
    'alternate-project-delivery-methods-apdm-new-template',
    'alternate-project-delivery-methods-apdm',
  ],
  [
    'arizona-construction-safety-council-new-template',
    'arizona-construction-safety-council',
  ],
  ['membership-new-template', 'membership'],
  ['valley-metro-joint-cooperative-new-template', 'valley-metro-joint-cooperative'],
  ['workforce-development-new-template', 'workforce-development'],
  [
    'prescott-yavapai-joint-cooperative-new-template',
    'prescott-yavapai-joint-cooperative',
  ],
  ['azagc-adot-joint-cooperative-new-template', 'azagc-adot-joint-cooperative'],
  [
    'environmental-professionals-council-new-template',
    'environmental-professionals-council',
  ],
  [
    'regional-partners-joint-cooperative-agc-atb-municipal-private-new-template',
    'regional-partners-joint-cooperative-agc-atb-municipal-private',
  ],
  ['duplicated-affiliate-affairs-5789', 'affiliate-affairs'],
]

export const legacyCommitteeSlugs = [
  'affiliate-affairs',
  'military-to-construction',
  'prescott-yavapai-joint-cooperative',
  'pavement-preservation',
  'azagc-arpa-asphalt-paving-and-technical',
  'utility-infrastructure',
  'alternate-project-delivery-methods-apdm',
  'city-of-phoenix-joint-cooperative',
]

export const committeeRedirects = [
  ...committeeNewTemplates.flatMap(([from, to]) =>
    legacy(`/about/committees/${from}`, `/about/committees/${to}`),
  ),
  ...legacyCommitteeSlugs.flatMap((slug) =>
    legacy(`/${slug}`, `/about/committees/${slug}`),
  ),
]
