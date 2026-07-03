const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getProfile,
  getStats,
} = require("../controllers/githubController");

// Analyze GitHub profile and save to MySQL
router.get("/analyze/:username", analyzeProfile);

// Get all analyzed profiles
router.get("/profiles", getAllProfiles);

// Get a single analyzed profile
router.get("/profiles/:username", getProfile);

router.get("/stats", getStats);

module.exports = router;