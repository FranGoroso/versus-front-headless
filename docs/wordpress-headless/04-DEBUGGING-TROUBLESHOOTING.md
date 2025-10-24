# 🐛 GUÍA DE DEBUGGING Y TROUBLESHOOTING

**WordPress Headless** - Versus Andorra  
Solución de problemas comunes y técnicas de debugging

---

## 📋 ÍNDICE

1. [Configuración de Debugging](#configuración-de-debugging)
2. [Problemas Comunes y Soluciones](#problemas-comunes-y-soluciones)
3. [Herramientas de Debugging](#herramientas-de-debugging)
4. [Logs y Monitoreo](#logs-y-monitoreo)
5. [Checklist de Verificación](#checklist-de-verificación)

---

## 1. CONFIGURACIÓN DE DEBUGGING

### 1.1 WordPress Debug Mode

#### Habilitar WP_DEBUG en wp-config.php

**Ubicación:** `C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php`

```php
// Debugging completo para desarrollo
define( 'WP_DEBUG', true );           // Habilita modo debug
define( 'WP_DEBUG_LOG', true );        // Guarda errores en log
define( 'WP_DEBUG_DISPLAY', false );   // No muestra errores en pantalla
define( 'SCRIPT_DEBUG', true );        // Usa versiones no minificadas
@ini_set( 'display_errors', 0 );       // Oculta errores en frontend

// Configuración de logs
@ini_set( 'error_log', WP_CONTENT_DIR . '/debug.log' );
@ini_set( 'log_errors', 'On' );
```

#### Verificar Configuración
```bash
# Ver archivo de log
tail -f wp-content/debug.log

# Verificar que WP_DEBUG está activo
wp config get WP_DEBUG
```

---

### 1.2 Plugin Headless Debug

El plugin `versus-headless-api` ya incluye logging automático:

```php
// El plugin logea automáticamente:
// - Activación/desactivación
// - Errores en endpoints
// - Peticiones en desarrollo
```

**Ver logs del plugin:**
```bash
grep "Versus Headless" wp-content/debug.log
```

---

### 1.3 Next.js Debug Mode

#### Variables de Entorno
**.env.local**
```env
# Habilitar logs detallados
NODE_ENV=development
NEXT_PUBLIC_ENABLE_API_LOGS=true

# Para debugging de builds
NEXT_PUBLIC_ANALYZE=true
```

#### Console Logs en lib/wordpress.ts
Ya implementado:
```typescript
if (IS_DEV) {
  console.log(`[WordPress API] Fetching: ${url}`);
  console.log(`[WordPress API] Response status: ${response.status}`);
}
```

---

## 2. PROBLEMAS COMUNES Y SOLUCIONES

### 🔴 Error 1: CORS Error

#### Síntoma
```
Access to fetch at 'http://versusandorra.local/wp-json/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

#### Causa
- Plugin versus-headless-api no está activado
- Headers CORS no se están enviando

#### Solución

**Paso 1: Verificar plugin activo**
```bash
wp plugin list | grep versus-headless-api
# Debe mostrar: active
```

**Paso 2: Activar si no está activo**
```bash
wp plugin activate versus-headless-api
```

**Paso 3: Verificar headers en respuesta**
```bash
curl -I http://versusandorra.local/wp-json/wp/v2/properties | grep -i "access-control"

# Debe mostrar:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
```

**Paso 4: Si no funciona, reiniciar servidor Local**
```
Local → Stop Site → Start Site
```

---

### 🔴 Error 2: 404 Not Found en Endpoints

#### Síntoma
```json
{
  "code": "rest_no_route",
  "message": "No se encontró ninguna ruta",
  "data": { "status": 404 }
}
```

#### Causa
- Permalinks no configurados correctamente
- Rewrite rules no actualizados

#### Solución

**Paso 1: Configurar permalinks**
```bash
wp rewrite structure '/%postname%/' --hard
```

**Paso 2: Flush rewrite rules**
```bash
wp rewrite flush --hard
```

**Paso 3: Verificar desde admin**
```
1. Ir a: Settings → Permalinks
2. Seleccionar: "Post name"
3. Click "Save Changes"
```

**Paso 4: Probar endpoint**
```bash
curl http://versusandorra.local/wp-json/
# Debe retornar JSON, no HTML 404
```

---

### 🔴 Error 3: 401 Unauthorized

#### Síntoma
```json
{
  "code": "rest_cookie_invalid_nonce",
  "message": "Cookie nonce is invalid",
  "data": { "status": 401 }
}
```

#### Causa
- Endpoint requiere autenticación
- Plugin no está permitiendo acceso público

#### Solución

**Para desarrollo (ya implementado en el plugin):**
```php
// En versus-headless-api.php
public function allow_unauthenticated_requests($result) {
    if (is_wp_error($result)) {
        if ($this->is_development()) {
            return true; // Permite acceso sin autenticación
        }
    }
    return $result;
}
```

**Verificar que el plugin está activo:**
```bash
wp plugin list --status=active | grep versus
```

---

### 🔴 Error 4: Propiedades No Aparecen

#### Síntoma
- Endpoint retorna array vacío: `[]`
- O retorna `{"properties": [], "total": 0}`

#### Diagnóstico

**Paso 1: Verificar que existen propiedades**
```bash
wp post list --post_type=property --format=table
```

**Paso 2: Verificar estado de publicación**
```bash
wp post list --post_type=property --post_status=publish --format=table
```

#### Solución

**Si no hay propiedades:**
```bash
# Crear una propiedad de prueba
wp post create \
  --post_type=property \
  --post_title="Apartamento de Prueba" \
  --post_content="Descripción de prueba" \
  --post_status=publish
```

**Si hay propiedades pero no aparecen:**
```bash
# Verificar que Easy Real Estate está activo
wp plugin list | grep easy-real-estate

# Activar si no está activo
wp plugin activate easy-real-estate

# Verificar que property está en REST API
wp post-type get property --field=show_in_rest
# Debe retornar: 1
```

---

### 🔴 Error 5: Imágenes No Cargan

#### Síntoma
- Next.js Image muestra error
- `featured_image` es null o URL inválida

#### Diagnóstico

**Verificar featured_image en API:**
```bash
curl http://versusandorra.local/wp-json/wp/v2/properties/123 | jq '.featured_image'
```

#### Solución

**Paso 1: Verificar imagen existe en WordPress**
```bash
wp media list --post_id=123
```

**Paso 2: Verificar next.config.js**
```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'versusandorra.local',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};
```

**Paso 3: Reiniciar Next.js dev server**
```bash
# Ctrl+C para parar
npm run dev
```

---

### 🔴 Error 6: Meta Fields Vacíos

#### Síntoma
```json
{
  "id": 123,
  "property_meta": {},
  "gallery": []
}
```

#### Causa
- Meta fields no están guardados
- Prefijo de meta fields incorrecto

#### Diagnóstico

**Ver meta fields de una propiedad:**
```bash
wp post meta list 123
```

#### Solución

**Verificar prefijos en el plugin:**
```php
// En versus-headless-api.php
// El plugin busca campos con estos prefijos:
if (strpos($key, 'REAL_HOMES_') === 0) { ... }
```

**Si los meta fields tienen otro prefijo, actualizar el plugin.**

---

### 🔴 Error 7: Búsqueda No Funciona

#### Síntoma
- Endpoint `/versus/v1/properties/search` retorna todas las propiedades
- Filtros no se aplican

#### Diagnóstico

**Probar búsqueda con curl:**
```bash
curl -X POST http://versusandorra.local/wp-json/versus/v1/properties/search \
  -H "Content-Type: application/json" \
  -d '{"min_price": 300000, "max_price": 500000}'
```

#### Solución

**Verificar que los meta fields existen:**
```bash
# Ver qué meta fields tienen las propiedades
wp post meta list {property_id} | grep REAL_HOMES_property_price
```

**Si no existen, crearlos:**
```bash
wp post meta add {property_id} REAL_HOMES_property_price 350000
wp post meta add {property_id} REAL_HOMES_property_bedrooms 3
wp post meta add {property_id} REAL_HOMES_property_bathrooms 2
wp post meta add {property_id} REAL_HOMES_property_size 120
```

---

### 🔴 Error 8: Next.js Build Falla

#### Síntoma
```
Error: Failed to fetch data from WordPress API
Type error: Cannot read properties of undefined
```

#### Causa
- WordPress no está accesible durante build
- Funciones async no esperan correctamente

#### Solución

**Opción 1: Build con WordPress corriendo**
```bash
# 1. Asegurar que Local WordPress está corriendo
# 2. Luego hacer build
npm run build
```

**Opción 2: Usar fallback data**
```typescript
// En lib/wordpress.ts
export async function getAllProperties() {
  try {
    const response = await fetch(...);
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Retornar array vacío en vez de error
    return [];
  }
}
```

---

## 3. HERRAMIENTAS DE DEBUGGING

### 3.1 Chrome DevTools

#### Network Tab
```
1. Abrir Chrome DevTools (F12)
2. Tab "Network"
3. Filtrar por "Fetch/XHR"
4. Ver peticiones a wp-json
```

**Qué verificar:**
- ✅ Status: 200 OK
- ✅ Response Type: application/json
- ✅ CORS headers presentes
- ✅ Response time < 2s

---

### 3.2 WP-CLI

#### Comandos Útiles
```bash
# Estado del sitio
wp --info

# Ver plugins activos
wp plugin list --status=active

# Ver configuración
wp config list

# Ver rutas REST API
wp rest list-routes

# Debug de permisos
wp rest check-permissions /wp/v2/properties

# Cache (si WP Rocket está activo)
wp rocket clean --confirm
```

---

### 3.3 Postman / Insomnia

#### Crear Collection para Testing

**Properties Endpoint:**
```
GET http://versusandorra.local/wp-json/wp/v2/properties?per_page=5
```

**Search Endpoint:**
```
POST http://versusandorra.local/wp-json/versus/v1/properties/search
Content-Type: application/json

{
  "min_price": 200000,
  "max_price": 400000,
  "city": "andorra-la-vella"
}
```

---

### 3.4 Query Monitor (Plugin WordPress)

**Instalar:**
```bash
wp plugin install query-monitor --activate
```

**Uso:**
1. Activar en wp-admin
2. Ver barra de admin en frontend
3. Click en "QM" para ver queries, hooks, etc.

**Útil para:**
- Ver queries SQL lentas
- Detectar N+1 queries
- Ver hooks ejecutándose
- Tiempos de carga

---

## 4. LOGS Y MONITOREO

### 4.1 WordPress Debug Log

**Ubicación:** `wp-content/debug.log`

**Ver en tiempo real:**
```bash
tail -f wp-content/debug.log
```

**Filtrar por plugin:**
```bash
grep "Versus Headless" wp-content/debug.log
```

**Ver últimas 50 líneas:**
```bash
tail -n 50 wp-content/debug.log
```

---

### 4.2 Next.js Console Logs

**Durante desarrollo:**
- Logs aparecen en terminal donde corre `npm run dev`
- También en Chrome DevTools → Console

**Filtrar logs:**
```javascript
// En Chrome Console
// Filtrar por "[WordPress API]"
```

---

### 4.3 Local by Flywheel Logs

**Ver logs del servidor:**
```
Local → Site → Open Site Shell
cd logs
tail -f nginx-access.log
tail -f nginx-error.log
tail -f php-error.log
```

---

### 4.4 Custom Logging

**Agregar logging personalizado:**

```php
// En versus-headless-api.php
private function log_debug($message, $data = null) {
    if (IS_DEV && WP_DEBUG_LOG) {
        $log_message = '[Versus Headless] ' . $message;
        if ($data) {
            $log_message .= ' | Data: ' . print_r($data, true);
        }
        error_log($log_message);
    }
}

// Uso:
$this->log_debug('Search filters received', $filters);
```

---

## 5. CHECKLIST DE VERIFICACIÓN

### ✅ Checklist Inicial (Si algo no funciona)

```
☐ WordPress está corriendo (Local app)
☐ Plugin versus-headless-api está activado
☐ Permalinks configurados a /%postname%/
☐ WP_DEBUG habilitado
☐ Next.js dev server corriendo
☐ Variables de entorno correctas en .env.local
☐ No hay errores en debug.log
☐ CORS headers presentes en respuestas
☐ Existen propiedades publicadas
☐ Easy Real Estate está activo
```

---

### ✅ Checklist de Endpoints

```
☐ GET /wp-json/ → 200 OK
☐ GET /wp-json/wp/v2/properties → 200 OK con datos
☐ GET /wp-json/wp/v2/posts → 200 OK
☐ GET /wp-json/versus/v1/config → 200 OK
☐ GET /wp-json/versus/v1/properties/featured → 200 OK
☐ POST /wp-json/versus/v1/properties/search → 200 OK
☐ Todos incluyen CORS headers
☐ featured_image no es null
☐ property_meta tiene datos
☐ gallery tiene imágenes
```

---

### ✅ Checklist de Performance

```
☐ Respuestas API < 500ms
☐ Imágenes optimizadas
☐ WP Rocket cache activo (opcional)
☐ Next.js build exitoso
☐ No hay N+1 queries (Query Monitor)
☐ Browser cache configurado
☐ CDN para imágenes (producción)
```

---

## 📞 SOPORTE Y RECURSOS

### Logs a Revisar Cuando Pidas Ayuda

```bash
# 1. WordPress debug log
tail -n 100 wp-content/debug.log

# 2. PHP error log
tail -n 50 logs/php-error.log

# 3. Nginx error log
tail -n 50 logs/nginx-error.log

# 4. Estado del sistema
wp --info

# 5. Plugins activos
wp plugin list --status=active
```

---

### Información Útil para Debugging

```bash
# Versión de WordPress
wp core version

# Versión de PHP
php -v

# Tema activo
wp theme list --status=active

# URL del sitio
wp option get siteurl

# Timezone
wp option get timezone_string
```

---

### Comandos de Emergencia

```bash
# Desactivar todos los plugins excepto headless
wp plugin deactivate --all --skip-plugins=versus-headless-api

# Activar tema por defecto
wp theme activate twentytwentyfive

# Regenerar thumbnails (si imágenes no cargan)
wp media regenerate --yes

# Optimizar base de datos
wp db optimize

# Reparar base de datos
wp db repair
```

---

## 🔍 DEBUGGING AVANZADO

### SQL Queries

**Ver queries ejecutadas:**
```php
// Agregar al final de functions.php (temporal)
add_action('shutdown', function() {
    global $wpdb;
    error_log('Total queries: ' . $wpdb->num_queries);
    error_log(print_r($wpdb->queries, true));
});
```

---

### REST API Debug

**Ver todas las rutas registradas:**
```bash
wp rest list-routes | grep versus
```

**Probar autenticación:**
```bash
curl -u usuario:password http://versusandorra.local/wp-json/wp/v2/users/me
```

---

### Memory Usage

**Ver uso de memoria:**
```php
// Agregar al plugin
error_log('Memory usage: ' . memory_get_usage(true) / 1024 / 1024 . ' MB');
error_log('Peak usage: ' . memory_get_peak_usage(true) / 1024 / 1024 . ' MB');
```

**Aumentar límite si es necesario:**
```php
// En wp-config.php
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');
```

---

## 📝 RESUMEN

### Workflow de Debugging

```
1. ¿Funciona el endpoint directo en browser/curl?
   ↓ NO → Revisar WordPress, plugin, permalinks
   ↓ SÍ
   
2. ¿Aparecen CORS headers?
   ↓ NO → Activar/reinstalar plugin headless
   ↓ SÍ
   
3. ¿Los datos están completos?
   ↓ NO → Verificar meta fields, Easy Real Estate
   ↓ SÍ
   
4. ¿Next.js puede fetchear?
   ↓ NO → Revisar .env.local, CORS, network
   ↓ SÍ
   
5. ✅ Todo funcionando
```

---

**Última actualización:** 24/10/2025  
**Mantenido por:** Versus Andorra Dev Team  
**Para más ayuda:** Revisar debug.log o contactar soporte
