# 🎯 CONVERSIÓN HEADLESS WORDPRESS - PLAN MAESTRO

**Fecha:** 26 de Octubre de 2025  
**Proyecto:** Versus Andorra Real Estate  
**Objetivo:** Convertir WordPress en backend headless 100% funcional

---

## 📊 DIAGNÓSTICO ACTUAL (26/10/2025)

### Estado Global: 75% Completado ✅

#### ✅ COMPLETADO
- Plugin headless personalizado (`versus-headless-api`) creado (800+ líneas)
- CORS configurado correctamente
- REST API habilitada y funcionando
- Endpoints personalizados implementados
- Variables de entorno configuradas
- Next.js 14 con App Router funcionando
- **FIX CRÍTICO: Precios RealHomes resueltos** (26/10/2025)
- Taxonomías funcionando (tipos, estados, ciudades, características)
- PropertyCard con badges y características
- Función `transformToPropertyCard()` centralizada y actualizada

#### ⚠️ PENDIENTE VERIFICAR
1. Plugin `versus-headless-api` activado en WordPress
2. Páginas individuales muestran precios correctamente
3. Permalinks configurados en `/%postname%/`
4. WP_DEBUG habilitado para desarrollo
5. Endpoints personalizados funcionando

#### ❌ PENDIENTE IMPLEMENTAR
1. Página `/blog` conectada a WordPress (actualmente mockeada)
2. Página `/blog/[slug]` no existe
3. Autenticación JWT para acciones protegidas
4. Sistema de caché optimizado
5. Backup automatizado antes de cambios

---

## 🗺️ PLAN DE ACCIÓN ESTRUCTURADO

### FASE 1: VERIFICACIÓN Y DIAGNÓSTICO (30 min)
**Objetivo:** Confirmar estado actual del sistema

#### Task 1.1: Verificar Plugin Headless
```powershell
# Comando WP-CLI
wp plugin list --path="C:\Users\goros\Local Sites\versusandorra\app\public"
wp plugin status versus-headless-api
```

**Resultado esperado:**
- Plugin aparece en lista
- Estado: `Active` o `Inactive`

**Si inactivo:**
```powershell
wp plugin activate versus-headless-api
```

#### Task 1.2: Verificar Permalinks
**Acceso:** http://versusandorra.local/wp-admin/options-permalink.php

**Configuración recomendada:**
- Estructura: `/%postname%/`
- Guardar cambios (flush rewrite rules)

#### Task 1.3: Verificar WP_DEBUG
**Archivo:** `C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php`

**Agregar antes de `ABSPATH`:**
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('HEADLESS_MODE', true);
```

#### Task 1.4: Probar Endpoints API
```bash
# Endpoint 1: Propiedades
curl http://versusandorra.local/wp-json/wp/v2/properties?per_page=1

# Endpoint 2: Config personalizado
curl http://versusandorra.local/wp-json/versus/v1/config

# Endpoint 3: Búsqueda
curl http://versusandorra.local/wp-json/versus/v1/properties/search

# Endpoint 4: Destacadas
curl http://versusandorra.local/wp-json/versus/v1/properties/featured
```

**Documentar:**
- ✅ Respuesta exitosa
- ❌ Error (con mensaje completo)

#### Task 1.5: Verificar Precios en Páginas Individuales
**Test manual:**
1. Abrir http://localhost:3000
2. Click en cualquier propiedad
3. Verificar que precio aparece en página individual

**Test con logs:**
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"
npm run dev
# Observar logs en terminal
```

---

### FASE 2: CREAR BACKUP (15 min)
**Objetivo:** Proteger datos antes de modificaciones

#### Task 2.1: Backup Base de Datos
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Método 1: WP-CLI
wp db export backup-headless-conversion-$(date +%Y%m%d-%H%M%S).sql

# Método 2: Desde MySQL
mysql -u root -proot local > backup-db-$(date +%Y%m%d).sql
```

**Guardar en:**
```
C:\Users\goros\Local Sites\versusandorra\backups\
```

#### Task 2.2: Backup Archivos Clave
```powershell
# Crear directorio de backups
mkdir -p "C:\Users\goros\Local Sites\versusandorra\backups\$(date +%Y%m%d)"

