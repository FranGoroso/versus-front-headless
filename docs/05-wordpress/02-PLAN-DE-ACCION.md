# 🚀 PLAN DE ACCIÓN - WORDPRESS HEADLESS COMPLETO

**Objetivo:** Convertir WordPress en un backend headless 100% funcional y documentado

---

## 📋 CHECKLIST GENERAL

### Backend (WordPress)
- [ ] Verificar plugin versus-headless-api activado
- [ ] Configurar permalinks correctamente
- [ ] Habilitar WP_DEBUG para desarrollo
- [ ] Agregar constantes headless a wp-config.php
- [ ] Desactivar plugins innecesarios
- [ ] Verificar ACF y CPT UI activos
- [ ] Probar todos los endpoints REST
- [ ] Configurar Easy Real Estate

### Frontend (Next.js)
- [ ] Verificar conexión a API
- [ ] Conectar página /blog a WordPress
- [ ] Actualizar Header.tsx (4 cambios)
- [ ] Crear página /blog/[slug]
- [ ] Probar búsqueda de propiedades
- [ ] Verificar filtros funcionando
- [ ] Optimizar carga de imágenes

### Documentación
- [ ] Crear guía de endpoints
- [ ] Documentar proceso de debugging
- [ ] Crear guía de deployment
- [ ] Documentar estructura de datos

---

## 🔧 FASE 1: CONFIGURACIÓN WORDPRESS

### 1.1 Activar Plugin Headless API

#### Opción A: WP-CLI (Recomendado)
```bash
# Desde el directorio de WordPress
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Listar plugins instalados
wp plugin list

# Activar el plugin
wp plugin activate versus-headless-api

# Verificar que está activo
wp plugin list --status=active
```

#### Opción B: WordPress Admin
```
1. Ir a: http://versusandorra.local/wp-admin
2. Plugins → Installed Plugins
3. Buscar "Versus Andorra Headless API"
4. Click en "Activate"
5. Verificar mensaje: "Plugin activated"
```

#### Verificación
```bash
# Ver logs de activación
tail -f wp-content/debug.log

# Debería aparecer:
# "Versus Headless API: Plugin activado correctamente v1.0.1"
```

#### Resultado Esperado
✅ Plugin activo  
✅ Endpoints personalizados disponibles  
✅ CORS configurado automáticamente  
✅ REST API expuesta

---

### 1.2 Configurar Permalinks

#### Método 1: WordPress Admin
```
1. Ir a: Settings → Permalinks
2. Seleccionar: "Post name"
3. Estructura debe ser: /%postname%/
4. Click "Save Changes"
5. Verificar mensaje: "Permalink structure updated"
```

#### Método 2: WP-CLI
```bash
wp rewrite structure '/%postname%/' --hard

# Flush rewrite rules
wp rewrite flush --hard
```

#### Verificación
```bash
# Probar URL amigable
curl http://versusandorra.local/sample-post/

# Debe retornar contenido HTML, no 404
```

#### Resultado Esperado
✅ URLs limpias sin ?p=123  
✅ API REST rutas correctas  
✅ No errores 404 en propiedades

---

### 1.3 Habilitar WP_DEBUG

#### Editar wp-config.php
**Ubicación:** `C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php`

**BUSCAR (línea ~95):**
```php
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}
```

**REEMPLAZAR POR:**
```php
// Debugging habilitado en desarrollo
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false ); // No mostrar en frontend
@ini_set( 'display_errors', 0 );

// Logs se guardan en wp-content/debug.log
```

#### Agregar Constantes Headless

**AGREGAR DESPUÉS de WP_DEBUG:**
```php
/**
 * Configuración para modo Headless
 */
define( 'HEADLESS_MODE_CLIENT_URL', 'http://localhost:3000' );
define( 'DISABLE_WP_APPLICATION_PASSWORDS', false );
define( 'GRAPHQL_DEBUG', true ); // Si usas GraphQL en el futuro
```

#### Verificación
```bash
# Ver si se crea el archivo de log
ls -la wp-content/debug.log

# Ver logs en tiempo real
tail -f wp-content/debug.log
```

#### Resultado Esperado
✅ Errores logueados en debug.log  
✅ Debugging sin afectar performance  
✅ Constantes headless disponibles

---

### 1.4 Desactivar Plugins Innecesarios

#### Plugins a Desactivar (Frontend no usado)
```bash
# Desactivar Elementor y addons
wp plugin deactivate elementor realhomes-elementor-addon

# Desactivar plugins de frontend
wp plugin deactivate mystickyelements-pro wp-whatsapp-chat cookie-notice

# Desactivar reviews (manejar en Next.js)
wp plugin deactivate wp-reviews-plugin-for-google

# Opcional: Desactivar WPS Hide Login (no necesario)
wp plugin deactivate wps-hide-login
```

