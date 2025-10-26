/**
 * Script de debugging para investigar datos del equipo
 * Ejecutar en la consola del navegador o en el servidor
 * 
 * Para usar en navegador:
 * 1. Abrir http://localhost:3000/nuestro-equipo
 * 2. Abrir DevTools (F12)
 * 3. Ir a Console
 * 4. Buscar logs que digan "[Team Debug]"
 */

// Agregar al componente nuestro-equipo/page.tsx temporalmente
// para ver los datos crudos que vienen de WordPress

export function debugTeamMemberData(members: any[]) {
  console.log('='.repeat(60));
  console.log('[Team Debug] Total miembros:', members.length);
  console.log('='.repeat(60));
  
  members.forEach((member, index) => {
    console.log(`\n[Team Debug] Miembro #${index + 1}:`);
    console.log('-----------------------------------');
    console.log('Nombre:', member.title?.rendered || member.name || 'NO DISPONIBLE');
    console.log('ID:', member.id);
    console.log('\nIMÁGENES DISPONIBLES:');
    
    // Imagen destacada
    if (member._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      console.log('✓ Featured Media (embebido):', member._embedded['wp:featuredmedia'][0].source_url);
    } else {
      console.log('✗ Featured Media (embebido): NO');
    }
    
    // Featured media ID
    if (member.featured_media) {
      console.log('✓ Featured Media ID:', member.featured_media);
    } else {
      console.log('✗ Featured Media ID: NO');
    }
    
    // Featured media URL directa
    if (member.featured_media_url) {
      console.log('✓ Featured Media URL:', member.featured_media_url);
    } else {
      console.log('✗ Featured Media URL: NO');
    }
    
    // Avatares
    if (member.avatar_urls) {
      console.log('✓ Avatar URLs:', Object.keys(member.avatar_urls).length, 'tamaños');
      console.log('  Mejor avatar:', member.avatar_urls[Object.keys(member.avatar_urls).sort((a, b) => Number(b) - Number(a))[0]]);
    } else {
      console.log('✗ Avatar URLs: NO');
    }
    
    // ACF Fields
    if (member.acf) {
      console.log('✓ ACF Fields disponibles:');
      if (member.acf.photo) {
        console.log('  - photo:', typeof member.acf.photo === 'string' ? member.acf.photo : member.acf.photo?.url || 'objeto sin url');
      }
      if (member.acf.image) {
        console.log('  - image:', typeof member.acf.image === 'string' ? member.acf.image : member.acf.image?.url || 'objeto sin url');
      }
      if (member.acf.profile_image) {
        console.log('  - profile_image:', typeof member.acf.profile_image === 'string' ? member.acf.profile_image : member.acf.profile_image?.url || 'objeto sin url');
      }
      if (!member.acf.photo && !member.acf.image && !member.acf.profile_image) {
        console.log('  ✗ No hay campos de imagen en ACF');
      }
    } else {
      console.log('✗ ACF Fields: NO');
    }
    
    // Otros campos
    if (member.image_url) {
      console.log('✓ Image URL directa:', member.image_url);
    } else {
      console.log('✗ Image URL directa: NO');
    }
    
    console.log('\nOTROS DATOS:');
    console.log('Email:', member.acf?.email || member.email || 'NO');
    console.log('Teléfono:', member.acf?.phone || member.acf?.telefono || 'NO');
    console.log('Cargo:', member.acf?.position || member.acf?.cargo || 'NO');
    
    console.log('\nOBJETO COMPLETO:');
    console.log(member);
    console.log('-----------------------------------\n');
  });
  
  console.log('='.repeat(60));
}

// Instrucciones para usar en WordPress
export const wordpressDebugInstructions = `
===================================================================
CÓMO VERIFICAR DATOS EN WORDPRESS
===================================================================

1. VERIFICAR IMAGEN DE TXEMA EN WORDPRESS:
   - Ir a: http://versusandorra.local/wp-admin
   - Menú lateral → "Agentes" o "Equipo" (buscar el CPT correcto)
   - Encontrar a TXEMA en la lista
   - Click en "Editar"
   - Verificar que tiene:
     ✓ Imagen destacada (Featured Image) en el sidebar derecho
     ✓ O campo de imagen en los campos ACF (Advanced Custom Fields)

2. VERIFICAR CAMPOS ACF (si se usan):
   - En el editor de TXEMA
   - Scroll hacia abajo
   - Buscar sección de "Campos personalizados" o "ACF"
   - Verificar campos:
     - photo / image / profile_image
     - email
     - phone / telefono
     - position / cargo

3. VERIFICAR ENDPOINT EN POSTMAN/BROWSER:
   - Abrir en navegador:
     http://versusandorra.local/wp-json/wp/v2/agents?_embed=true
   
   - O probar otros endpoints:
     http://versusandorra.local/wp-json/wp/v2/team?_embed=true
     http://versusandorra.local/wp-json/wp/v2/team_members?_embed=true
     http://versusandorra.local/wp-json/wp/v2/equipo?_embed=true
   
   - Buscar en el JSON el objeto de TXEMA
   - Verificar que contiene:
     ✓ featured_media (número ID)
     ✓ _embedded['wp:featuredmedia'][0].source_url
     ✓ acf.photo o acf.image

4. VERIFICAR PERMISOS DE MEDIOS:
   - Ir a: Medios → Biblioteca
   - Buscar la foto de TXEMA
   - Click en la imagen
   - Copiar la URL
   - Pegarla en navegador para verificar que carga

5. SI LA IMAGEN NO SE VE:
   - Volver a subir la foto en WordPress
   - Asignarla como "Imagen destacada"
   - O guardarla en el campo ACF correspondiente
   - Guardar/Actualizar el post

===================================================================
`;

console.log(wordpressDebugInstructions);
