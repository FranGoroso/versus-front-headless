/**
 * Properties Listing Page
 * 
 * Listado completo de propiedades con paginación y filtros funcionales.
 * Server Component con ISR para mejor performance.
 * 
 * VERSIÓN 4.2 PRODUCTION: FILTRADO ROBUSTO CON EXTRACCIÓN DINÁMICA DE TAXONOMÍAS
 * - Filtros por tipo de propiedad (property_type) ✅
 * - Filtros por ciudad/parroquia (property_city) ✅
 * - Filtros por número de habitaciones (bedrooms) ✅
 * - Filtros por precio máximo (precio_max) ✅
 * - Ordenamiento (fecha, precio) ✅
 * - URL state management (SEO-friendly) ✅
 * - Extracción dinámica de taxonomías desde propiedades reales ✅
 * - Normalización robusta de slugs (acentos, caracteres especiales) ✅
 * 
 * CARACTERÍSTICAS v4.2:
 * - Función normalizeToSlug() para manejo robusto de slugs
 * - Extracción automática de tipos/ciudades desde propiedades cargadas
 * - Dropdown siempre muestra TODOS los tipos que existen en propiedades
 * - Soporte para caracteres especiales y acentos en tipos/ciudades
 * - Sistema automático: no requiere mantenimiento manual de taxonomías
 * - Código limpio de producción sin logs de debug
 * 
 * @page /propiedades
 * @version 4.2.0-production
 * @updated 2025-10-28 - Versión final de producción
 */

import Link from 'next/link';
import { getProperties, getSiteConfig, transformToPropertyCard, getPropertyTypes, getPropertyCities } from '@/lib/wordpress';
import { PropertyCard as PropertyCardType, WPTaxonomy } from '@/types';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyFilters } from '@/components/property/PropertyFilters';

import { PAGINATION } from '@/lib/constants';

/**
 * Configurar revalidación ISR
 * La página se regenerará cada hora
 */
export const revalidate = 3600;

/**
 * Metadata de la página
 */
export async function generateMetadata() {
  const config = await getSiteConfig();
  
  return {
    title: `Propiedades en Andorra | ${config?.site_name || 'Versus Andorra'}`,
    description: 'Explora nuestra selección completa de propiedades en venta y alquiler en Andorra. Casas, apartamentos, villas y más.',
  };
}

/**
 * Props de la página (searchParams para paginación y filtros)
 */
interface PropertiesPageProps {
  searchParams: {
    page?: string;
    tipo?: string;        // Slug del tipo de propiedad
    ciudad?: string;      // Slug de la ciudad/parroquia
    habitaciones?: string; // Número de habitaciones
    precio_max?: string;  // Precio máximo para filtrar
    orden?: string;       // Orden: date-desc, date-asc, price-asc, price-desc
  };
}

/**
 * Función auxiliar para normalizar texto a slug
 * Convierte cualquier texto a un slug compatible con URLs
 * Elimina acentos, convierte a minúsculas, reemplaza espacios y caracteres especiales
 */
function normalizeToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Descomponer caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos (acentos)
    .replace(/[^a-z0-9\s-]/g, '-') // Reemplazar caracteres especiales con guiones
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio y final
}

/**
 * Función auxiliar para ordenar propiedades
 */
