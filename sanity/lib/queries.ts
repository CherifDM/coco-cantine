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

/** Paramètres globaux du site (singleton) */
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

/** Menu du jour le plus récent (aujourd'hui ou le dernier publié) */
export const menuOfTheDayQuery = groq`
  *[_type == "menuOfTheDay"] | order(date desc)[0]{
    _id,
    date,
    dayOfWeek,
    specialNote,
    starters[]{ name, isVegan, isGlutenFree, description },
    mainCourses[]{ name, isVegan, isGlutenFree, description },
    desserts[]{ name, isVegan, isGlutenFree, description }
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

/** Liste paginée des articles de blog */
export const postsQuery = groq`
  *[_type == "post" && isDraft != true && (
    $category == "all" ||
    category == $category ||
    ($category == "article" && category == "info")
  )]
  | order(publishedAt desc)[$start...$end]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage { ${imageFields} },
    publishedAt,
    author,
    category
  }
`

/** Nombre total d'articles (pour la pagination) */
export const postsCountQuery = groq`
  count(*[_type == "post" && isDraft != true && (
    $category == "all" ||
    category == $category ||
    ($category == "article" && category == "info")
  )])
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
    category,
    tags
  }
`

/** Slugs de tous les articles (pour generateStaticParams) */
export const postSlugsQuery = groq`
  *[_type == "post" && isDraft != true && defined(slug.current)]{
    "slug": slug.current
  }
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
