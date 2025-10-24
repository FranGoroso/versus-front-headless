# ⚡ QUICK START GUIDE

**Get WordPress Headless Running in 10 Minutes**

---

## 🎯 Objetivo

Tener WordPress funcionando como backend headless conectado a Next.js en menos de 10 minutos.

---

## ✅ PRE-REQUISITOS

```
☐ Local by Flywheel instalado y corriendo
☐ WordPress site "versusandorra" activo
☐ Node.js 18+ instalado
☐ Terminal/CMD abierto
☐ Editor de código (VS Code recomendado)
```

---

## 🚀 PASO 1: ACTIVAR PLUGIN HEADLESS (2 min)

### Opción A: WP-CLI (Recomendado)

```bash
# Navegar a WordPress
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Activar plugin
wp plugin activate versus-headless-api

# Verificar
wp plugin list | grep versus-headless-api
# Debe mostrar: active
```

### Opción B: WordPress Admin

```
1. Abrir: http://versusandorra.local/wp-admin
2. Ir a: Plugins → Installed Plugins
3. Buscar: "Versus Andorra Headless API"
4. Click: "Activate"
```

**✅ Verificación:**
```bash
curl http://versusandorra.local/wp-json/versus/v1/config
# Debe retornar JSON con configuración del sitio
```

---

## 🔧 PASO 2: CONFIGURAR PERMALINKS (1 min)

### Opción A: WordPress Admin

```
1. Ir a: Settings → Permalinks
2. Seleccionar: "Post name"
3. Click: "Save Changes"
```

### Opción B: WP-CLI

```bash
wp rewrite structure '/%postname%/' --hard
wp rewrite flush --hard
```

**✅ Verificación:**
```bash
curl http://versusandorra.local/wp-json/wp/v2/properties
# Debe retornar: array JSON de propiedades
```

---

## 📝 PASO 3: HABILITAR DEBUG (1 min)

### Editar wp-config.php

**Ubicación:** `C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php`

**BUSCAR (línea ~95):**
```php
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}
```

**REEMPLAZAR POR:**
```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
```

**✅ Verificación:**
```bash
# Ver si se crea el archivo
ls wp-content/debug.log
# Debe existir
```

---

## 🎨 PASO 4: INICIAR NEXT.JS (2 min)

```bash
# Navegar al proyecto
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Instalar dependencias (si no lo has hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

**Abrir en navegador:**
```
http://localhost:3000
```

**✅ Verificación:**
- ✅ Página principal carga
- ✅ Hero section visible
- ✅ No errores en consola

---

## 🧪 PASO 5: PROBAR CONEXIÓN (2 min)

### Test 1: Propiedades en /propiedades

```
1. Navegar a: http://localhost:3000/propiedades
2. Verificar que muestra propiedades de WordPress
3. Ver Chrome DevTools → Network
4. Buscar petición a "versusandorra.local/wp-json"
5. Status debe ser: 200 OK
```

### Test 2: Equipo en /nuestro-equipo

```
1. Navegar a: http://localhost:3000/nuestro-equipo
2. Verificar que muestra miembros del equipo
```

### Test 3: API Directa

```bash
# Abrir una nueva terminal

# Test 1: Config
curl http://versusandorra.local/wp-json/versus/v1/config

# Test 2: Propiedades
curl http://versusandorra.local/wp-json/wp/v2/properties

# Test 3: Featured
curl http://versusandorra.local/wp-json/versus/v1/properties/featured
```

**Todos deben retornar JSON válido.**

---

## 🎉 PASO 6: VERIFICAR TODO FUNCIONA (2 min)

### Checklist Final

```
✅ WordPress está corriendo (Local app verde)
✅ Plugin versus-headless-api activo
✅ Permalinks: /%postname%/
✅ WP_DEBUG activo
✅ debug.log existe
✅ Next.js corriendo en localhost:3000
✅ /propiedades muestra datos
✅ /nuestro-equipo muestra datos
✅ API responde con 200 OK
✅ No errores CORS en Chrome DevTools
✅ featured_image carga en propiedades
```

---

## 🐛 SI ALGO NO FUNCIONA

### Error CORS?
```bash
wp plugin activate versus-headless-api
# Reiniciar Local site
```

### Error 404 en API?
```bash
wp rewrite flush --hard
```

### Propiedades vacías?
```bash
# Verificar que existen
wp post list --post_type=property --format=table

