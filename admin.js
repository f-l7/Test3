// بيانات الدخول (يمكنك تعديلها)
const adminCredentials = {
    username: "admin",
    password: "admin123"
};

// التحقق من تسجيل الدخول
// تأكد من وجود هذا الكود في بداية الملف
if(localStorage.getItem('isAdmin') !== 'true') {
    window.location.href = 'login.html';
}

// دالة تسجيل الخروج
function logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('loginTime');
    window.location.href = 'login.html';
}

// عرض المنتجات في لوحة التحكم
function displayAdminProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const adminProductsList = document.getElementById('adminProductsList');
    
    adminProductsList.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">السعر: ${product.price} ر.س</p>
            <p class="${product.outOfStock ? 'out-of-stock' : 'quantity'}">
                ${product.outOfStock ? 'نفذت الكمية' : `الكمية المتاحة: ${product.quantity}`}
            </p>
            <div class="controls">
                <button onclick="deleteProduct(${index})" class="delete-btn">حذف المنتج</button>
                <button onclick="editProduct(${index})" class="edit-btn">تعديل المنتج</button>
                <button onclick="toggleStock(${index})" class="stock-btn">
                    ${product.outOfStock ? 'إعادة التوفير' : 'نفاد الكمية'}
                </button>
            </div>
        `;
        adminProductsList.appendChild(productCard);
    });
}

// إضافة منتج جديد
document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProduct = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDesc').value,
        image: document.getElementById('productImage').value,
        price: document.getElementById('productPrice').value,
        quantity: document.getElementById('productQuantity').value,
        outOfStock: false
    };
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    this.reset();
    displayAdminProducts();
    alert('تم إضافة المنتج بنجاح');
});

// حذف المنتج
function deleteProduct(index) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayAdminProducts();
    }
}

// تعديل المنتج
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    const newName = prompt('اسم المنتج:', product.name);
    const newDesc = prompt('وصف المنتج:', product.description);
    const newImage = prompt('رابط صورة المنتج:', product.image);
    const newPrice = prompt('السعر:', product.price);
    const newQuantity = prompt('الكمية:', product.quantity);
    
    if (newName) product.name = newName;
    if (newDesc) product.description = newDesc;
    if (newImage) product.image = newImage;
    if (newPrice) product.price = newPrice;
    if (newQuantity) product.quantity = newQuantity;
    
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
}

// تبديل حالة التوفر
function toggleStock(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].outOfStock = !products[index].outOfStock;
    localStorage.setItem('products', JSON.stringify(products));
    displayAdminProducts();
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'login.html';
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayAdminProducts();
});
