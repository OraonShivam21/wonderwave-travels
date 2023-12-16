document.addEventListener("DOMContentLoaded", function () {
  loadCartItems();
  document.getElementById("clear-cart").addEventListener("click", clearCart);
});

function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear the container

  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;
    const cartItemCard = document.createElement("div");
    cartItemCard.className = "col-12 col-md-6 col-lg-4 mb-3";
    cartItemCard.innerHTML = `
          <div class="card cart-item-card">
              <img src="${item.image}" class="card-img-top" alt="${item.title}">
              <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                  <div class="btn-group" role="group" aria-label="Cart Actions">
                      <button class="btn btn-outline-secondary btn-sm">-</button>
                      <button class="btn btn-outline-secondary btn-sm">+</button>
                      <button class="btn btn-danger btn-sm remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
                  </div>
              </div>
          </div>
      `;
    cartItemsContainer.appendChild(cartItemCard);
  });

  // Load cart summary
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = `
      <div class="col-md-4 cart-summary">
          <h4>Total: ${total.toFixed(2)}</h4>
          <button class="btn checkout-btn">Checkout</button>
      </div>
  `;
}

function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCartItems(); // Refresh the cart items display
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  loadCartItems(); // Refresh the cart items display
}
