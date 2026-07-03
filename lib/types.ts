import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'

/** Image Sanity avec métadonnées optionnelles */
export interface SanityImage {
  asset?: SanityImageSource
  alt?: string
  caption?: string
}

/** Plat (document dish déréférencé) */
export interface Dish {
  _id: string
  name: string
  description?: string
  isVegan?: boolean
  isGlutenFree?: boolean
  seasonal?: boolean
  image?: SanityImage
}

/** Groupe de plats servis ensemble (une option au choix) */
export interface MenuCourseGroup {
  _key?: string
  dishes: Dish[]
}

/** Menu du jour */
export interface MenuOfTheDay {
  _id: string
  date: string
  specialNote?: string
  isClosed?: boolean
  starters?: MenuCourseGroup[]
  mainCourses?: MenuCourseGroup[]
  desserts?: MenuCourseGroup[]
}

/** Semaine de menus (regroupés côté frontend) */
export interface MenuWeek {
  weekStart: string
  dailyMenus: MenuOfTheDay[]
}

/** Paramètres globaux du site */
export interface SiteSettings {
  title: string
  tagline?: string
  address?: string
  phone?: string
  email?: string
  lunchHours?: string
  eveningHours?: string
  socialLinks?: {
    instagram?: string
    signal?: string
    helloasso?: string
    facebook?: string
  }
  heroImage?: SanityImage
  aboutText?: PortableTextBlock[]
  menuPhilosophyText?: PortableTextBlock[]
  pricesText?: PortableTextBlock[]
  pricesImage?: SanityImage
  usefulLinksIntro?: string
  usefulLinksText?: PortableTextBlock[]
  partnersIntroText?: PortableTextBlock[]
}

/** Article de blog */
export interface Post {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content?: PortableTextBlock[]
  featuredImage?: SanityImage
  publishedAt: string
  author?: string
  tags?: string[]
}

/** Événement */
export interface Event {
  _id: string
  title: string
  type: string
  date: string
  endDate?: string
  description: string
  content?: PortableTextBlock[]
  image?: SanityImage
  price?: string
  location?: string
  organizer?: string
  schedule?: { time?: string; activity?: string; description?: string }[]
  featured?: boolean
}

/** Photo de galerie */
export interface GalleryImage {
  _id: string
  title?: string
  image: SanityImage
  alt: string
  caption?: string
  category?: string
}

/** Partenaire */
export interface Partner {
  _id: string
  name: string
  logo: SanityImage
  website?: string
  description?: PortableTextBlock[]
  category: 'public' | 'private' | 'association' | 'eco' | 'other'
  isMainPartner?: boolean
  order?: number
}

/** Rôle bénévole */
export interface VolunteerRole {
  _id: string
  title: string
  slug?: { current: string }
  icon?: string
  description?: string
  content?: PortableTextBlock[]
  schedule?: string
  requirements?: string[]
  isActive?: boolean
  order?: number
}

/** Témoignage bénévole */
export interface VolunteerTestimonial {
  _id: string
  name: string
  role?: string
  photo?: SanityImage
  testimonial: string
  featured?: boolean
}

/** Page Rejoindre */
export interface VolunteerPage {
  _id: string
  title: string
  heroImage?: SanityImage
  introText?: PortableTextBlock[]
  signalGroupLink?: string
  signalGroupText?: string
  summary?: { label: string; anchor?: string }[]
  whoWeAre?: PortableTextBlock[]
  roles?: VolunteerRole[]
  testimonials?: VolunteerTestimonial[]
  contactEmail?: string
  seoDescription?: string
}

/** Filtre de la page blog */
export type BlogFilter = 'all' | 'articles' | 'events' | 'menus'

/** Élément unifié affiché sur la page blog */
export type BlogItem =
  | { kind: 'post'; date: string; data: Post }
  | { kind: 'event'; date: string; data: Event }
  | { kind: 'menuWeek'; date: string; data: MenuWeek }
