// Giữ lại code hover hiện tại
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    const coverImage = card.querySelector('.cover-image');
    const originalSrc = coverImage.getAttribute('data-original-src');
    const hoverSrc = "images/cars-collection/back_ground_car.jpg";         
    card.addEventListener('mouseenter', () => {
        coverImage.src = hoverSrc;
    });
            
    card.addEventListener('mouseleave', () => {
        coverImage.src = originalSrc;
    });
});

// Thêm chức năng phân trang
document.addEventListener('DOMContentLoaded', function() {
    // Lưu trữ dữ liệu xe cho từng trang
    const carPages = {
        // Trang 1 đã có trong HTML
        page1: [
            {
                id: 1,
                image: "images/cars-collection/anh_1.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_1_transform.png"
            },
            {
                id: 2,
                image: "images/cars-collection/anh_2.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_2.png"
            },
            {
                id: 3,
                image: "images/cars-collection/anh_3.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_3.png"
            },
            {
                id: 4,
                image: "images/cars-collection/anh_4.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_4.png"
            },
            {
                id: 5,
                image: "images/cars-collection/anh_5.jpeg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_5.png"
            },
            {
                id: 6,
                image: "images/cars-collection/anh_6.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_6.png"
            }
        ],
        
        // Trang 2
        page2: [
            {
                id: 7,
                image: "images/cars-collection/anh_7.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_7.png"
            },
            {
                id: 8,
                image: "images/cars-collection/anh_8.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_8.png"
            },
            {
                id: 9,
                image: "images/cars-collection/anh_9.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_9.png"
            },
            {
                id: 10,
                image: "images/cars-collection/anh_10.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_10.png"
            },
            {
                id: 11,
                image: "images/cars-collection/anh_11.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_11.png"
            },
            {
                id: 12,
                image: "images/cars-collection/anh_12.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_12.png"
            }
        ],
        
        // Trang 3
        page3: [
            {
                id: 13,
                image: "images/cars-collection/anh_13.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_13.png"
            },
            {
                id: 14,
                image: "images/cars-collection/anh_14.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_14.png"
            },
            {
                id: 15,
                image: "images/cars-collection/anh_15.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_15.png"
            },
            {
                id: 16,
                image: "images/cars-collection/anh_16.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_16.png"
            },
            {
                id: 17,
                image: "images/cars-collection/anh_17.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_17.png"
            },
            {
                id: 18,
                image: "images/cars-collection/anh_18.jpg",
                hoverImage: "images/cars-collection/back_ground_car.jpg",
                characterImage: "images/cars-collection/anh_18.png"
            }
        ]
    };
    
    // Lưu nội dung trang 1 (mặc định)
    const galleryElement = document.querySelector('.cars-gallery');
    const originalContent = galleryElement.innerHTML;
    
    // Hàm tạo HTML cho card
    function createCarCard(car) {
        return `
            <a href="car-details.html?id=${car.id}" class="car-item" data-category="hypercar">
                <div class="card">
                    <div class="wrapper">
                        <img src="${car.image}" class="cover-image" 
                            data-hover-src="${car.hoverImage}" 
                            data-original-src="${car.image}" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" class="title" />
                    <img src="${car.characterImage}" class="character" />
                </div>
            </a>
        `;
    }
    
    // Hàm tạo nội dung gallery cho một trang
    function renderPage(pageNumber) {
        let pageContent = '';
        const pageData = carPages[`page${pageNumber}`];
        
        if (pageNumber === 1) {
            // Sử dụng nội dung đã có sẵn của trang 1
            galleryElement.innerHTML = originalContent;
        } else {
            // Tạo nội dung mới cho trang 2 và 3
            pageData.forEach(car => {
                pageContent += createCarCard(car);
            });
            galleryElement.innerHTML = pageContent;
        }
        
        // Kích hoạt lại hiệu ứng hover cho các card
        const newCards = document.querySelectorAll('.card');
        newCards.forEach(card => {
            const coverImage = card.querySelector('.cover-image');
            const originalSrc = coverImage.getAttribute('data-original-src');
            const hoverSrc = "images/cars-collection/back_ground_car.jpg";         
            card.addEventListener('mouseenter', () => {
                coverImage.src = hoverSrc;
            });
                    
            card.addEventListener('mouseleave', () => {
                coverImage.src = originalSrc;
            });
        });
    }
    
    // Xử lý các nút phân trang
    const pageBtns = document.querySelectorAll('.page-btn:not(.next)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Cập nhật trạng thái active
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Hiển thị trang tương ứng
            const pageNumber = parseInt(this.textContent);
            renderPage(pageNumber);
            
            // Cuộn lên đầu phần gallery
            const carsSection = document.getElementById('cars');
            carsSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Xử lý nút next
    const nextBtn = document.querySelector('.page-btn.next');
    nextBtn.addEventListener('click', function() {
        // Tìm nút trang hiện tại
        const activeBtn = document.querySelector('.page-btn.active');
        const currentPage = parseInt(activeBtn.textContent);
        
        // Tính trang tiếp theo (quay lại trang 1 nếu đang ở trang 3)
        const nextPage = currentPage < 3 ? currentPage + 1 : 1;
        
        // Cập nhật UI và chuyển trang
        pageBtns.forEach(btn => {
            if (parseInt(btn.textContent) === nextPage) {
                btn.click();
            }
        });
    });
    
});