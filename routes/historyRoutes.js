const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");

router.post("/add", async (req, res) => {
  const entry = new WatchHistory(req.body);
  await entry.save();
  res.send("History saved");
});

router.get("/user/:userId", async (req, res) => {
  const history = await WatchHistory.find({ userId: req.params.userId });
  res.json(history);
});

module.exports = router;