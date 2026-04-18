// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    const emptyCart = document.getElementById('emptyCart');
    const cartWithItems = document.getElementById('cartWithItems');
    const cartItems = document.getElementById('cartItems');
    const cartItemCount = document.getElementById('cartItemCount');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');

    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            emptyCart.style.display = 'block';
            cartWithItems.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartWithItems.style.display = 'grid';

        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCount.textContent = `${itemCount} ${itemCount === 1 ? 'item' : 'items'} ready for checkout`;

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p>Size: ${item.size || 'L'}</p>
                            ${item.style ? `<p>Style: ${item.style}</p>` : ''}
                        </div>
                        <button class="remove-btn" onclick="removeItem('${item.id}')">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="cart-item-footer">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `).join('');

        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        subtotal.textContent = '$' + totalAmount.toFixed(2);
        total.textContent = '$' + totalAmount.toFixed(2);
    }

    window.removeItem = function(id) {
        removeFromCart(id);
        renderCart();
    }

    window.updateItemQuantity = function(id, quantity) {
        updateQuantity(id, quantity);
        renderCart();
    }

    renderCart();
});