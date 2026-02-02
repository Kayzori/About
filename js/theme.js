/**
 * Theme Management Module
 * Handles dark/light theme toggling and persistence
 */

const ThemeManager = {
  /**
   * Initialize theme from localStorage or default to light
   */
  init() {
    const toggleBtn = document.getElementById('theme-toggle');
    
    // Load saved theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      toggleBtn.textContent = '☀️';
    }

    // Add event listener for theme toggle
    toggleBtn.addEventListener('click', () => this.toggleTheme());
  },

  /**
   * Toggle between dark and light themes
   */
  toggleTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
};

// Export for module usage, but also make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
