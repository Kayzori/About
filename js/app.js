/**
 * Main Application Entry Point
 * Initializes all modules when DOM is ready
 */

/**
 * Initialize application
 */
function initApp() {
  // Initialize theme management
  if (typeof ThemeManager !== 'undefined') {
    ThemeManager.init();
  }
  
  // Initialize navigation
  if (typeof Navigation !== 'undefined') {
    Navigation.init();
  }
  
  // Initialize contact functionality
  if (typeof ContactManager !== 'undefined') {
    ContactManager.init();
  }
  
  console.log('Portfolio website initialized successfully!');
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', initApp);
