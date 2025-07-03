document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "Laptop", price: 999, category: "electronics", description: "High-performance laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg0MTZ8&ixlib=rb-4.0.3&q=85" },
    { name: "Phone", price: 699, category: "electronics", description: "Latest smartphone model", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg0NjR8&ixlib=rb-4.0.3&q=85" },
    { name: "Table", price: 299, category: "furniture", description: "Stylish wooden table", image: "https://images.unsplash.com/photo-1573104049264-5324ea0027d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg1MTZ8&ixlib=rb-4.0.3&q=85" },
    { name: "Chair", price: 99, category: "furniture", description: "Comfortable office chair", image: "https://images.unsplash.com/photo-1622880355742-af182a61b362?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg1NTN8&ixlib=rb-4.0.3&q=85" },
    { name: "Shirt", price: 49, category: "clothing", description: "Casual cotton shirt", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg1OTN8&ixlib=rb-4.0.3&q=85" },
    { name: "Jeans", price: 69, category: "clothing", description: "Classic denim jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg2MzZ8&ixlib=rb-4.0.3&q=85" },
    { name: "Headphones", price: 149, category: "electronics", description: "Wireless headphones with noise cancellation", image: "https://images.unsplash.com/photo-1599669454515-1b2e0173f302?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg2NjZ8&ixlib=rb-4.0.3&q=85" },
    { name: "Sofa", price: 799, category: "furniture", description: "Luxurious leather sofa", image: "https://images.unsplash.com/photo-1623353283172-2518d7e6f5ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg2OTJ8&ixlib=rb-4.0.3&q=85" },
    { name: "Dress", price: 79, category: "clothing", description: "Elegant evening dress", image: "https://images.unsplash.com/photo-1610209740880-6ecc4b20ea78?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg3NjR8&ixlib=rb-4.0.3&q=85" },
    { name: "Smartwatch", price: 199, category: "electronics", description: "Fitness tracking smartwatch", image: "https://images.unsplash.com/photo-1651563688824-a853587bfb2c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg3ODh8&ixlib=rb-4.0.3&q=85" },
    { name: "Desk", price: 149, category: "furniture", description: "Modern office desk", image: "https://images.unsplash.com/photo-1559582284-9e0e40585af4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg4MTl8&ixlib=rb-4.0.3&q=85" },
    { name: "Shorts", price: 39, category: "clothing", description: "Casual summer shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTY3Mjg4NTF8&ixlib=rb-4.0.3&q=85" }
  ];

  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortPriceAsc = document.getElementById("sortPriceAsc");
  const sortPriceDesc = document.getElementById("sortPriceDesc");
  const clearFilters = document.getElementById("clearFilters");

  const productModal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalCategory = document.getElementById("modalCategory");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.querySelector(".close");

  function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
      const li = document.createElement("li");
      li.className = "product";

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;

      const productInfo = document.createElement("div");
      productInfo.innerHTML = `<strong>${product.name}</strong> - $${product.price} (${product.category})`;

      li.appendChild(img);
      li.appendChild(productInfo);

      li.addEventListener("click", () => showProductDetails(product));
      productList.appendChild(li);
    });
  }

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {
      const matchesNameOrPrice = product.name.toLowerCase().includes(searchTerm) || product.price.toString().includes(searchTerm);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesNameOrPrice && matchesCategory;
    });

    displayProducts(filteredProducts);
  }

  function sortProductsAsc() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
  }

  function sortProductsDesc() {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    displayProducts(sortedProducts);
  }

  function showProductDetails(product) {
    modalTitle.textContent = product.name;
    modalPrice.textContent = `Price: $${product.price}`;
    modalCategory.textContent = `Category: ${product.category}`;
    modalDescription.textContent = `Description: ${product.description}`;
    productModal.style.display = "block";
  }

  function clearAllFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    displayProducts(products);
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  sortPriceAsc.addEventListener("click", sortProductsAsc);
  sortPriceDesc.addEventListener("click", sortProductsDesc);
  clearFilters.addEventListener("click", clearAllFilters);

  closeModal.addEventListener("click", () => {
    productModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
  });

  // Initial display of all products
  displayProducts(products);
});
