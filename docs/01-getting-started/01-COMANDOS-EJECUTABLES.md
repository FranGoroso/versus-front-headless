# 🔧 COMANDOS EJECUTABLES - CONVERSIÓN HEADLESS

**Documento:** Comandos listos para copy-paste  
**Fecha:** 26/10/2025

---

## FASE 1: VERIFICACIÓN

### 1.1 Verificar Plugin Headless

```powershell
# Navegar a WordPress
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Listar plugins (requiere WP-CLI)
wp plugin list

# Verificar estado del plugin específico
wp plugin status versus-headless-api

# Si está inactivo, activarlo
wp plugin activate versus-headless-api
```

### 1.2 Verificar Permalinks
**Manual:** Abrir navegador en:
```
http://versusandorra.local/wp-admin/options-permalink.php
```

**Verificar configuración:**
- Seleccionar: "Nombre de la entrada" (/%postname%/)
- Click "Guardar cambios"

### 1.3 Habilitar WP_DEBUG

**Opción 1: Manual**
1. Abrir: `C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php`
2. Buscar: `/* That's all, stop editing! Happy publishing. */`
3. Agregar ANTES de esa línea:

```php
// Configuración Headless Mode
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
define('HEADLESS_MODE', true);
@ini_set('log_errors', 'On');
@ini_set('error_log', WP_CONTENT_DIR . '/debug.log');
```

**Opción 2: WP-CLI**
```powershell
wp config set WP_DEBUG true --raw
wp config set WP_DEBUG_LOG true --raw
wp config set WP_DEBUG_DISPLAY false --raw
```

### 1.4 Probar Endpoints

**PowerShell:**
```powershell
# Endpoint 1: Lista de propiedades
Invoke-WebRequest -Uri "http://versusandorra.local/wp-json/wp/v2/properties?per_page=1" | Select-Object -ExpandProperty Content

# Endpoint 2: Config personalizada
Invoke-WebRequest -Uri "http://versusandorra.local/wp-json/versus/v1/config" | Select-Object -ExpandProperty Content

# Endpoint 3: Búsqueda de propiedades
Invoke-WebRequest -Uri "http://versusandorra.local/wp-json/versus/v1/properties/search" | Select-Object -ExpandProperty Content

# Endpoint 4: Propiedades destacadas
Invoke-WebRequest -Uri "http://versusandorra.local/wp-json/versus/v1/properties/featured" | Select-Object -ExpandProperty Content

# Endpoint 5: Blog posts
Invoke-WebRequest -Uri "http://versusandorra.local/wp-json/wp/v2/posts?per_page=1" | Select-Object -ExpandProperty Content
```

**Usando curl (si está instalado):**
```bash
curl http://versusandorra.local/wp-json/wp/v2/properties?per_page=1
curl http://versusandorra.local/wp-json/versus/v1/config
curl http://versusandorra.local/wp-json/versus/v1/properties/search
curl http://versusandorra.local/wp-json/versus/v1/properties/featured
curl http://versusandorra.local/wp-json/wp/v2/posts?per_page=1
```

### 1.5 Verificar Frontend

**Iniciar servidor Next.js:**
```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Limpiar cache si es necesario
Remove-Item -Recurse -Force .next

# Iniciar dev server
npm run dev
```

**Abrir en navegador:**
- http://localhost:3000 (Home)
- http://localhost:3000/propiedades (Listado)
- http://localhost:3000/propiedades/[slug] (Click en una propiedad)
- http://localhost:3000/blog (Blog)

---

## FASE 2: BACKUP

### 2.1 Backup Base de Datos

```powershell
# Crear carpeta de backups
$backupDate = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "C:\Users\goros\Local Sites\versusandorra\backups\$backupDate"
New-Item -ItemType Directory -Force -Path $backupDir

# Navegar a WordPress
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Exportar base de datos con WP-CLI
wp db export "$backupDir\backup-db.sql"

# Verificar que se creó
Test-Path "$backupDir\backup-db.sql"
```

### 2.2 Backup Archivos Clave

```powershell
# Ya tenemos $backupDir de 2.1

# Backup wp-config.php
Copy-Item "C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php" "$backupDir\wp-config.php"

# Backup .htaccess
Copy-Item "C:\Users\goros\Local Sites\versusandorra\app\public\.htaccess" "$backupDir\.htaccess"

# Backup plugin headless
robocopy "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\plugins\versus-headless-api" "$backupDir\versus-headless-api" /E /NFL /NDL /NJH /NJS

Write-Host "✅ Backup completado en: $backupDir" -ForegroundColor Green
```

### 2.3 Backup Git Frontend

```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Ver estado actual
git status

# Crear branch de backup
git checkout -b backup/pre-headless-conversion-20251026

# Guardar todos los cambios
git add .
git commit -m "backup: Estado antes de conversión headless completa"

# Volver a main
git checkout main

Write-Host "✅ Backup Git completado" -ForegroundColor Green
```

---

## FASE 3: OPTIMIZACIÓN PLUGIN

