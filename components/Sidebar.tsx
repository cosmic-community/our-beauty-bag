import Link from 'next/link'
import type { Post, Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate, getAllTags, slugifyTag } from '@/lib/utils'

interface SidebarProps {
  recentPosts: Post[]
  categories: Category[]
  allPosts: Post[]
}

export default function Sidebar({ recentPosts, categories, allPosts }: SidebarProps) {
  const tags = getAllTags(allPosts)

  return (
    <aside className="space-y-8">
      {/* Recent Posts */}
      <div className="bg-white rounded-2xl p-6 border border-blush-50 shadow-sm">
        <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-blush-50">
          Recent Posts
        </h3>
        <ul className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => {
            const image = post.metadata?.featured_image
            const title = getMetafieldValue(post.metadata?.title) || post.title
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.slug}`} className="flex gap-3 group">
                  {image ? (
                    <img
                      src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-blush-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💄</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800 group-hover:text-blush-600 transition-colors line-clamp-2 leading-snug">
                      {title}
                    </p>
                    {post.metadata?.published_date && (
                      <p className="text-xs text-ink-400 mt-1">
                        {formatDate(post.metadata.published_date)}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-blush-50 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-blush-50">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between text-sm text-ink-600 hover:text-blush-600 transition-colors py-1"
                >
                  <span>{getMetafieldValue(category.metadata?.name) || category.title}</span>
                  <span className="text-blush-300">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-blush-50 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-ink-900 mb-4 pb-3 border-b border-blush-50">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slugifyTag(tag)}`}
                className="text-xs px-3 py-1.5 bg-blush-50 text-blush-600 rounded-full hover:bg-blush-100 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}