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

/** Formate une date de menu : "Lundi 29 Juin" */
export function formatMenuDayLabel(dateString: string): string {
  try {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
    const dayName = capitalize(format(date, 'EEEE', { locale: fr }))
    const dayNum = format(date, 'd', { locale: fr })
    const monthName = capitalize(format(date, 'MMMM', { locale: fr }))
    return `${dayName} ${dayNum} ${monthName}`
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
  saturday: 'Samedi',
  sunday: 'Dimanche',
}

/** Libellés des filtres de la page blog */
export const BLOG_FILTER_LABELS: Record<string, string> = {
  all: 'Tous',
  articles: 'Articles',
  events: 'Événements',
  menus: 'Menus',
}

/** Emojis par type d'événement */
export const EVENT_TYPE_EMOJIS: Record<string, string> = {
  concert: '🎵',
  karaoke: '🎤',
  bal: '💃',
  atelier: '🎨',
  apero: '🍷',
  other: '🎪',
}

/** Libellé d'une semaine de menus : "Semaine du 29 juin 2026" */
export function formatWeekLabel(weekStart: string): string {
  return `Semaine du ${formatDate(weekStart)}`
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
