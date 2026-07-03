import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { WeeklyMenuView } from '@/components/menu/WeeklyMenuView'
import { fetchSanity } from '@/lib/fetch'
import { getWeekEndKey } from '@/lib/groupMenusByWeek'
import { menusForWeekQuery, allMenusOfTheDayQuery } from '@/sanity/lib/queries'
import { formatWeekLabel } from '@/lib/utils'
import type { MenuOfTheDay, MenuWeek } from '@/lib/types'

interface MenuWeekPageProps {
  params: Promise<{ weekStart: string }>
}

export async function generateStaticParams() {
  const menus = await fetchSanity<MenuOfTheDay[]>(allMenusOfTheDayQuery)
  if (!menus) return []

  const weekStarts = new Set<string>()
  for (const menu of menus) {
    if (!menu.date) continue
    const [y, m, d] = menu.date.split('-').map(Number)
    const date = new Date(y, m - 1, d)
    const weekday = date.getDay()
    const mondayOffset = weekday === 0 ? -6 : 1 - weekday
    date.setDate(date.getDate() + mondayOffset)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    weekStarts.add(key)
  }

  return Array.from(weekStarts).map((weekStart) => ({ weekStart }))
}

export async function generateMetadata({ params }: MenuWeekPageProps): Promise<Metadata> {
  const { weekStart } = await params
  return {
    title: formatWeekLabel(weekStart),
    description: `Menus de la semaine du ${formatWeekLabel(weekStart)} à La Coco Cantine.`,
  }
}

export default async function MenuWeekPage({ params }: MenuWeekPageProps) {
  const { weekStart } = await params
  const weekEnd = getWeekEndKey(weekStart)

  const dailyMenus = await fetchSanity<MenuOfTheDay[]>(menusForWeekQuery, {
    weekStart,
    weekEnd,
  })

  if (!dailyMenus || dailyMenus.length === 0) notFound()

  const week: MenuWeek = { weekStart, dailyMenus }

  return (
    <article>
      <header className="bg-white py-12">
        <Container className="max-w-3xl">
          <Link
            href="/blog?filter=menus"
            className="text-primary text-sm font-medium hover:text-secondary mb-6 inline-block"
          >
            ← Retour aux menus
          </Link>

          <Badge variant="category" className="mb-4">Menus de la semaine</Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
            {formatWeekLabel(weekStart)}
          </h1>
        </Container>
      </header>

      <Container className="max-w-3xl pb-16">
        <WeeklyMenuView week={week} />
      </Container>
    </article>
  )
}
