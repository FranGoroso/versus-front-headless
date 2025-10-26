# 🎨 Configuración de Logo y Favicon - Versus Andorra

## 📋 Resumen de Cambios

**Fecha:** 2025-10-25  
**Componentes actualizados:**
- `components/layout/Header.tsx` - Logo en imagen
- `app/layout.tsx` - Configuración de favicon

---

## ✅ CAMBIOS IMPLEMENTADOS

### 1. Header con Logo en Imagen
✅ Reemplazado logo de texto por logo en imagen  
✅ Configurado tamaño responsive (h-12 / 48px altura)  
✅ Priority loading para mejor LCP  
✅ Ruta: `/images/logo-versus-andorra.png`

### 2. Favicon Configurado
✅ Metadata actualizado en layout.tsx  
✅ Múltiples tamaños para compatibilidad  
✅ Apple touch icon incluido  

---

## 🚀 PASOS PARA COMPLETAR LA INSTALACIÓN

### PASO 1: Copiar el Logo Principal

1. **Descargar el logo desde WordPress:**
   ```
   URL: http://versusandorra.local/wp-content/uploads/2025/10/versusandorraMA-1.png
   ```

2. **Copiar manualmente el archivo:**
   - Ubicación origen: `C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\uploads\2025\10\versusandorraMA-1.png`
   - Ubicación destino: `C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base\public\images\logo-versus-andorra.png`

3. **Alternativa - Descargar desde navegador:**
   - Abrir en navegador: http://versusandorra.local/wp-content/uploads/2025/10/versusandorraMA-1.png
   - Click derecho → "Guardar imagen como..."
   - Guardar en: `public/images/logo-versus-andorra.png`

---

### PASO 2: Generar Favicons

Necesitas crear varios tamaños de favicon. Usa una de estas opciones:

#### Opción A: Usar Herramienta Online (RECOMENDADO)

1. **Ir a:** https://realfavicongenerator.net/
2. **Subir** el logo `versusandorraMA-1.png`
3. **Configurar:**
   - iOS: Usa el logo sin fondo
   - Android: Usa el logo sin fondo
   - Windows: Usa el logo sin fondo
   - macOS: Usa el logo sin fondo
4. **Descargar** el paquete generado
5. **Copiar archivos** a la carpeta `public/` del proyecto:
   ```
   public/
   ├── favicon.ico
   ├── favicon-16x16.png
   ├── favicon-32x32.png
   ├── apple-touch-icon.png (180x180)
   └── android-chrome-192x192.png (opcional)
   ```

#### Opción B: Crear Manualmente con Photoshop/GIMP

**Tamaños necesarios:**
- `favicon.ico` - 32x32px (formato ICO)
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px
- `apple-touch-icon.png` - 180x180px

**Pasos:**
1. Abrir logo en editor de imágenes
2. Redimensionar a cada tamaño
3. Exportar como PNG (o ICO para favicon.ico)
4. Guardar en carpeta `public/`

#### Opción C: Usar ImageMagick (Si está instalado)

```bash
# Navegar a la carpeta del logo
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base\public\images"

# Generar favicons (requiere ImageMagick instalado)
magick logo-versus-andorra.png -resize 16x16 ../favicon-16x16.png
magick logo-versus-andorra.png -resize 32x32 ../favicon-32x32.png
magick logo-versus-andorra.png -resize 180x180 ../apple-touch-icon.png
magick logo-versus-andorra.png -resize 32x32 ../favicon.ico
```

---

### PASO 3: Verificar la Instalación

1. **Copiar logo a la ubicación correcta:**
   ```
   ✓ Logo copiado a: public/images/logo-versus-andorra.png
   ```

2. **Verificar favicons en carpeta public:**
   ```
   public/
   ├── favicon.ico              ✓
   ├── favicon-16x16.png        ✓
   ├── favicon-32x32.png        ✓
   └── apple-touch-icon.png     ✓
   ```

3. **Reiniciar servidor Next.js:**
   ```bash
   # Detener servidor (Ctrl+C)
   # Reiniciar
   npm run dev
   ```

4. **Verificar en navegador:**
   - Abrir: http://localhost:3000
   - Header debe mostrar el logo en imagen
   - Pestaña del navegador debe mostrar el favicon
   - Hacer hard refresh: `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)

---

## 📁 Estructura de Archivos Final

```
proyecto-bolt/versus-andorra-plantilla-base/
├── app/
│   └── layout.tsx                    [MODIFICADO - metadata con favicon]
├── components/
│   └── layout/
│       └── Header.tsx                [MODIFICADO - logo en imagen]
├── public/
│   ├── images/
│   │   └── logo-versus-andorra.png   [NUEVO - logo principal]
│   ├── favicon.ico                   [NUEVO - favicon ICO]
│   ├── favicon-16x16.png             [NUEVO - favicon 16px]
│   ├── favicon-32x32.png             [NUEVO - favicon 32px]
│   └── apple-touch-icon.png          [NUEVO - iOS icon 180px]
└── docs/
    └── LOGO_FAVICON_SETUP.md         [NUEVO - este archivo]
