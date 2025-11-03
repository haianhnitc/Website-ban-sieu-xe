document.addEventListener('DOMContentLoaded', function() {
    // Lấy ID xe từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    
    // Dữ liệu chi tiết của các xe
    const carsData = {
        1: {
            MaSP: "CAR001",
            name: "Lamborghini Aventador SVJ",
            price: "$517,770",
            maxSpeed: "350 km/h",
            power: "770 HP",
            acceleration: "2.8s",
            colors: "Đỏ, Đen, Vàng, Trắng",
            description: "Lamborghini Aventador SVJ là một siêu xe đỉnh cao với động cơ V12 6.5L mạnh mẽ. Thiết kế khí động học tiên tiến với công nghệ ALA 2.0 (Aerodinamica Lamborghini Attiva) giúp tối ưu hiệu suất và khả năng bám đường. Chỉ sản xuất giới hạn 900 chiếc trên toàn thế giới, đây là một trong những mẫu Lamborghini mạnh mẽ và độc đáo nhất từng được chế tạo.",
            features: [
                "Động cơ V12 6.5L công suất 770 HP",
                "Hệ thống khí động học ALA 2.0",
                "Hệ thống treo đa chế độ với công nghệ từ tính",
                "Hệ thống phanh carbon-ceramic",
                "Hộp số ISR 7 cấp",
                "Khung gầm monocoque carbon fiber",
                "Hệ thống thông tin giải trí kết nối Apple CarPlay"
            ],
            links: [
                "https://www.lamborghini.com/en-en/models/aventador/aventador-svj",
                "https://www.caranddriver.com/lamborghini/aventador-svj"
            ],
            images: {
                main: "images/cars-collection/anh_1.jpg",
                thumbnails: [
                    "images/cars-collection/anh_1.jpg",
                    "images/car-details/details1.jpg",
                    "images/car-details/details2.jpg",
                    "images/car-details/details3.jpg"
                ]
            }
        },
        2: {
            MaSP: "CAR002",
            name: "Ferrari SF90 Stradale",
            price: "$625,000",
            maxSpeed: "340 km/h",
            power: "986 HP",
            acceleration: "2.5s",
            colors: "Đỏ, Vàng, Xanh, Trắng, Đen",
            description: "Ferrari SF90 Stradale là siêu xe hybrid plug-in đầu tiên của Ferrari, kết hợp động cơ V8 tăng áp kép 4.0L với ba mô-tơ điện. Công suất kết hợp lên đến 986 mã lực, giúp chiếc xe đạt hiệu suất đáng kinh ngạc. Thiết kế khí động học tiên tiến với hơn 390kg lực ép xuống đường ở tốc độ 250km/h. Đây là một bước đột phá về công nghệ và hiệu suất của Ferrari.",
            features: [
                "Hệ thống hybrid với công suất 986 HP",
                "Hệ dẫn động 4 bánh điện tử",
                "Khả năng vận hành thuần điện quãng đường 25km",
                "Màn hình HUD hiển thị thông tin trên kính lái",
                "Hệ thống kiểm soát trượt Side Slip Control 6.0",
                "Phanh carbon-ceramic",
                "Gương hậu kỹ thuật số"
            ],
            links: [
                "https://www.ferrari.com/en-EN/auto/sf90-stradale",
                "https://www.topgear.com/car-reviews/ferrari/sf90-stradale"
            ],
            images: {
                main: "images/cars-collection/anh_2.jpg",
                thumbnails: [
                    "images/cars-collection/anh_2.jpg",
                    "images/car-details/details4.jpg",
                    "images/car-details/details5.jpg",
                    "images/car-details/details6.jpg"
                ]
            }
        },
        3: {
            MaSP: "CAR003",
            name: "Bugatti Chiron Super Sport",
            price: "$3,825,000",
            maxSpeed: "440 km/h",
            power: "1,578 HP",
            acceleration: "2.4s",
            colors: "Đen, Xanh, Bạc, Trắng, Cam",
            description: "Bugatti Chiron Super Sport là một kiệt tác kỹ thuật với động cơ W16 8.0L quad-turbo sản sinh công suất khủng khiếp 1,578 mã lực. Chiếc siêu xe này được thiết kế để trở thành một trong những mẫu xe sản xuất nhanh nhất thế giới với tốc độ tối đa lên đến 440 km/h.",
            features: [
                "Động cơ W16 8.0L quad-turbo công suất 1,578 HP",
                "Thân xe kéo dài cho khí động học tối ưu",
                "Hệ thống làm mát tiên tiến với 10 bộ tản nhiệt",
                "Khung gầm carbon fiber siêu nhẹ",
                "Hệ thống treo thích ứng với công nghệ Bugatti",
                "Hộp số ly hợp kép 7 cấp",
                "Hệ thống phanh carbon-ceramic kích thước lớn"
            ],
            links: [
                "https://www.bugatti.com/chiron/chiron-super-sport/",
                "https://www.motor1.com/bugatti/chiron-super-sport/"
            ],
            images: {
                main: "images/cars-collection/anh_3.jpg",
                thumbnails: [
                    "images/cars-collection/anh_3.jpg",
                    "images/car-details/details7.jpg",
                    "images/car-details/details8.jpg",
                    "images/car-details/details9.jpg"
                ]
            }
        },
        4: {
            MaSP: "CAR004",
            name: "Rolls-Royce Ghost",
            price: "$311,900",
            maxSpeed: "250 km/h",
            power: "563 HP",
            acceleration: "4.6s",
            colors: "Đen, Trắng, Bạc, Xám, Xanh Midnight",
            description: "Rolls-Royce Ghost là biểu tượng của sự tinh tế và sang trọng hiện đại, kết hợp giữa hiệu suất mạnh mẽ và sự yên tĩnh đỉnh cao. Với thiết kế tối giản đầy đẳng cấp, Ghost mang lại trải nghiệm lái êm ái như 'thảm bay' nhờ hệ thống treo Planar Suspension tiên tiến và động cơ V12 mạnh mẽ. Không gian nội thất được chế tác thủ công tỉ mỉ với những vật liệu cao cấp nhất, mang lại cảm giác hoàng gia trên từng hành trình.",
            features: [
                "Động cơ V12 tăng áp kép 6.75L công suất 563 HP",
                "Hệ thống treo Planar Suspension siêu mượt",
                "Khung gầm Architecture of Luxury bằng nhôm độc quyền",
                "Cửa sau mở ngược (suicide doors) đặc trưng",
                "Hệ thống cách âm đỉnh cao với hơn 100kg vật liệu tiêu âm",
                "Trần xe Starlight với 1.344 đèn LED mô phỏng bầu trời sao",
                "Nội thất bọc da thủ công và gỗ quý cao cấp"
            ],
            links: [
                "https://www.rolls-roycemotorcars.com/en_US/showroom/ghost.html",
                "https://www.caranddriver.com/rolls-royce/ghost"
            ],
            images: {
                main: "images/cars-collection/anh_4.jpg",
                thumbnails: [
                    "images/cars-collection/anh_4.jpg",
                    "images/car-details/details10.jpg",
                    "images/car-details/details11.jpg",
                    "images/car-details/details12.jpg"
                ]
            }
        },
        5: {
            MaSP: "CAR005",
            name: "Pagani Huayra BC",
            price: "$3,650,000",
            maxSpeed: "380 km/h",
            power: "791 HP",
            acceleration: "2.7s",
            colors: "Bạc, Xám, Xanh, Đỏ, Đen",
            description: "Pagani Huayra BC là phiên bản hiệu suất cao của Huayra, được đặt theo tên của Benny Caiola - khách hàng đầu tiên của Pagani. Chiếc siêu xe này đại diện cho sự kết hợp hoàn hảo giữa nghệ thuật và khoa học. Với động cơ AMG V12 twin-turbo 6.0L và trọng lượng chỉ 1,218 kg, BC có tỷ lệ công suất/trọng lượng cực kỳ ấn tượng. Mỗi chi tiết đều được chế tạo thủ công với sự chú ý đến từng chi tiết nhỏ nhất, đúng với triết lý của Horacio Pagani.",
            features: [
                "Động cơ AMG V12 twin-turbo 6.0L công suất 791 HP",
                "Hộp số ly hợp 7 cấp nhẹ hơn 40% so với tiêu chuẩn",
                "Khung gầm Carbo-Titanium HP52",
                "Hệ thống treo chủ động với công nghệ Brembo",
                "Phanh carbon-ceramic với hợp kim Brembo mới",
                "Lốp Pirelli P Zero Corsa được phát triển riêng",
                "Hệ thống xả titanium nhẹ với lớp phủ ceramic"
            ],
            links: [
                "https://www.pagani.com/huayra-bc/",
                "https://www.topgear.com/car-reviews/pagani/huayra-bc"
            ],
            images: {
                main: "images/cars-collection/anh_5.jpg",
                thumbnails: [
                    "images/cars-collection/anh_5.jpg",
                    "images/car-details/details13.jpg",
                    "images/car-details/details14.jpg",
                    "images/car-details/details15.jpg"
                ]
            }
        },
        6: {
            MaSP: "CAR006",
            name: "Koenigsegg Jesko",
            price: "$2,800,000",
            maxSpeed: "480+ km/h",
            power: "1,600 HP",
            acceleration: "2.5s",
            colors: "Trắng, Đỏ, Xanh, Đen, Bạc",
            description: "Koenigsegg Jesko, đặt theo tên của cha của Christian von Koenigsegg, là siêu xe thế hệ tiếp theo được thiết kế để phá vỡ kỷ lục tốc độ. Với động cơ V8 twin-turbo 5.0L có khả năng sản sinh lên đến 1,600 mã lực (khi sử dụng nhiên liệu E85), Jesko có tiềm năng đạt tốc độ trên 480 km/h. Hộp số Light Speed Transmission (LST) 9 cấp cách mạng của xe cho phép chuyển số tức thời với bất kỳ cấp số nào, không có độ trễ. :contentReference[oaicite:0]{index=0}",
            features: [
                "Động cơ V8 twin-turbo 5.0L công suất 1,600 HP (với E85)",
                "Hộp số Light Speed Transmission (LST) 9 cấp cách mạng",
                "Hệ thống khí động học chủ động tạo ra hơn 1,000kg lực ép",
                "Hệ thống treo thích ứng với công nghệ Triplex mới",
                "Khung gầm carbon monocoque siêu cứng",
                "Phanh carbon-ceramic Michelin",
                "Cửa dihedral synchro-helix không cần trục"
            ],
            links: [
                "https://www.koenigsegg.com/model/jesko-attack",
                "https://www.caranddriver.com/koenigsegg/jesko"
            ],
            images: {
                main: "images/cars-collection/anh_6.jpg",
                thumbnails: [
                    "images/cars-collection/anh_6.jpg",
                    "images/car-details/details16.jpg",
                    "images/car-details/details17.jpg",
                    "images/car-details/details18.jpg"
                ]
            }
        },
        7: {
            MaSP: "CAR007",
            name: "Aston Martin Valkyrie",
            price: "$3,200,000",
            maxSpeed: "354 km/h",
            power: "1,140 HP",
            acceleration: "2.5s",
            colors: "Đen, Xanh, Bạc, Xám, Đỏ",
            description: "Aston Martin Valkyrie là sản phẩm hợp tác giữa Aston Martin và đội đua F1 Red Bull Racing. Được thiết kế bởi Adrian Newey – kỹ sư thiết kế F1 huyền thoại, Valkyrie là chiếc siêu xe hypercar mang DNA đua xe F1 thuần túy. Với động cơ Cosworth V12 6.5L hút khí tự nhiên kết hợp hệ thống hybrid, Valkyrie sản sinh 1,140 mã lực trong khi chỉ nặng khoảng 1,030 kg, mang lại tỷ lệ công suất/trọng lượng 1:1.",
            features: [
                "Động cơ Cosworth V12 6.5L hybrid công suất 1,140 HP",
                "Trọng lượng siêu nhẹ 1,030 kg",
                "Thiết kế khí động học Venturi cực đoan bên dưới gầm xe",
                "Khung gầm carbon fiber được chế tạo hoàn toàn thủ công",
                "Ghế ngồi được tích hợp trực tiếp vào khung gầm",
                "Vô lăng tháo rời tích hợp màn hình hiển thị",
                "Hệ thống treo push-rod được lấy cảm hứng từ F1"
            ],
            links: [
                "https://www.astonmartin.com/en-us/models/valkyrie",
                "https://www.topgear.com/car-reviews/aston-martin/valkyrie"
            ],
            images: {
                main: "images/cars-collection/anh_7.jpg",
                thumbnails: [
                    "images/cars-collection/anh_7.jpg",
                    "images/car-details/details19.jpg",
                    "images/car-details/details20.jpg",
                    "images/car-details/details21.jpg"
                ]
            }
        },
        8: {
            MaSP: "CAR008",
            name: "Rimac Nevera",
            price: "$2,400,000",
            maxSpeed: "412 km/h",
            power: "1,914 HP",
            acceleration: "1.85s",
            colors: "Xanh, Trắng, Xám, Đen, Bạc",
            description: "Rimac Nevera là siêu xe điện đã phá vỡ mọi kỷ lục về hiệu suất. Với bốn động cơ điện độc lập cung cấp tổng công suất 1,914 mã lực, Nevera có thể đạt 0-100 km/h trong chỉ 1,85 giây – nhanh nhất trong số các xe thương mại. Pin dung lượng 120kWh cung cấp phạm vi hoạt động lên đến 550km. Với thân vỏ và khung gầm carbon fiber, Nevera không chỉ là một siêu xe hiệu suất mà còn là một bước đột phá về mặt kỹ thuật trong lĩnh vực xe điện.",
            features: [
                "Bốn động cơ điện độc lập với tổng công suất 1,914 HP",
                "Pin 120kWh cho phạm vi hoạt động 550km",
                "Tăng tốc 0-100 km/h trong 1,85 giây",
                "Hệ thống quản lý moment xoắn Rimac All-Wheel Torque Vectoring 2",
                "Khung gầm monocoque carbon fiber siêu nhẹ",
                "Hệ thống phanh điện tử với khả năng tái tạo năng lượng",
                "150 cảm biến theo dõi và điều chỉnh hiệu suất xe"
            ],
            links: [
                "https://www.rimac-automobili.com/nevera/",
                "https://www.topgear.com/car-reviews/rimac/nevera"
            ],
            images: {
                main: "images/cars-collection/anh_8.jpg",
                thumbnails: [
                    "images/cars-collection/anh_8.jpg",
                    "images/car-details/details22.jpg",
                    "images/car-details/details23.jpg",
                    "images/car-details/details24.jpg"
                ]
            }
        },
        9: {
            MaSP: "CAR009",
            name: "Porsche 918 Spyder",
            price: "$845,000",
            maxSpeed: "345 km/h",
            power: "887 HP",
            acceleration: "2.6s",
            colors: "Bạc, Đen, Trắng, Đỏ, Xanh",
            description: "Porsche 918 Spyder là siêu xe hybrid plug-in đầu tiên của Porsche, kết hợp động cơ V8 4.6L hút khí tự nhiên với hai mô-tơ điện. Tổng công suất 887 mã lực cho phép xe đạt tốc độ tối đa 345 km/h và tăng tốc từ 0-100 km/h trong 2,6 giây. Hệ thống dẫn động bốn bánh với mô-tơ điện ở trục trước và hệ thống đánh lái bánh sau giúp xe xử lý cực kỳ chính xác. 918 Spyder đã thiết lập kỷ lục tại đường đua Nürburgring với thời gian 6:57, chứng minh hiệu suất vượt trội của mình.",
            features: [
                "Động cơ hybrid V8 4.6L kết hợp hai mô-tơ điện (887 HP)",
                "Hệ thống dẫn động bốn bánh với mô-tơ điện ở trục trước",
                "Chế độ lái điện thuần túy với phạm vi 19km",
                "Hệ thống khí động học chủ động",
                "Hệ thống đánh lái bánh sau",
                "Khung gầm monocoque carbon fiber",
                "Hệ thống ống xả Weissach đặt ở phía trên"
            ],
            links: [
                "https://www.porsche.com/usa/models/918/918-spyder/",
                "https://www.caranddriver.com/porsche/918-spyder"
            ],
            images: {
                main: "images/cars-collection/anh_9.jpg",
                thumbnails: [
                    "images/cars-collection/anh_9.jpg",
                    "images/car-details/details25.jpg",
                    "images/car-details/details26.jpg",
                    "images/car-details/details27.jpg"
                ]
            }
        },
        10: {
            MaSP: "CAR010",
            name: "Gordon Murray Automotive T.50",
            price: "$3,100,000",
            maxSpeed: "375 km/h",
            power: "654 HP",
            acceleration: "2.8s",
            colors: "Bạc, Đen, Xanh, Đỏ, Trắng",
            description: "Gordon Murray Automotive T.50 được thiết kế bởi Gordon Murray – cha đẻ của McLaren F1 huyền thoại. T.50 được xem là siêu xe lấy người lái làm trung tâm thuần túy nhất từng được sản xuất, với động cơ V12 4.0L hút khí tự nhiên do Cosworth phát triển có khả năng quay đến 12,100 rpm và trọng lượng chỉ 986kg. Đặc trưng nổi bật của T.50 là quạt hút khí 400mm ở đuôi xe, lấy cảm hứng từ xe đua Brabham BT46B 'Fan Car', giúp tăng đáng kể lực ép xuống đường.",
            features: [
                "Động cơ V12 4.0L Cosworth hút khí tự nhiên (654 HP)",
                "Quạt hút khí đường kính 400mm ở đuôi xe",
                "Trọng lượng siêu nhẹ 986kg",
                "Bố trí ghế ngồi 3 chỗ với người lái ở chính giữa",
                "Hộp số sàn 6 cấp nhẹ, chính xác",
                "Khung gầm carbon fiber siêu nhẹ",
                "Hệ thống treo làm từ vật liệu siêu nhẹ"
            ],
            links: [
                "https://gordonmurrayautomotive.com/coches/t50/",
                "https://www.topgear.com/car-reviews/gordon-murray-automotive/t50"
            ],
            images: {
                main: "images/cars-collection/anh_10.jpg",
                thumbnails: [
                    "images/cars-collection/anh_10.jpg",
                    "images/car-details/details28.jpg",
                    "images/car-details/details29.jpg",
                    "images/car-details/details30.jpg"
                ]
            }
        },
        11: {
            MaSP: "CAR011",
            name: "Hennessey Venom F5",
            price: "$1,800,000",
            maxSpeed: "500+ km/h",
            power: "1,817 HP",
            acceleration: "2.3s",
            colors: "Vàng, Bạc, Trắng, Đen, Xanh",
            description: "Hennessey Venom F5 được thiết kế với sứ mệnh trở thành siêu xe sản xuất nhanh nhất thế giới, với mục tiêu phá vỡ rào cản 500 km/h. Với động cơ Fury V8 twin-turbo 6.6L sản sinh 1,817 mã lực và trọng lượng chỉ 1,360kg, Venom F5 có tỷ lệ công suất/trọng lượng cực kỳ ấn tượng. Mọi khía cạnh của xe đều được thiết kế để tối đa hóa tốc độ và giảm lực cản, từ khung gầm carbon fiber đến thiết kế khí động học được tinh chỉnh qua nhiều giai đoạn thử nghiệm.",
            features: [
                "Động cơ Fury V8 twin-turbo 6.6L công suất 1,817 HP",
                "Trọng lượng siêu nhẹ 1,360kg",
                "Hộp số bán tự động 7 cấp CIMA",
                "Thiết kế khí động học tối ưu với hệ số cản chỉ 0.39",
                "Khung gầm carbon fiber độc quyền",
                "Hệ thống treo đua xe được tinh chỉnh cho đường phố",
                "Hệ thống phanh Brembo carbon-ceramic"
            ],
            links: [
                "https://www.hennesseyperformance.com/venomf5/",
                "https://www.topgear.com/car-reviews/hennessey/venom-f5"
            ],
            images: {
                main: "images/cars-collection/anh_11.jpg",
                thumbnails: [
                    "images/cars-collection/anh_11.jpg",
                    "images/car-details/details31.jpg",
                    "images/car-details/details32.jpg",
                    "images/car-details/details33.jpg"
                ]
            }
        },
        12: {
            MaSP: "CAR012",
            name: "Pininfarina Battista",
            price: "$2,200,000",
            maxSpeed: "350 km/h",
            power: "1,900 HP",
            acceleration: "1.9s",
            colors: "Xanh, Bạc, Đen, Đỏ, Trắng",
            description: "Pininfarina Battista là siêu xe điện thuần túy đến từ thương hiệu thiết kế xe hơi lừng danh của Ý. Với bốn động cơ điện sản sinh tổng công suất 1,900 mã lực, Battista có khả năng tăng tốc từ 0-100 km/h trong chỉ 1.9 giây và đạt tốc độ tối đa 350 km/h. Pin 120kWh cho phép xe di chuyển quãng đường lên đến 500km. Battista là sự kết hợp hoàn hảo giữa hiệu suất siêu xe với thiết kế tinh tế, sang trọng đặc trưng của Pininfarina.",
            features: [
                "Bốn động cơ điện với tổng công suất 1,900 HP",
                "Pin 120kWh cho phạm vi hoạt động 500km",
                "Khung gầm carbon fiber thiết kế độc quyền",
                "Hệ thống treo chủ động với điều chỉnh chiều cao",
                "Năm chế độ lái: Calma, Pura, Energica, Furiosa và Carattere",
                "Hệ thống phanh carbon-ceramic với đĩa phanh kích thước 390mm",
                "Công nghệ âm thanh AI âm thanh tạo cảm giác như xe động cơ đốt trong"
            ],
            links: [
                "https://www.automobili-pininfarina.com/battista/",
                "https://www.topgear.com/car-reviews/pininfarina/battista"
            ],
            images: {
                main: "images/cars-collection/anh_12.jpg",
                thumbnails: [
                    "images/cars-collection/anh_12.jpg",
                    "images/car-details/details34.jpg",
                    "images/car-details/details35.jpg",
                    "images/car-details/details36.jpg"
                ]
            }
        },
        13: {
            MaSP: "CAR013",
            name: "Mercedes-AMG One",
            price: "$2,700,000",
            maxSpeed: "350 km/h",
            power: "1,063 HP",
            acceleration: "2.9s",
            colors: "Bạc, Đen, Xanh, Trắng, Đỏ",
            description: "Mercedes-AMG One là siêu xe đường phố đầu tiên được trang bị động cơ F1 thực thụ. Sử dụng động cơ V6 hybrid 1.6L tăng áp kép kết hợp với bốn mô-tơ điện, giống với đội đua F1 Mercedes-AMG Petronas, AMG One sản sinh 1,063 mã lực. Công nghệ KERS (Hệ thống phục hồi năng lượng động học) từ F1 được ứng dụng để tối đa hóa hiệu suất. Với khả năng quay tới 11,000 rpm, AMG One mang trải nghiệm xe đua F1 thuần túy lên đường phố.",
            features: [
                "Động cơ V6 hybrid 1.6L tăng áp kép công nghệ F1 (1,063 HP)",
                "Bốn mô-tơ điện với công nghệ KERS từ F1",
                "Hệ thống khí động học chủ động với DRS (Hệ thống giảm lực cản)",
                "Khung gầm monocoque carbon fiber",
                "Hệ thống treo push-rod đa liên kết",
                "Hộp số tự động 8 cấp với chức năng sang số thủ công",
                "Chế độ EV với phạm vi hoạt động 25km"
            ],
            links: [
                "https://www.mercedes-amg.com/en/one.html",
                "https://www.caranddriver.com/mercedes-amg/one"
            ],
            images: {
                main: "images/cars-collection/anh_13.jpg",
                thumbnails: [
                    "images/cars-collection/anh_13.jpg",
                    "images/car-details/details37.jpg",
                    "images/car-details/details38.jpg",
                    "images/car-details/details39.jpg"
                ]
            }
        },
        14: {
            MaSP: "CAR014",
            name: "SSC Tuatara",
            price: "$1,900,000",
            maxSpeed: "460 km/h",
            power: "1,750 HP",
            acceleration: "2.5s",
            colors: "Trắng, Đen, Bạc, Đỏ, Xanh",
            description: "SSC Tuatara là siêu xe Mỹ được thiết kế để đạt được tốc độ cực cao. Với động cơ V8 twin-turbo 5.9L được phát triển riêng sản sinh 1,750 mã lực khi sử dụng nhiên liệu E85, Tuatara có thể đạt tốc độ vượt quá 460 km/h. Hệ số cản không khí chỉ 0.279 là một trong những giá trị thấp nhất trong số các siêu xe sản xuất, cho phép xe đạt được những tốc độ phi thường. Thiết kế khí động học của Tuatara được hoàn thiện qua hơn 1,000 giờ thử nghiệm trong đường hầm gió.",
            features: [
                "Động cơ V8 twin-turbo 5.9L công suất 1,750 HP (với E85)",
                "Trọng lượng 1,247kg với thân vỏ carbon fiber",
                "Hệ số cản không khí 0.279",
                "Hệ thống treo chủ động điều chỉnh chiều cao",
                "Hộp số tự động ly hợp 7 cấp CIMA",
                "Hệ thống kiểm soát phát thải động cơ độc quyền",
                "Hệ thống điều khiển Launch Control cho khả năng tăng tốc tối ưu"
            ],
            links: [
                "https://www.sscnorthamerica.com/tuatara/",
                "https://www.topgear.com/car-reviews/ssc/tuatara"
            ],
            images: {
                main: "images/cars-collection/anh_14.jpg",
                thumbnails: [
                    "images/cars-collection/anh_14.jpg",
                    "images/car-details/details40.jpg",
                    "images/car-details/details41.jpg",
                    "images/car-details/details42.jpg"
                ]
            }
        },
        15: {
            MaSP: "CAR015",
            name: "Lotus Evija",
            price: "$2,100,000",
            maxSpeed: "320 km/h",
            power: "2,000 HP",
            acceleration: "< 3s",
            colors: "Vàng, Đen, Xanh, Trắng, Bạc",
            description: "Lotus Evija là siêu xe điện đầu tiên của Lotus, nổi tiếng với thiết kế khí động học độc đáo và công suất khổng lồ. Với bốn động cơ điện sản sinh tổng công suất 2,000 mã lực, Evija là một trong những siêu xe mạnh nhất thế giới. Thiết kế của xe bao gồm các kênh Venturi lớn xuyên qua thân xe, tạo ra lực ép khí động học mà không cần đến cánh gió cố định. Pin 70kWh cho phép xe đi được quãng đường khoảng 400km và có thể sạc từ 0-80% chỉ trong 12 phút với bộ sạc 800kW.",
            features: [
                "Bốn động cơ điện với tổng công suất 2,000 HP",
                "Pin 70kWh sạc siêu nhanh (0-80% trong 12 phút)",
                "Đèn LED động OLED với hiệu ứng sequential",
                "Kênh Venturi khí động học độc đáo",
                "Khung gầm carbon fiber monocoque chỉ nặng 129kg",
                "Hệ thống treo push-rod chủ động",
                "Hệ thống torque vectoring điều khiển điện tử"
            ],
            links: [
                "https://www.lotuscars.com/evija/",
                "https://www.topgear.com/car-reviews/lotus/evija"
            ],
            images: {
                main: "images/cars-collection/anh_15.jpg",
                thumbnails: [
                    "images/cars-collection/anh_15.jpg",
                    "images/car-details/details43.jpg",
                    "images/car-details/details44.jpg",
                    "images/car-details/details45.jpg"
                ]
            }
        },
        16: {
            MaSP: "CAR016",
            name: "Maserati MC20",
            price: "$215,000",
            maxSpeed: "325 km/h",
            power: "621 HP",
            acceleration: "2.9s",
            colors: "Xanh, Trắng, Đen, Đỏ, Vàng",
            description: "Maserati MC20 đánh dấu sự trở lại của Maserati vào thị trường siêu xe với động cơ V6 twin-turbo 3.0L Nettuno độc quyền. Được phát triển hoàn toàn bởi Maserati, động cơ này sử dụng công nghệ buồng đốt kép lấy cảm hứng từ F1. Với thiết kế tối giản nhưng tinh tế, MC20 có trọng lượng chỉ 1,475kg nhờ sử dụng khung gầm carbon fiber và vật liệu composite. Tên 'MC20' là viết tắt của 'Maserati Corse 2020', nhấn mạnh di sản đua xe của thương hiệu và khả năng chuyển đổi trong tương lai sang phiên bản đua.",
            features: [
                "Động cơ V6 twin-turbo 3.0L Nettuno công suất 621 HP",
                "Công nghệ buồng đốt kép lấy cảm hứng từ F1",
                "Hộp số ly hợp kép 8 cấp",
                "Cửa cánh bướm với thiết kế khí động học",
                "Khung gầm monocoque carbon fiber và aluminium",
                "Hệ thống kiểm soát xe điện tử với 5 chế độ lái",
                "Khả năng chuyển đổi giữa phiên bản coupe và spyder"
            ],
            links: [
                "https://www.maserati.com/maserati/international/en/models/mc20",
                "https://www.caranddriver.com/maserati/mc20"
            ],
            images: {
                main: "images/cars-collection/anh_16.jpg",
                thumbnails: [
                    "images/cars-collection/anh_16.jpg",
                    "images/car-details/details46.jpg",
                    "images/car-details/details47.jpg",
                    "images/car-details/details48.jpg"
                ]
            }
        },
        17: {
            MaSP: "CAR017",
            name: "Czinger 21C",
            price: "$1,700,000",
            maxSpeed: "405 km/h",
            power: "1,250 HP",
            acceleration: "1.9s",
            colors: "Xám, Đen, Bạc, Đỏ, Xanh",
            description: "Czinger 21C là siêu xe hybrid được sản xuất bằng công nghệ in 3D tiên tiến tại Mỹ. Sử dụng động cơ V8 twin-turbo 2.88L phẳng kết hợp với hai mô-tơ điện, 21C sản sinh 1,250 mã lực và có thể tăng tốc từ 0-100 km/h trong 1.9 giây. Điểm đặc biệt của 21C là bố trí ghế ngồi 1+1 (người lái ở giữa, hành khách phía sau), lấy cảm hứng từ máy bay phản lực. Khung gầm và các thành phần cấu trúc được in 3D và lắp ráp bởi robot AI, tạo ra độ chính xác và trọng lượng tối ưu chưa từng có. :contentReference[oaicite:1]{index=1}",
            features: [
                "Động cơ V8 twin-turbo 2.88L hybrid công suất 1,250 HP",
                "Công nghệ sản xuất in 3D tiên tiến",
                "Bố trí ghế ngồi 1+1 độc đáo",
                "Trọng lượng siêu nhẹ 1,250kg",
                "Hệ thống treo độc lập điều khiển điện tử",
                "Hệ thống khí động học chủ động với lực ép 615kg ở 322 km/h",
                "Hộp số 7 cấp tự động ly hợp tuần tự"
            ],
            links: [
                "https://www.motortrend.com/features/czinger-21c-3-d-hypercar-details-photos/",
                "https://www.topgear.com/car-news/supercars/heres-production-spec-czinger-21c"
            ],
            images: {
                main: "images/cars-collection/anh_17.jpg",
                thumbnails: [
                    "images/cars-collection/anh_17.jpg",
                    "images/car-details/details49.jpg",
                    "images/car-details/details50.jpg",
                    "images/car-details/details51.jpg"
                ]
            }
        },
        18: {
            MaSP: "CAR018",
            name: "Ferrari LaFerrari",
            price: "$1,400,000",
            maxSpeed: "350 km/h",
            power: "963 HP",
            acceleration: "2.4s",
            colors: "Đỏ, Đen, Vàng, Trắng, Xanh",
            description: "Ferrari LaFerrari là siêu xe hybrid plug-in đầu tiên của Ferrari, cũng là thành viên trong bộ ba 'Holy Trinity' của siêu xe hybrid cùng với McLaren P1 và Porsche 918 Spyder. Kết hợp động cơ V12 6.3L hút khí tự nhiên với hệ thống HY-KERS lấy cảm hứng từ F1, LaFerrari sản sinh tổng công suất 963 mã lực. Thân xe và khung gầm được làm hoàn toàn từ carbon fiber với bốn loại carbon khác nhau, giúp tối ưu hóa trọng lượng và độ cứng. Chỉ có 499 chiếc LaFerrari Coupe được sản xuất, khiến nó trở thành một trong những siêu xe độc quyền nhất.",
            features: [
                "Động cơ V12 6.3L hybrid công suất 963 HP",
                "Hệ thống HY-KERS lấy cảm hứng từ F1",
                "Khung gầm và thân xe carbon fiber",
                "Hệ thống kiểm soát động học xe chủ động",
                "Hộp số ly hợp kép 7 cấp",
                "Cửa mở kiểu butterfly độc đáo",
                "Hệ thống phanh carbon-ceramic Brembo"
            ],
            links: [
                "https://www.ferrari.com/en-EN/auto/laferrari",
                "https://www.caranddriver.com/ferrari/la-ferrari"
            ],
            images: {
                main: "images/cars-collection/anh_18.jpg",
                thumbnails: [
                    "images/cars-collection/anh_18.jpg",
                    "images/car-details/details52.jpg",
                    "images/car-details/details53.jpg",
                    "images/car-details/details54.jpg"
                ]
            }
        }
    };

    
    // Hiển thị thông tin chi tiết xe (phiên bản sửa, tương thích với carsData bạn gửi)
    function displayCarDetails(passedCarId) {
        // Lấy carId ưu tiên: param > URL query > localStorage (nếu bạn dùng) 
        let carId = passedCarId;
        if (!carId) {
            const urlParams = new URLSearchParams(window.location.search);
            carId = urlParams.get('id') || localStorage.getItem('selectedCarId');
        }

        // Kiểm tra carsData có tồn tại
        if (typeof carsData === 'undefined' || carsData === null) {
            console.error('❌ carsData chưa được load hoặc không tồn tại.');
            return;
        }

        // Nếu carId là chuỗi rỗng hoặc null
        if (!carId) {
            console.error('❌ Không xác định được carId. Vui lòng truyền ?id=... trong URL hoặc truyền tham số khi gọi hàm.');
            return;
        }

        // Lấy object car — lưu ý keys trong carsData bạn dùng là 1,2,... nên carsData[carId] (carId dạng '1' hay 1 đều OK)
        const car = carsData[carId];
        if (!car) {
            console.error('❌ Không tìm thấy xe với ID:', carId, '(Kiểm tra keys trong carsData).');
            return;
        }

        // Helper: set text nội dung cho id, nếu element không tồn tại thì bỏ qua
        const setText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text !== undefined && text !== null ? text : 'Đang cập nhật...';
        };

        // --- Cập nhật thông tin cơ bản ---
        setText('car-name', car.name || 'N/A');
        setText('car-name-breadcrumb', car.name || 'N/A');
        setText('car-price', car.price || 'N/A');
        setText('car-max-speed', car.maxSpeed || 'N/A');
        setText('car-power', car.power || 'N/A');
        setText('car-acceleration', car.acceleration || 'N/A');
        setText('car-colors', car.colors || 'N/A');
        setText('car-description', car.description || 'Không có mô tả.');

        // --- Mã sản phẩm: sử dụng thuộc tính MaSP (theo data bạn gửi) ---
        const carCodeSpan = document.getElementById('car-code');
        if (carCodeSpan) {
            const ma = car.MaSP || car.code || car.maSP || null; // hỗ trợ nhiều tên trường phòng khi khác
            carCodeSpan.textContent = ma ? ma : 'N/A';
        }

        // --- Danh sách tính năng ---
        const featuresList = document.getElementById('car-features');
        if (featuresList) {
            featuresList.innerHTML = '';
            if (Array.isArray(car.features) && car.features.length > 0) {
                car.features.forEach(f => {
                    const li = document.createElement('li');
                    li.textContent = f;
                    featuresList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Không có thông tin tính năng.';
                featuresList.appendChild(li);
            }
        }

        // --- Hình ảnh chính và thumbnails ---
        if (car.images && car.images.main) {
            const mainImg = document.getElementById('car-main-image');
            if (mainImg) mainImg.src = car.images.main;
        }

        if (car.images && Array.isArray(car.images.thumbnails)) {
            for (let i = 0; i < 4; i++) {
                const imgEl = document.getElementById(`thumbnail-${i + 1}`);
                const thumbUrl = car.images.thumbnails[i];
                if (imgEl) {
                    if (thumbUrl) {
                        imgEl.src = thumbUrl;
                        // đặt data-image cho parent .thumbnail (nếu tồn tại)
                        if (imgEl.parentElement) imgEl.parentElement.dataset.image = thumbUrl;
                    } else {
                        // nếu thiếu thumbnail, giữ placeholder hoặc ẩn
                        imgEl.src = imgEl.src || 'images/placeholder.jpg';
                    }
                }
            }
        }

        // Thiết lập sự kiện cho thumbnails (gán onclick bằng 1 handler, tránh gắn chồng)
        const thumbnailDivs = document.querySelectorAll('.thumbnail');
        thumbnailDivs.forEach(div => {
            // đảm bảo dataset.image có giá trị; nếu không, lấy ảnh con img
            const imageSrc = div.dataset.image || (div.querySelector('img') && div.querySelector('img').src);
            div.onclick = function () {
                // cập nhật class active
                thumbnailDivs.forEach(d => d.classList.remove('active'));
                this.classList.add('active');

                // cập nhật ảnh chính
                const mainImg = document.getElementById('car-main-image');
                if (mainImg && imageSrc) mainImg.src = imageSrc;
            };
        });

        // --- Bài viết liên quan: hiển thị các link đến trang chính thức của hãng xe ---
        const relatedUl = document.querySelector('.related-articles ul') || document.getElementById('car-links');
        if (relatedUl) {
            relatedUl.innerHTML = '';
            const links = car.links || car.relatedArticles || car.linksList || [];
            if (Array.isArray(links) && links.length > 0) {
                links.forEach((l, index) => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');

                    if (typeof l === 'string') {
                        a.href = l;
                        // Extract meaningful name from URL
                        try {
                            const u = new URL(l);
                            const domain = u.hostname.replace('www.', '');
                            const pathParts = u.pathname.split('/').filter(p => p);
                            
                            if (domain.includes('lamborghini')) {
                                a.textContent = `🔗 ${index + 1}. Lamborghini Official - ${pathParts.slice(-1)[0] || 'Model'}`;
                            } else if (domain.includes('ferrari')) {
                                a.textContent = `🔗 ${index + 1}. Ferrari Official - ${pathParts.slice(-1)[0] || 'Model'}`;
                            } else if (domain.includes('porsche')) {
                                a.textContent = `🔗 ${index + 1}. Porsche Official - ${pathParts.slice(-1)[0] || 'Model'}`;
                            } else if (domain.includes('bugatti')) {
                                a.textContent = `🔗 ${index + 1}. Bugatti Official - ${pathParts.slice(-1)[0] || 'Model'}`;
                            } else if (domain.includes('caranddriver')) {
                                a.textContent = `📰 ${index + 1}. Car and Driver Review`;
                            } else if (domain.includes('topgear')) {
                                a.textContent = `📺 ${index + 1}. Top Gear Review`;
                            } else if (domain.includes('motor1')) {
                                a.textContent = `📰 ${index + 1}. Motor1 Article`;
                            } else {
                                a.textContent = `🔗 ${index + 1}. ${domain}`;
                            }
                        } catch (e) {
                            a.textContent = `🔗 ${index + 1}. Xem bài viết`;
                        }
                    } else if (typeof l === 'object' && l !== null) {
                        a.href = l.url || '#';
                        a.textContent = `🔗 ${index + 1}. ${l.title || l.url || 'Xem bài viết'}`;
                    } else {
                        a.href = '#';
                        a.textContent = `🔗 ${index + 1}. Xem bài viết`;
                    }

                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.className = 'car-link';
                    li.appendChild(a);
                    relatedUl.appendChild(li);
                });
            } else {
                relatedUl.innerHTML = '<li><span style="color: #999;">Không có bài viết liên quan.</span></li>';
            }
        }

        // --- Nút Thêm vào giỏ hàng ---
        const addToCartButton = document.getElementById('add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.onclick = function () {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (isLoggedIn) {
                    // addToCart sử dụng car object và carId (theo data của bạn)
                    if (typeof addToCart === 'function') addToCart(car, carId);
                    else console.warn('Hàm addToCart chưa được định nghĩa.');
                } else {
                    window.location.href = 'login.html';
                }
            };
        }

        // --- Nút Đặt hàng ngay ---
        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            checkoutButton.onclick = function () {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                if (isLoggedIn) {
                    if (typeof showCheckoutModal === 'function') showCheckoutModal();
                    else console.warn('Hàm showCheckoutModal chưa được định nghĩa.');
                } else {
                    window.location.href = 'login.html';
                }
            };
        }

        // Cập nhật badge giỏ hàng nếu hàm tồn tại
        if (typeof updateCartBadge === 'function') updateCartBadge();

        console.log('✅ Hiển thị dữ liệu cho xe:', car.name, '(ID=', carId, ')');
    }



    // Hàm thêm xe vào giỏ hàng
    function addToCart(car, carId) {
        // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Chuyển đổi giá từ chuỗi sang số (loại bỏ "$" và dấu phẩy)
        const priceValue = parseFloat(car.price.replace(/[$,]/g, ''));
        
        // Kiểm tra xem xe đã có trong giỏ hàng chưa
        const existingItem = cart.find(item => item.id === carId);
        
        if (existingItem) {
            // Nếu đã có, tăng số lượng
            existingItem.quantity += 1;
        } else {
            // Nếu chưa có, thêm mới
            cart.push({
                id: carId,
                name: car.name,
                price: priceValue, // Lưu dưới dạng số
                priceDisplay: car.price, // Lưu định dạng hiển thị
                image: car.images.main,
                quantity: 1
            });
        }
        
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Cập nhật số lượng hiển thị trên badge
        updateCartBadge();
        
        // Hiển thị thông báo thành công
        showToast('Đã thêm vào giỏ hàng!');
    }

    // Cập nhật số lượng sản phẩm hiển thị trên badge
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        const cartBadge = document.getElementById('cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            
            // Hiển thị/ẩn badge
            if (totalItems > 0) {
                cartBadge.style.display = 'inline-block';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    // Hiển thị thông báo toast
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.querySelector('.toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            // Ẩn toast sau 3 giây
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    // Hiển thị modal thanh toán
    function showCheckoutModal() {
        const modal = document.getElementById('checkout-modal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-modal');
        const confirmBtn = modal.querySelector('.btn.primary');
        const applyBtn = modal.querySelector('#apply-discount');
        const discountInput = modal.querySelector('#discount-code');
        const discountMsg = modal.querySelector('#discount-msg');
        const paymentRadios = modal.querySelectorAll('input[name="payment-method"]');

        let appliedDiscount = 0;
        let selectedPayment = null;

        // reset modal state
        discountInput.value = '';
        discountMsg.textContent = '';
        confirmBtn.disabled = true;
        appliedDiscount = 0;
        selectedPayment = null;
        paymentRadios.forEach(r => r.checked = false);

        modal.style.display = 'block';

        // đóng modal
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };

        // Đóng khi click ra ngoài
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        // Áp dụng mã giảm giá (giả lập)
        applyBtn.onclick = function () {
            const code = (discountInput.value || '').trim().toUpperCase();
            if (!code) {
                discountMsg.textContent = 'Vui lòng nhập mã giảm giá.';
                discountMsg.classList.remove('success');
                return;
            }

            // Các mã mẫu
            const discounts = {
                'ELITE10': 10,
                'VIP50': 50,
                'WELCOME5': 5
            };

            if (discounts[code]) {
                appliedDiscount = discounts[code];
                discountMsg.textContent = `Mã hợp lệ — Giảm ${appliedDiscount}%`;
                discountMsg.classList.add('success');
            } else {
                appliedDiscount = 0;
                discountMsg.textContent = 'Mã không hợp lệ.';
                discountMsg.classList.remove('success');
            }
        };

        // Chọn phương thức thanh toán
        paymentRadios.forEach(radio => {
            radio.onchange = function () {
                if (this.checked) {
                    selectedPayment = this.value;
                    confirmBtn.disabled = false;
                }
            };
        });

        // Xác nhận thanh toán
        confirmBtn.onclick = function () {
            if (!selectedPayment) {
                // an extra guard
                alert('Vui lòng chọn phương thức thanh toán.');
                return;
            }

            modal.style.display = 'none';

            const discountText = appliedDiscount ? ` (Áp dụng giảm ${appliedDiscount}%)` : '';
            showToast(`Đơn hàng đã được gửi thành công! Phương thức: ${selectedPayment}${discountText}`);
        };
    }
    
    // Xử lý sự kiện click vào thumbnail để đổi ảnh chính
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Cập nhật trạng thái active
            thumbnails.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Cập nhật ảnh chính
            const mainImage = document.getElementById('car-main-image');
            mainImage.src = this.dataset.image;
        });
    });
    
    const shareBtn = document.getElementById('share-button');
    const sharePopup = document.getElementById('share-popup');

    if (shareBtn && sharePopup) {
        shareBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = sharePopup.classList.contains('show');
            if (isOpen) {
                sharePopup.classList.remove('show');
                shareBtn.setAttribute('aria-expanded', 'false');
            } else {
                sharePopup.classList.add('show');
                shareBtn.setAttribute('aria-expanded', 'true');
                setupShareOptions(carId, carsData);
            }
        });

        // đóng khi click ngoài
        document.addEventListener('click', function (e) {
            if (!sharePopup.contains(e.target) && !shareBtn.contains(e.target)) {
                sharePopup.classList.remove('show');
                shareBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // đóng với Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                sharePopup.classList.remove('show');
                shareBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    // Thiết lập sự kiện cho các nút sau khi hiển thị chi tiết xe
    displayCarDetails(carId);

    // Cập nhật số lượng sản phẩm hiển thị khi trang được tải
    updateCartBadge();
});

// Hàm để thiết lập share options - chia sẻ link car-details hiện tại
function setupShareOptions(carId, carsData) {
    const car = carsData[carId];
    if (!car) return;

    // Link của car-details page hiện tại
    const currentPageUrl = window.location.href;
    const carName = car.name;
    const carPrice = car.price;

    const sharePopup = document.getElementById('share-popup');
    if (!sharePopup) return;

    const shareOptions = sharePopup.querySelectorAll('.share-option');
    
    // Facebook Share
    if (shareOptions[0]) {
        shareOptions[0].onclick = () => {
            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}&quote=${encodeURIComponent(`Xem ${carName} - ${carPrice} trên Elite HyperCars`)}`;
            window.open(facebookShareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
        };
    }
    
    // Twitter Share
    if (shareOptions[1]) {
        shareOptions[1].onclick = () => {
            const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(`Xem ${carName} - ${carPrice} trên Elite HyperCars`)}`;
            window.open(twitterShareUrl, '_blank', 'width=600,height=300,noopener,noreferrer');
        };
    }
    
    // WhatsApp Share
    if (shareOptions[2]) {
        shareOptions[2].onclick = () => {
            const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Xem ${carName} - ${carPrice} trên Elite HyperCars: ${currentPageUrl}`)}`;
            window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer');
        };
    }
    
    // Copy Link (thay thế LinkedIn)
    if (shareOptions[3]) {
        shareOptions[3].onclick = () => {
            navigator.clipboard.writeText(currentPageUrl).then(() => {
                alert('Link đã được sao chép vào clipboard!');
            }).catch(() => {
                prompt('Sao chép link này:', currentPageUrl);
            });
        };
    }
}