# Backup wp-config.php
copy "C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php" "C:\Users\goros\Local Sites\versusandorra\backups\$(date +%Y%m%d)\"

# Backup .htaccess
copy "C:\Users\goros\Local Sites\versusandorra\app\public\.htaccess" "C:\Users\goros\Local Sites\versusandorra\backups\$(date +%Y%m%d)\"

# Backup plugin headless
robocopy "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\plugins\versus-headless-api" "C:\Users\goros\Local Sites\versusandorra\backups\$(date +%Y%m%d)\versus-headless-api" /E
```

#### Task 2.3: Backup Git del Frontend
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Crear branch de backup
git checkout -b backup/pre-headless-conversion-20251026
git add .
git commit -m "backup: Estado antes de conversión headless completa"
git checkout main
```

---

### FASE 3: OPTIMIZACIÓN PLUGIN HEADLESS (1 hora)
**Objetivo:** Mejorar plugin y agregar funcionalidades faltantes

#### Task 3.1: Actualizar Plugin con Mejoras
**Archivo:** `versus-headless-api.php`

**Agregar:**
1. **Versionado de API:**
   ```php
   define('VERSUS_API_VERSION', '1.1.0');
   ```

2. **Endpoint de Health Check:**
   ```php
   register_rest_route('versus/v1', '/health', array(
       'methods' => 'GET',
       'callback' => 'versus_api_health_check',
       'permission_callback' => '__return_true'
   ));
   ```

3. **Caché Mejorado:**
   ```php
   // Implementar cache con transients
   function versus_cached_query($key, $callback, $expiration = 3600) {
       $cached = get_transient($key);
       if (false !== $cached) {
           return $cached;
       }
       $result = $callback();
       set_transient($key, $result, $expiration);
       return $result;
   }
   ```

4. **Logging Mejorado:**
   ```php
   function versus_log($message, $level = 'info') {
       if (defined('WP_DEBUG') && WP_DEBUG) {
           error_log("[VERSUS API] [{$level}] {$message}");
       }
   }
   ```

#### Task 3.2: Agregar Endpoint de Estadísticas Detalladas
```php
register_rest_route('versus/v1', '/stats/detailed', array(
    'methods' => 'GET',
    'callback' => 'versus_get_detailed_stats',
    'permission_callback' => '__return_true'
));

function versus_get_detailed_stats() {
    return versus_cached_query('versus_detailed_stats', function() {
        return array(
            'properties' => array(
                'total' => wp_count_posts('property')->publish,
                'featured' => count_featured_properties(),
                'by_type' => count_by_taxonomy('property-type'),
                'by_status' => count_by_taxonomy('property-status'),
                'by_city' => count_by_taxonomy('property-city'),
            ),
            'blog' => array(
                'total_posts' => wp_count_posts('post')->publish,
                'categories' => wp_count_terms('category'),
            ),
            'team' => array(
                'total_agents' => wp_count_posts('agent')->publish,
            ),
            'media' => array(
                'total_images' => wp_count_posts('attachment')->inherit,
            ),
            'performance' => array(
                'cache_enabled' => true,
                'api_version' => VERSUS_API_VERSION,
            )
        );
    }, 3600);
}
```

---

### FASE 4: CONECTAR PÁGINA BLOG (45 min)
**Objetivo:** Eliminar mock y conectar a WordPress real

#### Task 4.1: Actualizar `app/blog/page.tsx`
**Archivo actual:** Usa datos mockeados

**Cambios necesarios:**

=== PART 1/3 START: app/blog/page.tsx - Imports y configuración ===
```typescript
/**
 * Blog Listing Page
 * 
 * Página de listado de artículos del blog conectada a WordPress.
 * Implementa paginación, búsqueda y filtrado por categorías.
 * 
 * @page /blog
 * @version 3.0.0 - Conectado a WordPress (antes mockeado)
 * @updated 2025-10-26
 */

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getSiteConfig } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { REVALIDATE_TIME } from '@/lib/constants';

/**
 * Configurar revalidación ISR
 * El blog se revalida cada 5 minutos para contenido fresco
 */
export const revalidate = REVALIDATE_TIME.BLOG_LIST || 300;

/**
 * Metadata de la página
 */
export const metadata = {
  title: 'Blog | Versus Andorra - Noticias e Información Inmobiliaria',
  description: 'Últimas noticias, guías y consejos sobre el mercado inmobiliario en Andorra.',
};
```
=== PART 1/3 END ===

