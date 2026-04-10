import Script from 'next/script'

/**
 * UserWay overlay (same pattern as sites like simplysalad.com).
 * Set `NEXT_PUBLIC_USERWAY_ACCOUNT` to your site ID from https://userway.org/
 */
export function UserWayAccessibility() {
  const account = process.env.NEXT_PUBLIC_USERWAY_ACCOUNT?.trim()
  if (!account) return null

  return (
    <Script
      id="userway-accessibility-widget"
      src="https://cdn.userway.org/widget.js"
      strategy="afterInteractive"
      data-account={account}
    />
  )
}
