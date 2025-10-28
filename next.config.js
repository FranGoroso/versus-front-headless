/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido output: 'export' para permitir SSR/ISR
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  images: {
    // Permitir imágenes desde WordPress
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'versusandorra.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'versusandorra.com', // Para producción
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // WordPress en VPS Hostinger (NUEVO)
      {
        protocol: 'https',
        hostname: 'srv871306.hstgr.cloud',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // Mantener imágenes de Pexels para placeholders
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      // Imágenes de Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Permitir avatares de Gravatar (usuarios de WordPress)
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;