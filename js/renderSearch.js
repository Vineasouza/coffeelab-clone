const searchInput = document.querySelector(".search-input");
const searchSpan = document.querySelector(".search-span");

searchInput.onkeydown = () => {
  if (searchInput.value <= 3) {
    searchSpan.style.display = "initial";
  } else {
    searchSpan.style.display = "none";
  }
};
