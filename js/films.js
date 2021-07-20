/**
 * This function uses the array of films names passed as
 * props to fetch its posters from OMDb database.
 * @param {*} filmsNames
 * an array of strings with films names
 * @returns {*} a promisified array with image URLs
 * @example
 *
 * ```javascript
 * fetchFilmsPosters(filmsNames)
 *     .then((postersListArray) => console.log(postersListArray))
 *     .catch((error) => console.log('Error retrieving posters: ', error))
 * ```
 */
const fetchFilmsPosters = async (filmsNames = []) => {
  if (filmsNames.length > 0)
    return Promise.all(
      filmsNames.map((filmName) => {
        // Create the XHR request
        var request = new XMLHttpRequest();

        // Return it as a Promise
        return new Promise(function (resolve, reject) {
          // Setup our listener to process compeleted requests
          request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
              // If successful
              resolve(JSON.parse(request.responseText).Poster);
            } else {
              // If failed
              reject({
                status: request.status,
                statusText: request.statusText,
              });
            }
          };

          // Setup our HTTP request
          request.open(
            "GET",
            `https://www.omdbapi.com/?t=${filmName
              .split(" ")
              .join("+")}&apikey=40d7586b`,
            true
          );

          // Send the request
          request.send();
        });
      })
    );
  return [];
};
