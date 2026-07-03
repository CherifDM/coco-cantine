import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { formatDateTime, EVENT_TYPE_EMOJIS } from '@/lib/utils'
import type { Event } from '@/lib/types'

interface BlogEventDetailProps {
  event: Event
}

export function BlogEventDetail({ event }: BlogEventDetailProps) {
  const emoji = EVENT_TYPE_EMOJIS[event.type] || '📅'

  return (
    <article>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge variant="event">Événement</Badge>
        <time dateTime={event.date} className="text-muted text-sm">
          {formatDateTime(event.date)}
        </time>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-4">
        {emoji} {event.title}
      </h1>

      <p className="text-lg text-muted mb-5">{event.description}</p>

      <dl className="mb-5 space-y-2 text-sm">
        {event.price && (
          <div>
            <dt className="font-bold inline text-secondary">Prix : </dt>
            <dd className="inline text-muted">{event.price}</dd>
          </div>
        )}
        {event.location && (
          <div>
            <dt className="font-bold inline text-secondary">Lieu : </dt>
            <dd className="inline text-muted">{event.location}</dd>
          </div>
        )}
        {event.organizer && (
          <div>
            <dt className="font-bold inline text-secondary">Organisation : </dt>
            <dd className="inline text-muted">{event.organizer}</dd>
          </div>
        )}
      </dl>

      {event.image?.asset && (
        <div className="mb-6 rounded-xl overflow-hidden bg-light/30 p-2">
          <SanityImageComponent
            image={event.image}
            alt={event.image.alt || event.title}
            width={1200}
            height={1600}
            objectFit="contain"
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      {event.schedule && event.schedule.length > 0 && (
        <section className="mb-6 rounded-xl bg-white p-5 shadow-sm border-2 border-light">
          <h2 className="text-lg font-bold text-primary mb-3">Programme</h2>
          <ul className="space-y-2">
            {event.schedule.map((item, i) => (
              <li key={i} className="border-l-4 border-accent pl-3 text-sm">
                {item.time && <span className="font-bold text-secondary">{item.time} — </span>}
                {item.activity}
                {item.description && (
                  <p className="text-muted mt-0.5">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <PortableTextRenderer value={event.content} />
    </article>
  )
}
