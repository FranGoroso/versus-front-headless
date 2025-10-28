# DEBUG DE FILTROS - PROPIEDADES

## PROBLEMA ACTUAL
Los filtros de propiedades no funcionan correctamente. Al seleccionar cualquier filtro, no se muestran propiedades.

## CAMBIOS REALIZADOS
Se han agregado logs de debug extensivos en `/app/propiedades/page.tsx` para diagnosticar el problema:

1. **[DEBUG DATOS]**: Muestra la estructura de las propiedades obtenidas de WordPress
2. **[DEBUG FILTRO TIPO]**: Muestra el proceso de filtrado por tipo de propiedad
3. **[DEBUG FILTRO CIUDAD]**: Muestra el proceso de filtrado por ciudad/parroquia

## PASOS PARA DIAGNOSTICAR

### 1. Iniciar el servidor de desarrollo
```bash
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"
npm run dev
```

### 2. Abrir la página de propiedades
Navegar a: http://localhost:3000/propiedades

### 3. Revisar la consola del servidor
Deberías ver logs como:
```
[DEBUG DATOS] Total propiedades obtenidas: X
[DEBUG DATOS] Estructura de la primera propiedad: { ... }
```

### 4. Aplicar un filtro
Por ejemplo, selecciona "Apartamento" en el filtro de tipo.

### 5. Revisar logs del filtro
Busca en la consola:
```
[DEBUG FILTRO TIPO] Filtrando por tipo: apartamento
[DEBUG FILTRO TIPO] Propiedades antes del filtro: X
[DEBUG FILTRO TIPO] Ejemplo de propiedad: { ... }
[DEBUG FILTRO TIPO] [nombre propiedad] - type: X - slug generado: X - matches: true/false
[DEBUG FILTRO TIPO] Propiedades después del filtro: X
```

## QUÉ BUSCAR EN LOS LOGS

### Problema esperado #1: Slugs no coinciden
**Síntoma**: 
```
[DEBUG FILTRO TIPO] Apartamento Centro - type: Apartamento - slug generado: apartamento - matches: true
```
Pero luego:
```
[DEBUG FILTRO TIPO] Propiedades después del filtro: 0
```

**Causa**: Los slugs generados desde el `name` no coinciden con los slugs de WordPress.

**Solución**: Modificar `transformToPropertyCard` en `/lib/wordpress.ts` para guardar también los slugs de las taxonomías.

### Problema esperado #2: Datos no se cargan
**Síntoma**:
```
[DEBUG DATOS] Total propiedades obtenidas: 0
```

**Causa**: WordPress no está devolviendo propiedades o la conexión falla.

**Solución**: Verificar:
- WordPress está corriendo en http://versusandorra.local
- El endpoint `/wp-json/wp/v2/properties` está accesible
- Las propiedades tienen taxonomías asignadas

### Problema esperado #3: Taxonomías vacías
**Síntoma**:
```
[DEBUG DATOS] Estructura de la primera propiedad: {
  title: "...",
  type: null,
  city: null,
  ...
}
```

**Causa**: Las taxonomías no se están extrayendo correctamente de WordPress.

**Solución**: Verificar la función `extractTaxonomiesFromEmbed` en `/lib/wordpress.ts`.

## SIGUIENTES PASOS

Una vez identifiquemos el problema exacto en los logs, aplicaremos una de estas soluciones:

### Solución A: Guardar slugs en transformToPropertyCard
Modificar `transformToPropertyCard` para extraer también el slug:
```typescript
type: prop.property_types?.[0]?.name || null,
typeSlug: prop.property_types?.[0]?.slug || null,
city: prop.property_cities?.[0]?.name || null,
citySlug: prop.property_cities?.[0]?.slug || null,
```

Y luego comparar directamente con el slug:
```typescript
if (filterTipo) {
  allProperties = allProperties.filter(property => property.typeSlug === filterTipo);
}
```

### Solución B: Mejorar la conversión name → slug
Crear una función robusta que convierta nombres a slugs:
```typescript
function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
}
```

### Solución C: Filtrar en WordPress API
Pasar los filtros directamente a WordPress en lugar de filtrar en Next.js:
```typescript
getProperties({ 
  per_page: 100,
  property_type: filterTipo,
  property_city: filterCiudad,
  // ...
});
```

## INFORMACIÓN DE CONTACTO Y VERSIÓN
- **Archivo principal**: `/app/propiedades/page.tsx` v4.1.0
- **Logs agregados**: 2025-10-28
- **Estado**: Diagnóstico en progreso

---

**IMPORTANTE**: Una vez resuelto el problema, ELIMINAR todos los console.log de debug del código de producción.
