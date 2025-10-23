/**
 * Contact Page
 * 
 * Página de contacto con formulario e información de contacto.
 */

import Link from 'next/link';
import { getSiteConfig } from '@/lib/wordpress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export const revalidate = 3600;

export const metadata = {
  title: 'Contacto | Versus Andorra',
  description: 'Contacta con nosotros para encontrar tu propiedad ideal en Andorra.',
};

export default async function ContactPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Contáctanos
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Estamos aquí para ayudarte a encontrar la propiedad perfecta. 
                Escríbenos o visítanos.
              </p>
              
              <nav className="flex justify-center items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-black font-medium">Contacto</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Información y Formulario */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Información de Contacto */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-8">
                  Información de contacto
                </h2>

                <div className="space-y-6 mb-12">
                  {/* Dirección */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-black text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Dirección</h3>
                        <p className="text-gray-600">Andorra la Vella</p>
                        <p className="text-gray-600">Principado de Andorra</p>
                      </div>
                    </div>
                  </Card>

                  {/* Teléfono */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-black text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teléfono</h3>
                        <a href="tel:+376000000" className="text-gray-600 hover:text-black transition-colors">
                          +376 XXX XXX
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Email */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-black text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:info@versusandorra.com" className="text-gray-600 hover:text-black transition-colors">
                          info@versusandorra.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  {/* Horario */}
                  <Card className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-black text-white p-3 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Horario</h3>
                        <p className="text-gray-600">Lunes - Viernes: 9:00 - 18:00</p>
                        <p className="text-gray-600">Sábado: 10:00 - 14:00</p>
                        <p className="text-gray-600">Domingo: Cerrado</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Redes Sociales */}
                <div>
                  <h3 className="font-semibold mb-4">Síguenos</h3>
                  <div className="flex gap-3">
                    <a href="#" className="bg-gray-100 hover:bg-black hover:text-white p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 hover:bg-black hover:text-white p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-gray-100 hover:bg-black hover:text-white p-3 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div>
                <Card className="p-8">
                  <h2 className="font-serif text-3xl font-bold mb-6">
                    Envíanos un mensaje
                  </h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Tu apellido"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        placeholder="+376 600 000"
                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Asunto
                      </label>
                      <select className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                        <option>Consulta general</option>
                        <option>Comprar una propiedad</option>
                        <option>Vender mi propiedad</option>
                        <option>Alquilar</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        required
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full rounded-full h-14">
                      Enviar mensaje
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Al enviar este formulario, aceptas nuestra política de privacidad
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Mapa (Placeholder) */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
              <p className="text-gray-500">
                Mapa de Google Maps (por implementar)
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
