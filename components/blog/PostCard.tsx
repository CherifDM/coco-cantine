import Link from 'next/link'
import { Card, CardContent, CardImage } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
}

/** Carte d'article pour la liste blog */
export function PostCard({ post }: PostCardProps) {
  return (
    <Card as="article" className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        <CardImage>
          {post.featuredImage?.asset ? (
            <SanityImageComponent
              image={post.featuredImage}
              alt={post.featuredImage.alt || post.title}
              fill
              className="transition-transform hover:scale-105 duration-300"
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <span className="text-4xl" aria-hidden="true">📝</span>
            </div>
          )}
        </CardImage>
        <CardContent className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="category">Article</Badge>
            <time dateTime={post.publishedAt} className="text-sm text-text-light">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-text-light text-sm line-clamp-3 flex-1">{post.excerpt}</p>
          )}
          <span className="mt-4 text-primary font-semibold text-sm">Lire la suite →</span>
        </CardContent>
      </Link>
    </Card>
  )
}
