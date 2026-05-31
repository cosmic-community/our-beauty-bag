import type { Post } from '@/types'

export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getPostTags(post: Post): string[] {
  const tags = post.metadata?.tags
  if (!tags) return []
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === 'string')
  if (typeof tags === 'string') {
    return tags.split(',').map((t) => t.trim()).filter(Boolean)
  }
  return []
}

export function getAllTags(posts: Post[]): string[] {
  const tagSet = new Set<string>()
  posts.forEach((post) => {
    getPostTags(post).forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export const SITE_NAME = 'Our Beauty Bag'
export const SITE_DESCRIPTION =
  'A creative blog and portfolio exploring beauty, style, and the stories behind them.'
export const SITE_URL = 'https://ourbeautybag.com'