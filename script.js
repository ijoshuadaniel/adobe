const hamburgerClick = () => appFunctions.hamburgerClick();
const loadMore = () => appFunctions.loadMore();
const setShowFilters = () => appFunctions.setShowFilters();
const setShowSort = () => appFunctions.setShowSort();
const updateRangeValue = () => appFunctions.updateRangeValue();
const sortProducts = () => appFunctions.sortProducts();
const onSearch = (event) => appFunctions.onSearch(event);
const onCheckboxChange = (data) => appFunctions.onCheckboxChange(data);

document.addEventListener("DOMContentLoaded", () =>
  fetchProducts.fetchProducts()
);
