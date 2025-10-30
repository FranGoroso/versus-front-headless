/**
 * Blog Post Detail Page - Versión Premium v5.0
 * 
 * Página de detalle de cada post del blog.
 * Diseño minimalista premium con tipografía optimizada para lectura.
 * Conectado a WordPress REST API.
 * 
 * Mejoras v5.0 (2025-10-30): ESTILOS DE CONTENIDO PREMIUM
 * - Párrafos más espaciados (mb-20) con line-height 2.2
 * - Drop cap editorial más grande (8xl) y elegante
 * - Headings con mayor jerarquía visual y espacio (mt-40 para h2)
 * - Listas más legibles con bullets negros y space-y-6
 * - Imágenes con más margen (my-24) y border sutil
 * - Blockquotes estilo revista con sombra y padding generoso
 * - Código con estilo GitHub/VSCode mejorado
 * - Tablas profesionales con header negro
 * - Enlaces con underline offset más pronunciado
 * - Separadores más visibles (border-2)
 * 
 * Mejoras v4.0:
 * - Barra de progreso de lectura
 * - Botón flotante "Volver arriba"
 * - Tags con colores y efectos mejorados
 * - Animaciones suaves en posts relacionados
 * - Botones de compartir más destacados
 * - Bio del autor con diseño premium
 * - Efectos hover mejorados
 * - Espaciado optimizado
 * 
 * @page /blog/[slug]
 * @version 5.0.0
 * @updated 2025-10-30 - Estilos de contenido premium optimizados
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSiteConfig, getPostBySlug, getPosts } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { BackToTop } from '@/components/blog/BackToTop';

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
 * Array de colores para tags (rotación automática)
 */
const tagColors = [
  'bg-blue-50 text-blue-700 hover:bg-blue-100',
  'bg-purple-50 text-purple-700 hover:bg-purple-100',
  'bg-green-50 text-green-700 hover:bg-green-100',
  'bg-amber-50 text-amber-700 hover:bg-amber-100',
  'bg-rose-50 text-rose-700 hover:bg-rose-100',
];

