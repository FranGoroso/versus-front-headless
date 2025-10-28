/**
 * Home Page
 *
 * Página de inicio del sitio con datos dinámicos de WordPress.
 * Server Component - los datos se obtienen en el servidor con ISR.
 */

import Image from "next/image";
import Link from "next/link";
import { getFeaturedProperties, getSiteConfig, transformToPropertyCard, getPropertyTypes, getPropertyCities } from "@/lib/wordpress";
import { PropertyCard as PropertyCardType, WPTaxonomy } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { HeroSection } from "@/components/sections/HeroSection";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { PropertyCategoriesSection } from "@/components/sections/PropertyCategoriesSection";

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
    title: config?.site_name || "Versus Andorra Real Estate",
    description:
      config?.site_description ||
      "La mejor rentabilidad como inversión inmobiliaria en Andorra",
  };
}

export default async function Home() {
  /**
   * Obtener datos de WordPress
   */
  let featuredProperties: PropertyCardType[] = [];
  let siteConfig = null;
  let propertyTypes: WPTaxonomy[] = [];
  let propertyCities: WPTaxonomy[] = [];
  let error = null;

  try {
    // Obtener propiedades destacadas, configuración del sitio y taxonomías en paralelo
    [featuredProperties, siteConfig, propertyTypes, propertyCities] = await Promise.all([
      getFeaturedProperties(6),
      getSiteConfig(),
      getPropertyTypes(),
      getPropertyCities(),
    ]);
  } catch (err) {
    console.error("Error loading data:", err);
    error =
      "No se pudieron cargar las propiedades. Por favor, intenta más tarde.";
  }

  // Si no hay propiedades destacadas, mostrar las últimas 6
  if (featuredProperties.length === 0 && !error) {
    const { getProperties } = await import("@/lib/wordpress");
    try {
      const allProperties = await getProperties({ per_page: 6 });
      // Usar función helper para transformación consistente (con búsqueda multi-ubicación de precio)
      featuredProperties = allProperties.map(transformToPropertyCard);
    } catch (err) {
      console.error("Error loading properties:", err);
    }
  }

  return (
    <>
      {/* Header dinámico */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section con efecto parallax - Ahora con taxonomías */}
        <HeroSection 
          propertyTypes={propertyTypes}
          propertyCities={propertyCities}
        />

        {/* Propiedades Destacadas */}
        <section className="py-32 bg-white">
          <Container>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Propiedades destacadas
              </h2>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light leading-relaxed">
                Selección exclusiva de inmuebles con las mejores ubicaciones y
                amenidades
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-12 hover:bg-brand hover:text-black hover:border-brand"
                  >
                    Ver todas las propiedades
                  </Button>
                </Link>
              </div>
            )}
          </Container>
        </section>

        {/* Propiedades en Venta - Categorías con taxonomías reales */}
        <PropertyCategoriesSection propertyTypes={propertyTypes} />

        {/* Sección Experiencia */}
        <section className="relative py-40 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Luxury interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
              Experiencia que marca la diferencia
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed font-light">
              En Versus, cada propiedad cuenta una historia única. Nuestro
              compromiso es conectarte con espacios que reflejen tu estilo de
              vida y aspiraciones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
              <div className="text-center">
                <div className="text-lg font-light tracking-[0.3em] mb-4 text-white/90 uppercase">
                  Cada Detalle
                </div>
                <div className="text-white/60 font-light text-base leading-relaxed">
                  Importa en la búsqueda de tu espacio perfecto
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light tracking-[0.3em] mb-4 text-white/90 uppercase">
                  Tu Visión
                </div>
                <div className="text-white/60 font-light text-base leading-relaxed">
                  Nuestra misión es hacerla realidad
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-light tracking-[0.3em] mb-4 text-white/90 uppercase">
                  Más Que Propiedades
                </div>
                <div className="text-white/60 font-light text-base leading-relaxed">
                  Construimos relaciones duraderas
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-32 bg-white">
          <Container>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                Nuestros servicios
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light">
                Soluciones integrales para todas tus necesidades inmobiliarias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {[
                {
                  image:
                    "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=800",
                  title: "Compra",
                  description:
                    "Te acompañamos en cada paso del proceso de compra, desde la búsqueda inicial hasta la firma final, garantizando una experiencia sin complicaciones.",
                },
                {
                  image:
                    "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800",
                  title: "Venta",
                  description:
                    "Maximizamos el valor de tu propiedad con estrategias de marketing personalizadas y una red de compradores calificados.",
                },
                {
                  image:
                    "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800",
                  title: "Alquiler",
                  description:
                    "Gestión completa de alquileres con inquilinos verificados y un servicio de atención que protege tu inversión.",
                },
                {
                  image:
                    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
                  title: "Asesoría",
                  description:
                    "Consultoría especializada en inversiones inmobiliarias y análisis de mercado para tomar las mejores decisiones.",
                },
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
                  <h3 className="text-3xl font-light tracking-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Vender Propiedad */}
        <section className="py-32 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Columna Izquierda: Imagen */}
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden rounded-2xl group">
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
                  alt="Vende tu propiedad con Versus Andorra"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              </div>

              {/* Columna Derecha: Contenido */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                    ¿Pensando en vender tu propiedad?
                  </h2>
                  <p className="text-xl text-gray-600 font-light leading-relaxed">
                    Obtén una valoración profesional gratuita en menos de 24
                    horas. Sin compromiso, sin costes ocultos.
                  </p>
                </div>

                {/* Beneficios */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-900 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 font-light">
                      Valoración gratuita y sin compromiso
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-900 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 font-light">
                      Marketing profesional y fotografía de alta calidad
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-900 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600 font-light">
                      Asesoramiento personalizado durante todo el proceso
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/vender">
                    <Button
                      size="lg"
                      className="rounded-full px-8 h-14 text-base font-light w-full sm:w-auto hover:bg-brand hover:text-black hover:border-brand"
                    >
                      Solicitar valoración gratuita
                    </Button>
                  </Link>
                  <a
                    href="tel:+376600000000"
                    className="flex items-center justify-center gap-2 h-14 px-8 border border-gray-200 rounded-full hover:border-gray-900 transition-all duration-300 font-light"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+376 600 000 000</span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Reseñas de Google */}
        <GoogleReviews />

        {/* Contacto */}
        <section id="contacto" className="py-32 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                Hablemos
              </h2>
              <p className="text-gray-600 text-lg font-light">
                Estamos aquí para ayudarte a encontrar tu próximo hogar
              </p>
            </div>

            <Card className="p-12 border-0 shadow-xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-light mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full h-12 px-4 border border-gray-200 rounded-full font-light focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      placeholder="Tu apellido"
                      className="w-full h-12 px-4 border border-gray-200 rounded-full font-light focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full h-12 px-4 border border-gray-200 rounded-full font-light focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+376 600 000"
                    className="w-full h-12 px-4 border border-gray-200 rounded-full font-light focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light mb-2">
                    Mensaje
                  </label>
                  <textarea
                    placeholder="Cuéntanos qué estás buscando..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl font-light focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full h-14 text-base bg-gray-900 hover:bg-brand hover:text-black hover:border-brand transition-colors duration-300"
                >
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
