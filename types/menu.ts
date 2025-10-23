/**
 * Tipos para Menús y Navegación de WordPress
 */

/**
 * Item de menú de WordPress
 */
export interface WPMenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
  parent: string | number;
  order: number;
  classes: string[];
  attr_title?: string;
  description?: string;
  object?: string;
  object_id?: number;
  type?: string;
  type_label?: string;
}

/**
 * Menú completo de WordPress con sus items
 */
export interface WPMenu {
  name: string;
  items: WPMenuItem[];
}

/**
 * Todos los menús del sitio por ubicación
 */
export interface SiteMenus {
  'main-menu'?: WPMenu;
  'responsive-menu'?: WPMenu;
  'footer-menu'?: WPMenu;
  [key: string]: WPMenu | undefined;
}

/**
 * Item de menú formateado para el frontend
 * Con soporte para submenús anidados
 */
export interface MenuItem {
  id: number;
  title: string;
  url: string;
  target?: string;
  children?: MenuItem[];
  classes?: string[];
  isActive?: boolean;
  isExternal?: boolean;
}

/**
 * Menú con estructura jerárquica para navegación
 */
export interface NavigationMenu {
  name: string;
  location: string;
  items: MenuItem[];
}

/**
 * Breadcrumb para navegación
 */
export interface Breadcrumb {
  title: string;
  url?: string;
  isActive: boolean;
}

/**
 * Configuración de navegación del sitio
 */
export interface SiteNavigation {
  mainMenu: MenuItem[];
  mobileMenu: MenuItem[];
  footerMenu?: MenuItem[];
  breadcrumbs?: Breadcrumb[];
}
