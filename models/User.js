const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  age: Number,
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  subscription: {
    type: { type: String },
    startDate: Date,
    endDate: Date
  }
});
module.exports = mongoose.model("User", UserSchema);