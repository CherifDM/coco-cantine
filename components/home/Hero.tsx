import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import type { SiteSettings } from '@/lib/types'

interface HeroProps {
  settings?: SiteSettings | null
}

export function Hero({ settings }: HeroProps) {
  const siteTitle = settings?.title || 'La Coco Cantine'
  const hasLogo = !!settings?.imageLogo?.asset

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center" aria-labelledby="hero-title">
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
            <div className="w-full h-full bg-primary/30" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary/80"
            aria-hidden="true"
          />
        </div>

        <Container className="relative z-10 py-24 md:py-32 text-center text-white">
          <p className="inline-block rounded-full bg-gold/90 text-dark text-sm font-bold px-4 py-1.5 mb-6">
            Végétarien · Bio · Local
          </p>

          {hasLogo ? (
            <>
              <h1 id="hero-title" className="sr-only">{siteTitle}</h1>
              <div className="mb-5 flex justify-center px-4">
                <SanityImageComponent
                  image={settings.imageLogo!}
                  alt={settings.imageLogo!.alt || siteTitle}
                  width={640}
                  height={240}
                  priority
                  objectFit="contain"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-lg"
                  sizes="(max-width: 768px) 80vw, 512px"
                />
              </div>
            </>
          ) : (
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              {siteTitle}
            </h1>
          )}

          <p className="text-lg md:text-xl mb-3 max-w-2xl mx-auto text-white/90">
            Restaurant associatif végétarien pour toustes à Place des fêtes
          </p>
          <p className="text-xl md:text-2xl font-bold text-highlight mb-10">
            {settings?.tagline || 'Pour que tout le monde puisse bien manger !'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/trouver" variant="gold" size="lg">
              Où nous trouver ?
            </Button>
            <Button
              href="/rejoindre"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Rejoindre l&apos;aventure
            </Button>
          </div>
        </Container>
      </section>
      <WaveDivider fill="var(--background)" />
    </>
  )
}
