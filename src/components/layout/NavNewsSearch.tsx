'use client'

import {
  Suspense,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavNewsSearchFieldsProps = {
  variant: 'desktop' | 'mobile'
  onNavigate?: () => void
}

function NavNewsSearchFields({ variant, onNavigate }: NavNewsSearchFieldsProps) {
  const id = useId()
  const searchParams = useSearchParams()
  const defaultQ = searchParams.get('q') ?? ''
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isDesktop = variant === 'desktop'

  useEffect(() => {
    const q = defaultQ.trim()
    queueMicrotask(() => {
      if (q.length >= 2) setOpen(true)
      else setOpen(false)
    })
  }, [defaultQ])

  useEffect(() => {
    if (!open) return
    const onDocMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      const t = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(t)
    }
  }, [open])

  const handleSubmit = useCallback(() => {
    onNavigate?.()
  }, [onNavigate])

  const triggerClass = cn(
    'min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm',
    'text-navy border border-transparent bg-transparent',
    'hover:bg-cream hover:border-warm-gray transition-colors',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    open && 'bg-cream border-warm-gray text-primary',
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        isDesktop ? 'hidden min-[1030px]:block shrink-0' : 'w-full',
      )}
    >
      <div
        className={cn(
          isDesktop ? 'flex justify-end' : 'flex justify-end px-4 py-2 border-b border-warm-gray/80',
        )}
      >
        <button
          type="button"
          className={triggerClass}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={open ? `${id}-panel` : undefined}
          aria-label={open ? 'Close news search' : 'Open news search'}
        >
          <Search className="w-5 h-5" strokeWidth={2} aria-hidden />
        </button>
      </div>

      {open ? (
        <div
          id={`${id}-panel`}
          role="search"
          className={cn(
            isDesktop
              ? 'absolute right-0 top-[calc(100%+0.35rem)] z-[60] w-[min(calc(100vw-2rem),22rem)] rounded-sm border border-warm-gray bg-white p-3 shadow-xl ring-1 ring-navy/[0.06]'
              : 'px-4 pb-4 pt-1 border-b border-warm-gray/80',
          )}
        >
          <form
            action="/news-media"
            method="get"
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor={id} className="sr-only">
              Search news articles
            </label>
            <input
              ref={inputRef}
              id={id}
              name="q"
              type="search"
              enterKeyHint="search"
              placeholder="Search news…"
              defaultValue={defaultQ}
              key={defaultQ}
              minLength={2}
              maxLength={80}
              autoComplete="off"
              className={cn(
                'min-w-0 flex-1 font-body text-sm text-charcoal placeholder:text-slate/60',
                'bg-cream/80 border border-warm-gray rounded-sm py-2.5 px-3',
                'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
              )}
            />
            <button
              type="submit"
              className={cn(
                'shrink-0 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm',
                'border border-warm-gray bg-white text-navy hover:bg-cream hover:border-red/30 transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
              )}
              aria-label="Submit news search"
            >
              <Search className="w-4 h-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                'shrink-0 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-sm',
                'border border-transparent text-slate hover:text-navy hover:bg-warm-gray/50 transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
              )}
              aria-label="Close search"
            >
              <X className="w-4 h-4" strokeWidth={2} aria-hidden />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

const desktopSearchFallback = (
  <div
    className="hidden min-[1030px]:flex items-center justify-end h-10 w-10 shrink-0 rounded-sm bg-warm-gray/30 animate-pulse"
    aria-hidden
  />
)

const mobileSearchFallback = (
  <div
    className="flex justify-end px-4 py-2 border-b border-warm-gray/80"
    aria-hidden
  >
    <div className="h-10 w-10 rounded-sm bg-warm-gray/30 animate-pulse" />
  </div>
)

export function NavNewsSearchMobile({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Suspense fallback={mobileSearchFallback}>
      <NavNewsSearchFields variant="mobile" onNavigate={onNavigate} />
    </Suspense>
  )
}

export function NavNewsSearch() {
  return (
    <Suspense fallback={desktopSearchFallback}>
      <NavNewsSearchFields variant="desktop" />
    </Suspense>
  )
}
