/**
 * Terms and Conditions Page
 * 
 * Página de Términos y Condiciones con diseño minimalista.
 * Incluye contenido legal estructurado y breadcrumb navegable.
 * 
 * @version 1.0.0
 * @author Versus Andorra
 */

import Link from 'next/link';
import { getSiteConfig } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

/**
 * Revalidación cada 24 horas (86400 segundos)
 * Apropiado para contenido legal que no cambia frecuentemente
 */
export const revalidate = 86400;

/**
 * Metadata SEO para la página de Términos y Condiciones
 * Optimizada para indexación y compartir en redes sociales
 */
export const metadata = {
  title: 'Términos y Condiciones | Versus Andorra',
  description: 'Términos y condiciones de uso del sitio web de Versus Andorra. Normativa legal, protección de datos y servicios inmobiliarios.',
};

/**
 * Terms and Conditions Page Component
 * 
 * Renderiza la página de términos legales con:
 * - Hero section simple sin imagen
 * - Breadcrumb navegable
 * - Contenido legal organizado en secciones
 * - Diseño minimalista y profesional
 * 
 * @returns {Promise<JSX.Element>} Página completa de términos y condiciones
 */
export default async function TermsPage() {
  const siteConfig = await getSiteConfig();

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section - Simple sin imagen */}
        <section className="bg-gray-50 py-16 md:py-24">
          <Container>
            {/* Breadcrumb minimalista */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 font-light mb-8">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Inicio
              </Link>
              <span>•</span>
              <span className="text-gray-900">Términos y Condiciones</span>
            </nav>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Términos y Condiciones
            </h1>
            
            {/* Subtítulo */}
            <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
              Última actualización: Octubre 2025
            </p>
          </Container>
        </section>

        {/* Contenido Legal Principal */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              
              {/* Introducción */}
              <div className="mb-12">
                <p className="text-gray-600 font-light leading-relaxed">
                  Bienvenido a Versus Andorra. Los presentes términos y condiciones regulan el acceso y uso de nuestro sitio web y servicios. Al utilizar esta plataforma, usted acepta expresamente estos términos en su totalidad. Si no está de acuerdo con alguna parte, le rogamos no utilice nuestros servicios.
                </p>
              </div>

              {/* Sección 1: Aceptación de los términos */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  1. Aceptación de los términos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Al acceder y utilizar el sitio web de Versus Andorra, usted reconoce haber leído, comprendido y aceptado estar sujeto a estos términos y condiciones, así como a nuestra política de privacidad.
                  </p>
                  <p>
                    Estos términos constituyen un acuerdo legal vinculante entre usted y Versus Andorra. Nos reservamos el derecho de modificar estos términos en cualquier momento, siendo su responsabilidad revisarlos periódicamente.
                  </p>
                </div>
              </div>

              {/* Sección 2: Uso del sitio web */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  2. Uso del sitio web
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    El acceso a este sitio web es gratuito y está destinado únicamente a fines informativos y de búsqueda de propiedades inmobiliarias en Andorra. Usted se compromete a utilizar el sitio de manera responsable y legal.
                  </p>
                  <p className="font-light text-gray-900 mb-2">
                    Está expresamente prohibido:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Utilizar el sitio para fines ilegales o no autorizados</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Intentar acceder a áreas restringidas del sistema</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Realizar actividades que puedan dañar o sobrecargar nuestros servidores</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Copiar, reproducir o distribuir contenido sin autorización expresa</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Utilizar sistemas automatizados para extraer datos (scraping)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sección 3: Propiedad intelectual */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  3. Propiedad intelectual
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Todos los contenidos del sitio web, incluyendo pero no limitándose a textos, imágenes, logotipos, gráficos, diseños, fotografías y software, son propiedad exclusiva de Versus Andorra o de sus proveedores de contenido, y están protegidos por las leyes de propiedad intelectual de Andorra y tratados internacionales.
                  </p>
                  <p>
                    Las fotografías de propiedades son propiedad de Versus Andorra o se utilizan con autorización de sus propietarios. Queda prohibida su reproducción sin consentimiento previo por escrito.
                  </p>
                  <p>
                    La marca "Versus Andorra" y su logotipo son marcas registradas. Cualquier uso no autorizado constituye una infracción de derechos de propiedad intelectual.
                  </p>
                </div>
              </div>

              {/* Sección 4: Servicios inmobiliarios */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  4. Servicios inmobiliarios
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Versus Andorra actúa como intermediario profesional en la compraventa y alquiler de propiedades inmobiliarias. Nuestros servicios incluyen asesoramiento, valoración, marketing y gestión de transacciones.
                  </p>
                  <p>
                    La información sobre propiedades publicada en este sitio web se facilita de buena fe y se actualiza regularmente. Sin embargo, no garantizamos la exactitud absoluta de todos los datos, ya que pueden estar sujetos a cambios por parte de los propietarios.
                  </p>
                  <p>
                    Los precios, disponibilidad y características de las propiedades pueden variar sin previo aviso. Es responsabilidad del usuario verificar la información actualizada directamente con nuestros agentes antes de tomar cualquier decisión.
                  </p>
                  <p>
                    Nuestros honorarios y comisiones se detallarán claramente en los contratos de prestación de servicios correspondientes.
                  </p>
                </div>
              </div>

              {/* Sección 5: Protección de datos personales */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  5. Protección de datos personales
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Versus Andorra se compromete a proteger la privacidad de sus usuarios y cumplir con la normativa vigente en materia de protección de datos personales en Andorra y la Unión Europea (RGPD).
                  </p>
                  <p>
                    Los datos personales que nos facilite a través de formularios de contacto, solicitudes de información o suscripciones serán tratados con la máxima confidencialidad y utilizados exclusivamente para:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Responder a sus consultas y solicitudes</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Gestionar servicios inmobiliarios contratados</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Enviar información sobre propiedades que coincidan con su búsqueda</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Comunicaciones comerciales (solo con su consentimiento expreso)</span>
                    </li>
                  </ul>
                  <p>
                    Usted tiene derecho a acceder, rectificar, suprimir, oponerse y limitar el tratamiento de sus datos personales. Para ejercer estos derechos, puede contactarnos en la dirección indicada en la sección de contacto.
                  </p>
                  <p>
                    Para más información, consulte nuestra Política de Privacidad completa.
                  </p>
                </div>
              </div>

              {/* Sección 6: Limitación de responsabilidad */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  6. Limitación de responsabilidad
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Versus Andorra se esfuerza por mantener la información del sitio web actualizada y precisa. Sin embargo, no garantizamos que el contenido esté libre de errores, omisiones o interrupciones técnicas.
                  </p>
                  <p>
                    El uso de este sitio web es bajo su propia responsabilidad. Versus Andorra no será responsable de:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Daños directos o indirectos derivados del uso o imposibilidad de uso del sitio</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Pérdida de datos o información</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Contenidos de sitios web de terceros enlazados desde nuestra plataforma</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Virus o software malicioso que pueda infectar su equipo</span>
                    </li>
                  </ul>
                  <p>
                    Las transacciones inmobiliarias están sujetas a condiciones específicas que se establecerán en contratos individuales entre las partes.
                  </p>
                </div>
              </div>

              {/* Sección 7: Modificaciones de los términos */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  7. Modificaciones de los términos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Versus Andorra se reserva el derecho de modificar estos términos y condiciones en cualquier momento sin previo aviso. Las modificaciones entrarán en vigor desde el momento de su publicación en el sitio web.
                  </p>
                  <p>
                    Es responsabilidad del usuario revisar periódicamente estos términos. El uso continuado del sitio web tras la publicación de cambios constituye su aceptación de los términos modificados.
                  </p>
                  <p>
                    La fecha de la última actualización se indica al inicio de este documento.
                  </p>
                </div>
              </div>

              {/* Sección 8: Ley aplicable y jurisdicción */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  8. Ley aplicable y jurisdicción
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Estos términos y condiciones se rigen por las leyes del Principado de Andorra.
                  </p>
                  <p>
                    Para cualquier controversia o conflicto derivado de la interpretación o aplicación de estos términos, las partes se someten expresamente a la jurisdicción de los tribunales de Andorra, renunciando a cualquier otro fuero que pudiera corresponderles.
                  </p>
                </div>
              </div>

              {/* Sección 9: Contacto */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  9. Contacto
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Para cualquier consulta, duda o sugerencia relacionada con estos términos y condiciones, puede contactar con nosotros a través de:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-light text-gray-900">Email</p>
                        <a href="mailto:info@versusandorra.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                          info@versusandorra.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-light text-gray-900">Teléfono</p>
                        <a href="tel:+376600000000" className="text-gray-600 hover:text-gray-900 transition-colors">
                          +376 600 000 000
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="font-light text-gray-900">Dirección</p>
                        <p className="text-gray-600">
                          Andorra la Vella, Principado de Andorra
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="pt-4">
                    También puede contactarnos a través de nuestro{' '}
                    <Link href="/contacto" className="text-gray-900 hover:underline">
                      formulario de contacto
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Nota final */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500 font-light text-center">
                  Última actualización: Octubre 2025 | Versus Andorra | Todos los derechos reservados
                </p>
              </div>

            </div>
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
