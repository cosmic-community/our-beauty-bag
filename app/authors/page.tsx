import type { Metadata } from 'next'
import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Meet the writers and creators behind Our Beauty Bag.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Authors' }]} />

      <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-2">Our Authors</h1>
      <p className="text-ink-500 mb-8">Meet the creative minds behind our stories.</p>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-ink-400">No authors found.</p>
      )}
    </div>
  )
}