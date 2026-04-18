// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    const orderSuccess = document.getElementById('orderSuccess');
    const backToShipping = document.getElementById('backToShipping');
    
    const checkoutStep1 = document.getElementById('checkoutStep1');
    const checkoutStep2 = document.getElementById('checkoutStep2');
    
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const successTotal = document.getElementById('successTotal');

    // Render cart summary
    function renderOrderSummary() {
        const cart = getCart();
        
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <div class="checkout-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="checkout-item-details">
                    <p>${item.name}</p>
                    <p class="item-meta">Qty: ${item.quantity}</p>
                </div>
                <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `).join('');

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        checkoutSubtotal.textContent = '$' + totalAmount.toFixed(2);
        checkoutTotal.textContent = '$' + totalAmount.toFixed(2);
        successTotal.textContent = '$' + totalAmount.toFixed(2);
    }

    // Handle shipping form
    shippingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide shipping form, show payment form
        shippingForm.style.display = 'none';
        paymentForm.style.display = 'block';
        
        // Update steps
        checkoutStep1.classList.remove('active');
        checkoutStep2.classList.add('active');
    });

    // Back to shipping
    backToShipping.addEventListener('click', function() {
        paymentForm.style.display = 'none';
        shippingForm.style.display = 'block';
        
        checkoutStep2.classList.remove('active');
        checkoutStep1.classList.add('active');
    });

    // Handle payment form
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide payment form, show success
        paymentForm.style.display = 'none';
        orderSuccess.style.display = 'block';
        
        // Clear cart
        clearCart();
    });

    renderOrderSummary();
});