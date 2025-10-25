/**
 * Cookies Policy Page
 * 
 * Página de Política de Cookies conforme a la normativa vigente.
 * Incluye información sobre tipos de cookies, gestión y configuración
 * en diferentes navegadores.
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
 * Metadata SEO para la página de Política de Cookies
 * Optimizada para indexación y cumplimiento legal
 */
export const metadata = {
  title: 'Política de Cookies | Versus Andorra',
  description: 'Información sobre el uso de cookies en nuestro sitio web. Conoce qué cookies utilizamos, su finalidad y cómo gestionarlas en tu navegador.',
};

/**
 * Cookies Policy Page Component
 * 
 * Renderiza la página de política de cookies con:
 * - Hero section simple sin imagen
 * - Breadcrumb navegable
 * - Contenido sobre tipos de cookies
 * - Tabla detallada de cookies utilizadas
 * - Instrucciones de gestión por navegador
 * - Diseño minimalista y profesional
 * 
 * @returns {Promise<JSX.Element>} Página completa de política de cookies
 */
export default async function CookiesPage() {
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
              <span className="text-gray-900">Política de Cookies</span>
            </nav>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Política de Cookies
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
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  En Versus Andorra utilizamos cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el uso del sitio web y mostrar contenido personalizado. Esta Política de Cookies explica qué son las cookies, qué tipos utilizamos y cómo puede gestionarlas.
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  Al utilizar nuestro sitio web, usted acepta el uso de cookies conforme a esta política. Para más información sobre el tratamiento de sus datos personales, consulte nuestra{' '}
                  <Link href="/privacidad" className="text-gray-900 hover:underline">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>

              {/* Sección 1: ¿Qué son las cookies? */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  1. ¿Qué son las cookies?
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o smartphone) cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias (como el idioma, tamaño de fuente y otras preferencias de visualización) durante un período de tiempo, para que no tenga que volver a introducirlas cada vez que regrese al sitio o navegue de una página a otra.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-light text-gray-900 mb-3">¿Para qué sirven las cookies?</h3>
                    <p className="mb-3">
                      Las cookies desempeñan diversas funciones importantes:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Recordar sus preferencias y configuración</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Mantener su sesión iniciada durante su visita</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Analizar cómo utiliza el sitio web para mejorarlo</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Personalizar el contenido y la publicidad según sus intereses</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Garantizar la seguridad del sitio web</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sección 2: Tipos de cookies */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  2. Tipos de cookies que utilizamos
                </h2>
                <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                  <p>
                    Utilizamos diferentes tipos de cookies en función de su finalidad y duración:
                  </p>

                  {/* Cookies técnicas */}
                  <div className="border-l-2 border-gray-900 pl-4">
                    <h3 className="font-light text-gray-900 mb-2">Cookies técnicas o necesarias</h3>
                    <p className="mb-2">
                      Son esenciales para el funcionamiento correcto del sitio web. Permiten la navegación y el uso de sus funciones básicas. Sin estas cookies, el sitio no puede funcionar correctamente.
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-900">Ejemplos:</span> Cookies de sesión, cookies de seguridad, cookies de accesibilidad.
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-900">Base legal:</span> No requieren consentimiento (interés legítimo - necesarias para el servicio solicitado).
                    </p>
                  </div>

                  {/* Cookies de análisis */}
                  <div className="border-l-2 border-gray-900 pl-4">
                    <h3 className="font-light text-gray-900 mb-2">Cookies de análisis o estadísticas</h3>
                    <p className="mb-2">
                      Nos permiten analizar el uso del sitio web, medir el número de visitas, páginas más visitadas, tiempo de permanencia y otros parámetros estadísticos. Esta información se utiliza exclusivamente para mejorar el sitio y la experiencia de usuario.
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-900">Ejemplos:</span> Google Analytics (con anonimización de IP).
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-900">Base legal:</span> Requieren consentimiento del usuario.
                    </p>
                  </div>

                  {/* Cookies de personalización */}
                  <div className="border-l-2 border-gray-900 pl-4">
                    <h3 className="font-light text-gray-900 mb-2">Cookies de personalización o funcionalidad</h3>
                    <p className="mb-2">
                      Permiten recordar sus preferencias (idioma, región, configuración de visualización) para ofrecerle una experiencia más personalizada en sus futuras visitas.
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-900">Ejemplos:</span> Cookies de idioma, cookies de preferencias de búsqueda.
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-900">Base legal:</span> Requieren consentimiento del usuario.
                    </p>
                  </div>

                  {/* Cookies de publicidad */}
                  <div className="border-l-2 border-gray-900 pl-4">
                    <h3 className="font-light text-gray-900 mb-2">Cookies de publicidad y marketing</h3>
                    <p className="mb-2">
                      Se utilizan para mostrar anuncios relevantes para usted según sus intereses y para medir la efectividad de las campañas publicitarias. Pueden rastrear su actividad de navegación en diferentes sitios web.
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-900">Estado actual:</span> No utilizamos cookies de publicidad de terceros en este momento.
                    </p>
                    <p className="text-sm mt-2">
                      <span className="text-gray-900">Base legal:</span> Requieren consentimiento explícito del usuario.
                    </p>
                  </div>

                  {/* Clasificación por duración */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="font-light text-gray-900 mb-3">Clasificación por duración:</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-900 mb-1">Cookies de sesión:</p>
                        <p className="text-sm">Se eliminan automáticamente cuando cierra el navegador. Se utilizan principalmente para recordar sus acciones durante la navegación.</p>
                      </div>
                      <div>
                        <p className="text-gray-900 mb-1">Cookies persistentes:</p>
                        <p className="text-sm">Permanecen en su dispositivo durante un período determinado (días, meses o años) después de cerrar el navegador. Se utilizan para recordar sus preferencias en futuras visitas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 3: Tabla de cookies */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  3. Cookies específicas que utilizamos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    A continuación, detallamos las cookies específicas que utiliza nuestro sitio web:
                  </p>

                  {/* Tabla responsive */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-200 px-4 py-3 text-left font-light text-gray-900">Nombre</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-light text-gray-900">Tipo</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-light text-gray-900">Duración</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-light text-gray-900">Finalidad</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-light text-gray-900">Proveedor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Cookie de sesión */}
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">next-auth.session-token</td>
                          <td className="border border-gray-200 px-4 py-3">Técnica</td>
                          <td className="border border-gray-200 px-4 py-3">Sesión</td>
                          <td className="border border-gray-200 px-4 py-3">Mantiene la sesión del usuario durante la navegación</td>
                          <td className="border border-gray-200 px-4 py-3">Versus Andorra</td>
                        </tr>
                        {/* Cookie de preferencias */}
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">cookie_consent</td>
                          <td className="border border-gray-200 px-4 py-3">Técnica</td>
                          <td className="border border-gray-200 px-4 py-3">1 año</td>
                          <td className="border border-gray-200 px-4 py-3">Almacena las preferencias de cookies del usuario</td>
                          <td className="border border-gray-200 px-4 py-3">Versus Andorra</td>
                        </tr>
                        {/* Google Analytics */}
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">_ga</td>
                          <td className="border border-gray-200 px-4 py-3">Analítica</td>
                          <td className="border border-gray-200 px-4 py-3">2 años</td>
                          <td className="border border-gray-200 px-4 py-3">Distingue usuarios para análisis estadístico (con IP anonimizada)</td>
                          <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">_ga_[ID]</td>
                          <td className="border border-gray-200 px-4 py-3">Analítica</td>
                          <td className="border border-gray-200 px-4 py-3">2 años</td>
                          <td className="border border-gray-200 px-4 py-3">Mantiene el estado de la sesión de Google Analytics</td>
                          <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">_gid</td>
                          <td className="border border-gray-200 px-4 py-3">Analítica</td>
                          <td className="border border-gray-200 px-4 py-3">24 horas</td>
                          <td className="border border-gray-200 px-4 py-3">Distingue usuarios para análisis estadístico</td>
                          <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                        </tr>
                        {/* Cookie de idioma */}
                        <tr>
                          <td className="border border-gray-200 px-4 py-3 font-mono text-xs">lang_preference</td>
                          <td className="border border-gray-200 px-4 py-3">Personalización</td>
                          <td className="border border-gray-200 px-4 py-3">1 año</td>
                          <td className="border border-gray-200 px-4 py-3">Almacena el idioma preferido del usuario</td>
                          <td className="border border-gray-200 px-4 py-3">Versus Andorra</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-gray-500 pt-2">
                    Nota: Esta tabla se actualiza periódicamente. Algunas cookies pueden variar según las funcionalidades activas en el sitio.
                  </p>
                </div>
              </div>

              {/* Sección 4: Cookies de terceros */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  4. Cookies de terceros
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Además de nuestras propias cookies, utilizamos servicios de terceros que pueden establecer cookies en su dispositivo cuando visita nuestro sitio web:
                  </p>

                  {/* Google Analytics */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-light text-gray-900 mb-3">Google Analytics</h3>
                    <p className="mb-3">
                      Utilizamos Google Analytics para analizar el uso del sitio web y obtener estadísticas sobre el tráfico y el comportamiento de los usuarios. Google Analytics es un servicio de análisis web proporcionado por Google LLC.
                    </p>
                    <ul className="space-y-2 ml-6 mb-3">
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Hemos configurado Google Analytics para anonimizar las direcciones IP</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>No compartimos datos con otros servicios de Google</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>Los datos se utilizan exclusivamente con fines estadísticos</span>
                      </li>
                    </ul>
                    <p className="text-sm">
                      Para más información sobre cómo Google utiliza los datos, visite:{' '}
                      <a 
                        href="https://policies.google.com/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:underline"
                      >
                        policies.google.com/privacy
                      </a>
                    </p>
                  </div>

                  {/* Google Maps */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-4">
                    <h3 className="font-light text-gray-900 mb-3">Google Maps</h3>
                    <p className="mb-3">
                      Utilizamos Google Maps para mostrar mapas interactivos de ubicaciones de propiedades. Al interactuar con estos mapas, Google puede establecer cookies en su dispositivo.
                    </p>
                    <p className="text-sm">
                      Política de privacidad de Google Maps:{' '}
                      <a 
                        href="https://policies.google.com/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:underline"
                      >
                        policies.google.com/privacy
                      </a>
                    </p>
                  </div>

                  {/* Redes sociales */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-4">
                    <h3 className="font-light text-gray-900 mb-3">Plugins de redes sociales</h3>
                    <p className="mb-3">
                      Nuestro sitio web puede incluir botones para compartir contenido en redes sociales (Facebook, Instagram, LinkedIn, etc.). Estos plugins pueden establecer cookies cuando interactúa con ellos.
                    </p>
                    <p className="text-sm">
                      Le recomendamos revisar las políticas de privacidad de cada red social para entender cómo utilizan sus datos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 5: Cómo gestionar las cookies */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  5. Cómo gestionar y eliminar cookies
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Usted tiene control total sobre las cookies que se almacenan en su dispositivo. Puede aceptarlas, rechazarlas o eliminarlas en cualquier momento a través de la configuración de su navegador.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-light text-gray-900 mb-3">Importante:</h3>
                    <p className="mb-2">
                      Si decide desactivar las cookies, algunas funcionalidades del sitio web pueden no estar disponibles o no funcionar correctamente. Las cookies técnicas necesarias para el funcionamiento básico del sitio no pueden ser desactivadas sin afectar su funcionalidad.
                    </p>
                  </div>

                  {/* Instrucciones por navegador */}
                  <div className="mt-6">
                    <h3 className="font-light text-gray-900 mb-4 text-lg">Gestión de cookies por navegador:</h3>
                    
                    <div className="space-y-4">
                      {/* Google Chrome */}
                      <div className="border-l-2 border-gray-900 pl-4">
                        <h4 className="font-light text-gray-900 mb-2">Google Chrome</h4>
                        <p className="mb-2 text-sm">
                          Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                        </p>
                        <a 
                          href="https://support.google.com/chrome/answer/95647" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline text-sm inline-flex items-center gap-1"
                        >
                          Más información
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Mozilla Firefox */}
                      <div className="border-l-2 border-gray-900 pl-4">
                        <h4 className="font-light text-gray-900 mb-2">Mozilla Firefox</h4>
                        <p className="mb-2 text-sm">
                          Opciones → Privacidad y seguridad → Cookies y datos del sitio
                        </p>
                        <a 
                          href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline text-sm inline-flex items-center gap-1"
                        >
                          Más información
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Safari */}
                      <div className="border-l-2 border-gray-900 pl-4">
                        <h4 className="font-light text-gray-900 mb-2">Safari (macOS)</h4>
                        <p className="mb-2 text-sm">
                          Preferencias → Privacidad → Gestión de cookies
                        </p>
                        <a 
                          href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline text-sm inline-flex items-center gap-1"
                        >
                          Más información
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Microsoft Edge */}
                      <div className="border-l-2 border-gray-900 pl-4">
                        <h4 className="font-light text-gray-900 mb-2">Microsoft Edge</h4>
                        <p className="mb-2 text-sm">
                          Configuración → Privacidad, búsqueda y servicios → Cookies y permisos de sitio
                        </p>
                        <a 
                          href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline text-sm inline-flex items-center gap-1"
                        >
                          Más información
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>

                      {/* Opera */}
                      <div className="border-l-2 border-gray-900 pl-4">
                        <h4 className="font-light text-gray-900 mb-2">Opera</h4>
                        <p className="mb-2 text-sm">
                          Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                        </p>
                        <a 
                          href="https://help.opera.com/en/latest/web-preferences/#cookies" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline text-sm inline-flex items-center gap-1"
                        >
                          Más información
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Opt-out de Google Analytics */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="font-light text-gray-900 mb-3">Desactivar Google Analytics</h3>
                    <p className="mb-3">
                      Si desea desactivar específicamente Google Analytics sin afectar otras cookies, puede instalar el complemento de inhabilitación de Google Analytics:
                    </p>
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline inline-flex items-center gap-2"
                    >
                      Descargar complemento de inhabilitación
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sección 6: Consentimiento */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  6. Consentimiento y preferencias
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Al utilizar nuestro sitio web, se le presentará un banner de cookies en su primera visita, donde podrá:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Aceptar todas las cookies</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Rechazar cookies no esenciales</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Configurar sus preferencias de forma personalizada</span>
                    </li>
                  </ul>
                  <p>
                    Las cookies técnicas necesarias para el funcionamiento del sitio se activarán automáticamente, pero puede gestionarlas desde la configuración de su navegador como se indica en la sección anterior.
                  </p>
                  <p>
                    Puede cambiar sus preferencias de cookies en cualquier momento accediendo al panel de configuración disponible en el pie de página de nuestro sitio web.
                  </p>
                </div>
              </div>

              {/* Sección 7: Actualizaciones */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  7. Actualizaciones de esta política
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos o por otros motivos operativos, legales o reglamentarios.
                  </p>
                  <p>
                    Le recomendamos revisar esta página regularmente para estar informado sobre cómo utilizamos las cookies. La fecha de la última actualización se indica al inicio de este documento.
                  </p>
                  <p>
                    Si realizamos cambios significativos en cómo utilizamos las cookies, se lo notificaremos mediante un aviso destacado en nuestro sitio web.
                  </p>
                </div>
              </div>

              {/* Sección 8: Más información y contacto */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  8. Más información y contacto
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Si tiene alguna pregunta sobre esta Política de Cookies o sobre el uso de cookies en nuestro sitio web, puede contactarnos a través de:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-light text-gray-900">Email</p>
                        <a href="mailto:privacidad@versusandorra.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                          privacidad@versusandorra.com
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
                          Versus Andorra, S.L.<br />
                          Andorra la Vella<br />
                          Principado de Andorra
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="pt-4">
                    Para más información sobre cómo tratamos sus datos personales, consulte nuestra{' '}
                    <Link href="/privacidad" className="text-gray-900 hover:underline">
                      Política de Privacidad
                    </Link>
                    {' '}y nuestros{' '}
                    <Link href="/terminos" className="text-gray-900 hover:underline">
                      Términos y Condiciones
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
