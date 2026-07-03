import { SanityImageComponent } from '@/components/sanity/SanityImage'
import type { SanityImage } from '@/lib/types'

interface BlogCardImageProps {
  image?: SanityImage
  alt: string
  fallback?: React.ReactNode
  fallbackClassName?: string
  className?: string
}

/** Image d'aperçu blog — recadrée, remplit la colonne image */
export function BlogCardImage({
  image,
  alt,
  fallback,
  fallbackClassName = 'bg-light/50',
  className = '',
}: BlogCardImageProps) {
  return (
    <div
      className={`relative aspect-video md:aspect-auto md:h-full md:min-h-[220px] w-full overflow-hidden ${className}`}
    >
      {image?.asset ? (
        <SanityImageComponent
          image={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className={`w-full h-full min-h-[180px] md:min-h-[220px] flex items-center justify-center ${fallbackClassName}`}>
          {fallback}
        </div>
      )}
    </div>
  )
}
