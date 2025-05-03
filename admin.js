document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const adminProductsList = document.getElementById('adminProductsList');
    
    // جلب المنتجات من localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // عرض المنتجات في لوحة التحكم
    function displayAdminProducts() {
        adminProductsList.innerHTML = '';
        
        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">السعر: ${product.price} ر.س</p>
                <p class="quantity">الكمية المتاحة: ${product.quantity}</p>
                <div class="controls">
                    <button onclick="deleteProduct(${index})" class="btn delete-btn">حذف المنتج</button>
                    <button onclick="editProduct(${index})" class="btn edit-btn">تعديل المنتج</button>
                    <button onclick="toggleOutOfStock(${index})" class="btn stock-btn">
                        ${product.outOfStock ? 'إعادة التوفير' : 'نفاد الكمية'}
                    </button>
                </div>
            `;
            adminProductsList.appendChild(productCard);
        });
    }
    
    // إضافة منتج جديد
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newProduct = {
            name: document.getElementById('productName').value,
            description: document.getElementById('productDesc').value,
            price: document.getElementById('productPrice').value,
            quantity: document.getElementById('productQuantity').value,
            outOfStock: false
        };
        
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        
        productForm.reset();
        displayAdminProducts();
        alert('تم إضافة المنتج بنجاح');
    });
    
    displayAdminProducts();
});

// دالة حذف المنتج
function deleteProduct(index) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        window.location.reload();
    }
}

// دالة تعديل المنتج
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    const newName = prompt('اسم المنتج الجديد:', product.name);
    const newDesc = prompt('وصف المنتج الجديد:', product.description);
    const newPrice = prompt('السعر الجديد:', product.price);
    const newQuantity = prompt('الكمية الجديدة:', product.quantity);
    
    if (newName) product.name = newName;
    if (newDesc) product.description = newDesc;
    if (newPrice) product.price = newPrice;
    if (newQuantity) product.quantity = newQuantity;
    
    localStorage.setItem('products', JSON.stringify(products));
    window.location.reload();
}

// دالة تبديل حالة نفاد الكمية
function toggleOutOfStock(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].outOfStock = !products[index].outOfStock;
    localStorage.setItem('products', JSON.stringify(products));
    window.location.reload();
}
