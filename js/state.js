class State {
  constructor() {
    this.limit = 10;
    this.resultLength = 0;
    this.data = [];
    this.filterData = [];
    this.category = [];
    this.minPrice = 0;
    this.maxPrice = 0;
    this.categoryFilter = [];
    this.showMobileMenu = false;
    this.showFilters = false;
    this.showSortProducts = false;
  }
}
const appState = new State();
