import { defineType, defineField } from 'sanity'

export const volunteerPage = defineType({
  name: 'volunteerPage',
  title: 'Page "Rejoindre"',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Rejoindre les cantinièr•es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'introText',
      title: 'Texte d\'introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texte qui s\'affiche en haut de la page',
    }),
    defineField({
      name: 'signalGroupLink',
      title: 'Lien vers le groupe Signal',
      type: 'url',
      description: 'Lien d\'invitation vers le groupe Signal des bénévoles',
      validation: (Rule) => Rule.uri({
        scheme: ['https'],
      }),
    }),
    defineField({
      name: 'signalGroupText',
      title: 'Texte du bouton Signal',
      type: 'string',
      initialValue: '✨ Rejoindre le groupe bénévole ✨',
    }),
    defineField({
      name: 'summary',
      title: 'Sommaire',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'anchor',
              title: 'Ancre',
              type: 'string',
              description: 'ID de l\'ancre dans la page (ex: "qui-sommes-nous")',
            }),
          ],
        },
      ],
      description: 'Sections visibles dans le sommaire de la page',
    }),
    defineField({
      name: 'whoWeAre',
      title: 'Qui sommes-nous ?',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Description de l\'équipe bénévole',
    }),
    defineField({
      name: 'roles',
      title: 'Rôles bénévoles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'volunteerRole' }] }],
      description: 'Sélectionner les rôles à afficher sur la page',
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'volunteerTestimonial' }] }],
      description: 'Sélectionner les témoignages à afficher',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
      initialValue: 'contact@lacococantine.org',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      description: 'Description pour les moteurs de recherche',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'signalGroupLink',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Page Rejoindre',
        subtitle: subtitle ? '🔗 Groupe Signal configuré' : '🔴 Lien Signal manquant',
      }
    },
  },
})