// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeSignalsTable();
    initializePerformanceCharts();
    initializeTestimonialSlider();
    initializeFAQAccordion();
    setupMobileNavigation();
    setupForms();
    addScrollEffects();
});

// Functions for different components

// 1. Header scroll effect
function addScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
}

// 2. Mobile navigation toggle
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        if (!navLinks.classList.contains('mobile-active')) {
            // Create mobile nav container if it doesn't exist
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.appendChild(navLinks.cloneNode(true));
            mobileNav.appendChild(authButtons.cloneNode(true));
            
            document.body.appendChild(mobileNav);
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                mobileNav.classList.add('active');
            }, 10);
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-nav-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', closeMenu);
            mobileNav.prepend(closeBtn);
            
            // Add click handlers for mobile links
            const mobileLinks = mobileNav.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        } else {
            closeMenu();
        }
        
        navLinks.classList.toggle('mobile-active');
    });
    
    function closeMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        if (mobileNav) {
            mobileNav.classList.remove('active');
            
            setTimeout(() => {
                mobileNav.remove();
                document.body.style.overflow = '';
            }, 300);
        }
        
        navLinks.classList.remove('mobile-active');
    }
}

// 3. Signals Table
function initializeSignalsTable() {
    const tableBody = document.querySelector('#signals-table tbody');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!tableBody) return;
    
    // Sample data for signals
    const signals = [
        {
            asset: 'BTC/USD',
            entry: '41,250.00',
            stopLoss: '40,700.00',
            takeProfit: '42,800.00',
            riskReward: '3.1',
            status: 'active',
            profit: '+2.4%'
        },
        {
            asset: 'EUR/USD',
            entry: '1.0875',
            stopLoss: '1.0825',
            takeProfit: '1.0975',
            riskReward: '2.0',
            status: 'active',
            profit: '+0.8%'
        },
        {
            asset: 'Gold',
            entry: '2,320.50',
            stopLoss: '2,290.00',
            takeProfit: '2,380.00',
            riskReward: '2.5',
            status: 'closed',
            profit: '+3.2%'
        },
        {
            asset: 'ETH/USD',
            entry: '2,250.00',
            stopLoss: '2,150.00',
            takeProfit: '2,450.00',
            riskReward: '2.0',
            status: 'pending',
            profit: '0.0%'
        },
        {
            asset: 'USD/JPY',
            entry: '151.75',
            stopLoss: '152.50',
            takeProfit: '150.25',
            riskReward: '2.0',
            status: 'active',
            profit: '+1.1%'
        },
        {
            asset: 'XRP/USD',
            entry: '0.5120',
            stopLoss: '0.4950',
            takeProfit: '0.5450',
            riskReward: '2.2',
            status: 'closed',
            profit: '-1.5%'
        },
        {
            asset: 'ADA/USD',
            entry: '0.3850',
            stopLoss: '0.3750',
            takeProfit: '0.4050',
            riskReward: '2.0',
            status: 'pending',
            profit: '0.0%'
        }
    ];
    
    // Render signals
    function renderSignals(filterStatus = 'all') {
        tableBody.innerHTML = '';
        
        const filteredSignals = filterStatus === 'all' 
            ? signals 
            : signals.filter(signal => signal.status === filterStatus);
        
        filteredSignals.forEach(signal => {
            const row = document.createElement('tr');
            
            // Determine profit/loss class
            let profitClass = 'neutral';
            if (signal.profit.startsWith('+')) {
                profitClass = 'profit';
            } else if (signal.profit.startsWith('-')) {
                profitClass = 'loss';
            }
            
            // Create status class
            const statusClass = `status-${signal.status}`;
            
            row.innerHTML = `
                <td>${signal.asset}</td>
                <td>${signal.entry}</td>
                <td>${signal.stopLoss}</td>
                <td>${signal.takeProfit}</td>
                <td>${signal.riskReward}</td>
                <td><span class="status ${statusClass}">${signal.status.charAt(0).toUpperCase() + signal.status.slice(1)}</span></td>
                <td class="${profitClass}">${signal.profit}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Initial render
    renderSignals();
    
    // Setup filter buttons
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter status
                const filterStatus = this.getAttribute('data-filter');
                
                // Render signals with filter
                renderSignals(filterStatus);
            });
        });
    }
}

// 4. Performance Charts
function initializePerformanceCharts() {
    const performanceCtx = document.getElementById('performance-chart');
    const winlossCtx = document.getElementById('winloss-chart');
    
    if (!performanceCtx || !winlossCtx) return;
    
    // Monthly Performance Chart
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            datasets: [{
                label: 'Profit/Loss (%)',
                data: [0, 3, 5, 7, 10, 15, 20, 5, 10],
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#f97316',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    padding: 10,
                    bodyFont: {
                        family: 'Poppins'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
    
    // Win/Loss Ratio Chart
    new Chart(winlossCtx, {
        type: 'pie',
        data: {
            labels: ['Wins', 'Losses'],
            datasets: [{
                data: [98, 2],
                backgroundColor: [
                    '#22c55e',
                    '#ef4444'
                ],
                borderColor: 'rgba(30, 30, 30, 0.8)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            family: 'Poppins'
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                    padding: 10,
                    bodyFont: {
                        family: 'Poppins'
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// 5. Testimonial Slider
function initializeTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
}

// 6. FAQ Accordion
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on clicked item
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// 7. Form Submission
function setupForms() {
    const supportForm = document.getElementById('support-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show success message
            const formData = new FormData(supportForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // This would be an API call in a real app
            console.log('Form submitted:', formValues);
            
            // Show success message
            const submitBtn = supportForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#22c55e';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                supportForm.reset();
            }, 3000);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const subscribeBtn = newsletterForm.querySelector('button');
            
            if (emailInput.value) {
                console.log('Newsletter subscription:', emailInput.value);
                
                const originalText = subscribeBtn.textContent;
                subscribeBtn.textContent = 'Subscribed!';
                subscribeBtn.style.backgroundColor = '#22c55e';
                
                setTimeout(() => {
                    subscribeBtn.textContent = originalText;
                    subscribeBtn.style.backgroundColor = '';
                    emailInput.value = '';
                }, 3000);
            }
        });
    }
}