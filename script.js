// =======================================================
// ==> PHẦN TÙY CHỈNH CỦA BẠN <==
// Thay đổi nội dung trong này để cá nhân hóa trang web
// =======================================================
const config = {
    // Thay tên file ảnh nền của bạn (phải nằm trong thư mục 'images')
    backgroundImage: "images/background.jpg",

    // Thay nội dung bức thư
    letterContent: "Gửi cô yêu quý! Nhân ngày 20/11, chúng em xin gửi tới cô lời cảm ơn chân thành nhất. Cảm ơn cô đã luôn là người truyền lửa, dìu dắt chúng em trên con đường chinh phục tri thức. Chúc cô luôn mạnh khỏe, hạnh phúc và thành công. Chúng em yêu cô rất nhiều!",

    // Thay tên file ảnh chính ở giữa trong Vòng Xoay Kỷ Niệm
    centerImage: "images/anh-trung-tam.png",

    // Thêm tên file các ảnh kỷ niệm sẽ bay xung quanh
    orbitImages: [
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


// Đợi cho toàn bộ trang được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', () => {
    // --- Lấy các phần tử DOM ---
    const background = document.getElementById('custom-background');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const letterScreen = document.getElementById('letter-screen');
    const animationScreen = document.getElementById('animation-screen');
    
    const openLetterBtn = document.getElementById('open-letter-btn');
    const startAnimationBtn = document.getElementById('start-animation-btn');

    const letterText = document.getElementById('letter-text');
    const centerCardImage = document.getElementById('center-card-image');
    
    let animationStarted = false;

    // --- Áp dụng tùy chỉnh ---
    function applyConfig() {
        background.style.backgroundImage = `url('${config.backgroundImage}')`;
        letterText.innerText = config.letterContent;
        centerCardImage.src = config.centerImage;
    }

    // --- Logic chuyển trang ---
    openLetterBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
    });

    startAnimationBtn.addEventListener('click', () => {
        letterScreen.classList.add('hidden');
        animationScreen.classList.remove('hidden');
        if (!animationStarted) {
            startFinalAnimation();
            animationStarted = true;
        }
    });

    // --- Logic cho Animation cuối cùng (Phần 4) ---
    function startFinalAnimation() {
        const container = animationScreen;
        let currentImageIndex = 0;

        function createOrbitingImage() {
            if (config.orbitImages.length === 0) return;

            const img = document.createElement('img');
            img.src = config.orbitImages[currentImageIndex];
            img.className = 'orbit-image';
            container.appendChild(img);

            currentImageIndex = (currentImageIndex + 1) % config.orbitImages.length;

            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * (window.innerWidth / 2 - 150) + 150;
            const speed = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
            const size = Math.random() * 50 + 80;
            img.style.width = `${size}px`;

            setTimeout(() => { img.style.opacity = '0.8'; }, 100);

            let currentAngle = angle;
            
            function updatePosition() {
                currentAngle += speed;
                const x = window.innerWidth / 2 + radius * Math.cos(currentAngle) - size / 2;
                const y = window.innerHeight / 2 + radius * 0.7 * Math.sin(currentAngle) - size / 2;
                img.style.transform = `translate(${x}px, ${y}px)`;
                img.style.zIndex = Math.round(1 + Math.sin(currentAngle));
            }
            
            const intervalId = setInterval(updatePosition, 1000 / 60);

            setTimeout(() => {
                img.style.opacity = '0';
                setTimeout(() => {
                    clearInterval(intervalId);
                    img.remove();
                }, 500);
            }, 7000);
        }
        
        setInterval(createOrbitingImage, 1000);

        function createHeart() {
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.className = 'heart';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 7}s`;
            container.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 10000);
        }
        
        setInterval(createHeart, 300);
    }

    // Khởi chạy
    applyConfig();
});
