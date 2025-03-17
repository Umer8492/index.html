// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        menu.classList.remove('active');
      });
    });
    
    // Smooth scrolling for anchors
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.padding = '20px 0';
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        header.style.boxShadow = 'none';
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.section-header, .service-card, .timeline-item, .pricing-card, .contact-info, .contact-form');
    
    const revealOnScroll = function() {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };
    
    // Add revealed class to elements that are already in view on page load
    window.addEventListener('load', revealOnScroll);
    
    // Add revealed class to elements when they come into view while scrolling
    window.addEventListener('scroll', revealOnScroll);
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
      .section-header, .service-card, .timeline-item, .pricing-card, .contact-info, .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      .service-card:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      .service-card:nth-child(3) {
        transition-delay: 0.2s;
      }
      
      .service-card:nth-child(4) {
        transition-delay: 0.3s;
      }
      
      .service-card:nth-child(5) {
        transition-delay: 0.4s;
      }
      
      .service-card:nth-child(6) {
        transition-delay: 0.5s;
      }
      
      .timeline-item:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      .timeline-item:nth-child(3) {
        transition-delay: 0.2s;
      }
      
      .timeline-item:nth-child(4) {
        transition-delay: 0.3s;
      }
      
      .pricing-card:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      .pricing-card:nth-child(3) {
        transition-delay: 0.2s;
      }
    `;
    document.head.appendChild(style);
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
          name: this.querySelector('input[type="text"]').value,
          email: this.querySelector('input[type="email"]').value,
          subject: this.querySelector('input[placeholder="Subject"]').value,
          message: this.querySelector('textarea').value
        };
        
        // Simple form validation
        if (!formData.name || !formData.email || !formData.message) {
          alert('Please fill in all required fields.');
          return;
        }
        
        // You would typically send this data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        successMessage.style.cssText = `
          background-color: rgba(39, 174, 96, 0.2);
          color: #2ecc71;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
          text-align: center;
        `;
        
        contactForm.appendChild(successMessage);
        
        // Clear form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      });
    }
    
    // Animated counter for stats (if needed in the future)
    function animateCounters() {
      document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!email) {
          alert('Please enter your email address.');
          return;
        }
        
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Clear form
        this.reset();
      });
    }
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  });