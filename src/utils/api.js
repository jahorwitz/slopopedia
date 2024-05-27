// import entire SDK

const baseUrl = "testing.com";

export const postNewMovie = (newMovie) => {
  return fetch(`${baseUrl}/movie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${newMovie.token}`,
    },
    body: JSON.stringify({
      author: newMovie.author,
      title: newMovie.title,
      description: newMovie.description,
      releaseYear: newMovie.releaseYear,
      runtime: newMovie.runtime,
      photo: newMovie.photo,
      tomatoScore: newMovie.tomatoScore,
      howToWatch: newMovie.howToWatch,
      keywords: newMovie.keywords,
    }),
  }).then(checkResponse);
};
