document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const video = hero.querySelector('video');
                if (video) {
                    video.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                }
            }
        });
    }

    // Auto-play video with fallback
    const video = document.querySelector('#hero video');
    if (video) {
        video.play().catch(error => {
            console.log('Auto-play was prevented. User interaction required.');
            
            // Create a play button as fallback
            const playButton = document.createElement('button');
            playButton.classList.add('play-btn');
            playButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>';
            hero.appendChild(playButton);
            
            playButton.addEventListener('click', () => {
                video.play();
                playButton.style.display = 'none';
            });
        });
    }

    // Featured cars hover effect
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
                testimonial.classList.add('active');
            } else {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
            }
        });
    }
    
    // Initialize testimonials
    if (testimonials.length > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert('Cảm ơn bạn đã đăng ký nhận tin!');
                emailInput.value = '';
            }
        });
    }

    // Add to cart functionality
    window.addToCart = function(carId) {
        alert(`Đã thêm xe vào giỏ hàng! ID: ${carId}`);
        // In a real application, this would add the car to a cart object/array
        // and update the cart UI
    };

    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
});