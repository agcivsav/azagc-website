"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
  ariaLabel?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  className,
  ariaLabel = "Pagination",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const buildHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  const visiblePages: number[] = [];
  const start = showEllipsisStart ? Math.max(2, currentPage - 1) : 1;
  const end = showEllipsisEnd ? Math.min(totalPages - 1, currentPage + 1) : totalPages;
  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center gap-1 sm:gap-2 py-12 md:py-16",
        className,
      )}
    >
      {prevPage ? (
        <Link
          href={buildHref(prevPage)}
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-navy hover:text-red transition-colors no-underline px-3 py-2 rounded-sm hover:bg-warm-gray/50"
          aria-label="Previous page"
        >
          <span aria-hidden>←</span>
          <span className="hidden sm:inline">Previous</span>
        </Link>
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
              <Link
                href={buildHref(1)}
                className="inline-flex min-w-9 h-9 items-center justify-center font-body text-sm text-navy hover:text-red hover:bg-warm-gray/50 rounded-sm no-underline transition-colors"
              >
                1
              </Link>
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
                <Link
                  href={buildHref(n)}
                  className="inline-flex min-w-9 h-9 items-center justify-center font-body text-sm text-navy hover:text-red hover:bg-warm-gray/50 rounded-sm no-underline transition-colors"
                >
                  {n}
                </Link>
              )}
            </li>
          ))}
        {showEllipsisEnd && (
          <>
            <li className="px-1 text-slate/60" aria-hidden>
              …
            </li>
            <li>
              <Link
                href={buildHref(totalPages)}
                className="inline-flex min-w-9 h-9 items-center justify-center font-body text-sm text-navy hover:text-red hover:bg-warm-gray/50 rounded-sm no-underline transition-colors"
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}
      </ol>

      {nextPage ? (
        <Link
          href={buildHref(nextPage)}
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-navy hover:text-red transition-colors no-underline px-3 py-2 rounded-sm hover:bg-warm-gray/50"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <span aria-hidden>→</span>
        </Link>
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
