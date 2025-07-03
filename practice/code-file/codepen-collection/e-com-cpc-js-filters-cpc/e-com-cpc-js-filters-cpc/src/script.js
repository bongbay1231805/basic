const products = [
  // Laptops
  {
    id: 1,
    name: "Laptop",
    category: "electronics",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    name: "Laptop Pro",
    category: "electronics",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 3,
    name: "Gaming Laptop",
    category: "electronics",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1575024357670-2b5164f470c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    name: "Ultra Laptop",
    category: "electronics",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    name: "Work Laptop",
    category: "electronics",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1602080858428-57174f9431cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
  },

  // Smartphones
  {
    id: 6,
    name: "Smartphone",
    category: "electronics",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1536846670933-ce6eef8dfe89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNtYXJ0cGhvbmV8ZW58MHwwfDB8fHww"
  },
  {
    id: 7,
    name: "Smartphone XL",
    category: "electronics",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1526038335545-4b96864eaee7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0cGhvbmV8ZW58MHwwfDB8fHww"
  },
  {
    id: 8,
    name: "Smartphone Mini",
    category: "electronics",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1621330396167-b3d451b9b83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNtYXJ0cGhvbmV8ZW58MHwwfDB8fHww"
  },
  {
    id: 9,
    name: "Smartphone Pro",
    category: "electronics",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1573739022854-abceaeb585dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHNtYXJ0cGhvbmV8ZW58MHwwfDB8fHww"
  },
  {
    id: 10,
    name: "Gaming Smartphone",
    category: "electronics",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1606293459209-958d5c67c84b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHNtYXJ0cGhvbmV8ZW58MHwwfDB8fHww"
  },

  // T-shirts
  {
    id: 11,
    name: "T-shirt",
    category: "clothing",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600823722907-43f78d7ba93f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0c3xlbnwwfDB8MHx8fDA%3D"
  },
  {
    id: 12,
    name: "Graphic T-shirt",
    category: "clothing",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0c3xlbnwwfDB8MHx8fDA%3D"
  },
  {
    id: 13,
    name: "Cotton T-shirt",
    category: "clothing",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1612428056948-db07619cb4c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHQlMjBzaGlydHN8ZW58MHwwfDB8fHww"
  },
  {
    id: 14,
    name: "Designer T-shirt",
    category: "clothing",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHQlMjBzaGlydHN8ZW58MHwwfDB8fHww"
  },
  {
    id: 15,
    name: "Vintage T-shirt",
    category: "clothing",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1544441892-715e8df46144?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU5fHx0JTIwc2hpcnRzfGVufDB8MHwwfHx8MA%3D%3D"
  },

  // Jeans
  {
    id: 16,
    name: "Jeans",
    category: "clothing",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEplYW5zfGVufDB8MHwwfHx8MA%3D%3D"
  },
  {
    id: 17,
    name: "Skinny Jeans",
    category: "clothing",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1589226849736-8d0e0c78e869?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEplYW5zfGVufDB8MHwwfHx8MA%3D%3D"
  },
  {
    id: 18,
    name: "Ripped Jeans",
    category: "clothing",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1508900411252-1a7265f23352?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmlwcGVkJTIwSmVhbnN8ZW58MHwwfDB8fHww"
  },
  {
    id: 19,
    name: "Denim Jeans",
    category: "clothing",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1522593494131-af72c0413ee8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fFNraW5ueSUyMEplYW5zfGVufDB8MHwwfHx8MA%3D%3D"
  },
  {
    id: 20,
    name: "Blue Jeans",
    category: "clothing",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1624973008559-cf71a5b85603?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEplYW5zJTIwbWVufGVufDB8MHwwfHx8MA%3D%3D"
  },

  // Books
  {
    id: 21,
    name: "Book",
    category: "books",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm9va3xlbnwwfDB8MHx8fDA%3D"
  },
  {
    id: 22,
    name: "Novel",
    category: "books",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1698195811212-2cdb4a0232f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm92ZWwlMjBjb3ZlciUyMHBhZ2V8ZW58MHwwfDB8fHww"
  },
  {
    id: 23,
    name: "Biography",
    category: "books",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1515098506762-79e1384e9d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2slMjBjb3ZlciUyMHBhZ2V8ZW58MHwwfDB8fHww"
  },
  {
    id: 24,
    name: "Science Book",
    category: "books",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
  },
  {
    id: 25,
    name: "History Book",
    category: "books",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1633580969859-ee2aa7fd2648?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2slMjBjb3ZlcnxlbnwwfDB8MHx8fDA%3D"
  },

  // Headphones
  {
    id: 26,
    name: "Headphones",
    category: "electronics",
    price: 30,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 27,
    name: "Wireless Headphones",
    category: "electronics",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 28,
    name: "Gaming Headphones",
    category: "electronics",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1591105866700-cb5d708ccd93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGdhbWluZyUyMGhlYWRwaG9uZXxlbnwwfDB8MHx8fDA%3D"
  },
  {
    id: 29,
    name: "Noise Cancelling Headphones",
    category: "electronics",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fEhlYWRwaG9uZXN8ZW58MHwwfDB8fHww"
  },
  {
    id: 30,
    name: "Bluetooth Headphones",
    category: "electronics",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1600086827875-a63b01f1335c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fEhlYWRwaG9uZXN8ZW58MHwwfDB8fHww"
  }
];

