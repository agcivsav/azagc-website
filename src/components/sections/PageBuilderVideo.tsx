import { cn } from '@/lib/utils'

interface PageBuilderVideoProps {
  heading?: string | null
  body?: string | null
  videoUrl: string
  className?: string
}

function getEmbedUrl(url: string): string | null {
  if (!url || !url.trim()) return null
  const u = url.trim()
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  if (u.includes('youtube.com/embed/') || u.includes('player.vimeo.com/')) return u
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return u
}

export default function PageBuilderVideo({
  heading,
  body,
  videoUrl,
  className,
}: PageBuilderVideoProps) {
  const embedUrl = getEmbedUrl(videoUrl)
  if (!embedUrl) return null

  return (
    <section className={cn('bg-cream py-12 md:py-16', className)}>
      <div className="container-site max-w-4xl">
        {heading && (
          <h2 className="font-normal text-2xl md:text-3xl text-navy mb-4">
            {heading}
          </h2>
        )}
        {body && (
          <p className="font-body text-slate text-base leading-relaxed mb-8 whitespace-pre-wrap">
            {body}
          </p>
        )}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-navy/10">
          <iframe
            src={embedUrl}
            title={heading ?? 'Video'}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
