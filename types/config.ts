/**
 * Tipos para Configuración del Sitio
 * Configuración general de WordPress y del tema
 */

import { SiteMenus } from './menu';

/**
 * Configuración completa del sitio desde WordPress
 * Endpoint: /wp-json/versus/v1/config
 */
export interface SiteConfig {
  site_name: string;
  site_description: string;
  site_url: string;
  home_url: string;
  language: string;
  timezone: string;
  date_format: string;
  time_format: string;
  menus: SiteMenus;
  languages: SiteLanguages;
  property_settings: PropertySettings;
}

/**
 * Idiomas disponibles en el sitio
 */
export interface SiteLanguages {
  [key: string]: string;
  es: string;
  en: string;
  fr: string;
  ca: string;
  ru?: string;
}

/**
 * Configuración específica de propiedades
 */
export interface PropertySettings {
  currency: string;
  currency_position: 'before' | 'after';
  thousands_separator: string;
  decimal_separator: string;
  default_area_unit: string;
}

/**
 * Información de contacto del sitio
 */
export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  country: string;
  postal_code?: string;
}

/**
 * Redes sociales del sitio
 */
export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
}

/**
 * Configuración de SEO desde Yoast
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  og_image?: string;
  twitter_card?: string;
  canonical_url?: string;
  robots?: string;
}

/**
 * Estadísticas generales del sitio
 * Endpoint: /wp-json/versus/v1/stats
 */
export interface SiteStats {
  total_properties: number;
  total_agents: number;
  total_posts: number;
  property_types: number;
  cities: number;
}

/**
 * Configuración de tema/diseño
 */
export interface ThemeConfig {
  logo_url?: string;
  logo_alt?: string;
  favicon_url?: string;
  primary_color?: string;
  secondary_color?: string;
  footer_text?: string;
  copyright_text?: string;
}

/**
 * Configuración completa para el frontend
 * Combina todas las configuraciones necesarias
 */
export interface AppConfig extends SiteConfig {
  contact?: ContactInfo;
  social?: SocialMedia;
  theme?: ThemeConfig;
  stats?: SiteStats;
}
