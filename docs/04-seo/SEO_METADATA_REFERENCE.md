# Referencia Completa de Metadata SEO - Versus Andorra

**Versión:** 1.0  
**Última actualización:** 2025-10-31  
**Audiencia:** Desarrolladores

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Open Graph & Twitter Cards](#open-graph--twitter-cards)
3. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
4. [Ejemplos de Implementación](#ejemplos-de-implementación)
5. [Referencia de Funciones SEO Utils](#referencia-de-funciones-seo-utils)
6. [Testing y Validación](#testing-y-validación)

---

## 📖 INTRODUCCIÓN

Este documento es la referencia técnica completa para la implementación de metadata SEO en Versus Andorra. Incluye especificaciones, ejemplos de código y mejores prácticas.

### Herramientas Disponibles

**Utilidades creadas:**
- `/lib/seo-utils.ts` - Funciones helper para generar metadata
- `/components/seo/` - Componentes de Schema markup

**Archivos de configuración:**
- `/app/layout.tsx` - Metadata base y template
- `/public/robots.txt` - Configuración de robots
- `/app/sitemap.ts` - Sitemap dinámico

---

## 🌐 OPEN GRAPH & TWITTER CARDS

### Conceptos Básicos

Open Graph y Twitter Cards controlan cómo se ve el contenido al compartirse en redes sociales.

**Beneficios:**
- Previews atractivos con imagen y descripción
- Mayor CTR desde redes sociales
- Control sobre cómo se presenta el contenido
- Compatibilidad con Facebook, WhatsApp, LinkedIn, Twitter

### Vista Comparativa

**SIN Open Graph:**
```
┌─────────────────────┐
│ versusandorra.com   │
│ (sin imagen)        │
│ (sin descripción)   │
└─────────────────────┘
```

**CON Open Graph:**
```
┌───────────────────────────────┐
│  [Imagen 1200x630px]          │
├───────────────────────────────┤
│ Apartamento de lujo           │
│ €450,000 · 3 hab · 2 baños    │
│ 120 m² · Andorra la Vella     │
│ versusandorra.com             │
└───────────────────────────────┘
```

---

### Implementación en Layout Principal

**Archivo:** `/app/layout.tsx`

```tsx
import type { Metadata } from 'next';

/**
 * Metadata base para todas las páginas del sitio.
 * Se extiende con metadata específica en cada página.
 */
export const metadata: Metadata = {
  // Base URL para resolver URLs relativas
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://versusandorra.com'),
  
  // Configuración de título con template
  title: {
    default: 'Versus Andorra | Inmobiliaria en Andorra',
    template: '%s | Versus Andorra', // Las páginas usan solo el título, el template agrega " | Versus Andorra"
  },
  
  // Descripción por defecto
  description: 'Agencia inmobiliaria líder en Andorra. Especialistas en compra, venta y alquiler de propiedades de lujo.',
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Versus Andorra',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Versus Andorra - Inmobiliaria de Lujo',
      },
    ],
  },
  
  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    site: '@versusandorra',
    creator: '@versusandorra',
  },
  
  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

---

### Implementación en Páginas Estáticas

**Ejemplo: Página de Contacto**

**Archivo:** `/app/contacto/page.tsx`

```tsx
import { Metadata } from 'next';
import { generateMetadata as generateSeoMetadata, generateUrl } from '@/lib/seo-utils';

/**
 * Metadata estática para la página de contacto.
 * Usa la función generateMetadata() para crear metadata completa automáticamente.
 */
export const metadata: Metadata = generateSeoMetadata({
  title: 'Contacto',
  description: 'Contacta con Versus Andorra. Estamos aquí para ayudarte a encontrar tu propiedad ideal en Andorra. Teléfono, email y formulario de contacto disponibles.',
  url: generateUrl('/contacto'),
  keywords: [
    'contacto versus andorra',
    'inmobiliaria andorra contacto',
    'teléfono inmobiliaria andorra',
    'email versus andorra',
    'oficina andorra',
  ],
});

/**
 * Componente de la página de contacto.
 */
export default function ContactPage() {
  return (
    <main>
      <h1>Contacto</h1>
      {/* Contenido de la página */}
    </main>
  );
}
```

---

### Implementación en Páginas Dinámicas

**Ejemplo: Post Individual del Blog**

**Archivo:** `/app/blog/[slug]/page.tsx`

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateBlogPostMetadata, generateUrl, extractDescription } from '@/lib/seo-utils';
import { SchemaBreadcrumb } from '@/components/seo';

/**
 * Props de la página
 */
interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Generar metadata dinámica para cada post del blog.
 * Esta función se ejecuta en el servidor para cada slug.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    // Obtener datos del post desde WordPress
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return {
        title: 'Post no encontrado',
      };
    }
    
    // Extraer imagen destacada
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    
    // Extraer descripción limpia del excerpt o content
    const description = extractDescription(
      post.excerpt?.rendered || post.content?.rendered || '',
      160
    );
    
    // Obtener tags del post como keywords
    const tags = post._embedded?.['wp:term']?.[1]?.map((tag: any) => tag.name) || [];
    const keywords = [
      'blog inmobiliario andorra',
      'noticias inmobiliarias',
      ...tags.map((tag: string) => tag.toLowerCase())
    ];
    
    // Generar metadata completa usando la función especializada
    return generateBlogPostMetadata({
      title: post.title?.rendered || 'Artículo del blog',
      description,
      url: generateUrl(`/blog/${params.slug}`),
      image: featuredImage,
      author: post._embedded?.author?.[0]?.name || 'Versus Andorra',
      publishedTime: post.date,
      modifiedTime: post.modified,
      keywords,
    });
    
  } catch (error) {
    console.error('Error generando metadata del post:', error);
    return {
      title: 'Error al cargar post',
    };
  }
}

/**
 * Componente de la página del post
 */
export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Construir breadcrumb para navegación
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://versusandorra.com' },
    { name: 'Blog', url: 'https://versusandorra.com/blog' },
    { name: post.title?.rendered || 'Post', url: `https://versusandorra.com/blog/${params.slug}` },
  ];
  
  return (
    <>
      {/* Schema Breadcrumb para SEO */}
      <SchemaBreadcrumb items={breadcrumbItems} />
      
      <article>
        <h1>{post.title?.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />
      </article>
    </>
  );
}
```

**Ejemplo: Propiedad Individual**

**Archivo:** `/app/propiedades/[slug]/page.tsx`

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePropertyMetadata, generateUrl, extractDescription } from '@/lib/seo-utils';
import { SchemaProperty, SchemaBreadcrumb } from '@/components/seo';

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Generar metadata dinámica para cada propiedad.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const property = await getProperty(params.slug);
    
    if (!property) {
      return {
        title: 'Propiedad no encontrada',
      };
    }
    
    const title = property.title?.rendered || 'Propiedad en Andorra';
    const featuredImage = property.featured_image || '';
    
    // Extraer descripción
    const description = extractDescription(
      property.excerpt?.rendered || property.content?.rendered || '',
      160
    );
    
    // Extraer datos de la propiedad
    const price = property.property_meta?.price ? parseFloat(property.property_meta.price) : undefined;
    const bedrooms = property.property_meta?.bedrooms ? parseInt(property.property_meta.bedrooms) : undefined;
    const bathrooms = property.property_meta?.bathrooms ? parseInt(property.property_meta.bathrooms) : undefined;
    const area = property.property_meta?.area ? parseFloat(property.property_meta.area) : undefined;
    const city = property.taxonomies?.property_city?.[0] || '';
    
    // Generar metadata con información de la propiedad
    return generatePropertyMetadata({
      title,
      description,
      url: generateUrl(`/propiedades/${params.slug}`),
      image: featuredImage,
      price,
      priceCurrency: 'EUR',
      bedrooms,
      bathrooms,
      area,
      city,
      keywords: [
        'propiedad andorra',
        'comprar andorra',
        city ? `propiedad ${city.toLowerCase()}` : '',
        bedrooms ? `${bedrooms} habitaciones` : '',
      ].filter(Boolean), // Filtrar keywords vacíos
    });
    
  } catch (error) {
    console.error('Error generando metadata de propiedad:', error);
    return {
      title: 'Error al cargar propiedad',
    };
  }
}

/**
 * Componente de la página de propiedad
 */
export default async function PropertyPage({ params }: PageProps) {
  const property = await getProperty(params.slug);
  
  if (!property) {
    notFound();
  }
  
  // Breadcrumb
  const breadcrumbItems = [
    { name: 'Inicio', url: 'https://versusandorra.com' },
    { name: 'Propiedades', url: 'https://versusandorra.com/propiedades' },
    { name: property.title?.rendered || 'Propiedad', url: `https://versusandorra.com/propiedades/${params.slug}` },
  ];
  
  return (
    <>
      {/* Schema Property para rich snippets */}
      <SchemaProperty
        name={property.title?.rendered || ''}
        description={property.content?.rendered || ''}
        url={generateUrl(`/propiedades/${params.slug}`)}
        image={property.featured_image}
        images={property.gallery?.map((img: any) => img.url) || []}
        price={property.property_meta?.price ? parseFloat(property.property_meta.price) : undefined}
        priceCurrency="EUR"
        numberOfRooms={property.property_meta?.bedrooms ? parseInt(property.property_meta.bedrooms) : undefined}
        numberOfBathroomsTotal={property.property_meta?.bathrooms ? parseInt(property.property_meta.bathrooms) : undefined}
        floorSize={property.property_meta?.area ? parseFloat(property.property_meta.area) : undefined}
        addressLocality={property.taxonomies?.property_city?.[0] || ''}
        addressCountry="AD"
        datePosted={property.date}
      />
      
      {/* Schema Breadcrumb */}
      <SchemaBreadcrumb items={breadcrumbItems} />
      
      <main>
        <h1>{property.title?.rendered}</h1>
        {/* Contenido de la propiedad */}
      </main>
    </>
  );
}
```

---

### Metadata Generados - HTML Output

Con las utilidades implementadas, cada página genera automáticamente:

```html
<!-- Open Graph Tags -->
<meta property="og:title" content="Apartamento de lujo | Versus Andorra" />
<meta property="og:description" content="€450,000 · 3 hab · 2 baños · 120 m²..." />
<meta property="og:image" content="https://versusandorra.com/property-image.jpg" />
<meta property="og:url" content="https://versusandorra.com/propiedades/apartamento" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="Versus Andorra" />
<meta property="og:locale" content="es_ES" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Apartamento de lujo | Versus Andorra" />
<meta name="twitter:description" content="€450,000 · 3 hab · 2 baños..." />
<meta name="twitter:image" content="https://versusandorra.com/property-image.jpg" />
<meta name="twitter:site" content="@versusandorra" />

<!-- SEO Básico -->
<meta name="description" content="€450,000 · 3 hab · 2 baños · 120 m²..." />
<meta name="keywords" content="propiedad andorra, 3 habitaciones, andorra la vella..." />
<link rel="canonical" href="https://versusandorra.com/propiedades/apartamento" />

<!-- Robots -->
<meta name="robots" content="index, follow" />
```

---

### Requisitos de Imágenes Open Graph

**Dimensiones:**
- **Recomendado:** 1200x630px (ratio 1.91:1)
- **Mínimo:** 600x315px
- **Máximo:** 8MB

**Formatos:**
- PNG (recomendado para mejor calidad)
- JPG (menor tamaño)
- WebP (navegadores modernos)

**Ubicación:**
```
/public/
├── og-image.png              # Imagen por defecto
├── og-image-home.png         # Imagen específica para home
├── og-image-propiedades.png  # Imagen para listado de propiedades
└── og-image-blog.png         # Imagen para blog
```

**Optimización:**
- Usar [TinyPNG](https://tinypng.com) para comprimir
- Objetivo: < 300 KB
- Sin texto pequeño (difícil de leer en preview)
- Mantener área segura de 100px desde bordes

---

## 🏗️ SCHEMA MARKUP (JSON-LD)

### Conceptos Básicos

Schema markup es código estructurado que ayuda a los buscadores a entender el contenido de la página.

**Beneficios:**
- Rich snippets en resultados de Google
- Mejor CTR desde búsquedas
- Destacar información clave (precio, rating, etc.)
- Mejor indexación y comprensión del contenido

### Componentes Creados

Se han creado 4 componentes de Schema en `/components/seo/`:

1. **SchemaOrganization** - Información de la empresa
2. **SchemaWebsite** - Funcionalidad de búsqueda
3. **SchemaProperty** - Propiedades inmobiliarias
4. **SchemaBreadcrumb** - Navegación estructurada

---

### 1. SchemaOrganization

**Ubicación:** Layout principal (`/app/layout.tsx`)  
**Aparece en:** TODAS las páginas

**Implementación:**

```tsx
import { SchemaOrganization } from '@/components/seo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <SchemaOrganization
          name="Versus Andorra"
          url="https://versusandorra.com"
          logo="https://versusandorra.com/logo.png"
          email="info@versusandorra.com"
          telephone="+376812345"
          description="Agencia inmobiliaria líder en Andorra especializada en propiedades de lujo"
          address={{
            streetAddress: "Av. Meritxell 123",
            addressLocality: "Andorra la Vella",
            postalCode: "AD500",
            addressCountry: "AD"
          }}
          sameAs={[
            "https://facebook.com/versusandorra",
            "https://instagram.com/versusandorra",
            "https://linkedin.com/company/versusandorra"
          ]}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**JSON-LD generado:**

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Versus Andorra",
  "url": "https://versusandorra.com",
  "logo": "https://versusandorra.com/logo.png",
  "email": "info@versusandorra.com",
  "telephone": "+376812345",
  "description": "Agencia inmobiliaria líder en Andorra...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Meritxell 123",
    "addressLocality": "Andorra la Vella",
    "postalCode": "AD500",
    "addressCountry": "AD"
  },
  "sameAs": [
    "https://facebook.com/versusandorra",
    "https://instagram.com/versusandorra"
  ]
}
```

---

### 2. SchemaWebsite

**Ubicación:** Página principal (`/app/page.tsx`)  
**Aparece en:** Solo en home

**Implementación:**

```tsx
import { SchemaWebsite } from '@/components/seo';

