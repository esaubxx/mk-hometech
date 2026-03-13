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
    main: 'https://static.wixstatic.com/media/7ab59d_c964e659fad241e49d9e3873446ddf24~mv2.jpg',
    alt: 'Modern smart home interior with automated lighting and WiFi connectivity',
  },
  about: {
    hero: 'https://static.wixstatic.com/media/7ab59d_c964e659fad241e49d9e3873446ddf24~mv2.jpg',
    team: 'https://static.wixstatic.com/media/7ab59d_18dc7d1d58de4b88894783f550d78909~mv2.jpg',
    office: 'https://static.wixstatic.com/media/7ab59d_b42209407683475aaf1008fe590eaa04~mv2.jpg',
    expertise: 'https://static.wixstatic.com/media/7ab59d_01cc9e7a467143f4b425694868cfdca0~mv2.jpg',
    heroAlt: 'About Mokutu HomeTech',
    teamAlt: 'Our professional team installing smart devices',
    officeAlt: 'Smart home control panel',
    expertiseAlt: 'Our expertise in smart home solutions',
  },
  contact: {
    banner: 'https://static.wixstatic.com/media/7ab59d_c964e659fad241e49d9e3873446ddf24~mv2.jpg',
    bannerAlt: 'Contact us for smart home solutions',
  },
  services: {
    installation: 'https://static.wixstatic.com/media/7ab59d_e8ed3a2c0ca24ff0aa329a6c42375f6b~mv2.jpg',
    wifi: 'https://static.wixstatic.com/media/7ab59d_56b1267a247e41a8a5f0ee3e1f854c14~mv2.jpg',
    security: 'https://static.wixstatic.com/media/7ab59d_e08b40868b43489e990664e6ffb0cfff~mv2.jpg',
    lighting: 'https://static.wixstatic.com/media/7ab59d_589b8fcbff994d328e653ca1589ecca7~mv2.jpg',
    setup: 'https://static.wixstatic.com/media/7ab59d_5949cccd247a475b9e967c1eb2217c65~mv2.jpg',
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
