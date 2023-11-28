document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.getElementById("products");
    const cartContainer = document.getElementById("cart");
    const cartItems = [];

    // JSON data
    const jsonData = [
        {
            "id": "1",
            "nombre": "Macbook air",
            "img": "../assets/macbook-air.png",
            "tipo": "Notebook",
            "cantidad": 1,
            "precio": 979000
        },
        {
            "id": "2",
            "titulo": "Galaxy Book 3",
            "imagen": "../assets/galaxy-book.jpg",
            "tipo": "Notebook",
            "cantidad": 1,
            "precio": 824999
        },
        {
            "id": "3",
            "titulo": "Iphone 15",
            "imagen": "../assets/iphone-15.png",
            "tipo": "Celular",
            "precio": 1380000
        },
        {
            "id": "4",
            "titulo": "Redmi Note 12 Pro",
            "imagen": "../assets/redmi-note.jpg",
            "tipo": "Celular",
            "precio": 418999
        },
        {
            "id": "5",
            "titulo": "Play Station 5",
            "imagen": "../assets/ps5.png",
            "tipo": "Consola",
            "cantidad": 1,
            "precio": 1293999
        },
        {
            "id": "6",
            "titulo": "Nintendo Switch",
            "imagen": "../assets/Nintendo-Switch.png",
            "tipo": "Consola",
            "cantidad": 1,
            "precio": 699999
        }
    ];

   // Render products
   function renderProducts() {
    productsContainer.innerHTML = "";
    jsonData.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.img || product.imagen}" alt="${product.nombre || product.titulo}">
            <div class="product-info">
                <h3>${product.nombre || product.titulo}</h3>
                <p>${product.tipo || product.categoria.nombre}</p>
                <p>Precio: $${product.precio}</p>
                <button class="btn button-style" onclick="addToCart('${product.id}', '${product.nombre || product.titulo}', ${product.precio})">Agregar</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";
    const itemQuantities = {};

    cartItems.forEach(item => {
        if (item.id in itemQuantities) {
            itemQuantities[item.id]++;
        } else {
            itemQuantities[item.id] = 1;
        }
    });

    if (cartItems.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "You don't have any products added to the cart.";
        cartContainer.appendChild(emptyCartMessage);
    } else {
        for (const itemId in itemQuantities) {
            if (itemQuantities.hasOwnProperty(itemId)) {
                const quantity = itemQuantities[itemId];
                const product = jsonData.find(p => p.id === itemId);

                if (product) {
                    const cartItemElement = document.createElement("div");
                    cartItemElement.classList.add("cart-item");
                    cartItemElement.innerHTML = `
                        <p>${product.nombre || product.titulo} x ${quantity} - $${product.precio * quantity}
                            <button class="btn button-style" onclick="removeItem('${itemId}')">Remove</button>
                        </p>
                    `;
                    cartContainer.appendChild(cartItemElement);
                } else {
                    console.error(`Product with ID ${itemId} not found in JSON data.`);
                }
            }
        }
    }
}

// Remove a specific item from cart
window.removeItem = function(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        renderCart();
        updateCartItemCount();
    }
};

// Add product to cart
window.addToCart = function(id, title, price) {
    const item = { id, title, price };
    cartItems.push(item);
    renderCart();
    updateCartItemCount();
};

// Modal functions
window.openCartModal = function() {
    const modal = document.getElementById("cartModal");
    modal.style.display = "block";
};

window.closeCartModal = function() {
    const modal = document.getElementById("cartModal");
    modal.style.display = "none";
};

// Update cart item count in the header
function updateCartItemCount() {
    const cartItemCountElement = document.getElementById("cartItemCount");
    cartItemCountElement.textContent = cartItems.length.toString();
}

// Remove all items from cart
window.removeAllItems = function() {
    cartItems.length = 0;
    renderCart();
    updateCartItemCount();
};

// Continue buying
window.continueBuying = function() {
    closeCartModal();
};

// Initial render
renderProducts();
});