/**
 * Property Categories Section Component
 * 
 * Sección que muestra las categorías principales de propiedades disponibles
 * en Andorra con imágenes representativas y descripciones.
 * 
 * VERSIÓN 2.2:
 * - Grid de 4 columnas en lugar de 5 para mejor visualización
 * - Todas las cards con tamaño uniforme (sin card destacada)
 * - Filtrado de categorías: excluye Ático dúplex, Borda y Nave industrial
 * - Límite de 8 cards máximo para diseño 4x2 consistente
 * - Overlay más suave (60% a 30%) para mostrar colores de las imágenes
 * - Animaciones elegantes: fade-in, slide-up, y efectos de hover suaves
 * - Texto CTA optimizado: "Explorar" en lugar de "Ver propiedades"
 * - Sombras dinámicas que crecen con el hover para mayor profundidad
 * - Descripciones truncadas a 80 caracteres para mantener elegancia
 * - Animaciones fadeIn en tooltips con delay escalonado
 * 
 * VERSIÓN 2.1:
 * - Mejor contraste: Overlay oscuro 70% + text-shadow
 * - Tooltip interactivo con descripción
 * - Soporte móvil: tap para mostrar tooltip, segundo tap para navegar
 * 
 * @component
 * @version 2.2.0
 * @updated 2025-10-30 - Optimización de grid y filtrado de categorías
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { WPTaxonomy } from '@/types';

/**
 * Interface para definir la estructura de cada categoría de propiedad
 */
interface PropertyCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  count?: number;
}

/**
 * Props del componente
 */
interface PropertyCategoriesSectionProps {
  propertyTypes?: WPTaxonomy[];
}

/**
 * Mapeo de imágenes por tipo de propiedad (slug)
 * Fuente: Unsplash - Colección curada profesional
 * Optimización: formato crop, calidad 80, ancho 687px
 * Cada imagen es única y representativa del tipo de propiedad
 */
const PROPERTY_TYPE_IMAGES: Record<string, string> = {
  // Chalets - Chalet alpino con arquitectura de madera
  'chalet': 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'chalé': 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Apartamentos/Pisos - Interior luminoso de apartamento moderno
  'apartamento': 'https://images.unsplash.com/photo-1565953522043-baea26b83b7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'piso': 'https://images.unsplash.com/photo-1565953522043-baea26b83b7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Casas - Casa unifamiliar moderna con jardín
  'casa': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Casas Adosadas - Townhouse/row house urbana
  'casa-adosada': 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'adosado': 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Villas - Villa de lujo con piscina y jardines
  'villa': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Áticos - Ático con terraza amplia y vistas
  'atico': 'https://images.unsplash.com/photo-1604336667030-ede2c0ace6a5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'ático': 'https://images.unsplash.com/photo-1604336667030-ede2c0ace6a5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Dúplex - Propiedad de dos niveles con escaleras internas
  'duplex': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'dúplex': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Estudios - Estudio tipo loft compacto y moderno
  'estudio': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Bordas - Construcción tradicional de piedra de montaña
  'borda': 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Terrenos - Parcela con vistas a montaña y naturaleza
  'terreno': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Locales Comerciales - Local/tienda moderna en calle comercial
  'local-comercial': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'local': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'comercial': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Oficinas - Espacio de oficina corporativa moderna
  'oficina': 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Naves Industriales - Warehouse/nave logística moderna
  'nave-industrial': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  'nave': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Edificios - Edificio residencial moderno de varias plantas
  'edificio': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Hoteles - Hotel boutique de lujo
  'hotel': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Oportunidades - Propiedad de inversión con potencial
  'oportunidad': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
  
  // Default - Propiedad moderna genérica
  'default': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
};

function getImageForPropertyType(slug: string): string {
  const normalizedSlug = slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return PROPERTY_TYPE_IMAGES[slug.toLowerCase()] 
    || PROPERTY_TYPE_IMAGES[normalizedSlug] 
    || PROPERTY_TYPE_IMAGES['default'];
}

