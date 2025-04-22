function flipToSignup() {
    document.querySelector('.flip-box-inner').classList.add('flipped');
}

function flipToLogin() {
    document.querySelector('.flip-box-inner').classList.remove('flipped');
}

// Thêm sự kiện để kiểm tra giá trị của các ô nhập liệu
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-box input');
    
    inputs.forEach(input => {
        // Kiểm tra giá trị ban đầu
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
        
        // Kiểm tra khi nhập liệu
        input.addEventListener('input', function () {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });
});

// Thêm vào cuối file
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500); // Đợi hiệu ứng mờ dần hoàn tất
    }, 3000); // Hiển thị trong 3 giây
}

function showLoginSuccess(event) {
    event.preventDefault(); // Ngăn form submit thực sự
    showNotification('Đăng nhập thành công');
}

function showSignupSuccess(event) {
    event.preventDefault(); // Ngăn form submit thực sự
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
        showNotification('Mật khẩu không khớp');
    } else {
        showNotification('Đăng ký thành công');
    }
}