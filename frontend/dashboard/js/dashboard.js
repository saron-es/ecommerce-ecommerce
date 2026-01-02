const token = localStorage.getItem("token");

// Redirect to login if not logged in
if (!token) {
  window.location.href = "../login.html";
}

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "../login.html";
});

// Helper to make API requests
async function apiRequest(endpoint, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };

  const res = await fetch(`http://localhost:5000${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  return await res.json();
}

// Fetch products
async function loadProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "Loading products...";

  const data = await apiRequest("/products");

  if (data.success && data.object.length > 0) {
    productsContainer.innerHTML = "";
    data.object.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <p>Stock: ${product.stock}</p>
      `;
      productsContainer.appendChild(card);
    });
  } else {
    productsContainer.innerHTML = "<p>No products available.</p>";
  }
}

// Fetch user orders
async function loadOrders() {
  const ordersContainer = document.getElementById("orders");
  ordersContainer.innerHTML = "Loading orders...";

  const data = await apiRequest("/orders");

  if (data.success && data.object.length > 0) {
    ordersContainer.innerHTML = "";
    data.object.forEach(order => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>Order ID: ${order.id}</h3>
        <p>Status: ${order.status}</p>
        <p>Total: $${order.totalPrice}</p>
      `;
      ordersContainer.appendChild(card);
    });
  } else {
    ordersContainer.innerHTML = "<p>You have no orders yet.</p>";
  }
}

// Load data on page load
loadProducts();
loadOrders();
