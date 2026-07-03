import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
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
    <Section ariaLabelledby="blog-title">
      <Container>
        <SectionHeader
          id="blog-title"
          title="Sur le feu"
          subtitle="Menus de la semaine, événements et actualités de La Coco Cantine."
        />

        <Suspense fallback={<LoadingSpinner label="Chargement des filtres…" />}>
          <BlogFilter />
        </Suspense>

        {items.length > 0 ? (
          <>
            <BlogFeed items={items} />

            {totalPages > 1 && (
              <nav
                className="flex justify-center gap-4 mt-10"
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
                <span className="flex items-center text-text-light text-sm">
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
          <p className="text-center text-text-light py-12">
            Aucun contenu pour le moment. Revenez bientôt !
          </p>
        )}
      </Container>
    </Section>
  )
}
