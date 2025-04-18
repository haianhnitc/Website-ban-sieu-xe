function showApplyForm(jobTitle) {
    const applyForm = document.getElementById('apply-form');
    const jobTitleElement = document.getElementById('job-title');
    if (applyForm && jobTitleElement) {
        applyForm.style.display = 'block';
        jobTitleElement.textContent = jobTitle;
    }
}