export default function HomePage() {
  return (
    <>
      <SchemaWebsite
        name="Versus Andorra"
        url="https://versusandorra.com"
        searchUrl="https://versusandorra.com/propiedades?buscar={search_term_string}"
      />
      
      <main>
        {/* Contenido de la página */}
      </main>
    </>
  );
}
```

**Resultado:** Google mostrará un cuadro de búsqueda en los resultados

**JSON-LD generado:**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Versus Andorra",
  "url": "https://versusandorra.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://versusandorra.com/propiedades?buscar={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

### 3. SchemaProperty

**Ubicación:** Página individual de propiedad (`/app/propiedades/[slug]/page.tsx`)  
**Aparece en:** Cada página de propiedad

**Implementación:**

```tsx
import { SchemaProperty } from '@/components/seo';

export default function PropertyPage({ property }: { property: Property }) {
  return (
    <>
      <SchemaProperty
        name={property.title}
        description={property.content}
        url={`https://versusandorra.com/propiedades/${property.slug}`}
        image={property.featured_image}
        images={property.gallery}
        price={property.price}
        priceCurrency="EUR"
        numberOfRooms={property.bedrooms}
        numberOfBathroomsTotal={property.bathrooms}
        floorSize={property.area}
        address={property.address}
        addressLocality={property.city}
        addressCountry="AD"
        datePosted={property.date}
      />
      
      <main>
        {/* Contenido de la propiedad */}
      </main>
    </>
  );
}
```

**Resultado en Google:**

```
Apartamento de lujo en Andorra la Vella
versusandorra.com › propiedades › apartamento-lujo
★★★★★
€450,000 · 3 hab · 2 baños · 120 m²
Inicio > Propiedades > Apartamento de lujo
Precioso apartamento con vistas panorámicas...
```

**JSON-LD generado:**

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Apartamento de lujo",
  "description": "Precioso apartamento...",
  "url": "https://versusandorra.com/propiedades/apartamento-lujo",
  "image": "https://versusandorra.com/property-image.jpg",
  "datePosted": "2025-01-15",
  "offers": {
    "@type": "Offer",
    "price": "450000",
    "priceCurrency": "EUR"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Andorra la Vella",
    "addressCountry": "AD"
  },
  "numberOfRooms": 3,
  "numberOfBathroomsTotal": 2,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": 120,
    "unitCode": "MTK"
  }
}
```

