import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

/** Formate une date ISO en français (ex: "25 juin 2026") */
export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMMM yyyy', { locale: fr })
  } catch {
    return dateString
  }
}

/** Formate une date courte (ex: "25 juin") */
export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), 'd MMM', { locale: fr })
  } catch {
    return dateString
  }
}

/** Formate date et heure (ex: "25 juin 2026 à 20h00") */
export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), "d MMMM yyyy 'à' HH'h'mm", { locale: fr })
  } catch {
    return dateString
  }
}

/** Libellé du jour de la semaine en français */
export const DAY_LABELS: Record<string, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
}

/** Libellés des catégories de blog */
export const POST_CATEGORY_LABELS: Record<string, string> = {
  menus: 'Menus de la semaine',
  events: 'Événements',
  article: 'Actualités',
  info: 'Actualités',
}

/** Libellés des catégories de partenaires */
export const PARTNER_CATEGORY_LABELS: Record<string, string> = {
  public: 'Institutions',
  private: 'Entreprises',
  association: 'Associations',
  eco: 'Organisations écologiques',
  other: 'Autres',
}

/** Liens de navigation principaux */
export const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/blog', label: 'Sur le feu' },
  { href: '/trouver', label: 'Où nous trouver ?' },
  { href: '/rejoindre', label: 'Rejoindre les continuer-es' },
  { href: '/partenaires', label: 'Nos partenaires' },
] as const
