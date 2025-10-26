# Fix: Imágenes de Miembros del Equipo - Media IDs sin _embed

**Fecha:** 2025-01-XX  
**Autor:** Asistente Técnico  
**Tipo:** Bug Fix  
**Prioridad:** Alta  
**Estado:** ✅ Implementado

---

## 📋 Problema Identificado

### Síntomas
- TXEMA ANAYA no mostraba su foto en la página `/nuestro-equipo`
- Se mostraba imagen genérica de fallback en su lugar
- Angela y Alejandro sí mostraban sus fotos correctamente

### Causa Raíz
WordPress devolvía `featured_media: 19727` (ID del media) para TXEMA, pero **NO incluía los datos embebidos** en `_embedded['wp:featuredmedia']`.

**Debug output:**
```
Miembro #3: TXEMA ANAYA
Featured Media ID: 19727  ✓ (existe)
Featured Media (embedded): NO  ✗ (falta la URL)
```

**Comparación con miembros que funcionaban:**
```
Miembro #1: Angela García
Featured Media ID: 19737  ✓
Featured Media (embedded): http://versusandorra.local/wp-content/uploads/2025/10/ANGELA-VERSUS-WEB.jpg  ✓

Miembro #2: Alejandro A. García  
Featured Media ID: 19735  ✓
Featured Media (embedded): http://versusandorra.local/wp-content/uploads/2025/10/ALEX-VERSUS-WEB.jpg  ✓
```

### Análisis
El parámetro `_embed=true` en la petición de WordPress **no garantiza** que todos los medias se incluyan. Posibles razones:
- Media eliminado pero ID huérfano en la base de datos
- Problema de permisos en ese attachment específico
- Corrupción parcial del registro del media
- Bug de WordPress con ese media en particular

---

## ✅ Solución Implementada

### Estrategia
**Resolución automática de media IDs faltantes** mediante fetch adicional a la API de WordPress.

### Cambios en `lib/wordpress.ts`

#### 1. Nueva función auxiliar: `getMediaById()`
```typescript
/**
 * Obtener datos completos de un media por ID
 * Función auxiliar para cuando _embed no incluye el media
 */
async function getMediaById(mediaId: number) {
  try {
    const media = await fetchAPI(`/wp/v2/media/${mediaId}`);
    return media;
  } catch (error) {
    return null;
  }
}
```

#### 2. Nueva función de resolución: `resolveMissingMedia()`
```typescript
/**
 * Resolver media IDs faltantes en _embed
 * Detecta miembros con featured_media ID pero sin _embedded['wp:featuredmedia']
 * y hace fetch de los media faltantes para inyectarlos en el objeto
 */
async function resolveMissingMedia(members: any[]) {
  // 1. Detectar miembros con media ID pero sin _embedded
  const membersNeedingMedia = members.filter(member => {
    const hasId = member.featured_media && member.featured_media > 0;
    const hasEmbedded = member._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return hasId && !hasEmbedded;
  });
  
  // 2. Hacer fetch de todos los medias faltantes en paralelo
  const mediaPromises = membersNeedingMedia.map(({ member }) => 
    getMediaById(member.featured_media)
  );
  const mediaResults = await Promise.all(mediaPromises);
  
  // 3. Inyectar los medias en _embedded
  membersNeedingMedia.forEach((member, i) => {
    const media = mediaResults[i];
    if (media?.source_url) {
      if (!member._embedded) member._embedded = {};
      member._embedded['wp:featuredmedia'] = [media];
    }
  });
  
  return members;
}
```

#### 3. Modificación de `getTeamMembers()`
```typescript
export async function getTeamMembers(params: WPQueryParams = {}) {
  // ... código existente ...
  
  // ANTES: return data;
  // AHORA:
  const resolvedData = await resolveMissingMedia(data);
  return resolvedData;
}
```

### Cambios en `app/nuestro-equipo/page.tsx`

#### Simplificación de `getImageUrl()`
- **Eliminado:** Fallback hardcoded que intentaba adivinar el nombre del archivo
- **Razón:** Ya no es necesario porque `resolveMissingMedia()` lo resuelve automáticamente

