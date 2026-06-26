import { client } from '@/sanity/lib/client'

/**
 * Récupère des données Sanity avec gestion d'erreur.
 * Retourne null en cas d'échec pour permettre les fallbacks.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    console.error('Erreur Sanity:', error)
    return null
  }
}
