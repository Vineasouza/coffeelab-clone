const searchInput = document.querySelector(".search-input");
const searchSpan = document.querySelector(".search-span");
const resultContainer = document.querySelector(".search-await-results");

/* Elementos para serem utilizados posteriormente */

const totoroImg = document.createElement("img");
totoroImg.classList.add("search-await-result-img");
totoroImg.src = "./img/totoro.png";
totoroImg.alt = "Totoro Studio Ghibli";

const text = document.createElement("p");
text.classList.add("search-text-await-result");

const toggleResult = (type) => {
  switch (type) {
    case "NENHUM_RESULTADO":
      text.innerHTML = "nenhuma filme com este nome foi encontrado :(";
      return resultContainer.append(totoroImg, text);
    case "NENHUMA_PESQUISA":
      text.innerHTML = "nenhuma pesquisa realizada";
      return resultContainer.append(totoroImg, text);
    case "CARREGANDO":
      text.innerHTML = "carregando...";
      return resultContainer.append(totoroImg, text);
    case "ERRO_NA_PESQUISA":
      text.innerHTML = "oops... verifique sua pesquisa!";
      return resultContainer.append(totoroImg, text);
  }
};

const handleSearch = () => {
  toggleResult("CARREGANDO...");
  resultContainer.classList.remove("films");
  resultContainer.innerHTML = "";

  const search = searchInput.value;

  // Validação
  if (search.length === 0) {
    searchSpan.style.display = "initial";
    searchSpan.innerHTML = "o campo de pesquisa não pode ser vazio!";
    return toggleResult("ERRO_NA_PESQUISA");
  } else if (search.length < 3) {
    searchSpan.style.display = "initial";
    searchSpan.innerHTML = "digite no minimo 3 caracteres!";
    return toggleResult("ERRO_NA_PESQUISA");
  }

  // Pesquisa
  const result = films.filter((film) =>
    film.title.toLowerCase().includes(search.toLowerCase())
  );

  // Nenhum resultado encontrado
  if (result.length === 0) {
    searchSpan.style.display = "none";
    return toggleResult("NENHUM_RESULTADO");
  }

  const cards = result.map((film) => createCard(film));

  resultContainer.append(...cards);
  resultContainer.classList.add("films");
  return (searchSpan.style.display = "none");
};

// Atribuindo pesquisa ao campo de pesquisa
searchInput.onkeyup = handleSearch;

// Exibindo mensagem de nenhuma pesquisa realizada na seção de resultado
toggleResult("NENHUMA_PESQUISA");
