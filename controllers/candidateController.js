

// Get candidate details by user ID
// candidatesController.js

const CandidateModel = require("../models/CandidateModel");

const updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware
    
    // Find and update candidate profile
    const updatedProfile = await CandidateModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          headline: req.body.headline,
          skills: req.body.skills,
          portfolio: req.body.portfolio,
          linkedin: req.body.linkedin,
          github: req.body.github,
          resume: req.body.resume,
          experiences: req.body.experiences,
          education: req.body.education
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    res.json({
      message: "Profile updated successfully",
      candidate: updatedProfile
    });
  } catch (error) {
    console.error("Error updating candidate profile:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }
    
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

const getCandidateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT middleware
    
    const candidate = await CandidateModel.findOne({ userId })
      .populate('userId', 'name email role'); // Populate user details

    if (!candidate) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    res.json({
      user: {
        name: candidate.userId.name,
        email: candidate.userId.email,
        role: candidate.userId.role
      },
      candidate: {
        ...candidate._doc,
        userId: undefined
      }
    });
  } catch (error) {
    console.error("Error fetching candidate profile:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
};
