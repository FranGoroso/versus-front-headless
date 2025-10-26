/**
 * Tipos específicos para Propiedades Inmobiliarias
 * Basado en Easy Real Estate y RealHomes
 */

import { WPPost, WPFeaturedImage, WPGalleryImage } from './wordpress';
import { WPTaxonomy } from './taxonomy';

/**
 * Propiedad inmobiliaria completa
 * Extiende de WPPost y añade campos específicos
 */
export interface Property extends WPPost {
  type: 'property';
  
  // Campos personalizados de la propiedad
  property_meta: PropertyMeta;
  
  // Galería de imágenes
  gallery: WPGalleryImage[];
  
  // Agente asignado
  agent: PropertyAgent | null;
  
  // Imagen destacada con información completa
  featured_image: WPFeaturedImage | null;
  
  // Taxonomías (extraídas de _embedded['wp:term'])
  property_types?: WPTaxonomy[];
  property_statuses?: WPTaxonomy[];
  property_features?: WPTaxonomy[];
  property_cities?: WPTaxonomy[];
}

/**
 * Metadata de la propiedad
 * Campos personalizados de RealHomes / Easy Real Estate
 */
export interface PropertyMeta {
  // Precio
  property_price?: string;
  property_price_postfix?: string;
  property_old_price?: string;
  
  // Dimensiones
  property_size?: string;
  property_size_postfix?: string; // m², sqft, etc.
  property_lot_size?: string;
  property_lot_size_postfix?: string;
  
  // Habitaciones y baños
  property_bedrooms?: string;
  property_bathrooms?: string;
  property_garage?: string;
  
  // Ubicación
  property_address?: string;
  property_location?: string; // Coordenadas del mapa
  property_map?: string;
  
  // Información adicional
  property_year_built?: string;
  property_id?: string;
  
  // Estado de la propiedad
  featured?: '1' | '0';
  
  // Agente
  agents?: number | number[];
  
  // Video
  property_video_url?: string;
  property_virtual_tour?: string;
  
  // Otros campos personalizados
  [key: string]: any;
}

/**
 * Agente inmobiliario asignado a la propiedad
 */
export interface PropertyAgent {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  image: string | null;
}

/**
 * Formato simplificado de propiedad para listados
 */
export interface PropertyCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  area_unit: string;
  address: string;
  type: string | null;
  status: string | null;
  city: string | null;
  link: string;
  date: string;
  featured: boolean;
}

/**
 * Datos completos de propiedad formateados para detalle
 */
export interface PropertyDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  price: string;
  old_price?: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  area: string;
  area_unit: string;
  lot_size?: string;
  lot_size_unit?: string;
  address: string;
  location: string;
  gallery: WPGalleryImage[];
  type: string | null;
  status: string | null;
  features: string[];
  city: string | null;
  year_built?: string;
  property_id?: string;
  video_url?: string;
  virtual_tour?: string;
  agent: PropertyAgent | null;
  link: string;
  date: string;
  featured: boolean;
}

/**
 * Parámetros de búsqueda de propiedades
 */
export interface PropertySearchParams {
  page?: number;
  per_page?: number;
  min_price?: number;
  max_price?: number;
  min_beds?: number;
  max_beds?: number;
  min_baths?: number;
  max_baths?: number;
  min_area?: number;
  max_area?: number;
  property_type?: string | string[];
  property_status?: string | string[];
  city?: string | string[];
  featured?: boolean;
  orderby?: 'price_asc' | 'price_desc' | 'date' | 'title';
  search?: string;
}

/**
 * Respuesta de búsqueda de propiedades
 */
export interface PropertySearchResponse {
  properties: PropertyCard[];
  total: number;
  total_pages: number;
  current_page: number;
}

/**
 * Estadísticas de propiedades
 */
export interface PropertyStats {
  total_properties: number;
  for_sale: number;
  for_rent: number;
  featured: number;
  by_type: Record<string, number>;
  by_city: Record<string, number>;
  price_range: {
    min: number;
    max: number;
    average: number;
  };
}
