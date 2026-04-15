import { cn } from "@/lib/utils";
import { IButton } from "@/types/common";
import Link from "next/link";
import React from "react";

const Button = ({
  button,
  variant = "primary",
}: {
  button: IButton;
  variant?: "primary" | "secondary" | "dark" | "ghost";
}) => {
  const variantStyles = {
    primary: "bg-[#ea0a2a] text-white hover:bg-red-hover",
    secondary: "bg-white text-navy hover:bg-navy-mid",
    dark: "bg-navy-deep text-white hover:bg-navy-mid",
    ghost:
      "border border-white/60 text-white hover:border-white hover:bg-white/10",
  };
  if (button.btnType === "upload") {
    const href = button.upload?.asset?.url?.trim();
    // #region agent log
    fetch("http://127.0.0.1:7306/ingest/5cef382e-0441-4b7e-ba50-8bf8014f1df0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "24ae0a",
      },
      body: JSON.stringify({
        sessionId: "24ae0a",
        runId: "post-fix",
        hypothesisId: "H6-anchor",
        location: "Button.tsx:upload",
        message: "Upload button href before render",
        data: {
          hasHref: Boolean(href && href.length > 0),
          hrefLength: href?.length ?? 0,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    if (!href) return null;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
          variantStyles[variant],
        )}
      >
        {button.label}
      </a>
    );
  } else if (button.btnType === "external") {
    return (
      <a
        href={button.link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
          variantStyles[variant],
        )}
      >
        {button.label}
      </a>
    );
  } else if (button.btnType === "none") {
    return (
      <button
        type="submit"
        className={cn(
          "inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
          variantStyles[variant],
        )}
      >
        {button.label}
      </button>
    );
  } else {
    return (
      <Link
        href={button.link}
        className={cn(
          "inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
          variantStyles[variant],
        )}
      >
        {button.label}
      </Link>
    );
  }
};

export default Button;
