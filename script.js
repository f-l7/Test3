// بيانات الدفع (يمكنك تعديلها)
const paymentMethods = {
    "راجحي": "SA0380000000608010167879",
    "بايبال": "https://paypal.me/technobox",
    "ابل باي": "technobox@applepay.com"
};

// تأكد من أن المستخدم مسجل الدخول عند زيارة admin.html
function checkAdminAuth() {
    if(window.location.pathname.includes('admin.html')) {
        if(localStorage.getItem('adminLoggedIn') !== 'true') {
            window.location.href = 'login.html';
        }
    }
}

// استدعاء الدالة عند تحميل الصفحة
window.addEventListener('load', checkAdminAuth);
// عرض المنتجات
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productsList = document.getElementById('productsList');
    
    productsList.innerHTML = '';
    
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
            <button onclick="orderProduct(${index})" class="order-btn" ${product.outOfStock ? 'disabled' : ''}>
                ${product.outOfStock ? 'نفذت الكمية' : 'الطلب الآن'}
            </button>
        `;
        productsList.appendChild(productCard);
    });
}

// طلب المنتج
function orderProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    const paymentMethod = prompt(`اختر طريقة الدفع:\n${Object.keys(paymentMethods).join('\n')}`);
    
    if (paymentMethod && paymentMethods[paymentMethod]) {
        alert(`تم طلب المنتج بنجاح!\n\nاسم المنتج: ${product.name}\nالسعر: ${product.price} ر.س\nطريقة الدفع: ${paymentMethod}\n\n${paymentMethod === 'راجحي' ? 'رقم الحساب: ' + paymentMethods[paymentMethod] : 'الرابط: ' + paymentMethods[paymentMethod]}\n\nيرجى تصوير هذه الرسالة وإرسالها للدعم الفني`);
        
        // تحديث الكمية
        if (!product.outOfStock) {
            product.quantity -= 1;
            if (product.quantity <= 0) {
                product.outOfStock = true;
            }
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();
        }
    } else {
        alert('طريقة الدفع غير صالحة');
    }
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
});