/**
 * Componente principal de la página de detalle del blog
 * Server Component que obtiene datos de WordPress
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
      {/* Barra de progreso de lectura */}
      <ReadingProgressBar />
      
      {/* Botón flotante volver arriba */}
      <BackToTop />

      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section con imagen destacada - Contraste mejorado */}
        <section className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden">
          {/* Imagen de fondo con overlay gradiente y vignette */}
          <div className="absolute inset-0">
            <Image
              src={postData.featured_image}
              alt={postData.title}
              fill
              className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
              priority
            />
            {/* 
              Overlay gradiente mejorado con mayor opacidad para mejor contraste.
              - from-black/95: Parte inferior casi completamente oscura (95% opacidad)
              - via-black/70: Zona media con 70% opacidad
              - to-black/40: Parte superior con 40% opacidad (duplicado del original)
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />
            
            {/* 
              Vignette effect: oscurece los bordes para mejorar contraste general
              Crea un efecto de viñeta radial que oscurece las esquinas
            */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
          </div>
          
          {/* Contenido del hero con text-shadow mejorado */}
          <Container className="relative z-10 pb-20">
            <div className="max-w-4xl">
              {/* 
                Meta información del artículo con backdrop más fuerte
                - backdrop-blur-md: desenfoque medio del fondo
                - bg-black/30: fondo negro con 30% opacidad para mejor contraste
                - shadow-2xl: sombra pronunciada para separar del fondo
              */}
              <div className="flex flex-wrap items-center gap-4 text-white text-sm mb-10 backdrop-blur-md bg-black/30 rounded-full px-6 py-3 w-fit shadow-2xl border border-white/20">
                <span className="font-light tracking-wide">{postData.category}</span>
                <span className="text-white/60">•</span>
                <time className="font-light tracking-wide">{formatDate(postData.date)}</time>
                <span className="text-white/60">•</span>
                <span className="font-light tracking-wide flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {postData.readTime} de lectura
                </span>
              </div>
              
              {/* 
                Título principal con text-shadow múltiple para máxima legibilidad
                - Tres capas de sombra (0 2px, 0 4px, 0 8px) para efecto de profundidad
                - drop-shadow-2xl de Tailwind como capa adicional
              */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-10 tracking-tight drop-shadow-2xl"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.4)'
                }}
              >
                {postData.title}
              </h1>
              
              {/* 
                Información del autor con backdrop más pronunciado
                - backdrop-blur-lg: desenfoque más fuerte
                - bg-black/40: fondo negro con 40% opacidad (incrementado desde 10%)
                - shadow-2xl: sombra fuerte para separación visual
              */}
              <div className="flex items-center gap-6 backdrop-blur-lg bg-black/40 rounded-2xl p-6 w-fit border border-white/20 shadow-2xl">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full ring-2 ring-white/40 shadow-lg"></div>
                <div>
                  <p 
                    className="text-white font-light text-lg mb-2"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                  >
                    Por {postData.author.name}
                  </p>
                  <p 
                    className="text-white/90 text-sm font-light leading-relaxed max-w-lg"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
                  >
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
              {/* Barra de tags y compartir con diseño mejorado */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-24 pb-12 border-b-2 border-gray-100">
                {/* Tags del artículo con colores */}
                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3">
                    {postData.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`px-5 py-2.5 text-sm font-light rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-md ${tagColors[index % tagColors.length]}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Botones de compartir mejorados */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm text-gray-600 font-light">Compartir:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-3.5 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 text-gray-700 hover:scale-110 hover:shadow-lg group"
                      aria-label="Compartir en Facebook"
                    >
                      <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button 
                      className="p-3.5 bg-gray-50 hover:bg-sky-500 hover:text-white rounded-full transition-all duration-300 text-gray-700 hover:scale-110 hover:shadow-lg group"
                      aria-label="Compartir en Twitter"
                    >
                      <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                    <button 
                      className="p-3.5 bg-gray-50 hover:bg-blue-700 hover:text-white rounded-full transition-all duration-300 text-gray-700 hover:scale-110 hover:shadow-lg group"
                      aria-label="Compartir en LinkedIn"
                    >
                      <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido HTML del post con estilos profesionales optimizados */}
              <div 
                className="blog-content
                  prose prose-xl max-w-none
                  
                  /* === CONFIGURACIÓN GENERAL === */
                  prose-slate
                  
                  /* === PÁRRAFOS - Más espaciados y legibles === */
                  prose-p:text-gray-700 
                  prose-p:text-[1.15rem] 
                  prose-p:leading-[2.2] 
                  prose-p:mb-20
                  prose-p:tracking-wide
                  prose-p:font-light
                  
                  /* Drop cap - Primera letra grande tipo editorial */
                  [&>p:first-of-type]:first-letter:text-8xl
                  [&>p:first-of-type]:first-letter:font-light
                  [&>p:first-of-type]:first-letter:float-left
                  [&>p:first-of-type]:first-letter:mr-4
                  [&>p:first-of-type]:first-letter:mt-1
                  [&>p:first-of-type]:first-letter:leading-[0.8]
                  [&>p:first-of-type]:first-letter:text-gray-900
                  
                  /* Primer párrafo destacado tipo intro */
                  [&>p:first-of-type]:text-[1.25rem]
                  [&>p:first-of-type]:leading-[2.0]
                  [&>p:first-of-type]:text-gray-600
                  [&>p:first-of-type]:mb-24
                  
                  /* === HEADINGS - Mayor jerarquía y espacio === */
                  prose-headings:scroll-mt-28
                  prose-headings:font-light
                  prose-headings:text-gray-900
                  prose-headings:tracking-tight
                  
                  /* H2 - Títulos principales */
                  prose-h2:text-[2.5rem]
                  prose-h2:mt-40
                  prose-h2:mb-12
                  prose-h2:leading-[1.2]
                  prose-h2:pb-6
                  prose-h2:border-b-2
                  prose-h2:border-gray-200
                  
                  /* H3 - Subtítulos */
                  prose-h3:text-[2rem]
                  prose-h3:mt-32
                  prose-h3:mb-10
                  prose-h3:leading-[1.3]
                  
                  /* H4 - Subtítulos menores */
                  prose-h4:text-[1.5rem]
                  prose-h4:mt-24
                  prose-h4:mb-8
                  prose-h4:leading-[1.4]
                  
                  /* === ENLACES - Elegantes y sutiles === */
                  prose-a:text-gray-900
                  prose-a:underline
                  prose-a:decoration-gray-300
                  prose-a:decoration-2
                  prose-a:underline-offset-[6px]
                  hover:prose-a:decoration-gray-900
                  hover:prose-a:decoration-[3px]
                  prose-a:transition-all
                  prose-a:duration-300
                  prose-a:font-normal
                  
                  /* === BLOCKQUOTES - Estilo revista premium === */
                  prose-blockquote:border-l-[6px]
                  prose-blockquote:border-gray-900
                  prose-blockquote:pl-12
                  prose-blockquote:pr-12
                  prose-blockquote:py-10
                  prose-blockquote:my-28
                  prose-blockquote:bg-gradient-to-r
                  prose-blockquote:from-gray-50
                  prose-blockquote:via-gray-50/50
                  prose-blockquote:to-transparent
                  prose-blockquote:rounded-r-3xl
                  prose-blockquote:not-italic
                  prose-blockquote:text-gray-800
                  prose-blockquote:text-[1.35rem]
                  prose-blockquote:leading-[1.9]
                  prose-blockquote:font-light
                  prose-blockquote:shadow-lg
                  
                  [&_blockquote_p]:mb-6
                  [&_blockquote_p]:last:mb-0
                  
                  [&_blockquote_cite]:text-base
                  [&_blockquote_cite]:text-gray-500
                  [&_blockquote_cite]:font-normal
                  [&_blockquote_cite]:not-italic
                  [&_blockquote_cite]:block
                  [&_blockquote_cite]:mt-6
                  
                  /* === LISTAS - Más espaciadas y legibles === */
                  prose-ul:my-24
                  prose-ul:space-y-6
                  prose-ul:pl-2
                  
                  prose-ol:my-24
                  prose-ol:space-y-6
                  prose-ol:pl-2
                  
                  /* Items de lista más legibles */
                  prose-li:text-gray-700
                  prose-li:text-[1.1rem]
                  prose-li:leading-[2.0]
                  prose-li:pl-4
                  prose-li:marker:text-gray-900
                  prose-li:marker:font-bold
                  
                  [&_li_p]:my-3
                  [&_li_p]:leading-[2.0]
                  
                  /* Sublistas anidadas */
                  [&_li_ul]:mt-4
                  [&_li_ul]:mb-2
                  [&_li_ol]:mt-4
                  [&_li_ol]:mb-2
                  
                  /* === STRONG Y EM - Más contraste === */
                  prose-strong:text-gray-900
                  prose-strong:font-semibold
                  
                  prose-em:text-gray-700
                  prose-em:italic
                  
                  /* === IMÁGENES - Profesionales con sombra === */
                  prose-img:rounded-3xl
                  prose-img:shadow-2xl
                  prose-img:my-24
                  prose-img:w-full
                  prose-img:border
                  prose-img:border-gray-100
                  
                  prose-figcaption:text-center
                  prose-figcaption:text-sm
                  prose-figcaption:text-gray-500
                  prose-figcaption:mt-8
                  prose-figcaption:font-light
                  prose-figcaption:italic
                  prose-figcaption:tracking-wide
                  
                  /* === SEPARADORES - Más visibles === */
                  prose-hr:my-28
                  prose-hr:border-gray-200
                  prose-hr:border-t-2
                  
                  /* === CODE - Estilo GitHub/VSCode === */
                  prose-code:text-gray-900
                  prose-code:bg-gray-100
                  prose-code:px-2.5
                  prose-code:py-1.5
                  prose-code:rounded-lg
                  prose-code:text-[0.9rem]
                  prose-code:font-mono
                  prose-code:font-normal
                  prose-code:before:content-['']
                  prose-code:after:content-['']
                  prose-code:border
                  prose-code:border-gray-200
                  
                  /* Bloques de código */
                  prose-pre:bg-gray-900
                  prose-pre:text-gray-100
                  prose-pre:rounded-3xl
                  prose-pre:my-24
                  prose-pre:p-10
                  prose-pre:overflow-x-auto
                  prose-pre:shadow-2xl
                  prose-pre:border
                  prose-pre:border-gray-800
                  
                  [&_pre_code]:bg-transparent
                  [&_pre_code]:text-gray-100
                  [&_pre_code]:p-0
                  [&_pre_code]:border-none
                  
                  /* === TABLAS - Estilo profesional === */
                  prose-table:my-24
                  prose-table:w-full
                  prose-table:border-collapse
                  prose-table:shadow-lg
                  prose-table:rounded-2xl
                  prose-table:overflow-hidden
                  
                  prose-th:text-left
                  prose-th:py-5
                  prose-th:px-6
                  prose-th:bg-gray-900
                  prose-th:font-semibold
                  prose-th:text-white
                  prose-th:text-base
                  prose-th:tracking-wide
                  
                  prose-td:py-5
                  prose-td:px-6
                  prose-td:border-b
                  prose-td:border-gray-100
                  prose-td:text-gray-700
                  prose-td:text-base
                  
                  [&_tbody_tr]:transition-colors
                  [&_tbody_tr]:duration-200
                  hover:[&_tbody_tr]:bg-gray-50
                  
                  [&_tbody_tr:last-child_td]:border-b-0
                "
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </article>
          </Container>
        </section>

        {/* Sección de información del autor - Diseño premium mejorado */}
        <section className="py-28 bg-gradient-to-b from-white via-gray-50 to-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-14 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-500 transform hover:-translate-y-1">
                <div className="flex flex-col md:flex-row items-start gap-12">
                  {/* Avatar del autor mejorado */}
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-2xl flex-shrink-0 shadow-lg ring-4 ring-white"></div>
                  
                  {/* Información del autor */}
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-5 uppercase tracking-[0.25em] font-light">
                      Sobre el autor
                    </p>
                    <h3 className="text-4xl text-gray-900 mb-6 font-light leading-tight">
                      {postData.author.name}
                    </h3>
                    <p className="text-gray-600 text-lg leading-[1.9] font-light mb-8">
                      {postData.author.bio}
                    </p>
                    
                    {/* Botón CTA opcional */}
                    <Link href="/nuestro-equipo">
                      <Button className="bg-gray-900 text-white hover:bg-black rounded-full px-8 py-3 text-sm font-light transition-all duration-300 shadow-md hover:shadow-xl">
                        Ver perfil completo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Sección de posts relacionados con animaciones mejoradas */}
        {relatedPosts.length > 0 && (
          <section className="py-28 lg:py-36 bg-gradient-to-b from-gray-50 to-white">
            <Container>
              <div className="max-w-7xl mx-auto">
                {/* Encabezado de la sección */}
                <div className="text-center mb-24">
                  <h2 className="text-5xl md:text-6xl text-gray-900 mb-8 font-light">
                    Artículos relacionados
                  </h2>
                  <p className="text-gray-600 text-xl font-light max-w-2xl mx-auto">
                    Continúa explorando las últimas tendencias del mercado inmobiliario en Andorra
                  </p>
                </div>
                
                {/* Grid de artículos relacionados con animaciones */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {relatedPosts.map((relatedPost, index) => (
                    <article 
                      key={relatedPost.id} 
                      className="group"
                      style={{
                        animation: `slideInFromBottom ${0.3 + index * 0.15}s ease-out`
                      }}
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                          {/* Imagen del artículo con efecto zoom */}
                          <div className="relative h-72 overflow-hidden bg-gray-100">
                            <Image
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay sutil en hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          
                          {/* Contenido de la card */}
                          <div className="p-8">
                            {/* Meta información */}
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-6 font-light">
                              <time className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(relatedPost.date)}
                              </time>
                              <span className="text-gray-300">•</span>
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {relatedPost.readTime}
                              </span>
                            </div>
                            
                            {/* Título del artículo */}
                            <h3 className="text-2xl text-gray-900 leading-tight font-light group-hover:text-gray-700 transition-colors duration-300 line-clamp-3 mb-4">
                              {relatedPost.title}
                            </h3>
                            
                            {/* Indicador de lectura */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 font-light group-hover:text-gray-900 transition-colors duration-300">
                              <span>Leer artículo</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
                
                {/* Botón para ver todos los artículos mejorado */}
                <div className="text-center mt-24">
                  <Link href="/blog">
                    <Button className="bg-gray-900 text-white hover:bg-black border-2 border-gray-900 hover:border-black rounded-full px-16 py-5 text-base font-light transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                      Ver todos los artículos del blog
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* CTA Newsletter con diseño mejorado */}
        <section className="py-28 lg:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          {/* Patrón decorativo de fondo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }} />
          </div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-10 leading-tight font-light">
                ¿Te ha gustado este artículo?
              </h2>
              <p className="text-gray-300 text-xl md:text-2xl mb-14 leading-relaxed font-light max-w-3xl mx-auto">
                Suscríbete a nuestro newsletter y recibe contenido exclusivo sobre el mercado inmobiliario de Andorra directamente en tu email.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/blog">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-14 py-6 text-lg font-light transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-105">
                    Más artículos del blog
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-14 py-6 text-lg font-light transition-all duration-300 transform hover:scale-105">
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
