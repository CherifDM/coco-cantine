import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { fetchSanity } from '@/lib/fetch'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
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
      <header className="bg-light py-12 md:py-16">
        <Container className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'Sur le feu', href: '/blog' },
              { label: post.title },
            ]}
          />
        </Container>
      </header>

      <Container className="max-w-3xl pb-16 pt-8">
        <BlogPostDetail post={post} />
        <div className="mt-12 pt-8 border-t border-light">
          <Link
            href="/blog?filter=articles"
            className="text-primary font-bold hover:text-accent transition-colors"
          >
            ← Retour au blog
          </Link>
        </div>
      </Container>
    </article>
  )
}
