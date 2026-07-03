import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogCardImage } from '@/components/blog/BlogCardImage'
import { formatDate } from '@/lib/utils'
import { getBlogItemHref } from '@/lib/blog'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  onOpen: () => void
}

function openOnKeyboard(event: React.KeyboardEvent, onOpen: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onOpen()
  }
}

export function PostCard({ post, onOpen }: PostCardProps) {
  const href = getBlogItemHref({ kind: 'post', date: post.publishedAt, data: post })

  return (
    <Card as="article" hover className="overflow-hidden flex flex-col md:flex-row md:min-h-[220px]">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => openOnKeyboard(e, onOpen)}
        className="md:w-1/2 shrink-0 cursor-pointer"
        aria-label={`Aperçu : ${post.title}`}
      >
        <BlogCardImage
          image={post.featuredImage}
          alt={post.featuredImage?.alt || post.title}
          fallback={<span className="text-5xl" aria-hidden="true">📝</span>}
          fallbackClassName="bg-primary/10"
        />
      </div>

      <CardContent className="flex flex-col flex-1 !py-5 !px-6 md:!py-6">
        <div
          role="button"
          tabIndex={0}
          onClick={onOpen}
          onKeyDown={(e) => openOnKeyboard(e, onOpen)}
          className="flex-1 cursor-pointer text-left"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="category">Article</Badge>
            <time dateTime={post.publishedAt} className="text-sm text-muted">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{post.title}</h3>
          {post.excerpt && (
            <p className="text-muted line-clamp-3">{post.excerpt}</p>
          )}
        </div>
        <div className="flex justify-end mt-3 shrink-0">
          <Button href={href} variant="ghost" size="sm" className="text-accent font-bold">
            Lire la suite →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
