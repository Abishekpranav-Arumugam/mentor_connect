//backend\controllers\menteeController.js
const Mentee = require('../models/Mentee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Mentee
exports.registerMentee = async (req, res) => {
  const { name, email, password, fullName, dateOfBirth, gender, highestQualification, currentStatus, schoolOrCompany } = req.body;

  try {
    const existingMentee = await Mentee.findOne({ email });
    if (existingMentee) return res.status(400).json({ message: 'Mentee already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const mentee = new Mentee({
      name,
      email,
      password: hashedPassword,
      fullName,
      dateOfBirth,
      gender,
      highestQualification,
      currentStatus,
      schoolOrCompany
    });

    await mentee.save();
    res.status(201).json({ message: 'Mentee registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Error registering mentee', error });
  }
};

// Login Mentee
exports.loginMentee = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mentee = await Mentee.findOne({ email });
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });

    const isPasswordValid = await bcrypt.compare(password, mentee.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign({ id: mentee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Fetch Mentee Profile
exports.fetchMenteeProfile = async (req, res) => {
  try {
    const mentee = await Mentee.findById(req.user.id).select('-password');
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });
    res.json(mentee);
  } catch (error) {
    console.error('Error fetching mentee profile:', error.message);
    res.status(500).json({ message: 'Error fetching mentee profile', error });
  }
};

// Update Mentee Profile
exports.updateMenteeProfile = async (req, res) => {
  try {
    const updates = (({ fullName, dateOfBirth, gender, highestQualification, currentStatus, schoolOrCompany }) => ({ fullName, dateOfBirth, gender, highestQualification, currentStatus, schoolOrCompany }))(req.body);
    const mentee = await Mentee.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!mentee) return res.status(404).json({ message: 'Mentee not found' });
    res.json({ success: true, message: 'Profile updated successfully', mentee });
  } catch (error) {
    console.error('Error updating mentee profile:', error.message);
    res.status(500).json({ message: 'Error updating mentee profile', error });
  }
};