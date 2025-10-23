/**
 * Home Page
 * 
 * Página de inicio del sitio con datos dinámicos de WordPress.
 * Server Component - los datos se obtienen en el servidor con ISR.
 */

import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProperties, getSiteConfig } from '@/lib/wordpress';
import { PropertyCard as PropertyCardType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { ErrorMessage } from '@/components/common/ErrorMessage';

/**
 * Configurar revalidación ISR
 * La página se regenerará cada hora
 */
export const revalidate = 3600;

/**
 * Metadata dinámico
 */
export async function generateMetadata() {
  const config = await getSiteConfig();
  
  return {
    title: config?.site_name || 'Versus Andorra Real Estate',
    description: config?.site_description || 'La mejor rentabilidad como inversión inmobiliaria en Andorra',
  };
}

export default async function Home() {
  /**
   * Obtener datos de WordPress
   */
  let featuredProperties: PropertyCardType[] = [];
  let siteConfig = null;
  let error = null;

  try {
    // Obtener propiedades destacadas (máximo 6)
    featuredProperties = await getFeaturedProperties(6);
    
    // Obtener configuración del sitio
    siteConfig = await getSiteConfig();
  } catch (err) {
    console.error('Error loading data:', err);
    error = 'No se pudieron cargar las propiedades. Por favor, intenta más tarde.';
  }

  // Si no hay propiedades destacadas, mostrar las últimas 6
  if (featuredProperties.length === 0 && !error) {
    const { getProperties } = await import('@/lib/wordpress');
    try {
      const allProperties = await getProperties({ per_page: 6 });
      featuredProperties = allProperties.map(prop => ({
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
    } catch (err) {
      console.error('Error loading properties:', err);
    }
  }

  return (
    <>
      {/* Header dinámico */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury property"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Tu hogar perfecto<br />te está esperando
            </h1>
            <p className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto">
              {siteConfig?.site_description || 'Descubre propiedades exclusivas con el servicio personalizado que mereces'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/propiedades">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full px-8">
                  Ver propiedades
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                  Agendar visita
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Propiedades Destacadas */}
        <section className="py-32 bg-white">
          <Container>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Propiedades destacadas
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Selección exclusiva de inmuebles con las mejores ubicaciones y amenidades
              </p>
            </div>

            {/* Manejo de errores */}
            {error && (
              <div className="mb-8">
                <ErrorMessage
                  title="Error al cargar propiedades"
                  message={error}
                  variant="error"
                />
              </div>
            )}

            {/* Grid de propiedades usando el componente */}
            <PropertyGrid
              properties={featuredProperties}
              loading={false}
              error={error}
              columns={3}
              showFeaturedFirst={true}
            />

            {/* Botón ver todas */}
            {featuredProperties.length > 0 && (
              <div className="text-center mt-16">
                <Link href="/propiedades">
                  <Button size="lg" variant="outline" className="rounded-full px-12">
                    Ver todas las propiedades
                  </Button>
                </Link>
              </div>
            )}
          </Container>
        </section>

        {/* Sección Experiencia */}
        <section className="relative py-40 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">
              Experiencia que marca la diferencia
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed">
              En Versus, cada propiedad cuenta una historia única. Nuestro compromiso es conectarte con espacios que reflejen tu estilo de vida y aspiraciones.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
              <div>
                <div className="text-5xl font-serif font-bold mb-2">500+</div>
                <div className="text-white/80">Propiedades vendidas</div>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold mb-2">15</div>
                <div className="text-white/80">Años de experiencia</div>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold mb-2">98%</div>
                <div className="text-white/80">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-32 bg-white">
          <Container>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Nuestros servicios
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Soluciones integrales para todas tus necesidades inmobiliarias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                {
                  image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800',
                  title: 'Compra',
                  description: 'Te acompañamos en cada paso del proceso de compra, desde la búsqueda inicial hasta la firma final, garantizando una experiencia sin complicaciones.'
                },
                {
                  image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
                  title: 'Venta',
                  description: 'Maximizamos el valor de tu propiedad con estrategias de marketing personalizadas y una red de compradores calificados.'
                },
                {
                  image: 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800',
                  title: 'Alquiler',
                  description: 'Gestión completa de alquileres con inquilinos verificados y un servicio de atención que protege tu inversión.'
                },
                {
                  image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
                  title: 'Asesoría',
                  description: 'Consultoría especializada en inversiones inmobiliarias y análisis de mercado para tomar las mejores decisiones.'
                }
              ].map((service, index) => (
                <div key={index} className="group">
                  <div className="relative h-96 mb-8 overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-32 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Hablemos
              </h2>
              <p className="text-gray-600 text-lg">
                Estamos aquí para ayudarte a encontrar tu próximo hogar
              </p>
            </div>

            <Card className="p-12 border-0 shadow-xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre</label>
                    <input 
                      type="text" 
                      placeholder="Tu nombre" 
                      className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Apellido</label>
                    <input 
                      type="text" 
                      placeholder="Tu apellido" 
                      className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input 
                    type="tel" 
                    placeholder="+376 600 000" 
                    className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    placeholder="Cuéntanos qué estás buscando..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full h-14 text-base">
                  Enviar mensaje
                </Button>
              </form>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer dinámico */}
      <Footer config={siteConfig} />
    </>
  );
}
