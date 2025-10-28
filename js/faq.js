// Dữ liệu FAQ
const faqData = [
    {
        question: "Làm thế nào để đặt mua một chiếc siêu xe tại Elite HyperCars?",
        answer: "Quý khách có thể truy cập trang 'Bộ sưu tập xe' trên website, chọn mẫu xe yêu thích như Pagani Huayra BC hoặc Ferrari LaFerrari, sau đó thêm vào giỏ hàng. Tiếp theo, điền thông tin liên hệ và chọn phương thức thanh toán. Đội ngũ Elite HyperCars sẽ liên hệ trong vòng 24 giờ để xác nhận đơn hàng và hướng dẫn các bước tiếp theo. Ngoài ra, quý khách có thể đến showroom tại TP.HCM hoặc Hà Nội để trải nghiệm xe trực tiếp."
    },
    {
        question: "Chính sách bảo hành của showroom như thế nào?",
        answer: "Elite HyperCars cung cấp bảo hành 3 năm hoặc 100,000 km (tùy điều kiện nào đến trước) cho tất cả các dòng xe, bao gồm cả các mẫu như Lamborghini Aventador SVJ và Bugatti Chiron. Bảo hành bao gồm sửa chữa miễn phí cho các lỗi kỹ thuật từ nhà sản xuất, thay thế phụ tùng chính hãng, và dịch vụ kiểm tra định kỳ tại các trung tâm bảo hành của chúng tôi."
    },
    {
        question: "Tôi có thể thanh toán bằng những cách nào?",
        answer: "Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng (Visa, MasterCard, Amex), và trả góp thông qua các đối tác tài chính như Ngân hàng Vietcombank hoặc Techcombank. Các gói trả góp có lãi suất ưu đãi từ 0% trong 12 tháng cho một số mẫu xe như Aston Martin Valkyrie. Vui lòng liên hệ để được tư vấn chi tiết."
    },
    {
        question: "Thời gian giao xe là bao lâu? Có giao quốc tế không?",
        answer: "Thời gian giao xe trong nước dao động từ 7-30 ngày, tùy thuộc vào mẫu xe và địa điểm (ví dụ: giao nhanh trong 7 ngày cho TP.HCM). Đối với giao hàng quốc tế, chúng tôi hỗ trợ vận chuyển đến các nước như Singapore, Dubai, hoặc Mỹ, với thời gian từ 2-6 tuần. Chi phí vận chuyển quốc tế sẽ được báo giá cụ thể khi đặt hàng."
    },
    {
        question: "Dịch vụ bảo dưỡng được thực hiện ở đâu?",
        answer: "Elite HyperCars có các trung tâm bảo dưỡng tại TP.HCM, Hà Nội, và Đà Nẵng, được trang bị công nghệ tiên tiến từ các hãng như Ferrari và McLaren. Ngoài ra, chúng tôi hợp tác với các trung tâm bảo dưỡng quốc tế tại hơn 20 quốc gia. Quý khách có thể đặt lịch bảo dưỡng qua website hoặc ứng dụng di động của chúng tôi."
    },
    {
        question: "Tôi có thể tùy chỉnh siêu xe theo sở thích không?",
        answer: "Có, chúng tôi cung cấp dịch vụ tùy chỉnh cá nhân hóa (bespoke) cho phép quý khách chọn màu sơn độc quyền (ví dụ: xanh ngọc Emerald Green), nội thất da thủ công từ Ý, hoặc các chi tiết carbon fiber. Một số khách hàng đã tùy chỉnh xe như Koenigsegg Jesko với logo khắc riêng. Thời gian tùy chỉnh thường từ 3-6 tháng, tùy mức độ phức tạp."
    },
    {
        question: "Elite HyperCars có tổ chức sự kiện trải nghiệm lái thử không?",
        answer: "Chúng tôi tổ chức các sự kiện lái thử hàng quý tại trường đua Quốc tế Phú Thọ và các cung đường ven biển Đà Nẵng. Khách hàng có thể trải nghiệm các mẫu xe như McLaren P1 hoặc Rimac C_Two dưới sự hướng dẫn của các tay đua chuyên nghiệp. Đăng ký tham gia qua trang 'Tin tức' trên website."
    },
    {
        question: "Làm thế nào để kiểm tra tính xác thực của siêu xe?",
        answer: "Mỗi chiếc xe tại Elite HyperCars đều đi kèm chứng nhận xuất xứ (CO) và lịch sử bảo dưỡng đầy đủ từ nhà sản xuất. Chúng tôi sử dụng công nghệ blockchain để lưu trữ thông tin xe, đảm bảo minh bạch. Quý khách có thể yêu cầu kiểm tra độc lập bởi các chuyên gia từ TÜV SÜD hoặc SGS trước khi mua."
    }
];

// Hiển thị nội dung FAQ
function showFAQ(index) {
    const faqTitle = document.getElementById('faqTitle');
    const faqContent = document.getElementById('faqContent');
    faqTitle.textContent = faqData[index].question;
    faqContent.textContent = faqData[index].answer;
}

// Hiển thị FAQ đầu tiên mặc định
document.addEventListener('DOMContentLoaded', () => {
    showFAQ(0);
});