=== PART 2/3 START: app/blog/page.tsx - Componente principal ===
```typescript
/**
 * Props de la página (para futura implementación de paginación)
 */
interface BlogPageProps {
  searchParams?: {
    page?: string;
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  /**
   * Obtener parámetros de búsqueda
   */
  const currentPage = Number(searchParams?.page) || 1;
  const categoryFilter = searchParams?.category;

  /**
   * Obtener posts de WordPress
   */
  const params: any = {
    per_page: 9,
    page: currentPage,
    _embed: true,
  };

  // Filtrar por categoría si existe
  if (categoryFilter) {
    params.categories = categoryFilter;
  }

  const posts = await getPosts(params);
  const siteConfig = await getSiteConfig();

  /**
   * Manejar caso sin posts
   */
  if (!posts || posts.length === 0) {
    return (
      <>
        <Header config={siteConfig} />
        <main className="min-h-screen bg-white">
          <Container className="py-20">
            <div className="text-center">
              <h1 className="text-4xl font-light tracking-tight mb-4">
                No hay artículos disponibles
              </h1>
              <p className="text-gray-600 mb-8">
                Pronto publicaremos contenido interesante.
              </p>
              <Button asChild>
                <Link href="/">Volver al inicio</Link>
              </Button>
            </div>
          </Container>
        </main>
        <Footer config={siteConfig} />
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
                Blog
              </h1>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Noticias, guías y consejos sobre el mercado inmobiliario en Andorra.
                Mantente informado con nuestros artículos.
              </p>
            </div>
          </Container>
        </section>

        {/* Posts Grid */}
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                // Extraer datos del post
                const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
                const categories = post._embedded?.['wp:term']?.[0] || [];
                const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160);

                return (
                  <Card key={post.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500">
                    <Link href={`/blog/${post.slug}`}>
                      {/* Imagen destacada */}
                      {featuredImage && (
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={featuredImage}
                            alt={post.title.rendered}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="p-6">
                        {/* Categorías */}
                        {categories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {categories.slice(0, 2).map((category: any) => (
                              <Badge 
                                key={category.id} 
                                variant="secondary"
                                className="text-xs font-light"
                              >
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Título */}
                        <h2 className="text-2xl font-light tracking-tight mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                          {post.title.rendered}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 font-light leading-relaxed line-clamp-3 mb-4">
                          {excerpt}
                        </p>

                        {/* Fecha */}
                        <time className="text-sm text-gray-500 font-light">
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </Link>
                  </Card>
                );
              })}
            </div>

            {/* Paginación placeholder (implementar en futuro) */}
            {posts.length === 9 && (
              <div className="mt-12 text-center">
                <p className="text-gray-500 font-light">
                  Mostrando {posts.length} artículos
                </p>
              </div>
            )}
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer config={siteConfig} />
    </>
  );
}
```
=== PART 2/3 END ===

