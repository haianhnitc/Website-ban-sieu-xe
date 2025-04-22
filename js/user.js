// user.js
document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail') || 'Không xác định';
    const emailElement = document.getElementById('user-email');
    if (emailElement) {
        emailElement.textContent = userEmail;
    }
});