// routes/analytics.js
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
// Service module that interfaces with the analytics provider (e.g., Google Analytics)
const analyticsService = require('../services/analyticsService');

// Get analytics for the logged-in user's own websites
router.get('/my', async (req, res) => {
  try {
    // const userId = req.user.id;
    // Fetch analytics data for this user (e.g., from Google Analytics API)
    const data = await analyticsService.getUserAnalytics("13");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Admin-only: Get analytics for all users' websites
router.get('/all', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const data = await analyticsService.getAllUsersAnalytics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router;
