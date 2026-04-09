type FooterCopyrightLineProps = {
  copyright: string
  companyLinkLabel: string
  companyLinkUrl: string
}

export function FooterCopyrightLine({
  copyright,
  companyLinkLabel,
  companyLinkUrl,
}: FooterCopyrightLineProps) {
  const hasCopyright = Boolean(copyright)
  const hasLink = Boolean(companyLinkLabel && companyLinkUrl)
  if (!hasCopyright && !hasLink) return null

  return (
    <p className="font-body text-xs text-white/40 max-w-xl leading-relaxed">
      {hasCopyright ? <span>{copyright}</span> : null}
      {hasCopyright && hasLink ? ' ' : null}
      {hasLink ? (
        <a
          href={companyLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/55 underline decoration-white/25 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50"
        >
          {companyLinkLabel}
        </a>
      ) : null}
    </p>
  )
}
