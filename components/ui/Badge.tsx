type BadgeVariant = 'vegan' | 'glutenFree' | 'category' | 'event' | 'menu' | 'highlight' | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  vegan: 'bg-secondary/15 text-secondary',
  glutenFree: 'bg-accent/20 text-primary',
  category: 'bg-primary/15 text-primary',
  event: 'bg-accent/20 text-primary',
  menu: 'bg-highlight/40 text-dark',
  highlight: 'bg-gold/50 text-dark',
  default: 'bg-light text-dark',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
