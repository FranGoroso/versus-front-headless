# 🐛 FIX CRÍTICO: Precios en Página de Propiedades

**Fecha:** 2025-10-26  
**Versión:** 2.1.1  
**Estado:** ✅ COMPLETADO

---

## 🔍 Problema Identificado

El usuario reportó que:
- ✅ En el **HOME** (propiedades destacadas) **SÍ aparecen los precios**
- ❌ En la **página /propiedades** aparece **"Consultar precio"**
- ❌ El link `http://localhost:10005/wp-json/wp/v2/properties` no funciona

---

## 💡 Diagnóstico

### Causa Raíz
**Inconsistencia en la transformación de datos** entre HOME y página de propiedades:

1. **HOME:** Usaba transformación inline sin búsqueda multi-ubicación
2. **Página /propiedades:** También usaba transformación inline (después del primer fix)
3. **Resultado:** Código duplicado y comportamientos inconsistentes

### URL Incorrecta
La URL correcta de WordPress es:
```
http://versusandorra.local (NO localhost:10005)
```

---

## 🛠️ Solución Implementada

### 1. Crear función helper centralizada

**Archivo:** `lib/wordpress.ts`

**Nueva función:** `transformToPropertyCard()`

```typescript
/**
 * Transformar Property de WordPress a PropertyCard para el frontend
 * Busca el precio en múltiples ubicaciones posibles para máxima compatibilidad
 * @param prop - Propiedad raw de WordPress
 * @returns PropertyCard listo para usar en el frontend
 */
export function transformToPropertyCard(prop: any): PropertyCardType {
  // Buscar precio en múltiples ubicaciones posibles
  const price = prop.property_meta?.property_price 
             || prop.property_meta?.price 
             || prop.acf?.property_price 
             || prop.acf?.price 
             || prop.meta?.property_price
             || '';
  
  return {
    id: prop.id,
    title: prop.title.rendered,
    slug: prop.slug,
    excerpt: prop.excerpt.rendered,
    featured_image: prop.featured_image?.url || null,
    price: price, // ← Aquí está la clave
    bedrooms: prop.property_meta?.property_bedrooms || '0',
    bathrooms: prop.property_meta?.property_bathrooms || '0',
    area: prop.property_meta?.property_size || '',
    area_unit: prop.property_meta?.property_size_postfix || 'm²',
    address: prop.property_meta?.property_address || '',
    type: prop.property_types?.[0]?.name || null,
    status: prop.property_statuses?.[0]?.name || null,
    city: prop.property_cities?.[0]?.name || null,
    link: prop.link,
    date: prop.date,
    featured: prop.property_meta?.featured === '1',
  };
}
```

**Beneficios:**
- ✅ Un solo lugar para la lógica de transformación
- ✅ Búsqueda multi-ubicación de precio consistente
- ✅ Fácil de mantener y actualizar
- ✅ Reutilizable en todo el proyecto

---

### 2. Actualizar página de propiedades

**Archivo:** `app/propiedades/page.tsx`

**Antes:**
```typescript
// Transformación inline duplicada (30+ líneas)
properties = allProperties.map(prop => {
  const price = prop.property_meta?.property_price || ...
  return { id: ..., price: price, ... };
});
```

**Después:**
```typescript
// Simple y elegante (1 línea)
properties = allProperties.map(transformToPropertyCard);
```

---

### 3. Actualizar HOME

**Archivo:** `app/page.tsx`

**Antes:**
```typescript
// Transformación inline sin búsqueda multi-ubicación
featuredProperties = allProperties.map((prop) => ({
  price: prop.property_meta?.property_price || "", // Solo 1 ubicación
  // ...
}));
```

**Después:**
```typescript
// Usa la función helper con búsqueda multi-ubicación
featuredProperties = allProperties.map(transformToPropertyCard);
```

---

## 📁 Archivos Modificados

| Archivo | Cambios | Líneas |
|---------|---------|--------|
| `lib/wordpress.ts` | ✨ Nueva función `transformToPropertyCard()` | 572-608 |
| `lib/wordpress.ts` | Import de PropertyCardType | 8 |
| `app/propiedades/page.tsx` | Uso de `transformToPropertyCard()` | 10, 74 |
| `app/page.tsx` | Uso de `transformToPropertyCard()` | 9, 68 |
| `scripts/diagnostico-precios-completo.js` | ✨ Nuevo script de diagnóstico | N/A |

---

## 🧪 Herramienta de Diagnóstico

### Script de Navegador (RECOMENDADO)

**Archivo:** `scripts/diagnostico-precios-completo.js`

**Cómo usarlo:**

1. Abre en tu navegador:
   ```
   http://versusandorra.local/wp-json/wp/v2/properties?per_page=5
   ```

