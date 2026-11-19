
const languageBtn = document.getElementById("languageBtn");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("search");
const products = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");
const emptyMessage = document.getElementById("emptyMessage");

let currentLanguage = "fa";
let selectedCategory = "all";
let cart = 0;

// Change language
languageBtn.addEventListener("click", () => {
  currentLanguage = currentLanguage === "fa" ? "en" : "fa";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";

  document.body.classList.toggle("english", currentLanguage === "en");

  document.querySelectorAll("[data-fa][data-en]").forEach(element => {
    element.innerHTML = element.dataset[currentLanguage];
  });

  languageBtn.textContent = currentLanguage === "fa" ? "EN" : "FA";

  searchInput.placeholder =
    currentLanguage === "fa" ? "جستجوی نام عطر..." : "Search perfumes...";

  emptyMessage.textContent =
    currentLanguage === "fa" ? "عطری پیدا نشد!" : "No perfume found!";

  updateProducts();
});

// Product filters
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));

    button.classList.add("active");
    selectedCategory = button.dataset.category;

    updateProducts();
  });
});

// Search and category filtering
function updateProducts() {
  const searchValue = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  products.forEach(product => {
    const category = product.dataset.category;
    const name = product.dataset.name.toLowerCase();

    const categoryMatch =
      selectedCategory === "all" || category === selectedCategory;

    const searchMatch = name.includes(searchValue);

    if (categoryMatch && searchMatch) {
      product.style.display = "";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", updateProducts);

// Shopping cart
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    cart++;
    cartCount.textContent = cart;

    const originalText = button.dataset[currentLanguage];

    button.textContent =
      currentLanguage === "fa" ? "به سبد خرید اضافه شد ✓" : "Added to Cart ✓";

    button.classList.add("added");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("added");
    }, 1200);
  });
});
