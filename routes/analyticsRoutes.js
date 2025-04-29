const express = require("express");
const movie = require("../models/movie");
const router = express.Router();

router.get("/top-viewed", async (req, res) => {
  const movies = await movie.find().sort({ views: -1 }).limit(5);
  res.json(movies);
});

module.exports = router;