```typescript
// ANTES:
if (member.featured_media && !member._embedded) {
  // Construir URL manualmente (hardcoded)
  return `${baseUrl}/wp-content/uploads/2025/10/TXEMA-VERSUS-WEB.jpg`;
}

// AHORA:
// ✨ Ya no necesario - resolveMissingMedia() lo hace automáticamente
```

---

## 🔍 Cómo Funciona

### Flujo de Ejecución

1. **Petición inicial a WordPress**
   ```
   GET /wp/v2/agents?per_page=100&_embed=true
   ```

2. **Detección de medias faltantes**
   ```typescript
   resolveMissingMedia() detecta:
   - Angela: ✓ tiene _embed
   - Alejandro: ✓ tiene _embed  
   - TXEMA: ✗ NO tiene _embed pero SÍ tiene featured_media: 19727
   ```

3. **Fetch paralelo de medias faltantes**
   ```
   GET /wp/v2/media/19727
   ```

4. **Inyección de datos**
   ```typescript
   member._embedded['wp:featuredmedia'] = [mediaData];
   ```

5. **Renderizado normal**
   ```typescript
   getImageUrl(member) → encuentra _embedded → retorna URL correcta
   ```

### Ventajas de Esta Solución

✅ **Automática:** No requiere intervención manual  
✅ **Escalable:** Funciona con cualquier número de medias faltantes  
✅ **Eficiente:** Usa `Promise.all()` para fetch paralelo  
✅ **Resiliente:** Si un media falla, los demás siguen funcionando  
✅ **Transparente:** El resto del código no necesita cambios  
✅ **Documentada:** Logs en desarrollo muestran qué se resuelve  

---

## 🧪 Testing

### Paso 1: Verificar el servidor está corriendo
```bash
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"
npm run dev
```

### Paso 2: Abrir la página del equipo
```
http://localhost:3000/nuestro-equipo
```

### Paso 3: Verificar los logs en terminal
Deberías ver:
```
[WordPress API] Miembro "TXEMA ANAYA" necesita resolver media ID 19727
[WordPress API] Resolviendo 1 media(s) faltante(s)...
[WordPress API] Media ID 19727 obtenido: http://versusandorra.local/wp-content/uploads/...
[WordPress API] ✅ Media resuelto para "TXEMA ANAYA": http://...
```

### Paso 4: Verificar visualmente
- ✅ TXEMA debe mostrar su foto real (no imagen genérica)
- ✅ Angela y Alejandro siguen mostrando sus fotos
- ✅ Las 3 cards deben tener el mismo tamaño (h-96)

### Paso 5: Verificar en diferentes navegadores
- Chrome
- Firefox  
- Safari (si disponible)

---

## 🐛 Troubleshooting

### Problema: Sigue sin mostrar la foto de TXEMA

**Verificar en logs:**
```
[WordPress API] ❌ No se pudo resolver media ID 19727
```

**Posibles causas:**
1. **Media ID 19727 no existe en WordPress**
   - **Solución:** Entrar a WordPress admin → Biblioteca de medios → Buscar ID 19727
   - Si no existe: Subir nueva foto y actualizar "Imagen destacada" en TXEMA

2. **API de WordPress no responde**
   - **Verificar:** `curl http://versusandorra.local/wp-json/wp/v2/media/19727`
   - **Solución:** Verificar permisos de la API en WordPress

3. **Timeout en la petición**
   - **Logs mostrarán:** `Error obteniendo media ID 19727: AbortError`
   - **Solución:** Aumentar timeout en `fetchAPI()` de 5000ms a 10000ms

### Problema: Error de CORS

**Síntoma:**
```
Access to fetch at 'http://versusandorra.local/wp-json/...' from origin 'http://localhost:3000' has been blocked
```

**Solución:**
1. Verificar que WordPress tiene configurado CORS correctamente
2. Agregar en `wp-config.php`:
   ```php
   header('Access-Control-Allow-Origin: http://localhost:3000');
   header('Access-Control-Allow-Methods: GET, POST');
   ```

