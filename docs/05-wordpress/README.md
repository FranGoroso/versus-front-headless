# 📚 WORDPRESS HEADLESS - DOCUMENTACIÓN COMPLETA

**Versus Andorra** - Inmobiliaria  
Next.js 13.5.1 + WordPress Headless

---

## 🎯 INICIO RÁPIDO

**¿Primera vez configurando? → [Quick Start Guide](./05-QUICK-START.md)**

Configura todo en 10 minutos siguiendo los 6 pasos.

---

## 📖 ÍNDICE DE DOCUMENTACIÓN

### 1. [Estado Actual del Proyecto](./01-ESTADO-ACTUAL.md)
**Resumen completo de todo lo que está configurado y pendiente**

- ✅ Estado general (70% completado)
- 📂 Estructura de archivos
- 🔌 Plugin personalizado detallado
- 🔗 Conexión Next.js ↔ WordPress
- 📊 Plugins instalados
- ⚙️ Configuración actual
- 🔧 Funciones implementadas
- 📈 Estado de páginas
- 🔍 Issues conocidos
- 📝 Próximos pasos

**Ideal para:** Entender el estado del proyecto completo

---

### 2. [Plan de Acción Completo](./02-PLAN-DE-ACCION.md)
**Guía paso a paso para completar la configuración headless**

#### FASE 1: Configuración WordPress
- Activar plugin headless
- Configurar permalinks
- Habilitar WP_DEBUG
- Agregar constantes headless
- Desactivar plugins innecesarios
- Verificar Easy Real Estate
- Verificar ACF
- Probar endpoints REST

#### FASE 2: Configuración Next.js
- Verificar conexión API
- Conectar página /blog
- Crear página /blog/[slug]
- Actualizar Header.tsx

#### FASE 3: Testing y Verificación
- Checklist de endpoints
- Test de conexión
- Scripts de testing

**Ideal para:** Ejecutar paso a paso la configuración completa

---

### 3. [Guía de Endpoints API](./03-ENDPOINTS-API.md)
**Documentación completa de todos los endpoints disponibles**

#### Contenido:
- 📡 Endpoints nativos WordPress
  - Propiedades (`/wp/v2/properties`)
  - Posts (`/wp/v2/posts`)
  - Páginas (`/wp/v2/pages`)
  - Taxonomías (`/wp/v2/type`, `/wp/v2/city`, etc.)
  
- 🎯 Endpoints personalizados Versus
  - Config (`/versus/v1/config`)
  - Search (`/versus/v1/properties/search`)
  - Featured (`/versus/v1/properties/featured`)
  - Stats (`/versus/v1/stats`)

- 📋 Parámetros comunes
- 🔍 Respuestas y errores
- 💻 Ejemplos de uso (curl, JavaScript, Python, React)

**Ideal para:** Desarrollar funcionalidades que consumen la API

---

### 4. [Debugging y Troubleshooting](./04-DEBUGGING-TROUBLESHOOTING.md)
**Solución de problemas comunes y técnicas de debugging**

#### Contenido:
- ⚙️ Configuración de debugging
- 🔴 Problemas comunes y soluciones:
  - Error CORS
  - 404 Not Found
  - 401 Unauthorized
  - Propiedades no aparecen
  - Imágenes no cargan
  - Meta fields vacíos
  - Búsqueda no funciona
  - Next.js build falla

- 🛠️ Herramientas de debugging
  - Chrome DevTools
  - WP-CLI
  - Postman/Insomnia
  - Query Monitor

- 📊 Logs y monitoreo
- ✅ Checklists de verificación

**Ideal para:** Resolver errores y problemas técnicos

---

### 5. [Quick Start Guide](./05-QUICK-START.md)
**Configuración rápida en 10 minutos**

6 pasos simples para tener todo funcionando:
1. Activar plugin headless (2 min)
2. Configurar permalinks (1 min)
3. Habilitar debug (1 min)
4. Iniciar Next.js (2 min)
5. Probar conexión (2 min)
6. Verificar todo funciona (2 min)

**Ideal para:** Setup inicial rápido

---

## 🚀 COMANDOS RÁPIDOS

