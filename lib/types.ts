import type { PortableTextBlock } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'

/** Image Sanity avec métadonnées optionnelles */
export interface SanityImage {
  asset?: SanityImageSource
  alt?: string
  caption?: string
}

/** Plat de menu (entrée, plat ou dessert) */
export interface MenuItem {
  name: string
  isVegan?: boolean
  isGlutenFree?: boolean
  description?: string
}

/** Menu du jour */
export interface MenuOfTheDay {
  _id: string
  date: string
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
  specialNote?: string
  starters?: MenuItem[]
  mainCourses: MenuItem[]
  desserts?: MenuItem[]
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
  pricesText?: PortableTextBlock[]
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
  category?: 'article' | 'menus' | 'events' | 'info'
}

/** Événement à venir */
export interface Event {
  _id: string
  title: string
  type: string
  date: string
  endDate?: string
  description: string
  image?: SanityImage
  price?: string
  location?: string
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
  description?: string
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

/** Catégories de blog pour le filtre */
export type PostCategory = 'all' | 'menus' | 'events' | 'article'
