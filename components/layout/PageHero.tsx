import { Container } from '@/components/ui/Container'
import { Breadcrumb, type BreadcrumbItem } from '@/components/layout/Breadcrumb'
import { WaveDivider } from '@/components/ui/WaveDivider'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  variant?: 'primary' | 'secondary' | 'light'
}

const variants = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  light: 'bg-light text-dark',
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  variant = 'primary',
}: PageHeroProps) {
  return (
    <>
      <header className={`${variants[variant]} py-12 md:py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pattern-dots" aria-hidden="true" />
        <Container className="relative">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb items={breadcrumbs} inverted={variant !== 'light'} />
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-4 text-lg md:text-xl max-w-2xl ${
                variant === 'light' ? 'text-muted' : 'text-white/90'
              }`}
            >
              {subtitle}
            </p>
          )}
        </Container>
      </header>
      <WaveDivider fill="var(--background)" />
    </>
  )
}
