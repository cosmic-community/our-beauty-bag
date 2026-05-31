// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title
  const title = getMetafieldValue(author.metadata?.seo_meta_title) || name
  const description =
    getMetafieldValue(author.metadata?.seo_meta_description) ||
    getMetafieldValue(author.metadata?.bio) ||
    `Articles by ${name}.`

  return {
    title,
    description,
  }
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  const name = getMetafieldValue(author.metadata?.name) || author.title
  const jobTitle = getMetafieldValue(author.metadata?.job_title)
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar
  const social = author.metadata?.social_links

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Authors', href: '/authors' },
          { label: name },
        ]}
      />

      {/* Author header */}
      <div className="bg-white rounded-2xl p-8 border border-blush-50 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left mb-10">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
            alt={name}
            width={140}
            height={140}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-blush-50 flex-shrink-0"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl">👤</span>
          </div>
        )}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink-900">{name}</h1>
          {jobTitle && <p className="text-blush-500 mt-1">{jobTitle}</p>}
          {bio && <p className="text-ink-500 mt-3 leading-relaxed max-w-2xl">{bio}</p>}

          {social && (
            <div className="flex gap-4 mt-4 justify-center sm:justify-start">
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blush-600 hover:text-blush-700"
                >
                  Twitter
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blush-600 hover:text-blush-700"
                >
                  Instagram
                </a>
              )}
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blush-600 hover:text-blush-700"
                >
                  LinkedIn
                </a>
              )}
              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blush-600 hover:text-blush-700"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-6">
        Posts by {name}
      </h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-ink-400">No posts by this author yet.</p>
      )}
    </div>
  )
}