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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Todas las propiedades
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Explora nuestra selección completa de inmuebles en Andorra. 
                Encuentra la propiedad perfecta para ti.
              </p>
              
              {/* Breadcrumb */}
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-black font-medium">Propiedades</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Listado de Propiedades */}
        <section className="py-20">
          <Container>
            {/* Stats */}
            {properties.length > 0 && (
              <div className="flex items-center justify-between mb-12 pb-8 border-b">
                <p className="text-gray-600">
                  Mostrando <span className="font-semibold">{properties.length}</span> propiedades
                  {currentPage > 1 && ` (Página ${currentPage})`}
                </p>
                
                {/* Ordenamiento (futuro) */}
                <div className="hidden md:flex items-center gap-4">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                    <option>Más recientes</option>
                    <option>Precio: menor a mayor</option>
                    <option>Precio: mayor a menor</option>
                    <option>Destacadas</option>
                  </select>
                </div>
              </div>
            )}

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
                    <Button variant="outline" className="rounded-full">
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
                    <Button variant="outline" className="rounded-full">
                      Siguiente →
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* CTA */}
            {properties.length > 0 && (
              <div className="mt-20 text-center bg-gray-50 rounded-2xl p-12">
                <h2 className="font-serif text-3xl font-bold mb-4">
                  ¿No encuentras lo que buscas?
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Nuestro equipo puede ayudarte a encontrar la propiedad perfecta. 
                  Contáctanos y cuéntanos qué necesitas.
                </p>
                <Link href="/contacto">
                  <Button size="lg" className="rounded-full px-12">
                    Contactar un asesor
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
