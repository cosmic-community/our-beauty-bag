// app/tags/[slug]/page.tsx
import type { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getPostTags, slugifyTag } from '@/lib/utils'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Tag: ${slug.replace(/-/g, ' ')}`,
    description: `Posts tagged with ${slug.replace(/-/g, ' ')}.`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params
  const [allPosts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  const matchingPosts = allPosts.filter((post) =>
    getPostTags(post).some((tag) => slugifyTag(tag) === slug)
  )

  const displayTag = slug.replace(/-/g, ' ')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Posts', href: '/posts' },
          { label: `#${displayTag}` },
        ]}
      />

      <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2 capitalize">
        #{displayTag}
      </h1>
      <p className="text-ink-500 mb-8">
        {matchingPosts.length} {matchingPosts.length === 1 ? 'post' : 'posts'} tagged.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {matchingPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-ink-400">No posts with this tag.</p>
          )}
        </div>
        <div className="lg:col-span-1">
          <Sidebar recentPosts={allPosts} categories={categories} allPosts={allPosts} />
        </div>
      </div>
    </div>
  )
}