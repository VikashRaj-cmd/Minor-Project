const express = require('express');
const { getAllMentors } = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getAllMentors);

module.exports = router;
