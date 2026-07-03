import type { MenuOfTheDay, MenuWeek } from '@/lib/types'

/** Retourne le lundi de la semaine (YYYY-MM-DD) pour une date donnée */
export function getWeekStartKey(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const weekday = date.getDay()
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday
  date.setDate(date.getDate() + mondayOffset)

  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Retourne le dimanche de la semaine (YYYY-MM-DD) à partir du lundi */
export function getWeekEndKey(weekStart: string): string {
  const [year, month, day] = weekStart.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() + 6)

  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Regroupe les menus du jour par semaine (clé = lundi) */
export function groupMenusByWeek(menus: MenuOfTheDay[]): MenuWeek[] {
  const byWeek = new Map<string, MenuOfTheDay[]>()

  for (const menu of menus) {
    if (!menu.date) continue
    const weekStart = getWeekStartKey(menu.date)
    const existing = byWeek.get(weekStart) ?? []
    existing.push(menu)
    byWeek.set(weekStart, existing)
  }

  return Array.from(byWeek.entries())
    .map(([weekStart, dailyMenus]) => ({
      weekStart,
      dailyMenus: dailyMenus.sort((a, b) => a.date.localeCompare(b.date)),
    }))
    .sort((a, b) => b.weekStart.localeCompare(a.weekStart))
}
