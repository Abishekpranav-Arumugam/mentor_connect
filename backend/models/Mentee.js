//backend\models\Mentee.js

const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  highestQualification: String,
  currentStatus: String, // Student, UG, PG, Employee, etc.
  schoolOrCompany: String,
}, {
  timestamps: true,  // Automatically create createdAt and updatedAt fields
});

module.exports = mongoose.model('Mentee', menteeSchema);
