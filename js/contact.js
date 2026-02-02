/**
 * Contact Module
 * Handles email copy functionality
 */

const ContactManager = {
  /**
   * Initialize contact functionality
   */
  init() {
    this.setupEmailCopy();
  },

  /**
   * Setup email copy button functionality
   */
  setupEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => this.copyEmail());
  },

  /**
   * Copy email address to clipboard
   */
  async copyEmail() {
    const email = 'kayzori7@gmail.com';
    const copyBtn = document.getElementById('copy-email-btn');
    
    try {
      // Try using the modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        this.showCopySuccess(copyBtn);
      } else {
        // Fallback for older browsers
        this.copyEmailFallback(email, copyBtn);
      }
    } catch (err) {
      // If modern API fails, use fallback
      this.copyEmailFallback(email, copyBtn);
    }
  },

  /**
   * Fallback method for copying email (for older browsers)
   */
  copyEmailFallback(email, copyBtn) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess(copyBtn);
    } catch (err) {
      console.error('Failed to copy email:', err);
      this.showCopyError(copyBtn);
    }
    
    document.body.removeChild(textArea);
  },

  /**
   * Show success feedback when email is copied
   */
  showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  },

  /**
   * Show error feedback if copy fails
   */
  showCopyError(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '✗ Failed';
    
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 2000);
  }
};

// Export for module usage, but also make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactManager;
}
