// shared.js
// Chuyển đổi menu hamburger
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Khởi tạo khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    updateNavBar(); // Cập nhật thanh điều hướng dựa trên trạng thái đăng nhập
    updateCartBadge(); // Cập nhật số lượng trên badge giỏ hàng
    populateSocialLinks(); // Populate footer social links
    optimizeMedia(); // Apply media optimizations (lazy-loading, deferred video)
});

// Cập nhật thanh điều hướng dựa trên trạng thái đăng nhập
function updateNavBar() {
    const navLinks = document.getElementById('navLinks');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (navLinks) {
        // Xóa các liên kết liên quan đến đăng nhập/tài khoản
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        const userLink = navLinks.querySelector('a[href="user.html"]');
        if (loginLink) loginLink.remove();
        if (userLink) userLink.remove();

        // Tạo liên kết mới dựa trên trạng thái đăng nhập
        const authLink = document.createElement('a');
        if (isLoggedIn) {
            authLink.href = 'user.html';
            authLink.textContent = 'Tài khoản';
            // Kiểm tra xem đang ở trang user.html không
            if (window.location.pathname.includes('user.html')) {
                authLink.classList.add('active');
            }
        } else {
            authLink.href = 'login.html';
            authLink.textContent = 'Đăng nhập/Đăng ký';
        }
        // Chèn trước liên kết giỏ hàng
        const cartLink = navLinks.querySelector('a[href="cart.html"]');
        navLinks.insertBefore(authLink, cartLink);
    }
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    updateNavBar();
    window.location.href = 'home.html';
}

