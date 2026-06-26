import { type SchemaTypeDefinition } from 'sanity'

import { dish } from './dish'
import { menuOfTheDay } from './menuOfTheDay'
import { weeklyMenu } from './weeklyMenu'
import { post } from './post'
import { event } from './event'
import { partner } from './partner'
import { volunteerRole } from './volunteerRole'           // 👈 Nouveau
import { volunteerTestimonial } from './volunteerTestimonial' // 👈 Nouveau
import { volunteerPage } from './volunteerPage'           // 👈 Nouveau
import { siteSettings } from './siteSettings'
import { galleryImage } from './galleryImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    dish,
    menuOfTheDay,
    weeklyMenu,
    post,
    event,
    partner,
    volunteerRole,        // 👈 Ajouté
    volunteerTestimonial, // 👈 Ajouté
    volunteerPage,        // 👈 Ajouté
    siteSettings,
    galleryImage,
  ],
}