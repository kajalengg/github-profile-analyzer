require("dotenv").config();

const express = require("express");
require("./config/db");

const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});