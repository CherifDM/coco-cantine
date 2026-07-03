import { Badge } from '@/components/ui/Badge'
import { WeeklyMenuView } from '@/components/menu/WeeklyMenuView'
import { formatWeekLabel } from '@/lib/utils'
import type { MenuWeek } from '@/lib/types'

interface BlogMenuWeekDetailProps {
  week: MenuWeek
}

export function BlogMenuWeekDetail({ week }: BlogMenuWeekDetailProps) {
  const weekLabel = formatWeekLabel(week.weekStart)

  return (
    <article>
      <Badge variant="menu" className="mb-4">Menus de la semaine</Badge>

      <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-5">
        {weekLabel}
      </h1>

      <WeeklyMenuView week={week} compact />
    </article>
  )
}
