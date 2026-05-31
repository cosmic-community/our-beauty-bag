// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getAllCategories,
  getAllPosts,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const title = getMetafieldValue(category.metadata?.seo_meta_title) || name
  const description =
    getMetafieldValue(category.metadata?.seo_meta_description) ||
    getMetafieldValue(category.metadata?.description) ||
    `Articles in the ${name} category.`

  return {
    title,
    description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const [posts, allCategories, allPosts] = await Promise.all([
    getPostsByCategory(category.id),
    getAllCategories(),
    getAllPosts(),
  ])

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.category_image

  return (
    <div>
      {image && (
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={`${image.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={1000}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-900/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white text-center px-4">
              {name}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Categories', href: '/categories' },
            { label: name },
          ]}
        />

        {!image && (
          <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2">{name}</h1>
        )}
        {description && <p className="text-ink-500 mb-8 max-w-2xl">{description}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-ink-400">No posts in this category yet.</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Sidebar recentPosts={allPosts} categories={allCategories} allPosts={allPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}