---

### 4. SchemaBreadcrumb

**Ubicación:** Páginas con jerarquía de navegación  
**Aparece en:** Propiedades, blog posts, páginas internas

**Implementación:**

```tsx
import { SchemaBreadcrumb } from '@/components/seo';

export default function PropertyPage() {
  return (
    <>
      <SchemaBreadcrumb
        items={[
          { name: 'Inicio', url: 'https://versusandorra.com' },
          { name: 'Propiedades', url: 'https://versusandorra.com/propiedades' },
          { name: 'Apartamento lujo', url: 'https://versusandorra.com/propiedades/apartamento-lujo' }
        ]}
      />
      
      <main>
        {/* Contenido */}
      </main>
    </>
  );
}
```

**Resultado en Google:**

```
Inicio > Propiedades > Apartamento lujo
```

**JSON-LD generado:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://versusandorra.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Propiedades",
      "item": "https://versusandorra.com/propiedades"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Apartamento lujo",
      "item": "https://versusandorra.com/propiedades/apartamento-lujo"
    }
  ]
}
```

---

## 🔧 REFERENCIA DE FUNCIONES SEO UTILS

Ubicación: `/lib/seo-utils.ts`

### generateMetadata()

Genera metadata completa para páginas genéricas.

**Firma:**

```typescript
function generateMetadata(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  keywords?: string[];
}): Metadata
```

**Parámetros:**

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| title | string | Sí | Título de la página (sin " \| Versus Andorra") |
| description | string | Sí | Descripción (150-160 caracteres) |
| url | string | Sí | URL absoluta de la página |
| image | string | No | URL de imagen OG (default: /og-image.png) |
| keywords | string[] | No | Array de keywords para SEO |

**Ejemplo:**

```typescript
export const metadata = generateMetadata({
  title: 'Contacto',
  description: 'Contacta con Versus Andorra para más información.',
  url: generateUrl('/contacto'),
  keywords: ['contacto', 'inmobiliaria andorra'],
});
```

---

### generatePropertyMetadata()

Genera metadata especializada para propiedades inmobiliarias.

**Firma:**

```typescript
function generatePropertyMetadata(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  images?: string[];
  price?: number;
  priceCurrency?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  city?: string;
  keywords?: string[];
}): Metadata
```

**Parámetros adicionales:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| price | number | Precio de la propiedad |
| priceCurrency | string | Código de moneda (EUR, USD, etc.) |
| bedrooms | number | Número de habitaciones |
| bathrooms | number | Número de baños |
| area | number | Área en m² |
| city | string | Ciudad/localidad |

**Ejemplo:**

```typescript
return generatePropertyMetadata({
  title: 'Apartamento de lujo',
  description: 'Precioso apartamento con vistas panorámicas',
  url: generateUrl(`/propiedades/${slug}`),
  image: property.featured_image,
  price: 450000,
  priceCurrency: 'EUR',
  bedrooms: 3,
  bathrooms: 2,
  area: 120,
  city: 'Andorra la Vella',
});
```

---

### generateBlogPostMetadata()

Genera metadata especializada para posts del blog con tipo "article".

**Firma:**

```typescript
function generateBlogPostMetadata(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}): Metadata
```

**Parámetros adicionales:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| author | string | Nombre del autor |
| publishedTime | string | Fecha de publicación (ISO) |
| modifiedTime | string | Fecha de modificación (ISO) |

**Ejemplo:**

```typescript
return generateBlogPostMetadata({
  title: post.title,
  description: post.excerpt,
  url: generateUrl(`/blog/${slug}`),
  image: post.featured_image,
  author: 'Versus Andorra',
  publishedTime: post.date,
  modifiedTime: post.modified,
  keywords: ['blog inmobiliario', ...post.tags],
});
```

---

### extractDescription()

Extrae y limpia descripción de HTML, truncando a longitud especificada.

**Firma:**

```typescript
function extractDescription(html: string, maxLength: number = 160): string
```

**Uso:**

```typescript
const description = extractDescription(post.content, 160);
// Input: "<p>Este es un <strong>post</strong> sobre inmobiliaria...</p>"
// Output: "Este es un post sobre inmobiliaria..."
```

---

### generateUrl()

Genera URL absoluta combinando SITE_URL con path relativo.

**Firma:**

```typescript
function generateUrl(path: string): string
```

**Uso:**

```typescript
const url = generateUrl('/propiedades/apartamento');
// Output: "https://versusandorra.com/propiedades/apartamento"
```

---

### generateTitle()

Formatea título para metadata (usado internamente).

**Firma:**

```typescript
function generateTitle(title: string): string
```

---

## 🧪 TESTING Y VALIDACIÓN

### Herramientas de Validación

#### 1. Facebook Debugger
**URL:** https://developers.facebook.com/tools/debug/

**Uso:**
1. Pegar URL de tu página
2. Click en "Debug"
3. Verificar imagen, título, descripción
4. Click en "Scrape Again" si hiciste cambios

**Qué verifica:**
- Open Graph tags
- Imagen OG (dimensiones, formato)
- Descripción y título
- URL canónica

---

#### 2. Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator

**Uso:**
1. Pegar URL de tu página
2. Verificar preview
3. Asegurar que usa `summary_large_image`

**Qué verifica:**
- Twitter Card tags
- Imagen
- Título y descripción

---

#### 3. LinkedIn Post Inspector
**URL:** https://www.linkedin.com/post-inspector/

**Uso:**
1. Pegar URL
2. Verificar preview
3. Click en "Inspect" para recargar

---

#### 4. Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Uso:**
1. Pegar URL o código
2. Verificar schemas detectados
3. Revisar errores y warnings

**Qué verifica:**
- Schema markup (JSON-LD)
- Structured data
- Eligibilidad para rich snippets

---

#### 5. Schema Markup Validator
**URL:** https://validator.schema.org/

**Uso:**
1. Pegar URL o código JSON-LD
2. Verificar validez del schema
3. Corregir errores señalados

---

### Verificación Local

**Verificar robots.txt:**
```bash
curl http://localhost:3000/robots.txt
# o visitar en navegador
```

**Verificar sitemap.xml:**
```bash
curl http://localhost:3000/sitemap.xml
# o visitar en navegador
```

**Verificar metadata en HTML:**
```bash
# Iniciar servidor
npm run dev

