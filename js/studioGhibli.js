var xmlhttp = new XMLHttpRequest();

const fetchStudioGhibliFilms = async () => {
  // Setup our HTTP request
  xmlhttp.open("GET", "https://ghibliapi.herokuapp.com/films", true);
  // Setup our listener to process compeleted requests
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      // return a JSON with all of Studio Ghibli films
      return JSON.parse(xmlhttp.responseText);
    } else {
      console.log(
        "Erro ao acessar a API: https://ghibliapi.herokuapp.com/films"
      );
    }
  };
  // Send the request
  xmlhttp.send();
};
