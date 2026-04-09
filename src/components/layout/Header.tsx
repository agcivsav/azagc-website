"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Logo from "../../../public/logo-svg.svg";
import type { HeaderNavigationItem } from "@/lib/queries/siteSettings";

type HeaderProps = {
  logoUrl?: string | null;
  logoAlt?: string | null;
  navigationItems?: HeaderNavigationItem[] | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
};

export default function Header({
  logoUrl,
  logoAlt,
  navigationItems,
  primaryCtaLabel,
  primaryCtaHref,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = navigationItems ?? [];
  const hasCta = Boolean(
    primaryCtaLabel?.trim() && primaryCtaHref?.trim(),
  );
  const showMobileToggle = navLinks.length > 0 || hasCta;
  const logoAltText = logoAlt?.trim() || "";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white border-b border-warm-gray transition-all duration-300 !py-5",
        scrolled ? "shadow-md py-0" : "py-0",
      )}
    >
      <div className="container-site flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAltText}
              width={198}
              height={48}
              className="w-[198px] px-2 h-auto"
            />
          ) : (
            <Image src={Logo} alt={logoAltText} className="w-[198px] px-2" />
          )}
        </Link>

        {navLinks.length > 0 ? (
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks.map((link) => (
              <div key={link.href || link.label} className="relative group">
                <Link
                  href={link.href || "#"}
                  className="font-body font-medium text-sm text-charcoal hover:text-navy px-3 py-5 inline-block transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && link.children.length > 0 ? (
                  <div className="absolute top-full left-0 w-52 bg-white border border-warm-gray shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                    {link.children.map((child) => (
                      <Link
                        key={child.href || child.label}
                        href={child.href || "#"}
                        className="block font-body font-medium text-sm text-slate hover:text-navy hover:bg-warm-gray/50 px-4 py-3 transition-colors border-b border-warm-gray/80 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        ) : null}

        {hasCta ? (
        <div className="hidden lg:block">
  <Button
    href={primaryCtaHref!.trim()}
    variant="primary"
    size="sm"
    target="_blank"
    rel="noopener noreferrer"
  >
    {primaryCtaLabel!.trim()}
  </Button>
</div>
        ) : null}

        {showMobileToggle ? (
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-charcoal p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        ) : null}
      </div>

      {mobileOpen && showMobileToggle ? (
        <div className="lg:hidden bg-white border-t border-warm-gray pb-4">
          {navLinks.map((link) => (
            <div key={link.href || link.label}>
              <Link
                href={link.href || "#"}
                onClick={() => setMobileOpen(false)}
                className="block font-body font-medium text-sm text-charcoal hover:text-navy px-6 py-3 border-b border-warm-gray/80"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href || child.label}
                  href={child.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className="block font-body text-sm text-slate hover:text-navy pl-10 pr-6 py-2.5 border-b border-warm-gray/60"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          {hasCta ? (
            <div className="px-6 pt-4">
              <Button
                href={primaryCtaHref!.trim()}
                variant="primary"
                className="w-full justify-center"
              >
                {primaryCtaLabel!.trim()}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
