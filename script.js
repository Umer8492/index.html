
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Background Canvas
    initBackgroundEffect();
    
    // Navigation
    initNavigation();
    
    // Hero Animation
    animateHeroTitle();
    
    // Crypto Ticker
    initCryptoTicker();
    
    // Stats Counter Animation
    initStatsCounter();
  });
  
  // Background Effect with Canvas
  function initBackgroundEffect() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function setCanvasDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle configuration
    const particleCount = 80;
    const particles = [];
    
    // Create particles
    function createParticles() {
      for (let i = 0; i < particleCount; i++) {
        const colors = [
          'rgba(255, 95, 31, 0.2)', // Neon Orange
          'rgba(0, 255, 255, 0.2)',  // Neon Blue
          'rgba(157, 0, 255, 0.2)',  // Neon Purple
          'rgba(0, 255, 157, 0.2)'   // Neon Green
        ];
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }
    
    // Update particle positions
    function updateParticles() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].speedX;
        particles[i].y += particles[i].speedY;
        
        // Boundary conditions
        if (particles[i].x < 0 || particles[i].x > canvas.width) {
          particles[i].speedX *= -1;
        }
        if (particles[i].y < 0 || particles[i].y > canvas.height) {
          particles[i].speedY *= -1;
        }
      }
    }
    
    // Draw particles and connections
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(18, 18, 20, 0.8)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      const gridSize = 30;
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
  }
  
  // Navigation
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Toggle icon
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // Hero Title Animation
  function animateHeroTitle() {
    const title = document.getElementById('hero-title');
    const text = title.innerText;
    title.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'char';
      span.innerText = text[i] === ' ' ? '\u00A0' : text[i];
      span.style.animationDelay = `${i * 0.05}s`;
      title.appendChild(span);
    }
  }
  
  // Crypto Ticker
  function initCryptoTicker() {
    const tickerContent = document.getElementById('ticker-content');
    
    // Sample crypto data - in a real app, fetch this from an API
    const cryptoData = [
      { name: 'Bitcoin', symbol: 'BTC', price: 37492.28, change24h: 2.34 },
      { name: 'Ethereum', symbol: 'ETH', price: 2041.15, change24h: -1.27 },
      { name: 'Solana', symbol: 'SOL', price: 58.67, change24h: 5.82 },
      { name: 'Cardano', symbol: 'ADA', price: 0.378, change24h: 0.65 },
      { name: 'Dogecoin', symbol: 'DOGE', price: 0.0789, change24h: -2.41 },
    ];
    
    // Create ticker items
    function createTickerItems(data) {
      let html = '';
      
      data.forEach(crypto => {
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = crypto.change24h >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        html += `
          <div class="ticker-item">
            <span class="ticker-name">${crypto.name}</span>
            <span class="ticker-symbol">${crypto.symbol}</span>
            <span class="ticker-price">$${formatPrice(crypto.price)}</span>
            <span class="ticker-change ${changeClass}">
              <i class="fas ${changeIcon}"></i>
              ${Math.abs(crypto.change24h).toFixed(2)}%
            </span>
          </div>
        `;
      });
      
      // Duplicate for continuous scrolling
      html += html;
      
      return html;
    }
    
    // Format price based on value
    function formatPrice(price) {
      return price.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: price < 1 ? 4 : 2 
      });
    }
    
    // Render ticker
    tickerContent.innerHTML = createTickerItems(cryptoData);
    
    // Update prices periodically to simulate live data
    setInterval(() => {
      cryptoData.forEach(crypto => {
        crypto.price = crypto.price * (1 + (Math.random() - 0.5) * 0.01);
        crypto.change24h = crypto.change24h + (Math.random() - 0.5) * 0.5;
      });
      
      tickerContent.innerHTML = createTickerItems(cryptoData);
    }, 3000);
  }
  
  // Stats Counter Animation
  function initStatsCounter() {
    const counters = {
      'members-count': { final: 5000, current: 0 },
      'success-rate': { final: 94, current: 0 },
      'profitability': { final: 217, current: 0 },
      'signals-count': { final: 1250, current: 0 }
    };
    
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      for (const counterId in counters) {
        const el = document.getElementById(counterId);
        const final = counters[counterId].final;
        const current = Math.floor(progress * final);
        
        el.textContent = current.toLocaleString();
      }
      
      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  