import { Badge } from '@/components/ui/Badge'
import type { Dish, MenuCourseGroup } from '@/lib/types'

interface DishItemProps {
  dish: Dish
}

/** Affichage d'un plat avec badges V et SG */
export function DishItem({ dish }: DishItemProps) {
  return (
    <li className="flex flex-wrap items-center gap-2 py-0.5">
      <span>{dish.name}</span>
      {dish.isVegan && <Badge variant="vegan">V</Badge>}
      {dish.isGlutenFree && <Badge variant="glutenFree">SG</Badge>}
      {dish.seasonal && (
        <Badge variant="default">Saison</Badge>
      )}
      {dish.description && (
        <span className="w-full text-sm text-text-light">{dish.description}</span>
      )}
    </li>
  )
}

interface MenuCourseSectionProps {
  title: string
  groups?: MenuCourseGroup[]
}

/** Affichage d'une section (entrées, plats, desserts) avec groupes au choix */
export function MenuCourseSection({ title, groups }: MenuCourseSectionProps) {
  if (!groups || groups.length === 0) return null

  const hasMultipleGroups = groups.length > 1

  return (
    <div className="mb-5 last:mb-0">
      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
      {hasMultipleGroups && (
        <p className="text-sm text-text-light mb-3">
          Au choix — les plats d&apos;une même option sont servis ensemble
        </p>
      )}

      <div className="space-y-3">
        {groups.map((group, groupIndex) => {
          const dishes = group.dishes?.filter((d) => d?.name) ?? []
          if (dishes.length === 0) return null

          return (
            <div key={group._key ?? groupIndex}>
              {hasMultipleGroups && (
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5">
                  Option {groupIndex + 1}
                </p>
              )}
              <div
                className={`rounded-xl border-2 p-4 ${
                  hasMultipleGroups
                    ? 'border-primary/20 bg-primary/5'
                    : 'border-transparent bg-background/60'
                }`}
              >
                <ul className="space-y-1">
                  {dishes.map((dish) => (
                    <DishItem key={dish._id} dish={dish} />
                  ))}
                </ul>
                {dishes.length > 1 && (
                  <p className="mt-2 text-xs text-text-light italic">
                    Servis ensemble
                  </p>
                )}
              </div>
              {hasMultipleGroups && groupIndex < groups.length - 1 && (
                <p
                  className="text-center text-sm font-semibold text-secondary my-2"
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
}

/** Affichage d'un menu complet (entrées, plats, desserts) */
export function MenuDay({
  starters,
  mainCourses,
  desserts,
  specialNote,
  dayLabel,
  isClosed,
}: MenuDayProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      {dayLabel && (
        <h3 className="text-xl font-bold text-primary mb-4">{dayLabel}</h3>
      )}
      {specialNote && (
        <p className="text-sm text-secondary italic mb-4">{specialNote}</p>
      )}

      {isClosed ? (
        <p className="text-text-light font-medium">Cantine fermée ce jour-là</p>
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
