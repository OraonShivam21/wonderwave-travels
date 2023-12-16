function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item, index) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-4 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card h-100";
    // Construct the card content with item details
    // Include a 'Remove from Cart' button
    cardDiv.innerHTML = `
            <img src="${item.image}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <!-- ... Other details ... -->
                <button class="btn btn-danger mt-2" onclick="removeFromCart(${index})">Remove from Cart</button>
            </div>
        `;

    colDiv.appendChild(cardDiv);
    cartItemsContainer.appendChild(colDiv);
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove item at the index
  localStorage.setItem("cart", JSON.stringify(cart));
  // Refresh cart display
  loadCartItems();
}

document.addEventListener("DOMContentLoaded", loadCartItems);
