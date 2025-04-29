// seed/seedData.js
const mongoose = require("mongoose");
const User = require("../models/User");
const WatchHistory = require("../models/WatchHistory");
const Comment = require("../models/Comment");
require("dotenv").config();

const connectDB = require("../config/db");
const movie = require("../models/movie");
connectDB();

const seed = async () => {
  await User.deleteMany();
  await movie.deleteMany();
  await WatchHistory.deleteMany();
  await Comment.deleteMany();

  const users = await User.insertMany([
    {
      name: "Alice",
      email: "alice@example.com",
      gender: "Female",
      age: 23,
      subscription: { type: "Premium", startDate: new Date("2024-01-01"), endDate: new Date("2025-01-01") }
    },
    {
      name: "Bob",
      email: "bob@example.com",
      gender: "Male",
      age: 28,
      subscription: { type: "Free", startDate: new Date("2024-02-01"), endDate: new Date("2024-08-01") }
    },
    {
      name: "Charlie",
      email: "charlie@example.com",
      gender: "Male",
      age: 22,
      subscription: { type: "Premium", startDate: new Date("2023-06-01"), endDate: new Date("2024-06-01") }
    },
    {
      name: "Diana",
      email: "diana@example.com",
      gender: "Female",
      age: 25
      // No subscription = edge case test
    }
  ]);
  

  const movies = await movie.insertMany([
    { title: "Interstellar", genre: ["Sci-Fi"], releaseYear: 2014, rating: 8.6, duration: 169, cast: ["Matthew McConaughey"], views: 5000 },
    { title: "Inception", genre: ["Sci-Fi", "Thriller"], releaseYear: 2010, rating: 8.8, duration: 148, cast: ["Leonardo DiCaprio"], views: 7000 },
    { title: "The Matrix", genre: ["Sci-Fi", "Action"], releaseYear: 1999, rating: 8.7, duration: 136, cast: ["Keanu Reeves"], views: 8500 },
    { title: "Parasite", genre: ["Drama", "Thriller"], releaseYear: 2019, rating: 8.6, duration: 132, cast: ["Song Kang-ho"], views: 6000 },
    { title: "The Dark Knight", genre: ["Action", "Crime"], releaseYear: 2008, rating: 9.0, duration: 152, cast: ["Christian Bale"], views: 12000 },
    { title: "Avengers: Endgame", genre: ["Action", "Adventure"], releaseYear: 2019, rating: 8.4, duration: 181, cast: ["Robert Downey Jr."], views: 11000 },
    { title: "Titanic", genre: ["Drama", "Romance"], releaseYear: 1997, rating: 7.8, duration: 195, cast: ["Leonardo DiCaprio"], views: 13000 },
    { title: "Joker", genre: ["Crime", "Drama"], releaseYear: 2019, rating: 8.5, duration: 122, cast: ["Joaquin Phoenix"], views: 9500 },
    { title: "Forrest Gump", genre: ["Drama", "Romance"], releaseYear: 1994, rating: 8.8, duration: 142, cast: ["Tom Hanks"], views: 12500 },
    { title: "Gladiator", genre: ["Action", "Drama"], releaseYear: 2000, rating: 8.5, duration: 155, cast: ["Russell Crowe"], views: 10000 },
    { title: "The Godfather", genre: ["Crime", "Drama"], releaseYear: 1972, rating: 9.2, duration: 175, cast: ["Marlon Brando"], views: 9000 },
    { title: "Fight Club", genre: ["Drama"], releaseYear: 1999, rating: 8.8, duration: 139, cast: ["Brad Pitt"], views: 8700 },
    { title: "The Social Network", genre: ["Drama"], releaseYear: 2010, rating: 7.7, duration: 120, cast: ["Jesse Eisenberg"], views: 7200 },
    { title: "Black Panther", genre: ["Action", "Adventure"], releaseYear: 2018, rating: 7.3, duration: 134, cast: ["Chadwick Boseman"], views: 9800 },
    { title: "Shutter Island", genre: ["Mystery", "Thriller"], releaseYear: 2010, rating: 8.2, duration: 138, cast: ["Leonardo DiCaprio"], views: 8600 },
    { title: "The Prestige", genre: ["Drama", "Mystery"], releaseYear: 2006, rating: 8.5, duration: 130, cast: ["Hugh Jackman", "Christian Bale"], views: 7800 },
    { title: "La La Land", genre: ["Comedy", "Drama", "Music"], releaseYear: 2016, rating: 8.0, duration: 128, cast: ["Ryan Gosling", "Emma Stone"], views: 7500 },
    { title: "Whiplash", genre: ["Drama", "Music"], releaseYear: 2014, rating: 8.5, duration: 107, cast: ["Miles Teller"], views: 7300 },
    { title: "Avengers: Infinity War", genre: ["Action", "Sci-Fi"], releaseYear: 2018, rating: 8.4, duration: 149, cast: ["Robert Downey Jr."], views: 9700 },
    { title: "The Revenant", genre: ["Adventure", "Drama"], releaseYear: 2015, rating: 8.0, duration: 156, cast: ["Leonardo DiCaprio"], views: 8200 }
  ]);

  await WatchHistory.insertMany([
    { userId: users[0]._id, movieId: movies[0]._id, watchedOn: new Date(), progress: 90 },
    { userId: users[1]._id, movieId: movies[1]._id, watchedOn: new Date(), progress: 100 },
    { userId: users[2]._id, movieId: movies[2]._id, watchedOn: new Date(), progress: 50 },
    { userId: users[3]._id, movieId: movies[3]._id, watchedOn: new Date(), progress: 100 },
    { userId: users[0]._id, movieId: movies[4]._id, watchedOn: new Date(), progress: 60 }
  ]);

  await Comment.insertMany([
    { movieId: movies[0]._id, userId: users[0]._id, text: "Great movie!" },
    { movieId: movies[1]._id, userId: users[1]._id, text: "Mind-blowing!" },
    { movieId: movies[2]._id, userId: users[2]._id, text: "Classic sci-fi masterpiece." },
    { movieId: movies[3]._id, userId: users[3]._id, text: "Really intense drama." },
    { movieId: movies[4]._id, userId: users[0]._id, text: "One of the best Batman movies." }
  ]);

  console.log("Data Seeded");
  process.exit();
};

seed();
