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
    cartItemDiv.className = "col-12 cart-item";
    cartItemDiv.innerHTML = `
          <h5>${item.title}</h5>
          <p>Price: ${item.currency} ${item.price}</p>
          <button class="btn remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
    cartItemsContainer.appendChild(cartItemDiv);
  });

  // Load cart summary
  const cartSummary = document.getElementById("cart-summary");
  cartSummary.innerHTML = `
      <div class="col-md-4 offset-md-8 cart-total">
          <h4>Total: ${cartItems.reduce(
            (acc, item) => acc + item.price,
            0
          )} </h4>
          <button class="btn checkout-btn">Proceed to Payment</button>
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
