import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/lib/types'

interface SanityImageProps {
  image: SanityImage
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

/** Image Sanity optimisée via next/image */
export function SanityImageComponent({
  image,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: SanityImageProps) {
  if (!image?.asset) {
    return (
      <div
        className={`bg-primary/10 flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-text-light text-sm">Image non disponible</span>
      </div>
    )
  }

  const src = urlFor(image).width(width).height(height).auto('format').url()

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