### Problema: El fix funciona pero es lento

**Si tarda >2 segundos en cargar la página:**

**Optimización 1:** Cachear el resultado
```typescript
// En getTeamMembers(), agregar:
export const revalidate = 3600; // 1 hora
```

**Optimización 2:** Usar ISR (Incremental Static Regeneration)
- Ya configurado en `app/nuestro-equipo/page.tsx`
- `export const revalidate = 3600;`

---

## 📝 Comandos Útiles

### Ver logs en desarrollo
```bash
npm run dev | grep "TEAM\|WordPress API"
```

### Limpiar caché de Next.js
```bash
rm -rf .next
npm run dev
```

### Hacer commit de los cambios
```bash
git add lib/wordpress.ts app/nuestro-equipo/page.tsx docs/fixes/
git commit -m "fix(team): resolver media IDs faltantes en _embed de miembros del equipo

- Agregada función resolveMissingMedia() para detectar y resolver media IDs huérfanos
- Implementado fetch automático a /wp/v2/media/{id} cuando _embed falla
- Simplificada función getImageUrl() eliminando hardcoded fallback
- Documentación completa en docs/fixes/TEAM_MEMBER_IMAGES_FIX.md

Fixes: Foto de TXEMA no se mostraba por featured_media sin _embedded"
```

---

## 🔮 Mejoras Futuras

### Implementación de caché de medias
```typescript
const mediaCache = new Map<number, any>();

async function getMediaById(mediaId: number) {
  if (mediaCache.has(mediaId)) {
    return mediaCache.get(mediaId);
  }
  
  const media = await fetchAPI(`/wp/v2/media/${mediaId}`);
  mediaCache.set(mediaId, media);
  return media;
}
```

### Retry automático con exponential backoff
```typescript
async function getMediaById(mediaId: number, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchAPI(`/wp/v2/media/${mediaId}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000); // 1s, 2s, 4s
    }
  }
}
```

### Monitoreo de medias faltantes
```typescript
// Agregar telemetría para detectar patrón
if (membersNeedingMedia.length > 0) {
  analytics.track('missing_embedded_media', {
    count: membersNeedingMedia.length,
    mediaIds: membersNeedingMedia.map(m => m.featured_media),
  });
}
```

---

## 📚 Referencias

- [WordPress REST API - Media Endpoint](https://developer.wordpress.org/rest-api/reference/media/)
- [WordPress REST API - Embedding](https://developer.wordpress.org/rest-api/using-the-rest-api/linking-and-embedding/)
- [Next.js ISR - Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Promise.all() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

---

## ✅ Checklist de Verificación

- [x] Función `getMediaById()` implementada
- [x] Función `resolveMissingMedia()` implementada
- [x] `getTeamMembers()` modificado para usar `resolveMissingMedia()`
- [x] Fallback hardcoded eliminado de `getImageUrl()`
- [x] Logs de debug agregados
- [x] Documentación completa creada
- [ ] Testing manual completado
- [ ] Foto de TXEMA se muestra correctamente
- [ ] Performance validado (<2s carga de página)
- [ ] Commit realizado con mensaje descriptivo

---

## 🎯 Resultado Esperado

**ANTES:**
```
[TEAM DEBUG] Miembro #3: TXEMA ANAYA
Featured Media ID: 19727
Featured Media (embedded): NO  ← ❌ Problema
→ Resultado: Imagen genérica
```

**DESPUÉS:**
```
[WordPress API] Miembro "TXEMA ANAYA" necesita resolver media ID 19727
[WordPress API] Resolviendo 1 media(s) faltante(s)...
[WordPress API] ✅ Media resuelto: http://versusandorra.local/wp-content/uploads/2025/10/TXEMA-VERSUS-WEB.jpg

[TEAM DEBUG] Miembro #3: TXEMA ANAYA
Featured Media ID: 19727
Featured Media (embedded): http://versusandorra.local/wp-content/uploads/2025/10/TXEMA-VERSUS-WEB.jpg  ← ✅ Resuelto
→ Resultado: Foto real de TXEMA
```

---

**Fin del documento**
