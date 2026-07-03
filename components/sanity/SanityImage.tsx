import Image from 'next/image'
//import { urlFor } from '@/sanity/lib/image'
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
  objectFit?: 'cover' | 'contain'
}

export function SanityImageComponent({
  image,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  objectFit = 'cover',
}: SanityImageProps) {
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover'

  if (!image) {
    return (
      <div
        className={`bg-primary/10 flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-muted text-sm">Image non disponible</span>
      </div>
    )
  }

  if (image.asset?.url) {
    const src = image.asset.url

    if (fill) {
      return (
        <Image
          src={src}
          alt={alt || 'Image'}
          fill
          className={`${fitClass} ${className}`}
          sizes={sizes}
          priority={priority}
          unoptimized
        />
      )
    }

    return (
      <Image
        src={src}
        alt={alt || 'Image'}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized
      />
    )
  }

  // if (image.asset?._ref || image.asset?._id) {
  //   try {
  //     const src = urlFor(image).width(width).height(height).auto('format').url()

  //     if (fill) {
  //       return (
  //         <Image
  //           src={src}
  //           alt={alt || 'Image'}
  //           fill
  //           className={`${fitClass} ${className}`}
  //           sizes={sizes}
  //           priority={priority}
  //         />
  //       )
  //     }

  //     return (
  //       <Image
  //         src={src}
  //         alt={alt || 'Image'}
  //         width={width}
  //         height={height}
  //         className={className}
  //         sizes={sizes}
  //         priority={priority}
  //       />
  //     )
  //   } catch {
  //     return (
  //       <div
  //         className={`bg-primary/10 flex items-center justify-center ${className}`}
  //         role="img"
  //         aria-label={alt}
  //       >
  //         <span className="text-muted text-sm">Erreur de chargement</span>
  //       </div>
  //     )
  //   }
  // }

  return (
    <div
      className={`bg-primary/10 flex items-center justify-center ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="text-muted text-sm">Format d&apos;image non supporté</span>
    </div>
  )
}