=== PART 3/3 START: Crear app/blog/[slug]/page.tsx ===
```typescript
/**
 * Blog Post Detail Page
 * 
 * Página de detalle individual de un artículo del blog.
 * Genera rutas estáticas en build time usando generateStaticParams.
 * 
 * @page /blog/[slug]
 * @version 1.0.0
 * @created 2025-10-26
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs, getSiteConfig } from '@/lib/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { REVALIDATE_TIME } from '@/lib/constants';

/**
 * Configurar revalidación ISR
 */
export const revalidate = REVALIDATE_TIME.BLOG_DETAIL || 600;

/**
 * Generar rutas estáticas en build time
 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

/**
 * Generar metadata dinámica para SEO
 */
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }
  
  return {
    title: `${post.title.rendered} | Blog Versus Andorra`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

/**
 * Props de la página
 */
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  /**
   * Obtener datos del post
   */
  const post = await getPostBySlug(params.slug);
  const siteConfig = await getSiteConfig();

  /**
   * Si no existe, mostrar 404
   */
  if (!post) {
    notFound();
  }

  /**
   * Extraer datos del post
   */
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const author = post._embedded?.['author']?.[0];

  return (
    <>
      {/* Header */}
      <Header config={siteConfig} />

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-6">
          <Container>
            <nav className="flex items-center gap-2 text-sm text-gray-600 font-light">
              <Link href="/" className="hover:text-black transition-colors">
                Inicio
              </Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-black transition-colors">
                Blog
              </Link>
              <span>›</span>
              <span className="text-black line-clamp-1">
                {post.title.rendered}
              </span>
            </nav>
          </Container>
        </section>

        {/* Imagen destacada */}
        {featuredImage && (
          <section className="py-8">
            <Container>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
                <Image
                  src={featuredImage}
                  alt={post.title.rendered}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Container>
          </section>
        )}

        {/* Contenido del artículo */}
        <section className="py-8">
          <Container>
            <article className="max-w-4xl mx-auto">
              {/* Categorías */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category: any) => (
                    <Badge 
                      key={category.id}
                      variant="secondary"
                      className="text-sm font-light"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                {post.title.rendered}
              </h1>

              {/* Meta información */}
              <div className="flex items-center gap-4 text-gray-600 font-light mb-8 pb-8 border-b border-gray-200">
                {author && (
                  <div className="flex items-center gap-2">
                    <span>Por</span>
                    <span className="font-medium text-gray-900">{author.name}</span>
                  </div>
                )}
                <span>•</span>
                <time>
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              {/* Contenido del post */}
              <div 
                className="prose prose-lg prose-gray max-w-none
                           prose-headings:font-light prose-headings:tracking-tight prose-headings:text-gray-900
                           prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light prose-p:mb-6
                           prose-ul:text-gray-600 prose-ul:my-6 prose-li:mb-2 prose-li:leading-relaxed
                           prose-ol:text-gray-600 prose-ol:my-6
                           prose-strong:text-gray-900 prose-strong:font-medium
                           prose-a:text-gray-900 prose-a:underline hover:prose-a:text-gray-700
                           prose-blockquote:border-l-gray-300 prose-blockquote:text-gray-600
                           prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </article>
          </Container>
        </section>

        {/* CTA para volver al blog */}
        <section className="py-12 bg-gray-50">
          <Container>
            <div className="text-center">
              <Link href="/blog">
                <button className="px-8 py-3 border border-gray-900 text-gray-900 rounded-full font-light hover:bg-gray-900 hover:text-white transition-all duration-300">
                  ← Volver al blog
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <Footer config={siteConfig} />
    </>
  );
}
```
=== PART 3/3 END ===

---

### FASE 5: TESTING Y VALIDACIÓN (30 min)
**Objetivo:** Verificar que todo funciona correctamente

#### Task 5.1: Checklist de Testing

**Backend WordPress:**
- [ ] Plugin `versus-headless-api` activado
- [ ] Permalinks configurados
- [ ] WP_DEBUG habilitado
- [ ] Endpoint `/wp-json/wp/v2/properties` responde
- [ ] Endpoint `/wp-json/versus/v1/config` responde
- [ ] Endpoint `/wp-json/wp/v2/posts` responde
- [ ] CORS funciona (sin errores en console)

**Frontend Next.js:**
- [ ] Home page carga correctamente
- [ ] `/propiedades` muestra lista con precios
- [ ] `/propiedades/[slug]` muestra detalle con precio
- [ ] `/nuestro-equipo` muestra equipo
- [ ] `/blog` muestra artículos reales de WordPress
- [ ] `/blog/[slug]` muestra artículo completo
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en terminal de Next.js

#### Task 5.2: Performance Testing
```bash
# Build de producción
npm run build

# Verificar que no hay errores
# Verificar tamaño de bundles
```

#### Task 5.3: Logs Review
```powershell
# Ver logs de WordPress
Get-Content "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\debug.log" -Tail 50

# Ver logs de Next.js
# Revisar terminal donde corre npm run dev
```

---

