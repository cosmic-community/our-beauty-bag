import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { SITE_NAME } from '@/lib/utils'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className="bg-cream border-b border-blush-100 sticky top-0 z-40 backdrop-blur-sm bg-cream/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-ink-900 tracking-tight">
              {SITE_NAME}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-blush-500 mt-1">
              Beauty &amp; Stories
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-ink-700 hover:text-blush-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="text-sm font-medium text-ink-700 hover:text-blush-600 transition-colors"
            >
              Posts
            </Link>
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-sm font-medium text-ink-700 hover:text-blush-600 transition-colors"
              >
                {getMetafieldValue(category.metadata?.name) || category.title}
              </Link>
            ))}
            <Link
              href="/authors"
              className="text-sm font-medium text-ink-700 hover:text-blush-600 transition-colors"
            >
              Authors
            </Link>
          </nav>
        </div>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          <Link href="/" className="text-sm font-medium text-ink-700 whitespace-nowrap">
            Home
          </Link>
          <Link href="/posts" className="text-sm font-medium text-ink-700 whitespace-nowrap">
            Posts
          </Link>
          <Link href="/authors" className="text-sm font-medium text-ink-700 whitespace-nowrap">
            Authors
          </Link>
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-ink-700 whitespace-nowrap"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}