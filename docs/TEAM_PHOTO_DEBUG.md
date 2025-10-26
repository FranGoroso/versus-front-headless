# 🔍 DEBUGGING: Foto de TXEMA - Guía Completa

## 📋 Cambios Realizados

### ✅ 1. Cards Más Grandes
- **Antes:** h-64 (256px)
- **Ahora:** h-96 (384px) - **50% más grande** 🎉

### ✅ 2. Detección de Imágenes Mejorada
La función `getImageUrl()` ahora busca imágenes en **7 ubicaciones** diferentes:

1. Featured Media (embebido con _embed=true)
2. featured_media_url (URL directa)
3. acf.photo (campo ACF)
4. acf.image (campo ACF alternativo)
5. acf.profile_image (campo ACF perfil)
6. avatar_urls (avatares de usuario WP)
7. image_url (URL directa alternativa)

### ✅ 3. Logging de Debug Activado
Logs en consola del servidor para ver exactamente qué datos llegan de WordPress.

---

## 🔍 CÓMO VERIFICAR EL PROBLEMA

### Paso 1: Ver los Logs del Servidor

1. **Detener el servidor** (Ctrl+C)
2. **Reiniciar con logs visibles:**
   ```bash
   npm run dev
   ```
3. **Abrir la página:**
   ```
   http://localhost:3000/nuestro-equipo
   ```
4. **Ver la consola del terminal** (donde corre npm run dev)
5. **Buscar estos logs:**
   ```
   ============================================================
   [TEAM DEBUG] Datos recibidos de WordPress:
   ============================================================

   Miembro #1:
   Nombre: TXEMA
   Featured Media ID: 123
   Featured Media (embedded): http://...
   ACF Photo: http://... o NO
   ACF Image: http://... o NO
   Avatar URLs: 3 tamaños o NO
   ============================================================
   ```

### Paso 2: Interpretar los Resultados

#### ✅ CASO A: Featured Media funciona
```
Featured Media (embedded): http://versusandorra.local/wp-content/uploads/2024/10/txema.jpg
```
**Solución:** Ya debería funcionar con el código actualizado.

#### ⚠️ CASO B: Solo hay Featured Media ID
```
Featured Media ID: 123
Featured Media (embedded): NO
```
**Problema:** Falta el parámetro `_embed=true` en la petición.
**Solución:** Verificar que `getTeamMembers()` use `_embed=true`.

#### ⚠️ CASO C: Solo hay ACF Photo
```
Featured Media ID: 0
Featured Media (embedded): NO
ACF Photo: http://versusandorra.local/wp-content/uploads/txema.jpg
```
**Solución:** El código actualizado ya lo detecta.

#### ❌ CASO D: No hay imágenes
```
Featured Media ID: 0
Featured Media (embedded): NO
ACF Photo: NO
ACF Image: NO
Avatar URLs: NO
```
**Problema:** La imagen no está configurada en WordPress.
**Solución:** Ver "Paso 3" abajo.

---

### Paso 3: Verificar en WordPress

#### A. Verificar el Post Type correcto

1. **Ir a WordPress Admin:**
   ```
   http://versusandorra.local/wp-admin
   ```

2. **Buscar el menú del equipo:**
   - Puede ser: "Agentes", "Equipo", "Team", "Team Members"

3. **Encontrar a TXEMA en la lista**

4. **Click en "Editar"**

#### B. Verificar Imagen Destacada

1. En el editor de TXEMA
2. **Buscar en el sidebar derecho:**
   ```
   ┌─────────────────────┐
   │ Imagen destacada    │
   │ ┌─────────────────┐ │
   │ │                 │ │
   │ │  [FOTO TXEMA]   │ │
   │ │                 │ │
   │ └─────────────────┘ │
   │ [Establecer imagen] │
   └─────────────────────┘
   ```

3. **Si no hay imagen:**
   - Click en "Establecer imagen destacada"
   - Subir la foto de TXEMA
   - Click en "Establecer imagen destacada"
   - Click en "Actualizar" arriba

#### C. Verificar Campos ACF (si se usan)

1. En el editor de TXEMA
2. **Scroll hacia abajo**
3. **Buscar sección "Campos personalizados" o grupo ACF**
4. **Verificar estos campos:**
   - `photo` o `Photo`
   - `image` o `Image`
   - `profile_image` o `Profile Image`

