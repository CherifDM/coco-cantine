'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { Card, CardContent, CardImage } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BlogItemModal } from '@/components/blog/BlogItemModal'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { getBlogItemHref } from '@/lib/blog'
import { formatDateShort, EVENT_TYPE_EMOJIS } from '@/lib/utils'
import type { BlogItem, Event } from '@/lib/types'

interface UpcomingEventsProps {
  events?: Event[]
}

function openOnKeyboard(e: React.KeyboardEvent, onOpen: () => void) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onOpen()
  }
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [selectedItem, setSelectedItem] = useState<BlogItem | null>(null)

  if (!events || events.length === 0) return null

  return (
    <>
      <Section ariaLabelledby="events-title">
        <Container>
          <SectionHeader
            id="events-title"
            title="Prochains événements"
            subtitle="Concerts, karaokés, ateliers… il se passe toujours quelque chose à La Coco !"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const emoji = EVENT_TYPE_EMOJIS[event.type] || '📅'
              const href = getBlogItemHref({ kind: 'event', date: event.date, data: event })
              const open = () =>
                setSelectedItem({ kind: 'event', date: event.date, data: event })

              return (
                <Card as="article" key={event._id} hover className="overflow-hidden flex flex-col">
                  <button
                    type="button"
                    onClick={open}
                    onKeyDown={(e) => openOnKeyboard(e, open)}
                    className="flex flex-col flex-1 text-left cursor-pointer"
                    aria-label={`Aperçu : ${event.title}`}
                  >
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
                          {emoji}
                        </div>
                      )}
                    </CardImage>
                    <CardContent className="flex flex-col flex-1">
                      <time dateTime={event.date} className="text-sm text-secondary font-bold">
                        {formatDateShort(event.date)}
                      </time>
                      <h3 className="text-lg font-bold mt-1 mb-2 text-primary">
                        {emoji} {event.title}
                      </h3>
                      <p className="text-muted text-sm line-clamp-2 flex-1">{event.description}</p>
                      {event.price && (
                        <p className="mt-3 text-sm font-semibold text-accent">{event.price}</p>
                      )}
                    </CardContent>
                  </button>
                  <div className="px-6 pb-6 -mt-2 flex justify-end">
                    <Button href={href} variant="ghost" size="sm" className="text-accent font-bold">
                      En savoir plus →
                    </Button>
                  </div>
                </Card>
              )
            })}
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

      <BlogItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}