### 3.1 Editar Plugin

```powershell
# Abrir plugin en editor
code "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\plugins\versus-headless-api\versus-headless-api.php"

# O usar notepad
notepad "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\plugins\versus-headless-api\versus-headless-api.php"
```

**Cambios a realizar:** Ver PLAN MAESTRO Fase 3, Task 3.1 y 3.2

### 3.2 Limpiar Cache WordPress

```powershell
cd "C:\Users\goros\Local Sites\versusandorra\app\public"

# Limpiar transients
wp transient delete --all

# Flush rewrite rules
wp rewrite flush

Write-Host "✅ Cache limpiado" -ForegroundColor Green
```

---

## FASE 4: CONECTAR BLOG

### 4.1 Backup Archivo Actual

```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Backup del archivo mockeado
Copy-Item "app\blog\page.tsx" "app\blog\page.tsx.backup"

Write-Host "✅ Backup de blog page creado" -ForegroundColor Green
```

### 4.2 Crear Nuevos Archivos

Los archivos están en el PLAN MAESTRO, Fase 4.

**Archivos a crear/modificar:**
1. `app/blog/page.tsx` (3 partes)
2. `app/blog/[slug]/page.tsx` (nuevo)

### 4.3 Verificar Blog

```powershell
# Asegurarse que Next.js está corriendo
npm run dev

# Abrir navegador en:
# http://localhost:3000/blog
```

---

## FASE 5: TESTING

### 5.1 Checklist Rápida

```powershell
# Script de verificación automática
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Crear archivo de test
@"
const endpoints = [
  'http://versusandorra.local/wp-json/wp/v2/properties?per_page=1',
  'http://versusandorra.local/wp-json/versus/v1/config',
  'http://versusandorra.local/wp-json/wp/v2/posts?per_page=1'
];

async function testEndpoints() {
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      console.log(\`✅ \${endpoint}: \${response.status}\`);
    } catch (error) {
      console.log(\`❌ \${endpoint}: ERROR\`);
    }
  }
}

testEndpoints();
"@ | Out-File -FilePath "scripts\test-endpoints.js" -Encoding utf8

node scripts\test-endpoints.js
```

### 5.2 Ver Logs

```powershell
# Logs WordPress
Get-Content "C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\debug.log" -Tail 50

# Logs Next.js: Ver terminal donde corre npm run dev
```

### 5.3 Build Producción

```powershell
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Build
npm run build

# Si hay errores, resolverlos antes de continuar
```

---

## COMANDOS ÚTILES GENERALES

### WP-CLI

```powershell
# Ver todas las opciones
wp option list

# Limpiar cache
wp cache flush

# Regenerar thumbnails (si agregaste imágenes)
wp media regenerate --yes

# Ver posts
wp post list --post_type=property

# Ver taxonomías
wp term list property-type
```

### Git

```powershell
# Ver estado
git status

# Ver diferencias
git diff

# Descartar cambios en un archivo
git checkout -- archivo.tsx

# Crear commit
git add .
git commit -m "feat: Conectar blog a WordPress"
```

### Next.js

```powershell
# Limpiar cache
Remove-Item -Recurse -Force .next

# Reinstalar dependencias
Remove-Item -Recurse -Force node_modules
npm install

# Verificar errores TypeScript
npm run type-check

# Verificar errores ESLint
npm run lint
```

---

## ROLLBACK RÁPIDO

```powershell
# Si algo sale mal:

# 1. Detener Next.js
# Ctrl+C en terminal

# 2. Restaurar DB (usa la fecha de tu backup)
cd "C:\Users\goros\Local Sites\versusandorra\app\public"
wp db import "C:\Users\goros\Local Sites\versusandorra\backups\YYYYMMDD-HHMMSS\backup-db.sql"

# 3. Restaurar archivos
$backupDate = "20251026-HHMMSS"  # Cambia esto
Copy-Item "C:\Users\goros\Local Sites\versusandorra\backups\$backupDate\wp-config.php" "C:\Users\goros\Local Sites\versusandorra\app\public\wp-config.php" -Force

# 4. Restaurar Frontend
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"
git checkout backup/pre-headless-conversion-20251026

Write-Host "✅ Rollback completado" -ForegroundColor Green
```

---

## VERIFICACIÓN FINAL

Cuando termines todo, ejecuta:

```powershell
# Test completo
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# 1. Build exitoso
npm run build

# 2. Sin errores TypeScript
npm run type-check

# 3. Sin errores ESLint
npm run lint

# 4. Todos los endpoints responden
node scripts\test-endpoints.js

# 5. Frontend funciona
npm run dev
# Abrir http://localhost:3000 y verificar todas las páginas

Write-Host "🎉 CONVERSIÓN HEADLESS COMPLETADA" -ForegroundColor Green
```

---

**Nota:** Todos estos comandos están listos para copy-paste en PowerShell.

**Creado:** 26/10/2025  
**Por:** Claude (Asistente Técnico)
