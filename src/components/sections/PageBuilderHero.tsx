import Image from "next/image";
import { cn } from "@/lib/utils";
import { sanityImageUrl, HERO_BACKGROUND_WIDTH, HERO_BACKGROUND_SIZES } from "@/lib/sanity";
import { IPageHero } from "@/types/common";

interface PageBuilderHeroProps {
  title: string;
  hero?: IPageHero;
  className?: string;
}

export default function PageBuilderHero({
  title,
  hero,
  className,
}: PageBuilderHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[220px] md:min-h-[280px] flex items-center overflow-hidden bg-navy",
        className,
      )}
    >
      {(() => {
        const bgSrc = sanityImageUrl(hero?.backgroundImage, HERO_BACKGROUND_WIDTH);
        return bgSrc ? (
          <>
            <Image
              src={bgSrc}
              alt=""
              fill
              className="object-cover opacity-40"
              priority
              sizes={HERO_BACKGROUND_SIZES}
            />
            <div className="absolute inset-0 bg-navy/50" />
          </>
        ) : null;
      })()}
      <div className="container-site relative z-10 py-16">
        <h1 className="font-normal text-4xl md:text-5xl text-white tracking-tight">
          {hero?.title ?? title}
        </h1>
        {hero?.subtitle && (
          <p className="font-body text-white/70 mt-3 max-w-2xl text-base">
            {hero?.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
