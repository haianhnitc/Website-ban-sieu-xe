// Hamburger Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
}); 

// Chức năng giỏ hàng với localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(carId) {
    const carNames = { 1: 'Pagani Huayra', 2: 'Ferrari Pininfarina', 3: 'Aston Martin Valkyrie' };
    const carPrices = { 1: 3400000, 2: 2500000, 3: 3200000 };
    cart.push({ id: carId, name: carNames[carId], price: carPrices[carId] });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${carNames[carId]} đã được thêm vào giỏ hàng!`);
    if (document.getElementById('cart-items')) updateCart();
}

// Chuyển đổi trạng thái menu hamburger
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Quan sát hiệu ứng cuộn
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

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

// Hiệu ứng chuyển đổi ảnh nền
const backgroundImages = [
    '/images/aventador_car.png',
    '/images/huracan2_car.png',
    '/images/huracan_car.png',
    '/images/urus_car.png',
    '/images/cars-collection/anh_1.jpg'
];
let currentImageIndex = 0;
const layer1 = document.getElementById('backgroundLayer1');
const layer2 = document.getElementById('backgroundLayer2');
let isLayer1Active = true;

function changeBackground() {
    const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    const nextImage = backgroundImages[nextImageIndex];

    if (isLayer1Active) {
        layer2.style.backgroundImage = `url(${nextImage})`;
        layer1.style.opacity = '0';
        layer2.style.opacity = '0.1';
    } else {
        layer1.style.backgroundImage = `url(${nextImage})`;
        layer2.style.opacity = '0';
        layer1.style.opacity = '0.1';
    }

    isLayer1Active = !isLayer1Active;
    currentImageIndex = nextImageIndex;
}

// Chạy hiệu ứng nền ngay khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    layer1.style.backgroundImage = `url(${backgroundImages[0]})`;
    layer1.style.opacity = '0.1';
    setInterval(changeBackground, 5000); // Chuyển đổi mỗi 5 giây
    observeElements();
});