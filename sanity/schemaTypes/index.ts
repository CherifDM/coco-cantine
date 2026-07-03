import { type SchemaTypeDefinition } from 'sanity'

import { dish } from './dish'
import { menuOfTheDay } from './menuOfTheDay'
import { post } from './post'
import { event } from './event'
import { partner } from './partner'
import { volunteerRole } from './volunteerRole'
import { volunteerTestimonial } from './volunteerTestimonial'
import { volunteerPage } from './volunteerPage'
import { siteSettings } from './siteSettings'
import { galleryImage } from './galleryImage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    dish,
    menuOfTheDay,
    post,
    event,
    partner,
    volunteerRole,
    volunteerTestimonial,
    volunteerPage,
    siteSettings,
    galleryImage,
  ],
}
