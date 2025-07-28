

// Get candidate details by user ID
// candidatesController.js

const CandidateModel = require("../models/CandidateModel");

const updateCandidateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    
    // Transform experience data
    const experiences = req.body.experiences?.map(exp => ({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate ? new Date(exp.startDate) : null,
      endDate: exp.currentlyWorking ? null : (exp.endDate ? new Date(exp.endDate) : null),
      currentlyWorking: exp.currentlyWorking || false,
      description: exp.description || ''
    })) || [];

    // Transform education data
    const education = req.body.education?.map(edu => ({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: edu.startDate ? new Date(edu.startDate) : null,
      endDate: edu.currentlyStudying ? null : (edu.endDate ? new Date(edu.endDate) : null),
      currentlyStudying: edu.currentlyStudying || false,
      description: edu.description || ''
    })) || [];

    const updatedProfile = await CandidateModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          headline: req.body.headline,
          skills: req.body.skills,
          experiences,
          education,
          // Include other fields as needed
        }
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email role');

    if (!updatedProfile) {
      return res.status(404).json({ 
        success: false,
        message: "Candidate profile not found" 
      });
    }

    // Format dates for frontend
    const formattedResponse = {
      ...updatedProfile.toObject(),
      userId: undefined,
      experiences: updatedProfile.experiences.map(exp => ({
        ...exp,
        startDate: exp.startDate?.toISOString().split('T')[0],
        endDate: exp.endDate?.toISOString().split('T')[0],
        currentlyWorking: exp.currentlyWorking
      })),
      education: updatedProfile.education.map(edu => ({
        ...edu,
        startDate: edu.startDate?.toISOString().split('T')[0],
        endDate: edu.endDate?.toISOString().split('T')[0],
        currentlyStudying: edu.currentlyStudying
      }))
    };

    res.json({
      success: true,
      message: "Profile updated successfully",
      candidate: formattedResponse
    });

  } catch (error) {
    console.error("Error updating candidate profile:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error while updating profile"
    });
  }
};

const getCandidateProfile = async (req, res) => {
  try {
    const userId = req.user?.id; // Using optional chaining for safety
    
    const candidate = await CandidateModel.findOne({ userId })
      .populate('userId', 'name email role')
      .lean(); // Add .lean() for better performance

    if (!candidate) {
      return res.status(404).json({ 
        message: "Candidate profile not found",
        success: false
      });
    }

    // Safely handle potentially undefined arrays
    const formattedExperiences = candidate.experiences?.map(exp => ({
      ...exp,
      startDate: exp.startDate?.toISOString().split('T')[0] || null,
      endDate: exp.endDate?.toISOString().split('T')[0] || null
    })) || []; // Fallback to empty array if undefined

    const formattedEducation = candidate.education?.map(edu => ({
      ...edu,
      startDate: edu.startDate?.toISOString().split('T')[0] || null,
      endDate: edu.endDate?.toISOString().split('T')[0] || null
    })) || []; // Fallback to empty array if undefined

    res.json({
      success: true,
      user: {
        name: candidate.userId?.name,
        email: candidate.userId?.email,
        role: candidate.userId?.role
      },
      candidate: {
        ...candidate,
        userId: undefined, // Remove the userId field
        experiences: formattedExperiences,
        education: formattedEducation
      }
    });

  } catch (error) {
    console.error("Error fetching candidate profile:", error);
    res.status(500).json({ 
      message: "Server error while fetching profile",
      success: false,
      error: error.message 
    });
  }
};

module.exports = {
  getCandidateProfile,
  updateCandidateProfile,
};
