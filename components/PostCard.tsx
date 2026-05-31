import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate, getPostTags } from '@/lib/utils'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (!post) return null

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const tags = getPostTags(post)
  const title = getMetafieldValue(post.metadata?.title) || post.title

  return (
    <article
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-blush-50 ${
        featured ? 'md:flex' : ''
      }`}
    >
      <Link
        href={`/posts/${post.slug}`}
        className={`block overflow-hidden ${featured ? 'md:w-1/2' : ''}`}
      >
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=${featured ? 1200 : 800}&h=${
              featured ? 800 : 500
            }&fit=crop&auto=format,compress`}
            alt={title}
            width={featured ? 600 : 400}
            height={featured ? 400 : 250}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              featured ? 'h-64 md:h-full' : 'h-52'
            }`}
          />
        ) : (
          <div
            className={`w-full bg-blush-100 flex items-center justify-center ${
              featured ? 'h-64 md:h-full' : 'h-52'
            }`}
          >
            <span className="text-4xl">💄</span>
          </div>
        )}
      </Link>

      <div className={`p-6 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-xs font-semibold uppercase tracking-wider text-blush-600 mb-2 hover:text-blush-700"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}

        <h3
          className={`font-serif font-semibold text-ink-900 group-hover:text-blush-600 transition-colors leading-snug ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          <Link href={`/posts/${post.slug}`}>{title}</Link>
        </h3>

        {excerpt && (
          <p className="text-ink-500 mt-3 leading-relaxed line-clamp-3">{excerpt}</p>
        )}

        <div className="flex items-center gap-3 mt-4 text-sm text-ink-400">
          {author && (
            <span>
              By{' '}
              <Link
                href={`/authors/${author.slug}`}
                className="text-ink-600 hover:text-blush-600 font-medium"
              >
                {getMetafieldValue(author.metadata?.name) || author.title}
              </Link>
            </span>
          )}
          {post.metadata?.published_date && (
            <>
              <span className="text-blush-200">•</span>
              <time dateTime={post.metadata.published_date}>
                {formatDate(post.metadata.published_date)}
              </time>
            </>
          )}
          {post.metadata?.reading_time ? (
            <>
              <span className="text-blush-200">•</span>
              <span>{post.metadata.reading_time} min read</span>
            </>
          ) : null}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-blush-50 text-blush-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}