#### Plugins a MANTENER Activos
```bash
# Verificar que estos estén activos
wp plugin list --status=active | grep -E "versus-headless|advanced-custom-fields|custom-post-type|easy-real-estate|wp-rocket"
```

#### Lista de Plugins Activos Necesarios
✅ versus-headless-api  
✅ advanced-custom-fields  
✅ custom-post-type-ui  
✅ easy-real-estate  
✅ wordpress-seo (Yoast SEO)  
✅ image-optimization  
✅ shortpixel-image-optimiser  
✅ wp-rocket (opcional, solo backend)  
✅ updraftplus (backups)  
✅ redirection (redirects)

#### Resultado Esperado
✅ WordPress más rápido  
✅ Menos conflictos de plugins  
✅ Admin panel más limpio

---

### 1.5 Verificar Easy Real Estate

#### Comprobar CPT Property
```bash
# Ver si existe el post type
wp post-type list

# Debería aparecer:
# property | Easy Real Estate

# Ver propiedades existentes
wp post list --post_type=property --format=table
```

#### Configurar Easy Real Estate
```
1. Ir a: http://versusandorra.local/wp-admin
2. Easy Real Estate → Settings
3. Verificar:
   ✓ Property slug: "property" o "propiedad"
   ✓ Enable REST API: ON
   ✓ Meta fields: Configurados
```

#### Meta Fields Necesarios (REAL_HOMES_*)
- property_price (precio)
- property_bedrooms (dormitorios)
- property_bathrooms (baños)
- property_size (área)
- property_address (dirección)
- property_images (galería)
- featured (destacada)

#### Resultado Esperado
✅ CPT property funcional  
✅ Meta fields disponibles en API  
✅ Taxonomías funcionando

---

### 1.6 Verificar ACF (Advanced Custom Fields)

#### Comprobar Instalación
```bash
# Ver si ACF está activo
wp plugin list | grep advanced-custom-fields

# Debería mostrar: active
```

#### Verificar Field Groups
```
1. Ir a: ACF → Field Groups
2. Ver si hay grupos creados para:
   - Properties
   - Agents
   - Pages personalizadas
```

#### Exponer ACF en REST API
Si ACF está activo, el plugin versus-headless-api ya lo expone automáticamente:

```php
// Ya implementado en el plugin
register_rest_field($post_type, 'acf', [
    'get_callback' => function($post) {
        return get_fields($post['id']);
    }
]);
```

#### Resultado Esperado
✅ ACF activo  
✅ Campos personalizados en API  
✅ Flexible para agregar más campos

---

### 1.7 Probar Endpoints REST

#### Endpoints Nativos de WordPress
```bash
# 1. Endpoint principal
curl http://versusandorra.local/wp-json/

# 2. Propiedades
curl http://versusandorra.local/wp-json/wp/v2/properties

# 3. Posts de blog
curl http://versusandorra.local/wp-json/wp/v2/posts

# 4. Páginas
curl http://versusandorra.local/wp-json/wp/v2/pages

# 5. Taxonomías
curl http://versusandorra.local/wp-json/wp/v2/type
curl http://versusandorra.local/wp-json/wp/v2/status
curl http://versusandorra.local/wp-json/wp/v2/city
```

#### Endpoints Personalizados (Versus API)
```bash
# 1. Configuración del sitio
curl http://versusandorra.local/wp-json/versus/v1/config

# 2. Búsqueda de propiedades
curl -X POST http://versusandorra.local/wp-json/versus/v1/properties/search \
  -H "Content-Type: application/json" \
  -d '{
    "min_price": 100000,
    "max_price": 500000,
    "property_type": "apartment",
    "city": "andorra-la-vella"
  }'

# 3. Propiedades destacadas
curl http://versusandorra.local/wp-json/versus/v1/properties/featured?limit=6

# 4. Estadísticas
curl http://versusandorra.local/wp-json/versus/v1/stats
```

#### Verificar Respuestas
✅ Status Code: 200  
✅ Content-Type: application/json  
✅ CORS Headers presentes  
✅ Datos estructurados correctamente

#### Problemas Comunes

**Error 404:**
```
Solución: Flush permalinks
wp rewrite flush --hard
```

**Error 401:**
```
Solución: Plugin versus-headless-api maneja autenticación
Verificar que está activo
```

**CORS Error:**
```
Solución: Plugin agrega headers automáticamente
Verificar en Network tab de Chrome DevTools
```

#### Resultado Esperado
✅ Todos los endpoints responden  
✅ JSON válido retornado  
✅ Sin errores CORS  
✅ Datos completos con meta fields

---

## 🎨 FASE 2: CONFIGURACIÓN NEXT.JS

### 2.1 Verificar Conexión a API

#### Test de Conexión
**Crear archivo:** `scripts/test-connection.js`

