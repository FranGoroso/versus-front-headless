# PropertyGallery Component - Documentación Técnica

## 📋 Descripción General

Componente de galería de imágenes con lightbox integrado para las páginas de propiedades individuales.

**Archivo:** `components/property/PropertyGallery.tsx`  
**Tipo:** Client Component  
**Última actualización:** 2025-10-25

---

## 🎯 Características

### Funcionalidad Principal
- ✅ Grid responsive con imagen principal destacada
- ✅ Lightbox/Modal para visualización en tamaño completo
- ✅ Navegación entre imágenes (botones + teclado)
- ✅ Contador de imágenes actual/total
- ✅ Miniaturas de navegación (solo desktop)
- ✅ Cierre con ESC o click fuera del modal
- ✅ Prevención de scroll del body cuando modal está abierto

### Diseño
- Estilo minimalista acorde al proyecto
- Transiciones suaves y elegantes
- Hover effects en imágenes
- Backdrop blur para el modal
- Color brand (#E6E258) para elementos activos

---

## 📦 Props

```typescript
interface PropertyGalleryProps {
  /** Imagen principal destacada (opcional) */
  featuredImage?: {
    url: string;
    alt?: string;
  };
  
  /** Array de imágenes de la galería (opcional) */
  gallery?: Array<{
    id: number;
    url: string;
    alt?: string;
  }>;
  
  /** Título de la propiedad para alt text */
  title: string;
}
```

---

## 💻 Uso

### Importación
```tsx
import { PropertyGallery } from '@/components/property/PropertyGallery';
```

### Ejemplo básico
```tsx
<PropertyGallery
  featuredImage={{
    url: "https://example.com/featured.jpg",
    alt: "Imagen principal"
  }}
  gallery={[
    { id: 1, url: "https://example.com/img1.jpg", alt: "Galería 1" },
    { id: 2, url: "https://example.com/img2.jpg", alt: "Galería 2" },
  ]}
  title="Apartamento en Escaldes-Engordany"
/>
```

### Sin imágenes
```tsx
<PropertyGallery
  title="Propiedad sin imágenes"
/>
// Renderiza placeholder elegante
```

---

## 🎨 Estructura Visual

### Grid de Galería
```
┌─────────────────┬─────────┬─────────┐
│                 │  Img 2  │  Img 3  │
│   Imagen        ├─────────┼─────────┤
│   Principal     │  Img 4  │  Img 5  │
│   (clickable)   │         │         │
└─────────────────┴─────────┴─────────┘
```

### Lightbox Modal
```
┌───────────────────────────────────────┐
│  [X]           1 / 5                  │
│                                       │
│    [<]     [IMAGEN GRANDE]      [>]  │
│                                       │
│    [thumb1] [thumb2] ... [thumb5]    │
└───────────────────────────────────────┘
```

---

## ⌨️ Controles de Teclado

Cuando el lightbox está abierto:

| Tecla | Acción |
|-------|--------|
| `ESC` | Cerrar lightbox |
| `←` | Imagen anterior |
| `→` | Imagen siguiente |

---

## 🔄 Estados del Componente

### Estado Local
```typescript
const [isOpen, setIsOpen] = useState(false);      // Modal abierto/cerrado
const [currentIndex, setCurrentIndex] = useState(0); // Índice imagen actual
```

### Side Effects
- **Body scroll lock:** Previene scroll cuando modal está abierto
- **Keyboard listeners:** Se agregan/remueven con el estado del modal
- **Cleanup:** Restaura scroll del body al desmontar

---

## 🎭 Clases CSS Principales

### Grid de Galería
```css
.group                     /* Contenedor con hover states */
.group-hover:scale-105     /* Zoom suave en hover */
.group-hover:bg-black/10   /* Overlay oscuro en hover */
```

### Lightbox Modal
```css
.fixed.inset-0.z-50       /* Modal fullscreen con z-index alto */
.bg-black/95              /* Background oscuro semi-transparente */
.backdrop-blur-sm         /* Blur del fondo */
```

### Botones de Navegación
```css
.bg-white/10              /* Background translúcido */
.hover:bg-white/20        /* Hover más visible */
.backdrop-blur-sm         /* Blur para legibilidad */
```

---

## 🧪 Testing

### Checklist de Verificación

#### Visual
- [ ] Grid se muestra correctamente en desktop (2 columnas)
- [ ] Grid se adapta a mobile (1 columna)
- [ ] Imagen principal tiene mayor tamaño
- [ ] Miniaturas tienen tamaño consistente
- [ ] Hover effects funcionan suavemente
- [ ] Botón "Ver todas las fotos" aparece si hay >5 imágenes

#### Funcional
- [ ] Click en imagen principal abre lightbox
- [ ] Click en miniaturas abre lightbox con imagen correcta
- [ ] Lightbox muestra imagen en tamaño completo
- [ ] Contador muestra índice correcto (ej: "3 / 10")
- [ ] Botón X cierra el lightbox
- [ ] Click fuera de la imagen cierra el lightbox
- [ ] ESC cierra el lightbox
- [ ] Flechas ← → navegan entre imágenes
- [ ] Flechas del teclado navegan entre imágenes
- [ ] Navegación es circular (última → primera)
- [ ] Body scroll está bloqueado con modal abierto
- [ ] Body scroll se restaura al cerrar modal

#### Edge Cases
- [ ] Sin imagen destacada → muestra solo galería
- [ ] Sin galería → muestra solo imagen destacada
- [ ] Sin ninguna imagen → muestra placeholder
- [ ] Una sola imagen → oculta botones de navegación
- [ ] Imágenes sin alt → usa fallback con title

### Pasos de Prueba Manual

1. **Prueba básica**
   ```bash
   npm run dev
   # Navegar a: http://localhost:3000/propiedades/[cualquier-slug]
   ```

2. **Verificar galería**
   - Observar grid responsive
   - Hacer hover sobre imágenes
   - Verificar efectos de transición

3. **Probar lightbox**
   - Click en imagen principal → debe abrir modal
   - Verificar que imagen se ve en tamaño completo
   - Probar botones ← → para navegar
   - Probar flechas del teclado
   - Probar ESC para cerrar
   - Click fuera de la imagen para cerrar

4. **Responsive**
   ```bash
   # Cambiar tamaño ventana o usar DevTools
   - Desktop: Grid 2 columnas + miniaturas visibles
   - Tablet: Grid 2 columnas + miniaturas ocultas
   - Mobile: Grid 1 columna
   ```

5. **Performance**
   - Verificar que imágenes cargan con Next/Image
   - Comprobar que primera imagen tiene `priority`
   - Lightbox debe abrir/cerrar sin lag

---

## 🐛 Problemas Conocidos y Soluciones

### Problema: Body sigue scrollable con modal abierto
**Causa:** No se está bloqueando el scroll del body  
**Solución:** Implementado en `openLightbox()` y `closeLightbox()`
```typescript
document.body.style.overflow = 'hidden'; // Bloquear
document.body.style.overflow = 'unset';  // Restaurar
```

### Problema: ESC no cierra el modal
**Causa:** Listener no está registrado  
**Solución:** useEffect con cleanup
```typescript
useEffect(() => {
  if (!isOpen) return;
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen]);
```

### Problema: Imágenes no cargan en lightbox
**Causa:** URLs relativas o incorrectas  
**Solución:** Verificar que WordPress retorna URLs absolutas
```typescript
// Verificar en lib/wordpress.ts que las URLs sean completas
url: image.source_url || image.url
```

---

## 🔧 Mantenimiento

### Agregar nueva funcionalidad

#### Zoom adicional
```typescript
// Agregar estado
const [zoomLevel, setZoomLevel] = useState(1);

// Agregar botones + / -
<button onClick={() => setZoomLevel(prev => prev + 0.25)}>+</button>
<button onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.25))}>-</button>

// Aplicar a imagen
<Image 
  style={{ transform: `scale(${zoomLevel})` }}
  // ...
/>
```

#### Descarga de imagen
```typescript
const downloadImage = async () => {
  const response = await fetch(allImages[currentIndex].url);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `propiedad-${currentIndex + 1}.jpg`;
  a.click();
};
```

### Modificar estilos

**Cambiar color de overlay en hover:**
```tsx
// Línea 165
className="... group-hover:bg-black/20" // Cambiar opacidad
```

**Cambiar color de anillo en miniaturas activas:**
```tsx
// Línea 261
className="... ring-brand" // Cambiar a ring-blue-500, etc.
```

---

## 📁 Archivos Relacionados

```
components/
├── property/
│   ├── PropertyGallery.tsx       ← Este componente
│   └── PropertyCard.tsx           
app/
├── propiedades/
│   └── [slug]/
│       └── page.tsx               ← Implementación
lib/
└── wordpress.ts                   ← Fuente de imágenes
```

---

## 🚀 Próximas Mejoras

### Corto plazo
- [ ] Loading skeleton para imágenes
- [ ] Lazy loading para miniaturas
- [ ] Animaciones de entrada/salida del modal
- [ ] Touch gestures para mobile (swipe)

### Mediano plazo
- [ ] Compartir imagen específica (social share)
- [ ] Descargar imagen actual
- [ ] Zoom con pinch en mobile
- [ ] Fullscreen API para navegadores compatibles

### Largo plazo
- [ ] Comparación lado a lado de imágenes
- [ ] Anotaciones/marcas en imágenes
- [ ] Galería 360° o tour virtual
- [ ] Integración con video tours

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisar esta documentación
2. Verificar console del navegador
3. Comprobar que WordPress retorna datos correctos
4. Revisar Network tab para URLs de imágenes

---

**Última revisión:** 2025-10-25  
**Versión:** 1.0.0  
**Autor:** Sistema de desarrollo Versus Andorra
