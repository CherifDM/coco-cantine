import { Container } from '@/components/ui/Container'
import { Section, SectionHeader } from '@/components/ui/Section'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import type { GalleryImage } from '@/lib/types'

interface GalleryPreviewProps {
  images?: GalleryImage[]
}

export function GalleryPreview({ images }: GalleryPreviewProps) {
  if (!images || images.length === 0) return null

  return (
    <Section className="bg-light" ariaLabelledby="gallery-title">
      <Container>
        <SectionHeader
          id="gallery-title"
          title="Galerie de photos"
          subtitle="Plats, événements et moments de convivialité à La Coco Cantine."
        />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((item) => (
            <figure
              key={item._id}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-md group"
            >
              <SanityImageComponent
                image={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 bg-dark/70 text-white text-xs p-3">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  )
}
