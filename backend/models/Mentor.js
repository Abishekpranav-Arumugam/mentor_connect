// backend/models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  faculty: String,
  phoneNumber: String,
  areaInterested: String,
  experience: String,
  linkedin: String,
  calendlyUrl: String, 
  idCard: String,
  resume: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Mentor', mentorSchema);
