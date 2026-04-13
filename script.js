let currentImages = [];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-lightbox");

    // استهداف جميع المشاريع
    const projects = document.querySelectorAll(".project-item");

    projects.forEach(project => {
        // جمع جميع الصور داخل المشروع (الشعار + صور العرض)
        const images = project.querySelectorAll("img");
        
        images.forEach((img, index) => {
            img.addEventListener("click", () => {
                // حفظ صور المشروع الحالي في المصفوفة للتنقل بينها
                currentImages = Array.from(images);
                currentIndex = index;
                
                // عرض النافذة والصورة المحددة
                lightbox.style.display = "block";
                lightboxImg.src = currentImages[currentIndex].src;
            });
        });
    });

    // إغلاق النافذة عند الضغط على زر الإغلاق
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // إغلاق النافذة عند الضغط في أي مساحة فارغة حول الصورة
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});

// وظيفة التنقل بين الصور (التالي والسابق)
function changeImage(direction) {
    currentIndex += direction;
    
    // للعودة للبداية إذا تجاوزنا النهاية، والعكس
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    
    document.getElementById("lightbox-img").src = currentImages[currentIndex].src;
}

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const currentTheme = localStorage.getItem("theme");

// التحقق من وجود اختيار سابق للمستخدم
if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    
    if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeIcon.textContent = "🌙";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeIcon.textContent = "☀️";
    }
});

