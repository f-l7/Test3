document.addEventListener('DOMContentLoaded', function() {
    const productsList = document.getElementById('productsList');
    
    // جلب المنتجات من localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // عرض المنتجات
    function displayProducts() {
        productsList.innerHTML = '';
        
        products.forEach((product, index) => {
            if (product.quantity > 0) {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">السعر: ${product.price} ر.س</p>
                    <p class="quantity">الكمية المتاحة: ${product.quantity}</p>
                    ${product.outOfStock ? '<p class="out-of-stock">نفاد الكمية</p>' : ''}
                    <button onclick="orderProduct(${index})" class="btn">طلب المنتج</button>
                `;
                productsList.appendChild(productCard);
            }
        });
    }
    
    displayProducts();
});

// دالة طلب المنتج
function orderProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    if (product.outOfStock || product.quantity <= 0) {
        alert('هذا المنتج غير متوفر حالياً');
        return;
    }
    
    const paymentMethod = prompt('اختر طريقة الدفع: راجحي، بايبال، ابل باي');
    if (paymentMethod && ['راجحي', 'بايبال', 'ابل باي'].includes(paymentMethod)) {
        alert(`تم طلب المنتج بنجاح\nيرجى تصوير هذه الرسالة وفتح تذكرة في سيرفر الدعم الفني\n\nاسم المنتج: ${product.name}\nطريقة الدفع: ${paymentMethod}`);
        
        // تخفيض الكمية
        product.quantity -= 1;
        if (product.quantity <= 0) {
            product.outOfStock = true;
        }
        localStorage.setItem('products', JSON.stringify(products));
        
        // إعادة تحميل الصفحة
        window.location.reload();
    } else {
        alert('طريقة الدفع غير صالحة');
    }
}
