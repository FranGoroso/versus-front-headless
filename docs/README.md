# Documentación Versus Andorra

Documentación técnica completa del proyecto Versus Andorra - Plantilla Base.

## Stack Tecnológico

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Backend:** WordPress Headless (REST API)
- **Estilos:** Tailwind CSS
- **Deployment:** En definición (actualmente en entorno de desarrollo/demo)

---

## Estructura de Documentación

Esta documentación está organizada en 7 secciones principales, numeradas para facilitar la navegación:

### 01. Getting Started

Configuración inicial y comandos esenciales para comenzar a trabajar.

- [Comandos Ejecutables](./01-getting-started/01-COMANDOS-EJECUTABLES.md) - Lista completa de comandos npm y scripts útiles
- [Configuración WordPress](./01-getting-started/WORDPRESS_CONFIG.md) - Setup del backend headless

### 02. Architecture

Visión general de la arquitectura del proyecto y decisiones técnicas.

- [Diagnóstico y Plan Maestro](./02-architecture/00-DIAGNOSTICO-Y-PLAN-MAESTRO.md) - Estado actual y roadmap técnico

### 03. Features

Documentación de características y funcionalidades implementadas.

#### Blog
- [Sistema de Paginación v3.0.0](./03-features/blog/BLOG_PAGINACION_v3.0.0.md) - Implementación completa de paginación

#### Property Filters
- [Filtros de Propiedades](./03-features/property-filters/FILTROS_IMPLEMENTACION_COMPLETA.md) - Sistema de filtrado completo

#### UI Components
- [Header v5.1.0](./03-features/ui-components/HEADER_COHERENCIA_v5.1.0.md) - Componente de cabecera
- [Loading System](./03-features/ui-components/LOADING_SYSTEM_DOCUMENTATION.md) - Sistema de estados de carga
- [Loading Quick Guide](./03-features/ui-components/LOADING_QUICK_GUIDE.md) - Guía rápida de loading
- [Logo y Favicon Status](./03-features/ui-components/LOGO_FAVICON_STATUS.md) - Estado de assets visuales
- [Logo TODO](./03-features/ui-components/LOGO_TODO.md) - Tareas pendientes de branding

### 04. SEO

Implementación completa de SEO y metadatos.

- [Guía de Implementación SEO](./04-seo/SEO_IMPLEMENTATION_GUIDE.md) - Estrategia y setup general
- [Referencia de Metadatos](./04-seo/SEO_METADATA_REFERENCE.md) - Documentación técnica de metadatos
- [Guía de Assets SEO](./04-seo/SEO_ASSETS_GUIDE.md) - Imágenes y recursos para SEO

### 05. WordPress

Documentación del backend headless WordPress.

- [Índice WordPress](./05-wordpress/README.md) - Punto de entrada a documentación WordPress
- [Estado Actual](./05-wordpress/01-ESTADO-ACTUAL.md) - Análisis del estado del backend
- [Plan de Acción](./05-wordpress/02-PLAN-DE-ACCION.md) - Roadmap de mejoras
- [Endpoints API](./05-wordpress/03-ENDPOINTS-API.md) - Documentación de la REST API
- [Debugging y Troubleshooting](./05-wordpress/04-DEBUGGING-TROUBLESHOOTING.md) - Resolución de problemas
- [Quick Start](./05-wordpress/05-QUICK-START.md) - Inicio rápido

### 06. Deployment

> **Pendiente de implementación:** Documentación de procesos de deployment definitivo, CI/CD y configuración de producción.
>
> *Nota: El entorno actual (Vercel + Local WordPress) es temporal para demos. La infraestructura de producción se documentará aquí una vez definida.*

### 07. Maintenance

> **Pendiente de implementación:** Guías de mantenimiento, actualizaciones y monitoreo del sistema en producción.

---

## Guía Rápida de Inicio

### Para Desarrolladores Nuevos

1. **Configuración inicial:**
   - Lee [Comandos Ejecutables](./01-getting-started/01-COMANDOS-EJECUTABLES.md)
   - Configura [WordPress](./01-getting-started/WORDPRESS_CONFIG.md)

2. **Comprende la arquitectura:**
   - Revisa [Diagnóstico y Plan Maestro](./02-architecture/00-DIAGNOSTICO-Y-PLAN-MAESTRO.md)

3. **Trabaja con WordPress:**
   - Comienza con [Quick Start WordPress](./05-wordpress/05-QUICK-START.md)
   - Consulta [Endpoints API](./05-wordpress/03-ENDPOINTS-API.md)

### Para Implementar Nuevas Features

1. Revisa documentación en [03-features](./03-features/)
2. Consulta patrones existentes en componentes similares
3. Asegúrate de implementar SEO según [Guía SEO](./04-seo/SEO_IMPLEMENTATION_GUIDE.md)

### Para Resolver Problemas

1. Consulta [Debugging WordPress](./05-wordpress/04-DEBUGGING-TROUBLESHOOTING.md)
2. Revisa los logs de Next.js (`npm run dev`)
3. Verifica conexión con WordPress API

---

## Convenciones de Documentación

### Formato de Archivos

- Todos los archivos en formato Markdown (`.md`)
- Nombres descriptivos en MAYÚSCULAS para archivos principales
- Prefijos numéricos para orden lógico

### Estructura de Documentos

Cada documento debe incluir:

1. **Título claro y descriptivo**
2. **Fecha de última actualización**
3. **Tabla de contenidos** (si es extenso)
4. **Contexto o introducción**
5. **Contenido técnico** con ejemplos de código
6. **Comandos ejecutables** (si aplica)
7. **Troubleshooting** (si aplica)

### Versionado

Documentos críticos incluyen versión en el nombre:
- Ejemplo: `HEADER_COHERENCIA_v5.1.0.md`

---

## Contribuir a la Documentación

### Agregar Nueva Documentación

1. Identifica la sección correcta (01-07)
2. Usa nomenclatura consistente
3. Incluye ejemplos de código funcionales
4. Actualiza este README.md si es necesario

### Actualizar Documentación Existente

1. Mantén el formato original
2. Agrega fecha de actualización
3. Si son cambios mayores, considera versionado

### Carpetas Vacías

Las carpetas `06-deployment` y `07-maintenance` están preparadas para documentación futura que se agregará cuando se defina la infraestructura de producción.

---

## Información del Proyecto

- **Cliente:** Versus Andorra
- **Tipo:** Plantilla Base - Headless CMS
- **Estado:** En desarrollo - Demo para cliente
- **Ubicación:** `C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base`
- **Última actualización de docs:** Noviembre 2025
- **Mantenedor:** Equipo de desarrollo Versus Andorra

---

## Soporte

Para consultas sobre la documentación o el proyecto:

1. Revisa primero esta documentación
2. Consulta los archivos de troubleshooting
3. Contacta al equipo de desarrollo

---

**Nota:** Esta documentación está en constante evolución. Contribuye manteniéndola actualizada.
