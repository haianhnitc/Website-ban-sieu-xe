// Cart Functionality with localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(carId) {
    const carNames = { 1: 'Pagani Huayra', 2: 'Ferrari Pininfarina', 3: 'Aston Martin Valkyrie' };
    const carPrices = { 1: 3400000, 2: 2500000, 3: 3200000 };
    cart.push({ id: carId, name: carNames[carId], price: carPrices[carId] });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${carNames[carId]} đã được thêm vào giỏ hàng!`);
    if (document.getElementById('cart-items')) updateCart();
}

// Hamburger Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Scroll Animation Observer
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

// Custom Cursor
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

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
}); 