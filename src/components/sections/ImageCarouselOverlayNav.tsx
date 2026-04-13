import { ChevronLeft, ChevronRight } from "lucide-react";

const navBtnClass =
  "pointer-events-auto z-20 flex h-11 w-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/95 text-navy shadow-lg backdrop-blur-sm transition-[transform,background-color,box-shadow] hover:bg-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

type Props = {
  scrollPrev: () => void;
  scrollNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  selectedIndex: number;
  slideCount: number;
};

export function ImageCarouselOverlayNav({
  scrollPrev,
  scrollNext,
  canPrev,
  canNext,
  selectedIndex,
  slideCount,
}: Props) {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-14 items-center justify-start bg-gradient-to-r from-navy-deep/25 to-transparent pl-2">
        <button
          type="button"
          className={navBtnClass}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollPrev();
          }}
          disabled={!canPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-navy-deep/25 to-transparent pr-2">
        <button
          type="button"
          className={navBtnClass}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollNext();
          }}
          disabled={!canNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div
        className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-navy-deep/75 px-2.5 py-1 text-xs font-medium text-white shadow-md backdrop-blur-sm"
        aria-hidden
      >
        {selectedIndex + 1} / {slideCount}
      </div>
    </>
  );
}
