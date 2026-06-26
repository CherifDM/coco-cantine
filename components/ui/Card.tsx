interface CardProps {
  children: React.ReactNode
  className?: string
  as?: 'article' | 'div' | 'section' | 'blockquote'
  id?: string
}

/** Carte avec ombre légère et coins arrondis */
export function Card({ children, className = '', as: Tag = 'div', id }: CardProps) {
  return (
    <Tag id={id} className={`rounded-2xl bg-white shadow-md overflow-hidden ${className}`}>
      {children}
    </Tag>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

interface CardImageProps {
  children: React.ReactNode
  className?: string
}

export function CardImage({ children, className = '' }: CardImageProps) {
  return <div className={`relative aspect-video overflow-hidden ${className}`}>{children}</div>
}