# Visitar página
http://localhost:3000/contacto

# Ver código fuente (Ctrl+U)
# Buscar: <meta property="og:
```

**Verificar en consola del navegador:**
```javascript
// Abrir DevTools (F12) y ejecutar:
console.log(document.querySelector('meta[property="og:title"]')?.content);
console.log(document.querySelector('meta[name="description"]')?.content);
console.log(document.querySelector('link[rel="canonical"]')?.href);
```

---

### Checklist de Validación Completa

**Antes de deploy a producción:**

- [ ] Todas las páginas tienen metadata completa
- [ ] Imágenes OG tienen dimensiones correctas (1200x630px)
- [ ] URLs canónicas son absolutas y correctas
- [ ] Schemas validan sin errores
- [ ] Facebook Debugger muestra preview correcto
- [ ] Twitter Card Validator muestra preview correcto
- [ ] Google Rich Results Test no muestra errores críticos
- [ ] robots.txt permite rastreo correcto
- [ ] sitemap.xml contiene todas las URLs importantes
- [ ] Variables de entorno configuradas en producción

---

## 📝 NOTAS IMPORTANTES

### Cache de Redes Sociales

**Facebook:**
- Cache: 7 días
- Forzar actualización: Facebook Debugger → "Scrape Again"

**Twitter:**
- Cache: Variable (30-60 minutos)
- Forzar actualización: Usar Card Validator

**LinkedIn:**
- Cache: 7 días
- Forzar actualización: Post Inspector → "Inspect"

### Rich Snippets

**Tiempo de aparición:**
- 1-2 semanas después de indexación
- No garantizado al 100% (Google decide)
- Requiere datos válidos y página indexada

**Requisitos:**
- Schema markup válido
- Página indexada en Google
- Datos no duplicados o falsos
- Cumplir políticas de Google

### Mejores Prácticas

1. **No uses datos falsos** en schemas (penalización)
2. **Actualiza metadata** cuando cambies contenido
3. **Valida periódicamente** con herramientas
4. **Usa imágenes de alta calidad** para OG
5. **Mantén descripciones únicas** por página
6. **Prueba en redes reales** antes de compartir

---

## 📚 REFERENCIAS EXTERNAS

### Documentación Oficial

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Facebook Sharing Guide](https://developers.facebook.com/docs/sharing/webmasters)

### Herramientas Recomendadas

- [TinyPNG](https://tinypng.com) - Optimización de imágenes
- [Squoosh](https://squoosh.app) - Compresión de imágenes
- [Real Favicon Generator](https://realfavicongenerator.net/) - Generador de favicons
- [Canva](https://canva.com) - Diseño de imágenes OG

---

**Última actualización:** 2025-10-31  
**Versión:** 1.0  
**Mantenedor:** Equipo de desarrollo Versus Andorra
