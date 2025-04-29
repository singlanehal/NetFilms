const express = require("express");
const router = express.Router();
const queries = require("../queries/complexQueries");

router.get("/premium-users", async (req, res) => res.json(await queries.findPremiumUsers()));
router.get("/popular-movies", async (req, res) => res.json(await queries.findPopularMovies()));
router.get("/non-male-users", async (req, res) => res.json(await queries.findNonMaleUsers()));
router.get("/watchlists", async (req, res) => res.json(await queries.findUsersWithWatchlists()));
router.get("/action-adventure", async (req, res) => res.json(await queries.findActionAdventureMovies()));
router.get("/top-viewed", async (req, res) => res.json(await queries.getTopViewedMovies()));
router.get("/watch-history", async (req, res) => res.json(await queries.getWatchHistoryThisYear()));
router.put("/add-drama", async (req, res) => res.json(await queries.addDramaGenreToInception()));
router.get("/comments-users", async (req, res) => res.json(await queries.getCommentsWithUserInfo()));
router.get("/genre-counts", async (req, res) => res.json(await queries.countMoviesPerGenre()));

module.exports = router;
