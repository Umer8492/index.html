// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters to determine which plan was selected
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPlan = urlParams.get('plan') || 'local'; // Default to Local plan
    
    // Set plan details based on selection
    const planName = document.getElementById('plan-name');
    const planPrice = document.getElementById('plan-price');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');
    const confirmationService = document.getElementById('confirmation-service');
    const confirmationAmount = document.getElementById('confirmation-amount');
    
    let basePrice = 5000;
    
    // Update plan details (only one plan in your HTML, but keeping structure for potential future expansion)
    planName.textContent = 'Local Ad Account';
    planPrice.textContent = '5000rs';
    subtotal.textContent = '5000rs';
    total.textContent = '5000rs';
    confirmationService.textContent = 'Local TikTok Ad Account';
    confirmationAmount.textContent = '5000rs';
    
    // Change plan button
    const changePlanBtn = document.getElementById('change-plan');
    changePlanBtn.addEventListener('click', function() {
        window.location.href = 'tiktokcheckout7.html';
    });
    
    // Screenshot upload preview
    const screenshotInput = document.getElementById('screenshot');
    const uploadPreview = document.getElementById('upload-preview');
    
    screenshotInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Screenshot Preview">`;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Add drag and drop functionality for file upload
    const fileUpload = document.querySelector('.file-upload');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        fileUpload.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        fileUpload.style.borderColor = '#f97316';
        fileUpload.style.backgroundColor = 'rgba(249, 115, 22, 0.05)';
    }
    
    function unhighlight() {
        fileUpload.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        fileUpload.style.backgroundColor = 'transparent';
    }
    
    fileUpload.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files && files[0]) {
            screenshotInput.files = files;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Screenshot Preview">`;
            };
            
            reader.readAsDataURL(files[0]);
        }
    }
    
    // Generate random order number
    function generateOrderNumber() {
        const prefix = 'TIK-';
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return prefix + randomNum;
    }
    
    // Set the order number in the confirmation modal
    document.getElementById('order-number').textContent = generateOrderNumber();
    
    // Form validation and submission
    const checkoutForm = document.getElementById('checkout-form');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    const continueButton = document.getElementById('continue-button');
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const screenshot = document.getElementById('screenshot').files[0];
        
        // Simple validation
        if (!fullName || !email || !phone || !screenshot) {
            alert('Please fill in all required fields and upload a payment screenshot');
            return;
        }
        
        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Phone format validation (basic)
        const phonePattern = /^\d{10,15}$/;
        if (!phonePattern.test(phone.replace(/[^0-9]/g, ''))) {
            alert('Please enter a valid phone number');
            return;
        }
        
        // If validation passes, show the confirmation modal
        confirmationModal.style.display = 'block';
        
        // Scroll to top of the modal
        setTimeout(() => {
            document.querySelector('.modal-content').scrollTop = 0;
        }, 100);
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });
    
    continueButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPlan = urlParams.get('plan') || 'local';

    document.getElementById('plan-name').textContent = 'Local Ad Account';
    document.getElementById('plan-price').textContent = '5000rs';
    document.getElementById('subtotal').textContent = '5000rs';
    document.getElementById('total').textContent = '5000rs';
    document.getElementById('confirmation-service').textContent = 'Local TikTok Ad Account';
    document.getElementById('confirmation-amount').textContent = '5000rs';

    document.getElementById('change-plan').addEventListener('click', function() {
        window.location.href = 'tiktokcheckout7.html';
    });

    const screenshotInput = document.getElementById('screenshot');
    const uploadPreview = document.getElementById('upload-preview');

    screenshotInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Screenshot Preview">`;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    function generateOrderNumber() {
        const prefix = 'TIK-';
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        return prefix + randomNum;
    }
    
    const orderNumber = generateOrderNumber();
    document.getElementById('order-number').textContent = orderNumber;

    document.getElementById('checkout-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const screenshot = document.getElementById('screenshot').files[0];

        if (!fullName || !email || !phone || !screenshot) {
            alert('Please fill in all fields and upload a screenshot');
            return;
        }

        const formData = new FormData();
        formData.append('key', '88c2a1862a7d7e08ee397ccd412f977b');
        formData.append('image', screenshot);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                const imageUrl = result.data.url;
                
                const emailData = {
                    fullName,
                    email,
                    phone,
                    orderNumber,
                    imageUrl
                };

                await fetch('https://formspree.io/f/mblgydyz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emailData)
                });

                alert('Order placed successfully!');
                window.location.href = 'index.html';
            } else {
                alert('Image upload failed. Try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    });
});