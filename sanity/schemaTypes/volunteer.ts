import { defineType, defineField } from 'sanity'

export const volunteer = defineType({
  name: 'volunteer',
  title: 'Bénévole',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Rôle dans l\'association (ex: Cuisinier·ère, Serveur·euse...)',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Témoignage',
      type: 'text',
      description: 'Un court témoignage sur leur expérience de bénévolat',
    }),
    defineField({
      name: 'isActive',
      title: 'Actif·ve',
      type: 'boolean',
      description: 'Cocher si la personne est encore bénévole active',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: isActive ? title : `${title} (inactif·ve)`,
        subtitle,
        media,
      }
    },
  },
})