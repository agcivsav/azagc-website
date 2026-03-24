"use client";

import { useId, useState } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { cn } from "@/lib/utils";
import type { IEmbedPanelsSection } from "@/types/common";
import PortableText from "@/components/ui/PortableText";
import SectionLabel from "@/components/ui/SectionLabel";

interface EmbedPanelsSectionProps {
  content: IEmbedPanelsSection;
  className?: string;
}

function isHttpsUrl(s: string | null | undefined): s is string {
  if (!s?.trim()) return false;
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Up to 2 https URLs per panel (matches Sanity max 2). */
function normalizeEmbedUrls(
  embedUrl: string[] | string | null | undefined,
): string[] {
  if (embedUrl == null) return [];
  const list = Array.isArray(embedUrl) ? embedUrl : [embedUrl];
  return list
    .filter((u): u is string => typeof u === "string")
    .map((u) => u.trim())
    .filter(isHttpsUrl)
    .slice(0, 2);
}

export default function EmbedPanelsSection({
  content,
  className,
}: EmbedPanelsSectionProps) {
  const panels = content.panels?.filter((p) => p?.label?.trim()) ?? [];
  const [active, setActive] = useState(0);
  const selectId = useId();
  const stageId = useId();

  if (panels.length === 0) return null;

  const safeIndex = active >= 0 && active < panels.length ? active : 0;
  const panel = panels[safeIndex];
  const hasIntro = Array.isArray(content.intro) && content.intro.length > 0;
  const embedUrls = normalizeEmbedUrls(panel.embedUrl);
  const showEmbed = embedUrls.length > 0;
  const twoUp = embedUrls.length === 2;

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-cream py-16 md:py-20",
        className,
      )}
      aria-labelledby="embed-panels-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 0L36 72M0 36L72 36' stroke='%23231F20' stroke-width='0.35' fill='none'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-12 h-80 w-80 rounded-full bg-navy-mid/12 blur-3xl"
        aria-hidden
      />

      <div className="container-site relative max-w-6xl">
        <header className="mb-10 max-w-3xl md:mb-12">
          <SectionLabel color="gold" className="mb-3">
            Resources
          </SectionLabel>
          <h2
            id="embed-panels-heading"
            className="font-normal text-3xl sm:text-4xl text-navy leading-tight"
          >
            {content.heading}
          </h2>
          {hasIntro && (
            <div className="mt-5 font-body text-slate text-base leading-relaxed">
              <PortableText
                value={(content.intro ?? []) as PortableTextBlock[]}
              />
            </div>
          )}
        </header>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:gap-14">
          <div className="lg:sticky lg:top-28">
            <label htmlFor={selectId} className="sr-only">
              Choose a category
            </label>
            <select
              id={selectId}
              className="w-full rounded-xl border-2 border-warm-gray bg-white py-3.5 pl-4 pr-10 font-body text-sm font-medium text-navy shadow-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/35 md:hidden"
              value={safeIndex}
              onChange={(e) => setActive(Number(e.target.value))}
            >
              {panels.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
            </select>

            <nav className="hidden md:block" aria-label="Resource categories">
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {panels.map((p, i) => {
                  const isOn = i === safeIndex;
                  return (
                    <li key={`${p.label}-${i}`}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={isOn}
                        className={cn(
                          "w-full rounded-r-xl border-l-4 py-3.5 pl-4 pr-3 text-left transition-all duration-300",
                          isOn
                            ? "border-gold bg-white font-semibold text-navy shadow-md ring-1 ring-warm-gray/55"
                            : "border-transparent text-navy/55 hover:border-gold/35 hover:bg-cream hover:text-navy",
                        )}
                      >
                        <span className="font-body text-sm leading-snug">
                          {p.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div
            id={stageId}
            className="relative min-w-0 overflow-hidden rounded-2xl border border-warm-gray/70 bg-white p-5 shadow-[0_8px_40px_-20px_rgba(35,31,32,0.12)] ring-1 ring-navy/8 md:p-8 md:pt-9"
            role="region"
            aria-live="polite"
            aria-label={panel.label}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1 bg-linear-to-r from-gold via-gold-hover to-gold"
              aria-hidden
            />
            <div key={safeIndex} className="relative z-1">
              {showEmbed && (
                <div
                  className={cn(
                    "grid w-full gap-4",
                    twoUp ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
                  )}
                >
                  {embedUrls.map((src, idx) => (
                    <div
                      key={`${src}-${idx}`}
                      className="relative min-w-0 overflow-hidden rounded-xl bg-linear-to-b from-cream to-warm-gray/30 ring-1 ring-navy/12"
                    >
                      <div
                        className={cn(
                          "relative w-full",
                          twoUp
                            ? "aspect-16/11 min-h-[min(50vh,420px)] md:min-h-[min(55vh,480px)]"
                            : "aspect-16/11 min-h-[min(70vh,520px)]",
                        )}
                      >
                        <iframe
                          title={
                            embedUrls.length > 1
                              ? `${panel.label} embed ${idx + 1}`
                              : `${panel.label} embed`
                          }
                          src={src}
                          className="absolute inset-0 h-full w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allow="clipboard-write; encrypted-media; fullscreen"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!showEmbed && (
                <p className="font-body text-sm text-light-slate">
                  Add one or two embed URLs (https) for this panel in Sanity.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