5. **Si hay campo pero está vacío:**
   - Click en "Añadir imagen" o botón similar
   - Seleccionar/subir foto de TXEMA
   - Click en "Actualizar" arriba

#### D. Verificar la URL de la imagen

1. **Con la imagen ya configurada**
2. **Click derecho sobre la imagen**
3. **"Copiar dirección de imagen"**
4. **Pegar en navegador y verificar que carga**

---

### Paso 4: Verificar API de WordPress

1. **Abrir en navegador:**
   ```
   http://versusandorra.local/wp-json/wp/v2/agents?_embed=true
   ```

2. **O probar estos otros endpoints:**
   ```
   http://versusandorra.local/wp-json/wp/v2/team?_embed=true
   http://versusandorra.local/wp-json/wp/v2/team_members?_embed=true
   http://versusandorra.local/wp-json/wp/v2/equipo?_embed=true
   ```

3. **Buscar el objeto JSON de TXEMA**

4. **Verificar que tiene:**
   ```json
   {
     "id": 123,
     "title": {
       "rendered": "TXEMA"
     },
     "featured_media": 456,
     "_embedded": {
       "wp:featuredmedia": [
         {
           "source_url": "http://versusandorra.local/wp-content/uploads/txema.jpg"
         }
       ]
     }
   }
   ```

---

## 🛠️ SOLUCIONES RÁPIDAS

### Solución 1: Volver a subir la imagen

1. Ir al editor de TXEMA en WordPress
2. Quitar la imagen destacada actual (si hay)
3. Subir la foto de nuevo
4. Establecer como imagen destacada
5. Guardar/Actualizar
6. Refrescar página de equipo en Next.js

### Solución 2: Usar URL directa (temporal)

Si WordPress no funciona, puedo modificar el código para usar una URL directa:

```typescript
// En getImageUrl(), agregar esto al principio:
if (member.id === 123) { // ID de TXEMA
  return 'http://versusandorra.local/wp-content/uploads/2024/10/txema-foto.jpg';
}
```

### Solución 3: Verificar permisos de archivos

```bash
# En el servidor de WordPress
cd wp-content/uploads/
ls -la

# Verificar que los archivos tienen permisos de lectura
# Si no, ejecutar:
chmod 644 *.jpg *.png
```

---

## 📊 Checklist de Verificación

- [ ] Logs del servidor revisados
- [ ] TXEMA aparece en los logs
- [ ] Featured Media ID existe
- [ ] Featured Media URL está presente (o NO)
- [ ] ACF Photo verificado (o NO)
- [ ] Imagen destacada configurada en WordPress
- [ ] URL de imagen funciona en navegador
- [ ] API de WordPress retorna datos correctos
- [ ] Página refrescada con hard reload (Ctrl+Shift+R)

---

## 🎯 Qué Esperar Después de los Cambios

### Cards más grandes:
- Las fotos ahora miden **384px de alto** (vs 256px antes)
- Mejor visibilidad de las caras
- Más profesional

### Mejor detección:
- Busca en 7 lugares diferentes
- Logs de warning si no encuentra imagen
- Fallback elegante a imagen genérica

---

## 📞 Siguiente Paso

1. **Reiniciar servidor** Next.js
2. **Abrir** http://localhost:3000/nuestro-equipo
3. **Ver logs** en la terminal
4. **Compartir** lo que dice en los logs para TXEMA
5. **Verificar WordPress** si los logs muestran "NO" en todas las imágenes

---

## 📝 Archivos Modificados

```
app/nuestro-equipo/page.tsx           [MODIFICADO]
├── getImageUrl() - 7 búsquedas
├── height h-64 → h-96
└── console.log debug agregado

lib/debug-team.ts                     [NUEVO]
└── Utilidades de debugging

docs/TEAM_PHOTO_DEBUG.md             [NUEVO]
└── Esta documentación
```

---

**Estado:** ✅ Código actualizado - Cards más grandes  
**Pendiente:** 🔍 Verificar logs para diagnosticar foto de TXEMA

Una vez que veas los logs, sabré exactamente qué está pasando! 🚀
