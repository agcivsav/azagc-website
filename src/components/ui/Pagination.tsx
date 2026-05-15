"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationLinksProps = {
  mode?: "links";
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  ariaLabel?: string;
  extraQuery?: Record<string, string>;
};

type PaginationButtonsProps = {
  mode: "buttons";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  ariaLabel?: string;
  basePath?: never;
  extraQuery?: never;
};

type PaginationProps = PaginationLinksProps | PaginationButtonsProps;

function isButtonsPagination(p: PaginationProps): p is PaginationButtonsProps {
  return p.mode === "buttons";
}

function PageTarget({
  page,
  href,
  className,
  ariaLabel,
  children,
  mode,
  onActivate,
}: {
  page: number;
  href: string;
  className: string;
  ariaLabel?: string;
  children: React.ReactNode;
  mode: "links" | "buttons";
  onActivate: (page: number) => void;
}) {
  if (mode === "buttons") {
    return (
      <button
        type="button"
        className={className}
        {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        onClick={() => onActivate(page)}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
    </Link>
  );
}

export default function Pagination(props: PaginationProps) {
  const {
    currentPage,
    totalPages,
    className,
    ariaLabel = "Pagination",
  } = props;

  if (totalPages <= 1) return null;

  const mode = props.mode ?? "links";
  const extraQuery = mode === "links" ? props.extraQuery : undefined;
  const basePath = !isButtonsPagination(props) ? props.basePath : "";
  const onPageChange = isButtonsPagination(props) ? props.onPageChange : undefined;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (extraQuery) {
      Object.entries(extraQuery).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
    }
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const activate = (page: number) => {
    if (mode === "buttons" && onPageChange) onPageChange(page);
  };

  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  const visiblePages: number[] = [];
  const start = showEllipsisStart ? Math.max(2, currentPage - 1) : 1;
  const end = showEllipsisEnd ? Math.min(totalPages - 1, currentPage + 1) : totalPages;
  for (let i = start; i <= end; i++) visiblePages.push(i);

  const prevClass =
    "inline-flex items-center gap-1.5 font-body text-sm font-medium text-navy hover:text-red transition-colors no-underline px-3 py-2 rounded-sm hover:bg-warm-gray/50";
  const numClass =
    "inline-flex min-w-9 h-9 items-center justify-center font-body text-sm text-navy hover:text-red hover:bg-warm-gray/50 rounded-sm no-underline transition-colors";

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center gap-1 sm:gap-2 py-12 md:py-16",
        className,
      )}
    >
      {prevPage ? (
        <PageTarget
          page={prevPage}
          href={buildHref(prevPage)}
          className={prevClass}
          ariaLabel="Previous page"
          mode={mode}
          onActivate={activate}
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Previous</span>
        </PageTarget>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 font-body text-sm text-slate/50 cursor-not-allowed px-3 py-2"
          aria-hidden
        >
          ← Previous
        </span>
      )}

      <ol className="flex items-center gap-0.5 list-none">
        {showEllipsisStart && (
          <>
            <li>
              <PageTarget
                page={1}
                href={buildHref(1)}
                className={numClass}
                mode={mode}
                onActivate={activate}
              >
                1
              </PageTarget>
            </li>
            <li className="px-1 text-slate/60" aria-hidden>
              …
            </li>
          </>
        )}
        {visiblePages.map((n) => (
          <li key={n}>
            {n === currentPage ? (
              <span
                className="inline-flex min-w-9 h-9 items-center justify-center font-body text-sm font-semibold text-navy bg-warm-gray rounded-sm"
                aria-current="page"
              >
                {n}
              </span>
            ) : (
              <PageTarget
                page={n}
                href={buildHref(n)}
                className={numClass}
                mode={mode}
                onActivate={activate}
              >
                {n}
              </PageTarget>
            )}
          </li>
        ))}
        {showEllipsisEnd && (
          <>
            <li className="px-1 text-slate/60" aria-hidden>
              …
            </li>
            <li>
              <PageTarget
                page={totalPages}
                href={buildHref(totalPages)}
                className={numClass}
                mode={mode}
                onActivate={activate}
              >
                {totalPages}
              </PageTarget>
            </li>
          </>
        )}
      </ol>

      {nextPage ? (
        <PageTarget
          page={nextPage}
          href={buildHref(nextPage)}
          className={prevClass}
          ariaLabel="Next page"
          mode={mode}
          onActivate={activate}
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden>→</span>
        </PageTarget>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 font-body text-sm text-slate/50 cursor-not-allowed px-3 py-2"
          aria-hidden
        >
          Next →
        </span>
      )}
    </nav>
  );
}
