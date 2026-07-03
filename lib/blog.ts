import { groupMenusByWeek } from '@/lib/groupMenusByWeek'
import type { BlogItem, BlogFilter, Event, MenuWeek, Post } from '@/lib/types'
import type { MenuOfTheDay } from '@/lib/types'

/** Construit la liste unifiée du blog triée par date décroissante */
export function buildBlogItems(
  posts: Post[],
  events: Event[],
  menus: MenuOfTheDay[],
): BlogItem[] {
  const weeks = groupMenusByWeek(menus)

  const items: BlogItem[] = [
    ...posts.map((post) => ({
      kind: 'post' as const,
      date: post.publishedAt,
      data: post,
    })),
    ...events.map((event) => ({
      kind: 'event' as const,
      date: event.date,
      data: event,
    })),
    ...weeks.map((week) => ({
      kind: 'menuWeek' as const,
      date: week.weekStart,
      data: week,
    })),
  ]

  return items.sort((a, b) => b.date.localeCompare(a.date))
}

/** Filtre et pagine les éléments du blog */
export function paginateBlogItems(
  items: BlogItem[],
  filter: BlogFilter,
  start: number,
  end: number,
): { items: BlogItem[]; total: number } {
  const filtered =
    filter === 'all'
      ? items
      : items.filter((item) => {
          if (filter === 'articles') return item.kind === 'post'
          if (filter === 'events') return item.kind === 'event'
          if (filter === 'menus') return item.kind === 'menuWeek'
          return true
        })

  return {
    items: filtered.slice(start, end),
    total: filtered.length,
  }
}

/** Construit les éléments pour un filtre spécifique (sans tout charger en mémoire si possible) */
export function buildFilteredBlogItems(
  filter: BlogFilter,
  posts: Post[],
  events: Event[],
  menus: MenuOfTheDay[],
): BlogItem[] {
  if (filter === 'articles') {
    return posts.map((post) => ({ kind: 'post' as const, date: post.publishedAt, data: post }))
  }
  if (filter === 'events') {
    return events.map((event) => ({ kind: 'event' as const, date: event.date, data: event }))
  }
  if (filter === 'menus') {
    return groupMenusByWeek(menus).map((week) => ({
      kind: 'menuWeek' as const,
      date: week.weekStart,
      data: week,
    }))
  }
  return buildBlogItems(posts, events, menus)
}

export function getMenuWeekSummary(week: MenuWeek): string {
  const openDays = week.dailyMenus.filter((m) => !m.isClosed).length
  const total = week.dailyMenus.length
  if (total === 0) return 'Aucun menu'
  if (openDays === total) {
    return `${total} jour${total > 1 ? 's' : ''} de menu`
  }
  return `${openDays} jour${openDays > 1 ? 's' : ''} ouvert${openDays > 1 ? 's' : ''} sur ${total}`
}
