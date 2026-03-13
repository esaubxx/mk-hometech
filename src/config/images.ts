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
    main: 'https://static.wixstatic.com/media/7ab59d_4377a6976ce645758961a7dcd5903a58~mv2.jpg',
    alt: 'Modern smart home interior with automated lighting and WiFi connectivity',
  },
  about: {
    hero: 'https://static.wixstatic.com/media/7ab59d_4377a6976ce645758961a7dcd5903a58~mv2.jpg',
    team: 'https://static.wixstatic.com/media/7ab59d_408e532e4a504da598e82e56a6df655c~mv2.jpg',
    office: 'https://static.wixstatic.com/media/7ab59d_9c63dbb0262d4cc3bd7f5a294fac58a1~mv2.jpg',
    expertise: 'https://static.wixstatic.com/media/7ab59d_81709be797b1410db0affcc1784618cf~mv2.jpg',
    heroAlt: 'About Mokutu HomeTech',
    teamAlt: 'Our professional team installing smart devices',
    officeAlt: 'Smart home control panel',
    expertiseAlt: 'Our expertise in smart home solutions',
  },
  services: {
    installation: 'https://static.wixstatic.com/media/7ab59d_4c272ff7c99e42bf97653d7f4820d6cd~mv2.jpg',
    wifi: 'https://static.wixstatic.com/media/7ab59d_7696d9a92d99451bb577097a60a09de6~mv2.jpg',
    security: 'https://static.wixstatic.com/media/7ab59d_ccb6bb53c0a94d32a388dcf23f1a038d~mv2.jpg',
    lighting: 'https://static.wixstatic.com/media/7ab59d_86cc1081cf984114908643cc040cb5ee~mv2.jpg',
    setup: 'https://static.wixstatic.com/media/7ab59d_f9b4f74cac6b4a098b8a3457ad990fec~mv2.jpg',
    installationAlt: 'Smart home installation service',
    wifiAlt: 'WiFi setup and optimization',
    securityAlt: 'Security camera installation',
    lightingAlt: 'Smart lighting installation',
    setupAlt: 'Smart device setup service',
  },
  contact: {
    banner: 'https://static.wixstatic.com/media/7ab59d_4377a6976ce645758961a7dcd5903a58~mv2.jpg',
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
