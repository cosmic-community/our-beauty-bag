import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null

  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const jobTitle = getMetafieldValue(author.metadata?.job_title)
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white rounded-2xl p-6 border border-blush-50 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
          alt={name}
          width={120}
          height={120}
          className="w-28 h-28 rounded-full object-cover mx-auto mb-4 ring-4 ring-blush-50"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-blush-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">👤</span>
        </div>
      )}
      <h3 className="font-serif text-xl font-semibold text-ink-900 group-hover:text-blush-600 transition-colors">
        {name}
      </h3>
      {jobTitle && <p className="text-sm text-blush-500 mt-1">{jobTitle}</p>}
      {bio && <p className="text-sm text-ink-500 mt-3 line-clamp-3 leading-relaxed">{bio}</p>}
    </Link>
  )
}