"use client";

import { cn } from "@/lib/utils";
import { ITabsTestimonialSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import { useState } from "react";
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

  if (!content.tabs.length) return null;

  const activeTab = content.tabs[activeValue];
  const hasTestimonials =
    activeTab.testimonials && activeTab.testimonials.length > 0;

  return (
    <section className={cn("bg-white py-20", className)}>
      <div className="container-site max-w-5xl">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4">
            {content.heading}
          </h2>
          <div className="text-slate leading-relaxed max-w-2xl">
            <PortableText value={content.intro as PortableTextBlock[]} />
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="flex flex-wrap gap-3 mb-10">
          {content.tabs.map((tab, key) => {
            const isActive = activeValue === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveValue(key)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
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

        {/* Content Card */}
        <div className="bg-white border border-warm-gray/40 rounded-2xl p-6 md:p-8 shadow-sm">
          {!hasTestimonials ? (
            <p className="text-slate/60">No testimonials for this tab yet.</p>
          ) : null}

          {/* Testimonials listing */}
          {hasTestimonials && (
            <div
              className={cn(
                "divide-y divide-warm-gray/30",
                hasTestimonials && "mt-8",
              )}
            >
              {activeTab.testimonials?.map((testimonial, i) => (
                <div
                  key={i}
                  className="flex items-start gap-8 py-8 first:pt-0 last:pb-0"
                >
                  {/* Left: content */}
                  <div className="flex-1 text-slate leading-relaxed">
                    <p className="flex-1 text-slate leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <h3 className="text-sm text-black/80 font-semibold mt-3">
                      {testimonial.name}
                    </h3>
                    <span className="text-sm text-black/60 font-semibold mt-2">
                      {testimonial.designation}
                    </span>
                  </div>

                  {/* Right: logo */}
                  {testimonial.companyLogo?.asset?.url && (
                    <div className="shrink-0 w-36 flex flex-col items-center gap-2">
                      <Image
                        src={testimonial.companyLogo.asset.url}
                        alt="Logo"
                        width={144}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
