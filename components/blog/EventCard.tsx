import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogCardImage } from '@/components/blog/BlogCardImage'
import { formatDate, EVENT_TYPE_EMOJIS } from '@/lib/utils'
import { getBlogItemHref } from '@/lib/blog'
import type { Event } from '@/lib/types'

interface EventCardProps {
  event: Event
  onOpen: () => void
}

function openOnKeyboard(event: React.KeyboardEvent, onOpen: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onOpen()
  }
}

export function EventCard({ event, onOpen }: EventCardProps) {
  const emoji = EVENT_TYPE_EMOJIS[event.type] || '📅'
  const href = getBlogItemHref({ kind: 'event', date: event.date, data: event })

  return (
    <Card as="article" hover className="overflow-hidden flex flex-col md:flex-row md:min-h-[220px]">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => openOnKeyboard(e, onOpen)}
        className="md:w-1/2 shrink-0 cursor-pointer"
        aria-label={`Aperçu : ${event.title}`}
      >
        <BlogCardImage
          image={event.image}
          alt={event.image?.alt || event.title}
          fallback={<span className="text-5xl" aria-hidden="true">{emoji}</span>}
          fallbackClassName="bg-accent/20"
        />
      </div>

      <CardContent className="flex flex-col flex-1 !py-5 !px-6 md:!py-6">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => openOnKeyboard(e, onOpen)}
          className="flex-1 cursor-pointer text-left"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="event">Événement</Badge>
            <time dateTime={event.date} className="text-sm text-muted">
              {formatDate(event.date)}
            </time>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
            {emoji} {event.title}
          </h3>
          <p className="text-muted line-clamp-3">{event.description}</p>
          {event.price && (
            <p className="mt-2 text-sm font-semibold text-secondary">{event.price}</p>
          )}
        </div>
        <div className="flex justify-end mt-3 shrink-0">
          <Button href={href} variant="ghost" size="sm" className="text-accent font-bold">
            En savoir plus →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
