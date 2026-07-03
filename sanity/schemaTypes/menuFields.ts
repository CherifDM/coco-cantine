import { defineField } from 'sanity'

/** Document menuOfTheDay (typage minimal pour les callbacks Sanity) */
interface MenuOfTheDayDocument {
  isClosed?: boolean
}

/** Objet groupe : plats (documents dish) servis ensemble — le convive choisit un groupe */
const menuCourseGroupObject = {
  type: 'object' as const,
  name: 'menuCourseGroup',
  title: 'Option au choix',
  fields: [
    defineField({
      name: 'dishes',
      title: 'Plats servis ensemble',
      type: 'array',
      description:
        'Sélectionnez les plats de la bibliothèque. Ils composent une seule option servie ensemble.',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      name0: 'dishes.0->name',
      name1: 'dishes.1->name',
      name2: 'dishes.2->name',
      count: 'dishes.length',
    },
    prepare({
      name0,
      name1,
      name2,
      count,
    }: {
      name0?: string
      name1?: string
      name2?: string
      count?: number
    }) {
      const names = [name0, name1, name2].filter(Boolean)
      const title = names.length > 0 ? names.join(' + ') : 'Groupe vide'
      return {
        title,
        subtitle:
          (count ?? 0) > 1
            ? `${count} plats servis ensemble`
            : count === 1
              ? '1 plat'
              : undefined,
      }
    },
  },
}

interface MenuCourseFieldOptions {
  required?: boolean
  minGroups?: number
  maxGroups?: number
}

function isCantineClosed(document: unknown): boolean {
  return Boolean((document as MenuOfTheDayDocument)?.isClosed)
}

/**
 * Champ tableau de groupes pour entrées, plats ou desserts.
 * Chaque groupe référence des documents dish existants.
 * Bloqué et non requis lorsque la cantine est fermée.
 */
export function menuCourseGroupsField(
  name: string,
  title: string,
  options: MenuCourseFieldOptions = {},
) {
  const { required = false, minGroups, maxGroups } = options

  return defineField({
    name,
    title,
    type: 'array',
    description:
      'Ajoutez un groupe par option proposée. Les plats d\'un même groupe sont servis ensemble ; le convive choisit un groupe.',
    of: [menuCourseGroupObject],
    readOnly: ({ document }) => isCantineClosed(document),
    hidden: ({ document }) => isCantineClosed(document),
    validation: (Rule) =>
      Rule.custom((value, context) => {
        if (isCantineClosed(context.document)) return true

        const groups = value as unknown[] | undefined

        if (required && (!groups || groups.length === 0)) {
          return 'Au moins une option est requise lorsque la cantine est ouverte'
        }
        if (minGroups !== undefined && groups && groups.length < minGroups) {
          return `Au moins ${minGroups} option(s) requise(s)`
        }
        if (maxGroups !== undefined && groups && groups.length > maxGroups) {
          return `Maximum ${maxGroups} option(s)`
        }
        return true
      }),
  })
}

/** Référence vers un menu du jour (utilisée dans d'autres schémas si besoin) */
