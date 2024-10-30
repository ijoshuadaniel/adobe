class ShowProducts {
  setCategory = () => {
    const element = document.querySelector(".listing__category-list");
    let html = "";
    appState.category.forEach((cat) => {
      const cate = cat.replace(/'/g, "\\'");
      html += `
      <div class="listing__category-item">
        <input class="listing__category-checkbox" type="checkbox" name="category" id="${cat}" value="${cat}" onChange="onCheckboxChange('${cate}')" />
        <label class="listing__category-label" for="${cat}">${cat}</label>
      </div>`;
    });
    document.querySelector(".listing__rigth-head_total").innerHTML =
      appState.resultLength + " Results";
    document.querySelector(".listing__rigth-head_total-mobile").innerHTML =
      appState.resultLength + " Results";
    element.innerHTML = html;
  };
  setProducts = (data) => {
    const element = document.querySelector(".listing__right-products");
    element.innerHTML = "";
    const loadMore = document.querySelector(".listing__loadMore-btn");
    let html = "";
    if (data.length > 0) {
      data.slice(0, appState.limit).forEach((products) => {
        html += `<div class="listing__right-products_item">
          <img class="listing__right-product-img" src="${
            products.image
          }" alt="image for ${products.image}"/>
          <h2 class="listing__right-product-title" >${appFunctions.trimTittle(
            products.title
          )}</h2>
          <p class="listing__right-product-price" >$${products.price}</p>
          <img class="listing__right-product-fav"  src="/adobe/icons/heart.jpg"/>
        </div>`;
      });
    } else {
      html += "<p class='noproducts'>No Products Found. Clear Filters.</p>";
    }
    if (appState.limit === appState.resultLength) {
      loadMore.disabled = true;
    } else {
      loadMore.disabled = false;
    }
    element.innerHTML = html;
  };
}

const showProducts = new ShowProducts();
