// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getAllPosts,
  getAllCategories,
  getMetafieldValue,
} from '@/lib/cosmic'
import Breadcrumbs from '@/components/Breadcrumbs'
import Sidebar from '@/components/Sidebar'
import JsonLd from '@/components/JsonLd'
import { formatDate, getPostTags, slugifyTag, SITE_NAME, SITE_URL } from '@/lib/utils'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const title = getMetafieldValue(post.metadata?.seo_meta_title) || getMetafieldValue(post.metadata?.title) || post.title
  const description =
    getMetafieldValue(post.metadata?.seo_meta_description) ||
    getMetafieldValue(post.metadata?.excerpt) ||
    ''
  const ogImage = post.metadata?.og_image || post.metadata?.featured_image
  const ogUrl = ogImage
    ? `${ogImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ogUrl ? [{ url: ogUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogUrl ? [ogUrl] : undefined,
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const [allPosts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = getPostTags(post)
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const content = getMetafieldValue(post.metadata?.content) || post.content || ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: getMetafieldValue(post.metadata?.excerpt),
    image: featuredImage
      ? `${featuredImage.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      : undefined,
    datePublished: post.metadata?.published_date,
    author: author
      ? {
          '@type': 'Person',
          name: getMetafieldValue(author.metadata?.name) || author.title,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/posts/${post.slug}`,
    },
  }

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd data={jsonLd} />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Posts', href: '/posts' },
          { label: title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-semibold uppercase tracking-wider text-blush-600 mb-3 hover:text-blush-700"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-ink-900 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-ink-400">
            {author && (
              <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 group">
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(author.metadata?.name) || author.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : null}
                <span className="text-ink-700 font-medium group-hover:text-blush-600">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </span>
              </Link>
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

          {featuredImage && (
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={title}
              width={800}
              height={450}
              className="w-full rounded-2xl object-cover mt-8 shadow-sm"
            />
          )}

          {content && (
            <div
              className="prose prose-lg max-w-none mt-8"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-blush-50">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugifyTag(tag)}`}
                  className="text-sm px-3 py-1.5 bg-blush-50 text-blush-600 rounded-full hover:bg-blush-100 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Author bio */}
          {author && getMetafieldValue(author.metadata?.bio) && (
            <div className="mt-10 bg-white rounded-2xl p-6 border border-blush-50 flex gap-4 items-start">
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-blush-500">Written by</p>
                <Link
                  href={`/authors/${author.slug}`}
                  className="font-serif text-xl font-semibold text-ink-900 hover:text-blush-600"
                >
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </Link>
                <p className="text-sm text-ink-500 mt-2 leading-relaxed">
                  {getMetafieldValue(author.metadata?.bio)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Sidebar recentPosts={allPosts} categories={categories} allPosts={allPosts} />
        </div>
      </div>
    </article>
  )
}