# Si no hay, crear una de prueba
wp post create \
  --post_type=property \
  --post_title="Apartamento Prueba" \
  --post_content="Descripción de prueba" \
  --post_status=publish
```

### Next.js no carga?
```bash
# Verificar .env.local
cat .env.local

# Debe contener:
NEXT_PUBLIC_WORDPRESS_API_URL=http://versusandorra.local/wp-json
WORDPRESS_API_URL=http://versusandorra.local/wp-json

# Reiniciar Next.js
# Ctrl+C para parar
npm run dev
```

---

## 📚 PRÓXIMOS PASOS

Una vez que todo funcione:

### 1. Conectar Blog
```
Archivo: app/blog/page.tsx
Ver: docs/wordpress-headless/02-PLAN-DE-ACCION.md → Sección 2.2
```

### 2. Crear Página Individual de Post
```
Archivo: app/blog/[slug]/page.tsx
Ver: docs/wordpress-headless/02-PLAN-DE-ACCION.md → Sección 2.3
```

### 3. Actualizar Header
```
Archivo: components/layout/Header.tsx
Ver: Documento de contexto → Última tarea pendiente
```

### 4. Optimizar
```
- Cachear peticiones API
- Optimizar imágenes
- Agregar loading states
- Implementar error boundaries
```

---

## 🆘 OBTENER AYUDA

### Ver Logs
```bash
# WordPress
tail -f wp-content/debug.log

# Next.js (en la terminal donde corre npm run dev)
# Ya se muestran automáticamente
```

### Documentación Completa
```
docs/wordpress-headless/
├── 01-ESTADO-ACTUAL.md          # Estado del proyecto
├── 02-PLAN-DE-ACCION.md         # Plan completo
├── 03-ENDPOINTS-API.md          # Guía de API
└── 04-DEBUGGING-TROUBLESHOOTING.md  # Solución de problemas
```

### Comandos Útiles
```bash
# Estado de WordPress
wp --info

# Plugins activos
wp plugin list --status=active

# Ver rutas API
wp rest list-routes | grep versus

# Test de conexión
node scripts/test-connection.js
```

---

## 🎯 RESUMEN EN 1 MINUTO

```bash
# 1. Activar plugin
wp plugin activate versus-headless-api

# 2. Configurar permalinks
wp rewrite structure '/%postname%/' --hard

# 3. Iniciar Next.js
cd proyecto-bolt/versus-andorra-plantilla-base
npm run dev

# 4. Abrir navegador
# http://localhost:3000

# ✅ LISTO!
```

---

## 🚨 SOLUCIÓN RÁPIDA DE EMERGENCIA

Si nada funciona y necesitas reset:

```bash
# 1. Desactivar todos los plugins menos el headless
wp plugin deactivate --all --skip-plugins=versus-headless-api

# 2. Activar solo los necesarios
wp plugin activate advanced-custom-fields
wp plugin activate custom-post-type-ui
wp plugin activate easy-real-estate
wp plugin activate versus-headless-api

# 3. Flush permalinks
wp rewrite flush --hard

# 4. Reiniciar Local site
# Local → Stop Site → Start Site

# 5. Reiniciar Next.js
# Ctrl+C en terminal
npm run dev

# 6. Probar
curl http://versusandorra.local/wp-json/
```

---

## 💡 TIPS FINALES

### Performance
- Usa `per_page` pequeño para testing (3-5 items)
- Aumenta para producción (12-24 items)

### Desarrollo
- Mantén ambos servidores corriendo:
  - WordPress (Local)
  - Next.js (npm run dev)

### Debugging
- Chrome DevTools → Network tab siempre abierto
- Terminal con `npm run dev` visible para ver logs

### Backup
- Antes de cambios grandes: `wp db export backup.sql`

---

**¡Listo para desarrollar! 🎉**

Si has llegado aquí sin errores, tienes WordPress funcionando como backend headless perfecto para tu proyecto Next.js.

---

**Tiempo total:** ~10 minutos  
**Última actualización:** 24/10/2025
