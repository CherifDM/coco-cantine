import { Badge } from '@/components/ui/Badge'
import type { Dish, MenuCourseGroup } from '@/lib/types'

interface DishItemProps {
  dish: Dish
  compact?: boolean
}

export function DishItem({ dish, compact = false }: DishItemProps) {
  return (
    <li className={`flex flex-wrap items-center gap-1.5 ${compact ? 'py-0' : 'py-0.5'}`}>
      <span className={compact ? 'text-sm text-dark' : 'text-dark'}>{dish.name}</span>
      {dish.isVegan && <Badge variant="vegan">V</Badge>}
      {dish.isGlutenFree && <Badge variant="glutenFree">SG</Badge>}
      {dish.seasonal && <Badge variant="highlight">Saison</Badge>}
      {dish.description && (
        <span className={`w-full text-muted ${compact ? 'text-xs' : 'text-sm'}`}>
          {dish.description}
        </span>
      )}
    </li>
  )
}

interface MenuCourseSectionProps {
  title: string
  groups?: MenuCourseGroup[]
  compact?: boolean
}

export function MenuCourseSection({ title, groups, compact = false }: MenuCourseSectionProps) {
  if (!groups || groups.length === 0) return null

  const hasMultipleGroups = groups.length > 1

  return (
    <div className={compact ? 'mb-2 last:mb-0' : 'mb-5 last:mb-0'}>
      <h4 className={`font-bold text-primary ${compact ? 'text-sm mb-0.5' : 'mb-1'}`}>
        {title}
      </h4>
      {hasMultipleGroups && (
        <p className={`text-muted ${compact ? 'text-xs mb-1.5' : 'text-sm mb-3'}`}>
          Au choix — servis ensemble par option
        </p>
      )}

      <div className={compact ? 'space-y-1.5' : 'space-y-3'}>
        {groups.map((group, groupIndex) => {
          const dishes = group.dishes?.filter((d) => d?.name) ?? []
          if (dishes.length === 0) return null

          return (
            <div key={group._key ?? groupIndex}>
              {hasMultipleGroups && (
                <p className="text-[10px] font-bold uppercase tracking-wide text-secondary mb-1">
                  Option {groupIndex + 1}
                </p>
              )}
              <div
                className={`rounded-lg border ${
                  hasMultipleGroups
                    ? 'border-primary/15 bg-light/40'
                    : 'border-transparent bg-background/60'
                } ${compact ? 'p-2' : 'border-2 p-4 rounded-xl'}`}
              >
                <ul className={compact ? 'space-y-0.5' : 'space-y-1'}>
                  {dishes.map((dish) => (
                    <DishItem key={dish._id} dish={dish} compact={compact} />
                  ))}
                </ul>
                {dishes.length > 1 && (
                  <p className={`text-muted italic ${compact ? 'text-[10px] mt-1' : 'text-xs mt-2'}`}>
                    Servis ensemble
                  </p>
                )}
              </div>
              {hasMultipleGroups && groupIndex < groups.length - 1 && (
                <p
                  className={`text-center font-bold text-accent ${compact ? 'text-xs my-1' : 'text-sm my-2'}`}
                  aria-hidden="true"
                >
                  ou
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface MenuDayProps {
  starters?: MenuCourseGroup[]
  mainCourses?: MenuCourseGroup[]
  desserts?: MenuCourseGroup[]
  specialNote?: string
  dayLabel?: string
  isClosed?: boolean
  compact?: boolean
}

export function MenuDay({
  starters,
  mainCourses,
  desserts,
  specialNote,
  dayLabel,
  isClosed,
  compact = false,
}: MenuDayProps) {
  if (compact) {
    return (
      <div className="rounded-xl bg-white border border-light overflow-hidden">
        {dayLabel && (
          <div className="bg-primary/10 px-3 py-1.5 border-b border-light">
            <h3 className="text-sm font-bold text-primary">{dayLabel}</h3>
          </div>
        )}
        <div className="p-3">
          {specialNote && (
            <p className="text-xs text-secondary font-medium italic mb-2 bg-highlight/30 rounded px-2 py-1">
              {specialNote}
            </p>
          )}

          {isClosed ? (
            <p className="text-muted text-sm font-medium">Cantine fermée</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              <MenuCourseSection title="Entrées" groups={starters} compact />
              <MenuCourseSection title="Plats" groups={mainCourses} compact />
              <MenuCourseSection title="Desserts" groups={desserts} compact />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-md border-2 border-light">
      {dayLabel && (
        <h3 className="text-xl font-bold text-primary mb-4">{dayLabel}</h3>
      )}
      {specialNote && (
        <p className="text-sm text-secondary font-medium italic mb-4 bg-highlight/30 rounded-lg px-4 py-2">
          {specialNote}
        </p>
      )}

      {isClosed ? (
        <p className="text-muted font-medium">Cantine fermée ce jour-là</p>
      ) : (
        <>
          <MenuCourseSection title="Entrées" groups={starters} />
          <MenuCourseSection title="Plats" groups={mainCourses} />
          <MenuCourseSection title="Desserts" groups={desserts} />
        </>
      )}
    </div>
  )
}
