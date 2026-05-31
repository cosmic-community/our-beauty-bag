# Our Beauty Bag

![App Preview](https://imgix.cosmicjs.com/234026b0-5d11-11f1-ba46-4feeec079fc7-autopilot-photo-1432888622747-4eb9a8efeb07-1780246361235.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, SEO-optimized creative blog and portfolio built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). "Our Beauty Bag" features richly designed posts, author profiles, category browsing, breadcrumb navigation, and a content-rich sidebar — all powered by your existing Cosmic content model.

## Features

- 📝 **Beautiful Blog Posts** — Featured images, rich content, tags, reading time, and author attribution
- 👤 **Author Profiles** — Dedicated pages with bios, avatars, social links, and authored posts
- 🏷️ **Category Browsing** — Filter and explore posts by category with custom imagery
- 🧭 **Breadcrumb Navigation** — Clear, accessible breadcrumbs on every page
- 📚 **Content-Rich Sidebar** — Recent posts, categories, and tags surfaced for discovery
- 🔍 **Highly SEO-Optimized** — Per-page meta titles/descriptions, OpenGraph images, JSON-LD structured data, and dynamic sitemap
- 📱 **Fully Responsive** — Modern, elegant design that looks great on every device
- ⚡ **Fast & Server-Rendered** — Next.js App Router with Server Components and image optimization via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a1c66f3ebf42ceaaf383c28&clone_repository=6a1c6846ebf42ceaaf383c58)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories. A blog with posts, breadcrumbs, sidebar, very SEO optimized"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Our Beauty Bag". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A blog with posts, breadcrumbs, sidebar, very SEO optimized.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com/docs)
- [imgix](https://imgix.com/) for image optimization

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing `authors`, `categories`, and `posts` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set environment variables in your hosting platform or local environment:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author and category included (depth)
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

const posts = response.objects

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This application reads directly from your Cosmic bucket using the three configured object types:

- **Posts** (`posts`): title, excerpt, content, featured_image, author (object), category (object), tags, published_date, reading_time, and full SEO fields (seo_meta_title, seo_meta_description, focus_keyword, og_image)
- **Authors** (`authors`): name, job_title, bio, avatar, social_links, and SEO fields
- **Categories** (`categories`): name, description, category_image, and SEO fields

All relational data (author and category on posts) is resolved using Cosmic's `depth` parameter. Read more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add the same environment variables
4. Deploy

<!-- README_END -->