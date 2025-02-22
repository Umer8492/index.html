document.addEventListener("DOMContentLoaded", () => {
  // Testimonials Animation Code
  const container = document.querySelector('.testimonials-container');
  const cardsWrapper = document.querySelector('.testimonial-cards');
  
  if (cardsWrapper) {
    // Clone all cards for seamless loop
    const cards = document.querySelectorAll('.testimonial-cards .card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      cardsWrapper.appendChild(clone);
    });

    // Reset animation when it ends
    cardsWrapper.addEventListener('animationiteration', () => {
      cardsWrapper.style.animation = 'none';
      void cardsWrapper.offsetWidth; // Trigger reflow
      cardsWrapper.style.animation = 'slide 20s linear infinite';
    });
  }

  // Form Submission Code
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Send data to email using Formspree
      fetch('https://formspree.io/f/xldgpqpn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        alert('Thank you for your submission! We will get back to you shortly.');
        form.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
      });
    });
  }
});
// Particle animation config
document.addEventListener("DOMContentLoaded", () => {
  // Existing code
  
  // Add particles animation
  if(document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80 },
        color: { value: '#00ffcc' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00ffcc',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        }
      },
      retina_detect: true
    });
  }
});