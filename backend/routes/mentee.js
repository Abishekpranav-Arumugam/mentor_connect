const express = require('express');
const router = express.Router();
const menteeController = require('../controllers/menteeController');
const auth = require('../middleware/auth');

// Mentee Registration Route
router.post('/register', menteeController.registerMentee);

// Mentee Login Route
router.post('/login', menteeController.loginMentee);

// Authenticated Mentee Profile
router.get('/profile', auth, menteeController.fetchMenteeProfile);
router.put('/profile', auth, menteeController.updateMenteeProfile);

module.exports = router;
