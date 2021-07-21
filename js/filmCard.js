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
