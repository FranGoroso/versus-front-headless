# 🚀 ACCIÓN REQUERIDA: Copiar Logo y Favicon

## ⚡ Pasos Rápidos (5 minutos)

### 1️⃣ Copiar Logo Principal
```bash
# DESDE:
C:\Users\goros\Local Sites\versusandorra\app\public\wp-content\uploads\2025\10\versusandorraMA-1.png

# HACIA:
C:\Users\goros\Local Sites\versusandorra\proyecto-bolt\versus-andorra-plantilla-base\public\images\logo-versus-andorra.png
```

**O descargar desde navegador:**
- Abrir: http://versusandorra.local/wp-content/uploads/2025/10/versusandorraMA-1.png
- Click derecho → Guardar como...
- Guardar en: `public/images/logo-versus-andorra.png`

---

### 2️⃣ Generar Favicons (RECOMENDADO)

**Usar:** https://realfavicongenerator.net/

1. Subir el logo `versusandorraMA-1.png`
2. Generar favicons
3. Descargar paquete
4. Copiar archivos a carpeta `public/`:
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png

---

### 3️⃣ Reiniciar Servidor

```bash
# Detener servidor (Ctrl+C si está corriendo)
npm run dev
```

---

### 4️⃣ Verificar

- ✅ Abrir: http://localhost:3000
- ✅ Header debe mostrar logo en imagen
- ✅ Pestaña debe mostrar favicon
- ✅ Hacer hard refresh: `Ctrl + Shift + R`

---

## 📁 Archivos que Debes Tener

```
public/
├── images/
│   └── logo-versus-andorra.png    ← Logo principal
├── favicon.ico                    ← Favicon principal
├── favicon-16x16.png              ← Favicon 16px
├── favicon-32x32.png              ← Favicon 32px
└── apple-touch-icon.png           ← iOS icon
```

---

## ❓ Problemas?

Ver documentación completa: `docs/LOGO_FAVICON_SETUP.md`

---

**Estado:** ⚠️ CÓDIGO YA ACTUALIZADO - Solo falta copiar archivos  
**Tiempo:** ~5 minutos

Una vez copiados los archivos, reinicia el servidor y listo! 🎉
