require("dotenv").config();

const express = require("express");
const app = express();

const db = require("./config/db"); // IMPORTANT

const githubRoutes = require("./routes/githubRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API");
});

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT||5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});