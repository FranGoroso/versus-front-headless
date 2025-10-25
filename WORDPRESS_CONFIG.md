# 🔧 Configuración de WordPress

## 📋 Estado Actual: WORDPRESS DESHABILITADO

WordPress está temporalmente deshabilitado para permitir que la aplicación funcione sin errores de conexión.

---

## ✅ Cómo REACTIVAR WordPress

### PASO 1: Configurar el puerto correcto

1. Abre **Local by Flywheel**
2. Asegúrate de que el sitio **"versusandorra"** está corriendo (botón START verde)
3. Encuentra el puerto:
   - Ve a **Overview** → busca **"Site Domain"**
   - Anota la URL completa (ejemplo: `http://localhost:10005`)

### PASO 2: Actualizar `.env.local`

Edita el archivo `.env.local` con el puerto correcto:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:TU_PUERTO/wp-json
WORDPRESS_API_URL=http://localhost:TU_PUERTO/wp-json
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:TU_PUERTO
```

**Ejemplo** (si tu puerto es 10005):
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:10005/wp-json
WORDPRESS_API_URL=http://localhost:10005/wp-json
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:10005
```

### PASO 3: Reactivar WordPress en el código

Edita el archivo `lib/wordpress.ts` (línea ~27):

**Cambiar:**
```typescript
const WORDPRESS_DISABLED = true;
```

**Por:**
```typescript
const WORDPRESS_DISABLED = false;
```

### PASO 4: Verificar conexión

Abre tu navegador y verifica que esta URL funciona:
```
http://localhost:TU_PUERTO/wp-json
```

Deberías ver un JSON con información de WordPress.

### PASO 5: Reiniciar Next.js

```bash
# Detener el servidor (Ctrl + C)
npm run dev
```

---

## 🧪 Probar que funciona

Una vez reactivado, visita estas páginas para verificar:

1. **Home**: `http://localhost:3000`
2. **Propiedades**: `http://localhost:3000/propiedades`
3. **Detalle propiedad**: `http://localhost:3000/propiedades/[slug]`

Si ves propiedades reales de WordPress, ¡funciona! ✅

---

## ⚠️ Problemas comunes

### Error: "fetch failed"
- ✅ Verifica que WordPress está corriendo en Local
- ✅ Verifica el puerto correcto en `.env.local`
- ✅ Reinicia el servidor de Next.js

### Error: "404 Not Found"
- ✅ Verifica que el plugin de propiedades está instalado en WordPress
- ✅ Verifica que existe el endpoint `/wp/v2/properties`

### Error: "403 Forbidden"
- ✅ No uses `.local`, usa `localhost` con puerto
- ✅ Verifica configuración de CORS en WordPress

---

## 📚 Endpoints necesarios en WordPress

Tu WordPress debe tener estos endpoints activos:

```
GET /wp-json/wp/v2/properties
GET /wp-json/wp/v2/posts
GET /wp-json/wp/v2/pages
GET /wp-json/versus/v1/config (custom)
GET /wp-json/versus/v1/properties/featured (custom)
```

---

## 🔍 Verificar estado actual

**WordPress actualmente está**: ❌ DESHABILITADO

Para verificar el estado en cualquier momento:
1. Abre `lib/wordpress.ts`
2. Busca `WORDPRESS_DISABLED` (línea ~27)
3. `true` = deshabilitado, `false` = activo

---

## 💡 Notas

- Mientras WordPress esté deshabilitado, la app mostrará contenido vacío pero no tendrá errores
- Los datos mock están en los componentes individuales
- Recuerda actualizar `.env.local` con el puerto correcto antes de reactivar
