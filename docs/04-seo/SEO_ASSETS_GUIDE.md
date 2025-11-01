# Guía de Assets SEO - Versus Andorra

**Versión:** 1.0  
**Última actualización:** 2025-10-31  
**Audiencia:** Desarrolladores y diseñadores

---

## 📋 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Imágenes Open Graph](#imágenes-open-graph)
3. [Favicons](#favicons)
4. [Optimización de Assets](#optimización-de-assets)
5. [Troubleshooting](#troubleshooting)

---

## 📖 INTRODUCCIÓN

Este documento cubre la configuración y optimización de todos los assets visuales relacionados con SEO en Versus Andorra, incluyendo imágenes Open Graph, favicons y otros recursos visuales.

### Assets Requeridos

**Mínimo indispensable:**
- ✅ Imagen Open Graph por defecto (1200x630px)
- ✅ Favicon básico (32x32px)
- ⚠️ Apple Touch Icon (180x180px) - Recomendado

**Opcional pero recomendado:**
- Imágenes OG específicas por sección
- Múltiples tamaños de favicon
- Favicon para modo oscuro

---

## 🖼️ IMÁGENES OPEN GRAPH

### Especificaciones Técnicas

#### Dimensiones Obligatorias

**Dimensión recomendada:**
- **Ancho:** 1200px
- **Alto:** 630px
- **Ratio:** 1.91:1

**Dimensiones mínimas:**
- **Ancho:** 600px
- **Alto:** 315px

**Dimensiones máximas:**
- No hay límite técnico, pero mantener razonable

#### Formatos Soportados

| Formato | Pros | Contras | Recomendación |
|---------|------|---------|---------------|
| **PNG** | Alta calidad, transparencia | Mayor tamaño archivo | ✅ Recomendado |
| **JPG** | Menor tamaño archivo | Sin transparencia | ✅ Aceptable |
| **WebP** | Mejor compresión | Menos compatible | ⚠️ Usar con fallback |
| **SVG** | Escalable, ligero | Pobre soporte redes | ❌ No recomendado |

#### Peso del Archivo

- **Ideal:** < 300 KB
- **Máximo aceptable:** 1 MB
- **Máximo técnico:** 8 MB (Facebook)

---

### Área Segura

Algunas plataformas recortan las imágenes en dispositivos móviles o vistas previas pequeñas.

**Margen de seguridad:**
```
┌─────────────────────────────────────┐
│ ← 100px margen                      │ ← 100px margen
│                                     │
│    ┌─────────────────────────┐     │
│    │                         │     │
│    │   ÁREA SEGURA           │     │
│    │   1000 x 430 px         │     │
│    │                         │     │
│    │   Mantener contenido    │     │
│    │   importante aquí       │     │
│    │                         │     │
│    └─────────────────────────┘     │
│                                     │
│                      100px margen → │
└─────────────────────────────────────┘
        1200px x 630px
```

**Recomendaciones:**
- Logo y texto principal: dentro del área segura central
- Elementos decorativos: pueden extenderse a los bordes
- Evitar texto esencial a menos de 100px de los bordes

---

### Crear Imagen Open Graph Definitiva

#### Opción 1: Canva (Más Fácil - 5 minutos)

**Paso a paso:**

1. **Acceder a Canva**
   - URL: https://canva.com
   - Crear cuenta gratuita (si es necesario)

2. **Crear diseño**
   - Click en "Crear un diseño"
   - Seleccionar "Tamaño personalizado"
   - Ingresar: 1200 x 630 px
   - Click en "Crear diseño"

3. **Diseñar la imagen**
   
   **Elementos sugeridos:**
   ```
   Layout recomendado:
   
   ┌─────────────────────────────────────┐
   │  [Logo Versus Andorra - superior]   │
   │                                     │
   │     VERSUS ANDORRA                  │ ← Título grande (72px)
   │    ────────────────                 │ ← Línea decorativa
   │  Inmobiliaria de Lujo en Andorra   │ ← Subtítulo (36px)
   │                                     │
   │  [Imagen de fondo: propiedad]       │ ← Con overlay 60%
   │                                     │
   │  ────────────────────────────────   │ ← Barra inferior dorada
   └─────────────────────────────────────┘
   ```

   **Paleta de colores:**
   - Principal: `#1a1a1a` (Negro)
   - Acento: `#c9a961` (Dorado)
   - Texto: `#ffffff` (Blanco)
   - Overlay: Negro al 60% de opacidad

   **Tipografía:**
   - Título: Playfair Display Bold - 72px
   - Subtítulo: Inter Regular - 36px
   - Descripción: Inter Regular - 24px

4. **Agregar elementos**
   - Subir logo desde `/public/img/versusandorraMA-1.png`
   - Agregar texto con las fuentes indicadas
   - Opcional: Imagen de propiedad de fondo
   - Aplicar overlay oscuro para legibilidad

5. **Exportar**
   - Click en "Compartir" → "Descargar"
   - Formato: PNG
   - Calidad: Estándar
   - Click en "Descargar"

---

#### Opción 2: Figma (Profesional - 15 minutos)

**Paso a paso:**

1. **Configurar documento**
   ```
   Nuevo archivo → Frame (F)
   Dimensiones: 1200 x 630 px
   Nombre: "og-image-versus-andorra"
   ```

2. **Crear layout base**
   ```
   Fondo:
   - Rectangle (R)
   - Fill: Linear gradient
     - Color 1: #1a1a1a (arriba)
     - Color 2: #2a2a2a (abajo)
   ```

3. **Agregar logo**
   ```
   - File → Place image → seleccionar logo
   - Dimensiones: 200 x 60 px (aprox)
   - Posición: Centrado superior, 80px desde arriba
   ```

4. **Agregar textos**
   ```
   Título:
   - Text tool (T)
   - Fuente: Playfair Display Bold
   - Tamaño: 72px
   - Color: #ffffff
   - Texto: "VERSUS ANDORRA"
   - Posición: Centrado, 200px desde arriba
   
   Línea decorativa:
   - Line tool (L)
   - Ancho: 300px, Alto: 3px
   - Color: #c9a961
   - Posición: Centrado, debajo del título
   
   Subtítulo:
   - Text tool (T)
   - Fuente: Inter Regular
   - Tamaño: 36px
   - Color: #c9a961
   - Texto: "Inmobiliaria de Lujo en Andorra"
   - Posición: Centrado, debajo de línea
   ```

5. **Imagen de fondo (opcional)**
   ```
   - Place image → foto de propiedad
   - Ajustar a frame
   - Enviar atrás (Cmd/Ctrl + [)
   - Opacity: 30%
   - Blur: 2px (opcional)
   ```

6. **Exportar**
   ```
   - Seleccionar frame
   - Export settings:
     - Format: PNG
     - Scale: 1x
   - Click "Export og-image"
   ```

---

#### Opción 3: Photoshop (Experto - 20 minutos)

**Paso a paso:**

1. **Nuevo documento**
   ```
   File → New
   - Ancho: 1200 px
   - Alto: 630 px
   - Resolución: 72 DPI
   - Color Mode: RGB
   - Background: Transparent
   ```

2. **Crear fondo**
   ```
   - Layer → New Fill Layer → Gradient
   - Style: Linear
   - Angle: 90°
   - Colors: #1a1a1a a #2a2a2a
   ```

3. **Agregar logo**
   ```
   - File → Place Embedded
   - Seleccionar: /public/img/versusandorraMA-1.png
   - Redimensionar proporcionalmente
   - Posicionar centrado arriba
   ```

4. **Agregar textos**
   ```
   Título:
   - Type Tool (T)
   - Font: Playfair Display Bold
   - Size: 72pt
   - Color: #ffffff
   - Type: "VERSUS ANDORRA"
   
   Línea:
   - Line Tool (U)
   - Weight: 3px
   - Color: #c9a961
   - Centrada
   
   Subtítulo:
   - Type Tool (T)
   - Font: Inter Regular
   - Size: 36pt
   - Color: #c9a961
   ```

5. **Efectos y ajustes**
   ```
   - Drop shadow en textos (sutiles)
   - Ajustar kerning y leading
   - Verificar alineación
   ```

6. **Exportar**
   ```
   File → Export → Export As
   - Format: PNG
   - Quality: 100%
   - Metadata: None
   - Save
   ```

---

### Optimización de Imágenes OG

Después de crear la imagen, optimizarla para web:

#### Herramienta 1: TinyPNG (Recomendada)

**URL:** https://tinypng.com

**Proceso:**
1. Visitar TinyPNG
2. Arrastrar imagen PNG
3. Esperar compresión (suele lograr 50-70% reducción)
4. Descargar imagen optimizada
5. Renombrar a `og-image.png`

**Resultado esperado:**
- Original: ~800 KB
- Optimizado: ~250 KB
- Pérdida visual: Imperceptible

---

#### Herramienta 2: Squoosh (Alternativa)

**URL:** https://squoosh.app

**Proceso:**
1. Visitar Squoosh
2. Arrastrar imagen
3. Seleccionar formato: MozJPEG o WebP
4. Ajustar quality: 80-85
5. Comparar lado a lado
6. Descargar cuando satisfecho

**Ventaja:** Control total sobre compresión

---

### Instalación de Imagen OG

**Ubicación en el proyecto:**
```
/public/
├── og-image.png              ✅ PRINCIPAL (requerido)
├── og-image-home.png         ⚠️ Opcional (específica para home)
├── og-image-propiedades.png  ⚠️ Opcional (específica para propiedades)
├── og-image-blog.png         ⚠️ Opcional (específica para blog)
└── og-image.svg              ℹ️ Backup temporal (puede eliminarse)
```

**Paso a paso:**

1. **Copiar imagen optimizada**
   ```bash
   # Copiar archivo a /public/
   cp og-image-optimizado.png /public/og-image.png
   ```

2. **Verificar acceso**
   ```bash
   # Iniciar servidor
   npm run dev
   
   # Visitar en navegador
   http://localhost:3000/og-image.png
   
   # Debe mostrar la imagen
   ```

3. **Limpiar backup SVG (opcional)**
   ```bash
   # Si ya tienes PNG, puedes eliminar SVG
   rm /public/og-image.svg
   ```

4. **Verificar en metadata**
   - Visitar cualquier página del sitio
   - Ver código fuente (Ctrl+U)
   - Buscar: `<meta property="og:image"`
   - Debe apuntar a `/og-image.png`

---

### Imágenes OG Específicas por Sección

Para mejorar el CTR, crear imágenes específicas:

**Home:**
```
og-image-home.png
- Incluir: Vista panorámica de Andorra
- Texto: "500+ Propiedades en Andorra"
- Call to action: "Encuentra tu hogar ideal"
```

**Propiedades:**
```
og-image-propiedades.png
- Incluir: Collage de propiedades destacadas
- Texto: "Propiedades de Lujo"
- Estadística: "Desde €250,000"
```

**Blog:**
```
og-image-blog.png
- Incluir: Icono de blog o documentos
- Texto: "Blog Inmobiliario"
- Subtexto: "Noticias y Consejos"
```

**Uso en código:**
```typescript
// En página específica
export const metadata = generateMetadata({
  title: 'Propiedades',
  description: '...',
  url: generateUrl('/propiedades'),
  image: 'https://versusandorra.com/og-image-propiedades.png', // ← Específica
});
```

---

## 🎯 FAVICONS

### Especificaciones Técnicas

Los favicons son pequeños iconos que aparecen en pestañas del navegador, marcadores y home screens de dispositivos móviles.

#### Tamaños Requeridos

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `favicon.ico` | 32x32px | Navegadores antiguos, barra de direcciones |
| `favicon-16x16.png` | 16x16px | Pestaña navegador (pequeño) |
| `favicon-32x32.png` | 32x32px | Pestaña navegador (normal) |
| `apple-touch-icon.png` | 180x180px | iOS home screen, Safari |

#### Tamaños Opcionales

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `favicon-192x192.png` | 192x192px | Android Chrome |
| `favicon-512x512.png` | 512x512px | Android Chrome (alta resolución) |
| `favicon-dark.png` | 32x32px | Modo oscuro (experimental) |

---

### Crear Favicons

#### Opción 1: Real Favicon Generator (Recomendada - 3 minutos)

**URL:** https://realfavicongenerator.net/

**Proceso:**

1. **Preparar logo fuente**
   ```
   Requisitos:
   - Formato: PNG, SVG, o JPG
   - Tamaño mínimo: 260x260px
   - Fondo: Transparente (PNG) o blanco
   - Logo: Simple, reconocible en pequeño
   
   Ubicación en proyecto:
   /public/img/versusandorraMA-1.png
   ```

2. **Subir a generador**
   - Visitar https://realfavicongenerator.net/
   - Click "Select your Favicon image"
   - Subir logo

3. **Configurar opciones**
   
   **iOS/macOS:**
   - Background color: #1a1a1a (negro)
   - Margin: 10% (opcional)
   - Icon design: "Silhouette" si es monocromo

   **Android Chrome:**
   - Theme color: #c9a961 (dorado)
   - Background: #1a1a1a
   - Name: "Versus Andorra"

   **Windows Metro:**
   - Tile color: #c9a961
   - Silhouette: Sí

   **macOS Safari:**
   - Theme color: #c9a961

4. **Generar y descargar**
   - Scroll al final
   - Click "Generate your Favicons and HTML code"
   - Click "Favicon package" para descargar ZIP

5. **Extraer archivos**
   ```
   Descomprimir ZIP
   Archivos necesarios:
   ├── favicon.ico
   ├── favicon-16x16.png
   ├── favicon-32x32.png
   └── apple-touch-icon.png
   ```

---

#### Opción 2: Crear Manualmente (10 minutos)

Si tienes el logo en alta resolución, puedes crear los favicons manualmente:

**Herramientas necesarias:**
- Photoshop, GIMP, o editor online
- Logo original en alta resolución

**Proceso:**

1. **Crear favicon 32x32px**
   ```
   - Abrir logo en editor
   - Image → Image Size
   - Ancho: 32px, Alto: 32px
   - Resampling: Bicubic Sharper
   - Save As: favicon-32x32.png
   ```

2. **Crear favicon 16x16px**
   ```
   - Repetir proceso anterior
   - Tamaño: 16x16px
   - Nota: A este tamaño, simplificar logo si es complejo
   - Save As: favicon-16x16.png
   ```

3. **Crear Apple Touch Icon (180x180px)**
   ```
   - Tamaño: 180x180px
   - Agregar padding de 20px alrededor
   - Background: Transparente o color de marca
   - Save As: apple-touch-icon.png
   ```

4. **Crear favicon.ico**
   - Usar conversor online: https://convertio.co/png-ico/
   - Subir favicon-32x32.png
   - Convertir a ICO
   - Descargar como favicon.ico

---

### Instalación de Favicons

**Estructura de carpetas:**
```
/public/
└── favicon/
    ├── favicon.ico              ✅ Requerido
    ├── favicon-16x16.png        ✅ Requerido
    ├── favicon-32x32.png        ✅ Requerido
    ├── apple-touch-icon.png     ✅ Requerido
    ├── favicon-192x192.png      ⚠️ Opcional
    └── favicon-512x512.png      ⚠️ Opcional
```

**Paso a paso:**

1. **Copiar archivos**
   ```bash
   # Copiar todos los favicons a la carpeta
   cp favicon*.* /public/favicon/
   cp apple-touch-icon.png /public/favicon/
   ```

2. **Verificar configuración en layout**
   
   El layout (`/app/layout.tsx`) ya tiene la configuración:
   ```tsx
   export const metadata: Metadata = {
     icons: {
       icon: [
         { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
         { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
       ],
       shortcut: '/favicon/favicon.ico',
       apple: '/favicon/apple-touch-icon.png',
     },
   };
   ```

3. **Reiniciar servidor**
   ```bash
   # Detener servidor (Ctrl+C)
   # Reiniciar
   npm run dev
   ```

4. **Verificar funcionamiento**
   - Abrir http://localhost:3000
   - Verificar favicon en pestaña del navegador
   - Hacer hard refresh: Ctrl + Shift + R
   - Agregar a marcadores y verificar icono

---

### Troubleshooting Favicons

**Problema: Favicon no aparece**

Soluciones:
```bash
# 1. Limpiar caché del navegador
Ctrl + Shift + Delete → Limpiar caché

# 2. Hard refresh
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# 3. Verificar ruta en navegador
http://localhost:3000/favicon/favicon.ico
# Debe mostrar el icono

# 4. Verificar en incógnito
Abrir ventana incógnita
Visitar sitio
```

**Problema: Favicon aparece pixelado**

Causa: Tamaño incorrecto o mala calidad de imagen fuente

Solución:
- Usar logo en alta resolución como fuente
- Simplificar diseño para tamaños pequeños
- Usar Real Favicon Generator para optimización

**Problema: Favicon diferente en móvil**

Causa: Apple Touch Icon no configurado

Solución:
- Crear apple-touch-icon.png (180x180px)
- Colocar en `/public/favicon/`
- Verificar metadata en layout

---

## 🔧 OPTIMIZACIÓN DE ASSETS

### Mejores Prácticas

#### 1. Compresión de Imágenes

**Objetivo:** Reducir peso sin perder calidad visual

**Herramientas:**
- TinyPNG: Para PNG (hasta 70% reducción)
- Squoosh: Control manual de compresión
- ImageOptim: App desktop (Mac)
- JPEG-Optimizer: Para JPG específicamente

**Estándares:**
- Imágenes OG: < 300 KB
- Favicons: < 50 KB total
- Logos: < 100 KB

---

#### 2. Formatos Modernos

**WebP:**
```
Ventajas:
- 25-35% más pequeño que PNG/JPG
- Calidad similar o superior
- Soportado en navegadores modernos

Desventajas:
- No soportado en IE11
- Requiere fallback

Uso recomendado:
- Imágenes de contenido
- NO para favicons (mala compatibilidad)
- SÍ para OG images con fallback
```

**AVIF:**
```
Ventajas:
- 50% más pequeño que JPG
- Mejor calidad que WebP

Desventajas:
- Soporte limitado
- Procesamiento más lento

Uso recomendado:
- Futuro, no usar aún en producción
```

---

#### 3. Responsive Images

Para Open Graph, no es necesario responsive (siempre 1200x630px), pero para otros assets:

```tsx
// Ejemplo: Múltiples tamaños de logo
<Image
  src="/img/logo.png"
  alt="Versus Andorra"
  width={200}
  height={60}
  srcSet="
    /img/logo-1x.png 1x,
    /img/logo-2x.png 2x,
    /img/logo-3x.png 3x
  "
/>
```

---

#### 4. Lazy Loading

Para assets no críticos:

```tsx
// Logo en header: NO lazy load (crítico)
<Image src="/img/logo.png" priority />

// Imagen decorativa en footer: SÍ lazy load
<Image src="/img/footer-decor.png" loading="lazy" />
```

---

### Checklist de Optimización

Antes de subir assets a producción:

**Imágenes OG:**
- [ ] Dimensiones exactas (1200x630px)
- [ ] Formato PNG o JPG
- [ ] Peso < 300 KB
- [ ] Optimizado con TinyPNG
- [ ] Probado en Facebook Debugger
- [ ] Probado en Twitter Card Validator

**Favicons:**
- [ ] 4 archivos básicos presentes
- [ ] Tamaños correctos (16, 32, 180)
- [ ] Formato correcto (.ico, .png)
- [ ] Peso total < 50 KB
- [ ] Probado en navegadores principales
- [ ] Probado en móvil (iOS y Android)

**Logos:**
- [ ] Múltiples formatos (PNG, SVG)
- [ ] Versión light y dark (si aplica)
- [ ] Optimizados para web
- [ ] Fondo transparente
- [ ] Cargados con prioridad correcta

---

## 🐛 TROUBLESHOOTING

### Problemas Comunes y Soluciones

#### Imagen OG no se muestra en Facebook

**Síntomas:**
- Facebook muestra imagen por defecto o ninguna
- Preview no actualiza después de cambios

**Diagnóstico:**
```bash
# 1. Verificar que imagen existe
curl -I https://versusandorra.com/og-image.png
# Debe retornar 200 OK

# 2. Verificar metadata en HTML
curl https://versusandorra.com | grep "og:image"
# Debe mostrar tag con URL correcta

# 3. Usar Facebook Debugger
https://developers.facebook.com/tools/debug/
# Pegar URL y verificar errores
```

**Soluciones:**
```bash
# Solución 1: Forzar re-scrape en Facebook
- Ir a Facebook Debugger
- Pegar URL
- Click "Scrape Again"
- Esperar 10 segundos
- Verificar preview

# Solución 2: Verificar HTTPS
- OG images deben servirse por HTTPS
- Verificar que no hay mixed content

# Solución 3: Verificar dimensiones
- Mínimo 600x315px
- Recomendado 1200x630px
```

---

#### Favicon no actualiza después de cambio

**Síntomas:**
- Se ve favicon antiguo
- Incluso después de refresh

**Soluciones:**
```bash
# Solución 1: Hard refresh
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# Solución 2: Limpiar caché específico
# Chrome:
chrome://settings/clearBrowserData
- Time range: "All time"
- Only check "Cached images and files"
- Clear data

# Solución 3: Agregar version query
# Temporal: /favicon/favicon.ico?v=2
# En producción: usar contenthash

# Solución 4: Verificar en incógnito
Cmd/Ctrl + Shift + N
Visitar sitio
```

---

#### Imagen OG se muestra pixelada

**Síntomas:**
- Imagen borrosa en preview
- Se ve mal en móvil

**Diagnóstico:**
```bash
# Verificar dimensiones reales
identify og-image.png
# Output: og-image.png PNG 1200x630 ...

# Si dice menos de 600x315, es muy pequeña
```

**Soluciones:**
```bash
# 1. Recrear imagen en tamaño correcto
- Usar 1200x630px
- Exportar a PNG de alta calidad
- NO redimensionar desde imagen pequeña

# 2. Verificar compresión
- Si usaste TinyPNG o similar
- No debería perder calidad visible
- Si se ve mal, usar menor compresión

# 3. Probar diferentes formatos
- Intentar con JPG quality 85-90
- O PNG con menos optimización
```

---

#### Logo no aparece en header

**Síntomas:**
- Espacio en blanco donde debería estar logo
- Error 404 en consola

**Diagnóstico:**
```javascript
// Abrir DevTools (F12) → Console
// Ver si hay error 404

// Network tab
// Filtrar por "img"
// Ver si logo tiene status 404
```

**Soluciones:**
```bash
# Verificar ruta en código
# /components/layout/Header.tsx
<Image src="/img/versusandorraMA-1.png" ... />

# Verificar archivo existe
ls -la public/img/versusandorraMA-1.png

# Si no existe, copiar:
cp logo.png public/img/versusandorraMA-1.png

# Reiniciar servidor
npm run dev
```

---

## 📊 CHECKLIST FINAL

### Pre-Deploy a Producción

**Assets creados:**
- [ ] og-image.png (1200x630px, < 300KB)
- [ ] favicon.ico (32x32px)
- [ ] favicon-16x16.png
- [ ] favicon-32x32.png
- [ ] apple-touch-icon.png (180x180px)

**Optimización:**
- [ ] Todas las imágenes comprimidas
- [ ] Peso total de assets < 500KB
- [ ] Formatos correctos

**Testing:**
- [ ] Facebook Debugger sin errores
- [ ] Twitter Card Validator sin errores
- [ ] Favicons visibles en todos los navegadores
- [ ] Apple Touch Icon funciona en iOS
- [ ] Imágenes OG cargan en < 2s

**Producción:**
- [ ] Assets subidos a servidor
- [ ] URLs absolutas correctas
- [ ] HTTPS configurado
- [ ] CDN configurado (opcional)
- [ ] Cache headers correctos

---

## 📚 RECURSOS ADICIONALES

### Herramientas Online

**Generadores:**
- [Real Favicon Generator](https://realfavicongenerator.net/) - Generador completo de favicons
- [Favicon.io](https://favicon.io/) - Generador simple

**Optimización:**
- [TinyPNG](https://tinypng.com) - Compresión PNG/JPG
- [Squoosh](https://squoosh.app) - Control manual de compresión
- [ImageOptim](https://imageoptim.com/) - App desktop (Mac)

**Diseño:**
- [Canva](https://canva.com) - Diseño fácil de OG images
- [Figma](https://figma.com) - Diseño profesional
- [Remove.bg](https://remove.bg) - Remover fondo de imágenes

**Validación:**
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)

### Plantillas y Recursos

**Plantillas Canva:**
- Buscar "Open Graph Template"
- Filtrar por 1200 x 630 px
- Personalizar con colores de marca

**Bancos de imágenes (para fondos):**
- [Unsplash](https://unsplash.com) - Gratis, alta calidad
- [Pexels](https://pexels.com) - Gratis
- [Pixabay](https://pixabay.com) - Gratis

---

## 📝 NOTAS FINALES

### Mantenimiento

**Frecuencia de actualización:**
- Imágenes OG: Cada 6-12 meses o cuando cambie branding
- Favicons: Solo cuando cambie logo
- Assets de contenido: Según necesidad

**Versionado:**
```bash
# Usar contenthash en producción
og-image.abc123.png

# O query parameters
og-image.png?v=2

# Esto ayuda a cache busting
```

### Próximos Pasos

1. Crear imagen OG definitiva usando esta guía
2. Generar todos los favicons necesarios
3. Instalar y verificar assets
4. Testear en todas las plataformas
5. Monitorear rendimiento en producción

---

**Última actualización:** 2025-10-31  
**Versión:** 1.0  
**Mantenedor:** Equipo de desarrollo Versus Andorra
