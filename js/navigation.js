/**
 * Navigation Module
 * Handles mobile menu toggle and smooth scrolling
 */

const Navigation = {
  /**
   * Initialize navigation functionality
   */
  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
  },

  /**
   * Setup mobile menu toggle functionality
   */
  setupMobileMenu() {
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const headerContainer = document.querySelector('.site-header .container');
    headerContainer.appendChild(menuToggle);
    
    const nav = document.querySelector('.site-header nav');
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.site-header nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  },

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
};

// Export for module usage, but also make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
