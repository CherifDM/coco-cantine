import { Hero } from '@/components/home/Hero'
import { Pillars } from '@/components/home/Pillars'
import { GalleryPreview } from '@/components/home/GalleryPreview'
import { HoursSection } from '@/components/home/HoursSection'
import { MenusAndPrices } from '@/components/home/MenusAndPrices'
import { UsefulLinks } from '@/components/home/UsefulLinks'
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
      <GalleryPreview images={gallery ?? undefined} />
      <HoursSection settings={settings} />
      <MenusAndPrices menu={menu} settings={settings} />
      <UpcomingEvents events={events ?? undefined} />
      <UsefulLinks settings={settings} />
      <CallToAction settings={settings} />
    </>
  )
}
