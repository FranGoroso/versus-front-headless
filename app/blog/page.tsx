/**
 * Blog Page
 * 
 * Página principal del blog con diseño minimalista y elegante.
 * Conectado a WordPress REST API.
 * 
 * @page /blog
 * @version 2.1.0 - Debug mode
 */

import Image from 'next/image';
import Link from 'next/link';
import { getSiteConfig, getPosts } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { NewsletterForm } from '@/components/sections/NewsletterForm';

/**
 * Revalidación ISR - cada hora
 */
export const revalidate = 3600;

/**
 * Metadata de la página
 */
export async function generateMetadata() {
  const config = await getSiteConfig();
  
  return {
    title: `Blog | ${config?.site_name || 'Versus Andorra'}`,
    description: 'Últimas noticias, tendencias del mercado inmobiliario y consejos para inversores en Andorra.',
  };
}

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
 * Función para extraer texto del excerpt HTML
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Mock de categorías para el filtro
 * TODO: Obtener categorías dinámicamente desde WordPress
 */
const categories = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 1, name: 'Mercado Inmobiliario', slug: 'mercado-inmobiliario' },
  { id: 2, name: 'Inversión', slug: 'inversion' },
  { id: 3, name: 'Estilo de Vida', slug: 'estilo-de-vida' },
  { id: 4, name: 'Consejos', slug: 'consejos' },
];

export default async function BlogPage() {
  const siteConfig = await getSiteConfig();
  
  // Obtener posts reales de WordPress (aumentado a 100 para debug)
  const postsData = await getPosts({ per_page: 100 });
  
  // DEBUG: Logs temporales para diagnóstico
  console.log('=== BLOG DEBUG ===');
  console.log('[BLOG] Total posts recibidos de WordPress:', postsData?.length || 0);
  if (postsData && postsData.length > 0) {
    console.log('[BLOG] Títulos de posts recibidos:');
    postsData.forEach((p: any, index: number) => {
      console.log(`  ${index + 1}. ${p.title?.rendered || p.title} (slug: ${p.slug})`);
    });
  } else {
    console.warn('[BLOG] ⚠️ No se recibieron posts de WordPress');
  }
  
  // Transformar posts de WordPress al formato esperado por el frontend
  const posts = (postsData || []).map((post: any) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    // Extraer imagen destacada de _embedded si existe
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                   'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    // Extraer autor de _embedded si existe
    author: { 
      name: post._embedded?.author?.[0]?.name || 'Versus Andorra' 
    },
    // Extraer categoría de _embedded si existe
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
    // Calcular tiempo de lectura aproximado (250 palabras por minuto)
    readTime: `${Math.max(1, Math.round(stripHtml(post.content?.rendered || '').split(' ').length / 250))} min`
  }));

  console.log('[BLOG] Posts después de transformar:', posts.length);
  console.log('[BLOG] Post destacado:', posts[0]?.title?.rendered || 'No hay post destacado');
  console.log('[BLOG] Posts en grid:', posts.slice(1).length);
  console.log('=== FIN BLOG DEBUG ===\n');

  // Obtener el post destacado (el más reciente)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
                Blog
              </h1>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Descubre las últimas tendencias del mercado inmobiliario, 
                consejos de inversión y estilo de vida en Andorra.
              </p>
            </div>

            {/* Categorías */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-light transition-all duration-300
                    ${category.id === 'all' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Post Destacado */}
            {featuredPost && (
              <div className="mb-20">
                <Link href={`/blog/${featuredPost.slug}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Imagen */}
                      <div className="relative h-96 lg:h-full overflow-hidden">
                        <Image
                          src={featuredPost.featured_image}
                          alt={stripHtml(featuredPost.title.rendered)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-light">
                            Artículo Destacado
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-10 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span className="font-light">{featuredPost.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-light">{formatDate(featuredPost.date)}</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-light">{featuredPost.readTime} de lectura</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                          {stripHtml(featuredPost.title.rendered)}
                        </h2>

                        <p className="text-gray-600 font-light leading-relaxed mb-6 line-clamp-3">
                          {stripHtml(featuredPost.excerpt.rendered)}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                            <span className="text-sm text-gray-700 font-light">
                              Por {featuredPost.author.name}
                            </span>
                          </div>

                          <span className="text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}
          </Container>
        </section>

        {/* Posts Grid */}
        <section className="py-20 bg-white">
          <Container>
            {recentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className="group fade-in"
                      style={{
                        animation: `slideInFromBottom ${0.5 + index * 0.1}s ease-out`
                      }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Imagen */}
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            <Image
                              src={post.featured_image}
                              alt={stripHtml(post.title.rendered)}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Contenido */}
                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                              <span className="font-light">{post.category}</span>
                              <span className="text-gray-300">•</span>
                              <span className="font-light">{formatDate(post.date)}</span>
                            </div>

                            <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                              {stripHtml(post.title.rendered)}
                            </h3>

                            <p className="text-gray-600 font-light text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                              {stripHtml(post.excerpt.rendered)}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                                <span className="text-xs text-gray-600 font-light">
                                  {post.author.name}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 font-light">
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                {/* Paginación */}
                <div className="flex justify-center items-center gap-2 mt-16">
                  <button className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-300" disabled>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-light">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 text-sm font-light transition-colors duration-300">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-700 text-sm font-light transition-colors duration-300">
                      3
                    </button>
                  </div>

                  <button className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No hay más artículos disponibles en este momento.
                </p>
              </div>
            )}
          </Container>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gray-50">
          <Container>
            <NewsletterForm />
          </Container>
        </section>
      </main>

      <Footer config={siteConfig} />
    </>
  );
}
