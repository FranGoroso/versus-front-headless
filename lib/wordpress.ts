/**
 * Servicio principal de WordPress API
 * Funciones para conectar Next.js con WordPress Headless
 */

import {
  Property,
  PropertyCard,
  PropertyCard as PropertyCardType,
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
 * Extraer taxonomías del objeto _embedded['wp:term']
 * WordPress devuelve las taxonomías en un array anidado cuando usamos ?_embed
 * Estructura: _embedded['wp:term'] = [[features...], [types...], [cities...], [statuses...]]
 * 
 * @param embedded - Objeto _embedded de la respuesta de WordPress
 * @returns Objeto con taxonomías organizadas por tipo
 */
function extractTaxonomiesFromEmbed(embedded: any): {
  types: WPTaxonomy[];
  statuses: WPTaxonomy[];
  features: WPTaxonomy[];
  cities: WPTaxonomy[];
} {
  const result = {
    types: [] as WPTaxonomy[],
    statuses: [] as WPTaxonomy[],
    features: [] as WPTaxonomy[],
    cities: [] as WPTaxonomy[],
  };

  // Verificar que existe el array de términos embebidos
  if (!embedded || !embedded['wp:term'] || !Array.isArray(embedded['wp:term'])) {
    return result;
  }

  const wpTermArray = embedded['wp:term'];

  // Recorrer cada subarray y clasificar por taxonomy
  wpTermArray.forEach((termGroup: any[]) => {
    if (!Array.isArray(termGroup)) return;

    termGroup.forEach((term: any) => {
      // Clasificar según el tipo de taxonomía
      switch (term.taxonomy) {
        case 'property-type':
          result.types.push(term);
          break;
        case 'property-status':
          result.statuses.push(term);
          break;
        case 'property-feature':
          result.features.push(term);
          break;
        case 'property-city':
          result.cities.push(term);
          break;
      }
    });
  });

  return result;
}

/**
 * PROPIEDADES
 */

/**
 * Obtener lista de propiedades
 * @param params - Parámetros de consulta (paginación, filtros, etc.)
 * @returns Lista de propiedades con taxonomías procesadas
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

  const properties = await fetchAPI<Property[]>(endpoint);

  // Procesar taxonomías embebidas en cada propiedad
  const propertiesWithTaxonomies = properties.map((property: any) => {
    if (property._embedded) {
      const taxonomies = extractTaxonomiesFromEmbed(property._embedded);
      
      return {
        ...property,
        property_types: taxonomies.types,
        property_statuses: taxonomies.statuses,
        property_features: taxonomies.features,
        property_cities: taxonomies.cities,
      };
    }
    
    return property;
  });

  return propertiesWithTaxonomies;
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

    const property = properties[0] || null;
    
    // Procesar taxonomías si la propiedad existe
    if (property && (property as any)._embedded) {
      const taxonomies = extractTaxonomiesFromEmbed((property as any)._embedded);
      
      return {
        ...property,
        property_types: taxonomies.types,
        property_statuses: taxonomies.statuses,
        property_features: taxonomies.features,
        property_cities: taxonomies.cities,
      } as Property;
    }

    return property;
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
 * Obtener características de propiedad
 */
export async function getPropertyFeatures(): Promise<WPTaxonomy[]> {
  return getTaxonomy(API_ENDPOINTS.PROPERTY_FEATURES);
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
 * Transformar Property de WordPress a PropertyCard para el frontend
 * Busca el precio en múltiples ubicaciones posibles para máxima compatibilidad
 * @param prop - Propiedad raw de WordPress
 * @returns PropertyCard listo para usar en el frontend
 */
export function transformToPropertyCard(prop: any): PropertyCardType {
  // DEBUG: Log temporal para diagnóstico
  if (IS_DEV) {
    console.log('[transformToPropertyCard] Procesando:', prop.title?.rendered || prop.id);
    console.log('[transformToPropertyCard] property_meta:', prop.property_meta);
    console.log('[transformToPropertyCard] acf:', prop.acf);
    console.log('[transformToPropertyCard] meta:', prop.meta);
  }
  
  // Buscar precio en múltiples ubicaciones posibles
  // RealHomes plugin usa REAL_HOMES_property_price
  const price = prop.property_meta?.REAL_HOMES_property_price
             || prop.property_meta?.property_price 
             || prop.property_meta?.price 
             || prop.acf?.property_price 
             || prop.acf?.price 
             || prop.meta?.property_price
             || '';
  
  // DEBUG: Log del precio encontrado
  if (IS_DEV) {
    console.log('[transformToPropertyCard] Precio encontrado:', price);
    console.log('[transformToPropertyCard] ---');
  }
  
  return {
    id: prop.id,
    title: prop.title.rendered,
    slug: prop.slug,
    excerpt: prop.excerpt.rendered,
    featured_image: prop.featured_image?.url || null,
    price: price,
    // RealHomes usa campos con prefijo REAL_HOMES_
    bedrooms: prop.property_meta?.REAL_HOMES_property_bedrooms 
           || prop.property_meta?.property_bedrooms 
           || '0',
    bathrooms: prop.property_meta?.REAL_HOMES_property_bathrooms 
            || prop.property_meta?.property_bathrooms 
            || '0',
    area: prop.property_meta?.REAL_HOMES_property_size 
       || prop.property_meta?.property_size 
       || '',
    area_unit: prop.property_meta?.property_size_postfix || 'm²',
    address: prop.property_meta?.REAL_HOMES_property_address 
          || prop.property_meta?.property_address 
          || '',
    // Extraer taxonomías de los arrays procesados por getProperties()
    type: prop.property_types?.[0]?.name || null,
    status: prop.property_statuses?.[0]?.name || null,
    city: prop.property_cities?.[0]?.name || null,
    link: prop.link,
    date: prop.date,
    featured: prop.property_meta?.featured === '1',
  };
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
  // Validar precio vacío o nulo
  if (!price || price === '0' || price === '' || price === null || price === undefined) {
    return 'Consultar precio';
  }

  // Convertir a string para procesamiento uniforme
  const priceStr = String(price).trim();
  
  // Si el precio ya es "Consultar precio" o similar, retornarlo directamente
  if (priceStr.toLowerCase().includes('consultar')) {
    return priceStr;
  }

  // Extraer solo números, puntos y guiones
  const numericPrice = typeof price === 'string' 
    ? parseFloat(price.replace(/[^0-9.-]+/g, '')) 
    : Number(price);

  // Validar que sea un número válido y mayor a 0
  if (isNaN(numericPrice) || numericPrice <= 0) {
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

/**
 * ==============================================================
 * TAXONOMÍAS DE PROPIEDADES
 * ==============================================================
 * Funciones para obtener taxonomías de propiedades (tipos, ciudades, estados)
 * Usadas para poblar filtros dinámicamente desde WordPress
 */

/**
 * Obtener tipos de propiedades (property_type)
 * Ejemplos: Apartamento, Casa, Chalet, Local Comercial, etc.
 * @param params - Parámetros de consulta opcionales
 * @returns Lista de tipos de propiedades
 */
export async function getPropertyTypes(params: WPQueryParams = {}) {
  const defaultParams = {
    per_page: 100, // Obtener todos los tipos
    hide_empty: true, // Solo tipos con propiedades
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  
  try {
    const types = await fetchAPI<WPTaxonomy[]>(`${API_ENDPOINTS.PROPERTY_TYPES}${queryString}`);
    
    if (IS_DEV) {
      console.log(`[WordPress API] Found ${types.length} property types`);
    }
    
    // Si no hay datos de WordPress, usar datos de fallback
    if (!types || types.length === 0) {
      if (IS_DEV) {
        console.log('[WordPress API] Using fallback property types');
      }
      return [
        { id: 1, name: 'Apartamento', slug: 'apartamento', count: 0, taxonomy: 'property-type' },
        { id: 2, name: 'Casa', slug: 'casa', count: 0, taxonomy: 'property-type' },
        { id: 3, name: 'Chalet', slug: 'chalet', count: 0, taxonomy: 'property-type' },
        { id: 4, name: 'Villa', slug: 'villa', count: 0, taxonomy: 'property-type' },
        { id: 5, name: 'Piso', slug: 'piso', count: 0, taxonomy: 'property-type' },
        { id: 6, name: 'Local Comercial', slug: 'local-comercial', count: 0, taxonomy: 'property-type' },
        { id: 7, name: 'Ático', slug: 'atico', count: 0, taxonomy: 'property-type' },
        { id: 8, name: 'Estudio', slug: 'estudio', count: 0, taxonomy: 'property-type' },
      ] as WPTaxonomy[];
    }
    
    return types;
  } catch (error) {
    if (IS_DEV) {
      console.error('[WordPress API] Error fetching property types:', error);
      console.log('[WordPress API] Using fallback property types');
    }
    // Retornar datos de fallback en caso de error
    return [
      { id: 1, name: 'Apartamento', slug: 'apartamento', count: 0, taxonomy: 'property-type' },
      { id: 2, name: 'Casa', slug: 'casa', count: 0, taxonomy: 'property-type' },
      { id: 3, name: 'Chalet', slug: 'chalet', count: 0, taxonomy: 'property-type' },
      { id: 4, name: 'Villa', slug: 'villa', count: 0, taxonomy: 'property-type' },
      { id: 5, name: 'Piso', slug: 'piso', count: 0, taxonomy: 'property-type' },
    ] as WPTaxonomy[];
  }
}

/**
 * Obtener ciudades/parroquias de propiedades (property_city)
 * Ejemplos: Andorra la Vella, Escaldes-Engordany, Encamp, etc.
 * @param params - Parámetros de consulta opcionales
 * @returns Lista de ciudades/parroquias
 */
export async function getPropertyCities(params: WPQueryParams = {}) {
  const defaultParams = {
    per_page: 100, // Obtener todas las ciudades
    hide_empty: true, // Solo ciudades con propiedades
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  
  try {
    const cities = await fetchAPI<WPTaxonomy[]>(`${API_ENDPOINTS.PROPERTY_CITIES}${queryString}`);
    
    if (IS_DEV) {
      console.log(`[WordPress API] Found ${cities.length} property cities`);
    }
    
    // Si no hay datos de WordPress, usar datos de fallback (parroquias de Andorra)
    if (!cities || cities.length === 0) {
      if (IS_DEV) {
        console.log('[WordPress API] Using fallback property cities (Andorra parishes)');
      }
      return [
        { id: 1, name: 'Andorra la Vella', slug: 'andorra-la-vella', count: 0, taxonomy: 'property-city' },
        { id: 2, name: 'Canillo', slug: 'canillo', count: 0, taxonomy: 'property-city' },
        { id: 3, name: 'Encamp', slug: 'encamp', count: 0, taxonomy: 'property-city' },
        { id: 4, name: 'Escaldes-Engordany', slug: 'escaldes-engordany', count: 0, taxonomy: 'property-city' },
        { id: 5, name: 'La Massana', slug: 'la-massana', count: 0, taxonomy: 'property-city' },
        { id: 6, name: 'Ordino', slug: 'ordino', count: 0, taxonomy: 'property-city' },
        { id: 7, name: 'Sant Julià de Lòria', slug: 'sant-julia-de-loria', count: 0, taxonomy: 'property-city' },
      ] as WPTaxonomy[];
    }
    
    return cities;
  } catch (error) {
    if (IS_DEV) {
      console.error('[WordPress API] Error fetching property cities:', error);
      console.log('[WordPress API] Using fallback property cities');
    }
    // Retornar datos de fallback en caso de error (parroquias de Andorra)
    return [
      { id: 1, name: 'Andorra la Vella', slug: 'andorra-la-vella', count: 0, taxonomy: 'property-city' },
      { id: 2, name: 'Canillo', slug: 'canillo', count: 0, taxonomy: 'property-city' },
      { id: 3, name: 'Encamp', slug: 'encamp', count: 0, taxonomy: 'property-city' },
      { id: 4, name: 'Escaldes-Engordany', slug: 'escaldes-engordany', count: 0, taxonomy: 'property-city' },
      { id: 5, name: 'La Massana', slug: 'la-massana', count: 0, taxonomy: 'property-city' },
      { id: 6, name: 'Ordino', slug: 'ordino', count: 0, taxonomy: 'property-city' },
      { id: 7, name: 'Sant Julià de Lòria', slug: 'sant-julia-de-loria', count: 0, taxonomy: 'property-city' },
    ] as WPTaxonomy[];
  }
}

/**
 * Obtener estados de propiedades (property_status)
 * Ejemplos: En Venta, En Alquiler, Vendido, Reservado, etc.
 * @param params - Parámetros de consulta opcionales
 * @returns Lista de estados de propiedades
 */
export async function getPropertyStatuses(params: WPQueryParams = {}) {
  const defaultParams = {
    per_page: 100, // Obtener todos los estados
    hide_empty: true, // Solo estados con propiedades
    ...params,
  };

  const queryString = buildQueryString(defaultParams);
  
  try {
    const statuses = await fetchAPI<WPTaxonomy[]>(`${API_ENDPOINTS.PROPERTY_STATUS}${queryString}`);
    
    if (IS_DEV) {
      console.log(`[WordPress API] Found ${statuses.length} property statuses`);
    }
    
    // Si no hay datos de WordPress, usar datos de fallback
    if (!statuses || statuses.length === 0) {
      if (IS_DEV) {
        console.log('[WordPress API] Using fallback property statuses');
      }
      return [
        { id: 1, name: 'En Venta', slug: 'en-venta', count: 0, taxonomy: 'property-status' },
        { id: 2, name: 'En Alquiler', slug: 'en-alquiler', count: 0, taxonomy: 'property-status' },
        { id: 3, name: 'Vendido', slug: 'vendido', count: 0, taxonomy: 'property-status' },
        { id: 4, name: 'Alquilado', slug: 'alquilado', count: 0, taxonomy: 'property-status' },
      ] as WPTaxonomy[];
    }
    
    return statuses;
  } catch (error) {
    if (IS_DEV) {
      console.error('[WordPress API] Error fetching property statuses:', error);
      console.log('[WordPress API] Using fallback property statuses');
    }
    // Retornar datos de fallback en caso de error
    return [
      { id: 1, name: 'En Venta', slug: 'en-venta', count: 0, taxonomy: 'property-status' },
      { id: 2, name: 'En Alquiler', slug: 'en-alquiler', count: 0, taxonomy: 'property-status' },
    ] as WPTaxonomy[];
  }
}
