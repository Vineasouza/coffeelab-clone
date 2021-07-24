const fetchFilmsPosters = async (films = []) => {
  if (films.length > 0)
    return Promise.all(
      films.map((film) => {
        // Cria o objeto XHTTP
        var request = new XMLHttpRequest();

        // Return a resposta como uma promise
        return new Promise(function (resolve, reject) {
          // Cria o action listener para 'escutar' as respostas à requisição
          request.onreadystatechange = function () {
            // Se já tiver completado a requisição
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
              // Se concluir
              resolve(JSON.parse(request.responseText).Poster);
            } else {
              // Se falhar
              reject({
                status: request.status,
                statusText: request.statusText,
              });
            }
          };

          // Cria a requisição HTTP
          request.open(
            "GET",
            `https://www.omdbapi.com/?t=${film.title.split(" ").join("+")}&y=${
              film.release_date
            }&apikey=d75dfeee`,
            true
          );

          // Envia a requisição
          request.send();
        });
      })
    );
  return [];
};

const fetchStudioGhibliFilms = () => {
  // Cria o objeto XHTTP
  var request = new XMLHttpRequest();

  // Return a resposta como uma promise
  return new Promise(function (resolve, reject) {
    // Cria o action listener para 'escutar' as respostas à requisição
    request.onreadystatechange = function () {
      // Se já tiver completado a requisição
      if (request.readyState !== 4) return;

      // Process the response
      if (request.status >= 200 && request.status < 300) {
        // Se concluir
        resolve(JSON.parse(request.responseText));
      } else {
        // Se falhar
        reject({
          status: request.status,
          statusText:
            "Erro ao acessar a API: https://ghibliapi.herokuapp.com/films",
        });
      }
    };

    // Cria a requisição HTTP
    request.open(
      "GET",
      "https://ghibliapi.herokuapp.com/films?fields=id,title,original_title,original_title_romanised,description,director,release_date",
      true
    );

    // Envia a requisição
    request.send();
  });
};

// Este é o array que irá conter todos os filmes logo que o usuário logar
let loading = true;
let films = [];

// Esta é a função que irá pegar todos os filmes e colocar no array acima
const fetchFilms = async () => {
  films = await fetchStudioGhibliFilms();

  posters = await fetchFilmsPosters(films);

  films = films.map((film, idx) => ({ ...film, posterURL: posters[idx] }));

  console.log(films);

  loading = false;
};

// Função que criará o card resultado mostrando o filme e suas informações
const createCard = (data) => {
  const {
    id,
    title: filmTitle,
    original_title,
    original_title_romanised,
    release_date,
    description: filmDescription,
    director: filmDirector,
    posterURL,
  } = data;

  const container = document.createElement("div");
  container.classList.add("card-container");

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("card-content-wrapper");

  if (posterURL !== undefined && posterURL !== "N/A" && posterURL !== "") {
    const poster = document.createElement("img");
    poster.classList.add("card-film-poster");
    poster.alt = filmTitle.toLowerCase();
    poster.src = posterURL;

    contentWrapper.append(poster);
  }

  const title = document.createElement("h1");
  title.classList.add("card-title-english");
  title.innerHTML = filmTitle.toLowerCase();

  const divisor = document.createElement("div");
  divisor.classList.add("card-divisor");

  const originalTitle = document.createElement("h2");
  originalTitle.classList.add("card-title-japanese");
  originalTitle.innerHTML = original_title;

  const originalTitleRomanised = document.createElement("h2");
  originalTitleRomanised.classList.add("card-title-japanese-romanji");
  originalTitleRomanised.innerHTML = original_title_romanised.toLowerCase();

  const releaseDate = document.createElement("h3");
  releaseDate.classList.add("card-film-release-date");
  releaseDate.innerHTML = release_date;

  const description = document.createElement("p");
  description.classList.add("card-film-description");
  description.innerHTML = filmDescription;

  const directorLabel = document.createElement("p");
  directorLabel.classList.add("card-film-label");
  directorLabel.innerHTML = "director: ";

  const director = document.createElement("p");
  director.classList.add("card-film-director");
  director.innerHTML = filmDirector;

  contentWrapper.append(
    title,
    divisor,
    originalTitle,
    originalTitleRomanised,
    releaseDate,
    description,
    directorLabel,
    director
  );

  container.append(contentWrapper);
  return container;
};
