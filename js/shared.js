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

function injectContractModal() {
    if (document.getElementById('contract-modal')) return;

    // A more formal, customer-facing purchase agreement (Vietnamese) for checkout signing.
    const modalHtml = `
    <div id="contract-modal" class="contract-modal" aria-hidden="true">
        <div class="contract-backdrop"></div>
        <div class="contract-dialog" role="dialog" aria-modal="true" aria-labelledby="contract-title">
        <header class="contract-header">
            <h2 id="contract-title">HỢP ĐỒNG MUA BÁN ĐIỆN TỬ<br>Elite HyperCars</h2>
            <button class="contract-close" aria-label="Đóng">×</button>
        </header>
        <div class="contract-body">
            <div class="contract-content" id="contract-content">
            <p><strong>Ngày:</strong> <span id="contract-date">${new Date().toLocaleDateString()}</span></p>
            <h3>1. Các Bên</h3>
            <p><strong>Bên A (Bên bán):</strong> Elite HyperCars — Địa chỉ: [Địa chỉ công ty].</p>
            <p><strong>Bên B (Bên mua):</strong> Khách hàng (thông tin do khách hàng cung cấp khi ký hợp đồng).</p>

            <h3>2. Đối tượng hợp đồng</h3>
            <p>Bên A đồng ý bán và Bên B đồng ý mua các sản phẩm/xe được thể hiện trong đơn hàng tại thời điểm thanh toán. Chi tiết sản phẩm, số lượng và giá được xác nhận trong giao diện thanh toán trước khi ký hợp đồng.</p>

            <h3>3. Giá, Thanh toán và Giao nhận</h3>
            <p>Giá bán là giá hiển thị trên web tại thời điểm xác nhận đơn hàng. Thanh toán thực hiện theo phương thức mà hai Bên lựa chọn tại bước thanh toán. Bên A sẽ sắp xếp giao nhận theo thỏa thuận và chỉ giao khi đã xác nhận thanh toán (nếu áp dụng).</p>

            <h3>4. Chuyển giao quyền sở hữu và rủi ro</h3>
            <p>Quyền sở hữu chuyển giao khi hai Bên hoàn tất các thủ tục thanh toán và ký nhận theo quy định. Rủi ro về mất mát, hư hỏng chuyển cho Bên B kể từ thời điểm giao nhận theo thỏa thuận.</p>

            <h3>5. Bảo hành và Trách nhiệm</h3>
            <p>Sản phẩm được bảo hành theo chính sách bảo hành của nhà sản xuất. Elite HyperCars chịu trách nhiệm theo quy định pháp luật và điều khoản bảo hành công bố. Mọi khiếu nại liên quan đến chất lượng phải được thông báo trong thời hạn hợp lý.</p>

            <h3>6. Hủy đơn và Hoàn tiền</h3>
            <p>Quy định hủy đơn và hoàn tiền tuân theo chính sách bán hàng của Elite HyperCars, được thông báo cho Khách hàng khi xác nhận đơn.</p>

            <h3>7. Bảo mật thông tin</h3>
            <p>Thông tin cá nhân của Khách hàng được xử lý theo Chính sách quyền riêng tư. Elite HyperCars cam kết không tiết lộ thông tin cho bên thứ ba nếu không có sự đồng ý, trừ khi luật định yêu cầu.</p>

            <h3>8. Điều khoản chung</h3>
            <p>Mọi tranh chấp phát sinh từ hợp đồng này sẽ được giải quyết thông qua thương lượng; nếu không thành, các Bên có thể đưa ra tòa án có thẩm quyền theo pháp luật Việt Nam.</p>

            <p><em>Bằng việc ký điện tử dưới đây, Bên B xác nhận đã đọc, hiểu và đồng ý chịu ràng buộc bởi các điều khoản trong hợp đồng này.</em></p>
            </div>

            <div class="contract-actions">
            <label class="contract-input"><span>Họ và tên (ký điện tử)</span>
                <input type="text" id="contract-name" placeholder="Nguyễn Văn A">
            </label>
            <label class="contract-input"><span>Email</span>
                <input type="email" id="contract-email" placeholder="ban@example.com">
            </label>
            <label class="contract-agree"><input type="checkbox" id="contract-agree-checkbox"> Tôi đã đọc, hiểu và đồng ý với các điều khoản của Hợp đồng mua bán này</label>

            <div class="contract-buttons">
                <button id="contract-download" class="btn">Tải hợp đồng</button>
                <button id="contract-accept" class="btn primary" disabled>Đồng ý & Ký (Ký điện tử)</button>
            </div>
            </div>
        </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('contract-modal');
    const closeBtn = modal.querySelector('.contract-close');
    const agreeCheckbox = modal.querySelector('#contract-agree-checkbox');
    const acceptBtn = modal.querySelector('#contract-accept');
    const downloadBtn = modal.querySelector('#contract-download');

    // internal hook that checkout code can set when calling openContractModal
    modal._onAccept = null;

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        // clear callback after close to avoid accidental reuse
        modal._onAccept = null;
    }

    function openModal(cb) {
        if (typeof cb === 'function') modal._onAccept = cb;
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        const nameInput = modal.querySelector('#contract-name');
        if (nameInput) nameInput.focus();
    }

    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.contract-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    agreeCheckbox.addEventListener('change', () => {
        acceptBtn.disabled = !agreeCheckbox.checked;
    });

    acceptBtn.addEventListener('click', () => {
        const name = modal.querySelector('#contract-name').value.trim();
        const email = modal.querySelector('#contract-email').value.trim();
        if (!name || !email) {
            alert('Vui lòng nhập họ tên và email để ký hợp đồng.');
            return;
        }

        const record = {
            id: 'contract_' + Date.now(),
            name: name,
            email: email,
            acceptedAt: new Date().toISOString(),
            page: window.location.pathname + window.location.search
        };

        const existing = JSON.parse(localStorage.getItem('acceptedContracts') || '[]');
        existing.push(record);
        localStorage.setItem('acceptedContracts', JSON.stringify(existing));

        // Close modal first
        closeModal();

        // If caller provided a callback (e.g., checkout), call it with the record
        if (modal._onAccept && typeof modal._onAccept === 'function') {
            try { modal._onAccept(record); } catch (err) { console.warn('contract onAccept callback error', err); }
        } else {
            // default UI: show a small notice (uses global showToast if available)
            if (typeof showToast === 'function') {
                showToast('Cảm ơn. Vui lòng chờ nhân viên liên hệ để hoàn tất.');
            } else {
                // fallback: alert
                alert('Cảm ơn. Vui lòng chờ nhân viên liên hệ để hoàn tất.');
            }
        }
    });

    downloadBtn.addEventListener('click', () => {
        const contentEl = modal.querySelector('#contract-content');
        const name = modal.querySelector('#contract-name').value.trim() || 'Chưa điền tên';
        const email = modal.querySelector('#contract-email').value.trim() || 'Chưa điền email';
        const accepted = modal.querySelector('#contract-agree-checkbox').checked ? 'Đồng ý' : 'Chưa đồng ý';

        const html = `<!doctype html><html><head><meta charset="utf-8"><title>Hợp đồng - ${name}</title></head><body>` +
            `<h1>Hợp đồng mua bán - Elite HyperCars</h1>` +
            `<p><strong>Người ký:</strong> ${name} &lt;${email}&gt;</p>` +
            `<p><strong>Trạng thái:</strong> ${accepted}</p>` +
            `<p><strong>Ngày:</strong> ${new Date().toLocaleString()}</p>` +
            `<hr>` + contentEl.innerHTML + `</body></html>`;

        const blob = new Blob([html], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hop-dong-${name.replace(/\s+/g,'_')}.html`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    // expose opener which may receive an optional callback
    window.openContractModal = openModal;
}

function addFooterContractLink() {
        try {
                const footer = document.querySelector('footer');
                if (!footer) return;

                injectContractModal();

                const link = document.createElement('a');
                link.href = '#';
                link.textContent = 'Hợp đồng điện tử';
                link.addEventListener('click', (e) => { e.preventDefault(); window.openContractModal(); });

                const firstCol = footer.querySelector('.footer-column');
                if (firstCol) {
                        firstCol.appendChild(link);
                } else {
                        footer.appendChild(link);
                }
        } catch (err) {
                console.warn('addFooterContractLink failed', err);
        }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inject the contract modal so it can be opened programmatically from checkout flows.
    // Do NOT add a footer link — the contract should be shown only when the user initiates checkout.
    injectContractModal();
});