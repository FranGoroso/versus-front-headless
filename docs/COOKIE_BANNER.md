# Cookie Banner - Documentación

## 📋 Descripción General

Banner de consentimiento de cookies elegante y minimalista, 100% acorde con la estética del sitio Versus Andorra. Incluye gestión granular de preferencias y almacenamiento persistente del consentimiento.

---

## 📁 Ubicación

```
/components/common/CookieBanner.tsx
```

**Integrado en:**
```typescript
/app/layout.tsx
```

---

## 🎨 Diseño

### Banner Principal
- **Posición:** Fixed bottom
- **Estilo:** Fondo blanco, sombra elegante, border-top gris
- **Animación:** Slide-up suave (0.5s)
- **Tipografía:** font-light, tracking-tight
- **Responsive:** Stack vertical en móvil, horizontal en desktop

### Modal de Preferencias
- **Overlay:** Backdrop blur con bg-black/50
- **Card:** Rounded-2xl, max-width 2xl
- **Secciones:** Header, Body (scrollable), Footer
- **Animaciones:** Fade-in (overlay) + Scale-up (card)

---

## ⚙️ Funcionalidades

### 1. Categorías de Cookies

| Categoría | Descripción | Desactivable |
|-----------|-------------|--------------|
| **Necesarias** | Esenciales para el funcionamiento | ❌ No |
| **Analíticas** | Google Analytics (IP anonimizada) | ✅ Sí |
| **Personalización** | Idioma, preferencias de usuario | ✅ Sí |

### 2. Opciones de Consentimiento

**Botón "Aceptar todas"**
```typescript
{
  necessary: true,
  analytics: true,
  personalization: true
}
```

**Botón "Solo necesarias"**
```typescript
{
  necessary: true,
  analytics: false,
  personalization: false
}
```

**Botón "Configurar"**
- Abre modal de preferencias
- Permite selección granular con toggles
- Guarda preferencias personalizadas

### 3. Almacenamiento

**Key localStorage:** `cookie_consent`

**Estructura de datos:**
```typescript
interface CookieConsent {
  preferences: {
    necessary: boolean;
    analytics: boolean;
    personalization: boolean;
  };
  timestamp: number;
  version: string; // "1.0"
}
```

**Ejemplo guardado:**
```json
{
  "preferences": {
    "necessary": true,
    "analytics": true,
    "personalization": false
  },
  "timestamp": 1698765432000,
  "version": "1.0"
}
```

### 4. Lógica de Aparición

```typescript
// Aparece si:
- No existe cookie_consent en localStorage
- O la versión guardada ≠ versión actual (CONSENT_VERSION)

// Se oculta después de 1 segundo si ya hay consentimiento válido
```

---

## 🔧 Uso e Integración

### Importación
```typescript
import { CookieBanner } from '@/components/common/CookieBanner';
```

### Uso en layout.tsx
```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
```

---

## 🧪 Testing

### Resetear consentimiento
```javascript
// En DevTools Console
localStorage.removeItem('cookie_consent');
location.reload();
```

### Verificar consentimiento guardado
```javascript
// En DevTools Console
const consent = localStorage.getItem('cookie_consent');
console.log(JSON.parse(consent));
```

### Simular actualización de política
```typescript
// En CookieBanner.tsx, cambiar:
const CONSENT_VERSION = '1.1'; // De '1.0' a '1.1'
// El banner reaparecerá automáticamente
```

---

## 📱 Responsive Breakpoints

| Dispositivo | Comportamiento |
|-------------|----------------|
| **Mobile (<640px)** | Stack vertical, botones full-width |
| **Tablet (640-1024px)** | Horizontal compacto |
| **Desktop (>1024px)** | Horizontal completo con espacio |

---

## 🎭 Animaciones

### Banner Principal
```css
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
Duration: 0.5s ease-out
```

### Modal Overlay
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
Duration: 0.3s ease-out
```

### Modal Content
```css
@keyframes scale-up {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
Duration: 0.3s ease-out
```

---

## 🔗 Enlaces Incluidos

- `/cookies` - Política de Cookies (completa)
- `/privacidad` - Política de Privacidad

---

## 🚀 Próximas Mejoras (Opcional)

### Integración Google Analytics
```typescript
const savePreferences = (prefs: CookiePreferences) => {
  // ... código existente ...
  
  if (prefs.analytics) {
    // Activar Google Analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
};
```

### Botón de Gestión en Footer
```tsx
<button onClick={() => {
  localStorage.removeItem('cookie_consent');
  location.reload();
}}>
  Gestionar cookies
</button>
```

---

## 🐛 Troubleshooting

### Banner no aparece
**Causa:** Consentimiento ya guardado  
**Solución:** `localStorage.removeItem('cookie_consent')`

### Estilos no se aplican
**Causa:** CSS-in-JS no compilado  
**Solución:** Reiniciar servidor (`npm run dev`)

### Modal no cierra
**Causa:** Event handlers  
**Solución:** Verificar onClick en overlay y botón X

### Animaciones no funcionan
**Causa:** Clases no reconocidas  
**Solución:** Estilos inline ya incluidos con `<style jsx>`

---

## 📊 Resumen Técnico

- **Líneas de código:** 410
- **Dependencias:** React (useState, useEffect), Next.js (Link)
- **TypeScript:** ✅ Interfaces completas
- **Accesibilidad:** ✅ aria-labels en toggles
- **Documentación:** ✅ JSDoc completo
- **Testing:** Manual (localStorage)

---

## ✅ Checklist de Implementación

- [x] Componente creado en /components/common
- [x] Export añadido a index.ts
- [x] Integrado en layout.tsx
- [x] localStorage funcionando
- [x] Toggles animados
- [x] Modal responsive
- [x] Enlaces a páginas legales
- [x] Animaciones suaves
- [x] Documentación completa

---

**Versión:** 1.0  
**Autor:** Versus Andorra  
**Fecha:** Octubre 2025
