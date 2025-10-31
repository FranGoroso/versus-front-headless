# 🚀 PRUEBA RÁPIDA - Corrección Tipografía Contacto

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Iniciar servidor (30 segundos)
```bash
cd "C:/Users/goros/Local Sites/versusandorra/proyecto-bolt/versus-andorra-plantilla-base"
npm run dev
```

### 2️⃣ Abrir página de contacto (10 segundos)
Abrir navegador en: **http://localhost:3000/contacto**

### 3️⃣ Verificación visual (2 minutos)

#### ✅ DEBE VERSE ASÍ:
```
┌─────────────────────────────────┐
│                                 │
│        Contáctanos              │  ← Delgado, moderno (Inter)
│                                 │
│  Estamos aquí para ayudarte...  │
│                                 │
└─────────────────────────────────┘
```

#### ❌ NO DEBE VERSE ASÍ:
```
┌─────────────────────────────────┐
│                                 │
│      𝒞𝑜𝓃𝓉á𝒸𝓉𝒶𝓃𝑜𝓈              │  ← Grueso, serif (Playfair)
│                                 │
│  Estamos aquí para ayudarte...  │
│                                 │
└─────────────────────────────────┘
```

### 4️⃣ Comparar con Home (1 minuto)
1. Abrir **http://localhost:3000** en otra pestaña
2. Comparar el aspecto del h1 principal
3. **DEBEN SER IDÉNTICOS**

### 5️⃣ Probar responsive (1 minuto)
1. Abrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Probar:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

---

## ✓ Checklist Express

Marcar cada punto al verificar:

### Página Desktop
- [ ] h1 "Contáctanos" usa Inter (sans-serif)
- [ ] h1 se ve delgado (font-light), no grueso
- [ ] h2 "Información de contacto" usa Inter
- [ ] h2 "Envíanos un mensaje" usa Inter
- [ ] Todos los encabezados se ven iguales que en Home

### Página Mobile
- [ ] h1 es legible en pantallas pequeñas
- [ ] No hay overflow de texto
- [ ] El peso sigue siendo light

### Comparación
- [ ] /contacto se ve igual que /
- [ ] No hay diferencias visuales notables
- [ ] La tipografía es coherente

---

## 🆘 Solución de Problemas

### ❓ "Sigo viendo la fuente serif"
**Solución:**
1. Limpiar caché del navegador (Ctrl+Shift+R)
2. Reiniciar el servidor de desarrollo
3. Verificar que el archivo `page.tsx` tiene los cambios

### ❓ "Los cambios no se reflejan"
**Solución:**
```bash
# Detener servidor (Ctrl+C)
npm run dev
```

### ❓ "¿Cómo verifico qué fuente se está usando?"
**Solución:**
Abrir DevTools Console y ejecutar:
```javascript
getComputedStyle(document.querySelector('h1')).fontFamily
// Debe incluir "Inter"
```

---

## 📋 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `app/contacto/page.tsx` | ✏️ Archivo modificado |
| `app/contacto/page.tsx.backup` | 🔄 Backup original |
| `docs/FIX_CONTACTO_TIPOGRAFIA.md` | 📚 Doc completa |
| `docs/CONTACTO_TIPOGRAFIA_ANTES_DESPUES.md` | 👁️ Comparación visual |

---

## 🎯 Objetivo del Cambio

**Antes:** Página de contacto usaba Playfair Display (serif, bold)  
**Después:** Página de contacto usa Inter (sans-serif, light)  
**Resultado:** 100% consistencia visual en todo el sitio ✅

---

## ⏱️ Tiempo Total Estimado

- Inicio servidor: 30 seg
- Verificación visual: 2 min
- Comparación: 1 min
- Responsive test: 1 min
- **TOTAL: ~5 minutos**

---

## 📞 ¿Necesitas más info?

Consultar documentación completa:
- `docs/FIX_CONTACTO_TIPOGRAFIA.md` - Detalles técnicos
- `docs/CONTACTO_TIPOGRAFIA_ANTES_DESPUES.md` - Comparación visual

---

**¡Listo para probar!** 🚀
