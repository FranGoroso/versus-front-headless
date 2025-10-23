/**
 * Tipos para Taxonomías de WordPress
 * Categorías, Tags, y taxonomías personalizadas de propiedades
 */

/**
 * Estructura base de una Taxonomía de WordPress
 */
export interface WPTaxonomy {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
}

/**
 * Tipo de propiedad (Piso, Casa, Apartamento, etc.)
 */
export interface PropertyType extends WPTaxonomy {
  taxonomy: 'property-type';
}

/**
 * Estado de propiedad (Venta, Alquiler, etc.)
 */
export interface PropertyStatus extends WPTaxonomy {
  taxonomy: 'property-status';
}

/**
 * Características de propiedad (Piscina, Garaje, etc.)
 */
export interface PropertyFeature extends WPTaxonomy {
  taxonomy: 'property-feature';
}

/**
 * Ciudad de la propiedad
 */
export interface PropertyCity extends WPTaxonomy {
  taxonomy: 'property-city';
}

/**
 * Área/Zona de la propiedad
 */
export interface PropertyArea extends WPTaxonomy {
  taxonomy: 'property-area';
}

/**
 * Categoría de blog
 */
export interface Category extends WPTaxonomy {
  taxonomy: 'category';
}

/**
 * Etiqueta de blog
 */
export interface Tag extends WPTaxonomy {
  taxonomy: 'post_tag';
}

/**
 * Todas las taxonomías disponibles
 */
export interface AllTaxonomies {
  property_types: PropertyType[];
  property_statuses: PropertyStatus[];
  property_features: PropertyFeature[];
  property_cities: PropertyCity[];
  property_areas: PropertyArea[];
  categories: Category[];
  tags: Tag[];
}

/**
 * Filtros de taxonomías para búsquedas
 */
export interface TaxonomyFilters {
  types?: string[];
  statuses?: string[];
  features?: string[];
  cities?: string[];
  areas?: string[];
  categories?: string[];
  tags?: string[];
}

/**
 * Parámetros de consulta para taxonomías
 */
export interface TaxonomyQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
  hide_empty?: boolean;
  parent?: number;
  slug?: string;
}
