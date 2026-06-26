type BadgeVariant = 'vegan' | 'glutenFree' | 'category' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  vegan: 'bg-primary/15 text-primary',
  glutenFree: 'bg-accent/30 text-foreground',
  category: 'bg-secondary/15 text-secondary',
  default: 'bg-foreground/10 text-foreground',
}

/** Badge pour étiquettes (V, SG, catégories…) */
export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