function stripHTML(html: string): string {
  if (!html) return '';
  let text = html.replace(/<[^>]*>/g, '');
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

/**
 * Truncar texto y limitar longitud para mantener descripciones cortas y elegantes
 * Por defecto limita a 80 caracteres para cards
 */
function truncateText(text: string, maxLength: number = 80): string {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

/**
 * Componente individual de categoría con animaciones elegantes
 * Incluye efectos de hover, transiciones suaves y mejor contraste de color
 */
function CategoryCard({ category, isHero = false }: { category: PropertyCategory; isHero?: boolean }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice && !showTooltip) {
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    }
  };

  return (
    <Link
      href={category.href}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`group relative overflow-hidden rounded-2xl block shadow-lg hover:shadow-2xl transition-shadow duration-500 ${
        isHero ? 'aspect-[4/5] h-full' : 'aspect-[4/5]'
      }`}
    >
      {/* Contenedor de imagen con efectos */}
      <div className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Overlay más suave para mostrar colores de las imágenes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500" />
      </div>

      {/* Contenedor de texto con animaciones escalonadas */}
      <div className="relative h-full flex flex-col justify-end p-6">
        {/* Título con animación fade-in desde abajo */}
        <h3 
          className={`text-white font-light tracking-tight mb-3 leading-tight transform transition-all duration-500 group-hover:translate-y-[-4px] ${
            isHero ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-lg md:text-xl'
          }`} 
          style={{ 
            textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            animation: 'fadeInUp 0.6s ease-out'
          }}
        >
          {category.title}
          {category.count !== undefined && category.count > 0 && (
            <span className="ml-2 text-sm text-white/90">({category.count})</span>
          )}
        </h3>

        {/* CTA con animación elegante y texto corto */}
        <div 
          className="flex items-center gap-2 text-white text-sm font-light opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out"
          style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            transitionDelay: '0.1s'
          }}
        >
          <span>Explorar</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Tooltip con descripción corta y animaciones elegantes */}
      {showTooltip && category.description && (
        <div className="absolute inset-x-0 bottom-0 bg-black/95 backdrop-blur-sm p-4 transform transition-all duration-400 ease-out">
          {/* Descripción con fade-in suave */}
          <p 
            className="text-white text-sm font-light leading-relaxed"
            style={{ 
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              animation: 'fadeIn 0.4s ease-out'
            }}
          >
            {category.description}
          </p>
          {/* Texto de instrucción para móvil con animación */}
          <p 
            className="text-white/70 text-xs mt-2 md:hidden"
            style={{ 
              textShadow: '0 1px 2px rgba(0,0,0,0.6)',
              animation: 'fadeIn 0.5s ease-out 0.1s both'
            }}
          >
            Toca de nuevo para explorar
          </p>
        </div>
      )}
    </Link>
  );
}

/**
 * Categorías de propiedades predeterminadas (fallback)
 * Se usa solo cuando no hay datos de WordPress disponibles
 */
const propertyCategories: PropertyCategory[] = [
  {
    id: 'chalets',
    title: 'Chalets',
    description: 'Descubre nuestra selección de chalés de lujo en Andorra',
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
    href: '/propiedades?tipo=chalet',
  },
  {
    id: 'apartamentos-pisos',
    title: 'Apartamentos / Pisos',
    description: 'Pisos y apartamentos en el centro de las parroquias',
    image: 'https://images.unsplash.com/photo-1565953522043-baea26b83b7e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
    href: '/propiedades?tipo=apartamento',
  },
  {
    id: 'casas-adosadas',
    title: 'Casas Adosadas',
    description: 'Unifamiliares con vistas espectaculares',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=687',
    href: '/propiedades?tipo=casa',
  },
];

export function PropertyCategoriesSection({ propertyTypes = [] }: PropertyCategoriesSectionProps) {
  // Lista de slugs de categorías a excluir del grid
  // Ático dúplex se incluye dentro de Ático, Borda y Nave industrial se eliminan por diseño
  const excludedSlugs = ['atico-duplex', 'duplex', 'borda', 'nave-industrial', 'nave'];
  
  const categories: PropertyCategory[] = propertyTypes.length > 0
    ? propertyTypes
        // Filtrar categorías con propiedades y excluir las no deseadas
        .filter(type => {
          return type.count && type.count > 0 && !excludedSlugs.includes(type.slug);
        })
        // Limitar a 8 cards máximo para mantener el diseño 4x2
        .slice(0, 8)
        .map(type => {
          const cleanDescription = type.description 
            ? truncateText(stripHTML(type.description))
            : `Propiedades de tipo ${type.name} en Andorra`;
          
          return {
            id: type.slug,
            title: type.name,
            description: cleanDescription,
            image: getImageForPropertyType(type.slug),
            href: `/propiedades?tipo=${type.slug}`,
            count: type.count,
          };
        })
    : propertyCategories.slice(0, 3);
  
  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Propiedades en venta
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light">
            Propiedades de venta en Andorra con la mejor rentabilidad como inversión en uno de los marcos tributarios más competitivos de Europa.
          </p>
        </div>

        {/* Grid responsivo de 4 columnas - todas las cards del mismo tamaño */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-fr">
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
