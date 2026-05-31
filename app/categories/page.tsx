import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all content categories at Our Beauty Bag.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-8">Categories</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-ink-400">No categories found.</p>
      )}
    </div>
  )
}