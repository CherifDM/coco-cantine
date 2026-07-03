interface CardProps {
  children: React.ReactNode
  className?: string
  as?: 'article' | 'div' | 'section' | 'blockquote'
  id?: string
  variant?: 'white' | 'light'
  hover?: boolean
}

export function Card({
  children,
  className = '',
  as: Tag = 'div',
  id,
  variant = 'white',
  hover = false,
}: CardProps) {
  const bg = variant === 'light' ? 'bg-light' : 'bg-white'
  const hoverClass = hover ? 'card-hover' : ''

  return (
    <Tag
      id={id}
      className={`rounded-2xl ${bg} shadow-md overflow-hidden ${hoverClass} ${className}`}
    >
      {children}
    </Tag>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 md:p-8 ${className}`}>{children}</div>
}

interface CardImageProps {
  children: React.ReactNode
  className?: string
}

export function CardImage({ children, className = '' }: CardImageProps) {
  return (
    <div className={`relative aspect-video md:aspect-auto md:min-h-[200px] overflow-hidden shrink-0 ${className}`}>
      {children}
    </div>
  )
}
