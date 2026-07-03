'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { BlogEventDetail } from '@/components/blog/BlogEventDetail'
import { BlogMenuWeekDetail } from '@/components/blog/BlogMenuWeekDetail'
import { getBlogItemHref, getBlogItemTitle } from '@/lib/blog'
import type { BlogItem } from '@/lib/types'

interface BlogItemModalProps {
  item: BlogItem | null
  onClose: () => void
}

const CTA_LABELS: Record<BlogItem['kind'], string> = {
  post: 'Lire la suite →',
  event: 'En savoir plus →',
  menuWeek: 'Voir les menus →',
}

export function BlogItemModal({ item, onClose }: BlogItemModalProps) {
  if (!item) return null

  const href = getBlogItemHref(item)
  const title = getBlogItemTitle(item)

  return (
    <Modal isOpen={!!item} onClose={onClose} title={title}>
      {item.kind === 'post' && <BlogPostDetail post={item.data} />}
      {item.kind === 'event' && <BlogEventDetail event={item.data} />}
      {item.kind === 'menuWeek' && <BlogMenuWeekDetail week={item.data} />}

      <div className="mt-8 pt-6 border-t border-light">
        <Button href={href} variant="primary">
          {CTA_LABELS[item.kind]}
        </Button>
      </div>
    </Modal>
  )
}
