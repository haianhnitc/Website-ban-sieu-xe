// Lấy phần tử flip-box-inner và notification
const flipBoxInner = document.querySelector('.flip-box-inner');
const notification = document.getElementById('notification');

// Kiểm tra tồn tại của các phần tử
if (!flipBoxInner || !notification) {
    console.error('Một hoặc nhiều phần tử DOM không tồn tại:', {
        flipBoxInner: !!flipBoxInner,
        notification: !!notification
    });
}

// Hàm hiển thị thông báo
function showNotification(message, isError = false) {
    if (!notification) {
        console.error('Phần tử notification không tồn tại');
        return;
    }
    notification.textContent = message;
    notification.style.display = 'block'; // Đảm bảo hiển thị
    notification.classList.add('show');
    if (isError) {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }
    setTimeout(() => {
        notification.classList.remove('show', 'error');
        notification.style.display = 'none'; // Ẩn sau khi hoàn tất
    }, 3000);
}

// Hàm lấy danh sách tài khoản từ localStorage
function getAccounts() {
    const accounts = localStorage.getItem('accounts');
    return accounts ? JSON.parse(accounts) : [];
}

// Hàm lưu tài khoản mới vào localStorage
function saveAccount(name, email, password) {
    const accounts = getAccounts();
    accounts.push({ name, email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Hàm flip sang form đăng ký
function flipToSignup() {
    console.log('Flip to signup');
    if (flipBoxInner) {
        flipBoxInner.classList.add('flipped');
    } else {
        console.error('Không thể flip: flipBoxInner không tồn tại');
    }
}

// Hàm flip sang form đăng nhập
function flipToLogin() {
    console.log('Flip to login');
    if (flipBoxInner) {
        flipBoxInner.classList.remove('flipped');
    } else {
        console.error('Không thể flip: flipBoxInner không tồn tại');
    }
}

// Hàm xử lý submit form đăng nhập
function showLoginSuccess(event) {
    event.preventDefault();
    console.log('Submit form đăng nhập');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    if (!emailInput || !passwordInput) {
        console.error('Input đăng nhập không tồn tại:', {
            emailInput: !!emailInput,
            passwordInput: !!passwordInput
        });
        showNotification('Lỗi hệ thống, vui lòng thử lại!', true);
        return false;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    // Kiểm tra tài khoản
    const accounts = getAccounts();
    const account = accounts.find(account => account.email === email && account.password === password);

    if (account) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        showNotification('Đăng nhập thành công!');
        setTimeout(() => {
            window.location.href = 'user.html';
        }, 1000);
    } else {
        showNotification('Tài khoản không tồn tại hoặc mật khẩu sai!', true);
    }
    return false; // Ngăn form submit mặc định
}

// Hàm xử lý submit form đăng ký
function showSignupSuccess(event) {
    event.preventDefault();
    console.log('Submit form đăng ký');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');

    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        console.error('Input đăng ký không tồn tại:', {
            nameInput: !!nameInput,
            emailInput: !!emailInput,
            passwordInput: !!passwordInput,
            confirmPasswordInput: !!confirmPasswordInput
        });
        showNotification('Lỗi hệ thống, vui lòng thử lại!', true);
        return false;
    }

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', true);
        return false;
    }

    // Kiểm tra email đã tồn tại
    const accounts = getAccounts();
    if (accounts.some(account => account.email === email)) {
        showNotification('Email này đã được đăng ký!', true);
        return false;
    }

    // Lưu tài khoản
    saveAccount(name, email, password);
    showNotification('Đăng ký thành công! Vui lòng đăng nhập.');
    document.querySelector('.flip-box-back form').reset();
    flipToLogin(); // Chuyển sang form đăng nhập
    return false; // Ngăn form submit mặc định
}

// Xử lý nhãn ô nhập liệu
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});