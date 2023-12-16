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
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item-card";
    cartItemDiv.innerHTML = `
          <div class="d-flex justify-content-between align-items-center">
              <div>
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.location}</p>
              </div>
              <div>
                  <p class="card-text">${item.currency} ${item.price.toFixed(
      2
    )}</p>
                  <button class="btn remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
              </div>
          </div>
      `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Load cart summary
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = `
      <h4>Total:</h4>
      <p class="cart-total">${total.toFixed(2)}</p>
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