### FASE 6: DOCUMENTACIÓN (30 min)
**Objetivo:** Documentar todo el trabajo realizado

#### Task 6.1: Crear CHANGELOG
**Archivo:** `docs/conversion-headless-2025/CHANGELOG.md`

**Contenido:**
- Fecha y hora de cada cambio
- Archivos modificados
- Razón del cambio
- Resultado obtenido

#### Task 6.2: Actualizar README Principal
**Agregar sección:**
```markdown
## 🚀 WordPress Headless Backend

Este proyecto usa WordPress como backend headless con Next.js como frontend.

### Configuración WordPress
- Plugin personalizado: `versus-headless-api` v1.1.0
- REST API: http://versusandorra.local/wp-json
- CORS habilitado para desarrollo

### Endpoints Disponibles
- Propiedades: `/wp/v2/properties`
- Blog: `/wp/v2/posts`
- Equipo: `/wp/v2/agents`
- Config: `/versus/v1/config`
- Stats: `/versus/v1/stats`

Ver documentación completa en `docs/conversion-headless-2025/`
```

#### Task 6.3: Crear Guía de Troubleshooting
**Archivo:** `docs/conversion-headless-2025/TROUBLESHOOTING.md`

**Incluir:**
- Problemas comunes y soluciones
- Cómo verificar logs
- Comandos útiles WP-CLI
- Cómo regenerar cache

---

## 📈 CRONOGRAMA ESTIMADO

| Fase | Duración | Descripción |
|------|----------|-------------|
| FASE 1 | 30 min | Verificación y diagnóstico |
| FASE 2 | 15 min | Backup completo |
| FASE 3 | 60 min | Optimización plugin |
| FASE 4 | 45 min | Conectar blog |
| FASE 5 | 30 min | Testing y validación |
| FASE 6 | 30 min | Documentación |
| **TOTAL** | **3h 30min** | Conversión completa |

---

## ✅ CRITERIOS DE ÉXITO

La conversión se considera exitosa cuando:

1. ✅ Plugin headless activado y funcionando
2. ✅ Todas las páginas cargan sin errores
3. ✅ Precios aparecen en cards Y páginas individuales
4. ✅ Blog conectado a WordPress (no mockeado)
5. ✅ Página `/blog/[slug]` funciona
6. ✅ No hay errores en logs de WordPress
7. ✅ No hay errores en logs de Next.js
8. ✅ Build de producción exitoso
9. ✅ Backup completo creado
10. ✅ Documentación actualizada

---

## 🚨 ROLLBACK PLAN

Si algo sale mal:

### Paso 1: Detener Next.js
```powershell
# Ctrl+C en terminal donde corre npm run dev
```

### Paso 2: Restaurar Base de Datos
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Listar backups
ls "C:\Users\goros\Local Sites\versusandorra\backups\"

# Restaurar backup más reciente
wp db import "C:\Users\goros\Local Sites\versusandorra\backups\backup-headless-conversion-YYYYMMDD.sql"
```

### Paso 3: Restaurar Archivos
```powershell
# Restaurar wp-config.php
copy "C:\Users\goros\Local Sites\versusandorra\backups\YYYYMMDD\wp-config.php" "C:\Users\goros\Local Sites\versusandorra\app\public\"

# Restaurar plugin
robocopy "C:\Users\goros\Local Sites\versusandorra\backups\YYYYMMDD\versus-headless-api" "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\plugins\versus-headless-api" /E
```

### Paso 4: Restaurar Frontend
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Volver al branch de backup
git checkout backup/pre-headless-conversion-20251026

# O descartar cambios
git reset --hard HEAD
```

---

## 📞 SIGUIENTE ACCIÓN

**AHORA MISMO:**

1. Confirmar si quieres que ejecute FASE 1 (Verificación)
2. O prefieres revisar este plan primero

**Responde con:**
- ✅ "Ejecuta FASE 1" para comenzar
- 📋 "Revisar plan" si quieres modificar algo
- ❓ "Tengo dudas" si necesitas aclaraciones

---

**Documento creado:** 26/10/2025  
**Por:** Claude (Asistente Técnico)  
**Versión:** 1.0
