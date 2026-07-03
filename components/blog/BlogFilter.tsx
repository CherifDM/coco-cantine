'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogFilter } from '@/lib/types'

const FILTERS: { value: BlogFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'articles', label: 'Articles' },
  { value: 'events', label: 'Événements' },
  { value: 'menus', label: 'Menus' },
]

/** Filtre par type de contenu pour la page blog */
export function BlogFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = (searchParams.get('filter') as BlogFilter) || 'all'

  function handleChange(filter: BlogFilter) {
    const params = new URLSearchParams(searchParams.toString())
    if (filter === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }
    params.delete('page')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8" role="group" aria-label="Filtrer le contenu">
      {FILTERS.map(({ value, label }) => (
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