```javascript
/**
 * Script para probar conexión con WordPress API
 * Uso: node scripts/test-connection.js
 */

const WORDPRESS_API_URL = 'http://versusandorra.local/wp-json';

async function testConnection() {
  console.log('🔍 Probando conexión con WordPress API...\n');

  const tests = [
    { name: 'API Root', url: `${WORDPRESS_API_URL}/` },
    { name: 'Propiedades', url: `${WORDPRESS_API_URL}/wp/v2/properties` },
    { name: 'Posts', url: `${WORDPRESS_API_URL}/wp/v2/posts` },
    { name: 'Config Versus', url: `${WORDPRESS_API_URL}/versus/v1/config` },
    { name: 'Propiedades Destacadas', url: `${WORDPRESS_API_URL}/versus/v1/properties/featured` },
  ];

  for (const test of tests) {
    try {
      const response = await fetch(test.url);
      const status = response.ok ? '✅' : '❌';
      console.log(`${status} ${test.name}: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`   Datos: ${Array.isArray(data) ? data.length : 'objeto'} items\n`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Error - ${error.message}\n`);
    }
  }
}

testConnection();
```

#### Ejecutar Test
```bash
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"
node scripts/test-connection.js
```

#### Resultado Esperado
```
✅ API Root: 200 OK
   Datos: objeto items

✅ Propiedades: 200 OK
   Datos: 10 items

✅ Posts: 200 OK
   Datos: 5 items

✅ Config Versus: 200 OK
   Datos: objeto items

✅ Propiedades Destacadas: 200 OK
   Datos: 6 items
```

---

### 2.2 Conectar Página /blog a WordPress

#### Archivo Actual: app/blog/page.tsx
**Estado:** Datos mockeados

#### Actualización Necesaria

**BUSCAR:**
```typescript
// Datos de ejemplo (mock)
const posts = [
  {
    id: 1,
    title: "Guía completa para comprar vivienda en Andorra",
    excerpt: "Todo lo que necesitas saber sobre el proceso...",
    // ...
  }
];
```

**REEMPLAZAR POR:**
```typescript
import { getPosts } from '@/lib/wordpress';

// Obtener posts reales de WordPress
const posts = await getPosts({ per_page: 9 });
```

#### Archivo Completo Actualizado
**Ubicación:** `app/blog/page.tsx`

```typescript
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/wordpress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Versus Andorra',
  description: 'Noticias, guías y consejos sobre el mercado inmobiliario en Andorra',
};

/**
 * Página de listado de posts del blog
 * Conectada a WordPress API
 */
export default async function BlogPage() {
  // Obtener posts reales de WordPress
  const posts = await getPosts({ per_page: 9 });

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Blog Inmobiliario
          </h1>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Noticias, guías y consejos sobre el mercado inmobiliario en Andorra
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Imagen */}
              {post.featured_image && (
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={post.featured_image.url}
                      alt={post.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </Link>
              )}

              {/* Contenido */}
              <div className="p-6">
                {/* Categorías */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category) => (
                      <Badge key={category.id} variant="secondary" className="text-xs">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Título */}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-light text-gray-900 mb-3 hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <div 
                  className="text-gray-600 font-light mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 font-light">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    {post.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Read More */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-gray-900 font-light mt-4 hover:gap-3 transition-all"
                >
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* No posts message */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-light text-lg">
              No hay artículos publicados todavía.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Resultado Esperado
✅ Posts reales de WordPress  
✅ Imágenes destacadas  
✅ Categorías y metadatos  
✅ Links a posts individuales

---

### 2.3 Crear Página Individual de Post

#### Crear archivo: app/blog/[slug]/page.tsx

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';

/**
 * Generar metadata dinámica para SEO
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado | Versus Andorra',
    };
  }

  return {
    title: `${post.title} | Blog Versus Andorra`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image?.url ? [post.featured_image.url] : [],
    },
  };
}

/**
 * Generar rutas estáticas en build time
 */
export async function generateStaticParams() {
  const posts = await getPosts({ per_page: 100 });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Página individual de post del blog
 */
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Imagen destacada */}
        {post.featured_image && (
          <div className="relative h-96 w-full overflow-hidden rounded-2xl mb-8">
            <Image
              src={post.featured_image.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          {/* Categorías */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-gray-600 font-light">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {new Date(post.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {post.author.name}
              </span>
            )}
          </div>
        </header>

        {/* Contenido */}
        <div 
          className="prose prose-lg max-w-none font-light
            prose-headings:font-light prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-gray-900 prose-a:underline hover:prose-a:text-gray-600
            prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
```

#### Resultado Esperado
✅ Post individual funcional  
✅ SEO metadata dinámica  
✅ Static generation en build  
✅ Contenido formateado con Tailwind Typography

---

