const { default: mongoose } = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: String,
    genre: [String],
    releaseYear: Number,
    rating: Number,
    duration: Number,
    cast: [String],
    views: Number,
    poster: String 
  });
  module.exports = mongoose.model("Movie", MovieSchema);