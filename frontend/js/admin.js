async function createProduct() {
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
    category: document.getElementById("category").value,
  };

  const data = await apiRequest("/products", "POST", product, true);

  if (data.success) {
    alert("Product created successfully");
  } else {
    alert(data.message || "Failed to create product");
  }
}
