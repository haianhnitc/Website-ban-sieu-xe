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

    // News filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-article');
    
    if (filterButtons.length > 0 && newsArticles.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter articles
                newsArticles.forEach(article => {
                    if (filterValue === 'all' || article.getAttribute('data-category') === filterValue) {
                        article.style.display = 'grid';
                        
                        // Add animation
                        setTimeout(() => {
                            article.style.opacity = '1';
                            article.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        article.style.opacity = '0';
                        article.style.transform = 'translateY(20px)';
                        
                        // Hide after animation
                        setTimeout(() => {
                            article.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // News article hover effect
    const articles = document.querySelectorAll('.news-article');
    
    articles.forEach(article => {
        article.addEventListener('mouseenter', () => {
            article.style.transform = 'translateY(-10px)';
            article.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            article.style.borderColor = '#333';
        });
        
        article.addEventListener('mouseleave', () => {
            article.style.transform = 'translateY(0)';
            article.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            article.style.borderColor = '#222';
        });
    });

    // Related news card hover effect
    const relatedCards = document.querySelectorAll('.related-news-card');
    
    relatedCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            card.style.borderColor = '#333';
            
            const img = card.querySelector('.related-news-image img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            card.style.borderColor = '#222';
            
            const img = card.querySelector('.related-news-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination-link');
    
    if (paginationLinks.length > 0) {
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                paginationLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // In a real application, this would load the next page of articles
                // For this demo, we'll just scroll to the top of the articles section
                document.getElementById('news-articles').scrollIntoView({ behavior: 'smooth' });
                
                // Show loading animation
                const articlesContainer = document.querySelector('.articles-container');
                articlesContainer.style.opacity = '0.5';
                
                // Simulate loading new articles
                setTimeout(() => {
                    articlesContainer.style.opacity = '1';
                }, 500);
            });
        });
    }

    // Make sure all "Read More" buttons work
    const readMoreButtons = document.querySelectorAll('.btn');
    
    readMoreButtons.forEach(button => {
        if (button.textContent === 'Đọc thêm') {
            button.addEventListener('click', (e) => {
                // Make sure the link works
                const href = button.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
            });
        }
    });
});