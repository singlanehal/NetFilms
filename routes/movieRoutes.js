const express = require("express");
const movie = require("../models/movie");
const router = express.Router();


router.get("/", async (req, res) => {
  const movies = await movie.find();
  res.json(movies);
});

router.post("/add", async (req, res) => {
  const movie = new movie(req.body);
  await movie.save();
  res.send("Movie added");
});

module.exports = router;