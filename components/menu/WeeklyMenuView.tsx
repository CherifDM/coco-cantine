import { MenuDay } from '@/components/menu/MenuDay'
import { formatMenuDayLabel } from '@/lib/utils'
import type { MenuWeek } from '@/lib/types'

interface WeeklyMenuViewProps {
  week: MenuWeek
  className?: string
  compact?: boolean
}

export function WeeklyMenuView({ week, className = '', compact = false }: WeeklyMenuViewProps) {
  const dailyMenus = (week.dailyMenus ?? []).filter(
    (dailyMenu) => dailyMenu?._id && dailyMenu?.date,
  )

  return (
    <div className={`${compact ? 'space-y-2' : 'space-y-6'} ${className}`}>
      {dailyMenus.length === 0 ? (
        <p className="text-center text-muted">Aucun menu pour cette semaine.</p>
      ) : (
        dailyMenus.map((dailyMenu) => (
          <MenuDay
            key={dailyMenu._id}
            dayLabel={formatMenuDayLabel(dailyMenu.date)}
            starters={dailyMenu.starters}
            mainCourses={dailyMenu.mainCourses}
            desserts={dailyMenu.desserts}
            specialNote={dailyMenu.specialNote}
            isClosed={dailyMenu.isClosed}
            compact={compact}
          />
        ))
      )}
    </div>
  )
}
