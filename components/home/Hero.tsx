import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import type { SiteSettings } from '@/lib/types'

interface HeroProps {
  settings?: SiteSettings | null
}

/** Section héro de la page d'accueil */
export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center" aria-labelledby="hero-title">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        {settings?.heroImage?.asset ? (
          <SanityImageComponent
            image={settings.heroImage}
            alt={settings.heroImage.alt || 'La Coco Cantine, restaurant associatif végétarien'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-primary/20" />
        )}
        <div className="absolute inset-0 bg-foreground/50" aria-hidden="true" />
      </div>

      <Container className="relative z-10 py-20 text-center text-white">
        <h1 id="hero-title" className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          La Coco Cantine
        </h1>
        <p className="text-lg md:text-xl mb-2 max-w-2xl mx-auto">
          Restaurant associatif végétarien pour toustes à Place des fêtes
        </p>
        <p className="text-xl md:text-2xl font-semibold text-accent mb-8">
          {settings?.tagline || 'Pour que tout le monde puisse bien manger !'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/trouver" variant="secondary" size="lg">
            Où nous trouver ?
          </Button>
          <Button href="/rejoindre" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
            Rejoindre l&apos;aventure
          </Button>
        </div>
      </Container>
    </section>
  )
}
