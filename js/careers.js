function showApplyForm(jobTitle) {
    const modal = document.getElementById('apply-modal');
    const jobTitleElement = document.getElementById('job-title');
    if (modal && jobTitleElement) {
        modal.style.display = 'flex';
        jobTitleElement.textContent = jobTitle;
        setTimeout(() => {
            modal.querySelector('.modal-content').classList.add('visible');
        }, 10);
    }
}

function closeApplyForm() {
    const modal = document.getElementById('apply-modal');
    if (modal) {
        modal.querySelector('.modal-content').classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function flipCard(button) {
    const card = button.closest('.car-card');
    card.classList.toggle('flipped');
}

// Xử lý gửi biểu mẫu
document.getElementById('apply-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const inputs = this.querySelectorAll('input[required], textarea[required]');
    const phoneInput = this.querySelector('input[type="tel"]');
    let isValid = true;
    const phoneRegex = /^\d+$/;

    // Kiểm tra các trường bắt buộc
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
        }
    });

    // Kiểm tra số điện thoại
    if (isValid && !phoneRegex.test(phoneInput.value)) {
        isValid = false;
    }

    const toast = document.getElementById('toast');
    if (isValid) {
        toast.textContent = 'Gửi hồ sơ thành công!';
        toast.className = 'toast success';
        this.reset();
        closeApplyForm();
    } else {
        toast.textContent = phoneInput.value && !phoneRegex.test(phoneInput.value) 
            ? 'Số điện thoại chỉ được chứa các chữ số!' 
            : 'Vui lòng điền đầy đủ thông tin!';
        toast.className = 'toast error';
    }

    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
});