class AppFunctions {
  setShowSort = () => {
    const sortProductElement = document.querySelector(".listing__right-head");
    if (appState.showSortProducts) {
      sortProductElement.classList.remove("listing__right-head-mobile");
    } else {
      sortProductElement.classList.add("listing__right-head-mobile");
    }
    appState.showSortProducts = !appState.showSortProducts;
  };

  setShowFilters = () => {
    const filterElement = document.querySelector(".listing__left");
    if (appState.showFilters) {
      filterElement.classList.remove("listing__left-mobile");
    } else {
      filterElement.classList.add("listing__left-mobile");
    }
    appState.showFilters = !appState.showFilters;
  };

  hamburgerClick = () => {
    const navElement = document.querySelector(".header__nav");
    if (showMobileMenu) {
      navElement.classList.remove("header__mobile_nav");
    } else {
      navElement.classList.add("header__mobile_nav");
    }
    appState.showMobileMenu = !appState.showMobileMenu;
  };

  trimTittle = (title) => {
    if (title.length > 30) {
      return title.slice(0, 25) + "...";
    }
    return title;
  };

  sortProducts = () => {
    const elementValue = document.getElementById("sortProducts").value;
    if (elementValue === "Price Low to High") {
      appState.filterData = appState.data
        .slice(0, limit)
        .sort((a, b) => a.price - b.price);
    } else if (elementValue === "Price High to Low") {
      appState.filterData = appState.data
        .slice(0, limit)
        .sort((a, b) => b.price - a.price);
    } else {
      appState.filterData = appState.data.slice(0, limit);
    }
    showProducts.setProducts(appState.filterData);
  };

  updateRangeValue = () => {
    const value = document.getElementById("priceRange").value;
    document.querySelector("#rangeValue").innerHTML = `${Math.floor(
      appState.minPrice
    )} - ${Math.ceil(value)}`;
    appState.filterData = appState.data
      .slice(0, appState.limit)
      .filter((product) => product.price <= value);
    showProducts.setProducts(appState.filterData);
  };

  onSearch = (event) => {
    appState.filterData = appState.data
      .slice(0, appState.limit)
      .filter((product) =>
        product.title.toLowerCase().includes(event.target.value.toLowerCase())
      );
    showProducts.setProducts(appState.filterData);
  };

  loadMore = () => {
    if (appState.limit !== appState.resultLength) {
      appState.limit = appState.limit + 10;
      fetchProducts.setData(appState.data);
    } else {
      alert("All Products Fetched!");
    }
  };
  filterCheckbox = () => {
    const availableData = appState.data.slice(0, appState.limit);
    if (appState.categoryFilter && appState.categoryFilter.length > 0) {
      appState.filterData = availableData.filter((products) =>
        appState.categoryFilter.includes(products.category)
      );
      showProducts.setProducts(appState.filterData);
    } else {
      showProducts.setProducts(availableData);
    }
  };

  onCheckboxChange = (category) => {
    const checkbox = document.getElementById(category);
    if (checkbox.checked) {
      appState.categoryFilter.push(checkbox.value);
    } else {
      appState.categoryFilter = appState.categoryFilter.filter(
        (f) => f !== checkbox.value
      );
    }
    this.filterCheckbox();
  };
}

const appFunctions = new AppFunctions();
