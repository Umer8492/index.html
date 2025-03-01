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
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      
      // Handle Image Upload to ImgBB
      const imageFile = formData.get("paymentScreenshot");
      if (imageFile && imageFile.size > 0) {
        const imgBBApiKey = "3aa87ebc3a2c4423a957af8641a10851"; // 🔥 Replace with your actual API key
        const imgBBUrl = "https://api.imgbb.com/1/upload";
        const imageFormData = new FormData();
        imageFormData.append("key", imgBBApiKey);
        imageFormData.append("image", imageFile);

        try {
          const imgResponse = await fetch(imgBBUrl, {
            method: "POST",
            body: imageFormData,
          });
          const imgResult = await imgResponse.json();
          if (imgResult.success) {
            formData.append("paymentScreenshotUrl", imgResult.data.url);
          } else {
            alert("Image upload failed. Please try again.");
            return;
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("There was an issue uploading your image.");
          return;
        }
      }

      // Send data to email using Formspree
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      fetch('https://formspree.io/f/xldgpqpn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
      .then(response => {
        if (response.ok) {
          // ✅ Form successful -> Redirect to success page
          window.location.href = "Formsubmission.html";
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
      });
    });
  }

  // Particle animation config
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
