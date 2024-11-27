// Array to store cart items
let cart = [];
let orders = []; // Array to store placed orders

// Function to show a specific page based on the page name
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // If we're on the cart page, update the cart items
    if (pageName === 'cart') {
        updateCart();
    }
    // If we're on the orders page, display orders
    if (pageName === 'orders') {
        displayOrders();
    }
}

// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    // Add item to the cart array
    cart.push({ name: itemName, price: itemPrice, image: itemImage });
    alert(itemName + ' added to the cart!');

    // If we're on the cart page, update the cart items immediately
    if (document.getElementById('cart').style.display !== 'none') {
        updateCart();
    }

    // Update cart count in the navbar
    updateCartNav();
}

// Function to remove an item from the cart
function removeFromCart(itemIndex) {
    // Remove item from the cart based on index
    cart.splice(itemIndex, 1);
    
    // Update the cart display
    updateCart();

    // Update the cart count in the navbar
    updateCartNav();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear current cart items display

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('proceed-to-payment').style.display = 'none';
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price;
        });

        // Append the total price and the proceed to payment button
        const totalElement = document.createElement('div');
        totalElement.innerHTML = `<hr><p><strong>Total: $${total.toFixed(2)}</strong></p>`;
        cartItemsContainer.appendChild(totalElement);
        
        document.getElementById('proceed-to-payment').style.display = 'block';
    }
}

// Function to handle the "Proceed to Payment" button
function showPaymentPage() {
    if (cart.length === 0) {
        alert('No items in cart for payment!');
        return;
    }
    showPage('payment');
}

// Handle payment form submission
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const atmNo = document.getElementById('atm-no').value;
    const cvv = document.getElementById('cvv').value;
    const expiryDate = document.getElementById('expiry-date').value;
    
    if (atmNo && cvv && expiryDate) {
        alert('Payment Successful!');
        
        // Move cart items to orders with "In Transit" status
        cart.forEach(item => {
            orders.push({ ...item, status: 'In Transit' });
        });

        // Empty the cart after payment
        cart = [];
        showPage('orders');
        updateCartNav(); // Update navbar cart count
    } else {
        alert('Please fill out all fields!');
    }
});

// Function to display the orders after payment
function displayOrders() {
    const ordersContainer = document.getElementById('orders-list');
    ordersContainer.innerHTML = ''; // Clear current order display

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>No orders placed yet.</p>';
    } else {
        orders.forEach(order => {
            const orderItemElement = document.createElement('div');
            orderItemElement.classList.add('order-item');
            orderItemElement.innerHTML = `
                <img src="${order.image}" alt="${order.name}" style="width: 100px; height: 100px;">
                <p>${order.name} - $${order.price.toFixed(2)}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            `;
            ordersContainer.appendChild(orderItemElement);
        });
    }
}

// Update the cart count in the navbar (for example, next to a cart icon)
function updateCartNav() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length; // Update the number of items in the cart
}

// Function to toggle the FAQ answer visibility
function toggleAnswer(answerId) {
    const answerElement = document.getElementById('answer-' + answerId);
    if (answerElement.style.display === 'none') {
        answerElement.style.display = 'block';
    } else {
        answerElement.style.display = 'none';
    }
}

// Initial page load setup - Show Home Page by default
window.onload = function() {
    showPage('home');
};
