/**
 * Servicio principal de WordPress API
 * Funciones para conectar Next.js con WordPress Headless
 */

import {
  Property,
  PropertyCard,
  PropertySearchParams,
  PropertySearchResponse,
  WPPost,
  WPPage,
  SiteConfig,
  WPTaxonomy,
  WPQueryParams,
} from '@/types';
import {
  WORDPRESS_API_URL,
  API_ENDPOINTS,
  PAGINATION,
  ERROR_MESSAGES,
  DEFAULT_HEADERS,
  IS_DEV,
} from './constants';

/**
 * MODO FALLBACK TEMPORAL - WordPress deshabilitado
 * Cambiar WORDPRESS_DISABLED a false cuando WordPress esté disponible
 */
const WORDPRESS_DISABLED = false;

/**
 * Función base para hacer peticiones a WordPress API
 * Maneja errores, headers y logging en desarrollo
 * MODO FALLBACK: Retorna datos vacíos si WordPress está deshabilitado
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // MODO FALLBACK: Si WordPress está deshabilitado, retornar array vacío
  if (WORDPRESS_DISABLED) {
    if (IS_DEV) {
      console.log(`[WordPress API] DISABLED MODE - Returning empty data for: ${endpoint}`);
    }
    return [] as T;
  }

  const url = `${WORDPRESS_API_URL}${endpoint}`;

  // Log en desarrollo
  if (IS_DEV) {
    console.log(`[WordPress API] Fetching: ${url}`);
  }

  try {
    const response = await fetch(url, {
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      ...options,
      // Agregar timeout para evitar esperas largas
      signal: AbortSignal.timeout(5000),
    });

    // Log de respuesta en desarrollo
    if (IS_DEV) {
      console.log(`[WordPress API] Response status: ${response.status}`);
    }

    // Manejar errores HTTP
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.NOT_FOUND);
      }
      if (response.status >= 500) {
        throw new Error(ERROR_MESSAGES.SERVER_ERROR);
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    // Log de error en desarrollo
    if (IS_DEV) {
      console.error(`[WordPress API] Error fetching ${url}:`, error);
      console.warn(`[WordPress API] Returning empty data as fallback`);
    }

    // FALLBACK: Retornar datos vacíos en lugar de lanzar error
    return [] as T;
  }
}

/**
 * Construir query string desde parámetros
 */
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * PROPIEDADES
 */

/**
 * Obtener lista de propiedades
 * @param params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns Lista de propiedades
 */
