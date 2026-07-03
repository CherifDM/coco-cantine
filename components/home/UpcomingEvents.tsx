import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent, CardImage } from '@/components/ui/Card'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { formatDateShort } from '@/lib/utils'
import type { Event } from '@/lib/types'

const EVENT_EMOJIS: Record<string, string> = {
  concert: '🎵',
  karaoke: '🎤',
  bal: '💃',
  atelier: '🎨',
  apero: '🍷',
  other: '🎪',
}

interface UpcomingEventsProps {
  events?: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) return null

  return (
    <Section ariaLabelledby="events-title">
      <Container>
        <SectionHeader
          id="events-title"
          title="Prochains événements"
          subtitle="Concerts, karaokés, ateliers… il se passe toujours quelque chose à La Coco !"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card as="article" key={event._id} hover>
              <CardImage>
                {event.image?.asset ? (
                  <SanityImageComponent
                    image={event.image}
                    alt={event.image.alt || event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[180px] bg-accent/20 flex items-center justify-center text-5xl">
                    {EVENT_EMOJIS[event.type] || '📅'}
                  </div>
                )}
              </CardImage>
              <CardContent>
                <time dateTime={event.date} className="text-sm text-secondary font-bold">
                  {formatDateShort(event.date)}
                </time>
                <h3 className="text-lg font-bold mt-1 mb-2 text-primary">{event.title}</h3>
                <p className="text-muted text-sm line-clamp-2">{event.description}</p>
                {event.price && (
                  <p className="mt-3 text-sm font-semibold text-accent">{event.price}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/blog?filter=events"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            Voir tous les événements →
          </Link>
        </div>
      </Container>
    </Section>
  )
}
