import type { Metadata } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Sidebar from '@/components/Sidebar'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'Browse all articles, tips, and creative inspiration from Our Beauty Bag.',
}

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Posts' }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2">All Posts</h1>
      <p className="text-ink-500 mb-8">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'} to explore.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-ink-400">No posts found.</p>
          )}
        </div>
        <div className="lg:col-span-1">
          <Sidebar recentPosts={posts} categories={categories} allPosts={posts} />
        </div>
      </div>
    </div>
  )
}