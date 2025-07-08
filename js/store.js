async function loadPhone(searchText, isShowAll) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );

  const data = await res.json();
  console.log(data);
  setTimeout(() => {
    displayProducts(data.data, isShowAll);
  }, 1000);
}

const displayProducts = (data, isShowAll) => {
  const cardContainer = document.getElementById("card-container-section");
  // clear the card container before appending child
  cardContainer.textContent = "";

  const showAllContainer = document.getElementById("showAllBtn");

  if (data.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    data = data.slice(0, 9);
  }

  //loop through the data and append each div in the container
  data.forEach((element) => {
    // console.log(element);

    const productCard = document.createElement("div");
    //adding card styles
    productCard.classList.add("card");
    productCard.innerHTML = `<div class="card-image">
            <img src=${element.image} alt="card-image" />
          </div>

          <h3 class="card-title">${element.phone_name}</h3>

          <p class="card-description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, earum.
          </p>

          <div class="card-price">
            <span>$</span>
            <span id="item-price">$999</span>
          </div>

          <div class="card-button">
            <button onClick="handleShowDetails('${element.slug}')" class="btn">Show Details</button>
          </div>`;
    cardContainer.appendChild(productCard);
  });

  //hide loading spinner
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const cardContainer = document.getElementById("card-container-section");
  // clear the card container before appending child
  cardContainer.textContent = "";
  const searchField = document.getElementById("search-input-field");
  const searchText = searchField.value;

  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinnerElement = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinnerElement.classList.remove("hidden");
  } else {
    loadingSpinnerElement.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetails = async (productId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${productId}`
  );
  const data = await res.json();
  const product = data.data;

  showProductDetails(product);
};

