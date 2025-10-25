/**
 * Property Categories Section Component
 * 
 * Sección que muestra las 10 categorías principales de propiedades disponibles
 * en Andorra con imágenes representativas y descripciones.
 * 
 * @component
 * @example
 * ```tsx
 * <PropertyCategoriesSection />
 * ```
 */

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

/**
 * Interface para definir la estructura de cada categoría de propiedad
 * 
 * @interface PropertyCategory
 * @property {string} id - Identificador único de la categoría
 * @property {string} title - Título de la categoría
 * @property {string} description - Descripción breve de la categoría
 * @property {string} image - URL de la imagen representativa
 * @property {string} href - Ruta de navegación para la categoría
 */
interface PropertyCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

/**
 * Datos de las 10 categorías de propiedades
 * Cada categoría incluye título, descripción e imagen representativa
 */
const propertyCategories: PropertyCategory[] = [
  {
    id: 'aticos-duplex',
    title: 'Áticos / Dúplex / Triples',
    description: 'Áticos dúplex de estilo rústico, áticos de lujo, Dúplex a estrenar en todas las parroquias de Andorra',
    image: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=aticos-duplex',
  },
  {
    id: 'apartamentos-pisos',
    title: 'Apartamentos / Pisos',
    description: 'Piso o apartamentos, tanto para inversión a pie de pistas, en el centro de las parroquias y cerca de todos los servicios.',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=apartamentos',
  },
  {
    id: 'casas-adosadas',
    title: 'Casas Adosadas',
    description: 'Unifamiliares a partir de 3 habitaciones, en varias zonas residenciales y con vistas espectaculares',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=casas-adosadas',
  },
  {
    id: 'chalets',
    title: 'Chalets',
    description: 'Descubre nuestra selección de chalés de lujo en Andorra, con atención personalizada',
    image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=chalets',
  },
  {
    id: 'terrenos',
    title: 'Terrenos',
    description: 'Parcelas y terrenos de compra, venta y alquiler en todas las parroquias de Andorra.',
    image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=terrenos',
  },
  {
    id: 'edificios-apartamentos',
    title: 'Edificios de Apartamentos',
    description: 'Gestionamos la compra de su edificio para su inversión con total garantía.',
    image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=edificios',
  },
  {
    id: 'oficinas-despachos',
    title: 'Oficinas / Despachos',
    description: 'Asesoramiento personalizado en la compra o alquiler de despachos y oficinas.',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=oficinas',
  },
  {
    id: 'hoteles',
    title: 'Hoteles',
    description: 'Hoteles con licencia de obras en los principales ejes comerciales de Andorra y España',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=hoteles',
  },
  {
    id: 'locales-comerciales',
    title: 'Locales Comerciales',
    description: 'Le asesoramos en todo el proceso o gestión de la compra de su local comercial con total garantía.',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=locales',
  },
  {
    id: 'naves-industriales',
    title: 'Naves Industriales',
    description: 'Le asesoramos en todo el proceso o gestión en la compra de su nave industrial con total garantía.',
    image: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800',
    href: '/propiedades?type=naves',
  },
];

/**
 * Property Categories Section Component
 * 
 * Renderiza una sección con grid responsive de categorías de propiedades.
 * Cada categoría muestra una imagen con overlay, título y descripción.
 * 
 * Features:
 * - Grid responsive: 2 columnas (móvil), 3 (tablet), 5 (desktop)
 * - Hover effects: scale y brightness
 * - Imágenes optimizadas con Next.js Image
 * - Navegación a páginas filtradas por tipo
 * 
 * @returns {JSX.Element} Sección de categorías de propiedades
 */
export function PropertyCategoriesSection(): JSX.Element {
  return (
    <section className="py-32 bg-white">
      <Container>
        {/* Header de la sección */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Propiedades en venta
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto font-light">
            Propiedades de venta en Andorra con la mejor rentabilidad como inversión en uno de los marcos tributarios más competitivos de Europa.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {propertyCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              </div>

              {/* Contenido */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* Título */}
                <h3 className="text-white text-lg md:text-xl font-light tracking-tight mb-2 leading-tight">
                  {category.title}
                </h3>
                
                {/* Descripción */}
                <p className="text-white/80 text-sm font-light leading-relaxed line-clamp-3">
                  {category.description}
                </p>

                {/* Indicador de hover */}
                <div className="mt-4 flex items-center gap-2 text-white/90 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Ver propiedades</span>
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
