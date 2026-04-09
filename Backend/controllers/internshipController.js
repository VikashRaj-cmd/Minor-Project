const Internship = require('../models/Internship');

exports.createInternship = async (req, res) => {
  try {
    const internship = await Internship.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate('postedBy', 'name company');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyForInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Job not found' });
    if (!internship.applicants.includes(req.user._id)) {
      internship.applicants.push(req.user._id);
      await internship.save();
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
