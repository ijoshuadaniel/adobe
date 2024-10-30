class FetchProducts {
  setData = (data) => {
    appState.resultLength = data.length;
    appState.category = [...new Set(data.map((res) => res.category))];
    const prices = data.map((product) => product.price);
    appState.minPrice = Math.min(...prices);
    appState.maxPrice = Math.max(...prices);
    document.querySelector("#rangeValue").innerHTML = `${Math.floor(
      appState.minPrice
    )} - ${Math.ceil(appState.maxPrice)}`;
    document.getElementById("priceRange").value = Math.ceil(appState.maxPrice);
    document.getElementById("sortProducts").value = "";
    showProducts.setCategory();
    showProducts.setProducts(data);
  };
  showShimmer = () => {
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

  fetchProducts = async () => {
    const element = document.querySelector(".listing__right-products");
    try {
      this.showShimmer();
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      appState.data = result;
      this.setData(appState.data);
    } catch (error) {
      element.innerHTML = "<p class='noproducts'>No Products Found.</p>";
      console.error("There was a problem with the fetch operation:", error);
    }
  };
}

const fetchProducts = new FetchProducts();
