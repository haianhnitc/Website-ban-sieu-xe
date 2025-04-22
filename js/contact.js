document.addEventListener('DOMContentLoaded', function() {
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

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Vui lòng nhập địa chỉ email hợp lệ.');
                return;
            }
            
            // In a real application, this would send the form data to a server
            // For this demo, we'll just show a success message
            alert('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Showroom card hover effect
    const showroomCards = document.querySelectorAll('.showroom-card');
    
    showroomCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            
            const img = card.querySelector('.showroom-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            const img = card.querySelector('.showroom-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Map view buttons
    const mapButtons = document.querySelectorAll('.showroom-info .btn');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // In a real application, this would show the specific showroom on the map
            // For this demo, we'll just scroll to the map section
            document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
});