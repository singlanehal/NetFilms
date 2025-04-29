const { default: mongoose } = require("mongoose");

const WatchHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    watchedOn: Date,
    progress: Number
  });
  module.exports = mongoose.model("WatchHistory", WatchHistorySchema);