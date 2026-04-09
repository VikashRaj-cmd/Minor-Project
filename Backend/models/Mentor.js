const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  company: { type: String, required: true },
  batch: { type: String, required: true },
  expertise: [{ type: String }],
  experience: { type: String, required: true },
  sessions: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
}, { timestamps: true });

module.exports = mongoose.model('Mentor', mentorSchema);
