"use client";

import type { CSSProperties } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { cn } from "@/lib/utils";
import type { ITestimonialsSection } from "@/types/common";
import PortableText from "@/components/ui/PortableText";
import SectionLabel from "@/components/ui/SectionLabel";
import { TestimonialCard, type TestimonialItem } from "./TestimonialCard";

interface TestimonialsSectionProps {
  content: ITestimonialsSection;
  className?: string;
}

export default function TestimonialsSection({
  content,
  className,
}: TestimonialsSectionProps) {
  const items: TestimonialItem[] = (content.testimonials ?? []).filter(
    (t) =>
      !!t?._id && typeof t.name === "string" && typeof t.quote === "string",
  ) as TestimonialItem[];

  const hasIntro =
    Array.isArray(content.intro) && content.intro.length > 0;

  if (!content.heading && items.length === 0) {
    return null;
  }

  if (items.length === 0) {
    return (
      <section
        className={cn(
          "relative py-20 md:py-28",
          "bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(212,155,44,0.12),transparent_55%),linear-gradient(165deg,#f7f5f0_0%,#ebe6dc_45%,#231f20_45.05%,#1a1718_100%)]",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container-site relative max-w-2xl text-center">
          <p className="font-body text-cream/90">
            No testimonials yet. Add testimonials in Sanity and assign them to
            this section.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative py-16 md:py-24 lg:py-28",
        "bg-[radial-gradient(ellipse_100%_60%_at_15%_0%,rgba(212,155,44,0.14),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_20%,rgba(40,90,113,0.08),transparent_45%),linear-gradient(180deg,#f7f5f0_0%,#f0ebe3_100%)]",
        className,
      )}
      aria-labelledby="testimonials-heading"
    >
      {/* overflow-hidden on section breaks sticky; clip decorations only */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L40 80M0 40L80 40' stroke='%23231F20' stroke-width='0.35' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute -right-24 top-1/4 h-md w-md rounded-full bg-gold/5 blur-3xl md:right-0" />
      </div>

      <div className="container-site relative max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
          <header className="lg:max-w-md lg:shrink-0">
            <div className="lg:sticky lg:top-28 lg:z-10">
              <div className="flex gap-5 md:gap-6">
                <div
                  className="mt-1 hidden h-[min(8rem,12vw)] w-1 shrink-0 rounded-full bg-linear-to-b from-gold via-gold-hover to-navy-mid sm:block"
                  aria-hidden
                />
                <div className="min-w-0">
                  <SectionLabel color="gold" className="mb-4">
                    Member voices
                  </SectionLabel>
                  <h2
                    id="testimonials-heading"
                    className="font-normal text-3xl sm:text-4xl text-navy leading-tight"
                  >
                    {content.heading || "Testimonials"}
                  </h2>
                  {hasIntro && (
                    <div className="mt-6 font-body text-slate text-base leading-relaxed">
                      <PortableText value={content.intro as PortableTextBlock[]} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <ul className="m-0 flex list-none flex-col gap-8 p-0 lg:min-w-0 lg:flex-1 lg:gap-9">
            {items.map((item, i) => (
              <li
                key={item._id}
                className="animate-testimonial-reveal motion-reduce:animate-none motion-reduce:opacity-100"
                style={
                  {
                    animationDelay: `${80 + i * 90}ms`,
                  } satisfies CSSProperties
                }
              >
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
