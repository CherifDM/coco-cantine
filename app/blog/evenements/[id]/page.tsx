import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { fetchSanity } from '@/lib/fetch'
import { eventByIdQuery, eventIdsQuery } from '@/sanity/lib/queries'
import { formatDate, formatDateTime, EVENT_TYPE_EMOJIS } from '@/lib/utils'
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

  const emoji = EVENT_TYPE_EMOJIS[event.type] || '📅'

  return (
    <article>
      <header className="bg-white py-12">
        <Container className="max-w-3xl">
          <Link
            href="/blog?filter=events"
            className="text-primary text-sm font-medium hover:text-secondary mb-6 inline-block"
          >
            ← Retour aux événements
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="category">Événement</Badge>
            <time dateTime={event.date} className="text-text-light text-sm">
              {formatDateTime(event.date)}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            {emoji} {event.title}
          </h1>

          <p className="mt-4 text-lg text-text-light">{event.description}</p>

          <dl className="mt-6 space-y-2 text-sm">
            {event.price && (
              <div>
                <dt className="font-semibold inline">Prix : </dt>
                <dd className="inline text-text-light">{event.price}</dd>
              </div>
            )}
            {event.location && (
              <div>
                <dt className="font-semibold inline">Lieu : </dt>
                <dd className="inline text-text-light">{event.location}</dd>
              </div>
            )}
            {event.organizer && (
              <div>
                <dt className="font-semibold inline">Organisation : </dt>
                <dd className="inline text-text-light">{event.organizer}</dd>
              </div>
            )}
          </dl>
        </Container>
      </header>

      {event.image?.asset && (
        <div className="relative aspect-video max-w-4xl mx-auto px-4 mb-8">
          <SanityImageComponent
            image={event.image}
            alt={event.image.alt || event.title}
            fill
            priority
            className="rounded-2xl object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
      )}

      <Container className="max-w-3xl pb-16">
        {event.schedule && event.schedule.length > 0 && (
          <section className="mb-8 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-primary mb-4">Programme</h2>
            <ul className="space-y-3">
              {event.schedule.map((item, i) => (
                <li key={i} className="border-l-4 border-accent pl-4">
                  {item.time && <span className="font-semibold">{item.time} — </span>}
                  {item.activity}
                  {item.description && (
                    <p className="text-sm text-text-light mt-1">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <PortableTextRenderer value={event.content} />
      </Container>
    </article>
  )
}
