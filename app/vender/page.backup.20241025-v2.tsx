/**
 * Sell Property Page
 * 
 * Página para que los propietarios soliciten valoración de sus propiedades.
 * Diseño compacto y elegante con formulario de contacto integrado.
 * 
 * @version 1.0.0
 */

import Link from 'next/link';
import { getSiteConfig } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollToButton } from '@/components/common/ScrollToButton';

export const revalidate = 3600;

export const metadata = {
  title: 'Vender Propiedad | Versus Andorra',
  description: 'Valoración gratuita de tu propiedad en Andorra. Vendemos al mejor precio con asesoramiento profesional.',
};

export default async function SellPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section - Compacto */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                Vendemos tu propiedad al mejor precio
              </h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
                Valoración gratuita, marketing profesional y asesoramiento experto. 
                Confía en los especialistas del mercado inmobiliario andorrano.
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <ScrollToButton 
                  targetId="valuation-form"
                  size="lg" 
                  className="rounded-full px-8 h-12 font-light"
                >
                  Solicitar valoración gratuita
                </ScrollToButton>
                <a 
                  href="tel:+376600000000"
                  className="text-gray-600 hover:text-gray-900 font-light transition-colors"
                >
                  o llámanos: +376 600 000 000
                </a>
              </div>

              <nav className="flex justify-center items-center gap-2 text-sm text-gray-600 font-light">
                <Link href="/" className="hover:text-black transition-colors">
                  Inicio
                </Link>
                <span>›</span>
                <span className="text-black">Vender</span>
              </nav>
            </div>
          </Container>
        </section>

        {/* Beneficios - 1 línea horizontal */}
        <section className="py-16 border-b border-gray-100">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Beneficio 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Alcance Internacional</h3>
                <p className="text-sm text-gray-600 font-light">Red global de compradores</p>
              </div>

              {/* Beneficio 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Valoración Gratuita</h3>
                <p className="text-sm text-gray-600 font-light">Sin compromiso ni coste</p>
              </div>

              {/* Beneficio 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Marketing Profesional</h3>
                <p className="text-sm text-gray-600 font-light">Fotografía y promoción premium</p>
              </div>

              {/* Beneficio 4 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-light text-gray-900 mb-2">Asesoramiento Legal</h3>
                <p className="text-sm text-gray-600 font-light">Gestión completa y segura</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Sección Principal: Proceso + Formulario (2 columnas) */}
        <section className="py-20" id="valuation-form">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Columna Izquierda: Proceso (2/5) */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
                  Cómo funciona
                </h2>

                <div className="space-y-8">
                  {/* Paso 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-light">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-light text-gray-900 mb-2 text-lg">Solicita valoración</h3>
                      <p className="text-gray-600 font-light text-sm">
                        Completa el formulario con los datos de tu propiedad. Es rápido y sin compromiso.
                      </p>
                    </div>
                  </div>

                  {/* Paso 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-light">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-light text-gray-900 mb-2 text-lg">Visitamos tu propiedad</h3>
                      <p className="text-gray-600 font-light text-sm">
                        Nuestros expertos evaluarán tu inmueble y te darán una valoración profesional.
                      </p>
                    </div>
                  </div>

                  {/* Paso 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-light">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-light text-gray-900 mb-2 text-lg">Estrategia de marketing</h3>
                      <p className="text-gray-600 font-light text-sm">
                        Creamos un plan personalizado con fotografía profesional y promoción multicanal.
                      </p>
                    </div>
                  </div>

                  {/* Paso 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-light">
                        4
                      </div>
                    </div>
                    <div>
                      <h3 className="font-light text-gray-900 mb-2 text-lg">Vendemos al mejor precio</h3>
                      <p className="text-gray-600 font-light text-sm">
                        Gestionamos todo el proceso hasta el cierre, asegurando el mejor resultado.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-light text-gray-900 mb-1">45</div>
                      <div className="text-sm text-gray-600 font-light">días promedio de venta</div>
                    </div>
                    <div>
                      <div className="text-3xl font-light text-gray-900 mb-1">98%</div>
                      <div className="text-sm text-gray-600 font-light">precio solicitado alcanzado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Formulario (3/5) */}
              <div className="lg:col-span-3">
                <Card className="p-8 border-gray-200">
                  <h2 className="text-2xl font-light tracking-tight mb-6">
                    Solicita tu valoración gratuita
                  </h2>

                  <form className="space-y-5">
                    {/* Nombre completo */}
                    <div>
                      <label className="block text-sm font-light mb-2 text-gray-700">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Juan Pérez"
                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                      />
                    </div>

                    {/* Email y Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="tu@email.com"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+376 600 000"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                        />
                      </div>
                    </div>

                    {/* Tipo de propiedad y Ubicación */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Tipo de propiedad *
                        </label>
                        <select 
                          required
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light bg-white"
                        >
                          <option value="">Selecciona...</option>
                          <option>Apartamento</option>
                          <option>Chalet</option>
                          <option>Ático</option>
                          <option>Dúplex</option>
                          <option>Local comercial</option>
                          <option>Oficina</option>
                          <option>Terreno</option>
                          <option>Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Ubicación *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Andorra la Vella"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                        />
                      </div>
                    </div>

                    {/* Superficie y Habitaciones/Baños */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Superficie (m²) *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="120"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Habitaciones *
                        </label>
                        <select 
                          required
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light bg-white"
                        >
                          <option value="">-</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Baños *
                        </label>
                        <select 
                          required
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light bg-white"
                        >
                          <option value="">-</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4+</option>
                        </select>
                      </div>
                    </div>

                    {/* Estado y Precio esperado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Estado *
                        </label>
                        <select 
                          required
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light bg-white"
                        >
                          <option value="">Selecciona...</option>
                          <option>Nuevo</option>
                          <option>Muy buen estado</option>
                          <option>Buen estado</option>
                          <option>A reformar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2 text-gray-700">
                          Precio esperado (opcional)
                        </label>
                        <input
                          type="number"
                          placeholder="450000"
                          className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light"
                        />
                      </div>
                    </div>

                    {/* Comentarios */}
                    <div>
                      <label className="block text-sm font-light mb-2 text-gray-700">
                        Comentarios adicionales
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Cuéntanos más sobre tu propiedad..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 font-light resize-none"
                      />
                    </div>

                    {/* Botón Submit */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full rounded-full h-12 font-light"
                    >
                      Solicitar valoración gratuita
                    </Button>

                    <p className="text-xs text-gray-500 text-center font-light">
                      Al enviar este formulario, aceptas nuestra política de privacidad. 
                      Te contactaremos en un plazo máximo de 24 horas.
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonios + CTA Final */}
        <section className="py-20 bg-gray-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12 text-center">
                Clientes satisfechos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Testimonio 1 */}
                <Card className="p-8 border-gray-200">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    Vendí mi chalet en menos de 6 semanas al precio que esperaba. 
                    El equipo de Versus fue profesional, transparente y eficiente en todo momento.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-light text-sm">
                      MR
                    </div>
                    <div>
                      <p className="font-light text-gray-900">Marc Ribera</p>
                      <p className="text-sm text-gray-500 font-light">Escaldes-Engordany</p>
                    </div>
                  </div>
                </Card>

                {/* Testimonio 2 */}
                <Card className="p-8 border-gray-200">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 font-light mb-4 leading-relaxed">
                    Excelente asesoramiento desde la valoración hasta el cierre. 
                    Me ayudaron con toda la gestión legal y consiguieron un precio superior al mercado.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-light text-sm">
                      SL
                    </div>
                    <div>
                      <p className="font-light text-gray-900">Sophie Laurent</p>
                      <p className="text-sm text-gray-500 font-light">Andorra la Vella</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* CTA Final */}
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4">
                  ¿Listo para vender tu propiedad?
                </h3>
                <p className="text-gray-600 font-light mb-6">
                  Contacta con nosotros y descubre el valor real de tu inmueble
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <ScrollToButton 
                    targetId="valuation-form"
                    size="lg" 
                    className="rounded-full px-8 h-12 font-light"
                  >
                    Solicitar valoración
                  </ScrollToButton>
                  <a 
                    href="https://wa.me/376600000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