```

---

## 🎨 Especificaciones del Logo en Header

### Desktop
- **Altura:** 48px (h-12)
- **Ancho:** Auto (mantiene proporción)
- **Formato:** PNG con transparencia
- **Carga:** Priority (optimiza LCP)

### Mobile
- **Altura:** 48px (mismo que desktop)
- **Responsive:** Se mantiene proporción
- **Visible:** Siempre visible en header

---

## 🔧 Troubleshooting

### Logo no aparece en el header
```bash
# Verificar que el archivo existe
ls "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base\public\images\logo-versus-andorra.png"

# Verificar permisos del archivo
# El archivo debe ser legible

# Reiniciar servidor Next.js
npm run dev
```

### Favicon no aparece en navegador
1. **Limpiar caché del navegador:**
   - Chrome: `Ctrl + Shift + Delete`
   - Firefox: `Ctrl + Shift + Delete`
   - Safari: `Cmd + Option + E`

2. **Hacer hard refresh:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Verificar que archivos existen:**
   ```bash
   ls public/favicon.ico
   ls public/favicon-16x16.png
   ls public/favicon-32x32.png
   ls public/apple-touch-icon.png
   ```

4. **Verificar en DevTools:**
   - Abrir DevTools (F12)
   - Tab "Network"
   - Filtrar por "favicon"
   - Debe mostrar status 200 (OK)

### Logo muy grande o muy pequeño
1. **Ajustar altura en Header.tsx:**
   ```tsx
   // Cambiar h-12 por h-10 (más pequeño) o h-14 (más grande)
   className="h-12 w-auto object-contain"
   ```

2. **O ajustar width si es necesario:**
   ```tsx
   width={200}  // Cambiar según necesidad
   ```

---

## 📱 Compatibilidad

### Navegadores
- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Mobile browsers (iOS/Android)

### Dispositivos
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (375px+)

### PWA
- ✅ Apple touch icon (iOS home screen)
- ✅ Android chrome icon
- ✅ Favicon en todas las plataformas

---

## 📊 Checklist de Verificación

### Antes de commit:
- [ ] Logo copiado a `public/images/logo-versus-andorra.png`
- [ ] Favicon ICO generado y colocado
- [ ] Favicon PNG 16x16 generado
- [ ] Favicon PNG 32x32 generado
- [ ] Apple touch icon 180x180 generado
- [ ] Servidor reiniciado
- [ ] Header muestra logo correctamente
- [ ] Favicon visible en pestaña del navegador
- [ ] Hard refresh realizado
- [ ] Logo responsive en mobile verificado

---

## 🔄 Comandos Git Sugeridos

```bash
# Navegar al proyecto
cd "C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base"

# Ver cambios
git status

# Agregar archivos modificados y nuevos
git add components/layout/Header.tsx
git add app/layout.tsx
git add public/images/logo-versus-andorra.png
git add public/favicon.ico
git add public/favicon-16x16.png
git add public/favicon-32x32.png
git add public/apple-touch-icon.png
git add docs/LOGO_FAVICON_SETUP.md

# Commit
git commit -m "feat(branding): add Versus Andorra logo and favicon

- Replace text logo with image logo in header
- Add logo file to public/images
- Configure favicon in multiple sizes
- Add apple touch icon for iOS
- Update metadata in layout.tsx

Files:
- Logo: public/images/logo-versus-andorra.png
- Favicons: public/favicon.ico, favicon-16x16.png, favicon-32x32.png
- Apple icon: public/apple-touch-icon.png
- Updated: Header.tsx, layout.tsx"

# Push
git push origin main
```

---

## 🎯 Resultado Esperado

### Header
```
┌─────────────────────────────────────────┐
│  [LOGO VERSUS]  Inicio  Props  Nosotros│
└─────────────────────────────────────────┘
```

### Pestaña Navegador
```
[FAVICON] Versus Andorra | Propiedades...
```

### Mobile Home Screen (iOS)
```
┌───────┐
│       │
│ LOGO  │ Versus
│       │ Andorra
└───────┘
```

---

## 📞 Soporte

Si tienes problemas:
1. Verificar que todos los archivos están en su ubicación
2. Reiniciar servidor Next.js
3. Limpiar caché del navegador
4. Revisar console de DevTools por errores

---

**Estado:** ⏳ Pendiente (requiere copiar archivos manualmente)  
**Prioridad:** 🔴 Alta (branding esencial)  
**Tiempo estimado:** 10-15 minutos

Una vez completados los pasos anteriores, el logo y favicon estarán completamente configurados.
