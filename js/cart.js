function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'car-card';
        div.innerHTML = `
            <h2>${item.name}</h2>
            <p>$${item.price.toLocaleString()}</p>
            <button class="btn" onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItems.appendChild(div);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});