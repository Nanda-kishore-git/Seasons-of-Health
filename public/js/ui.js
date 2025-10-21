/**
 * UI module for handling interactive elements, animations, and navigation
 * Includes collapsible side menu, smooth scrolling, animations, and general UI interactions
 */

class UIManager {
    constructor() {
        this.init();
    }

    /**
     * Initialize all UI components
     */
    init() {
        this.initMenu();
        this.initSmoothScrolling();
        this.initAnimations();
        this.initFormHandlers();
        this.initAccessibility();
<<<<<<< HEAD
        this.initLanguageUpdates();
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
    }

    /**
     * Initialize collapsible side menu functionality
     */
    initMenu() {
        const hamburger = document.querySelector('.hamburger');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');

        if (hamburger && sideMenu && overlay) {
            // Toggle menu on hamburger click
            hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });

            // Close menu on overlay click
            overlay.addEventListener('click', () => {
                this.closeMenu();
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                    this.closeMenu();
                }
            });

            // Close menu on menu item click (for mobile)
            const menuItems = sideMenu.querySelectorAll('a');
            menuItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.closeMenu();
                });
            });
        }
    }

    /**
     * Toggle side menu visibility
     */
    toggleMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');
        const hamburger = document.querySelector('.hamburger');

        if (sideMenu && overlay) {
            sideMenu.classList.toggle('active');
            overlay.classList.toggle('active');

            // Update hamburger icon
            if (hamburger) {
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.className = sideMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                }
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    /**
     * Close side menu
     */
    closeMenu() {
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');
        const hamburger = document.querySelector('.hamburger');

        if (sideMenu && overlay) {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');

            // Reset hamburger icon
            if (hamburger) {
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }

            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    /**
     * Initialize smooth scrolling for navigation links
     */
    initSmoothScrolling() {
        // Handle hash links for same-page navigation
        const hashLinks = document.querySelectorAll('a[href^="#"]');
        hashLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    this.smoothScrollTo(targetElement);
                }
            });
        });
    }

    /**
     * Smooth scroll to a target element
     * @param {Element} target - Target element to scroll to
     */
    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // milliseconds
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function (ease-in-out)
            const easeInOut = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, startPosition + distance * easeInOut);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /**
     * Initialize scroll-triggered animations
     */
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.card, .feature-item, .info-section');
        animateElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });

        // Add fade-in animation for main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.classList.add('fade-in');
        }
    }

    /**
     * Initialize form handlers
     */
    initFormHandlers() {
        // Handle contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }

        // Mark inputs as modified when user types
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.dataset.userModified = 'true';
            });
        });
    }

    /**
     * Handle form submission with basic validation
     * @param {HTMLFormElement} form - Form element
     */
    async handleFormSubmission(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : 'Submit';

        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            // Basic validation
            const isValid = this.validateForm(form);
            if (!isValid) {
                throw new Error('Please fill in all required fields correctly.');
            }

            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            this.showNotification('Message sent successfully!', 'success');

            // Reset form
            form.reset();
            // Clear user modification flags
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => delete input.dataset.userModified);

        } catch (error) {
            this.showNotification(error.message, 'error');
        } finally {
            // Reset button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    }

    /**
     * Basic form validation
     * @param {HTMLFormElement} form - Form element
     * @returns {boolean} - True if form is valid
     */
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');

                // Email validation
                if (field.type === 'email' && !this.isValidEmail(field.value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    /**
     * Validate email address
     * @param {string} email - Email string
     * @returns {boolean} - True if email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show notification message
     * @param {string} message - Message text
     * @param {string} type - Message type ('success', 'error', 'info')
     */
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Initialize accessibility features
     */
    initAccessibility() {
        // Add skip link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Focus management for modal-like menu
        const sideMenu = document.getElementById('sideMenu');
        if (sideMenu) {
            const focusableElements = sideMenu.querySelectorAll('a, button');
            let firstFocusable = focusableElements[0];
            let lastFocusable = focusableElements[focusableElements.length - 1];

            sideMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        }
    }

    /**
     * Utility method to debounce functions
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utility method to throttle functions
     * @param {Function} func - Function to throttle
     * @param {number} limit - Limit time in milliseconds
     * @returns {Function} - Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
<<<<<<< HEAD

    /**
     * Initialize language change event handlers for dynamic content updates
     */
    initLanguageUpdates() {
        // Listen for language changes and update dynamic content
        if (languageManager) {
            // Create a proxy to intercept language changes
            const originalSetLanguage = languageManager.setLanguage.bind(languageManager);
            languageManager.setLanguage = async (language) => {
                await originalSetLanguage(language);
                this.updateDynamicContent();
            };
        }
    }

    /**
     * Update dynamic content when language changes
     */
    updateDynamicContent() {
        // Update weather display
        if (typeof weatherManager !== 'undefined') {
            weatherManager.updateWeatherDisplay();
        }

        // Update assistant quiz questions and results if in quiz mode
        if (typeof assistantManager !== 'undefined') {
            assistantManager.initQuizQuestions();
            if (assistantManager.currentMode === 'quiz') {
                assistantManager.showQuestion(assistantManager.currentQuestionIndex);
            }
            assistantManager.updateExistingMessagesLanguage();
        }
    }
=======
>>>>>>> bdf8335 (Initial commit: Seasons of Health project)
}

// Create global instance
const uiManager = new UIManager();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIManager;
}