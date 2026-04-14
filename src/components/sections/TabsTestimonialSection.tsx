"use client";

import { cn } from "@/lib/utils";
import { ITabsTestimonialSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import PortableText from "../ui/PortableText";
import Image from "next/image";

interface TabsTestimonialSectionProps {
  content: ITabsTestimonialSection;
  className?: string;
}

export default function TabsTestimonialSection({
  content,
  className,
}: TabsTestimonialSectionProps) {
  const [activeValue, setActiveValue] = useState(0);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;
  const selectId = `${baseId}-category`;

  const focusTab = useCallback(
    (index: number) => {
      document.getElementById(`${baseId}-tab-${index}`)?.focus();
    },
    [baseId],
  );

  const onTabKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const n = content.tabs.length;
      if (n < 2) return;
      let next = index;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (index + 1) % n;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (index - 1 + n) % n;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = n - 1;
      } else {
        return;
      }
      setActiveValue(next);
      requestAnimationFrame(() => focusTab(next));
    },
    [content.tabs.length, focusTab],
  );

  useEffect(() => {
    if (content.tabs.length === 0) return;
    const max = content.tabs.length - 1;
    setActiveValue((v) => Math.min(Math.max(0, v), max));
  }, [content.tabs.length]);

  if (!content.tabs.length) return null;

  const safeTabIndex = Math.min(
    Math.max(0, activeValue),
    content.tabs.length - 1,
  );
  const activeTab = content.tabs[safeTabIndex];
  const hasTestimonials =
    activeTab.testimonials && activeTab.testimonials.length > 0;
  const tabCount = content.tabs.length;
  const tablistLabel =
    content.heading?.trim() || "Testimonial categories";

  return (
    <section className={cn("bg-white py-12 md:py-20", className)}>
      <div className="container-site max-w-5xl">
        {/* Heading */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy mb-3 md:mb-4">
            {content.heading}
          </h2>
          <div className="text-slate leading-relaxed max-w-2xl text-[0.95rem] md:text-base">
            <PortableText value={content.intro as PortableTextBlock[]} />
          </div>
        </div>

        {/* Desktop / tablet: pill tabs (previous style) */}
        {tabCount > 1 ? (
          <div
            role="tablist"
            aria-label={tablistLabel}
            className="mb-8 hidden flex-wrap gap-3 md:flex md:mb-10"
          >
            {content.tabs.map((tab, key) => {
              const isActive = safeTabIndex === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={tabId(key)}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveValue(key)}
                  onKeyDown={(e) => onTabKeyDown(e, key)}
                  className={cn(
                    "min-h-11 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                    isActive
                      ? "bg-navy text-white shadow-md"
                      : "bg-warm-gray/40 text-slate hover:bg-warm-gray",
                  )}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>
        ) : null}

        <div
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabCount > 1 ? tabId(safeTabIndex) : undefined}
          aria-label={
            tabCount > 1
              ? undefined
              : `Testimonials: ${activeTab.title ?? "category"}`
          }
          tabIndex={0}
          className="rounded-lg border border-warm-gray bg-white shadow-sm overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-navy/25 focus-visible:ring-offset-2"
        >
          {/* Mobile: category dropdown */}
          {tabCount > 1 ? (
            <div className="border-b border-warm-gray px-4 py-3 sm:px-5 md:hidden">
              <label
                htmlFor={selectId}
                className="mb-2 block font-body text-xs font-semibold uppercase tracking-wider text-slate"
              >
                Category
              </label>
              <div className="relative">
                <select
                  id={selectId}
                  className={cn(
                    "w-full min-h-11 cursor-pointer appearance-none rounded-lg border border-warm-gray bg-white",
                    "px-4 py-2.5 pr-11 text-sm font-medium text-navy shadow-sm transition-colors",
                    "focus-visible:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
                  )}
                  value={String(safeTabIndex)}
                  onChange={(e) => setActiveValue(Number(e.target.value))}
                >
                  {content.tabs.map((tab, key) => (
                    <option key={key} value={String(key)}>
                      {tab.title}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-navy/70"
                  aria-hidden
                />
              </div>
            </div>
          ) : null}

          <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            {!hasTestimonials ? (
              <p className="text-slate/60 text-sm md:text-base">
                No testimonials for this tab yet.
              </p>
            ) : null}

            {hasTestimonials ? (
              <div
                key={safeTabIndex}
                className="divide-y divide-warm-gray/40"
              >
                {activeTab.testimonials?.map((testimonial, i) => {
                  const logoUrl = testimonial.companyLogo?.asset?.url;
                  const logoHref = testimonial.link;
                  const attribution = [testimonial.name, testimonial.designation]
                    .filter(Boolean)
                    .join(", ");

                  return (
                    <div
                      key={`${safeTabIndex}-${testimonial._id ?? i}`}
                      className={cn(
                        "flex flex-col gap-6 pt-6 first:pt-0 pb-6 last:pb-0",
                        "lg:flex-row lg:items-start lg:gap-8 lg:pt-8 lg:first:pt-0 lg:pb-8 lg:last:pb-0",
                      )}
                    >
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-body text-slate text-[0.95rem] sm:text-base leading-[1.65]">
                          {testimonial.quote}
                        </p>
                        {attribution ? (
                          <p className="mt-4 text-sm font-semibold text-navy leading-snug">
                            {attribution}
                          </p>
                        ) : null}
                      </div>

                      {logoUrl ? (
                        <div className="flex justify-center shrink-0 lg:w-40 lg:justify-end">
                          {logoHref ? (
                            <a
                              href={logoHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full max-w-[220px] lg:max-w-none lg:w-36 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                              aria-label={`Open company website for ${testimonial.name} (opens in new tab)`}
                            >
                              <Image
                                src={logoUrl}
                                alt={`${testimonial.name} company logo`}
                                width={176}
                                height={120}
                                className="w-full h-auto object-contain"
                              />
                            </a>
                          ) : (
                            <div className="w-full max-w-[220px] lg:max-w-none lg:w-36">
                              <Image
                                src={logoUrl}
                                alt={`${testimonial.name} company logo`}
                                width={176}
                                height={120}
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
