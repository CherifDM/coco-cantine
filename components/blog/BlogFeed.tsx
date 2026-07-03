'use client'

import { useState } from 'react'
import { PostCard } from '@/components/blog/PostCard'
import { EventCard } from '@/components/blog/EventCard'
import { MenuWeekCard } from '@/components/blog/MenuWeekCard'
import { BlogItemModal } from '@/components/blog/BlogItemModal'
import type { BlogItem } from '@/lib/types'

interface BlogFeedProps {
  items: BlogItem[]
}

export function BlogFeed({ items }: BlogFeedProps) {
  const [selectedItem, setSelectedItem] = useState<BlogItem | null>(null)

  return (
    <>
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {items.map((item) => {
          const open = () => setSelectedItem(item)

          if (item.kind === 'post') {
            return (
              <PostCard
                key={`post-${item.data._id}`}
                post={item.data}
                onOpen={open}
              />
            )
          }
          if (item.kind === 'event') {
            return (
              <EventCard
                key={`event-${item.data._id}`}
                event={item.data}
                onOpen={open}
              />
            )
          }
          return (
            <MenuWeekCard
              key={`week-${item.data.weekStart}`}
              week={item.data}
              onOpen={open}
            />
          )
        })}
      </div>

      <BlogItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}
