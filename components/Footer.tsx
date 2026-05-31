import Link from 'next/link'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-3">{SITE_NAME}</h3>
            <p className="text-sm text-ink-200 leading-relaxed max-w-xs">
              {SITE_DESCRIPTION}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blush-300 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-ink-200 hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-ink-200 hover:text-cream transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-ink-200 hover:text-cream transition-colors">
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blush-300 mb-3">
              About
            </h4>
            <p className="text-sm text-ink-200 leading-relaxed">
              Built with Next.js and Cosmic. Beautifully managed content, beautifully delivered.
            </p>
          </div>
        </div>
        <div className="border-t border-ink-700 mt-10 pt-6 text-sm text-ink-300">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}