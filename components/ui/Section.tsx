interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  ariaLabelledby?: string
}

/** Section de page avec espacement généreux */
export function Section({ children, className = '', id, ariaLabelledby }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`py-12 md:py-16 ${className}`}
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
}

export function SectionHeader({ title, subtitle, id, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 text-center ${className}`}>
      <h2 id={id} className="text-2xl md:text-3xl font-bold text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-light max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
