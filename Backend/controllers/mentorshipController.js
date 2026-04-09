const Mentor = require('../models/Mentor');

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
