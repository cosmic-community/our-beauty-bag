// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
  [key: string]: string | undefined;
}

export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    job_title?: string;
    bio?: string;
    avatar?: CosmicImage;
    social_links?: SocialLinks;
    seo_meta_title?: string;
    seo_meta_description?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
    seo_meta_title?: string;
    seo_meta_description?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: CosmicImage;
    author?: Author;
    category?: Category;
    tags?: string[];
    published_date?: string;
    reading_time?: number;
    seo_meta_title?: string;
    seo_meta_description?: string;
    focus_keyword?: string;
    og_image?: CosmicImage;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}