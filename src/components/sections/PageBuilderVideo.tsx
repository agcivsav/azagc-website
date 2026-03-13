import { cn } from '@/lib/utils'
import { urlFor } from '@/lib/sanity' // or your helper to get Sanity asset URL

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
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0`

  if (u.includes('youtube.com/embed/') || u.includes('player.vimeo.com/')) {
    return `${u}?autoplay=0`
  }

  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0`

  return u
}

export default function PageBuilderVideo({
  heading,
  body,
  videoUrl,
  className,
}: PageBuilderVideoProps) {
  if (!videoUrl) return null

  return (
    <section className={cn('bg-cream py-12 md:py-16', className)}>
      <div className="container-site max-w-2xl mx-auto">

        {heading && (
          <h2 className="font-normal text-2xl text-center md:text-3xl text-navy mb-4">
            {heading}
          </h2>
        )}

        {body && (
          <p className="font-body text-slate text-center text-base leading-relaxed mb-6 whitespace-pre-wrap">
            {body}
          </p>
        )}

        <div className="relative aspect-video rounded-xl overflow-hidden bg-navy/10 max-w-xl mx-auto">
          <video
            controls
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  )
}