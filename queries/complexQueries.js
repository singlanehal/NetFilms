// queries/complexQueries.js
const mongoose = require("mongoose");
const User = require("../models/User");

const WatchHistory = require("../models/WatchHistory");
const Comment = require("../models/Comment");
const movie = require("../models/movie");

// 1. Find all Premium users above age 18 (Logical $and)
const findPremiumUsers = async () => {
  return await User.find({
    $and: [
      { "subscription.type": "Premium" },
      { age: { $gte: 18 } }
    ]
  });
};

// 2. Find movies released after 2020 or with rating > 8.5 (Logical $or)
const findPopularMovies = async () => {
  return await movie.find({
    $or: [
      { releaseYear: { $gt: 2020 } },
      { rating: { $gt: 8.5 } }
    ]
  });
};

// 3. Users whose gender is NOT 'Male' (Logical $not)
const findNonMaleUsers = async () => {
  return await User.find({ gender: { $not: { $eq: "Male" } } });
};

// 4. Users that HAVE the 'watchlist' field (Element $exists)
const findUsersWithWatchlists = async () => {
  return await User.find({ watchlist: { $exists: true } });
};

// 5. Movies with 'Action' AND 'Adventure' (Array $all)
const findActionAdventureMovies = async () => {
  return await movie.find({ genre: { $all: ["Action", "Adventure"] } });
};

// 6. Top 5 most viewed movies (Sorting + limit)
const getTopViewedMovies = async () => {
  return await movie.find().sort({ views: -1 }).limit(5);
};

// 7. WatchHistory within date range (Embedded document filter)
const getWatchHistoryThisYear = async () => {
  return await WatchHistory.find({
    watchedOn: {
      $gte: new Date("2024-01-01"),
      $lte: new Date("2024-12-31")
    }
  });
};

// 8. Add “Drama” to Inception’s genre (Update operator)
const addDramaGenreToInception = async () => {
  return await movie.updateOne(
    { title: "Inception" },
    { $addToSet: { genre: "Drama" } }
  );
};

// 9. Comments joined with user data ($lookup)
const getCommentsWithUserInfo = async () => {
  return await Comment.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails"
      }
    }
  ]);
};

// 10. Count of movies per genre using aggregation
const countMoviesPerGenre = async () => {
  return await movie.aggregate([
    { $unwind: "$genre" },
    { $group: { _id: "$genre", total: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ]);
};

module.exports = {
  findPremiumUsers,
  findPopularMovies,
  findNonMaleUsers,
  findUsersWithWatchlists,
  findActionAdventureMovies,
  getTopViewedMovies,
  getWatchHistoryThisYear,
  addDramaGenreToInception,
  getCommentsWithUserInfo,
  countMoviesPerGenre
};
