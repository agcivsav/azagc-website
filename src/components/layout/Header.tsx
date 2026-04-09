"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Logo from "../../../public/logo-svg.svg";
import type { HeaderNavigationItem } from "@/lib/queries/siteSettings";

const DEFAULT_NAV_LINKS: HeaderNavigationItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Committees", href: "/about/committees" },
      { label: "Our Team", href: "/about/our-team" },
      { label: "Testimonials", href: "/about/testimonials" },
      { label: "Awards Program", href: "/about/awards-program" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Contractor Members", href: "/membership/contractor" },
      { label: "Affiliate Members", href: "/membership/affiliate" },
      // { label: "Benefits", href: "/membership/benefits" },
      { label: "Member Directory", href: "/membership/member-directory" },
    ],
  },
  {
    label: "Advocacy",
    href: "/advocacy",
    children: [
      { label: "Policy Priorities", href: "/advocacy/policy-priorities" },
      { label: "Take Action", href: "/advocacy/take-action" },
      { label: "Voter Tools", href: "/advocacy/voter-tools" },
      { label: "Contribute", href: "/advocacy/contribute" },
    ],
  },
  {
    label: "Education",
    href: "/education-training",
    children: [
      {
        label: "Apprenticeship Programs",
        href: "/education-training/apprenticeship-programs",
      },
      {
        label: "Workforce Development Programs",
        href: "/education-training/workforce-development-programs",
      },

      {
        label: "Erosion Control Coordinator Training",
        href: "/education-training/erosion-control-coordinator-training",
      },
      {
        label: "AGC of America Education",
        href: "/education-training/agc-of-america-education",
      },

      {
        label: "Student Resources",
        href: "/education-training/student-resources",
      },
    ],
  },
  {
    label: "Industry Resources",
    href: "/industry-resources",
    children: [
      { label: "News Media", href: "/news-media" },

      {
        label: "Transportation Infrastructure",
        href: "/industry-resources/transportation-infrastructure",
      },
      { label: "Environment", href: "/industry-resources/environment" },

      {
        label: "Arizona Construction Outlook",
        href: "/industry-resources/arizona-construction-outlook",
      },
      { label: "Labor & HR", href: "/industry-resources/labor-hr" },
      { label: "Safety", href: "/industry-resources/safety" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [{ label: "Events Calendar", href: "/events/events-calendar" }],
  },
  // { label: 'News', href: '/news' },
  { label: "Contact", href: "/contact" },
];

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
  primaryCtaLabel = "Join Now",
  primaryCtaHref = "/join",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = navigationItems?.length ? navigationItems : DEFAULT_NAV_LINKS;

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
              alt={logoAlt || "AZAGC"}
              width={198}
              height={48}
              className="w-[198px] px-2 h-auto"
            />
          ) : (
            <Image src={Logo} alt={logoAlt || "AZAGC"} className="w-[198px] px-2" />
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.href || link.label} className="relative group">
              <Link
                href={link.href || "#"}
                className="font-body font-medium text-sm text-charcoal hover:text-navy px-3 py-5 inline-block transition-colors"
              >
                {link.label}
              </Link>
              {link.children && (
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
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={primaryCtaHref || "/join"} variant="primary" size="sm">
            {primaryCtaLabel || "Join Now"}
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-charcoal p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
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
          <div className="px-6 pt-4">
            <Button
              href={primaryCtaHref || "/join"}
              variant="primary"
              className="w-full justify-center"
            >
              {primaryCtaLabel || "Join Now"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
