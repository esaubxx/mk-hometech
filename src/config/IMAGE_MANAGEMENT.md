# Image Management Guide

This document explains how to manage and replace images across the Mokutu HomeTech website.

## Overview

All static images used throughout the site are centrally managed in `/src/config/images.ts`. This approach allows you to:
- Update images in one place and have changes reflected across the entire site
- Easily swap images without touching component code
- Maintain consistency across all pages
- Organize images by page/section for clarity

## How to Update Images

### Step 1: Locate the Image Configuration File
Open `/src/config/images.ts`

### Step 2: Find the Image You Want to Replace
Images are organized by page/section:

```typescript
export const SITE_IMAGES = {
  hero: {
    main: 'https://...',      // Homepage hero image
    alt: 'Alt text here',
  },
  about: {
    team: 'https://...',      // About page team image
    office: 'https://...',    // About page office image
    // ... more images
  },
  contact: {
    banner: 'https://...',    // Contact page banner
    // ... more images
  },
};
```

### Step 3: Replace the URL
Simply replace the image URL with your new image URL:

```typescript
// Before
hero: {
  main: 'https://static.wixstatic.com/media/7ab59d_cadb6df63e42419f8a8d4a348e9c7031~mv2.jpg',
}

// After
hero: {
  main: 'https://your-new-image-url.jpg',
}
```

### Step 4: Update Alt Text (Optional)
Update the alt text to describe your new image:

```typescript
hero: {
  main: 'https://your-new-image-url.jpg',
  alt: 'Your new image description',
}
```

## Where Images Are Used

### Homepage (`/src/components/pages/HomePage.tsx`)
- **Hero Section**: `SITE_IMAGES.hero.main`
  - Large featured image on the right side of the hero section
  - Dimensions: Responsive (4:3 aspect ratio on mobile, square on desktop)

### About Page (`/src/components/pages/AboutPage.tsx`)
- **Who We Are Section**: `SITE_IMAGES.about.team`
  - Image on the right side of the "Who We Are" section
  - Dimensions: 384px height, responsive width
  
- **Our Mission Section**: `SITE_IMAGES.about.office`
  - Image on the left side of the "Our Mission" section
  - Dimensions: 384px height, responsive width

### Contact Page (`/src/components/pages/ContactPage.tsx`)
- **Contact Information Section**: `SITE_IMAGES.contact.banner`
  - Large image on the right side of the contact form
  - Dimensions: 384px height, responsive width

## Adding New Images

If you need to add new images to the site:

1. **Add to the configuration** in `/src/config/images.ts`:
```typescript
export const SITE_IMAGES = {
  // ... existing images
  newSection: {
    image1: 'https://your-image-url.jpg',
    image1Alt: 'Description of image 1',
  },
};
```

2. **Use in your component**:
```typescript
import { SITE_IMAGES } from '@/config/images';

// In your component
<Image
  src={SITE_IMAGES.newSection.image1}
  alt={SITE_IMAGES.newSection.image1Alt}
  className="w-full h-full object-cover"
/>
```

## Product and Service Images

**Note**: Product images (`itemImage`) and Service images (`serviceImage`) are managed through the CMS database, not through this configuration file. These images are:
- Stored in the CMS collections: `smarthomeproducts` and `smarthomeservices`
- Automatically displayed on product and service pages
- Easily replaceable through the Wix dashboard at: https://manage.wix.com/dashboard

To update product/service images:
1. Go to the Wix dashboard
2. Navigate to the Collections section
3. Edit the specific product or service item
4. Update the image field
5. Changes will automatically appear on the website

## Image URL Format

All images should be:
- **HTTPS URLs** (secure)
- **Direct image links** (not HTML pages)
- **Supported formats**: JPG, PNG, WebP, GIF
- **Recommended size**: 1200px width minimum for best quality

## Best Practices

1. **Use descriptive alt text** - Always include meaningful alt text for accessibility
2. **Optimize image size** - Compress images before uploading to improve page load speed
3. **Consistent dimensions** - Keep images in similar aspect ratios for visual consistency
4. **Test changes** - After updating an image URL, refresh the page to verify the change
5. **Backup URLs** - Keep a record of old image URLs in case you need to revert

## Troubleshooting

### Image not showing?
- Check that the URL is correct and accessible
- Verify the URL is HTTPS (not HTTP)
- Ensure the image file still exists at that URL
- Check browser console for any error messages

### Image looks stretched or distorted?
- The image uses `object-cover` which maintains aspect ratio
- Ensure your image has a reasonable aspect ratio
- Consider the container dimensions when choosing images

### Changes not appearing?
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Do a hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check that you saved the changes to `images.ts`

## Questions?

For more information about image management or to request additional image locations, please refer to the main project documentation.