### WordPress
```bash
# Navegar a WordPress
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Activar plugin headless
wp plugin activate versus-headless-api

# Configurar permalinks
wp rewrite structure '/%postname%/' --hard
wp rewrite flush --hard

# Ver plugins activos
wp plugin list --status=active

# Ver propiedades
wp post list --post_type=property

# Ver logs
tail -f wp-content/debug.log
```

### Next.js
```bash
# Navegar al proyecto
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

### Testing
```bash
# Test rápido de API
curl http://versusandorra.local/wp-json/

# Test propiedades
curl http://versusandorra.local/wp-json/wp/v2/properties

# Test config
curl http://versusandorra.local/wp-json/versus/v1/config

# Test featured
curl http://versusandorra.local/wp-json/versus/v1/properties/featured

# Script de test (si existe)
node scripts/test-connection.js
```

---

## 📁 ESTRUCTURA DEL PROYECTO

```
C:\Users\goros\Local Sites\versusandorra\

WordPress (Backend)
├── app/public/
│   ├── wp-config.php                    # Configuración principal
│   ├── wp-content/
│   │   ├── plugins/
│   │   │   ├── versus-headless-api/     # ⭐ Plugin personalizado
│   │   │   ├── advanced-custom-fields/
│   │   │   ├── custom-post-type-ui/
│   │   │   └── easy-real-estate/
│   │   ├── themes/
│   │   │   ├── realhomes/
│   │   │   └── realhomes-child/
│   │   └── debug.log                    # Logs de debug
│   └── ...

Next.js (Frontend)
└── proyecto-bolt/versus-andorra-plantilla-base/
    ├── .env.local                       # ⭐ Variables de entorno
    ├── next.config.js                   # Configuración Next.js
    ├── package.json
    ├── app/
    │   ├── page.tsx                     # Home
    │   ├── propiedades/                 # ✅ Conectado a WP
    │   ├── blog/                        # ⚠️ Mockeado
    │   ├── nuestro-equipo/              # ✅ Conectado a WP
    │   ├── nosotros/
    │   └── contacto/
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx               # ⚠️ Pendiente actualización
    │   │   └── Footer.tsx
    │   └── sections/
    │       ├── HeroSection.tsx
    │       └── PropertySearchForm.tsx
    ├── lib/
    │   ├── wordpress.ts                 # ⭐ Funciones API (400+ líneas)
    │   └── constants.ts
    ├── docs/
    │   └── wordpress-headless/          # ⭐ Esta documentación
    └── scripts/                         # Scripts de testing
