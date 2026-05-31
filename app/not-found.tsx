import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">💄</div>
      <h1 className="font-serif text-4xl font-semibold text-ink-900 mb-4">Page Not Found</h1>
      <p className="text-ink-500 mb-8">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-blush-600 text-white font-medium rounded-full hover:bg-blush-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}