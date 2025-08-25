const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const {
  getDashboardData,
  voteForSection,
} = require("../controllers/dashboardController");

router.get("/", requireAuth, getDashboardData);
router.post("/vote", requireAuth, voteForSection);

module.exports = router;
