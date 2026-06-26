import { Badge } from '@/components/ui/Badge'
import type { MenuItem } from '@/lib/types'

interface DishItemProps {
  item: MenuItem
}

/** Affichage d'un plat avec badges V et SG */
export function DishItem({ item }: DishItemProps) {
  return (
    <li className="flex flex-wrap items-center gap-2 py-1">
      <span>{item.name}</span>
      {item.isVegan && <Badge variant="vegan">V</Badge>}
      {item.isGlutenFree && <Badge variant="glutenFree">SG</Badge>}
    </li>
  )
}

interface MenuDayProps {
  starters?: MenuItem[]
  mainCourses: MenuItem[]
  desserts?: MenuItem[]
  specialNote?: string
  dayLabel?: string
}

/** Affichage d'un menu complet (entrées, plats, desserts) */
export function MenuDay({ starters, mainCourses, desserts, specialNote, dayLabel }: MenuDayProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      {dayLabel && (
        <h3 className="text-xl font-bold text-primary mb-4">{dayLabel}</h3>
      )}
      {specialNote && (
        <p className="text-sm text-secondary italic mb-4">{specialNote}</p>
      )}

      {starters && starters.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">Entrées</h4>
          <ul className="space-y-1">
            {starters.map((item, i) => (
              <DishItem key={i} item={item} />
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h4 className="font-semibold text-foreground mb-2">Plats</h4>
        <ul className="space-y-1">
          {mainCourses.map((item, i) => (
            <DishItem key={i} item={item} />
          ))}
        </ul>
      </div>

      {desserts && desserts.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Desserts</h4>
          <ul className="space-y-1">
            {desserts.map((item, i) => (
              <DishItem key={i} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
