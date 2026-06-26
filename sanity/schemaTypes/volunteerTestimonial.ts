import { defineType, defineField } from 'sanity'

export const volunteerTestimonial = defineType({
  name: 'volunteerTestimonial',
  title: 'Témoignage bénévole',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Rôle dans l\'association (ex: "Cuisinier·ère", "Serveur·euse")',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Témoignage',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Ce que le bénévolat apporte / apporte à la personne',
    }),
    defineField({
      name: 'isActive',
      title: 'Bénévole actif·ve',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Témoignage en avant',
      type: 'boolean',
      description: 'Cocher pour afficher en grand sur la page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
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
        subtitle: subtitle || 'Rôle non défini',
        media,
      }
    },
  },
})
