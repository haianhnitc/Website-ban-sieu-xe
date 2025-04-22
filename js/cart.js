// cart.js
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Khởi tạo lịch sử đặt hàng từ localStorage
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Cập nhật hiển thị giỏ hàng
    updateCart();
    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const notLoggedInDiv = document.getElementById('not-logged-in');
    const cartContentDiv = document.querySelector('.cart-content');
    
    if (isLoggedIn) {
        notLoggedInDiv.style.display = 'none';
        cartContentDiv.style.display = 'grid'; // Giữ bố cục lưới gốc
        updateCart();
    } else {
        notLoggedInDiv.style.display = 'block';
        cartContentDiv.style.display = 'none';
    }
    
    // Cập nhật số lượng sản phẩm trên badge
    updateCartBadge();
        
    // Hiển thị lịch sử đặt hàng
    displayOrderHistory();
    
    // Xử lý sự kiện cho nút thanh toán
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                showCheckoutModal();
            } else {
                showToast('Giỏ hàng trống, vui lòng thêm sản phẩm!');
            }
        });
    }
    
    // Xử lý sự kiện cho nút xóa giỏ hàng
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
                clearCart();
                showToast('Đã xóa tất cả sản phẩm trong giỏ hàng.');
            }
        });
    }
    
    // Hiển thị modal thanh toán
    function showCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        const closeBtn = document.querySelector('.close-modal');
        const confirmBtn = document.getElementById('confirm-checkout');
        
        if (modal) {
            // Cập nhật tổng tiền trong modal
            const modalTotal = document.getElementById('modal-total');
            if (modalTotal) {
                const grandTotal = calculateGrandTotal();
                modalTotal.textContent = `$${grandTotal.toLocaleString()}`;
            }
            
            modal.style.display = 'block';
            
            // Xử lý sự kiện đóng modal
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }
            
            // Xử lý sự kiện nút xác nhận
            confirmBtn.onclick = function() {
                processCheckout();
                modal.style.display = 'none';
                showToast('Đơn hàng đã được gửi thành công!');
            }
            
            // Đóng modal khi click bên ngoài
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        }
    }
    
    // Xử lý thanh toán
    function processCheckout() {
        if (cart.length === 0) return;
        
        // Tạo đơn hàng mới
        const newOrder = {
            id: generateOrderId(),
            date: new Date().toISOString(),
            status: 'processing',
            products: [...cart], // Copy sản phẩm từ giỏ hàng
            total: calculateGrandTotal(),
            paymentMethod: 'Chuyển khoản ngân hàng'
        };
        
        // Thêm vào lịch sử đặt hàng
        orderHistory.unshift(newOrder); // Thêm vào đầu mảng
        
        // Lưu vào localStorage
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        // cập nhật hiển thị lịch sử đơn hàng
        displayOrderHistory();
        // Sau khi hoàn tất thanh toán, xóa giỏ hàng
        clearCart();
        resetTotals();
    }

    function generateOrderId() {
        return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    // hàm để reset các giá trị tổng tiền
    function resetTotals() {
        const cartTotal = document.getElementById('cart-total');
        const cartTax = document.getElementById('cart-tax');
        const cartGrandTotal = document.getElementById('cart-grand-total');
        
        if (cartTotal) cartTotal.textContent = '$0';
        if (cartTax) cartTax.textContent = '$0';
        if (cartGrandTotal) cartGrandTotal.textContent = '$0';
    }
        
    // Cập nhật hiển thị giỏ hàng
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const cartSummary = document.getElementById('cart-summary');
        
        if (!cartItems) return;
        
        // Xóa tất cả các item hiện tại (trừ thông báo giỏ hàng trống)
        const items = cartItems.querySelectorAll('.cart-item');
        items.forEach(item => item.remove());
        
        // Hiển thị thông báo giỏ hàng trống
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'block';
            resetTotals();
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            if (cartSummary) cartSummary.style.display = 'block';
            
            // Thêm các item vào giỏ hàng
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image || 'images/placeholder.png'}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>Mã sản phẩm: #${item.id}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
                    <button class="cart-item-remove" data-index="${index}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"></path>
                        </svg>
                    </button>
                `;
                
                // Thêm vào trước emptyCartMessage nếu có
                if (emptyCartMessage) {
                    cartItems.insertBefore(cartItem, emptyCartMessage);
                } else {
                    cartItems.appendChild(cartItem);
                }
            });
            
            // Cập nhật tổng cộng
            updateTotal();
            
            // Thêm sự kiện cho các nút
            addItemEventListeners();
        }
    }
    
    // Thêm sự kiện cho các nút trong mỗi item
    function addItemEventListeners() {
        // Sự kiện cho nút giảm số lượng
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                decreaseQuantity(index);
            });
        });
        
        // Sự kiện cho nút tăng số lượng
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                increaseQuantity(index);
            });
        });
        
        // Sự kiện cho nút xóa
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeFromCart(index);
            });
        });
    }
    
    // Tăng số lượng của item
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        saveCart();
        updateCart();
        updateCartBadge();
    }
    
    // Giảm số lượng của item
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCart();
            updateCart();
            updateCartBadge();
        } else {
            removeFromCart(index);
        }
    }
    
    // Xóa item khỏi giỏ hàng
    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCart();
        updateCartBadge();
        showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
    }
    
    // Xóa toàn bộ giỏ hàng
    function clearCart() {
        cart = [];
        saveCart();
        updateCart();
        updateCartBadge();
        resetTotals();
    }
    
    // Lưu giỏ hàng vào localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Cập nhật tổng cộng
    function updateTotal() {
        const cartTotal = document.getElementById('cart-total');
        const cartTax = document.getElementById('cart-tax');
        const cartGrandTotal = document.getElementById('cart-grand-total');
        
        if (cartTotal && cartTax && cartGrandTotal) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = total * 0.1; // 10% tax
            const grandTotal = total + tax;
            
            cartTotal.textContent = `$${total.toLocaleString()}`;
            cartTax.textContent = `$${tax.toLocaleString()}`;
            cartGrandTotal.textContent = `$${grandTotal.toLocaleString()}`;
        }
    }
    
    // Tính tổng giá trị đơn hàng
    function calculateGrandTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = total * 0.1; // 10% tax
        return total + tax;
    }
    
    // Cập nhật số lượng sản phẩm hiển thị trên badge
    function updateCartBadge() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            
            // Hiển thị/ẩn badge
            if (totalItems > 0) {
                cartBadge.style.display = 'inline-block';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    function displayOrderHistory() {
        const historyItems = document.getElementById('history-items');
        const emptyHistoryMessage = document.getElementById('empty-history-message');
        
        if (!historyItems || !emptyHistoryMessage) return;
        
        // Xóa tất cả các item hiện tại
        historyItems.innerHTML = '';
        
        // Hiển thị thông báo nếu không có lịch sử
        if (orderHistory.length === 0) {
            emptyHistoryMessage.style.display = 'flex';
            historyItems.style.display = 'none';
        } else {
            emptyHistoryMessage.style.display = 'none';
            historyItems.style.display = 'block';
            
            // Hiển thị các đơn hàng
            orderHistory.forEach((order, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                // Tạo header của đơn hàng
                const header = document.createElement('div');
                header.className = 'history-item-header';
                
                // Định dạng ngày
                const orderDate = new Date(order.date);
                const formattedDate = orderDate.toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                
                // Tạo danh sách sản phẩm
                const products = document.createElement('div');
                products.className = 'history-item-products';
                
                order.products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.className = 'history-product';
                    
                    productItem.innerHTML = `
                        <div class="history-product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="history-product-name">${product.name}</div>
                        <div class="history-product-quantity">x${product.quantity}</div>
                        <div class="history-product-price">$${(product.price * product.quantity).toLocaleString()}</div>
                    `;
                    
                    products.appendChild(productItem);
                });
                
                // Tạo phần tổng tiền
                const total = document.createElement('div');
                total.className = 'history-item-total';
                total.innerHTML = `
                    <span class="history-item-total-label">Tổng thanh toán:</span>
                    <span class="history-item-total-value">$${order.total.toLocaleString()}</span>
                `;
                
                // Tạo phần hành động
                const actions = document.createElement('div');
                actions.className = 'history-item-actions';
                actions.innerHTML = `
                    <button class="history-item-button" onclick="window.print()">In hóa đơn</button>
                    <button class="history-item-button primary" data-index="${index}">Đặt lại</button>
                `;
                
                // Ghép tất cả vào với nhau
                historyItem.appendChild(header);
                historyItem.appendChild(products);
                historyItem.appendChild(total);
                historyItem.appendChild(actions);
                
                // Thêm vào container
                historyItems.appendChild(historyItem);
            });
            
            // Thêm event listener cho nút Đặt lại
            document.querySelectorAll('.history-item-button.primary').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    reOrder(index);
                });
            });
        }
    }

    function reOrder(orderIndex) {
        const order = orderHistory[orderIndex];
        if (!order) return;
        
        // Xác nhận từ người dùng
        if (confirm('Bạn có muốn đặt lại đơn hàng này không?')) {
            // Thêm các sản phẩm vào giỏ hàng
            order.products.forEach(product => {
                // Tìm sản phẩm trong giỏ hàng
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    // Nếu đã có, tăng số lượng
                    existingItem.quantity += product.quantity;
                } else {
                    // Nếu chưa có, thêm mới
                    cart.push({...product});
                }
            });
            
            // Lưu giỏ hàng
            saveCart();
            
            // Cập nhật hiển thị
            updateCart();
            updateCartBadge();
            
            // Hiển thị thông báo
            showToast('Đã thêm các sản phẩm từ đơn hàng cũ vào giỏ hàng.');
            
            // Cuộn lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Hiển thị thông báo toast
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            // Ẩn toast sau 3 giây
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }
    
    // Kích hoạt hiệu ứng fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(item => {
        observer.observe(item);
    });
});