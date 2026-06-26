import { defineType, defineField } from 'sanity'

export const volunteerRole = defineType({
  name: 'volunteerRole',
  title: 'Rôle bénévole',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du rôle',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Ex: "Bénévoler à la cuisine"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Emoji ou nom d\'icône',
      placeholder: '👨‍🍳',
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      description: 'Visible dans le sommaire',
    }),
    defineField({
      name: 'content',
      title: 'Contenu détaillé',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Description complète du rôle',
    }),
    defineField({
      name: 'schedule',
      title: 'Horaires / Fréquence',
      type: 'string',
      description: 'Ex: "Déjeuner : 11h-14h30"',
    }),
    defineField({
      name: 'requirements',
      title: 'Prérequis',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Compétences ou prérequis (ex: "Pas de prérequis", "Connaissances en cuisine")',
    }),
    defineField({
      name: 'isActive',
      title: 'Poste actif',
      type: 'boolean',
      description: 'Cocher si ce rôle est actuellement recherché',
      initialValue: true,
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
      title: 'title',
      subtitle: 'schedule',
      icon: 'icon',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, icon, isActive }) {
      return {
        title: isActive ? `${icon || '📌'} ${title}` : `${icon || '📌'} ${title} (❌ non actif)`,
        subtitle: subtitle || 'Horaires non définis',
      }
    },
  },
})