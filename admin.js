// بيانات الدخول (يمكن تعديلها)
let adminCredentials = {
    username: "admin",
    password: "admin123"
};

// بيانات المنتجات
let products = [
    {
        id: 1,
        name: "منتج تجريبي",
        price: 100,
        quantity: 10,
        outOfStock: false
    }
];

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
    
    // إعداد قسم المنتجات
    setupProductsSection();
    
    // عرض المنتجات
    displayProducts();
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

// إعداد قسم المنتجات
function setupProductsSection() {
    // زر إنشاء منتج جديد
    document.getElementById('addProductForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const quantity = document.getElementById('productQuantity').value;
        
        if(name && price && quantity) {
            addProduct(name, price, quantity);
            this.reset();
            document.getElementById('productForm').style.display = 'none';
        }
    });
}

// عرض نموذج إضافة منتج
function showProductForm() {
    document.getElementById('productForm').style.display = 'block';
}

// إضافة منتج جديد
function addProduct(name, price, quantity) {
    const newProduct = {
        id: Date.now(),
        name,
        price,
        quantity,
        outOfStock: false
    };
    
    products.push(newProduct);
    displayProducts();
}

// عرض المنتجات
function displayProducts() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.style.background = '#f5f5f5';
        productItem.style.padding = '15px';
        productItem.style.borderRadius = '8px';
        productItem.style.marginBottom = '10px';
        
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>السعر: ${product.price} ر.س</p>
            <p>${product.outOfStock ? 'نفذت الكمية' : `الكمية المتوفرة: ${product.quantity}`}</p>
            <div class="product-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})">تعديل</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">حذف</button>
                <button class="stock-btn" onclick="toggleStock(${product.id})">
                    ${product.outOfStock ? 'إعادة التوفير' : 'نفاد الكمية'}
                </button>
            </div>
        `;
        
        productsList.appendChild(productItem);
    });
}

// تعديل المنتج
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if(product) {
        const newName = prompt('اسم المنتج:', product.name);
        const newPrice = prompt('السعر:', product.price);
        const newQuantity = prompt('الكمية:', product.quantity);
        
        if(newName) product.name = newName;
        if(newPrice) product.price = newPrice;
        if(newQuantity) product.quantity = newQuantity;
        
        displayProducts();
    }
}

// حذف المنتج
function deleteProduct(productId) {
    if(confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== productId);
        displayProducts();
    }
}

// تبديل حالة التوفر
function toggleStock(productId) {
    const product = products.find(p => p.id === productId);
    if(product) {
        product.outOfStock = !product.outOfStock;
        displayProducts();
    }
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
