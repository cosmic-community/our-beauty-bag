import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  const featuredPost = posts[0]
  const restPosts = posts.slice(1)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush-50 to-cream border-b border-blush-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blush-500 mb-4">
            Welcome to {SITE_NAME}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-ink-900 leading-tight max-w-3xl mx-auto">
            Beauty, style &amp; the stories behind them
          </h1>
          <p className="text-lg text-ink-500 mt-6 max-w-2xl mx-auto leading-relaxed">
            Explore curated articles, tips, and creative inspiration from our team of beauty
            enthusiasts.
          </p>
          <Link
            href="/posts"
            className="inline-block mt-8 px-8 py-3 bg-blush-600 text-white font-medium rounded-full hover:bg-blush-700 transition-colors"
          >
            Browse All Posts
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-14">
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
              Featured Story
            </h2>
            <PostCard post={featuredPost} featured />
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-14">
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
              Explore Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Latest Posts + Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">Latest Posts</h2>
            {restPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {restPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-ink-400">No additional posts yet.</p>
            )}
          </div>
          <div className="lg:col-span-1">
            <Sidebar recentPosts={posts} categories={categories} allPosts={posts} />
          </div>
        </section>
      </div>
    </div>
  )
}