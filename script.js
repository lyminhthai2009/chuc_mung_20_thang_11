// =======================================================
// ==> PHẦN TÙY CHỈNH CỦA BẠN <==
// =======================================================
const config = {
    // Tên file ảnh bó hoa (trong thư mục 'images')
    flowerImage: "images/bouquet.png",

    // Tên file ảnh nền cho phần thư và phần animation
    backgroundImage: "images/background.jpg",

    // Nội dung bức thư
    letterContent: "Gửi cô yêu quý! Nhân ngày 20/11, chúng em xin gửi tới cô lời cảm ơn chân thành nhất. Cảm ơn cô đã luôn là người truyền lửa, dìu dắt chúng em trên con đường chinh phục tri thức. Chúc cô luôn mạnh khỏe, hạnh phúc và thành công. Chúng em yêu cô rất nhiều!",

    // Danh sách các ảnh kỷ niệm sẽ chạy ngang
    parallaxImages: [
        'images/ky-niem-1.jpg',
        'images/ky-niem-2.jpg',
        'images/ky-niem-3.jpg',
        'images/ky-niem-4.jpg',
        // Thêm các ảnh khác vào đây...
    ]
};
// =======================================================
// ==> KẾT THÚC PHẦN TÙY CHỈNH <==
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử DOM ---
    const background = document.getElementById('custom-background');
    
    const flowerScreen = document.getElementById('flower-screen');
    const letterScreen = document.getElementById('letter-screen');
    const animationScreen = document.getElementById('animation-screen');
    
    const flowerBouquet = document.getElementById('flower-bouquet');
    const startAnimationBtn = document.getElementById('start-animation-btn');

    const letterText = document.getElementById('letter-text');
    
    let animationStarted = false;

    // --- Áp dụng tùy chỉnh ---
    function applyConfig() {
        flowerBouquet.src = config.flowerImage;
        letterText.innerText = config.letterContent;
    }

    // --- Logic chuyển màn hình ---
    flowerBouquet.addEventListener('click', () => {
        // Chuyển nền và chuyển màn hình
        background.style.backgroundImage = `url('${config.backgroundImage}')`;
        flowerScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
    });

    startAnimationBtn.addEventListener('click', () => {
        letterScreen.classList.add('hidden');
        animationScreen.classList.remove('hidden');
        if (!animationStarted) {
            startParallaxAnimation();
            animationStarted = true;
        }
    });

    // --- Logic cho Animation Parallax Ngang ---
    function startParallaxAnimation() {
        const container = animationScreen;
        const imagesData = [];
        const numImages = config.parallaxImages.length > 0 ? 20 : 0; // Tạo 20 ảnh để lấp đầy màn hình

        // Tạo các đối tượng ảnh ban đầu
        for (let i = 0; i < numImages; i++) {
            const img = document.createElement('img');
            img.src = config.parallaxImages[i % config.parallaxImages.length];
            img.className = 'parallax-image';
            container.appendChild(img);

            const imageData = {
                element: img,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                z: Math.random() * 800 - 400, // -400 (xa) to 400 (gần)
            };
            imagesData.push(imageData);
        }

        function animate() {
            imagesData.forEach(imageData => {
                // Tốc độ phụ thuộc vào độ sâu Z (parallax effect)
                // Ảnh càng gần (Z > 0) đi càng nhanh
                const speed = 1.5 + (imageData.z / 400); 

                imageData.x -= speed;

                // Nếu ảnh đi ra khỏi màn hình bên trái, tái tạo lại ở bên phải
                if (imageData.x < -200) {
                    imageData.x = window.innerWidth + 200;
                    imageData.y = Math.random() * window.innerHeight;
                    imageData.z = Math.random() * 800 - 400;
                }

                // Cập nhật vị trí và kích thước bằng transform
                // translateZ để tạo hiệu ứng xa gần
                imageData.element.style.transform = `translate3d(${imageData.x}px, ${imageData.y}px, ${imageData.z}px)`;
            });

            requestAnimationFrame(animate);
        }

        if (numImages > 0) {
            animate();
        }
    }

    // Khởi chạy
    applyConfig();
});
