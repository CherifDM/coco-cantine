import { Hero } from '@/components/home/Hero'
import { Pillars } from '@/components/home/Pillars'
import { HoursAndPrices } from '@/components/home/HoursAndPrices'
import { MenuPreview } from '@/components/home/MenuPreview'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { UpcomingEvents } from '@/components/home/UpcomingEvents'
import { CallToAction } from '@/components/home/CallToAction'
import { fetchSanity } from '@/lib/fetch'
import {
  siteSettingsQuery,
  menuOfTheDayQuery,
  galleryImagesQuery,
  upcomingEventsQuery,
} from '@/sanity/lib/queries'
import type { SiteSettings, MenuOfTheDay, GalleryImage, Event } from '@/lib/types'

export default async function HomePage() {
  const [settings, menu, gallery, events] = await Promise.all([
    fetchSanity<SiteSettings>(siteSettingsQuery),
    fetchSanity<MenuOfTheDay>(menuOfTheDayQuery),
    fetchSanity<GalleryImage[]>(galleryImagesQuery, { limit: 8 }),
    fetchSanity<Event[]>(upcomingEventsQuery, { limit: 3 }),
  ])

  return (
    <>
      <Hero settings={settings} />
      <Pillars />
      <HoursAndPrices settings={settings} />
      <MenuPreview menu={menu} />
      <UpcomingEvents events={events ?? undefined} />
      <GalleryPreview images={gallery ?? undefined} />
      <CallToAction settings={settings} />
    </>
  )
}
