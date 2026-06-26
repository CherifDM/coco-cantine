import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import type { SanityImage } from '@/lib/types'

interface PortableTextRendererProps {
  value: PortableTextBlock[] | undefined
  className?: string
}

/** Composants personnalisés pour le rendu Portable Text */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-primary mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-text-light">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary underline hover:text-secondary"
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      const img = value as SanityImage & { alt?: string; caption?: string }
      if (!img?.asset) return null
      return (
        <figure className="my-6">
          <SanityImageComponent
            image={img}
            alt={img.alt || 'Image de l\'article'}
            width={800}
            height={500}
            className="rounded-xl w-full h-auto"
          />
          {img.caption && (
            <figcaption className="mt-2 text-sm text-text-light text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    weeklyMenu: ({ value }) => {
      const menu = value as {
        description?: string
        days?: {
          day?: string
          specialNote?: string
          starters?: { name: string; isVegan?: boolean; isGlutenFree?: boolean }[]
          mainCourses?: { name: string; isVegan?: boolean; isGlutenFree?: boolean }[]
          desserts?: { name: string; isVegan?: boolean; isGlutenFree?: boolean }[]
        }[]
      }
      const dayLabels: Record<string, string> = {
        monday: 'Lundi', tuesday: 'Mardi', wednesday: 'Mercredi',
        thursday: 'Jeudi', friday: 'Vendredi',
      }
      return (
        <div className="my-8 rounded-2xl bg-white p-6 shadow-md">
          {menu.description && <p className="mb-4 text-text-light">{menu.description}</p>}
          {menu.days?.map((day, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <h4 className="font-bold text-primary text-lg mb-2">
                {dayLabels[day.day || ''] || day.day}
              </h4>
              {day.specialNote && (
                <p className="text-sm text-secondary mb-2 italic">{day.specialNote}</p>
              )}
              {day.starters && day.starters.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold text-sm">Entrées : </span>
                  {day.starters.map((s) => s.name).join(', ')}
                </div>
              )}
              {day.mainCourses && day.mainCourses.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold text-sm">Plats : </span>
                  {day.mainCourses.map((m) => m.name).join(', ')}
                </div>
              )}
              {day.desserts && day.desserts.length > 0 && (
                <div>
                  <span className="font-semibold text-sm">Desserts : </span>
                  {day.desserts.map((d) => d.name).join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    },
  },
}

/** Rendu du contenu riche Sanity (Portable Text) */
export function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null

  return (
    <div className={`prose-coco max-w-none ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  )
}
