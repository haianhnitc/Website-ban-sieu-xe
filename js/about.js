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

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < window.innerHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial check on page load
    animateTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', animateTimeline);

    // Value cards hover effect
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Team members hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            const img = member.querySelector('.member-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        member.addEventListener('mouseleave', () => {
            const img = member.querySelector('.member-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Partners hover effect
    const partners = document.querySelectorAll('.partner');
    
    partners.forEach(partner => {
        partner.addEventListener('mouseenter', () => {
            partner.style.transform = 'scale(1.05)';
        });
        
        partner.addEventListener('mouseleave', () => {
            partner.style.transform = 'scale(1)';
        });
    });
});