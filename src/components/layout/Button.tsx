import { cn } from "@/lib/utils";
import { normalizeSiteHref } from "@/lib/siteHref";
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
    if (!href) return null;
    return (
      <a
        href={href}
        rel="noopener noreferrer"
        className={cn(
          "relative z-10 inline-block min-h-11 cursor-pointer font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
          variantStyles[variant],
        )}
      >
        {button.label}
      </a>
    );
  } else if (button.btnType === "external") {
    const { href, isInternal } = normalizeSiteHref(button.link ?? "");
    if (!href) return null;
    if (isInternal) {
      return (
        <Link
          href={href}
          className={cn(
            "inline-block font-body font-semibold text-sm py-3 px-6 rounded-sm bg-[#ea0a2a] text-white no-underline transition-colors hover:bg-red-hover ",
            variantStyles[variant],
          )}
        >
          {button.label}
        </Link>
      );
    }
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
    const { href } = normalizeSiteHref(button.link ?? "");
    if (!href) return null;
    return (
      <Link
        href={href}
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
