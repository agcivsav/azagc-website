import Image from 'next/image'
import Link from 'next/link'
import { PortableText as PortableTextReact, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'
import LayoutButton from '@/components/layout/Button'
import type { IButton } from '@/types/common'

type PtImageAsset = {
  metadata?: { dimensions?: { width?: number; height?: number } }
}

const components: PortableTextComponents = {
  types: {
    button: ({ value }) => {
      // #region agent log
      {
        const upload = value?.upload as { asset?: { url?: string; _ref?: string } } | undefined
        const asset = upload?.asset
        fetch('http://127.0.0.1:7306/ingest/5cef382e-0441-4b7e-ba50-8bf8014f1df0', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '24ae0a' },
          body: JSON.stringify({
            sessionId: '24ae0a',
            runId: 'pre-fix',
            hypothesisId: 'H1-H5',
            location: 'PortableText.tsx:button',
            message: 'PT inline button value shape',
            data: {
              hasLabel: Boolean(value?.label),
              btnType: value?.btnType ?? null,
              hasUpload: Boolean(upload),
              assetKeys: asset && typeof asset === 'object' ? Object.keys(asset) : [],
              hasAssetUrl: typeof asset?.url === 'string' && asset.url.length > 0,
              urlHost:
                typeof asset?.url === 'string'
                  ? (() => {
                      try {
                        return new URL(asset.url).hostname
                      } catch {
                        return 'invalid-url'
                      }
                    })()
                  : null,
              hasAssetRef: typeof asset?._ref === 'string' && asset._ref.length > 0,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {})
      }
      // #endregion
      if (!value?.label) return null
      const btn: IButton = {
        label: value.label,
        btnType: (value.btnType as IButton['btnType']) ?? 'internal',
        link: value.link ?? '',
        upload:
          value.upload?.asset?.url != null
            ? { asset: { url: value.upload.asset.url } }
            : undefined,
      }
      return (
        <div className="not-prose my-6">
          <LayoutButton button={btn} />
        </div>
      )
    },
    image: ({ value }) => {
      if (!value?.asset) return null
      const asset = value.asset as PtImageAsset
      const dims = asset.metadata?.dimensions
      const intrinsicW = dims?.width && dims.width > 0 ? dims.width : 800
      const intrinsicH = dims?.height && dims.height > 0 ? dims.height : 600
      const maxCdn = 1200
      const cdnW = Math.min(intrinsicW, maxCdn)
      const cdnH = Math.round((intrinsicH / intrinsicW) * cdnW)
      const src = urlFor(value).width(cdnW).height(cdnH).fit('max').url()
      const displayW = Math.min(intrinsicW, maxCdn)
      return (
        <figure className="my-6 w-fit max-w-full">
          <div className="inline-block max-w-full rounded-lg bg-warm-gray">
            <Image
              src={src}
              alt={value.alt ?? ''}
              width={intrinsicW}
              height={intrinsicH}
              className="h-auto! w-auto! max-w-full object-contain"
              sizes={`${displayW}px`}
              style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center font-body text-sm text-slate">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    normal: ({ children }) => <p className="font-body text-slate leading-relaxed mb-4">{children}</p>,
    h2: ({ children }) => <h2 className="font-normal text-xl text-navy mt-8 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="font-normal text-lg text-navy mt-6 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="font-normal text-base text-navy mt-5 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red pl-4 italic text-slate my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
  listItem: ({ children }) => <li className="font-body text-slate">{children}</li>,
  marks: {
    link: ({ children, value }) => {
      const href = value?.href as string | undefined
      if (!href) return <>{children}</>
      const openNewTab = value?.blank === true
      if (openNewTab) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
            {children}
          </a>
        )
      }
      const isExternal = href.startsWith('http')
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className="text-red hover:underline">
          {children}
        </Link>
      )
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

interface PortableTextProps {
  value: PortableTextBlock[] | null | undefined
  className?: string
}

export default function PortableText({ value, className }: PortableTextProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null
  return (
    <div className={className}>
      <PortableTextReact value={value} components={components} />
    </div>
  )
}
