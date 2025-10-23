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
        <section className="bg-gray-50 py-6">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-black transition-colors">
                Inicio
              </Link>
              <span>›</span>
              <Link href="/propiedades" className="hover:text-black transition-colors">
                Propiedades
              </Link>
              <span>›</span>
              <span className="text-black font-medium line-clamp-1">
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
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                    {title.rendered}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4">{address}</p>
                  <div className="flex items-end gap-4">
                    <p className="font-serif text-5xl font-bold">
                      {formatPrice(price)}
                    </p>
                    {propertyId && (
                      <p className="text-gray-500 text-sm mb-2">
                        Ref: {propertyId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Características principales */}
                <Card className="p-8 mb-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Características principales
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {bedrooms && bedrooms !== '0' && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Habitaciones</p>
                        <p className="font-semibold text-lg">{bedrooms}</p>
                      </div>
                    )}
                    {bathrooms && bathrooms !== '0' && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Baños</p>
                        <p className="font-semibold text-lg">{bathrooms}</p>
                      </div>
                    )}
                    {area && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Superficie</p>
                        <p className="font-semibold text-lg">{area}{areaUnit}</p>
                      </div>
                    )}
                    {yearBuilt && (
                      <div>
                        <p className="text-gray-500 text-sm mb-1">Año construcción</p>
                        <p className="font-semibold text-lg">{yearBuilt}</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Descripción */}
                {content?.rendered && (
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4">
                      Descripción
                    </h2>
                    <div 
                      className="prose max-w-none text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: content.rendered }}
                    />
                  </div>
                )}
              </div>

              {/* Columna derecha - Contacto */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="p-8">
                    <h3 className="font-serif text-2xl font-bold mb-6">
                      Solicitar información
                    </h3>

                    {/* Agente */}
                    {agent && (
                      <div className="mb-6 pb-6 border-b">
                        <p className="text-sm text-gray-600 mb-2">Tu asesor</p>
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
                            <p className="font-semibold">{agent.name}</p>
                            {agent.phone && (
                              <p className="text-sm text-gray-600">{agent.phone}</p>
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
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email" 
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Teléfono" 
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Mensaje (opcional)"
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <Button type="submit" className="w-full rounded-full h-12">
                        Enviar consulta
                      </Button>
                    </form>

                    {/* Acciones rápidas */}
                    <div className="mt-6 pt-6 border-t space-y-3">
                      {agent?.whatsapp && (
                        <a
                          href={`https://wa.me/${agent.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="w-full rounded-full">
                            💬 WhatsApp
                          </Button>
                        </a>
                      )}
                      <Button variant="outline" className="w-full rounded-full">
                        📅 Agendar visita
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Propiedades similares (futuro) */}
        <section className="py-20 bg-gray-50">
          <Container>
            <h2 className="font-serif text-4xl font-bold text-center mb-12">
              Propiedades similares
            </h2>
            <p className="text-center text-gray-600">
              Próximamente: Recomendaciones basadas en esta propiedad
            </p>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer config={siteConfig} />
    </>
  );
}
