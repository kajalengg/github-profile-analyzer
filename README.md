# GitHub Profile Analyzer API

A REST API built with Node.js, Express.js, and MySQL that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Features

- Analyze GitHub profile using username
- Fetch data from GitHub Public API
- Store profile insights in MySQL
- Update existing profile if already analyzed
- Get all analyzed profiles
- Get a single analyzed profile
- Get overall statistics (Bonus)

## Tech Stack

- Node.js
- Express.js
- MySQL
- GitHub REST API
- Axios
- dotenv

## Project Structure

```
github-profile-analyzer/
│
├── config/
│   └── db.js
├── controllers/
│   └── githubController.js
├── routes/
│   └── githubRoutes.js
├── app.js
├── package.json
├── .env
├── github_analyzer.sql
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Create .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=github_analyzer
PORT=5000
```

### Start Server

```bash
npm run dev
```

## API Endpoints

### Analyze Profile

```
GET /api/github/analyze/:username
```

Example

```
GET /api/github/analyze/octocat
```

---

### Get All Profiles

```
GET /api/github/profiles
```

---

### Get Single Profile

```
GET /api/github/profiles/:username
```

Example

```
GET /api/github/profiles/octocat
```

---

### Get Statistics

```
GET /api/github/stats
```

## Database

Database schema is included in

```
github_analyzer.sql
```

## Author

Kajal Yadav
