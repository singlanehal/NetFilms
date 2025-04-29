const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  });
  module.exports = mongoose.model("Comment", CommentSchema);