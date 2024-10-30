let limit = 10;
let resultLength = 0;
let data = [];
let filterData = [];
let category = [];
let minPrice = 0;
let maxPrice = 0;
let categoryFilter = [];
let showMobileMenu = false;
let showFilters = false;
let showSortProducts = false;

const setShowSort = () => {
  const sortProductElement = document.querySelector(".listing__right-head");
  if (showSortProducts) {
    sortProductElement.classList.remove("listing__right-head-mobile");
  } else {
    sortProductElement.classList.add("listing__right-head-mobile");
  }
  showSortProducts = !showSortProducts;
};

const setShowFilters = () => {
  const filterElement = document.querySelector(".listing__left");
  if (showFilters) {
    filterElement.classList.remove("listing__left-mobile");
  } else {
    filterElement.classList.add("listing__left-mobile");
  }
  showFilters = !showFilters;
};

const hamburgerClick = () => {
  const navElement = document.querySelector(".header__nav");
  if (showMobileMenu) {
    navElement.classList.remove("header__mobile_nav");
  } else {
    navElement.classList.add("header__mobile_nav");
  }
  showMobileMenu = !showMobileMenu;
};

const trimTittle = (title) => {
  if (title.length > 30) {
    return title.slice(0, 25) + "...";
  }
  return title;
};

const sortProducts = () => {
  const elementValue = document.getElementById("sortProducts").value;
  if (elementValue === "Price Low to High") {
    filterData = data.slice(0, limit).sort((a, b) => a.price - b.price);
  } else if (elementValue === "Price High to Low") {
    filterData = data.slice(0, limit).sort((a, b) => b.price - a.price);
  } else {
    filterData = data.slice(0, limit);
  }
  setProducts(filterData);
};

const updateRangeValue = () => {
  const value = document.getElementById("priceRange").value;
  document.querySelector("#rangeValue").innerHTML = `${Math.floor(
    minPrice
  )} - ${Math.ceil(value)}`;
  filterData = data.slice(0, limit).filter((product) => product.price <= value);
  setProducts(filterData);
};

const onSearch = (event) => {
  filterData = data
    .slice(0, limit)
    .filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
  setProducts(filterData);
};

const loadMore = () => {
  if (limit !== resultLength) {
    limit = limit + 10;
    setData(data);
  } else {
    alert("All Products Fetched!");
  }
};

const setProducts = (data) => {
  const element = document.querySelector(".listing__right-products");
  element.innerHTML = "";
  const loadMore = document.querySelector(".listing__loadMore-btn");
  let html = "";
  if (data.length > 0) {
    data.slice(0, limit).forEach((products) => {
      html += `<div class="listing__right-products_item">
          <img class="listing__right-product-img" src="${
            products.image
          }" alt="image for ${products.image}"/>
          <h2 class="listing__right-product-title" >${trimTittle(
            products.title
          )}</h2>
          <p class="listing__right-product-price" >$${products.price}</p>
          <img class="listing__right-product-fav"  src="/icons/heart.jpg"/>
        </div>`;
    });
  } else {
    html += "<p class='noproducts'>No Products Found. Clear Filters.</p>";
  }
  if (limit === resultLength) {
    loadMore.disabled = true;
  } else {
    loadMore.disabled = false;
  }
  element.innerHTML = html;
};

const setCategory = () => {
  const element = document.querySelector(".listing__category-list");
  let html = "";
  category.forEach((cat) => {
    const cate = cat.replace(/'/g, "\\'");
    html += `
      <div class="listing__category-item">
        <input class="listing__category-checkbox" type="checkbox" name="category" id="${cat}" value="${cat}" onChange="onCheckboxChange('${cate}')" />
        <label class="listing__category-label" for="${cat}">${cat}</label>
      </div>`;
  });
  document.querySelector(".listing__rigth-head_total").innerHTML =
    resultLength + " Results";
  document.querySelector(".listing__rigth-head_total-mobile").innerHTML =
    resultLength + " Results";
  element.innerHTML = html;
};

const filterCheckbox = () => {
  const availableData = data.slice(0, limit);
  if (categoryFilter && categoryFilter.length > 0) {
    filterData = availableData.filter((products) =>
      categoryFilter.includes(products.category)
    );
    setProducts(filterData);
  } else {
    setProducts(availableData);
  }
};

const onCheckboxChange = (category) => {
  const checkbox = document.getElementById(category);
  if (checkbox.checked) {
    categoryFilter.push(checkbox.value);
  } else {
    categoryFilter = categoryFilter.filter((f) => f !== checkbox.value);
  }
  filterCheckbox();
};

const setData = (data) => {
  resultLength = data.length;
  category = [...new Set(data.map((res) => res.category))];
  const prices = data.map((product) => product.price);
  minPrice = Math.min(...prices);
  maxPrice = Math.max(...prices);
  document.querySelector("#rangeValue").innerHTML = `${Math.floor(
    minPrice
  )} - ${Math.ceil(maxPrice)}`;
  document.getElementById("priceRange").value = Math.ceil(maxPrice);
  document.getElementById("sortProducts").value = "";
  setCategory();
  setProducts(data);
};

const showShimmer = () => {
  let html = ``;
  for (let index = 0; index < 10; index++) {
    html += ` <div class="listing-shimmer">
    <div class="shimmer image"></div>
    <div class="shimmer title"></div>
    <div class="shimmer price"></div>
</div>`;
  }
  document.querySelector(".listing__right-products").innerHTML = html;
};

const fetchProducts = async () => {
  try {
    showShimmer();
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    data = result;
    setData(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  } finally {
    loading = false;
  }
};

document.addEventListener("DOMContentLoaded", fetchProducts);
