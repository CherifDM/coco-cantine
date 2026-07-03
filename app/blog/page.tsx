import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageHero } from '@/components/layout/PageHero'
import { BlogFeed } from '@/components/blog/BlogFeed'
import { BlogFilter } from '@/components/blog/BlogFilter'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/Button'
import { fetchSanity } from '@/lib/fetch'
import { buildFilteredBlogItems, paginateBlogItems } from '@/lib/blog'
import {
  postsQuery,
  blogEventsQuery,
  allMenusOfTheDayQuery,
} from '@/sanity/lib/queries'
import type { BlogFilter as BlogFilterType, Event, MenuOfTheDay, Post } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Sur le feu',
  description: 'Actualités, menus de la semaine et événements de La Coco Cantine.',
}

const ITEMS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<{ filter?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const filter = (['all', 'articles', 'events', 'menus'].includes(params.filter ?? '')
    ? params.filter
    : 'all') as BlogFilterType
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const [posts, events, menus] = await Promise.all([
    fetchSanity<Post[]>(postsQuery),
    fetchSanity<Event[]>(blogEventsQuery),
    fetchSanity<MenuOfTheDay[]>(allMenusOfTheDayQuery),
  ])

  const allItems = buildFilteredBlogItems(
    filter,
    posts ?? [],
    events ?? [],
    menus ?? [],
  )
  const { items, total } = paginateBlogItems(allItems, filter, start, end)
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <>
      <PageHero
        title="Sur le feu"
        subtitle="Menus de la semaine, événements et actualités de La Coco Cantine."
        breadcrumbs={[{ label: 'Sur le feu' }]}
        variant="primary"
      />

      <Section>
        <Container>
          <Suspense fallback={<LoadingSpinner label="Chargement des filtres…" />}>
            <BlogFilter />
          </Suspense>

          {items.length > 0 ? (
            <>
              <BlogFeed items={items} />

              {totalPages > 1 && (
                <nav
                  className="flex justify-center items-center gap-4 mt-12"
                  aria-label="Pagination"
                >
                  {page > 1 && (
                    <Button
                      href={`/blog?${new URLSearchParams({
                        ...(filter !== 'all' ? { filter } : {}),
                        page: String(page - 1),
                      }).toString()}`}
                      variant="outline"
                    >
                      ← Précédent
                    </Button>
                  )}
                  <span className="flex items-center text-muted text-sm font-medium">
                    Page {page} sur {totalPages}
                  </span>
                  {page < totalPages && (
                    <Button
                      href={`/blog?${new URLSearchParams({
                        ...(filter !== 'all' ? { filter } : {}),
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
            <p className="text-center text-muted py-12 text-lg">
              Aucun contenu pour le moment. Revenez bientôt !
            </p>
          )}
        </Container>
      </Section>
    </>
  )
}
