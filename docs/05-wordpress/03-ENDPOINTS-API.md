# 📡 GUÍA COMPLETA DE ENDPOINTS API

**WordPress Headless API** - Versus Andorra  
**Version:** 1.0.1  
**Base URL:** `http://versusandorra.local/wp-json`

---

## 📋 ÍNDICE

1. [Endpoints Nativos WordPress](#endpoints-nativos-wordpress)
2. [Endpoints Personalizados Versus](#endpoints-personalizados-versus)
3. [Parámetros Comunes](#parámetros-comunes)
4. [Respuestas y Errores](#respuestas-y-errores)
5. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 1. ENDPOINTS NATIVOS WORDPRESS

### 1.1 API Root
```
GET /wp-json/
```

**Descripción:** Información sobre la API disponible

**Respuesta:**
```json
{
  "name": "Versus Andorra",
  "description": "Inmobiliaria en Andorra",
  "url": "http://versusandorra.local",
  "home": "http://versusandorra.local",
  "gmt_offset": "2",
  "timezone_string": "Europe/Madrid",
  "namespaces": [
    "wp/v2",
    "versus/v1"
  ],
  "authentication": {},
  "routes": {...}
}
```

---

### 1.2 Propiedades (Properties)

#### Listar Todas las Propiedades
```
GET /wp-json/wp/v2/properties
```

**Parámetros:**
| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| page | int | Número de página | 1 |
| per_page | int | Items por página | 10 |
| order | string | Orden: asc, desc | desc |
| orderby | string | Ordenar por: date, title, price | date |

**Ejemplo:**
```bash
curl "http://versusandorra.local/wp-json/wp/v2/properties?per_page=12&page=1"
```

**Respuesta:**
```json
[
  {
    "id": 123,
    "date": "2025-01-15T10:30:00",
    "modified": "2025-01-16T14:20:00",
    "slug": "apartamento-moderno-andorra-la-vella",
    "status": "publish",
    "type": "property",
    "link": "http://versusandorra.local/property/apartamento-moderno-andorra-la-vella/",
    "title": {
      "rendered": "Apartamento Moderno en Andorra la Vella"
    },
    "content": {
      "rendered": "<p>Descripción completa de la propiedad...</p>",
      "protected": false
    },
    "excerpt": {
      "rendered": "<p>Resumen de la propiedad...</p>",
      "protected": false
    },
    "featured_media": 456,
    "featured_image": {
      "id": 456,
      "url": "http://versusandorra.local/wp-content/uploads/2025/01/property-1.jpg",
      "thumbnail": "http://versusandorra.local/wp-content/uploads/2025/01/property-1-150x150.jpg",
      "medium": "http://versusandorra.local/wp-content/uploads/2025/01/property-1-300x200.jpg",
      "large": "http://versusandorra.local/wp-content/uploads/2025/01/property-1-1024x683.jpg",
      "alt": "Apartamento moderno"
    },
    "property_meta": {
      "price": "350000",
      "bedrooms": "3",
      "bathrooms": "2",
      "size": "120",
      "size_postfix": "m²",
      "address": "Avenida Meritxell 123, Andorra la Vella",
      "featured": "1"
    },
    "gallery": [
      {
        "id": 457,
        "url": "http://versusandorra.local/wp-content/uploads/2025/01/property-1-gallery-1.jpg",
        "thumbnail": "...",
        "medium": "...",
        "width": 1920,
        "height": 1280,
        "alt": "Salón principal",
        "title": "Salón espacioso"
      }
    ],
    "agent": {
      "id": 89,
      "name": "María González",
      "email": "maria@versusandorra.com",
      "phone": "+376 123 456",
      "whatsapp": "+376 123 456",
      "image": "http://versusandorra.local/wp-content/uploads/2025/01/agent-maria.jpg"
    },
    "acf": {
      // Campos ACF personalizados si existen
    }
  }
]
```

**Headers de Respuesta:**
```
X-WP-Total: 45
X-WP-TotalPages: 4
Link: <http://versusandorra.local/wp-json/wp/v2/properties?page=2>; rel="next"
```

---

#### Obtener Propiedad Individual
```
GET /wp-json/wp/v2/properties/{id}
```

**Ejemplo:**
```bash
curl "http://versusandorra.local/wp-json/wp/v2/properties/123"
```

**Respuesta:** Igual que el array anterior, pero un solo objeto.

---

### 1.3 Posts de Blog

#### Listar Posts
```
GET /wp-json/wp/v2/posts
```

**Parámetros:**
| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| page | int | Número de página | 1 |
| per_page | int | Posts por página | 10 |
| categories | int[] | IDs de categorías | - |
| tags | int[] | IDs de tags | - |
| search | string | Búsqueda por texto | - |

**Ejemplo:**
```bash
curl "http://versusandorra.local/wp-json/wp/v2/posts?per_page=9&categories=5"
```

**Respuesta:**
```json
[
  {
    "id": 234,
    "date": "2025-01-20T09:00:00",
    "slug": "guia-comprar-vivienda-andorra",
    "title": {
      "rendered": "Guía completa para comprar vivienda en Andorra"
    },
    "excerpt": {
      "rendered": "<p>Todo lo que necesitas saber...</p>"
    },
    "content": {
      "rendered": "<p>Contenido completo del post...</p>"
    },
    "author": 1,
    "featured_media": 567,
    "featured_image": {
      "url": "http://versusandorra.local/wp-content/uploads/2025/01/blog-post-1.jpg",
      "thumbnail": "...",
      "alt": "Comprar vivienda"
    },
    "categories": [
      {
        "id": 5,
        "name": "Guías",
        "slug": "guias"
      }
    ],
    "tags": []
  }
]
```

---

#### Obtener Post Individual
```
GET /wp-json/wp/v2/posts/{id}
```

---

### 1.4 Páginas

#### Listar Páginas
```
GET /wp-json/wp/v2/pages
```

**Ejemplo:**
```bash
curl "http://versusandorra.local/wp-json/wp/v2/pages"
```

---

### 1.5 Taxonomías

#### Tipos de Propiedad
```
GET /wp-json/wp/v2/type
```

**Respuesta:**
```json
[
  {
    "id": 10,
    "name": "Apartamento",
    "slug": "apartamento",
    "count": 25
  },
  {
    "id": 11,
    "name": "Casa / Chalet",
    "slug": "casa-chalet",
    "count": 12
  },
  {
    "id": 12,
    "name": "Ático",
    "slug": "atico",
    "count": 8
  }
]
```

---

#### Estados de Propiedad
```
GET /wp-json/wp/v2/status
```

**Respuesta:**
```json
[
  {
    "id": 20,
    "name": "En venta",
    "slug": "en-venta",
    "count": 35
  },
  {
    "id": 21,
    "name": "Alquiler",
    "slug": "alquiler",
    "count": 10
  }
]
```

---

#### Ciudades
```
GET /wp-json/wp/v2/city
```

**Respuesta:**
```json
[
  {
    "id": 30,
    "name": "Andorra la Vella",
    "slug": "andorra-la-vella",
    "count": 15
  },
  {
    "id": 31,
    "name": "Escaldes-Engordany",
    "slug": "escaldes-engordany",
    "count": 12
  },
  {
    "id": 32,
    "name": "Encamp",
    "slug": "encamp",
    "count": 8
  }
]
```

---

## 2. ENDPOINTS PERSONALIZADOS VERSUS

### 2.1 Configuración del Sitio
```
GET /wp-json/versus/v1/config
```

**Descripción:** Obtener configuración general del sitio

**Respuesta:**
```json
{
  "site_name": "Versus Andorra",
  "site_description": "Tu inmobiliaria de confianza en Andorra",
  "site_url": "http://versusandorra.local",
  "home_url": "http://versusandorra.local",
  "language": "es_ES",
  "timezone": "Europe/Madrid",
  "date_format": "d/m/Y",
  "time_format": "H:i",
  "menus": {
    "primary": {
      "name": "Menú Principal",
      "items": [
        {
          "id": 100,
          "title": "Inicio",
          "url": "http://versusandorra.local",
          "target": "",
          "parent": "0",
          "order": 1,
          "classes": []
        },
        {
          "id": 101,
          "title": "Propiedades",
          "url": "http://versusandorra.local/propiedades",
          "target": "",
          "parent": "0",
          "order": 2,
          "classes": []
        }
      ]
    }
  },
  "languages": {
    "es": "Español",
    "en": "English",
    "fr": "Français",
    "ca": "Català",
    "ru": "Русский"
  },
  "property_settings": {
    "currency": "€",
    "currency_position": "after",
    "thousands_separator": ".",
    "decimal_separator": ",",
    "default_area_unit": "m²"
  }
}
```

---

### 2.2 Búsqueda Avanzada de Propiedades
```
POST /wp-json/versus/v1/properties/search
GET /wp-json/versus/v1/properties/search
```

**Descripción:** Búsqueda avanzada con múltiples filtros

**Parámetros (JSON Body para POST):**
| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| min_price | int | Precio mínimo | 100000 |
| max_price | int | Precio máximo | 500000 |
| min_beds | int | Mínimo dormitorios | 2 |
| min_baths | int | Mínimo baños | 1 |
| min_area | int | Área mínima (m²) | 80 |
| property_type | string | Tipo de propiedad (slug) | "apartamento" |
| property_status | string | Estado (slug) | "en-venta" |
| city | string | Ciudad (slug) | "andorra-la-vella" |
| orderby | string | Ordenar por | "price_desc" |
| page | int | Página | 1 |
| per_page | int | Items por página | 12 |

**Opciones de orderby:**
- `date` - Más recientes primero
- `price_asc` - Precio ascendente
- `price_desc` - Precio descendente

**Ejemplo POST:**
```bash
curl -X POST "http://versusandorra.local/wp-json/versus/v1/properties/search" \
  -H "Content-Type: application/json" \
  -d '{
    "min_price": 150000,
    "max_price": 400000,
    "min_beds": 2,
    "property_type": "apartamento",
    "city": "andorra-la-vella",
    "orderby": "price_asc",
    "per_page": 12
  }'
```

**Ejemplo GET:**
```bash
curl "http://versusandorra.local/wp-json/versus/v1/properties/search?min_price=150000&max_price=400000&min_beds=2"
```

**Respuesta:**
```json
{
  "properties": [
    {
      "id": 123,
      "title": "Apartamento Moderno",
      "slug": "apartamento-moderno-andorra",
      "excerpt": "Descripción breve...",
      "featured_image": "http://...",
      "price": "250000",
      "bedrooms": "2",
      "bathrooms": "2",
      "area": "95",
      "area_unit": "m²",
      "address": "Calle Principal 123",
      "location": "42.5063,1.5218",
      "gallery": [...],
      "type": "Apartamento",
      "status": "En venta",
      "features": ["Ascensor", "Parking", "Terraza"],
      "city": "Andorra la Vella",
      "link": "http://versusandorra.local/property/...",
      "date": "2025-01-15T10:30:00",
      "featured": false
    }
  ],
  "total": 8,
  "total_pages": 1,
  "current_page": 1
}
```

---

### 2.3 Propiedades Destacadas
```
GET /wp-json/versus/v1/properties/featured
```

**Descripción:** Obtener propiedades marcadas como destacadas

**Parámetros:**
| Parámetro | Tipo | Descripción | Default |
|-----------|------|-------------|---------|
| limit | int | Número de propiedades | 6 |

**Ejemplo:**
```bash
curl "http://versusandorra.local/wp-json/versus/v1/properties/featured?limit=6"
```

**Respuesta:**
```json
[
  {
    "id": 145,
    "title": "Villa Exclusiva",
    "slug": "villa-exclusiva-la-massana",
    "content": "Descripción completa...",
    "excerpt": "Descripción breve...",
    "featured_image": "http://...",
    "price": "850000",
    "bedrooms": "4",
    "bathrooms": "3",
    "area": "250",
    "area_unit": "m²",
    "address": "La Massana",
    "location": "42.5456,1.5145",
    "gallery": [...],
    "type": "Casa / Chalet",
    "status": "En venta",
    "features": ["Jardín", "Piscina", "Garage", "Vistas montaña"],
    "city": "La Massana",
    "link": "http://versusandorra.local/property/villa-exclusiva-la-massana/",
    "date": "2025-01-18T15:20:00",
    "featured": true
  }
]
```

---

### 2.4 Estadísticas del Sitio
```
GET /wp-json/versus/v1/stats
```

**Descripción:** Obtener estadísticas generales

**Respuesta:**
```json
{
  "total_properties": 45,
  "total_agents": 8,
  "total_posts": 23,
  "property_types": 6,
  "cities": 7
}
```

---

## 3. PARÁMETROS COMUNES

### Paginación
Todos los endpoints que retornan listas aceptan:

```
?page=1&per_page=12
```

**Headers de respuesta incluyen:**
- `X-WP-Total`: Total de items
- `X-WP-TotalPages`: Total de páginas
- `Link`: Links a siguiente/anterior página

---

### Búsqueda
```
?search=texto_busqueda
```

Busca en título y contenido.

---

### Ordenamiento
```
?orderby=date&order=desc
```

**orderby opciones:**
- `date` - Fecha de publicación
- `title` - Título alfabético
- `modified` - Última modificación
- `meta_value_num` - Para ordenar por precio (requiere meta_key)

**order opciones:**
- `asc` - Ascendente
- `desc` - Descendente

---

### Campos Específicos
Para optimizar, puedes solicitar solo campos específicos:

```
?_fields=id,title,slug,featured_image
```

Reduce el tamaño de la respuesta.

---

### Inclusión de Datos Relacionados
```
?_embed
```

Incluye automáticamente:
- Author details
- Featured media
- Taxonomies
- Otros datos relacionados

---

## 4. RESPUESTAS Y ERRORES

### Códigos de Estado HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Éxito |
| 201 | Created | Recurso creado |
| 204 | No Content | Éxito sin contenido |
| 400 | Bad Request | Parámetros inválidos |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | Sin permisos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

---

### Formato de Errores

```json
{
  "code": "rest_no_route",
  "message": "No se encontró ninguna ruta que coincida con la URL y el método de solicitud.",
  "data": {
    "status": 404
  }
}
```

**Códigos de error comunes:**
- `rest_no_route` - Ruta no encontrada
- `rest_forbidden` - Sin permisos
- `rest_invalid_param` - Parámetro inválido
- `rest_post_invalid_id` - ID inválido

---

### CORS Headers

Todos los endpoints incluyen headers CORS:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

---

## 5. EJEMPLOS DE USO

### 5.1 Next.js - Obtener Propiedades

```typescript
// lib/wordpress.ts

export async function getAllProperties(params: {
  per_page?: number;
  page?: number;
  orderby?: string;
} = {}) {
  const queryString = buildQueryString({
    per_page: params.per_page || 12,
    page: params.page || 1,
    orderby: params.orderby || 'date',
    order: 'desc',
  });

  const response = await fetch(
    `${WORDPRESS_API_URL}/wp/v2/properties${queryString}`
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
```

---

### 5.2 JavaScript Fetch - Búsqueda Avanzada

```javascript
async function searchProperties(filters) {
  try {
    const response = await fetch(
      'http://versusandorra.local/wp-json/versus/v1/properties/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.properties;
  } catch (error) {
    console.error('Error searching properties:', error);
    throw error;
  }
}

// Uso
const properties = await searchProperties({
  min_price: 200000,
  max_price: 500000,
  min_beds: 2,
  city: 'andorra-la-vella',
  orderby: 'price_asc',
});
```

---

### 5.3 cURL - Propiedades Destacadas

```bash
#!/bin/bash

# Obtener propiedades destacadas
RESPONSE=$(curl -s "http://versusandorra.local/wp-json/versus/v1/properties/featured?limit=3")

# Procesar JSON con jq
echo $RESPONSE | jq '.[] | {title: .title, price: .price, bedrooms: .bedrooms}'
```

---

### 5.4 Python - Configuración del Sitio

```python
import requests

def get_site_config():
    url = "http://versusandorra.local/wp-json/versus/v1/config"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

# Uso
config = get_site_config()
if config:
    print(f"Sitio: {config['site_name']}")
    print(f"Idiomas: {', '.join(config['languages'].values())}")
```

---

### 5.5 React Hook - Custom Hook

```typescript
// hooks/useProperties.ts

import { useState, useEffect } from 'react';

export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const response = await fetch(
          'http://versusandorra.local/wp-json/versus/v1/properties/search',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters),
          }
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setProperties(data.properties);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  return { properties, loading, error };
}

// Uso en componente
function PropertyList() {
  const { properties, loading, error } = useProperties({
    min_price: 200000,
    city: 'andorra-la-vella',
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

---

## 📚 RECURSOS ADICIONALES

### Documentación Oficial
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [REST API Reference](https://developer.wordpress.org/rest-api/reference/)

### Herramientas
- [Postman](https://www.postman.com/) - Testing de APIs
- [Insomnia](https://insomnia.rest/) - Cliente REST
- [jq](https://stedolan.github.io/jq/) - Procesador JSON CLI

### Testing en Navegador
- Chrome DevTools → Network tab
- [JSONView Extension](https://chrome.google.com/webstore/detail/jsonview/)

---

**Última actualización:** 24/10/2025  
**Version API:** 1.0.1  
**Mantenido por:** Versus Andorra Dev Team
