"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

type Props = {
  memberId: string;
  logoUrl: string;
  businessName: string;
};

export default function MemberDirectoryLogo({
  memberId,
  logoUrl,
  businessName,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onLoadingComplete = useCallback(
    (img: HTMLImageElement) => {
      // #region agent log
      const wrap = wrapRef.current;
      let liOverflow = "n/a";
      let el: HTMLElement | null = img;
      for (let i = 0; i < 6 && el; i++) {
        if (el.tagName === "LI") {
          liOverflow = getComputedStyle(el).overflow;
          break;
        }
        el = el.parentElement;
      }
      fetch("http://127.0.0.1:7669/ingest/5cef382e-0441-4b7e-ba50-8bf8014f1df0", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "e99ff9",
        },
        body: JSON.stringify({
          sessionId: "e99ff9",
          runId: "post-fix",
          hypothesisId: "H2",
          location: "MemberDirectoryLogo.tsx:onLoadingComplete",
          message: "logo decoded vs displayed metrics",
          data: {
            memberId,
            naturalW: img.naturalWidth,
            naturalH: img.naturalHeight,
            clientW: img.clientWidth,
            clientH: img.clientHeight,
            wrapW: wrap?.clientWidth,
            wrapH: wrap?.clientHeight,
            liOverflow,
            imgObjectFit: getComputedStyle(img).objectFit,
            imgOverflow: getComputedStyle(img).overflow,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    },
    [memberId],
  );

  return (
    <div
      ref={wrapRef}
      className="w-full max-w-[240px] min-h-[3.5rem] flex items-center justify-start overflow-visible"
    >
      <Image
        src={logoUrl}
        alt={`${businessName} logo`}
        width={800}
        height={400}
        quality={90}
        className="h-auto w-auto max-h-32 md:max-h-36 max-w-full object-contain object-left overflow-visible"
        sizes="(max-width: 768px) min(85vw, 320px), 240px"
        onLoadingComplete={onLoadingComplete}
      />
    </div>
  );
}
