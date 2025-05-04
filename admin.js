// بيانات الدخول القابلة للتعديل
const adminCredentials = {
    username: "admin", // يمكنك تغيير اسم المستخدم هنا
    password: "admin123" // يمكنك تغيير كلمة المرور هنا
};

// التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }

    // عرض اسم المستخدم في لوحة التحكم (اختياري)
    const usernameDisplay = document.getElementById('adminUsername');
    if (usernameDisplay) {
        usernameDisplay.textContent = adminCredentials.username;
    }
});

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// دالة لتغيير بيانات الدخول (يمكن استدعاؤها من واجهة الإعدادات)
function updateAdminCredentials(newUsername, newPassword) {
    if (newUsername && newPassword) {
        adminCredentials.username = newUsername;
        adminCredentials.password = newPassword;
        return true;
    }
    return false;
}

// دالة التحقق من صحة الدخول (تستخدم في login.html)
function validateLogin(username, password) {
    return username === adminCredentials.username && password === adminCredentials.password;
}

// تصدير الدوال للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        adminCredentials,
        validateLogin,
        updateAdminCredentials
    };
}
