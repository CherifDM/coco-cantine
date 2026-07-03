import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatWeekLabel } from '@/lib/utils'
import { getBlogItemHref, getMenuWeekSummary } from '@/lib/blog'
import type { MenuWeek } from '@/lib/types'

interface MenuWeekCardProps {
  week: MenuWeek
  onOpen: () => void
}

function openOnKeyboard(event: React.KeyboardEvent, onOpen: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onOpen()
  }
}

export function MenuWeekCard({ week, onOpen }: MenuWeekCardProps) {
  const weekLabel = formatWeekLabel(week.weekStart)
  const href = getBlogItemHref({ kind: 'menuWeek', date: week.weekStart, data: week })
  const summary = getMenuWeekSummary(week)
  const previewDishes = week.dailyMenus
    .filter((m) => !m.isClosed)
    .flatMap((m) => m.mainCourses ?? [])
    .flatMap((g) => g.dishes ?? [])
    .slice(0, 3)
    .map((d) => d.name)
    .join(', ')

  return (
    <Card as="article" hover variant="light" className="overflow-hidden flex flex-col md:flex-row md:min-h-[220px]">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => openOnKeyboard(e, onOpen)}
        className="md:w-1/2 shrink-0 cursor-pointer bg-highlight/30 flex items-center justify-center min-h-[180px] md:min-h-[220px] md:h-full"
        aria-label={`Aperçu : menus ${weekLabel}`}
      >
        <span className="text-6xl" aria-hidden="true">🍽️</span>
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
            <Badge variant="menu">Menus</Badge>
            <time dateTime={week.weekStart} className="text-sm text-muted">
              {weekLabel}
            </time>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">{weekLabel}</h3>
          <p className="text-muted mb-1">{summary}</p>
          {previewDishes && (
            <p className="text-muted text-sm line-clamp-2">{previewDishes}</p>
          )}
        </div>
        <div className="flex justify-end mt-3 shrink-0">
          <Button href={href} variant="ghost" size="sm" className="text-accent font-bold">
            Voir les menus →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
