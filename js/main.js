/**
 * Greenbees Studio — Main Application Entry Point
 * Orchestrates Lenis, GSAP, Stem Rail, and Hero Interactions
 */

import { initSmoothScroll } from './smooth-scroll.js';
import { initStemProgress } from './stem-progress.js';
import { initHeroVine } from './hero-vine.js';
import { initCursorDrift } from './cursor-drift.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = initSmoothScroll();

  // 2. Initialize Left-Docked Living Stem Progress
  initStemProgress(lenis);

  // 3. Initialize Scroll-Driven Hero Vine
  initHeroVine();

  // 4. Initialize Subtle Cursor Drift
  initCursorDrift();

  // 5. Navigation Solidification on Scroll
  const siteNav = document.querySelector('.site-nav');
  function updateNav() {
    if (!siteNav) return;
    if (window.scrollY > 40) {
      siteNav.classList.add('is-scrolled');
    } else {
      siteNav.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // 6. Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });
  }

  console.log('🌿 Greenbees Studio online. Growth narrative initialized.');
});
