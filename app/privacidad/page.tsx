/**
 * Privacy Policy Page
 * 
 * Página de Política de Privacidad conforme al RGPD.
 * Incluye información sobre tratamiento de datos personales, derechos de usuarios
 * y medidas de seguridad implementadas.
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
 * Metadata SEO para la página de Política de Privacidad
 * Optimizada para indexación y cumplimiento legal
 */
export const metadata = {
  title: 'Política de Privacidad | Versus Andorra',
  description: 'Información sobre protección de datos personales y cumplimiento del RGPD. Conoce cómo tratamos y protegemos tu información en Versus Andorra.',
};

/**
 * Privacy Policy Page Component
 * 
 * Renderiza la página de política de privacidad con:
 * - Hero section simple sin imagen
 * - Breadcrumb navegable
 * - Contenido sobre protección de datos (RGPD)
 * - Información sobre derechos de usuarios
 * - Diseño minimalista y profesional
 * 
 * @returns {Promise<JSX.Element>} Página completa de política de privacidad
 */
export default async function PrivacyPage() {
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
              <span className="text-gray-900">Política de Privacidad</span>
            </nav>

            {/* Título principal */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Política de Privacidad
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
                  En Versus Andorra, nos comprometemos a proteger la privacidad y los datos personales de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, utilizamos, almacenamos y protegemos su información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la normativa aplicable en el Principado de Andorra.
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  Al utilizar nuestro sitio web y servicios, usted acepta las prácticas descritas en esta política. Le recomendamos leerla detenidamente.
                </p>
              </div>

              {/* Sección 1: Responsable del tratamiento */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  1. Responsable del tratamiento de datos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    El responsable del tratamiento de sus datos personales es:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                    <p><span className="text-gray-900">Razón social:</span> Versus Andorra, S.L.</p>
                    <p><span className="text-gray-900">Dirección:</span> Andorra la Vella, Principado de Andorra</p>
                    <p><span className="text-gray-900">Email:</span> <a href="mailto:privacidad@versusandorra.com" className="text-gray-900 hover:underline">privacidad@versusandorra.com</a></p>
                    <p><span className="text-gray-900">Teléfono:</span> <a href="tel:+376600000000" className="text-gray-900 hover:underline">+376 600 000 000</a></p>
                  </div>
                  <p>
                    Si tiene alguna pregunta sobre esta política o sobre el tratamiento de sus datos personales, puede contactarnos a través de los medios indicados anteriormente.
                  </p>
                </div>
              </div>

              {/* Sección 2: Datos que recopilamos */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  2. Datos personales que recopilamos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Podemos recopilar y tratar las siguientes categorías de datos personales:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-light text-gray-900 mb-2">Datos de identificación y contacto:</h3>
                      <ul className="space-y-2 ml-6">
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Nombre y apellidos</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Dirección de correo electrónico</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Número de teléfono</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Dirección postal</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Documento de identificación (solo cuando sea necesario legalmente)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-light text-gray-900 mb-2">Datos de navegación:</h3>
                      <ul className="space-y-2 ml-6">
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Dirección IP</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Tipo y versión del navegador</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Sistema operativo</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Páginas visitadas y tiempo de permanencia</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Origen de la visita (referrer)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-light text-gray-900 mb-2">Datos relacionados con servicios inmobiliarios:</h3>
                      <ul className="space-y-2 ml-6">
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Preferencias de búsqueda de propiedades</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Información financiera (cuando sea necesario para valoraciones)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Documentación relacionada con transacciones inmobiliarias</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-gray-400 flex-shrink-0">•</span>
                          <span>Historial de interacciones con nuestros servicios</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p>
                    Solo recopilamos los datos estrictamente necesarios para la finalidad específica del tratamiento. No solicitamos datos especialmente protegidos (origen étnico, opiniones políticas, creencias religiosas, salud, etc.) salvo que sea imprescindible y con su consentimiento explícito.
                  </p>
                </div>
              </div>

              {/* Sección 3: Finalidad del tratamiento */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  3. Finalidad y base legal del tratamiento
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Tratamos sus datos personales para las siguientes finalidades, cada una con su correspondiente base legal:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="border-l-2 border-gray-900 pl-4">
                      <h3 className="font-light text-gray-900 mb-2">Gestión de consultas y comunicaciones</h3>
                      <p className="mb-2"><span className="text-gray-900">Finalidad:</span> Responder a sus solicitudes de información, consultas o contacto a través de formularios, email o teléfono.</p>
                      <p><span className="text-gray-900">Base legal:</span> Consentimiento del interesado e interés legítimo en atender sus consultas.</p>
                    </div>

                    <div className="border-l-2 border-gray-900 pl-4">
                      <h3 className="font-light text-gray-900 mb-2">Prestación de servicios inmobiliarios</h3>
                      <p className="mb-2"><span className="text-gray-900">Finalidad:</span> Gestionar servicios de compraventa, alquiler, valoración y asesoramiento inmobiliario. Incluye la organización de visitas, negociación y documentación.</p>
                      <p><span className="text-gray-900">Base legal:</span> Ejecución de contrato o medidas precontractuales solicitadas por el interesado.</p>
                    </div>

                    <div className="border-l-2 border-gray-900 pl-4">
                      <h3 className="font-light text-gray-900 mb-2">Marketing y comunicaciones comerciales</h3>
                      <p className="mb-2"><span className="text-gray-900">Finalidad:</span> Envío de newsletters, ofertas de propiedades, novedades del mercado inmobiliario y contenido promocional.</p>
                      <p><span className="text-gray-900">Base legal:</span> Consentimiento explícito del interesado. Puede retirar su consentimiento en cualquier momento.</p>
                    </div>

                    <div className="border-l-2 border-gray-900 pl-4">
                      <h3 className="font-light text-gray-900 mb-2">Análisis y mejora del sitio web</h3>
                      <p className="mb-2"><span className="text-gray-900">Finalidad:</span> Analizar el uso del sitio web para mejorar la experiencia de usuario, funcionalidad y contenido.</p>
                      <p><span className="text-gray-900">Base legal:</span> Interés legítimo en mejorar nuestros servicios y consentimiento para cookies analíticas.</p>
                    </div>

                    <div className="border-l-2 border-gray-900 pl-4">
                      <h3 className="font-light text-gray-900 mb-2">Cumplimiento de obligaciones legales</h3>
                      <p className="mb-2"><span className="text-gray-900">Finalidad:</span> Cumplir con obligaciones legales en materia fiscal, contable, de prevención de blanqueo de capitales y otras normativas aplicables al sector inmobiliario.</p>
                      <p><span className="text-gray-900">Base legal:</span> Obligación legal.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 4: Destinatarios de los datos */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  4. Destinatarios y cesión de datos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Sus datos personales son tratados con estricta confidencialidad. No vendemos, alquilamos ni cedemos sus datos a terceros con fines comerciales.
                  </p>
                  <p>
                    Sus datos pueden ser comunicados a las siguientes categorías de destinatarios cuando sea necesario:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span><span className="text-gray-900">Proveedores de servicios tecnológicos:</span> Hosting, gestión de emails, plataformas de análisis web (bajo acuerdos de confidencialidad y cumplimiento RGPD).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span><span className="text-gray-900">Asesores profesionales:</span> Abogados, notarios, gestores fiscales cuando sea necesario para la prestación de servicios inmobiliarios.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span><span className="text-gray-900">Organismos públicos:</span> Cuando exista obligación legal (autoridades fiscales, registro de la propiedad, etc.).</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span><span className="text-gray-900">Entidades financieras:</span> Solo con su consentimiento explícito para facilitar operaciones de compraventa.</span>
                    </li>
                  </ul>
                  <p>
                    No realizamos transferencias internacionales de datos fuera del Espacio Económico Europeo (EEE). En caso de ser necesario en el futuro, se implementarán las garantías adecuadas conforme al RGPD.
                  </p>
                </div>
              </div>

              {/* Sección 5: Plazos de conservación */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  5. Plazos de conservación de datos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos y para cumplir con las obligaciones legales aplicables.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div>
                      <p className="text-gray-900 mb-1">Datos de consultas y contacto:</p>
                      <p className="text-sm">Se conservan durante 1 año desde la última interacción, salvo que solicite su supresión antes.</p>
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Datos de clientes con contrato:</p>
                      <p className="text-sm">Se conservan durante la vigencia del contrato y posteriormente durante los plazos de prescripción legal (mínimo 6 años por obligaciones fiscales y contables).</p>
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Datos de marketing:</p>
                      <p className="text-sm">Se conservan hasta que retire su consentimiento o solicite la baja de comunicaciones comerciales.</p>
                    </div>
                    <div>
                      <p className="text-gray-900 mb-1">Datos de navegación (cookies):</p>
                      <p className="text-sm">Según los plazos específicos indicados en nuestra Política de Cookies (generalmente entre sesión y 2 años).</p>
                    </div>
                  </div>
                  <p>
                    Una vez transcurridos los plazos de conservación, procederemos a la eliminación segura de sus datos personales o a su anonimización.
                  </p>
                </div>
              </div>

              {/* Sección 6: Derechos del usuario */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  6. Sus derechos como usuario
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    De acuerdo con el RGPD, usted tiene los siguientes derechos sobre sus datos personales:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de acceso:</span> Puede solicitar información sobre qué datos personales tratamos sobre usted.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de rectificación:</span> Puede solicitar la corrección de datos inexactos o incompletos.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de supresión:</span> Puede solicitar la eliminación de sus datos cuando ya no sean necesarios o cuando retire su consentimiento.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de oposición:</span> Puede oponerse al tratamiento de sus datos para fines de marketing directo o basados en interés legítimo.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de limitación:</span> Puede solicitar la limitación del tratamiento en determinadas circunstancias.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho de portabilidad:</span> Puede solicitar recibir sus datos en formato estructurado y transferirlos a otro responsable.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho a retirar el consentimiento:</span> Cuando el tratamiento esté basado en su consentimiento, puede retirarlo en cualquier momento.
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-900 flex-shrink-0 font-light">•</span>
                      <div>
                        <span className="text-gray-900">Derecho a presentar una reclamación:</span> Puede presentar una reclamación ante la Agencia Andorrana de Protección de Datos (APDA) si considera que se han vulnerado sus derechos.
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="font-light text-gray-900 mb-3">¿Cómo ejercer sus derechos?</h3>
                    <p className="mb-3">
                      Para ejercer cualquiera de estos derechos, puede contactarnos mediante:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <span className="text-gray-900">Email:</span> <a href="mailto:privacidad@versusandorra.com" className="text-gray-900 hover:underline">privacidad@versusandorra.com</a>
                      </li>
                      <li>
                        <span className="text-gray-900">Correo postal:</span> Versus Andorra, S.L. - Andorra la Vella, Principado de Andorra
                      </li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Deberá acreditar su identidad mediante copia de DNI o documento equivalente. Responderemos a su solicitud en el plazo de 1 mes desde la recepción.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 7: Seguridad de los datos */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  7. Seguridad de los datos
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    La seguridad de sus datos personales es una prioridad para Versus Andorra. Hemos implementado medidas técnicas y organizativas apropiadas para proteger sus datos contra pérdida accidental, destrucción, alteración, acceso no autorizado o divulgación.
                  </p>
                  <p className="font-light text-gray-900 mb-2">
                    Medidas de seguridad implementadas:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Cifrado SSL/TLS en todas las comunicaciones del sitio web</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Servidores seguros con acceso restringido y protegidos mediante firewall</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Copias de seguridad periódicas y cifradas</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Control de acceso basado en roles y necesidad de conocimiento</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Formación periódica del personal en protección de datos</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Acuerdos de confidencialidad con empleados y colaboradores</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-gray-400 flex-shrink-0">•</span>
                      <span>Auditorías de seguridad regulares</span>
                    </li>
                  </ul>
                  <p>
                    A pesar de nuestros esfuerzos, ningún sistema es completamente seguro. Si detecta alguna vulnerabilidad o incidente de seguridad, le rogamos nos lo comunique inmediatamente a través de <a href="mailto:seguridad@versusandorra.com" className="text-gray-900 hover:underline">seguridad@versusandorra.com</a>.
                  </p>
                </div>
              </div>

              {/* Sección 8: Menores de edad */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  8. Protección de menores
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionadamente datos personales de menores de edad sin el consentimiento de sus padres o tutores legales.
                  </p>
                  <p>
                    Si tiene conocimiento de que un menor ha proporcionado datos personales sin autorización, por favor contáctenos inmediatamente para que podamos tomar las medidas apropiadas y eliminar dicha información de nuestros sistemas.
                  </p>
                </div>
              </div>

              {/* Sección 9: Cookies y tecnologías similares */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  9. Cookies y tecnologías similares
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia de usuario, analizar el tráfico web y personalizar el contenido.
                  </p>
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Algunas son esenciales para el funcionamiento del sitio, mientras que otras requieren su consentimiento.
                  </p>
                  <p>
                    Para información detallada sobre qué cookies utilizamos, su finalidad, duración y cómo puede gestionarlas, consulte nuestra{' '}
                    <Link href="/cookies" className="text-gray-900 hover:underline">
                      Política de Cookies
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Sección 10: Enlaces a terceros */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  10. Enlaces a sitios web de terceros
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Nuestro sitio web puede contener enlaces a sitios web de terceros (redes sociales, portales inmobiliarios, servicios de mapas, etc.). Esta Política de Privacidad no se aplica a dichos sitios externos.
                  </p>
                  <p>
                    No somos responsables de las prácticas de privacidad ni del contenido de sitios web de terceros. Le recomendamos leer las políticas de privacidad de cada sitio web que visite.
                  </p>
                </div>
              </div>

              {/* Sección 11: Cambios en la política */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  11. Modificaciones de esta política
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a cambios legislativos, jurisprudenciales o en nuestras prácticas empresariales.
                  </p>
                  <p>
                    Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente. Los cambios sustanciales serán comunicados a través de un aviso destacado en nuestro sitio web o por correo electrónico cuando sea apropiado.
                  </p>
                  <p>
                    Le recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información.
                  </p>
                </div>
              </div>

              {/* Sección 12: Contacto y más información */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 mb-6">
                  12. Contacto y más información
                </h2>
                <div className="space-y-4 text-gray-600 font-light leading-relaxed">
                  <p>
                    Si tiene alguna pregunta, comentario o inquietud sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales, puede contactarnos a través de:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-light text-gray-900">Email de Privacidad</p>
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
                    También puede contactarnos a través de nuestro{' '}
                    <Link href="/contacto" className="text-gray-900 hover:underline">
                      formulario de contacto
                    </Link>
                    {' '}o consultar nuestros{' '}
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
