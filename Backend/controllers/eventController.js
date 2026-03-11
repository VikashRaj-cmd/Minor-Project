const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user._id });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.registeredUsers.includes(req.user._id)) {
      event.registeredUsers.push(req.user._id);
      await event.save();
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
