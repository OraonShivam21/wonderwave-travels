document.addEventListener("DOMContentLoaded", function () {
  loadCartItems();
  const clearCartButton = document.getElementById("clear-cart");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  } else {
    console.error("Clear cart button not found");
  }
});

function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) {
    console.error("Cart items container not found");
    return;
  }
  cartItemsContainer.innerHTML = ""; // Clear the container

  let total = 0;
  cartItems.forEach((item, index) => {
    // Ensure item.price is a number
    const price = parseFloat(item.price);
    total += price;

    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item-card";
    cartItemDiv.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">${item.destination}</p>
        </div>
        <div>
          <p class="card-text">${item.currency} ${price.toFixed(2)}</p>
          <button class="btn remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Load cart summary
  updateCartSummary(total);
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

function updateCartSummary(total) {
  const cartSummary = document.getElementById("cart-summary");
  if (cartSummary) {
    cartSummary.innerHTML = `
      <h4>Total:</h4>
      <p class="cart-total">${total.toFixed(2)}</p>
    `;
  } else {
    console.error("Cart summary element not found");
  }
}
