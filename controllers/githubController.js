const axios = require("axios");
const db = require("../config/db");

// Analyze GitHub profile and save to MySQL
const analyzeProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const user = response.data;

    const accountCreatedAt = user.created_at
      .replace("T", " ")
      .replace("Z", "");

    const sql = `
      INSERT INTO profiles
      (github_id, username, name, bio, location, company, blog,
      public_repos, followers, following,
      avatar_url, profile_url, account_created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        location = VALUES(location),
        company = VALUES(company),
        blog = VALUES(blog),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        avatar_url = VALUES(avatar_url),
        profile_url = VALUES(profile_url),
        account_created_at = VALUES(account_created_at)
    `;

    db.query(
      sql,
      [
        user.id,
        user.login,
        user.name,
        user.bio,
        user.location,
        user.company,
        user.blog,
        user.public_repos,
        user.followers,
        user.following,
        user.avatar_url,
        user.html_url,
        accountCreatedAt,
      ],
      (err) => {
        if (err) {
          return res.status(500).json({
            message: "Database Error",
            error: err.message,
          });
        }

        res.status(200).json({
  message: "Profile analyzed successfully",
  profile: {
    username: user.login,
    name: user.name,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    location: user.location,
    company: user.company,
    profileUrl: user.html_url,
    avatar: user.avatar_url,
   },
  });
      }
    );
  } catch (err) {
  if (err.response && err.response.status === 404) {
    return res.status(404).json({
      message: "GitHub user not found",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
}
};

// Get all profiles
const getAllProfiles = (req, res) => {
  const sql = "SELECT * FROM profiles ORDER BY analyzed_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching profiles",
        error: err.message,
      });
    }

    res.json(result);
  });
};

// Get single profile
const getProfile = (req, res) => {
  const { username } = req.params;

  const sql = "SELECT * FROM profiles WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching profile",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(result[0]);
  });
};

const getStats = (req, res) => {

    const sql = `
        SELECT
        COUNT(*) AS totalProfiles,
        SUM(followers) AS totalFollowers,
        AVG(followers) AS averageFollowers,
        SUM(public_repos) AS totalRepositories
        FROM profiles
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Error fetching stats",
                error: err.message
            });
        }

        res.status(200).json(result[0]);

    });

};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfile,
  getStats,
};