import Script from "next/script";

/**
 * Elfsight Accessibility | AZAGC Accessibility
 * https://elfsight.com/accessibility-widget/
 */
export function ElfsightAccessibility() {
  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      <div
        className="elfsight-app-5ab899c6-c63a-4c9f-935b-29aa48716e6f"
        data-elfsight-app-lazy
      />
    </>
  );
}
