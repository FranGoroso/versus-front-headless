/**
 * Blog Post Detail Page - Versión Mejorada
 * 
 * Página de detalle de cada post del blog.
 * Diseño minimalista con tipografía optimizada para lectura.
 * Conectado a WordPress REST API.
 * 
 * Mejoras v3.0:
 * - Conectado a WordPress REST API
 * - Server Component para mejor SEO
 * - Datos dinámicos del CMS
 * - Manejo de 404 para posts no encontrados
 * - Espaciado generoso entre elementos para mejor respiración visual
 * - Primer párrafo destacado con drop cap (letra capital)
 * - Headings con mayor jerarquía visual y separación
 * - Blockquotes con diseño elegante y destacado
 * 
 * @page /blog/[slug]
 * @version 3.0.0
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteConfig, getPostBySlug, getPosts } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

/**
 * Función para formatear fecha
 * Convierte una fecha ISO a formato legible en español
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
 * Función para extraer texto limpio de HTML
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Componente principal de la página de detalle del blog
 * Ahora es un Server Component que obtiene datos de WordPress
 */
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Obtener configuración del sitio y post desde WordPress
  const [siteConfig, post] = await Promise.all([
    getSiteConfig(),
    getPostBySlug(params.slug)
  ]);

  // Si el post no existe, mostrar página 404
  if (!post) {
    notFound();
  }

  // Extraer datos del post de WordPress
  const postData = {
    id: post.id,
    title: post.title?.rendered || 'Sin título',
    content: post.content?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    slug: post.slug,
    date: post.date,
    // Extraer imagen destacada de _embedded
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                   'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1920',
    // Extraer autor de _embedded
    author: {
      name: post._embedded?.author?.[0]?.name || 'Versus Andorra',
      bio: post._embedded?.author?.[0]?.description || 'Experto en el mercado inmobiliario de Andorra.',
      avatar: post._embedded?.author?.[0]?.avatar_urls?.['96'] || ''
    },
    // Extraer categoría de _embedded
    category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General',
    // Extraer tags de _embedded
    tags: post._embedded?.['wp:term']?.[1]?.map((tag: any) => tag.name) || [],
    // Calcular tiempo de lectura (250 palabras por minuto)
    readTime: `${Math.max(1, Math.round(stripHtml(post.content?.rendered || '').split(' ').length / 250))} min`
  };

  // Obtener posts relacionados (últimos 3 posts excluyendo el actual)
  const relatedPostsData = await getPosts({ per_page: 4 });
  const relatedPosts = (relatedPostsData || [])
    .filter((p: any) => p.id !== post.id)
    .slice(0, 3)
    .map((p: any) => ({
      id: p.id,
      title: p.title?.rendered || '',
      slug: p.slug,
      image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
             'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: p.date,
      readTime: `${Math.max(1, Math.round(stripHtml(p.content?.rendered || '').split(' ').length / 250))} min`
    }));

  return (
    <>
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section con imagen destacada */}
        <section className="relative h-[70vh] min-h-[500px] flex items-end">
          {/* Imagen de fondo con overlay gradiente */}
          <div className="absolute inset-0">
            <Image
              src={postData.featured_image}
              alt={postData.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          {/* Contenido del hero */}
          <Container className="relative z-10 pb-16">
            <div className="max-w-4xl">
              {/* Meta información del artículo */}
              <div className="flex items-center gap-4 text-white/80 text-sm mb-8">
                <span className="font-light tracking-wide">{postData.category}</span>
                <span className="text-white/40">•</span>
                <time className="font-light tracking-wide">{formatDate(postData.date)}</time>
                <span className="text-white/40">•</span>
                <span className="font-light tracking-wide">{postData.readTime} de lectura</span>
              </div>
              
              {/* Título principal del artículo */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-8 tracking-tight">
                {postData.title}
              </h1>
              
              {/* Información del autor */}
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <div>
                  <p className="text-white font-light text-base mb-1">Por {postData.author.name}</p>
                  <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
                    {postData.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Sección principal de contenido del artículo */}
        <section className="py-32 lg:py-40">
          <Container>
            <article className="max-w-3xl mx-auto">
              {/* Barra de tags y compartir */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-20 pb-12 border-b border-gray-100">
                {/* Tags del artículo */}
                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    {postData.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-5 py-2 bg-gray-50 text-gray-600 text-sm font-light rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Botones de compartir en redes sociales */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 font-light">Compartir:</span>
                  <button 
                    className="p-3 hover:bg-gray-50 rounded-full transition-all duration-300 text-gray-600 hover:text-gray-900 hover:scale-110"
                    aria-label="Compartir en Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button 
                    className="p-3 hover:bg-gray-50 rounded-full transition-all duration-300 text-gray-600 hover:text-gray-900 hover:scale-110"
                    aria-label="Compartir en Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button 
                    className="p-3 hover:bg-gray-50 rounded-full transition-all duration-300 text-gray-600 hover:text-gray-900 hover:scale-110"
                    aria-label="Compartir en LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 
                Contenido HTML del post con estilos mejorados
                
                Mejoras implementadas:
                - Drop cap (letra capital) en el primer párrafo
                - Espaciado generoso entre todos los elementos
                - Headings con jerarquía visual clara
                - Blockquotes elegantes con fondo y bordes
                - Listas con más separación y padding
                - Line-height optimizado (leading-relaxed)
                - Colores de texto suavizados para mejor lectura
              */}
              <div 
                className="blog-content
                  prose prose-xl max-w-none
                  
                  /* === CONFIGURACIÓN GENERAL === */
                  /* Espaciado base y colores de texto */
                  prose-slate
                  
                  /* === PÁRRAFOS === */
                  /* Párrafos con espaciado generoso y line-height optimizado */
                  prose-p:text-gray-700 
                  prose-p:text-[1.125rem] 
                  prose-p:leading-[2.1] 
                  prose-p:mb-16
                  prose-p:tracking-wide
                  
                  /* Drop cap - Primera letra grande en el primer párrafo */
                  [&>p:first-of-type]:first-letter:text-7xl
                  [&>p:first-of-type]:first-letter:font-light
                  [&>p:first-of-type]:first-letter:float-left
                  [&>p:first-of-type]:first-letter:mr-3
                  [&>p:first-of-type]:first-letter:mt-1
                  [&>p:first-of-type]:first-letter:leading-[0.85]
                  [&>p:first-of-type]:first-letter:text-gray-900
                  
                  /* Primer párrafo destacado */
                  [&>p:first-of-type]:text-xl
                  [&>p:first-of-type]:leading-[2.0]
                  [&>p:first-of-type]:text-gray-600
                  [&>p:first-of-type]:mb-20
                  
                  /* === HEADINGS === */
                  /* Configuración de scroll para navegación suave */
                  prose-headings:scroll-mt-28
                  prose-headings:font-light
                  prose-headings:text-gray-900
                  prose-headings:tracking-tight
                  
                  /* H2 - Títulos de sección principales */
                  prose-h2:text-4xl
                  prose-h2:mt-32
                  prose-h2:mb-10
                  prose-h2:leading-[1.2]
                  prose-h2:pb-4
                  prose-h2:border-b
                  prose-h2:border-gray-100
                  
                  /* H3 - Subtítulos */
                  prose-h3:text-3xl
                  prose-h3:mt-24
                  prose-h3:mb-8
                  prose-h3:leading-[1.3]
                  
                  /* H4 - Títulos menores */
                  prose-h4:text-2xl
                  prose-h4:mt-12
                  prose-h4:mb-6
                  prose-h4:leading-[1.4]
                  
                  /* === ENLACES === */
                  /* Enlaces con subrayado sutil y hover elegante */
                  prose-a:text-gray-900
                  prose-a:underline
                  prose-a:decoration-gray-300
                  prose-a:decoration-2
                  prose-a:underline-offset-4
                  hover:prose-a:decoration-gray-900
                  prose-a:transition-all
                  prose-a:duration-300
                  prose-a:font-normal
                  
                  /* === BLOCKQUOTES === */
                  /* Citas destacadas con diseño elegante */
                  prose-blockquote:border-l-4
                  prose-blockquote:border-gray-900
                  prose-blockquote:pl-10
                  prose-blockquote:pr-10
                  prose-blockquote:py-8
                  prose-blockquote:my-20
                  prose-blockquote:bg-gradient-to-r
                  prose-blockquote:from-gray-50
                  prose-blockquote:to-transparent
                  prose-blockquote:rounded-r-2xl
                  prose-blockquote:not-italic
                  prose-blockquote:text-gray-700
                  prose-blockquote:text-xl
                  prose-blockquote:leading-relaxed
                  prose-blockquote:shadow-sm
                  
                  /* Párrafos dentro de blockquotes */
                  [&_blockquote_p]:mb-4
                  [&_blockquote_p]:last:mb-0
                  
                  /* Citas (cite) dentro de blockquotes */
                  [&_blockquote_cite]:text-base
                  [&_blockquote_cite]:text-gray-500
                  [&_blockquote_cite]:font-normal
                  [&_blockquote_cite]:not-italic
                  [&_blockquote_cite]:block
                  [&_blockquote_cite]:mt-4
                  
                  /* === LISTAS === */
                  /* Listas con más separación y mejor legibilidad */
                  prose-ul:my-16
                  prose-ul:space-y-4
                  prose-ul:pl-2
                  
                  prose-ol:my-16
                  prose-ol:space-y-4
                  prose-ol:pl-2
                  
                  /* Items de lista */
                  prose-li:text-gray-700
                  prose-li:text-lg
                  prose-li:leading-[2.1]
                  prose-li:pl-3
                  prose-li:marker:text-gray-400
                  
                  /* Párrafos dentro de listas */
                  [&_li_p]:my-2
                  
                  /* === STRONG Y EM === */
                  /* Énfasis y negrita con colores adecuados */
                  prose-strong:text-gray-900
                  prose-strong:font-semibold
                  
                  prose-em:text-gray-700
                  prose-em:italic
                  
                  /* === IMÁGENES === */
                  /* Imágenes con bordes redondeados y sombra */
                  prose-img:rounded-2xl
                  prose-img:shadow-2xl
                  prose-img:my-16
                  prose-img:w-full
                  
                  /* Captions de imágenes */
                  prose-figcaption:text-center
                  prose-figcaption:text-sm
                  prose-figcaption:text-gray-500
                  prose-figcaption:mt-6
                  prose-figcaption:font-light
                  prose-figcaption:italic
                  
                  /* === SEPARADORES === */
                  /* Líneas horizontales con más espacio */
                  prose-hr:my-20
                  prose-hr:border-gray-100
                  prose-hr:border-t-2
                  
                  /* === CODE === */
                  /* Código inline */
                  prose-code:text-gray-900
                  prose-code:bg-gray-50
                  prose-code:px-2
                  prose-code:py-1
                  prose-code:rounded-md
                  prose-code:text-sm
                  prose-code:font-mono
                  prose-code:before:content-['']
                  prose-code:after:content-['']
                  
                  /* Bloques de código */
                  prose-pre:bg-gray-900
                  prose-pre:text-gray-100
                  prose-pre:rounded-2xl
                  prose-pre:my-12
                  prose-pre:p-8
                  prose-pre:overflow-x-auto
                  prose-pre:shadow-xl
                  
                  /* === TABLAS === */
                  /* Tablas con diseño limpio */
                  prose-table:my-12
                  prose-table:w-full
                  
                  prose-th:text-left
                  prose-th:py-4
                  prose-th:px-6
                  prose-th:bg-gray-50
                  prose-th:font-semibold
                  prose-th:text-gray-900
                  prose-th:border-b-2
                  prose-th:border-gray-200
                  
                  prose-td:py-4
                  prose-td:px-6
                  prose-td:border-b
                  prose-td:border-gray-100
                  prose-td:text-gray-700
                  
                  /* Filas de tabla con hover */
                  [&_tbody_tr]:transition-colors
                  [&_tbody_tr]:duration-200
                  hover:[&_tbody_tr]:bg-gray-50
                "
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </article>
          </Container>
        </section>

        {/* Sección de información del autor - Diseño mejorado */}
        <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-500">
                <div className="flex flex-col md:flex-row items-start gap-10">
                  {/* Avatar del autor */}
                  <div className="w-28 h-28 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 rounded-2xl flex-shrink-0 shadow-inner"></div>
                  
                  {/* Información del autor */}
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-4 uppercase tracking-[0.2em] font-light">
                      Sobre el autor
                    </p>
                    <h3 className="text-3xl text-gray-900 mb-5 font-light leading-tight">
                      {postData.author.name}
                    </h3>
                    <p className="text-gray-600 text-lg leading-[1.8] font-light">
                      {postData.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Sección de posts relacionados - Diseño mejorado */}
        {relatedPosts.length > 0 && (
          <section className="py-24 lg:py-32 bg-gray-50">
            <Container>
              <div className="max-w-6xl mx-auto">
                {/* Encabezado de la sección */}
                <div className="text-center mb-20">
                  <h2 className="text-5xl text-gray-900 mb-6 font-light">
                    Artículos relacionados
                  </h2>
                  <p className="text-gray-600 text-xl font-light">
                    Continúa explorando temas del mercado inmobiliario
                  </p>
                </div>
                
                {/* Grid de artículos relacionados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.id} className="group">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                          {/* Imagen del artículo */}
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          {/* Contenido de la card */}
                          <div className="p-8">
                            {/* Meta información */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-5 font-light">
                              <time>{formatDate(relatedPost.date)}</time>
                              <span className="text-gray-300">•</span>
                              <span>{relatedPost.readTime}</span>
                            </div>
                            {/* Título del artículo */}
                            <h3 className="text-xl text-gray-900 leading-snug font-light group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
                              {relatedPost.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
                
                {/* Botón para ver todos los artículos */}
                <div className="text-center mt-20">
                  <Link href="/blog">
                    <Button className="bg-white text-gray-900 hover:bg-gray-900 hover:text-white border border-gray-200 rounded-full px-12 py-4 text-base font-light transition-all duration-300 shadow-sm hover:shadow-lg">
                      Ver todos los artículos
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* CTA Newsletter - Diseño mejorado */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl text-white mb-8 leading-tight font-light">
                ¿Te ha gustado este artículo?
              </h2>
              <p className="text-gray-300 text-xl mb-12 leading-relaxed font-light">
                Suscríbete y recibe contenido exclusivo sobre el mercado inmobiliario de Andorra directamente en tu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/blog">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-12 py-5 text-base font-light transition-all duration-300 shadow-lg hover:shadow-2xl">
                    Más artículos del blog
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-12 py-5 text-base font-light transition-all duration-300">
                    Contactar con un experto
                  </Button>
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
