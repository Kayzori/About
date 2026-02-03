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
    
    console.log('Form submission started');
    
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    
    if (!submitBtn) {
      console.error('Submit button not found');
      return;
    }
    
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const statusDiv = document.getElementById('form-status');
    
    if (!statusDiv) {
      console.error('Status div not found');
      return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name') || 'Anonymous';
    const email = formData.get('email');
    const subject = formData.get('subject') || 'Portfolio Contact Message';
    const message = formData.get('message');
    
    console.log('Form data:', { name, email, subject, message });
    
    // Validate
    if (!email || !message) {
      statusDiv.textContent = 'Please fill in required fields (Email and Message)';
      statusDiv.className = 'form-status error';
      statusDiv.style.display = 'block';
      return;
    }
    
    // Disable submit button
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';
    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status';
    
    try {
      console.log('Sending request to Web3Forms...');
      
      // Using Web3Forms API - Free with no limits
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0455dba6-4960-4716-a463-b2adf44a4992',
          name: name,
          email: email,
          subject: subject,
          message: message,
          from_name: 'Portfolio Contact Form'
        })
      });
      
      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);
      
      if (result.success) {
        // Success
        statusDiv.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        statusDiv.className = 'form-status success';
        statusDiv.style.display = 'block';
        form.reset();
      } else {
        // Error from API
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      // Error
      console.error('Form submission error:', error);
      statusDiv.textContent = '✗ Error: ' + error.message + ' - Please email kayzori7@gmail.com directly';
      statusDiv.className = 'form-status error';
      statusDiv.style.display = 'block';
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  }
};

// Export for module usage, but also make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactManager;
}
