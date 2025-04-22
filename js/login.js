// login.js
function flipToSignup() {
    document.querySelector('.flip-box-inner').classList.add('flipped');
}

function flipToLogin() {
    document.querySelector('.flip-box-inner').classList.remove('flipped');
}

// Kiểm tra giá trị ô nhập liệu
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-box input');
    
    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
        
        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
});

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 3000);
}

function showLoginSuccess(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    showNotification('Đăng nhập thành công');
    setTimeout(() => {
        updateNavBar(); // Cập nhật thanh điều hướng
        window.location.href = 'user.html'; // Chuyển hướng đến trang tài khoản
    }, 1000);
}

function showSignupSuccess(event) {
    event.preventDefault();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const email = document.getElementById('signup-email').value;
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu không khớp');
    } else {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        showNotification('Đăng ký thành công');
        setTimeout(() => {
            updateNavBar(); // Cập nhật thanh điều hướng
            window.location.href = 'user.html'; // Chuyển hướng đến trang tài khoản
        }, 3000);
    }
}