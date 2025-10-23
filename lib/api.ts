/**
 * Helpers y utilidades adicionales para API
 * Funciones auxiliares para transformar datos, cache, etc.
 */

import { Property, PropertyCard, PropertyDetail } from '@/types';

/**
 * Transformar propiedad completa a formato de tarjeta (listado)
 * Reduce el tamaño de datos para listados
 */
export function transformPropertyToCard(property: Property): PropertyCard {
  return {
    id: property.id,
    title: property.title.rendered,
    slug: property.slug,
    excerpt: property.excerpt.rendered,
    featured_image: property.featured_image?.url || null,
    price: property.property_meta?.property_price || '',
    bedrooms: property.property_meta?.property_bedrooms || '0',
    bathrooms: property.property_meta?.property_bathrooms || '0',
    area: property.property_meta?.property_size || '',
    area_unit: property.property_meta?.property_size_postfix || 'm²',
    address: property.property_meta?.property_address || '',
    type: null, // Se obtiene de taxonomías si es necesario
    status: null, // Se obtiene de taxonomías si es necesario
    city: null, // Se obtiene de taxonomías si es necesario
    link: property.link,
    date: property.date,
    featured: property.property_meta?.featured === '1',
  };
}

/**
 * Transformar propiedad completa a formato de detalle
 */
export function transformPropertyToDetail(property: Property): PropertyDetail {
  return {
    id: property.id,
    title: property.title.rendered,
    slug: property.slug,
    content: property.content.rendered,
    excerpt: property.excerpt.rendered,
    featured_image: property.featured_image?.url || null,
    price: property.property_meta?.property_price || '',
    old_price: property.property_meta?.property_old_price,
    bedrooms: property.property_meta?.property_bedrooms || '0',
    bathrooms: property.property_meta?.property_bathrooms || '0',
    garage: property.property_meta?.property_garage || '0',
    area: property.property_meta?.property_size || '',
    area_unit: property.property_meta?.property_size_postfix || 'm²',
    lot_size: property.property_meta?.property_lot_size,
    lot_size_unit: property.property_meta?.property_lot_size_postfix,
    address: property.property_meta?.property_address || '',
    location: property.property_meta?.property_location || '',
    gallery: property.gallery || [],
    type: null, // Se obtiene de taxonomías
    status: null, // Se obtiene de taxonomías
    features: [], // Se obtiene de taxonomías
    city: null, // Se obtiene de taxonomías
    year_built: property.property_meta?.property_year_built,
    property_id: property.property_meta?.property_id,
    video_url: property.property_meta?.property_video_url,
    virtual_tour: property.property_meta?.property_virtual_tour,
    agent: property.agent,
    link: property.link,
    date: property.date,
    featured: property.property_meta?.featured === '1',
  };
}

/**
 * Agrupar propiedades por una clave específica
 * @param properties - Array de propiedades
 * @param key - Clave para agrupar
 * @returns Objeto con propiedades agrupadas
 */
export function groupPropertiesBy(
  properties: PropertyCard[],
  key: keyof PropertyCard
): Record<string, PropertyCard[]> {
  return properties.reduce((acc, property) => {
    const value = property[key];
    const groupKey = value ? String(value) : 'sin-categoria';

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(property);
    return acc;
  }, {} as Record<string, PropertyCard[]>);
}

/**
 * Ordenar propiedades por diferentes criterios
 */
export function sortProperties(
  properties: PropertyCard[],
  sortBy: 'price_asc' | 'price_desc' | 'date' | 'title'
): PropertyCard[] {
  const sorted = [...properties];

  switch (sortBy) {
    case 'price_asc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, '')) || 0;
        return priceA - priceB;
      });

    case 'price_desc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, '')) || 0;
        const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, '')) || 0;
        return priceB - priceA;
      });

    case 'date':
      return sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}

/**
 * Filtrar propiedades localmente (lado cliente)
 * Útil para filtros rápidos sin llamar al API
 */
export function filterProperties(
  properties: PropertyCard[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    minBeds?: number;
    maxBeds?: number;
    type?: string;
    status?: string;
    city?: string;
    search?: string;
  }
): PropertyCard[] {
  return properties.filter((property) => {
    // Filtro de precio
    if (filters.minPrice || filters.maxPrice) {
      const price = parseFloat(property.price.replace(/[^0-9.-]+/g, '')) || 0;
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
    }

    // Filtro de habitaciones
    if (filters.minBeds) {
      const beds = parseInt(property.bedrooms) || 0;
      if (beds < filters.minBeds) return false;
    }

    if (filters.maxBeds) {
      const beds = parseInt(property.bedrooms) || 0;
      if (beds > filters.maxBeds) return false;
    }

    // Filtro de tipo
    if (filters.type && property.type !== filters.type) return false;

    // Filtro de estado
    if (filters.status && property.status !== filters.status) return false;

    // Filtro de ciudad
    if (filters.city && property.city !== filters.city) return false;

    // Filtro de búsqueda por texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = property.title.toLowerCase().includes(searchLower);
      const matchesAddress = property.address
        .toLowerCase()
        .includes(searchLower);
      if (!matchesTitle && !matchesAddress) return false;
    }

    return true;
  });
}

/**
 * Calcular estadísticas de un conjunto de propiedades
 */
export function calculatePropertyStats(properties: PropertyCard[]) {
  const prices = properties
    .map((p) => parseFloat(p.price.replace(/[^0-9.-]+/g, '')) || 0)
    .filter((price) => price > 0);

  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  const avgPrice =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : 0;

  const byType = groupPropertiesBy(properties, 'type');
  const byStatus = groupPropertiesBy(properties, 'status');
  const byCity = groupPropertiesBy(properties, 'city');

  return {
    total: properties.length,
    featured: properties.filter((p) => p.featured).length,
    price: {
      min: minPrice,
      max: maxPrice,
      avg: avgPrice,
    },
    byType: Object.entries(byType).map(([type, props]) => ({
      type,
      count: props.length,
    })),
    byStatus: Object.entries(byStatus).map(([status, props]) => ({
      status,
      count: props.length,
    })),
    byCity: Object.entries(byCity).map(([city, props]) => ({
      city,
      count: props.length,
    })),
  };
}

/**
 * Validar si una propiedad tiene todos los datos mínimos necesarios
 */
export function isValidProperty(property: PropertyCard): boolean {
  return !!(
    property.id &&
    property.title &&
    property.slug &&
    property.price
  );
}

/**
 * Sanitizar HTML de WordPress para evitar XSS
 * Usado principalmente en excerpts y contenidos
 */
export function sanitizeHTML(html: string): string {
  // Eliminar scripts y estilos
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Permitir solo tags seguros
  const allowedTags = ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  // Esta es una sanitización básica, en producción considera usar una librería como DOMPurify
  
  return clean;
}

/**
 * Generar breadcrumbs para navegación
 */
export function generateBreadcrumbs(path: string, title?: string) {
  const segments = path.split('/').filter(Boolean);
  
  const breadcrumbs = [
    { title: 'Inicio', url: '/', isActive: false },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      title: isLast && title ? title : segment.replace(/-/g, ' '),
      url: isLast ? undefined : currentPath,
      isActive: isLast,
    });
  });

  return breadcrumbs;
}

/**
 * Delay helper para rate limiting o retries
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry helper para peticiones fallidas
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await delay(delayMs * (i + 1)); // Exponential backoff
      }
    }
  }

  throw lastError!;
}
