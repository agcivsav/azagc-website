"use client";

import { cn } from "@/lib/utils";
import { ITabsSection } from "@/types/common";
import { PortableTextBlock } from "next-sanity";
import { useCallback, useId, useState, type KeyboardEvent } from "react";
import PortableText from "../ui/PortableText";
import Image from "next/image";
import { sanityImageUrl, CONTENT_IMAGE_MAX_WIDTH, LOGO_IMAGE_MAX_WIDTH } from "@/lib/sanity";

interface TabsSectionProps {
  content: ITabsSection;
  className?: string;
}

export default function TabsSection({ content, className }: TabsSectionProps) {
  const [activeValue, setActiveValue] = useState(0);
  const baseId = useId();
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  const hasContent = content.tabs.some(
    (t) => t.content && t.content.length > 0,
  );

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

  if (!content.tabs.length) return null;

  const activeTab = content.tabs[activeValue];
  const activeTabImageSrc = sanityImageUrl(activeTab.image, CONTENT_IMAGE_MAX_WIDTH);
  const hasEntries = activeTab.entries && activeTab.entries.length > 0;
  const tablistLabel =
    content.heading?.trim() || "Content sections";

  return (
    <section className={cn("bg-white py-20", className)}>
      <div className="container-site max-w-5xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-navy mb-4">
            {content.heading}
          </h2>
          <div className="text-slate leading-relaxed max-w-2xl">
            <PortableText value={content.intro as PortableTextBlock[]} />
          </div>
        </div>

        <div
          role="tablist"
          aria-label={tablistLabel}
          className="flex flex-wrap gap-3 mb-10"
        >
          {content.tabs.map((tab, key) => {
            const isActive = activeValue === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={tabId(key)}
                aria-selected={isActive}
                aria-controls={panelId(key)}
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

        <div
          role="tabpanel"
          id={panelId(activeValue)}
          aria-labelledby={tabId(activeValue)}
          tabIndex={0}
          className="bg-white border border-warm-gray/40 rounded-2xl p-6 md:p-8 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-navy/30 focus-visible:ring-offset-2"
        >
          {activeTabImageSrc && (
            <div className="relative w-full mb-6 rounded-xl overflow-hidden bg-warm-gray/20">
              <Image
                src={activeTabImageSrc}
                alt={activeTab.title}
                width={CONTENT_IMAGE_MAX_WIDTH}
                height={800}
                sizes="(max-width: 1024px) 100vw, 896px"
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {activeTab.content ? (
            <div className="text-slate leading-relaxed">
              <PortableText value={activeTab.content as PortableTextBlock[]} />
            </div>
          ) : hasContent ? (
            <p className="text-slate/60">No content for this tab yet.</p>
          ) : !activeTab.image?.asset?.url && !hasEntries ? (
            <div className="border border-dashed border-warm-gray rounded-xl p-10 text-center">
              <p className="text-slate text-sm">
                Add content or an image for this tab in Sanity.
              </p>
            </div>
          ) : null}

          {hasEntries && (
            <div
              className={cn(
                "divide-y divide-warm-gray/30",
                activeTab.content && "mt-8",
              )}
            >
              {activeTab.entries!.map((entry, i) => {
                const entryLogoSrc = sanityImageUrl(entry.logo, LOGO_IMAGE_MAX_WIDTH);
                return (
                <div
                  key={i}
                  className="flex items-start gap-8 py-8 first:pt-0 last:pb-0"
                >
                  <div className="flex-1 text-slate leading-relaxed">
                    <PortableText
                      value={entry.content as PortableTextBlock[]}
                    />
                  </div>

                  {entryLogoSrc && (
                    <div className="shrink-0 w-36 flex flex-col items-center gap-2">
                      {entry.link ? (
                        <a
                          href={entry.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open partner website (opens in new tab)"
                        >
                          <Image
                            src={entryLogoSrc}
                            alt=""
                            width={144}
                            height={96}
                            sizes="144px"
                            className="object-contain"
                          />
                        </a>
                      ) : (
                        <Image
                          src={entryLogoSrc}
                          alt="Partner logo"
                          width={144}
                          height={96}
                          sizes="144px"
                          className="object-contain"
                        />
                      )}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
