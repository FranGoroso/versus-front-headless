/**
 * Tipos base de WordPress API REST
 * Interfaces comunes para todos los post types
 */

/**
 * Estructura base de respuesta de WordPress API
 */
export interface WordPressAPIResponse<T> {
  data: T;
  headers?: {
    'X-WP-Total'?: string;
    'X-WP-TotalPages'?: string;
  };
}

/**
 * Imagen destacada de WordPress con múltiples tamaños
 */
export interface WPFeaturedImage {
  id: number;
  url: string;
  thumbnail: string | null;
  medium: string | null;
  large: string | null;
  alt: string;
}

/**
 * Imagen de galería con información completa
 */
export interface WPGalleryImage {
  id: number;
  url: string;
  thumbnail: string | null;
  medium: string | null;
  width: number;
  height: number;
  alt: string;
  title: string;
}

/**
 * Estructura base de un Post de WordPress
 */
export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'pending' | 'private';
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  featured_image?: WPFeaturedImage | null;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: Record<string, any>;
  categories?: number[];
  tags?: number[];
  acf?: Record<string, any>;
}

/**
 * Página de WordPress (extiende de Post)
 */
export interface WPPage extends WPPost {
  parent: number;
  menu_order: number;
}

/**
 * Media/Attachment de WordPress
 */
export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: 'attachment';
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: 'image' | 'file' | 'video' | 'audio';
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      thumbnail?: WPMediaSize;
      medium?: WPMediaSize;
      medium_large?: WPMediaSize;
      large?: WPMediaSize;
      full?: WPMediaSize;
      [key: string]: WPMediaSize | undefined;
    };
  };
  source_url: string;
}

/**
 * Tamaño de imagen en WordPress
 */
export interface WPMediaSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

/**
 * Autor de WordPress
 */
export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
}

/**
 * Parámetros de consulta para WordPress API
 */
export interface WPQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug' | 'modified';
  slug?: string;
  status?: 'publish' | 'draft' | 'pending' | 'private' | 'any';
  categories?: number[];
  tags?: number[];
  sticky?: boolean;
  [key: string]: any;
}
