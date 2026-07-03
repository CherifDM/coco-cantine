import { groq } from 'next-sanity'

/** Fragment réutilisable pour les images Sanity */
const imageFields = groq`
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  },
  alt,
  caption
`

/** Champs d'un plat (document dish déréférencé) */
const dishFields = groq`
  _id,
  name,
  description,
  isVegan,
  isGlutenFree,
  seasonal,
  image { ${imageFields} }
`

/** Groupes de plats avec références dish résolues */
const menuCourseGroupsFields = groq`
  _key,
  "dishes": dishes[]->{ ${dishFields} }
`

/** Champs complets d'un menu du jour */
export const menuOfTheDayFields = groq`
  _id,
  date,
  specialNote,
  isClosed,
  starters[]{ ${menuCourseGroupsFields} },
  mainCourses[]{ ${menuCourseGroupsFields} },
  desserts[]{ ${menuCourseGroupsFields} }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    address,
    phone,
    email,
    lunchHours,
    eveningHours,
    socialLinks,
    heroImage { ${imageFields} },
    aboutText,
    pricesText,
    partnersIntroText
  }
`

/** Menu du jour le plus récent */
export const menuOfTheDayQuery = groq`
  *[_type == "menuOfTheDay"] | order(date desc)[0]{
    ${menuOfTheDayFields}
  }
`

/** Tous les menus du jour (pour regroupement par semaine) */
export const allMenusOfTheDayQuery = groq`
  *[_type == "menuOfTheDay"] | order(date desc){
    ${menuOfTheDayFields}
  }
`

/** Menus du jour d'une semaine donnée */
export const menusForWeekQuery = groq`
  *[_type == "menuOfTheDay" && date >= $weekStart && date <= $weekEnd] | order(date asc){
    ${menuOfTheDayFields}
  }
`

/** Photos de la galerie (limitées) */
export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc)[0...$limit]{
    _id,
    title,
    image { ${imageFields} },
    alt,
    caption,
    category
  }
`

/** Événements à venir */
export const upcomingEventsQuery = groq`
  *[_type == "event" && isPublished == true && date >= now()] | order(date asc)[0...$limit]{
    _id,
    title,
    type,
    date,
    endDate,
    description,
    image { ${imageFields} },
    price,
    location,
    featured
  }
`

/** Tous les articles publiés */
export const postsQuery = groq`
  *[_type == "post" && isDraft != true] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage { ${imageFields} },
    publishedAt,
    author
  }
`

/** Tous les événements publiés */
export const blogEventsQuery = groq`
  *[_type == "event" && isPublished == true] | order(date desc){
    _id,
    title,
    type,
    date,
    endDate,
    description,
    image { ${imageFields} },
    price,
    location,
    featured
  }
`

/** Article individuel par slug */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && isDraft != true][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    featuredImage { ${imageFields} },
    publishedAt,
    author,
    tags
  }
`

/** Événement individuel par ID */
export const eventByIdQuery = groq`
  *[_type == "event" && _id == $id && isPublished == true][0]{
    _id,
    title,
    type,
    date,
    endDate,
    description,
    content,
    image { ${imageFields} },
    price,
    location,
    organizer,
    schedule[]{ time, activity, description }
  }
`

/** Slugs de tous les articles (pour generateStaticParams) */
export const postSlugsQuery = groq`
  *[_type == "post" && isDraft != true && defined(slug.current)]{
    "slug": slug.current
  }
`

/** IDs de tous les événements publiés */
export const eventIdsQuery = groq`
  *[_type == "event" && isPublished == true]{ _id }
`

/** Tous les partenaires triés */
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc, name asc){
    _id,
    name,
    logo { ${imageFields} },
    website,
    description,
    category,
    isMainPartner,
    order
  }
`

/** Page bénévolat complète avec rôles et témoignages */
export const volunteerPageQuery = groq`
  *[_type == "volunteerPage"][0]{
    _id,
    title,
    heroImage { ${imageFields} },
    introText,
    signalGroupLink,
    signalGroupText,
    summary[]{ label, anchor },
    whoWeAre,
    "roles": roles[]->{
      _id,
      title,
      slug,
      icon,
      description,
      content,
      schedule,
      requirements,
      isActive,
      order
    } | order(order asc),
    "testimonials": testimonials[]->{
      _id,
      name,
      role,
      photo { ${imageFields} },
      testimonial,
      featured
    } | order(order asc),
    contactEmail,
    seoDescription
  }
`