## 🧪 FASE 3: TESTING Y VERIFICACIÓN

### 3.1 Checklist de Endpoints

```bash
# Crear script de testing
```

**Archivo:** `scripts/test-all-endpoints.sh`

```bash
#!/bin/bash

# Script para probar todos los endpoints de WordPress
# Uso: bash scripts/test-all-endpoints.sh

API_URL="http://versusandorra.local/wp-json"
echo "🧪 Testing WordPress Headless API"
echo "=================================="
echo ""

# Función para probar endpoint
test_endpoint() {
  local name=$1
  local url=$2
  local method=${3:-GET}
  
  echo "Testing: $name"
  response=$(curl -s -o /dev/null -w "%{http_code}" -X $method "$url")
  
  if [ $response -eq 200 ]; then
    echo "✅ $name: OK ($response)"
  else
    echo "❌ $name: FAIL ($response)"
  fi
  echo ""
}

# Tests
test_endpoint "API Root" "$API_URL/"
test_endpoint "Propiedades" "$API_URL/wp/v2/properties"
test_endpoint "Posts" "$API_URL/wp/v2/posts"
test_endpoint "Páginas" "$API_URL/wp/v2/pages"
test_endpoint "Config Versus" "$API_URL/versus/v1/config"
test_endpoint "Featured Properties" "$API_URL/versus/v1/properties/featured"
test_endpoint "Stats" "$API_URL/versus/v1/stats"
test_endpoint "Property Types" "$API_URL/wp/v2/type"
test_endpoint "Property Cities" "$API_URL/wp/v2/city"

echo "=================================="
echo "✅ Testing completado"
```

---

### 3.2 Test de Conexión Next.js

**Archivo:** `app/test-api/page.tsx`

```typescript
/**
 * Página de testing de API
 * Solo para desarrollo
 * URL: http://localhost:3000/test-api
 */

import { 
  getAllProperties, 
  getFeaturedProperties, 
  getPosts,
  getSiteConfig,
  getTeamMembers 
} from '@/lib/wordpress';

export default async function TestAPIPage() {
  const results = {
    properties: { status: 'pending', data: null, error: null },
    featured: { status: 'pending', data: null, error: null },
    posts: { status: 'pending', data: null, error: null },
    config: { status: 'pending', data: null, error: null },
    team: { status: 'pending', data: null, error: null },
  };

  // Test Properties
  try {
    const properties = await getAllProperties({ per_page: 5 });
    results.properties = { status: 'success', data: properties, error: null };
  } catch (error) {
    results.properties = { status: 'error', data: null, error: String(error) };
  }

  // Test Featured
  try {
    const featured = await getFeaturedProperties(3);
    results.featured = { status: 'success', data: featured, error: null };
  } catch (error) {
    results.featured = { status: 'error', data: null, error: String(error) };
  }

  // Test Posts
  try {
    const posts = await getPosts({ per_page: 5 });
    results.posts = { status: 'success', data: posts, error: null };
  } catch (error) {
    results.posts = { status: 'error', data: null, error: String(error) };
  }

  // Test Config
  try {
    const config = await getSiteConfig();
    results.config = { status: 'success', data: config, error: null };
  } catch (error) {
    results.config = { status: 'error', data: null, error: String(error) };
  }

  // Test Team
  try {
    const team = await getTeamMembers();
    results.team = { status: 'success', data: team, error: null };
  } catch (error) {
    results.team = { status: 'error', data: null, error: String(error) };
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">WordPress API Test</h1>
      
      {Object.entries(results).map(([key, result]) => (
        <div key={key} className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">
            {result.status === 'success' ? '✅' : '❌'} {key}
          </h2>
          
          {result.status === 'success' && (
            <div>
              <p className="text-green-600 mb-2">Success</p>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
          
          {result.status === 'error' && (
            <div>
              <p className="text-red-600 mb-2">Error</p>
              <pre className="bg-red-50 p-4 rounded overflow-auto text-sm">
                {result.error}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 RESUMEN DE COMANDOS

### WordPress
```bash
# Activar plugin
wp plugin activate versus-headless-api

# Configurar permalinks
wp rewrite structure '/%postname%/' --hard

# Flush rewrite rules
wp rewrite flush --hard

# Listar plugins activos
wp plugin list --status=active

# Desactivar plugins innecesarios
wp plugin deactivate elementor mystickyelements-pro

# Ver debug log
tail -f wp-content/debug.log
```

### Next.js
```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Test de conexión
node scripts/test-connection.js
```

### Testing
```bash
# Test endpoints
bash scripts/test-all-endpoints.sh

# Test página de API
# Navegar a: http://localhost:3000/test-api
```

---

**Próximo paso:** Ejecutar FASE 1 - Configuración WordPress

---

**Documento generado automáticamente**  
**Última actualización:** 24/10/2025
