'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogFilter } from '@/lib/types'

const FILTERS: { value: BlogFilter; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'articles', label: 'Articles' },
  { value: 'events', label: 'Événements' },
  { value: 'menus', label: 'Menus' },
]

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
    <div className="flex flex-wrap gap-2 justify-center mb-10" role="group" aria-label="Filtrer le contenu">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => handleChange(value)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            current === value
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white text-dark hover:bg-light border border-primary/20'
          }`}
          aria-pressed={current === value}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
