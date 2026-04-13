import Image from "next/image";
import type { CarouselSlideView } from "./imageCarouselTypes";

type Props = {
  slide: CarouselSlideView;
  imagePresentation: "crop" | "contain";
  priority: boolean;
  inView: boolean;
};

export function ImageCarouselSlideImage({
  slide,
  imagePresentation,
  priority,
  inView,
}: Props) {
  const eager = inView || priority;

  if (imagePresentation === "contain") {
    return (
      <div className="relative aspect-[3/4] w-full min-h-[240px] bg-gradient-to-b from-slate-50 to-warm-gray/20">
        <Image
          src={slide.url}
          alt={slide.alt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
          loading={eager ? "eager" : "lazy"}
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full min-h-[240px] bg-gradient-to-br from-slate-100/80 to-warm-gray/25">
      <Image
        src={slide.url}
        alt={slide.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
      />
    </div>
  );
}
