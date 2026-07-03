import Link from 'next/link'
import { Card, CardContent, CardImage } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { formatDate, EVENT_TYPE_EMOJIS } from '@/lib/utils'
import type { Event } from '@/lib/types'

interface EventCardProps {
  event: Event
}

/** Carte d'événement pour la liste blog */
export function EventCard({ event }: EventCardProps) {
  const emoji = EVENT_TYPE_EMOJIS[event.type] || '📅'

  return (
    <Card as="article" className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/blog/evenements/${event._id}`} className="flex flex-col h-full">
        <CardImage>
          {event.image?.asset ? (
            <SanityImageComponent
              image={event.image}
              alt={event.image.alt || event.title}
              fill
              className="transition-transform hover:scale-105 duration-300"
            />
          ) : (
            <div className="w-full h-full bg-accent/20 flex items-center justify-center text-5xl">
              {emoji}
            </div>
          )}
        </CardImage>
        <CardContent className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="category">Événement</Badge>
            <time dateTime={event.date} className="text-sm text-text-light">
              {formatDate(event.date)}
            </time>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
            {emoji} {event.title}
          </h3>
          <p className="text-text-light text-sm line-clamp-3 flex-1">{event.description}</p>
          {event.price && (
            <p className="mt-2 text-sm font-medium text-primary">{event.price}</p>
          )}
          <span className="mt-4 text-primary font-semibold text-sm">En savoir plus →</span>
        </CardContent>
      </Link>
    </Card>
  )
}
