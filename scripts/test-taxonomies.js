/**
 * Script de test para verificar extracción de taxonomías
 * Verifica que las taxonomías se extraigan correctamente de _embedded['wp:term']
 * 
 * USO:
 * node scripts/test-taxonomies.js
 */

const WORDPRESS_API_URL = 'http://versusandorra.local/wp-json';

/**
 * Realizar petición a WordPress API
 */
async function fetchAPI(endpoint) {
  const url = `${WORDPRESS_API_URL}${endpoint}`;
  console.log(`\n🔍 Fetching: ${url}\n`);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`❌ Error:`, error.message);
    return null;
  }
}

/**
 * Extraer taxonomías del objeto _embedded['wp:term']
 */
function extractTaxonomies(embedded) {
  const result = {
    types: [],
    statuses: [],
    features: [],
    cities: [],
  };

  if (!embedded || !embedded['wp:term'] || !Array.isArray(embedded['wp:term'])) {
    return result;
  }

  const wpTermArray = embedded['wp:term'];

  wpTermArray.forEach((termGroup) => {
    if (!Array.isArray(termGroup)) return;

    termGroup.forEach((term) => {
      switch (term.taxonomy) {
        case 'property-type':
          result.types.push(term);
          break;
        case 'property-status':
          result.statuses.push(term);
          break;
        case 'property-feature':
          result.features.push(term);
          break;
        case 'property-city':
          result.cities.push(term);
          break;
      }
    });
  });

  return result;
}

/**
 * Test principal
 */
async function testTaxonomies() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('🧪 TEST: Extracción de Taxonomías desde _embedded');
  console.log('═══════════════════════════════════════════════════════');

  // Obtener propiedades con _embed
  const properties = await fetchAPI('/wp/v2/properties?_embed=true&per_page=3');
  
  if (!properties || properties.length === 0) {
    console.log('❌ No se obtuvieron propiedades');
    return;
  }

  console.log(`✅ Se obtuvieron ${properties.length} propiedades\n`);

  // Procesar cada propiedad
  properties.forEach((property, index) => {
    console.log('─────────────────────────────────────────────────────');
    console.log(`📦 PROPIEDAD ${index + 1}: ${property.title.rendered}`);
    console.log(`   ID: ${property.id}`);
    console.log(`   Slug: ${property.slug}`);
    console.log('─────────────────────────────────────────────────────');

    // Verificar si tiene _embedded
    if (!property._embedded) {
      console.log('   ⚠️  No tiene objeto _embedded');
      return;
    }

    // Extraer taxonomías
    const taxonomies = extractTaxonomies(property._embedded);

    // Mostrar tipos de propiedad
    console.log('\n   🏠 TIPOS DE PROPIEDAD:');
    if (taxonomies.types.length > 0) {
      taxonomies.types.forEach(type => {
        console.log(`      ✓ ${type.name} (slug: ${type.slug}, id: ${type.id})`);
      });
    } else {
      console.log('      (ninguno)');
    }

    // Mostrar estados
    console.log('\n   📊 ESTADOS:');
    if (taxonomies.statuses.length > 0) {
      taxonomies.statuses.forEach(status => {
        console.log(`      ✓ ${status.name} (slug: ${status.slug}, id: ${status.id})`);
      });
    } else {
      console.log('      (ninguno)');
    }

    // Mostrar características
    console.log('\n   ⭐ CARACTERÍSTICAS:');
    if (taxonomies.features.length > 0) {
      taxonomies.features.forEach(feature => {
        console.log(`      ✓ ${feature.name} (slug: ${feature.slug}, id: ${feature.id})`);
      });
    } else {
      console.log('      (ninguno)');
    }

    // Mostrar ciudades
    console.log('\n   🌍 CIUDADES:');
    if (taxonomies.cities.length > 0) {
      taxonomies.cities.forEach(city => {
        console.log(`      ✓ ${city.name} (slug: ${city.slug}, id: ${city.id})`);
      });
    } else {
      console.log('      (ninguno)');
    }

    console.log('\n');
  });

  // Resumen final
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 RESUMEN DEL TEST');
  console.log('═══════════════════════════════════════════════════════');
  
  let totalTypes = 0;
  let totalStatuses = 0;
  let totalFeatures = 0;
  let totalCities = 0;

  properties.forEach(property => {
    if (property._embedded) {
      const taxonomies = extractTaxonomies(property._embedded);
      totalTypes += taxonomies.types.length;
      totalStatuses += taxonomies.statuses.length;
      totalFeatures += taxonomies.features.length;
      totalCities += taxonomies.cities.length;
    }
  });

  console.log(`   Total de tipos extraídos: ${totalTypes}`);
  console.log(`   Total de estados extraídos: ${totalStatuses}`);
  console.log(`   Total de características extraídas: ${totalFeatures}`);
  console.log(`   Total de ciudades extraídas: ${totalCities}`);
  console.log('');

  if (totalTypes > 0 || totalStatuses > 0 || totalFeatures > 0 || totalCities > 0) {
    console.log('✅ TEST EXITOSO: Las taxonomías se están extrayendo correctamente');
  } else {
    console.log('⚠️  ADVERTENCIA: No se encontraron taxonomías en las propiedades');
  }

  console.log('═══════════════════════════════════════════════════════\n');
}

// Ejecutar test
testTaxonomies().catch(error => {
  console.error('❌ Error en el test:', error);
  process.exit(1);
});
