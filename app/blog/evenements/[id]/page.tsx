import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { BlogEventDetail } from '@/components/blog/BlogEventDetail'
import { fetchSanity } from '@/lib/fetch'
import { eventByIdQuery, eventIdsQuery } from '@/sanity/lib/queries'
import type { Event } from '@/lib/types'

interface EventPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const events = await fetchSanity<{ _id: string }[]>(eventIdsQuery)
  return (events ?? []).map(({ _id }) => ({ id: _id }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { id } = await params
  const event = await fetchSanity<Event>(eventByIdQuery, { id })

  if (!event) return { title: 'Événement introuvable' }

  return {
    title: event.title,
    description: event.description,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = await fetchSanity<Event>(eventByIdQuery, { id })

  if (!event) notFound()

  return (
    <article>
      <header className="bg-light py-12 md:py-16">
        <Container className="max-w-3xl">
          <Breadcrumb
            items={[
              { label: 'Sur le feu', href: '/blog' },
              { label: event.title },
            ]}
          />
        </Container>
      </header>

      <Container className="max-w-3xl pb-16 pt-8">
        <BlogEventDetail event={event} />
        <div className="mt-12 pt-8 border-t border-light">
          <Link
            href="/blog?filter=events"
            className="text-primary font-bold hover:text-accent transition-colors"
          >
            ← Retour aux événements
          </Link>
        </div>
      </Container>
    </article>
  )
}
