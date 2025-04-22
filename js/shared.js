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
});