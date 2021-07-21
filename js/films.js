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
            }&apikey=40d7586b`,
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