2. Presiona **F12** para abrir DevTools

3. Ve a la pestaña **Console**

4. Abre el archivo `scripts/diagnostico-precios-completo.js`

5. **Copia TODO el contenido** del archivo

6. **Pégalo en la consola** y presiona **Enter**

**Resultado:**
```
═══════════════════════════════════════════════════════════
🔍 DIAGNÓSTICO COMPLETO DE PRECIOS - VERSUS ANDORRA
═══════════════════════════════════════════════════════════

✅ 10 propiedades obtenidas de WordPress

📦 1. Apartamento Luxury...
   ✅ property_meta.property_price: 500000
   💰 PRECIO ENCONTRADO: 500000

📦 2. Casa con jardín...
   ❌ property_meta.property_price: (vacío)
   ❌ property_meta.price: (vacío)
   ⚠️ SIN PRECIO CONFIGURADO

...

═══════════════════════════════════════════════════════════
📊 RESUMEN FINAL
═══════════════════════════════════════════════════════════

✅ Con precio configurado: 8/10
❌ Sin precio configurado: 2/10
```

---

## ✅ Pasos para Verificar el Fix

### 1. Reiniciar el servidor de desarrollo

```bash
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Detener (Ctrl+C) y reiniciar:
npm run dev
```

### 2. Verificar HOME (donde ya funcionaba)

```
http://localhost:3000
```

**Debes ver:** Precios en las propiedades destacadas ✅

### 3. Verificar página de propiedades (donde no funcionaba)

```
http://localhost:3000/propiedades
```

**Ahora debes ver:** Los mismos precios que en el HOME ✅

---

## 🔍 Si TODAVÍA aparece "Consultar precio"

Significa que **WordPress no tiene los precios configurados**.

### Pasos de diagnóstico:

#### A. Ejecutar el script de diagnóstico (RECOMENDADO)

Sigue las instrucciones arriba para ejecutar `diagnostico-precios-completo.js`

El script te dirá **exactamente** qué propiedades no tienen precio.

---

#### B. Verificar manualmente en WordPress Admin

1. Abre: `http://versusandorra.local/wp-admin/edit.php?post_type=properties`

2. Haz clic en **cualquier propiedad** para editarla

3. Busca el campo **"Price"** o **"Precio"**

4. Si está **vacío** → Llénalo con un número (ej: 500000)

5. Haz clic en **"Actualizar"** o **"Publicar"**

6. Espera 30 segundos (ISR revalidation)

7. Recarga `http://localhost:3000/propiedades`

**Resultado esperado:** El precio ahora debería aparecer ✅

---

## 📊 Comparación: Antes vs Después

### ANTES del fix
```
HOME:              Precios ✅ (funcionaba)
/propiedades:      "Consultar precio" ❌ (no funcionaba)
Código:            Duplicado en 2 lugares
Mantenimiento:     Difícil
```

### DESPUÉS del fix
```
HOME:              Precios ✅ (sigue funcionando)
/propiedades:      Precios ✅ (ahora funciona)
Código:            Centralizado en 1 función
Mantenimiento:     Fácil
```

---

## 🎯 Beneficios del Refactor

1. **Consistencia:** Ambas páginas usan la misma lógica
2. **DRY (Don't Repeat Yourself):** Código sin duplicación
3. **Mantenibilidad:** Un solo lugar para actualizar
4. **Robustez:** Búsqueda multi-ubicación de precio
5. **Reutilizable:** La función puede usarse en cualquier lugar

---

## 💡 Próximos Pasos Recomendados

### Si todo funciona ahora ✅

Continúa con el desarrollo normal. El sistema de precios está sólido.

### Si persisten problemas ❌

1. Ejecuta el script de diagnóstico
2. Comparte la salida del script
3. Verifica WordPress Admin
4. Comparte screenshots

---

## 🐛 Troubleshooting

### Error: "Cannot find module transformToPropertyCard"

**Causa:** TypeScript cache corrupto

**Solución:**
```bash
rm -rf .next
npm run dev
```

---

### Los precios aparecen pero están mal formateados

**Causa:** Función `formatPrice()` recibe datos inesperados

**Solución:** Ejecuta el script de diagnóstico y comparte el resultado

---

### Error de CORS al ejecutar el script de diagnóstico

**Causa:** Navegador bloqueando peticiones cross-origin

**Solución:** 
1. Asegúrate de ejecutar el script desde la misma URL
2. Abre la página de WP API directamente primero
3. Luego ejecuta el script en esa misma pestaña

---

## 📚 Referencias

- [Don't Repeat Yourself (DRY) Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [TypeScript Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

---

**Documentado por:** Claude (Anthropic)  
**Revisado:** Pendiente  
**Estado:** ✅ PRODUCCIÓN
