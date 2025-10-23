/**
 * Constantes y configuración global de la aplicación
 * Centraliza URLs, configuración de API y valores por defecto
 */

/**
 * URLs de WordPress API
 * Se obtienen de las variables de entorno
 */
export const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';
export const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';

/**
 * Endpoints de WordPress API
 */
export const API_ENDPOINTS = {
  // WordPress REST API nativa
  POSTS: '/wp/v2/posts',
  PAGES: '/wp/v2/pages',
  MEDIA: '/wp/v2/media',
  CATEGORIES: '/wp/v2/categories',
  TAGS: '/wp/v2/tags',
  
  // Custom post types
  PROPERTIES: '/wp/v2/properties',
  AGENTS: '/wp/v2/agents',
  
  // Taxonomías de propiedades
  PROPERTY_TYPES: '/wp/v2/property-type',
  PROPERTY_STATUS: '/wp/v2/property-status',
  PROPERTY_FEATURES: '/wp/v2/property-feature',
  PROPERTY_CITIES: '/wp/v2/property-city',
  PROPERTY_AREAS: '/wp/v2/property-area',
  
  // Endpoints custom de Versus Headless API
  SITE_CONFIG: '/versus/v1/config',
  PROPERTY_SEARCH: '/versus/v1/properties/search',
  FEATURED_PROPERTIES: '/versus/v1/properties/featured',
  SITE_STATS: '/versus/v1/stats',
} as const;

/**
 * Configuración de paginación por defecto
 */
export const PAGINATION = {
  DEFAULT_PER_PAGE: 12,
  MAX_PER_PAGE: 100,
  FEATURED_LIMIT: 6,
} as const;

/**
 * Configuración de cache (revalidación ISR)
 * Tiempos en segundos
 */
export const REVALIDATE_TIME = {
  PROPERTIES: 3600,        // 1 hora
  PROPERTY_DETAIL: 1800,   // 30 minutos
  POSTS: 3600,             // 1 hora
  PAGES: 86400,            // 24 horas
  CONFIG: 86400,           // 24 horas
  TAXONOMIES: 86400,       // 24 horas
} as const;

/**
 * Configuración de idiomas
 * Basado en GTranslate
 */
export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
  FR: 'fr',
  CA: 'ca',
  RU: 'ru',
} as const;

export const LANGUAGE_NAMES = {
  [LANGUAGES.ES]: 'Español',
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.FR]: 'Français',
  [LANGUAGES.CA]: 'Català',
  [LANGUAGES.RU]: 'Русский',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.ES;

/**
 * Configuración de SEO
 */
export const SEO = {
  DEFAULT_TITLE: 'Versus Andorra Real Estate',
  DEFAULT_DESCRIPTION: 'La mejor rentabilidad como inversión inmobiliaria en Andorra',
  DEFAULT_OG_IMAGE: '/images/og-default.jpg',
  SITE_NAME: 'Versus Andorra',
  TWITTER_HANDLE: '@versusandorra',
} as const;

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/propiedades',
  PROPERTY_DETAIL: '/propiedades/:slug',
  BLOG: '/blog',
  POST_DETAIL: '/blog/:slug',
  CONTACT: '/contacto',
  ABOUT: '/nosotros',
  TEAM: '/nuestro-equipo',
} as const;

/**
 * Configuración de formularios
 */
export const FORMS = {
  CONTACT_EMAIL: 'info@versusandorra.com',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
} as const;

/**
 * Configuración de Google Services (futuro)
 */
export const GOOGLE = {
  MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '',
  ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  REVIEWS_PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
} as const;

/**
 * Configuración de desarrollo
 */
export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Mensajes de error comunes
 */
export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Error al obtener datos. Por favor, intenta de nuevo.',
  NOT_FOUND: 'No se encontró el recurso solicitado.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta más tarde.',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  INVALID_DATA: 'Datos inválidos recibidos.',
} as const;

/**
 * Headers comunes para peticiones
 */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;
