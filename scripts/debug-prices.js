/**
 * Script de Debug: Precios de Propiedades
 * 
 * Verifica cómo WordPress está devolviendo los datos de precio
 * y muestra la estructura exacta de property_meta
 * 
 * Uso: node scripts/debug-prices.js
 */

const WORDPRESS_API_URL = 'http://localhost:10005/wp-json';

async function debugPrices() {
  console.log('🔍 Debugeando precios de propiedades...\n');
  console.log(`📡 WordPress API: ${WORDPRESS_API_URL}\n`);

  try {
    // Obtener las primeras 5 propiedades con _embed
    const url = `${WORDPRESS_API_URL}/wp/v2/properties?per_page=5&_embed=true`;
    console.log(`⏳ Solicitando: ${url}\n`);

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const properties = await response.json();

    if (!properties || properties.length === 0) {
      console.log('❌ No se encontraron propiedades');
      return;
    }

    console.log(`✅ ${properties.length} propiedades obtenidas\n`);
    console.log('='.repeat(80));

    properties.forEach((prop, index) => {
      console.log(`\n📦 PROPIEDAD ${index + 1}: ${prop.title?.rendered || 'Sin título'}`);
      console.log('-'.repeat(80));
      
      // Información básica
      console.log(`ID: ${prop.id}`);
      console.log(`Slug: ${prop.slug}`);
      
      // Verificar property_meta completo
      console.log('\n📋 property_meta:');
      if (prop.property_meta) {
        console.log(JSON.stringify(prop.property_meta, null, 2));
      } else {
        console.log('  ❌ No existe property_meta');
      }

      // Verificar ACF si existe
      console.log('\n📋 acf:');
      if (prop.acf) {
        console.log(JSON.stringify(prop.acf, null, 2));
      } else {
        console.log('  ⚠️  No existe acf');
      }

      // Verificar meta específica de precio
      console.log('\n💰 PRECIO:');
      const priceField = prop.property_meta?.property_price;
      console.log(`  property_meta.property_price: ${priceField} (tipo: ${typeof priceField})`);
      
      // Verificar si hay precio en ACF
      if (prop.acf?.price) {
        console.log(`  acf.price: ${prop.acf.price} (tipo: ${typeof prop.acf.price})`);
      }

      // Resultado del formatPrice
      const formattedPrice = formatPrice(priceField);
      console.log(`  ➡️ Precio formateado: "${formattedPrice}"`);
      
      console.log('='.repeat(80));
    });

    // Resumen
    console.log('\n📊 RESUMEN:');
    const withPrice = properties.filter(p => p.property_meta?.property_price).length;
    const withoutPrice = properties.length - withPrice;
    console.log(`  ✅ Con precio: ${withPrice}`);
    console.log(`  ❌ Sin precio: ${withoutPrice}`);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\n💡 Verifica que:');
    console.error('  1. WordPress está corriendo en http://localhost:10005');
    console.error('  2. El plugin Easy Real Estate está activado');
    console.error('  3. Las propiedades tienen precios asignados');
  }
}

/**
 * Función formatPrice para comparación
 * (copia de lib/wordpress.ts)
 */
function formatPrice(price, currency = '€') {
  if (!price || price === '0' || price === '') {
    return 'Consultar precio';
  }

  const numericPrice =
    typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price;

  if (isNaN(numericPrice)) {
    return 'Consultar precio';
  }

  // Formatear con separadores de miles
  const formatted = new Intl.NumberFormat('es-ES').format(numericPrice);

  return `${formatted}${currency}`;
}

// Ejecutar
debugPrices();
