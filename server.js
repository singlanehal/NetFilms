const express = require("express");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const historyRoutes = require("./routes/historyRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const queryRoutes = require("./routes/queryRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
connectDB();

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/queries", queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));