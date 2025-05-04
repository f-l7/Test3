// بيانات الدخول (يمكن تعديلها)
let adminCredentials = {
    username: "admin",
    password: "admin123"
};

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من تسجيل الدخول
    if(localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    // إعداد القائمة الجانبية
    setupMenu();
    
    // إعداد نموذج تغيير البيانات
    setupCredentialsForm();
});

// إعداد القائمة الجانبية
function setupMenu() {
    const menuLinks = document.querySelectorAll('.admin-menu a');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة التنشيط من جميع الروابط
            menuLinks.forEach(l => l.classList.remove('active'));
            // إضافة التنشيط للرابط الحالي
            this.classList.add('active');
            
            // إخفاء جميع المحتويات
            contentSections.forEach(section => section.classList.remove('active'));
            // إظهار المحتوى المطلوب
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
}

// إعداد نموذج تغيير بيانات الدخول
function setupCredentialsForm() {
    const form = document.getElementById('credentialsForm');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            
            if(newUsername && newPassword) {
                adminCredentials.username = newUsername;
                adminCredentials.password = newPassword;
                alert('تم تحديث بيانات الدخول بنجاح');
                
                // يمكنك هنا إضافة حفظ البيانات في localStorage إذا أردت
                // localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
            } else {
                alert('الرجاء إدخال جميع البيانات');
            }
        });
    }
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// تصدير الدوال للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adminCredentials,
        validateLogin: function(username, password) {
            return username === adminCredentials.username && 
                   password === adminCredentials.password;
        },
        logout
    };
}
