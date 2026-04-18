// Cart management - runs on all pages
(function() {
    // Initialize cart from localStorage
    function getCart() {
        const cart = localStorage.getItem('fureverCart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem('fureverCart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = count;
        });
    }

    // Add to cart
    window.addToCart = function(product) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        saveCart(cart);
        showNotification(`${product.name} added to cart!`);
    }

    // Remove from cart
    window.removeFromCart = function(productId) {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart);
    }

    // Update quantity
    window.updateQuantity = function(productId, quantity) {
        const cart = getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = quantity;
                saveCart(cart);
            }
        }
    }

    // Get cart
    window.getCart = getCart;

    // Clear cart
    window.clearCart = function() {
        localStorage.removeItem('fureverCart');
        updateCartCount();
    }

    // Simple notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #e07856;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Update cart count on page load
    updateCartCount();
})();