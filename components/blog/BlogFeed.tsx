import { PostCard } from '@/components/blog/PostCard'
import { EventCard } from '@/components/blog/EventCard'
import { MenuWeekCard } from '@/components/blog/MenuWeekCard'
import type { BlogItem } from '@/lib/types'

interface BlogFeedProps {
  items: BlogItem[]
}

/** Grille de contenu blog (articles, événements, menus) */
export function BlogFeed({ items }: BlogFeedProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        if (item.kind === 'post') {
          return <PostCard key={`post-${item.data._id}`} post={item.data} />
        }
        if (item.kind === 'event') {
          return <EventCard key={`event-${item.data._id}`} event={item.data} />
        }
        return <MenuWeekCard key={`week-${item.data.weekStart}`} week={item.data} />
      })}
    </div>
  )
}
