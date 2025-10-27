/**
 * Properties Listing Page
 * 
 * Listado completo de propiedades con paginación y filtros funcionales.
 * Server Component con ISR para mejor performance.
 * 
 * Versión 3.1: Diagnóstico de filtros
 * - Filtros por tipo de propiedad (property_type)
 * - Filtros por ciudad/parroquia (property_city)
 * - Filtros por número de habitaciones (bedrooms)
 * - Ordenamiento (fecha, precio)
 * - URL state management (SEO-friendly)
 * - DEBUG: Logs temporales para diagnosticar dropdowns vacíos
 * 
 * @page /propiedades
 * @version 3.1.0
 * @updated 2025-10-27 - Logs de diagnóstico agregados
 */

import Link from 'next/link';
import { getProperties, getSiteConfig, transformToPropertyCard, getPropertyTypes, getPropertyCities } from '@/lib/wordpress';
import { PropertyCard as PropertyCardType } from '@/types';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { DebugTaxonomies } from '@/components/debug/DebugTaxonomies';

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
    orden?: string;       // Orden: date-desc, date-asc, price-asc, price-desc
  };
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
  const filterOrden = searchParams.orden || 'date-desc';

  /**
   * Obtener datos de WordPress
   */
  let properties: PropertyCardType[] = [];
  let siteConfig = null;
  let propertyTypes = [];
  let propertyCities = [];
  let error = null;
  let totalPages = 1;

  try {
    console.log('\n================================================================================');
    console.log('🔍 [SERVER DEBUG] Propiedades Page - Iniciando carga de taxonomías');
    console.log('================================================================================');
    
    // Obtener configuración del sitio y taxonomías en paralelo
    [siteConfig, propertyTypes, propertyCities] = await Promise.all([
      getSiteConfig(),
      getPropertyTypes(),
      getPropertyCities(),
    ]);
    
    // DEBUG: Verificar datos obtenidos en el servidor
    console.log('\n📦 [SERVER DEBUG] Taxonomías recibidas:');
    console.log('   Property Types:');
    console.log('      - Is Array?', Array.isArray(propertyTypes));
    console.log('      - Length:', propertyTypes?.length || 0);
    if (propertyTypes && propertyTypes.length > 0) {
      console.log('      - First 3:', JSON.stringify(propertyTypes.slice(0, 3), null, 2));
    } else {
      console.log('      - ⚠️  ARRAY VACÍO O NULL!');
    }
    
    console.log('\n   Property Cities:');
    console.log('      - Is Array?', Array.isArray(propertyCities));
    console.log('      - Length:', propertyCities?.length || 0);
    if (propertyCities && propertyCities.length > 0) {
      console.log('      - First 3:', JSON.stringify(propertyCities.slice(0, 3), null, 2));
    } else {
      console.log('      - ⚠️  ARRAY VACÍO O NULL!');
    }
    console.log('================================================================================\n');

    /**
     * Construir parámetros de consulta para WordPress
     */
    const queryParams: any = {
      per_page: perPage,
      page: currentPage,
    };

    // Filtro por tipo de propiedad
    if (filterTipo) {
      // Buscar el ID de la taxonomía por slug
      const tipo = propertyTypes.find(t => t.slug === filterTipo);
      if (tipo) {
        queryParams['tipos-propiedad'] = tipo.id;
      }
    }

    // Filtro por ciudad
    if (filterCiudad) {
      // Buscar el ID de la taxonomía por slug
      const ciudad = propertyCities.find(c => c.slug === filterCiudad);
      if (ciudad) {
        queryParams['ciudades-propiedad'] = ciudad.id;
      }
    }

    // Filtro por habitaciones (meta query)
    if (filterHabitaciones) {
      // WordPress REST API soporta meta queries con el formato meta_key y meta_value
      queryParams.meta_key = 'REAL_HOMES_property_bedrooms';
      queryParams.meta_value = filterHabitaciones === '4' ? '4' : filterHabitaciones;
      queryParams.meta_compare = filterHabitaciones === '4' ? '>=' : '=';
    }

    // Ordenamiento
    if (filterOrden) {
      if (filterOrden === 'date-desc') {
        queryParams.orderby = 'date';
        queryParams.order = 'desc';
      } else if (filterOrden === 'date-asc') {
        queryParams.orderby = 'date';
        queryParams.order = 'asc';
      } else if (filterOrden === 'price-asc') {
        queryParams.orderby = 'meta_value_num';
        queryParams.meta_key = 'REAL_HOMES_property_price';
        queryParams.order = 'asc';
      } else if (filterOrden === 'price-desc') {
        queryParams.orderby = 'meta_value_num';
        queryParams.meta_key = 'REAL_HOMES_property_price';
        queryParams.order = 'desc';
      }
    }

    // Obtener propiedades con filtros aplicados
    const allProperties = await getProperties(queryParams);

    // Transformar a PropertyCard usando la función helper (con búsqueda multi-ubicación de precio)
    properties = allProperties.map(transformToPropertyCard);

    // Calcular total de páginas (estimado, WordPress no siempre devuelve headers)
    // En una implementación real, usarías los headers X-WP-TotalPages
    totalPages = Math.ceil(properties.length / perPage);
    if (properties.length === perPage) {
      totalPages = currentPage + 1; // Hay más páginas
    }
  } catch (err) {
    console.error('❌ [SERVER DEBUG] Error loading properties:', err);
    error = 'No se pudieron cargar las propiedades. Por favor, intenta más tarde.';
  }

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

            {/* DEBUG: Componente temporal para verificar datos en el cliente */}
            <DebugTaxonomies propertyTypes={propertyTypes} propertyCities={propertyCities} />
            
            {/* Barra de Filtros Sticky - Ahora con taxonomías dinámicas */}
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

            {/* Paginación */}
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
