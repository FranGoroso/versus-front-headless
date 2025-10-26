/**
 * About Page
 * 
 * Página sobre la empresa.
 */

import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export const revalidate = 86400; // 24 horas

export const metadata = {
  title: 'Sobre Nosotros | Versus Andorra',
  description: 'Conoce la historia, misión y valores de Versus Andorra. Tu socio de confianza en el mercado inmobiliario.',
};

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Sobre nosotros"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <Container className="relative z-10 text-center text-white">
            <h1 className="text-5xl md:text-7xl mb-6">
              Sobre Nosotros
            </h1>
            <nav className="flex justify-center items-center gap-2 text-sm">
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Inicio
              </Link>
              <span>›</span>
              <span>Nosotros</span>
            </nav>
          </Container>
        </section>

        {/* Nuestra Historia */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl mb-6">
                  Nuestra Historia
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Fundada en 2010, Versus Andorra nació con una visión clara: transformar 
                    la experiencia inmobiliaria en Andorra, ofreciendo un servicio personalizado 
                    y de máxima calidad que realmente marque la diferencia.
                  </p>
                  <p>
                    Con más de 15 años de experiencia en el mercado, nos hemos consolidado 
                    como uno de los referentes en el sector inmobiliario andorrano, ayudando 
                    a cientos de familias y empresas a encontrar su espacio ideal.
                  </p>
                  <p>
                    Nuestra trayectoria está marcada por la confianza, el compromiso y la 
                    excelencia en cada transacción. No somos solo intermediarios; somos 
                    asesores que acompañan a nuestros clientes en cada paso del camino.
                  </p>
                </div>
              </div>
              
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Oficina Versus Andorra"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Estadísticas */}
        <section className="py-20 bg-black text-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-2">15+</div>
                <div className="text-white/80">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-2">500+</div>
                <div className="text-white/80">Propiedades vendidas</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-2">98%</div>
                <div className="text-white/80">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl mb-2">24/7</div>
                <div className="text-white/80">Atención disponible</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Valores */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">
                Nuestros Valores
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Los principios que guían cada una de nuestras acciones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl mb-4">Confianza</h3>
                <p className="text-gray-600 leading-relaxed">
                  Construimos relaciones duraderas basadas en la transparencia, 
                  honestidad y profesionalismo en cada transacción.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl mb-4">Excelencia</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nos comprometemos a ofrecer servicios de la más alta calidad, 
                  superando las expectativas en cada proyecto.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl mb-4">Compromiso</h3>
                <p className="text-gray-600 leading-relaxed">
                  Estamos dedicados al éxito de nuestros clientes, acompañándoles 
                  en cada paso con atención personalizada.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="¿Por qué elegirnos?"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl mb-8">
                  ¿Por qué elegirnos?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Conocimiento Local</h3>
                      <p className="text-gray-600">
                        Conocemos Andorra como nadie. Nuestro expertise local nos permite 
                        ofrecerte las mejores oportunidades del mercado.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Servicio Personalizado</h3>
                      <p className="text-gray-600">
                        No hay dos clientes iguales. Adaptamos nuestro servicio a tus 
                        necesidades específicas y objetivos particulares.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Red de Contactos</h3>
                      <p className="text-gray-600">
                        Contamos con una amplia red de propietarios, compradores e 
                        inversores que facilita operaciones rápidas y eficientes.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Asesoramiento Integral</h3>
                      <p className="text-gray-600">
                        Te acompañamos desde la búsqueda hasta la firma, incluyendo 
                        aspectos legales, financieros y fiscales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Final */}
        <section className="py-20">
          <Container>
            <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl mb-6">
                Comienza tu búsqueda hoy
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Descubre por qué cientos de clientes confían en nosotros para encontrar 
                su hogar ideal en Andorra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/propiedades">
                  <button className="bg-white text-black px-8 py-4 rounded-full hover:bg-brand hover:text-black transition-colors">
                    Ver propiedades
                  </button>
                </Link>
                <Link href="/contacto">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-brand hover:text-black hover:border-brand transition-colors">
                    Contactar
                  </button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
