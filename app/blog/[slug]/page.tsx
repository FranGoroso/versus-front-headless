/**
 * Blog Post Detail Page
 * 
 * Página de detalle de cada post del blog.
 * Diseño minimalista con tipografía optimizada para lectura.
 * 
 * @page /blog/[slug]
 * @version 1.0.0
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

/**
 * Función para formatear fecha
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Mock de post relacionados
 */
const relatedPosts = [
  {
    id: 1,
    title: 'Guía para inversores: Cómo comprar propiedad en Andorra',
    slug: 'guia-comprar-propiedad-andorra',
    image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-10T10:00:00',
    readTime: '8 min'
  },
  {
    id: 2,
    title: 'Las mejores zonas para vivir en Andorra la Vella',
    slug: 'mejores-zonas-andorra-la-vella',
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-05T10:00:00',
    readTime: '6 min'
  },
  {
    id: 3,
    title: '5 razones para invertir en propiedades de lujo en Andorra',
    slug: 'invertir-propiedades-lujo-andorra',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2024-01-03T10:00:00',
    readTime: '7 min'
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const [siteConfig, setSiteConfig] = useState(null);
  
  // Mock del post actual
  const post = {
    id: 1,
    title: { rendered: 'El mercado inmobiliario en Andorra: Tendencias 2025' },
    content: { rendered: `
      <p class="lead">El mercado inmobiliario en Andorra continúa mostrando una solidez notable en 2025, consolidándose como uno de los destinos más atractivos para inversores internacionales. En este análisis exhaustivo, exploramos las tendencias clave que están definiendo el sector y las oportunidades que presenta para los próximos meses.</p>
      
      <h2>Un mercado en constante evolución</h2>
      <p>Andorra ha experimentado una transformación significativa en su mercado inmobiliario durante los últimos años. La combinación de estabilidad política, ventajas fiscales competitivas y una calidad de vida excepcional ha atraído a un número creciente de residentes de alto poder adquisitivo.</p>
      
      <p>Según los últimos datos del Departamento de Estadística de Andorra, el precio medio de la vivienda ha experimentado un incremento del 8.5% interanual, situándose en 4.200€/m² en las zonas prime de Andorra la Vella y Escaldes-Engordany. Esta tendencia alcista, aunque moderada en comparación con años anteriores, refleja la salud y madurez del mercado.</p>
      
      <h2>Factores clave que impulsan el mercado</h2>
      
      <h3>1. Demanda internacional sostenida</h3>
      <p>La demanda de propiedades por parte de compradores internacionales, especialmente de Francia, España y países del norte de Europa, continúa siendo robusta. El perfil del comprador ha evolucionado hacia profesionales del sector tecnológico y financiero que buscan establecer su residencia fiscal en el principado.</p>
      
      <blockquote>
        <p>"Estamos observando un interés particular en propiedades que combinan lujo con sostenibilidad. Los compradores actuales valoran enormemente las certificaciones energéticas y las tecnologías smart home."</p>
        <cite>— Análisis de Versus Andorra Real Estate</cite>
      </blockquote>
      
      <h3>2. Escasez de suelo edificable</h3>
      <p>La geografía montañosa de Andorra y las estrictas regulaciones urbanísticas limitan naturalmente la oferta de nuevas construcciones. Esta escasez estructural de suelo edificable actúa como un factor de soporte fundamental para los precios, garantizando la estabilidad a largo plazo del valor de las propiedades.</p>
      
      <h3>3. Proyectos de infraestructura</h3>
      <p>Los importantes proyectos de infraestructura en marcha, incluyendo la mejora de las conexiones viarias y el desarrollo de nuevas zonas comerciales y de ocio, están revalorizando áreas específicas del principado. Destacan especialmente los desarrollos en la parroquia de Encamp y la modernización del eje comercial de Andorra la Vella.</p>
      
      <h2>Tendencias emergentes en 2025</h2>
      
      <h3>Sostenibilidad y eficiencia energética</h3>
      <p>La sostenibilidad se ha convertido en un factor decisivo en las decisiones de compra. Las propiedades con certificación energética A o B comandadas primas de precio de hasta un 15% sobre propiedades comparables sin estas certificaciones. Los desarrolladores locales están respondiendo a esta demanda con proyectos que integran tecnologías de energía renovable y sistemas de gestión inteligente del consumo.</p>
      
      <h3>Espacios flexibles y teletrabajo</h3>
      <p>La consolidación del teletrabajo ha redefinido las prioridades de los compradores. Las propiedades con espacios dedicados para oficina en casa, buena conectividad y terrazas o jardines privados están experimentando una demanda particularmente alta. Este cambio en las preferencias está influyendo en el diseño de las nuevas promociones.</p>
      
      <h2>Oportunidades de inversión</h2>
      
      <p>Para los inversores que buscan oportunidades en el mercado andorrano, identificamos varios segmentos con potencial especialmente atractivo:</p>
      
      <ul>
        <li><strong>Propiedades para reforma en el centro histórico:</strong> Con precios de entrada más accesibles y alto potencial de revalorización post-reforma.</li>
        <li><strong>Apartamentos de 2-3 habitaciones en zonas consolidadas:</strong> Alta demanda de alquiler por parte de profesionales expatriados.</li>
        <li><strong>Chalets y propiedades de montaña:</strong> Creciente interés por propiedades que ofrecen privacidad y conexión con la naturaleza.</li>
        <li><strong>Locales comerciales en ejes principales:</strong> El sector retail de lujo continúa expandiéndose, creando oportunidades interesantes.</li>
      </ul>
      
      <h2>Perspectivas para los próximos meses</h2>
      
      <p>Las proyecciones para el resto de 2025 son cautamente optimistas. Se espera que los precios continúen su tendencia alcista moderada, con incrementos proyectados entre el 5% y 7% anual. La demanda seguirá superando a la oferta en los segmentos prime, mientras que el mercado medio podría ver una mayor estabilización de precios.</p>
      
      <p>Los factores a monitorear incluyen la evolución de los tipos de interés en la zona euro, los cambios regulatorios en materia de residencia fiscal y el impacto de los nuevos desarrollos urbanísticos programados para los próximos años.</p>
      
      <h2>Conclusión</h2>
      
      <p>El mercado inmobiliario de Andorra en 2025 presenta un escenario de oportunidades para inversores con visión a largo plazo. La combinación de fundamentales sólidos, demanda internacional sostenida y oferta limitada configura un entorno propicio para la preservación y apreciación del capital.</p>
      
      <p>En Versus Andorra Real Estate, continuamos comprometidos con proporcionar a nuestros clientes el asesoramiento experto necesario para navegar este mercado dinámico y aprovechar las mejores oportunidades de inversión que ofrece el principado.</p>
    ` },
    excerpt: { rendered: '<p>Análisis completo de las tendencias del mercado inmobiliario andorrano y las oportunidades de inversión para este año.</p>' },
    slug: 'mercado-inmobiliario-andorra-2025',
    date: '2024-01-15T10:00:00',
    featured_image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1920',
    author: { 
      name: 'Txema Anaya',
      bio: 'CEO de Versus Andorra con más de 15 años de experiencia en el sector inmobiliario.',
      avatar: 'https://via.placeholder.com/100'
    },
    category: 'Mercado Inmobiliario',
    tags: ['inversión', 'tendencias', 'mercado', '2025'],
    readTime: '12 min'
  };

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero con imagen */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={post.featured_image}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          <Container className="relative z-10 pb-12">
            <div className="max-w-4xl">
              {/* Meta información */}
              <div className="flex items-center gap-4 text-white/80 text-sm mb-6">
                <span className="font-light">{post.category}</span>
                <span className="text-white/40">•</span>
                <span className="font-light">{formatDate(post.date)}</span>
                <span className="text-white/40">•</span>
                <span className="font-light">{post.readTime} de lectura</span>
              </div>
              
              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
                {post.title.rendered}
              </h1>
              
              {/* Autor */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <div>
                  <p className="text-white font-light">Por {post.author.name}</p>
                  <p className="text-white/60 text-sm font-light">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Contenido del artículo */}
        <section className="py-16 lg:py-20">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Compartir */}
              <div className="flex items-center justify-between mb-12 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-light"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 font-light">Compartir:</span>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Contenido HTML del post */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-light prose-headings:text-gray-900
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:font-light prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300 hover:prose-a:decoration-gray-900
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-900 prose-blockquote:pl-6 prose-blockquote:italic
                  prose-ul:my-6 prose-li:text-gray-700 prose-li:font-light
                  prose-strong:font-medium prose-strong:text-gray-900
                  prose-lead:text-xl prose-lead:text-gray-600 prose-lead:font-light prose-lead:leading-relaxed
                "
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </div>
          </Container>
        </section>

        {/* Autor Box */}
        <section className="py-12 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 flex items-start gap-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    Sobre el autor
                  </h3>
                  <p className="font-medium text-gray-900 mb-2">{post.author.name}</p>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {post.author.bio} Con una visión estratégica del mercado y un compromiso 
                    inquebrantable con la excelencia, lidera el equipo de Versus Andorra 
                    hacia nuevos horizontes en el sector inmobiliario del principado.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Posts relacionados */}
        <section className="py-16 lg:py-20">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
                Artículos relacionados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                            <span className="font-light">{formatDate(relatedPost.date)}</span>
                            <span className="text-gray-300">•</span>
                            <span className="font-light">{relatedPost.readTime}</span>
                          </div>
                          <h3 className="text-lg font-light text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                            {relatedPost.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Newsletter */}
        <section className="py-16 bg-gray-900">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-light text-white mb-4">
                ¿Te ha gustado este artículo?
              </h2>
              <p className="text-gray-300 font-light mb-8">
                Suscríbete y recibe contenido exclusivo sobre el mercado inmobiliario de Andorra.
              </p>
              <Link href="/contacto">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-3">
                  Contactar con un experto
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
