interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabelledby?: string
}

export function Section({ children, className = '', id, ariaLabelledby }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`py-8 md:py-10 ${className}`}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  id?: string
  className?: string
  align?: 'center' | 'left'
}

export function SectionHeader({
  title,
  subtitle,
  id,
  className = '',
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`mb-10 md:mb-12 ${alignClass} ${className}`}>
      <h2 id={id} className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-muted max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
