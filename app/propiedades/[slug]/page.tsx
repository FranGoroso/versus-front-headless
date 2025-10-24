/**
 * Property Detail Page
 * 
 * Página de detalle individual de una propiedad.
 * Genera rutas estáticas en build time usando generateStaticParams.
 * 
 * @page /propiedades/[slug]
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getAllPropertySlugs, getSiteConfig, formatPrice } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { PropertySearchForm } from '@/components/sections/PropertySearchForm';
import { PropertyCard } from '@/components/property/PropertyCard';
import { REVALIDATE_TIME } from '@/lib/constants';

/**
 * Configurar revalidación ISR
 */
export const revalidate = REVALIDATE_TIME.PROPERTY_DETAIL;

/**
 * Generar rutas estáticas en build time
 */
export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generar metadata dinámica para SEO
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  
  if (!property) {
    return {
      title: 'Propiedad no encontrada',
    };
  }
  
  return {
    title: `${property.title.rendered} | Versus Andorra`,
    description: property.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

/**
 * Props de la página
 */
interface PropertyDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  /**
   * Obtener datos de la propiedad
   */
  const property = await getPropertyBySlug(params.slug);
  const siteConfig = await getSiteConfig();

  /**
   * Si no existe, mostrar 404
   */
  if (!property) {
    notFound();
  }

  /**
   * Extraer datos de la propiedad
   */
  const {
    title,
    content,
    excerpt,
    featured_image,
    property_meta,
    gallery,
    agent,
  } = property;

  const price = property_meta?.property_price || '';
  const bedrooms = property_meta?.property_bedrooms || '0';
  const bathrooms = property_meta?.property_bathrooms || '0';
  const area = property_meta?.property_size || '';
  const areaUnit = property_meta?.property_size_postfix || 'm²';
  const address = property_meta?.property_address || '';
  const yearBuilt = property_meta?.property_year_built || '';
  const propertyId = property_meta?.property_id || '';

  return (
    <>
      {/* Header */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-6">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-gray-600 font-light">
              <Link href="/" className="hover:text-black transition-colors">
                Inicio
              </Link>
              <span>›</span>
              <Link href="/propiedades" className="hover:text-black transition-colors">
                Propiedades
              </Link>
              <span>›</span>
              <span className="text-black line-clamp-1">
                {title.rendered}
              </span>
            </nav>
          </Container>
        </section>

        {/* Galería de Imágenes */}
        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Imagen principal */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                {featured_image?.url ? (
                  <Image
                    src={featured_image.url}
                    alt={title.rendered}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Grid de galería */}
              <div className="grid grid-cols-2 gap-4">
                {gallery && gallery.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="relative h-[240px] rounded-xl overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt || `Galería ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
                {(!gallery || gallery.length === 0) && (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative h-[240px] rounded-xl bg-gray-100" />
                  ))
                )}
              </div>
            </div>

            {/* Botón ver todas las fotos */}
            {gallery && gallery.length > 4 && (
              <div className="mt-4 text-center">
                <Button variant="outline" className="rounded-full">
                  Ver todas las fotos ({gallery.length})
                </Button>
              </div>
            )}
          </Container>
        </section>

        {/* Información Principal */}
        <section className="py-8">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Columna izquierda - Información */}
              <div className="lg:col-span-2">
                {/* Título y precio */}
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                    {title.rendered}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4 font-light">{address}</p>
                  <div className="flex items-end gap-4">
                    <p className="text-5xl font-light tracking-tight">
                      {formatPrice(price)}
                    </p>
                    {propertyId && (
                      <p className="text-gray-500 text-sm mb-2 font-light">
                        Ref: {propertyId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Características principales */}
                <Card className="p-8 mb-8 border-0 shadow-sm">
                  <h2 className="text-2xl font-light tracking-tight mb-6">
                    Características principales
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {bedrooms && bedrooms !== '0' && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1 font-light">Habitaciones</p>
                        <p className="text-lg font-medium">{bedrooms}</p>
                      </div>
                    )}
                    {bathrooms && bathrooms !== '0' && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1 font-light">Baños</p>
                        <p className="text-lg font-medium">{bathrooms}</p>
                      </div>
                    )}
                    {area && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1 font-light">Superficie</p>
                        <p className="text-lg font-medium">{area}{areaUnit}</p>
                      </div>
                    )}
                    {yearBuilt && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1 font-light">Año construcción</p>
                        <p className="text-lg font-medium">{yearBuilt}</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Descripción */}
                {content?.rendered && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-light tracking-tight mb-4">
                      Descripción
                    </h2>
                    <div 
                      className="prose max-w-none text-gray-600 leading-relaxed font-light"
                      dangerouslySetInnerHTML={{ __html: content.rendered }}
                    />
                  </div>
                )}
              </div>

              {/* Columna derecha - Contacto */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="p-8 border-0 shadow-lg">
                    <h3 className="text-2xl font-light tracking-tight mb-6">
                      Solicitar información
                    </h3>

                    {/* Agente */}
                    {agent && (
                      <div className="mb-6 pb-6 border-b border-gray-100">
                        <p className="text-sm text-gray-600 mb-3 font-light">Tu asesor</p>
                        <div className="flex items-center gap-3">
                          {agent.image && (
                            <Image
                              src={agent.image}
                              alt={agent.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            {agent.phone && (
                              <p className="text-sm text-gray-600 font-light">{agent.phone}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulario */}
                    <form className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Nombre completo" 
                          className="w-full h-12 px-4 border border-gray-200 rounded-full font-light
                                   focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                                   transition-all duration-300"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email" 
                          className="w-full h-12 px-4 border border-gray-200 rounded-full font-light
                                   focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                                   transition-all duration-300"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Teléfono" 
                          className="w-full h-12 px-4 border border-gray-200 rounded-full font-light
                                   focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                                   transition-all duration-300"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Mensaje (opcional)"
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-2xl font-light
                                   focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900
                                   transition-all duration-300 resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full rounded-full h-12 bg-gray-900 hover:bg-gray-800 transition-colors duration-300">
                        Enviar consulta
                      </Button>
                    </form>

                    {/* Acciones rápidas */}
                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                      {agent?.whatsapp && (
                        <a
                          href={`https://wa.me/${agent.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full rounded-full font-light hover:bg-gray-50 transition-colors duration-300">
                            💬 WhatsApp
                          </Button>
                        </a>
                      )}
                      <Button variant="outline" className="w-full rounded-full font-light hover:bg-gray-50 transition-colors duration-300">
                        📅 Agendar visita
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Propiedades similares y Búsqueda */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <Container>
            {/* Propiedades similares mockeadas */}
            <div className="mb-20">
              <h2 className="text-4xl font-light tracking-tight text-center mb-4">
                Propiedades similares
              </h2>
              <p className="text-center text-gray-600 font-light mb-12 max-w-2xl mx-auto">
                Otras propiedades que podrían interesarte en la misma zona
              </p>
              
              {/* Grid de propiedades similares */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Propiedad similar 1 */}
                <PropertyCard
                  property={{
                    id: 1,
                    title: 'Ático dúplex con vistas panorámicas',
                    slug: 'atico-duplex-vistas-panoramicas',
                    excerpt: 'Espectacular ático dúplex de 180m² con terraza de 50m² y vistas inigualables a las montañas.',
                    featured_image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
                    price: '895000',
                    bedrooms: '3',
                    bathrooms: '2',
                    area: '180',
                    area_unit: 'm²',
                    address: 'Escaldes-Engordany, Andorra',
                    type: null,
                    status: null,
                    city: null,
                    link: '/propiedades/atico-duplex-vistas-panoramicas',
                    date: '2024-01-15',
                    featured: false,
                  }}
                />
                
                {/* Propiedad similar 2 */}
                <PropertyCard
                  property={{
                    id: 2,
                    title: 'Casa moderna con jardín privado',
                    slug: 'casa-moderna-jardin-privado',
                    excerpt: 'Impresionante casa de diseño moderno con acabados de lujo y jardín privado de 200m².',
                    featured_image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
                    price: '1250000',
                    bedrooms: '4',
                    bathrooms: '3',
                    area: '280',
                    area_unit: 'm²',
                    address: 'La Massana, Andorra',
                    type: null,
                    status: null,
                    city: null,
                    link: '/propiedades/casa-moderna-jardin-privado',
                    date: '2024-01-10',
                    featured: true,
                  }}
                />
                
                {/* Propiedad similar 3 */}
                <PropertyCard
                  property={{
                    id: 3,
                    title: 'Apartamento renovado en el centro',
                    slug: 'apartamento-renovado-centro',
                    excerpt: 'Elegante apartamento completamente renovado en pleno centro, ideal para inversión.',
                    featured_image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                    price: '425000',
                    bedrooms: '2',
                    bathrooms: '1',
                    area: '95',
                    area_unit: 'm²',
                    address: 'Andorra la Vella, Andorra',
                    type: null,
                    status: null,
                    city: null,
                    link: '/propiedades/apartamento-renovado-centro',
                    date: '2024-01-08',
                    featured: false,
                  }}
                />
              </div>
            </div>
            
            {/* Separador visual */}
            <div className="border-t border-gray-200 my-16"></div>
            
            {/* Buscador de propiedades */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-light tracking-tight text-center mb-4">
                Buscar más propiedades
              </h2>
              <p className="text-center text-gray-600 font-light mb-12 max-w-2xl mx-auto">
                Utiliza nuestro buscador avanzado para encontrar exactamente lo que estás buscando
              </p>
              
              <PropertySearchForm 
                variant="default"
                className="bg-white shadow-xl border-0"
              />
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer config={siteConfig} />
    </>
  );
}
