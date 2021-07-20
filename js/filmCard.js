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

  const poster = document.createElement("img");
  poster.classList.add("card-film-poster");
  poster.alt = filmTitle.toLowerCase();
  poster.src = posterURL;

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
    poster,
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

document.body.appendChild(
  createCard({
    id: 123,
    title: "spirited away",
    original_title: "千と千尋の神隠し",
    original_title_romanised: "Sen to Chihiro no kamikakushi",
    release_date: "2001",
    description:
      "Spirited Away is an Oscar winning Japanese animated film about a ten year old girl who wanders away from her parents along a path that leads to a world ruled by strange and unusual monster-like animals. Her parents have been changed into pigs along with others inside a bathhouse full of these creatures. Will she ever see the world how it once was?",
    director: "Hayao Miyazaki",
    posterURL:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  })
);

document.body.appendChild(
  createCard({
    id: 123,
    title: "My Neighbor Totoro",
    original_title: "となりのトトロ",
    original_title_romanised: "Tonari no Totoro",
    release_date: "1988",
    description:
      "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
    director: "Hayao Miyazaki",
    posterURL:
      "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  })
);
