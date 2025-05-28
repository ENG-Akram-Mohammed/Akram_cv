// حفظ تفضيل المستخدم للوضع المظلم/الفاتح
const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;

// التحقق من وجود تفضيل مسبق
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeSwitch.querySelector('i').classList.remove('fa-moon');
    themeSwitch.querySelector('i').classList.add('fa-sun');
}

// تبديل الوضع المظلم/الفاتح
themeSwitch.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeSwitch.querySelector('i').classList.remove('fa-moon');
        themeSwitch.querySelector('i').classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeSwitch.querySelector('i').classList.remove('fa-sun');
        themeSwitch.querySelector('i').classList.add('fa-moon');
        localStorage.setItem('darkMode', null);
    }
});

// إضافة تأثيرات التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// إضافة تأثيرات ظهور العناصر عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// تطبيق تأثيرات الظهور على العناصر
document.querySelectorAll('.skill-card, .timeline-item, .portfolio-item, .contact-item, .about-stats .stat-item').forEach(element => {
    element.classList.add('animate-hidden');
    observer.observe(element);
});

// تحريك شريط المهارات
const skillLevels = document.querySelectorAll('.skill-level .level');
skillLevels.forEach(level => {
    level.style.width = '0%';
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target;
            const targetWidth = level.style.getPropertyValue('--target-width') || level.getAttribute('data-width') || '0%';
            level.style.width = targetWidth;
        }
    });
}, observerOptions);

skillLevels.forEach(level => {
    skillObserver.observe(level);
});

// التحقق من صحة نموذج الاتصال
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // هنا يمكنك إضافة كود لإرسال النموذج إلى الخادم
        const formData = new FormData(this);
        
        // عرض رسالة نجاح (يمكن تعديلها حسب الحاجة)
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        this.reset();
    });
}

// تأثيرات التمرير في شريط التنقل
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // إضافة خلفية للشريط عند التمرير
    if (currentScroll > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    // إخفاء/إظهار الشريط عند التمرير
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScroll = currentScroll;
});

// تحريك النص في العنوان
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, speed);
};

// تطبيق تأثير الكتابة على العنوان الفرعي
const subtitle = document.querySelector('.bio');
if (subtitle) {
    window.addEventListener('load', () => {
        typeWriter(subtitle, subtitle.textContent);
    });
} 