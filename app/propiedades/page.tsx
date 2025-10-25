/**
 * Properties Listing Page
 * 
 * Listado completo de propiedades con paginación.
 * Server Component con ISR para mejor performance.
 * 
 * @page /propiedades
 */

import Link from 'next/link';
import { getProperties, getSiteConfig } from '@/lib/wordpress';
import { PropertyCard as PropertyCardType } from '@/types';
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
 * Props de la página (searchParams para paginación)
 */
interface PropertiesPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  /**
   * Obtener página actual desde query params
   */
  const currentPage = Number(searchParams.page) || 1;
  const perPage = PAGINATION.DEFAULT_PER_PAGE;

  /**
   * Obtener datos de WordPress
   */
  let properties: PropertyCardType[] = [];
  let siteConfig = null;
  let error = null;
  let totalPages = 1;

  try {
    // Obtener configuración del sitio
    siteConfig = await getSiteConfig();

    // Obtener propiedades con paginación
    const allProperties = await getProperties({
      per_page: perPage,
      page: currentPage,
    });

    // Transformar a PropertyCard
    properties = allProperties.map(prop => ({
      id: prop.id,
      title: prop.title.rendered,
      slug: prop.slug,
      excerpt: prop.excerpt.rendered,
      featured_image: prop.featured_image?.url || null,
      price: prop.property_meta?.property_price || '',
      bedrooms: prop.property_meta?.property_bedrooms || '0',
      bathrooms: prop.property_meta?.property_bathrooms || '0',
      area: prop.property_meta?.property_size || '',
      area_unit: prop.property_meta?.property_size_postfix || 'm²',
      address: prop.property_meta?.property_address || '',
      type: null,
      status: null,
      city: null,
      link: prop.link,
      date: prop.date,
      featured: prop.property_meta?.featured === '1',
    }));

    // Calcular total de páginas (estimado, WordPress no siempre devuelve headers)
    // En una implementación real, usarías los headers X-WP-TotalPages
    totalPages = Math.ceil(properties.length / perPage);
    if (properties.length === perPage) {
      totalPages = currentPage + 1; // Hay más páginas
    }
  } catch (err) {
    console.error('Error loading properties:', err);
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

            {/* Barra de Filtros Sticky */}
            <PropertyFilters propertyCount={properties.length} />
          </Container>
        </section>

        {/* Listado de Propiedades */}
        <section className="py-12">
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