```

---

## 🔑 URLs IMPORTANTES

### Desarrollo
- **WordPress Admin:** http://versusandorra.local/wp-admin
- **WordPress API:** http://versusandorra.local/wp-json
- **Next.js Dev:** http://localhost:3000

### API Endpoints Clave
- Config: http://versusandorra.local/wp-json/versus/v1/config
- Properties: http://versusandorra.local/wp-json/wp/v2/properties
- Featured: http://versusandorra.local/wp-json/versus/v1/properties/featured
- Search: http://versusandorra.local/wp-json/versus/v1/properties/search (POST)

---

## ✅ CHECKLIST GENERAL

### Backend WordPress
```
☐ Plugin versus-headless-api activado
☐ Permalinks: /%postname%/
☐ WP_DEBUG habilitado
☐ Easy Real Estate activo
☐ ACF activo
☐ Custom Post Type UI activo
☐ Propiedades publicadas existen
☐ API retorna datos correctamente
☐ CORS headers presentes
☐ No errores en debug.log
```

### Frontend Next.js
```
☐ .env.local configurado
☐ npm install ejecutado
☐ npm run dev funciona
☐ /propiedades muestra datos
☐ /nuestro-equipo muestra datos
☐ /blog conectado (pendiente)
☐ Header actualizado (pendiente)
☐ Imágenes cargan correctamente
☐ No errores CORS
☐ Build exitoso (npm run build)
```

---

## 🎓 RECURSOS DE APRENDIZAJE

### WordPress REST API
- [Documentación Oficial](https://developer.wordpress.org/rest-api/)
- [REST API Handbook](https://developer.wordpress.org/rest-api/reference/)

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### Headless CMS
- [Headless WordPress Guide](https://developer.wordpress.org/news/2023/05/headless-wordpress/)

---

## 🆘 SOPORTE

### Cuando Algo No Funciona

1. **Consultar:** [04-DEBUGGING-TROUBLESHOOTING.md](./04-DEBUGGING-TROUBLESHOOTING.md)
2. **Ver logs:**
   ```bash
   # WordPress
   tail -f wp-content/debug.log
   
   # Next.js (en terminal donde corre npm run dev)
   ```

3. **Verificar checklist:**
   - Plugin activo
   - Permalinks configurados
   - API responde (curl)
   - No errores CORS

4. **Reset si es necesario:**
   ```bash
   wp plugin activate versus-headless-api
   wp rewrite flush --hard
   # Reiniciar Local site
   # Reiniciar npm run dev
   ```

---

## 📊 ESTADO DEL PROYECTO

### Completado (70%)
✅ Plugin headless creado  
✅ CORS configurado  
✅ REST API habilitada  
✅ Endpoints personalizados  
✅ Variables de entorno  
✅ Propiedades conectadas  
✅ Equipo conectado  
✅ Hero section con parallax  

### Pendiente (30%)
⚠️ Verificar plugin activado  
⚠️ Conectar blog a WordPress  
⚠️ Actualizar Header (4 cambios)  
⚠️ Crear página individual de post  
⚠️ Optimizaciones finales  

---

## 🔄 WORKFLOW DE DESARROLLO

### 1. Iniciar Sesión de Trabajo
```bash
# Terminal 1: WordPress ya está corriendo (Local)

# Terminal 2: Next.js
cd proyecto-bolt/versus-andorra-plantilla-base
npm run dev

# Terminal 3: Logs (opcional)
cd app/public
tail -f wp-content/debug.log
```

### 2. Hacer Cambios
- Editar código en Next.js → Hot reload automático
- Cambios en WordPress → Pueden requerir flush de cache

### 3. Probar
- Navegar en browser: http://localhost:3000
- Ver Network tab en Chrome DevTools
- Verificar API responses

### 4. Commit
```bash
git add .
git commit -m "feat(blog): conectar blog a WordPress API"
git push
```

---

## 🏁 PRÓXIMOS PASOS

Después de completar la configuración básica:

1. **Conectar Blog** → Ver `02-PLAN-DE-ACCION.md` Sección 2.2
2. **Actualizar Header** → Ver documento de contexto
3. **Crear /blog/[slug]** → Ver `02-PLAN-DE-ACCION.md` Sección 2.3
4. **Página /vender** → Crear nueva página
5. **Optimizar SEO** → Metadata, sitemap, robots.txt
6. **Testing completo** → Probar todos los flujos
7. **Deployment** → Preparar para producción

---

## 📝 NOTAS IMPORTANTES

### Seguridad
- Plugin permite acceso público en desarrollo
- CORS abierto a todos los orígenes (*)
- ⚠️ En producción: restringir CORS a dominio específico

### Performance
- Usar cache en producción
- Optimizar imágenes con Next.js Image
- Considerar ISR (Incremental Static Regeneration)

### Mantenimiento
- Hacer backup antes de updates: `wp db export backup.sql`
- Probar cambios en desarrollo primero
- Mantener plugins actualizados

---

## 📞 CONTACTO

**Proyecto:** Versus Andorra - Inmobiliaria  
**Stack:** Next.js 13.5.1 + WordPress Headless  
**Documentación creada:** 24/10/2025  
**Versión API:** 1.0.1

---

## 🎉 ¡EMPECEMOS!

**¿Listo para comenzar?**

→ [Quick Start Guide (10 minutos)](./05-QUICK-START.md)

**¿Necesitas el detalle completo?**

→ [Estado Actual](./01-ESTADO-ACTUAL.md) → [Plan de Acción](./02-PLAN-DE-ACCION.md)

**¿Tienes un problema?**

→ [Debugging & Troubleshooting](./04-DEBUGGING-TROUBLESHOOTING.md)

---

**Happy Coding! 🚀**
