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
      <blockquote className="border-l-4 border-accent pl-4 italic my-4 text-muted bg-light/50 rounded-r-lg py-2">
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
          className="text-primary underline hover:text-accent underline-offset-2"
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
            <figcaption className="mt-2 text-sm text-muted text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
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
