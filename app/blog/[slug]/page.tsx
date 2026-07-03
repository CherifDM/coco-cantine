import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { fetchSanity } from '@/lib/fetch'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await fetchSanity<{ slug: string }[]>(postSlugsQuery)
  return (slugs ?? []).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchSanity<Post>(postBySlugQuery, { slug })

  if (!post) return { title: 'Article introuvable' }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await fetchSanity<Post>(postBySlugQuery, { slug })

  if (!post) notFound()

  return (
    <article>
      <header className="bg-white py-12">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="text-primary text-sm font-medium hover:text-secondary mb-6 inline-block"
          >
            ← Retour au blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="category">Article</Badge>
            <time dateTime={post.publishedAt} className="text-text-light text-sm">
              {formatDate(post.publishedAt)}
            </time>
            {post.author && (
              <span className="text-text-light text-sm">par {post.author}</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg text-text-light">{post.excerpt}</p>
          )}
        </Container>
      </header>

      {post.featuredImage?.asset && (
        <div className="relative aspect-video max-w-4xl mx-auto px-4 mb-8">
          <SanityImageComponent
            image={post.featuredImage}
            alt={post.featuredImage.alt || post.title}
            fill
            priority
            className="rounded-2xl object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      <Container className="max-w-3xl pb-16">
        <PortableTextRenderer value={post.content} />
      </Container>
    </article>
  )
}
