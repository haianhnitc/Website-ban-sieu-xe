function toggleFAQ(id) {
    const faqItem = document.querySelectorAll('.faq-item')[id - 1];
    if (faqItem) faqItem.classList.toggle('active');
}