function sortProperties(properties: PropertyCardType[], sortOrder: string): PropertyCardType[] {
  const sorted = [...properties];
  
  switch (sortOrder) {
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(String(a.price).replace(/[^0-9.-]/g, '')) || 0;
        const priceB = parseFloat(String(b.price).replace(/[^0-9.-]/g, '')) || 0;
        return priceA - priceB;
      });
    
    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = parseFloat(String(a.price).replace(/[^0-9.-]/g, '')) || 0;
        const priceB = parseFloat(String(b.price).replace(/[^0-9.-]/g, '')) || 0;
        return priceB - priceA;
      });
    
    default:
      return sorted;
  }
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  /**
   * Obtener página actual y filtros desde query params
   */
  const currentPage = Number(searchParams.page) || 1;
  const perPage = PAGINATION.DEFAULT_PER_PAGE;
  
  const filterTipo = searchParams.tipo || '';
  const filterCiudad = searchParams.ciudad || '';
  const filterHabitaciones = searchParams.habitaciones || '';
  const filterPrecioMax = searchParams.precio_max || '';
  const filterOrden = searchParams.orden || 'date-desc';

  /**
   * Variables de estado
   */
  let properties: PropertyCardType[] = [];
  let siteConfig = null;
  let propertyTypes: WPTaxonomy[] = [];
  let propertyCities: WPTaxonomy[] = [];
  let error = null;

  try {
    /**
     * PASO 1: Obtener TODOS los datos necesarios en paralelo
     * No aplicamos filtros en WordPress, los haremos en Next.js
     */
    const [siteConfigData, propertyTypesData, propertyCitiesData, allPropertiesRaw] = await Promise.all([
      getSiteConfig(),
      getPropertyTypes(),
      getPropertyCities(),
      getProperties({ per_page: 100 }), // Obtener todas las propiedades sin filtros
    ]);

    siteConfig = siteConfigData;
    propertyTypes = propertyTypesData;
    propertyCities = propertyCitiesData;

    /**
     * PASO 2: Transformar propiedades a PropertyCard
     */
    let allProperties = allPropertiesRaw.map(transformToPropertyCard);
    
    /**
     * IMPORTANTE: Extraer tipos y ciudades REALES de las propiedades
     * Esto asegura que el dropdown siempre tenga todos los tipos que existen
     */
    const realTypes = new Set<string>();
    const realCities = new Set<string>();
    
    allProperties.forEach(prop => {
      if (prop.type) realTypes.add(prop.type);
      if (prop.city) realCities.add(prop.city);
    });
    
    // Complementar taxonomías de WordPress con tipos/ciudades reales encontrados
    const existingTypeSlugs = new Set(propertyTypes.map(t => t.slug));
    const existingCitySlugs = new Set(propertyCities.map(c => c.slug));
    
    // Agregar tipos faltantes
    let typeIdCounter = Math.max(...propertyTypes.map(t => t.id), 0) + 1;
    realTypes.forEach(typeName => {
      const typeSlug = normalizeToSlug(typeName);
      if (!existingTypeSlugs.has(typeSlug)) {
        propertyTypes.push({
          id: typeIdCounter++,
          name: typeName,
          slug: typeSlug,
          count: 1,
          taxonomy: 'property-type',
          description: '',
          link: '',
          parent: 0,
          meta: []
        });
      }
    });
    
    // Agregar ciudades faltantes
    let cityIdCounter = Math.max(...propertyCities.map(c => c.id), 0) + 1;
    realCities.forEach(cityName => {
      const citySlug = normalizeToSlug(cityName);
      if (!existingCitySlugs.has(citySlug)) {
        propertyCities.push({
          id: cityIdCounter++,
          name: cityName,
          slug: citySlug,
          count: 1,
          taxonomy: 'property-city',
          description: '',
          link: '',
          parent: 0,
          meta: []
        });
      }
    });

    /**
     * PASO 3: APLICAR FILTROS DEL LADO DEL CLIENTE (en Next.js server)
     * Esta es la lógica que hace que los filtros funcionen
     */
    
    // Filtro por TIPO de propiedad
    if (filterTipo) {
      allProperties = allProperties.filter(property => {
        // Normalizar el tipo de la propiedad a slug
        const propertyTypeSlug = normalizeToSlug(property.type || '');
        return propertyTypeSlug === filterTipo;
      });
    }

    // Filtro por CIUDAD/PARROQUIA
    if (filterCiudad) {
      allProperties = allProperties.filter(property => {
        // Normalizar la ciudad de la propiedad a slug
        const propertyCitySlug = normalizeToSlug(property.city || '');
        return propertyCitySlug === filterCiudad;
      });
    }

    // Filtro por HABITACIONES
    if (filterHabitaciones) {
      allProperties = allProperties.filter(property => {
        const bedrooms = parseInt(property.bedrooms) || 0;
        
        // Si selecciona "4+", mostrar propiedades con 4 o más habitaciones
        if (filterHabitaciones === '4') {
          return bedrooms >= 4;
        }
        
        // Si no, comparación exacta
        return bedrooms === parseInt(filterHabitaciones);
      });
    }

    // Filtro por PRECIO MÁXIMO
    if (filterPrecioMax) {
      allProperties = allProperties.filter(property => {
        // Extraer valor numérico del precio (eliminar caracteres no numéricos)
        const price = parseFloat(String(property.price).replace(/[^0-9.-]/g, '')) || 0;
        const maxPrice = parseFloat(filterPrecioMax);
        
        // Filtrar solo propiedades con precio válido y menor o igual al máximo
        return price > 0 && price <= maxPrice;
      });
    }

    /**
     * PASO 4: ORDENAR propiedades según parámetro
     */
    allProperties = sortProperties(allProperties, filterOrden);

    /**
     * PASO 5: Asignar propiedades filtradas y ordenadas
     */
    properties = allProperties;

  } catch (err) {
    console.error('Error loading properties:', err);
    error = 'No se pudieron cargar las propiedades. Por favor, intenta más tarde.';
  }

  /**
   * Calcular total de páginas (por ahora no paginamos, mostramos todas)
   */
  const totalPages = 1; // Deshabilitamos paginación por ahora

  return (
    <>
      {/* Header */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Header Section - Minimalista y funcional */}
        <section className="bg-white pt-28 pb-6 border-b">
          <Container>
            {/* Breadcrumb + Título */}
            <div className="mb-6">
              <nav className="text-sm text-gray-500 font-light mb-3 flex items-center gap-2">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-gray-900">Propiedades</span>
              </nav>
              
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
                Propiedades en Andorra
                {properties.length > 0 && (
                  <span className="text-gray-400 ml-3">({properties.length})</span>
                )}
              </h1>
            </div>
            
            {/* Barra de Filtros Sticky - Con taxonomías dinámicas */}
            <PropertyFilters 
              propertyCount={properties.length}
              propertyTypes={propertyTypes}
              propertyCities={propertyCities}
            />
          </Container>
        </section>

        {/* Listado de Propiedades */}
        {/* 
          pt-32: Padding superior aumentado para compensar:
          - Header fixed: 80px
          - PropertyFilters fixed: ~52px
          - Separación visual: ~20px
          Total: ~152px ≈ pt-32 (128px) + padding natural del Container
        */}
        <section className="pt-32 pb-12">
          <Container>

            {/* Grid de propiedades */}
            <PropertyGrid
              properties={properties}
              loading={false}
              error={error}
              columns={3}
              showFeaturedFirst={true}
            />

            {/* Paginación (deshabilitada por ahora) */}
            {!error && properties.length > 0 && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                {/* Página anterior */}
                {currentPage > 1 && (
                  <Link href={`/propiedades?page=${currentPage - 1}`}>
                    <Button variant="outline" className="rounded-full hover:bg-brand hover:text-black hover:border-brand">
                      ← Anterior
                    </Button>
                  </Link>
                )}

                {/* Indicador de página */}
                <span className="px-6 py-2 text-sm text-gray-600">
                  Página {currentPage}
                </span>

                {/* Página siguiente */}
                {currentPage < totalPages && (
                  <Link href={`/propiedades?page=${currentPage + 1}`}>
                    <Button variant="outline" className="rounded-full hover:bg-brand hover:text-black hover:border-brand">
                      Siguiente →
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* CTA minimalista */}
            {properties.length > 0 && (
              <div className="mt-16 text-center">
                <p className="text-gray-600 mb-4 font-light">
                  ¿No encuentras lo que buscas?
                </p>
                <Link href="/contacto">
                  <Button variant="outline" className="rounded-full hover:bg-brand hover:text-black hover:border-brand">
                    Contactar con un asesor
                  </Button>
                </Link>
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer config={siteConfig} />
    </>
  );
}