const productList = document.getElementById("product-list");
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
const categoryButtons = document.querySelectorAll(".category-button");

let currentCategory = "all";

// Preload images
function preloadImages() {
  products.forEach((product) => {
    const img = new Image();
    img.src = product.image;
  });
}

function adjustProductStyling() {
  const productElements = document.querySelectorAll(".product");
  productElements.forEach((productElement) => {
    productElement.style.marginBottom = "20px";
  });
}

function filterCategory(category) {
  currentCategory = category;
  document.getElementById("search-bar").value = "";
  filterProducts();
}

// Search products by name
function filterSearch() {
  const searchQuery = document
    .getElementById("search-bar")
    .value.trim()
    .toLowerCase();
  const maxPrice = parseInt(priceRange.value, 10);
  const filteredProducts = products.filter(
    (product) =>
      (currentCategory === "all" || product.category === currentCategory) &&
      product.price <= maxPrice &&
      product.name.toLowerCase().includes(searchQuery)
  );
  displayProducts(filteredProducts);
}

// Display products
function displayProducts(filteredProducts) {
  if (filteredProducts.length === 0) {
    productList.innerHTML =
      "<p>No products matched your search/filter criteria.</p>";
    return;
  }

  productList.innerHTML = "";
  filteredProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button class="cartBtn">Add to Cart </button>
    `;
    productList.appendChild(productElement);
  });
  adjustProductStyling();
  highlightProducts(filteredProducts);
}

// Filter products by category
function filterCategory(category) {
  // Remove 'selected' class from previously selected button
  const previousSelectedButton = document.querySelector(
    ".category-button.selected"
  );
  if (previousSelectedButton) {
    previousSelectedButton.classList.remove("selected");
  }

  // Adding 'selected' class to the current button
  const currentButton = document.querySelector(
    `.category-button[data-category="${category}"]`
  );
  if (currentButton) {
    currentButton.classList.add("selected");
  }
  currentCategory = category;
  const maxPrice = parseInt(priceRange.value, 10);
  const filteredProducts = products.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      product.price <= maxPrice
  );
  displayProducts(filteredProducts);
}

// Filter products by price
function filterPrice() {
  const maxPrice = parseInt(priceRange.value, 10);
  priceValue.textContent = maxPrice;
  filterCategory(currentCategory);
}

// Highlight products
function highlightProducts(filteredProducts) {
  filteredProducts.forEach((product) => {
    const productElement = document.querySelector(
      `.product img[alt="${product.name}"]`
    ).parentElement;
    productElement.classList.add("highlight");
  });
}

// Initial display of all products
preloadImages();
filterCategory("all");
