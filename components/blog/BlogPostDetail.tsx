import { Badge } from '@/components/ui/Badge'
import { SanityImageComponent } from '@/components/sanity/SanityImage'
import { PortableTextRenderer } from '@/components/sanity/PortableTextRenderer'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/lib/types'

interface BlogPostDetailProps {
  post: Post
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  return (
    <article>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge variant="category">Article</Badge>
        <time dateTime={post.publishedAt} className="text-muted text-sm">
          {formatDate(post.publishedAt)}
        </time>
        {post.author && (
          <span className="text-muted text-sm">par {post.author}</span>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-4">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="text-lg text-muted mb-5">{post.excerpt}</p>
      )}

      {post.featuredImage?.asset && (
        <div className="mb-6 rounded-xl overflow-hidden bg-light/30 p-2">
          <SanityImageComponent
            image={post.featuredImage}
            alt={post.featuredImage.alt || post.title}
            width={1200}
            height={1600}
            objectFit="contain"
            className="w-full h-auto max-h-[70vh] object-contain mx-auto"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
      )}

      <PortableTextRenderer value={post.content} />
    </article>
  )
}
