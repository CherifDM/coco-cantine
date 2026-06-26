'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { POST_CATEGORY_LABELS } from '@/lib/utils'
import type { PostCategory } from '@/lib/types'

const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'menus', label: 'Menus de la semaine' },
  { value: 'events', label: 'Événements' },
  { value: 'article', label: 'Actualités' },
]

/** Filtre par catégorie pour la page blog */
export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = (searchParams.get('category') as PostCategory) || 'all'

  function handleChange(category: PostCategory) {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filtrer par catégorie">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleChange(value)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            current === value
              ? 'bg-primary text-white'
              : 'bg-white text-foreground hover:bg-primary/10 border border-primary/20'
          }`}
          aria-pressed={current === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export { POST_CATEGORY_LABELS }
