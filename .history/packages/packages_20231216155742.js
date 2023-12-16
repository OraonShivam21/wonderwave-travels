let allPackages = [];
const itemsPerPage = 6;
let currentPage = 1;

function fetchPackages() {
  fetch("https://wonderwave-api.onrender.com/packages")
    .then((response) => response.json())
    .then((data) => {
      allPackages = data;
      displayPackages(currentPage);
    })
    .catch((error) => console.error("Error fetching packages:", error));
}

function displayPackages(page, packages = allPackages) {
  const container = document.getElementById("packages-container");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedPackages = packages.slice(start, end);

  paginatedPackages.forEach((pkg) => {
    const card = createPackageCard(pkg);
    container.appendChild(card);
  });

  setupPagination(packages.length, itemsPerPage);
}

function createPackageCard(packageData) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-md-4 mb-4";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100 package-card";

  const activitiesList = packageData.activities
    .map((activity) => `<li>${activity}</li>`)
    .join("");

  cardDiv.innerHTML = `
        <img src="${packageData.image}" class="card-img-top" alt="${packageData.title}">
        <div class="card-body">
            <h5 class="card-title">${packageData.title}</h5>
            <p class="card-text">${packageData.description}</p>
            <p><strong>Destination:</strong> ${packageData.destination}</p>
            <p><strong>Duration:</strong> ${packageData.duration} days</p>
            <p><strong>Price:</strong> ${packageData.price} ${packageData.currency}</p>
            <p><strong>Accommodation:</strong> ${packageData.accomodation}</p>
            <p><strong>Transportation:</strong> ${packageData.transportation}</p>
            <p><strong>Meals:</strong> ${packageData.meals}</p>
            <p><strong>Activities:</strong><ul>${activitiesList}</ul></p>
        </div>
    `;

  colDiv.appendChild(cardDiv);

  const buyButton = document.createElement("button");
  buyButton.className = "btn btn-primary mt-2";
  buyButton.innerText = "Buy Package";
  buyButton.onclick = () => {
    console.log("Buy Package clicked");
    addToCart(packageData);
  };

  cardDiv.appendChild(buyButton);

  return colDiv;
}
function addToCart(packageData) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(packageData);
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Adding to cart:", packageData);
  showToast("Added to cart!");
}

function showToast(message) {
  console.log("showToast called"); // Add for debugging

  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    createToastContainer();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.minWidth = "250px";
  toast.innerHTML = `
        <div class="toast-body bg-success text-white">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;

  document.getElementById("toast-container").appendChild(toast);

  $(toast).toast({ delay: 5000 }); // Adjust delay to 5 seconds (5000 milliseconds)
  $(toast).toast("show");
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.style.position = "fixed";
  container.style.top = "10px";
  container.style.right = "10px";
  container.style.zIndex = "9999";
  document.body.appendChild(container);
}

function setupPagination(totalItems, itemsPerPage) {
  const paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = "";
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = "page-item";
    const pageLink = document.createElement("a");
    pageLink.className = "page-link";
    pageLink.href = "#";
    pageLink.innerText = i;
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      displayPackages(i);
    });

    pageItem.appendChild(pageLink);
    paginationControls.appendChild(pageItem);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchPackages();
  createToastContainer();

  document
    .getElementById("apply-filters")
    .addEventListener("click", function () {
      const filteredAndSortedPackages = filterAndSortPackages();
      displayPackages(1, filteredAndSortedPackages); // Reset to page 1 after filtering
    });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;
}

function filterAndSortPackages() {
  const locationFilter = document
    .getElementById("location-filter")
    .value.toLowerCase();
  const durationSortOption = document.getElementById("duration-sort").value;
  const priceSortOption = document.getElementById("price-sort").value;

  let filteredPackages = allPackages;

  // Filter by location
  if (locationFilter) {
    filteredPackages = filteredPackages.filter((pkg) =>
      pkg.destination.toLowerCase().includes(locationFilter)
    );
  }

  // Sort by duration
  if (durationSortOption !== "default") {
    filteredPackages.sort((a, b) => {
      return durationSortOption === "asc"
        ? a.duration - b.duration
        : b.duration - a.duration;
    });
  }

  // Sort by price
  if (priceSortOption !== "default") {
    filteredPackages.sort((a, b) => {
      return priceSortOption === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  return filteredPackages;
}
