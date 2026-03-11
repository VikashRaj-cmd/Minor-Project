const express = require('express');
const { createEvent, getAllEvents, registerForEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEvent);
router.get('/', protect, getAllEvents);
router.post('/:id/register', protect, registerForEvent);

module.exports = router;
