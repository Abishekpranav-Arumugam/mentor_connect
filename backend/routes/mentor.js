// backend/routes/mentor.js
const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const multer = require('multer');
const authMiddleware = require('../middleware/auth');

// Multer setup for file uploads (ID Card and Resume)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Mentor Registration Route
router.post('/register', upload.fields([{ name: 'idCard' }, { name: 'resume' }]), mentorController.registerMentor);

// Mentor Login Route
router.post('/login', mentorController.loginMentor);

// Specific routes FIRST
router.get('/all', mentorController.fetchAllMentors);
router.get('/mentor/email/:email', mentorController.getMentorByEmail);
router.get('/profile', authMiddleware, mentorController.fetchMentorProfile);
router.put('/profile', authMiddleware, mentorController.updateMentorProfile);
router.delete('/profile', authMiddleware, mentorController.deleteMentorProfile);

// Catch-all param route LAST
router.get('/:name', mentorController.getMentorByName);

module.exports = router;
