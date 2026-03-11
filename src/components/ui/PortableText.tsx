import Image from 'next/image'
import { PortableText as PortableTextReact, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(800).height(500).fit('max').url()
      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-warm-gray">
            <Image src={src} alt={value.alt ?? ''} fill className="object-cover" sizes="(max-width: 800px) 100vw, 800px" />
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
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-red hover:underline">
        {children}
      </a>
    ),
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
