import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatWeekLabel } from '@/lib/utils'
import { getMenuWeekSummary } from '@/lib/blog'
import type { MenuWeek } from '@/lib/types'

interface MenuWeekCardProps {
  week: MenuWeek
}

/** Carte d'une semaine de menus pour la liste blog */
export function MenuWeekCard({ week }: MenuWeekCardProps) {
  const summary = getMenuWeekSummary(week)
  const previewDishes = week.dailyMenus
    .filter((m) => !m.isClosed)
    .flatMap((m) => m.mainCourses ?? [])
    .flatMap((g) => g.dishes ?? [])
    .slice(0, 3)
    .map((d) => d.name)
    .join(', ')

  return (
    <Card as="article" className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/blog/menus/${week.weekStart}`} className="flex flex-col h-full">
        <div className="aspect-video bg-primary/10 flex items-center justify-center">
          <span className="text-5xl" aria-hidden="true">🍽️</span>
        </div>
        <CardContent className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="category">Menus</Badge>
            <time dateTime={week.weekStart} className="text-sm text-text-light">
              {formatWeekLabel(week.weekStart)}
            </time>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            {formatWeekLabel(week.weekStart)}
          </h3>
          <p className="text-text-light text-sm mb-2">{summary}</p>
          {previewDishes && (
            <p className="text-text-light text-sm line-clamp-2 flex-1">{previewDishes}</p>
          )}
          <span className="mt-4 text-primary font-semibold text-sm">Voir les menus →</span>
        </CardContent>
      </Link>
    </Card>
  )
}
