import Script from "next/script";

const ACCESSIBILITY_APP_ID = "5ab899c6-c63a-4c9f-935b-29aa48716e6f";
const TRANSLATOR_APP_ID = "c7ed3026-e198-4d16-abd2-affcba3ce55d";

/**
 * Shared Elfsight mount points — platform.js loads once; CSS in globals.css
 * pins each widget off-document so they cannot bleed into page layout.
 */
export function ElfsightWidgets() {
  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
      />
      <div
        className={`elfsight-app-${ACCESSIBILITY_APP_ID} elfsight-mount elfsight-mount--accessibility`}
        data-elfsight-app-lazy
      />
      <div
        className={`elfsight-app-${TRANSLATOR_APP_ID} elfsight-mount elfsight-mount--translator`}
        data-elfsight-app-lazy
      />
    </>
  );
}
