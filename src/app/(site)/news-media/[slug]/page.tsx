import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { safeFetch } from '@/lib/sanity'
import { ArticleJsonLd } from '@/components/seo/JsonLd'
import InlineLeadForm from '@/components/forms/InlineLeadForm'
import BottomCTA from '@/components/sections/BottomCTA'
import NewsletterForm from '@/components/forms/NewsletterForm'

export async function generateStaticParams() {
  try {
    const slugs: Array<{current: string}> = await (await import('@/lib/sanity')).safeFetch(
      `*[_type == "post"].slug`
    ) || []
    return slugs.map((s) => ({ slug: s.current }))
  } catch {
    return []
  }
}


interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  categories?: string[]
  body?: unknown[]
}

async function getPost(slug: string): Promise<Post | null> {
  return safeFetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — AZAGC news and industry updates.`,
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <>
      <ArticleJsonLd
        headline={post.title}
        datePublished={post.publishedAt}
        url={`https://www.azagc.org/news-media/${slug}`}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-warm-gray">
        <div className="container-site py-3 flex items-center gap-2 text-xs font-body text-slate">
          <a href="/" className="hover:text-navy no-underline">Home</a>
          <span>/</span>
          <a href="/news-media" className="hover:text-navy no-underline">News & Media</a>
          <span>/</span>
          <span className="truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="bg-cream py-16">
        <div className="container-site max-w-3xl mx-auto">
          {/* Meta */}
          <div className="mb-6">
            {post.categories?.map((c) => (
              <span key={c} className="inline-block font-body font-semibold text-xs uppercase tracking-wide text-red mr-3">{c}</span>
            ))}
            {formattedDate && (
              <span className="font-body text-xs text-light-slate">{formattedDate}</span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-navy leading-tight mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="font-body text-lg text-slate leading-relaxed mb-8 border-l-4 border-red pl-4 italic">
              {post.excerpt}
            </p>
          )}

          {/* Body */}
          <div className="prose prose-slate max-w-none font-body">
            {/* TODO: <PortableTextRenderer blocks={post.body} /> */}
            <p className="text-slate text-sm">Article body — connect Sanity to populate via <a href="/studio" className="text-red">/studio</a>.</p>
          </div>

          {/* Post-article inline form */}
          <div className="mt-12 pt-8 border-t border-warm-gray bg-navy p-8">
            <InlineLeadForm
              source="post-inline"
              headline="Stay ahead of Arizona agriculture news"
              subheadline="Join AZAGC and get industry updates, advocacy alerts, and event invites."
              dark
            />
          </div>
        </div>
      </article>

      {/* Newsletter bar */}
      <section className="bg-navy-deep py-8">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg text-white">Get AZAGC news in your inbox</p>
            <p className="font-body text-sm text-white/50">Industry updates, advocacy alerts, and event invites.</p>
          </div>
          <NewsletterForm className="w-full sm:w-auto sm:min-w-[360px]" />
        </div>
      </section>

      <BottomCTA source="news-article-bottom" />
    </>
  )
}