export async function getProperties(
  params: WPQueryParams = {}
): Promise<Property[]> {
  const defaultParams = {
    per_page: PAGINATION.DEFAULT_PER_PAGE,
    _embed: true,
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  const endpoint = `${API_ENDPOINTS.PROPERTIES}${queryString}`;

  return fetchAPI<Property[]>(endpoint);
}

/**
 * Obtener una propiedad por slug
 * @param slug - Slug de la propiedad
 * @returns Propiedad encontrada o null
 */
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  try {
    const properties = await fetchAPI<Property[]>(
      `${API_ENDPOINTS.PROPERTIES}?slug=${slug}&_embed=true`
    );

    return properties[0] || null;
  } catch (error) {
    console.error(`Error fetching property with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Obtener propiedades destacadas
 * @param limit - Número de propiedades a obtener
 * @returns Lista de propiedades destacadas
 */
export async function getFeaturedProperties(
  limit: number = PAGINATION.FEATURED_LIMIT
): Promise<PropertyCard[]> {
  try {
    const endpoint = `${API_ENDPOINTS.FEATURED_PROPERTIES}?limit=${limit}`;
    return fetchAPI<PropertyCard[]>(endpoint);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
}

/**
 * Buscar propiedades con filtros avanzados
 * @param params - Parámetros de búsqueda
 * @returns Respuesta con propiedades y metadatos de paginación
 */
export async function searchProperties(
  params: PropertySearchParams
): Promise<PropertySearchResponse> {
  try {
    const response = await fetchAPI<PropertySearchResponse>(
      API_ENDPOINTS.PROPERTY_SEARCH,
      {
        method: 'POST',
        body: JSON.stringify(params),
      }
    );

    return response;
  } catch (error) {
    console.error('Error searching properties:', error);
    return {
      properties: [],
      total: 0,
      total_pages: 0,
      current_page: 1,
    };
  }
}

/**
 * Obtener todas las propiedades para generar rutas estáticas
 * Útil para generateStaticParams en App Router
 */
export async function getAllPropertySlugs(): Promise<string[]> {
  try {
    const properties = await fetchAPI<Property[]>(
      `${API_ENDPOINTS.PROPERTIES}?per_page=100&_fields=slug`
    );
    return properties.map((property) => property.slug);
  } catch (error) {
    console.error('Error fetching property slugs:', error);
    return [];
  }
}

/**
 * POSTS DEL BLOG
 */

/**
 * Obtener posts del blog
 * @param params - Parámetros de consulta
 * @returns Lista de posts
 */
export async function getPosts(params: WPQueryParams = {}): Promise<WPPost[]> {
  const defaultParams = {
    per_page: PAGINATION.DEFAULT_PER_PAGE,
    _embed: true,
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  const endpoint = `${API_ENDPOINTS.POSTS}${queryString}`;

  try {
    return fetchAPI<WPPost[]>(endpoint);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Obtener un post por slug
 * @param slug - Slug del post
 * @returns Post encontrado o null
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const posts = await fetchAPI<WPPost[]>(
      `${API_ENDPOINTS.POSTS}?slug=${slug}&_embed=true`
    );

    return posts[0] || null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Obtener todos los slugs de posts para rutas estáticas
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const posts = await fetchAPI<WPPost[]>(
      `${API_ENDPOINTS.POSTS}?per_page=100&_fields=slug`
    );
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * PÁGINAS
 */

/**
 * Obtener páginas de WordPress
 * @param params - Parámetros de consulta
 * @returns Lista de páginas
 */
export async function getPages(params: WPQueryParams = {}): Promise<WPPage[]> {
  const defaultParams = {
    per_page: PAGINATION.MAX_PER_PAGE,
    _embed: true,
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  const endpoint = `${API_ENDPOINTS.PAGES}${queryString}`;

  try {
    return fetchAPI<WPPage[]>(endpoint);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Obtener una página por slug
 * @param slug - Slug de la página
 * @returns Página encontrada o null
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const pages = await fetchAPI<WPPage[]>(
      `${API_ENDPOINTS.PAGES}?slug=${slug}&_embed=true`
    );

    return pages[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Obtener todos los slugs de páginas para rutas estáticas
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const pages = await fetchAPI<WPPage[]>(
      `${API_ENDPOINTS.PAGES}?per_page=100&_fields=slug`
    );
    return pages.map((page) => page.slug);
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
}

/**
 * TAXONOMÍAS
 */

/**
 * Obtener términos de una taxonomía
 * @param taxonomy - Nombre del endpoint de la taxonomía
 * @param params - Parámetros de consulta
 * @returns Lista de términos
 */
export async function getTaxonomy(
  taxonomy: string,
  params: Record<string, any> = {}
): Promise<WPTaxonomy[]> {
  const defaultParams = {
    per_page: PAGINATION.MAX_PER_PAGE,
    hide_empty: false,
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  const endpoint = `${taxonomy}${queryString}`;

  try {
    return fetchAPI<WPTaxonomy[]>(endpoint);
  } catch (error) {
    console.error(`Error fetching taxonomy ${taxonomy}:`, error);
    return [];
  }
}

/**
 * Obtener tipos de propiedad
 */
export async function getPropertyTypes(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_TYPES);
}

/**
 * Obtener estados de propiedad (Venta, Alquiler, etc.)
 */
export async function getPropertyStatuses(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_STATUS);
}

/**
 * Obtener características de propiedad
 */
export async function getPropertyFeatures(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_FEATURES);
}

/**
 * Obtener ciudades
 */
export async function getPropertyCities(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_CITIES);
}

/**
 * Obtener áreas/zonas
 */
export async function getPropertyAreas(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_AREAS);
}

/**
 * Obtener todas las taxonomías de propiedades de una vez
 */
export async function getAllPropertyTaxonomies() {
  try {
    const [types, statuses, features, cities, areas] = await Promise.all([
      getPropertyTypes(),
      getPropertyStatuses(),
      getPropertyFeatures(),
      getPropertyCities(),
      getPropertyAreas(),
    ]);

    return {
      types,
      statuses,
      features,
      cities,
      areas,
    };
  } catch (error) {
    console.error('Error fetching all property taxonomies:', error);
    return {
      types: [],
      statuses: [],
      features: [],
      cities: [],
      areas: [],
    };
  }
}

/**
 * CONFIGURACIÓN DEL SITIO
 */

/**
 * Obtener configuración completa del sitio
 * Incluye nombre, descripción, menús, idiomas, etc.
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  // MODO FALLBACK: Retornar config por defecto si WordPress está deshabilitado
  if (WORDPRESS_DISABLED) {
    if (IS_DEV) {
      console.log('[WordPress API] DISABLED MODE - Returning default site config');
    }
    return {
      site_name: 'Versus Andorra',
      site_description: 'La mejor rentabilidad como inversión inmobiliaria en Andorra',
      site_url: 'http://localhost:3000',
      contact_email: 'info@versusandorra.com',
      contact_phone: '+376 600 000 000',
    } as SiteConfig;
  }

  try {
    return fetchAPI<SiteConfig>(API_ENDPOINTS.SITE_CONFIG);
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

/**
 * Obtener estadísticas del sitio
 */
export async function getSiteStats() {
  try {
    return fetchAPI(API_ENDPOINTS.SITE_STATS);
  } catch (error) {
    console.error('Error fetching site stats:', error);
    return null;
  }
}

/**
 * UTILIDADES
 */

/**
 * Extraer el texto limpio de un contenido HTML de WordPress
 * @param html - HTML renderizado de WordPress
 * @returns Texto limpio sin HTML
 */
export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Obtener excerpt de un post/propiedad
 * @param content - Contenido o excerpt de WordPress
 * @param maxLength - Longitud máxima del excerpt
 * @returns Excerpt limpio
 */
export function getExcerpt(
  content: { rendered: string } | string,
  maxLength: number = 160
): string {
  const text =
    typeof content === 'string' ? content : stripHTML(content.rendered);

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Formatear precio con símbolo de moneda
 * @param price - Precio como string o número
 * @param currency - Símbolo de moneda (por defecto €)
 * @returns Precio formateado
 */
export function formatPrice(
  price: string | number,
  currency: string = '€'
): string {
  if (!price || price === '0' || price === '') {
    return 'Consultar precio';
  }

  const numericPrice =
    typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price;

  if (isNaN(numericPrice)) {
    return 'Consultar precio';
  }

  // Formatear con separadores de miles
  const formatted = new Intl.NumberFormat('es-ES').format(numericPrice);

  return `${formatted}${currency}`;
}

/**
 * Construir URL completa de WordPress
 * @param path - Ruta relativa
 * @returns URL completa
 */
export function getWordPressURL(path: string): string {
  const baseURL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  return `${baseURL}${path}`;
}

/**
 * Verificar si una URL es interna (del mismo sitio WordPress)
 * @param url - URL a verificar
 * @returns true si es interna, false si es externa
 */
export function isInternalURL(url: string): boolean {
  const baseURL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  return url.startsWith(baseURL) || url.startsWith('/');
}

/**
 * Convertir URL de WordPress a ruta de Next.js
 * @param wordpressURL - URL completa de WordPress
 * @returns Ruta relativa para Next.js
 */
export function convertToNextRoute(wordpressURL: string): string {
  const baseURL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  return wordpressURL.replace(baseURL, '');
}

/**
 * EQUIPO / AGENTES
 */

/**
 * Obtener datos completos de un media por ID
 * Función auxiliar para cuando _embed no incluye el media
 * @param mediaId - ID del media en WordPress
 * @returns Objeto con datos del media o null si falla
 */
async function getMediaById(mediaId: number) {
  try {
    const media = await fetchAPI(`/wp/v2/media/${mediaId}`);
    
    if (IS_DEV) {
      console.log(`[WordPress API] Media ID ${mediaId} obtenido:`, media?.source_url || 'No URL');
    }
    
    return media;
  } catch (error) {
    if (IS_DEV) {
      console.error(`[WordPress API] Error obteniendo media ID ${mediaId}:`, error);
    }
    return null;
  }
}

/**
 * Resolver media IDs faltantes en _embed
 * Detecta miembros con featured_media ID pero sin _embedded['wp:featuredmedia']
 * y hace fetch de los media faltantes para inyectarlos en el objeto
 * @param members - Array de miembros del equipo
 * @returns Array de miembros con todos los medias resueltos
 */
async function resolveMissingMedia(members: any[]) {
  if (!members || members.length === 0) {
    return members;
  }
  
  // Detectar miembros con featured_media pero sin _embedded
  const membersNeedingMedia: Array<{ member: any; index: number }> = [];
  
  members.forEach((member, index) => {
    const hasFeaturedMediaId = member.featured_media && typeof member.featured_media === 'number' && member.featured_media > 0;
    const hasEmbeddedMedia = member._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    
    if (hasFeaturedMediaId && !hasEmbeddedMedia) {
      membersNeedingMedia.push({ member, index });
      
      if (IS_DEV) {
        console.log(`[WordPress API] Miembro "${member.title?.rendered || member.name}" necesita resolver media ID ${member.featured_media}`);
      }
    }
  });
  
  // Si no hay medias faltantes, retornar original
  if (membersNeedingMedia.length === 0) {
    if (IS_DEV) {
      console.log('[WordPress API] Todos los miembros tienen sus medias embebidos correctamente');
    }
    return members;
  }
  
  // Hacer fetch de todos los medias faltantes en paralelo
  if (IS_DEV) {
    console.log(`[WordPress API] Resolviendo ${membersNeedingMedia.length} media(s) faltante(s)...`);
  }
  
  const mediaPromises = membersNeedingMedia.map(({ member }) => 
    getMediaById(member.featured_media)
  );
  
  const mediaResults = await Promise.all(mediaPromises);
  
  // Inyectar los medias obtenidos en los miembros
  membersNeedingMedia.forEach(({ member, index }, i) => {
    const media = mediaResults[i];
    
    if (media && media.source_url) {
      // Inicializar _embedded si no existe
      if (!member._embedded) {
        member._embedded = {};
      }
      
      // Inyectar el media en _embedded
      member._embedded['wp:featuredmedia'] = [media];
      
      if (IS_DEV) {
        console.log(`[WordPress API] ✅ Media resuelto para "${member.title?.rendered || member.name}": ${media.source_url}`);
      }
    } else {
      if (IS_DEV) {
        console.warn(`[WordPress API] ❌ No se pudo resolver media ID ${member.featured_media} para "${member.title?.rendered || member.name}"`);
      }
    }
  });
  
  return members;
}

/**
 * Obtener miembros del equipo
 * Intenta múltiples endpoints posibles para máxima compatibilidad
 * Hace fetch adicional de featured_media si _embed no lo incluye
 * @param params - Parámetros de consulta
 * @returns Lista de miembros del equipo con imágenes resueltas
 */
export async function getTeamMembers(params: WPQueryParams = {}) {
  const defaultParams = {
    per_page: PAGINATION.MAX_PER_PAGE,
    _embed: true,
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  
  // Intentar diferentes endpoints en orden de preferencia
  const possibleEndpoints = [
    API_ENDPOINTS.AGENTS,           // /wp/v2/agents
    '/wp/v2/team',                   // Posible CPT team
    '/wp/v2/team_members',           // Posible CPT team_members
    '/wp/v2/equipo',                 // Posible CPT en español
  ];

  for (const endpoint of possibleEndpoints) {
    try {
      const url = `${endpoint}${queryString}`;
      const data = await fetchAPI(url);
      
      if (IS_DEV) {
        console.log(`[WordPress API] Team members found at: ${endpoint}`);
      }
      
      // Resolver media IDs faltantes antes de retornar
      const resolvedData = await resolveMissingMedia(data);
      return resolvedData;
    } catch (error) {
      // Continuar con el siguiente endpoint
      if (IS_DEV) {
        console.log(`[WordPress API] Team endpoint not found: ${endpoint}`);
      }
    }
  }

  // Si ningún endpoint funciona, intentar con usuarios de WordPress
  try {
    if (IS_DEV) {
      console.log('[WordPress API] Falling back to WordPress users');
    }
    
    const users = await fetchAPI(`/wp/v2/users${queryString}`);
    
    // Filtrar solo usuarios con rol de autor o superior
    // y transformar datos para compatibilidad
    const transformedUsers = users.map((user: any) => ({
      id: user.id,
      title: { rendered: user.name },
      content: { rendered: user.description || '' },
      featured_media: user.avatar_urls?.['96'] || '',
      acf: {
        email: user.email || '',
        phone: user.acf?.phone || '',
        position: user.acf?.position || 'Agente Inmobiliario',
        linkedin: user.acf?.linkedin || '',
        languages: user.acf?.languages || [],
      },
      ...user,
    }));
    
    // Resolver media IDs faltantes antes de retornar
    const resolvedUsers = await resolveMissingMedia(transformedUsers);
    return resolvedUsers;
  } catch (error) {
    console.error('Error fetching team members from any source:', error);
    return [];
  }
}

/**
 * Obtener un miembro del equipo por ID
 * @param id - ID del miembro
 * @returns Miembro del equipo o null
 */
export async function getTeamMemberById(id: string | number) {
  // Intentar primero con el endpoint de agentes
  try {
    const agent = await fetchAPI(`${API_ENDPOINTS.AGENTS}/${id}?_embed=true`);
    return agent;
  } catch (error) {
    // Fallback a usuarios si falla
    try {
      const user = await fetchAPI(`/wp/v2/users/${id}`);
      return {
        id: user.id,
        title: { rendered: user.name },
        content: { rendered: user.description || '' },
        featured_media: user.avatar_urls?.['96'] || '',
        ...user,
      };
    } catch (err) {
      console.error(`Error fetching team member with ID ${id}:`, err);
      return null;
    }
  }
}
