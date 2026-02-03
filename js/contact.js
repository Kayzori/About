/**
 * Contact Module
 * Handles email copy functionality and contact form submission
 */

const ContactManager = {
  /**
   * Initialize contact functionality
   */
  init() {
    this.setupEmailCopy();
    this.setupContactForm();
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
  },

  /**
   * Setup contact form submission
   */
  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleFormSubmit(e));
  },

  /**
   * Handle form submission
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const statusDiv = document.getElementById('form-status');
    
    // Get form data
    const formData = new FormData(form);
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Portfolio Contact Message';
    const message = formData.get('message');
    
    // Disable submit button
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status';
    
    try {
      // Using Web3Forms API - Free with no limits
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a3f0c350-6c7d-4a8e-9c3d-8f7b3c2a4d6e',
          email: email,
          subject: subject,
          message: message,
          from_name: 'Portfolio Contact Form'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Success
        statusDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        statusDiv.className = 'form-status success';
        form.reset();
      } else {
        // Error from API
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      // Error
      console.error('Form submission error:', error);
      statusDiv.textContent = '✗ Failed to send message. Please try emailing me directly.';
      statusDiv.className = 'form-status error';
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  }
};

// Export for module usage, but also make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactManager;
}
