async function loadProducts() {
  const data = await apiRequest("/products");

  const container = document.getElementById("products");
  container.innerHTML = "";

  if (!data.success) {
    container.innerHTML = "<p>Failed to load products</p>";
    return;
  }

  data.object.products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <a href="product.html?id=${product.id}">View Details</a>
    `;

    container.appendChild(div);
  });
}

loadProducts();
