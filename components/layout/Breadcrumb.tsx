import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  inverted?: boolean
}

export function Breadcrumb({ items, inverted = false }: BreadcrumbProps) {
  const linkClass = inverted
    ? 'text-white/70 hover:text-white transition-colors'
    : 'text-muted hover:text-primary transition-colors'
  const separatorClass = inverted ? 'text-white/40' : 'text-accent'
  const currentClass = inverted ? 'font-semibold text-highlight' : 'font-semibold text-primary'

  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${inverted ? 'text-white/70' : 'text-muted'}`}>
        <li>
          <Link href="/" className={linkClass}>
            Accueil
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className={separatorClass}>/</span>
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ) : (
              <span className={currentClass} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
