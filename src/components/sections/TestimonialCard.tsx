import Image from "next/image";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  _id: string;
  name: string;
  designation?: string;
  quote: string;
  companyLogo?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width?: number; height?: number } };
    };
  };
}

interface TestimonialCardProps {
  item: TestimonialItem;
  className?: string;
}

export function TestimonialCard({ item, className }: TestimonialCardProps) {
  const logoUrl = item.companyLogo?.asset?.url;
  const logoW = item.companyLogo?.asset?.metadata?.dimensions?.width ?? 160;
  const logoH = item.companyLogo?.asset?.metadata?.dimensions?.height ?? 48;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm",
        "shadow-[0_2px_40px_-12px_rgba(35,31,32,0.12),0_0_0_1px_rgba(35,31,32,0.06)]",
        "transition-[transform,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_12px_48px_-16px_rgba(35,31,32,0.18),0_0_0_1px_rgba(212,155,44,0.25)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1 bg-linear-to-r from-gold via-gold-hover to-gold"
        aria-hidden
      />
      <div className="relative p-7 md:p-8">
        <span
          className="font-body text-6xl leading-none text-gold/20 select-none absolute left-5 top-3 md:left-6 md:top-4"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="relative z-1 pt-2">
          <p className="font-body text-slate text-base leading-relaxed">
            {item.quote}
          </p>
        </blockquote>
        <footer className="relative z-1 mt-7 flex flex-col gap-4 border-t border-warm-gray/50 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <p className="font-semibold text-lg text-navy leading-tight">
              {item.name}
            </p>
            {item.designation && (
              <p className="mt-1.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                {item.designation}
              </p>
            )}
          </div>
          {logoUrl && (
            <div className="relative h-11 w-30 shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src={logoUrl}
                alt={`${item.name} company logo`}
                width={logoW}
                height={logoH}
                className="h-11 w-auto max-w-30 object-contain object-right sm:object-center"
                sizes="120px"
              />
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}
