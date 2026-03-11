const express = require('express');
const { createInternship, getAllInternships, applyForInternship } = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createInternship);
router.get('/', protect, getAllInternships);
router.post('/:id/apply', protect, applyForInternship);

module.exports = router;
