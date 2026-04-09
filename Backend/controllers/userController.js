const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ role: 'alumni' }).select('-password');
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const Event = require('../models/Event');
    const Internship = require('../models/Internship');
    const Mentor = require('../models/Mentor');
    const [alumniCount, eventsCount, jobsCount, mentorCount] = await Promise.all([
      User.countDocuments({ role: 'alumni' }),
      Event.countDocuments(),
      Internship.countDocuments(),
      Mentor.countDocuments(),
    ]);
    res.json({ alumniCount, eventsCount, jobsCount, mentorCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
