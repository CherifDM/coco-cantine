import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { fetchSanity } from '@/lib/fetch'
import { postsQuery, postsCountQuery } from '@/sanity/lib/queries'
import type { Post, PostCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Sur le feu',
  description: 'Actualités, menus de la semaine et événements de La Coco Cantine.',
}

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const category = (params.category as PostCategory) || 'all'
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const queryCategory = category === 'all' ? 'all' : category

  const [posts, total] = await Promise.all([
    fetchSanity<Post[]>(postsQuery, { category: queryCategory, start, end }),
    fetchSanity<number>(postsCountQuery, { category: queryCategory }),
  ])

  const totalPages = Math.ceil((total ?? 0) / POSTS_PER_PAGE)

  return (
    <Section ariaLabelledby="blog-title">
      <Container>
        <SectionHeader
          id="blog-title"
          title="Sur le feu"
          subtitle="Menus de la semaine, événements et actualités de La Coco Cantine."
        />

        <Suspense fallback={<LoadingSpinner label="Chargement des filtres…" />}>
          <CategoryFilter />
        </Suspense>

        {posts && posts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="flex justify-center gap-4 mt-10"
                aria-label="Pagination des articles"
              >
                {page > 1 && (
                  <Button
                    href={`/blog?${new URLSearchParams({
                      ...(category !== 'all' ? { category } : {}),
                      page: String(page - 1),
                    }).toString()}`}
                    variant="outline"
                  >
                    ← Précédent
                  </Button>
                )}
                <span className="flex items-center text-text-light text-sm">
                  Page {page} sur {totalPages}
                </span>
                {page < totalPages && (
                  <Button
                    href={`/blog?${new URLSearchParams({
                      ...(category !== 'all' ? { category } : {}),
                      page: String(page + 1),
                    }).toString()}`}
                    variant="outline"
                  >
                    Suivant →
                  </Button>
                )}
              </nav>
            )}
          </>
        ) : (
          <p className="text-center text-text-light py-12">
            Aucun article pour le moment. Revenez bientôt !
          </p>
        )}
      </Container>
    </Section>
  )
}
