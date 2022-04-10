const userCityInput = document.getElementById("user-city-input");
const addCityBtn = document.getElementById("add-city-btn");
const errMassage = document.getElementById("err-message");
const searchUl = document.getElementById("search-ul");
const searchInput = document.getElementById("search-input");
const searchBarSection = document.getElementById("search-bar-section");
const allLi = document.querySelectorAll("li");
const countryDisplay = document.getElementById("country-display");
const mainLogo = document.getElementById("main-logo");

let cityArr = [];

init();
function init() {
  addCityBtn.addEventListener("click", pushAndAdd);
  userCityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      pushAndAdd();
    }
    return;
  });
  searchInput.addEventListener("focus", () => {
    searchUl.classList.remove("d-none");
  });

  searchUl.addEventListener("mouseleave", () => {
    searchUl.classList.add("d-none");
  });
  searchInput.addEventListener("input", showBySearch);
  mainLogo.addEventListener("click", showOnlyList);
}

function pushAndAdd() {
  pushCityToArr();
  addToUl();
  if (cityArr.length) {
    searchBarSection.classList.remove("d-none");
    searchInput.classList.remove("d-none");
    searchUl.classList.add("d-none");
  }
  addEventToLi("click", "blue");
  addEventToLi("dblclick", "green");
}

function pushCityToArr() {
  if (!isNaN(Number(userCityInput.value)) || userCityInput.value.length <= 2) {
    errMassage.innerHTML = "Type in a valid city name";
    setTimeout(() => {
      errMassage.innerHTML = "";
    }, 3000);
    return;
  }
  if (checkIfExists()) {
    errMassage.innerHTML = "Current city already exists";
    setTimeout(() => {
      errMassage.innerHTML = "";
    }, 3000);
    return;
  }
  cityArr.push(userCityInput.value);
  cityArr.sort();
  userCityInput.value = "";
}

function addToUl() {
  searchUl.innerHTML = "";
  for (const city of cityArr) {
    searchUl.innerHTML += `<li class="list-group-item fw-bold">${city}</li>`;
  }
}

function checkIfExists() {
  for (const city of cityArr) {
    if (userCityInput.value === city) {
      return true;
    }
  }
}

function showBySearch() {
  searchUl.innerHTML = "";
  for (const city of cityArr) {
    if (city.includes(searchInput.value)) {
      searchUl.innerHTML += `<li class="list-group-item fw-bold">${city}</li>`;
    }
  }
  addEventToLi("click", "blue");
  addEventToLi("dblclick", "green");
}

function addEventToLi(event, color) {
  if (searchUl.children.length) {
    const allLi = document.querySelectorAll("li");
    for (const element of allLi) {
      element.addEventListener(event, (e) => {
        e.target.style.color = color;
        countryDisplay.innerHTML = e.target.innerHTML.toUpperCase();
        countryDisplay.style.color = color;
        setTimeout(() => {
          countryDisplay.innerHTML = "";
        }, 5000);
      });
    }
  } else {
    return;
  }
}

function showOnlyList() {
  addEventToLi("click", "blue");
  addEventToLi("dblclick", "green");
  searchUl.classList.remove("d-none");
  searchInput.classList.add("d-none");
}
