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
    main: '/images/hero-smart-home.jpg', // Replace with your uploaded hero image
    alt: 'Modern smart home interior with automated lighting and WiFi connectivity',
  },
  about: {
    hero: '/images/hero-smart-home.jpg',
    team: '/images/about-team.jpg',
    office: '/images/about-mission.jpg',
    expertise: '/images/about-expertise.jpg',
    heroAlt: 'About Mokutu HomeTech',
    teamAlt: 'Our professional team installing smart devices',
    officeAlt: 'Smart home control panel',
    expertiseAlt: 'Our expertise in smart home solutions',
  },
  services: {
    installation: '/images/service-installation.jpg',
    wifi: '/images/service-wifi.jpg',
    security: '/images/service-security.jpg',
    lighting: '/images/service-lighting.jpg',
    setup: '/images/service-setup.jpg',
    installationAlt: 'Smart home installation service',
    wifiAlt: 'WiFi setup and optimization',
    securityAlt: 'Security camera installation',
    lightingAlt: 'Smart lighting installation',
    setupAlt: 'Smart device setup service',
  },
  contact: {
    banner: '/images/installer-panel.jpg',
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
