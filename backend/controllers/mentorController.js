// backend/controllers/mentorController.js
const Mentor = require('../models/Mentor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Register Mentor
exports.registerMentor = async (req, res) => {
  const { 
    name, 
    email, 
    password, 
    fullName,     
    faculty, 
    phoneNumber, 
    areaInterested, 
    experience, 
    linkedin, 
    calendlyUrl 
  } = req.body;

  try {
    // Check if mentor already exists
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file uploads (Defensive check in case files are missing)
    const idCardPath = req.files && req.files['idCard'] ? req.files['idCard'][0].path : null;
    const resumePath = req.files && req.files['resume'] ? req.files['resume'][0].path : null;

    // Create the mentor object
    const mentor = new Mentor({
      name,
      email,
      password: hashedPassword,
      fullName,
      faculty,
      phoneNumber,
      areaInterested,
      experience,
      linkedin,
      calendlyUrl,
      idCard: idCardPath,
      resume: resumePath,
    });

    // Save the mentor to the database
    await mentor.save();
    res.status(201).json({ message: 'Mentor registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Error registering mentor', error });
  }
};

// 2. Login Mentor
exports.loginMentor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, mentor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, mentorId: mentor._id });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// 3. Fetch Mentor Profile (Private - for the Dashboard)
// UPDATED: Now returns phoneNumber, linkedin, and calendlyUrl
exports.fetchMentorProfile = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.user.id); // req.user.id comes from authMiddleware
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.json({
      fullName: mentor.fullName,
      email: mentor.email,
      faculty: mentor.faculty,
      experience: mentor.experience,
      areaInterested: mentor.areaInterested,
      phoneNumber: mentor.phoneNumber, // Added
      linkedin: mentor.linkedin,       // Added
      calendlyUrl: mentor.calendlyUrl  // Added
    });
  } catch (error) {
    console.error('Error fetching mentor profile:', error.message);
    res.status(500).json({ message: 'Error fetching mentor profile', error });
  }
};

// 4. Update Mentor Profile (Private)
// UPDATED: Now accepts and updates phoneNumber, linkedin, and calendlyUrl
exports.updateMentorProfile = async (req, res) => {
  const { 
    fullName, 
    email, 
    faculty, 
    experience, 
    areaInterested,
    phoneNumber,  // Added
    linkedin,     // Added
    calendlyUrl   // Added
  } = req.body;
  
  try {
    const mentor = await Mentor.findByIdAndUpdate(req.user.id, {
      fullName,
      email,
      faculty,
      experience,
      areaInterested,
      phoneNumber,
      linkedin,
      calendlyUrl
    }, { new: true }); // {new: true} returns the updated document

    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.json({ success: true, message: 'Profile updated successfully', mentor });
  } catch (error) {
    console.error('Error updating mentor profile:', error.message);
    res.status(500).json({ message: 'Error updating mentor profile', error });
  }
};

// 5. Delete Mentor Profile (Private)
exports.deleteMentorProfile = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.user.id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    res.json({ success: true, message: 'Mentor profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor profile:', error.message);
    res.status(500).json({ message: 'Error deleting mentor profile', error });
  }
};

// 6. Fetch All Mentors (Public/Student View)
exports.fetchAllMentors = async (req, res) => {
  try {
    // Select specific fields to show in the directory
    const mentors = await Mentor.find({}, 'fullName email faculty experience areaInterested calendlyUrl linkedin');
    res.json(mentors);
  } catch (error) {
    console.error('Error fetching mentors:', error.message);
    res.status(500).json({ message: 'Error fetching mentors', error });
  }
};

// 7. Get Mentor by Email (Public/Specific View)
exports.getMentorByEmail = async (req, res) => {
  const { email } = req.params;
  try {
      const mentor = await Mentor.findOne({ email });

      if (!mentor) {
          return res.status(404).json({ message: 'Mentor not found' });
      }

      // Exclude password from the response
      const { password, ...mentorDetails } = mentor.toObject();
      res.json(mentorDetails);
  } catch (error) {
      console.error('Error fetching mentor details:', error.message);
      res.status(500).json({ message: 'Error fetching mentor details', error });
  }
};

// 8. Get Mentor by Name (Public/Specific View)
exports.getMentorByName = async (req, res) => {
  const { name } = req.params;

  try {
    const mentor = await Mentor.findOne({ name });
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    // Exclude sensitive data like password
    const { password, ...mentorDetails } = mentor.toObject();
    res.status(200).json(mentorDetails);
  } catch (error) {
    console.error('Error fetching mentor by name:', error.message);
    res.status(500).json({ message: 'Error fetching mentor', error });
  }
};