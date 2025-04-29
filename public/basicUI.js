const queryList = [
  ["Premium Users", "/api/queries/premium-users"],
  ["Popular Movies", "/api/queries/popular-movies"],
  ["Non-Male Users", "/api/queries/non-male-users"],
  ["Users With Watchlists", "/api/queries/watchlists"],
  ["Action + Adventure Movies", "/api/queries/action-adventure"],
  ["Top Viewed Movies", "/api/queries/top-viewed"],
  ["This Year's Watch History", "/api/queries/watch-history"],
  ["Add Drama to Inception", "/api/queries/add-drama"],
  ["Comments with User Info", "/api/queries/comments-users"],
  ["Movies per Genre", "/api/queries/genre-counts"]
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("queryButtons");
  queryList.forEach(([label, endpoint]) => {
    const btn = document.createElement("button");
    btn.innerText = label;
    btn.onclick = () => runQuery(endpoint);
    container.appendChild(btn);
  });
});

async function loadMovies() {
  const res = await fetch('/api/movies');
  const movies = await res.json();
  const list = document.getElementById('movieList');
  list.innerHTML = '';
  movies.forEach(movie => {
    const item = document.createElement('li');
    item.innerText = `${movie.title} (${movie.releaseYear}) - Rating: ${movie.rating}`;
    list.appendChild(item);
  });
}

async function addMovie() {
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value.split(',').map(g => g.trim());
  const releaseYear = parseInt(document.getElementById('year').value);
  const rating = parseFloat(document.getElementById('rating').value);
  const duration = parseInt(document.getElementById('duration').value);
  const cast = document.getElementById('cast').value.split(',').map(c => c.trim());

  const res = await fetch('/api/movies/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, genre, releaseYear, rating, duration, cast, views: 0 })
  });

  if (res.ok) {
    alert('Movie added!');
    loadMovies();
  } else {
    alert('Failed to add movie.');
  }
}

async function runQuery(endpoint) {
  const res = await fetch(endpoint, { method: endpoint.includes("add-drama") ? 'PUT' : 'GET' });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    document.getElementById("queryResults").innerText = JSON.stringify(data, null, 2);
  } catch {
    document.getElementById("queryResults").innerText = text;
  }
}