/**
 * Image Configuration
 * Centralized location for all site images that can be easily replaced
 * Update these URLs to change images across the entire site
 * 
 * Images are organized by page/section for easy management
 * All images are replaceable - simply update the URLs below
 */

export const SITE_IMAGES = {
  // Hero Section - Homepage
  hero: {
    main: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
    alt: 'Modern smart home interior with automated lighting and WiFi connectivity',
  },
  
  // About Page Images
  about: {
    hero: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
    team: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
    office: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
    heroAlt: 'About Mokutu HomeTech',
    teamAlt: 'Our professional team',
    officeAlt: 'Our office space',
  },
  
  // Contact Page Images
  contact: {
    banner: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
    bannerAlt: 'Contact us for smart home solutions',
  },
};

/**
 * Get image URL with fallback
 * @param category - Image category (hero, about, contact, etc.)
 * @param key - Image key within category
 * @param fallback - Fallback URL if not found
 */
export const getImageUrl = (
  category: keyof typeof SITE_IMAGES,
  key: string,
  fallback?: string
): string => {
  const categoryImages = SITE_IMAGES[category] as Record<string, string>;
  return categoryImages?.[key] || fallback || '';
};
