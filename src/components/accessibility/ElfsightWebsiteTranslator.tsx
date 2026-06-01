import Script from "next/script";

/**
 * Elfsight Website Translator | Translate Website
 * https://elfsight.com/website-translator-widget/
 */
export function ElfsightWebsiteTranslator() {
  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      <div
        className="elfsight-app-c7ed3026-e198-4d16-abd2-affcba3ce55d"
        data-elfsight-app-lazy
      />
    </>
  );
}
