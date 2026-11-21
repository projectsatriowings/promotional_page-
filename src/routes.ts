/**
 * Centralized Application Routes
 * Used across App router, Navbar, Footer, and in-page navigation.
 */
export const ROUTES = {
  // 1. Digital Marketing COURSE Page (Original)
  DM_COURSE: '/digital-marketing-course',

  // 2. 3 Kids AI & Tech Program COURSE Page (Original Restored)
  KIDS_COURSE: '/4-kids-chennai',

  // 3. Digital Marketing WORKSHOP Page
  DM_WORKSHOP: '/workshop/digital-marketing',

  // 4. 3 Kids AI & Tech WORKSHOP Page
  KIDS_WORKSHOP: '/workshop/kids-ai-tech',

  // Workshop Hub & Overview
  WORKSHOP: '/workshop',
  WORKSHOPS: '/workshops',

  // Root & Aliases
  HOME: '/',
  KIDS_ALIAS: '/kids',
  DM_WORKSHOP_ALIAS: '/digital-marketing',
} as const;

export default ROUTES;
