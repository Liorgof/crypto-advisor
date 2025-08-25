const express = require("express");
const router = express.Router();
const {
  savePreferences,
  getPreferences,
} = require("../controllers/onboardingController");
const requireAuth = require("../middleware/authMiddleware");

router.post("/", requireAuth, savePreferences);
router.get("/", requireAuth, getPreferences);

module.exports = router;
