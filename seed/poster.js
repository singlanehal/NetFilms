const axios = require('axios');
const fs = require('fs');

const API_KEY = "0e6663a46638b8b900233a5f8d39ef44";
const movieTitles = [
  "Interstellar", "Inception", "The Matrix", "Parasite", "The Dark Knight",
  "Avengers: Endgame", "Titanic", "Joker", "Forrest Gump", "Gladiator",
  "The Godfather", "Fight Club", "The Social Network", "Black Panther",
  "Shutter Island", "The Prestige", "Whiplash", "The Revenant", "Django Unchained"
];

const getPosterUrls = async () => {
  const base = "https://api.themoviedb.org/3/search/movie";
  const posters = {};

  for (const title of movieTitles) {
    const res = await axios.get(base, {
      params: { api_key: API_KEY, query: title }
    });

    const results = res.data.results;
    if (results && results.length > 0) {
      const poster = results[0].poster_path;
      if (poster) posters[title] = "https://image.tmdb.org/t/p/w500" + poster;
    }
  }

  fs.writeFileSync("poster.js", JSON.stringify(posters, null, 2));
  console.log("Saved poster.js");
};

getPosterUrls();