// Chức năng giỏ hàng với localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(carId) {
    const carNames = { 1: 'Pagani Huayra', 2: 'Ferrari Pininfarina', 3: 'Aston Martin Valkyrie' };
    const carPrices = { 1: 3400000, 2: 2500000, 3: 3200000 };
    cart.push({ id: carId, name: carNames[carId], price: carPrices[carId], quantity: 1 }); // Thêm số lượng
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${carNames[carId]} đã được thêm vào giỏ hàng!`);
    if (document.getElementById('cart-items')) updateCart();
}

// Quan sát hiệu ứng cuộn
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Cập nhật số lượng sản phẩm trên badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Đồng bộ giỏ hàng giữa các tab
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartBadge();
    }
});

function observeElements() {
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Con trỏ tùy chỉnh
const cursor = document.getElementById('customCursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseover', () => {
        cursor.classList.add('hovered');
    });
    element.addEventListener('mouseout', () => {
        cursor.classList.remove('hovered');
    });
});

// Chạy hiệu ứng nền khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    if (layer1) {
        layer1.style.backgroundImage = `url(${backgroundImages[0]})`;
        layer1.style.opacity = '0.1';
        setInterval(changeBackground, 5000); // Chuyển đổi mỗi 5 giây
    }
    observeElements();
    
    // Populate social links trong footer
    populateSocialLinks();
    // Apply media optimizations
    optimizeMedia();
});

// Tối ưu media: lazy-load cho ảnh và deferred loading cho video
function optimizeMedia() {
    try {
        // Images: set loading attribute where appropriate
        const imgs = Array.from(document.querySelectorAll('img'));
        imgs.forEach(img => {
            // keep critical images eager
            const criticalIds = ['car-main-image'];
            const criticalClasses = ['logo', 'footer-logo', 'title'];
            const isCritical = criticalIds.includes(img.id) || criticalClasses.some(c => img.classList.contains(c));
            if (!('loading' in HTMLImageElement.prototype)) {
                // browser doesn't support native lazy loading – fall back to data-src + observer
                if (!isCritical && img.src) {
                    img.dataset.src = img.src;
                    img.src = 'images/placeholder.jpg';
                }
            } else {
                img.loading = isCritical ? 'eager' : 'lazy';
            }
        });

        // IntersectionObserver to swap data-src -> src for browsers without native lazy
        if (!('loading' in HTMLImageElement.prototype)) {
            const imgObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        if (el.dataset && el.dataset.src) {
                            el.src = el.dataset.src;
                            delete el.dataset.src;
                        }
                        obs.unobserve(el);
                    }
                });
            }, {rootMargin: '200px'});

            document.querySelectorAll('img').forEach(img => {
                if (img.dataset && img.dataset.src) imgObserver.observe(img);
            });
        }

        // Videos: defer loading and only play when visible
        const videos = Array.from(document.querySelectorAll('video'));
        if (videos.length) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const v = entry.target;
                    if (entry.isIntersecting) {
                        // load and play when visible
                        if (v.dataset && v.dataset.src) v.src = v.dataset.src;
                        if (v.paused) {
                            v.play().catch(() => {});
                        }
                    } else {
                        // pause when out of view
                        if (!v.paused) v.pause();
                    }
                });
            }, {threshold: 0.25});

            videos.forEach(v => {
                // prefer to not preload heavy videos
                v.preload = 'none';
                v.playsInline = true;
                // if autoplay present, remove to avoid immediate load
                if (v.hasAttribute('autoplay')) v.removeAttribute('autoplay');
                // if source present, move to data-src so it doesn't load immediately
                if (v.querySelector('source')) {
                    const srcEl = v.querySelector('source');
                    if (srcEl.src) {
                        v.dataset.src = srcEl.src;
                        srcEl.removeAttribute('src');
                    }
                } else if (v.src) {
                    v.dataset.src = v.src;
                    v.removeAttribute('src');
                }
                videoObserver.observe(v);
            });
        }

        // Background images: elements with data-bg attribute get loaded when visible
        const bgElements = Array.from(document.querySelectorAll('[data-bg]'));
        if (bgElements.length) {
            const bgObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        el.style.backgroundImage = `url(${el.dataset.bg})`;
                        obs.unobserve(el);
                    }
                });
            }, {rootMargin: '200px'});
            bgElements.forEach(el => bgObserver.observe(el));
        }
    } catch (err) {
        // fail silently – optimization is best-effort
        console.warn('optimizeMedia error', err);
    }
}

// Hàm để populate social links ở footer (Ferrari mặc định)
function populateSocialLinks() {
    const socialLinksContainer = document.querySelector('.social-links');
    if (!socialLinksContainer) return;

    // Dữ liệu social links của Ferrari (mặc định cho footer)
    const ferrariSocial = {
        facebook: 'https://www.facebook.com/ferrari/',
        instagram: 'https://www.instagram.com/ferrari/',
        twitter: 'https://twitter.com/FerrariFans',
        youtube: 'https://www.youtube.com/c/Ferrari'
    };

    // Cập nhật các link
    const socialAnchors = socialLinksContainer.querySelectorAll('a');
    if (socialAnchors.length >= 4) {
        socialAnchors[0].href = ferrariSocial.facebook;
        socialAnchors[0].target = '_blank';
        socialAnchors[0].rel = 'noopener noreferrer';
        socialAnchors[0].title = 'Follow Ferrari on Facebook';
        
        socialAnchors[1].href = ferrariSocial.instagram;
        socialAnchors[1].target = '_blank';
        socialAnchors[1].rel = 'noopener noreferrer';
        socialAnchors[1].title = 'Follow Ferrari on Instagram';
        
        socialAnchors[2].href = ferrariSocial.twitter;
        socialAnchors[2].target = '_blank';
        socialAnchors[2].rel = 'noopener noreferrer';
        socialAnchors[2].title = 'Follow Ferrari on Twitter';
        
        socialAnchors[3].href = ferrariSocial.youtube;
        socialAnchors[3].target = '_blank';
        socialAnchors[3].rel = 'noopener noreferrer';
        socialAnchors[3].title = 'Subscribe to Ferrari on YouTube';
    }
}