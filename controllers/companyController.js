const EmployerModel = require("../models/EmployerModel");


const getProfile = async (req, res,next) => {
  try {
    // Assuming userId is passed via auth middleware or query for simplicity
    const userId = req?.user?._id; // Replace with actual userId from auth
    const profile = await EmployerModel.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    // Map fields to match frontend expectations
    const mappedProfile = {
      companyName: profile.companyName,
      website: profile.companyWebsite,
      linkedin: profile.companyLinkedin,
      description: profile.companyDescription,
      industry: profile.industry,
      companySize: profile.companySize,
      location: profile.location || 'Remote',
      phone: profile.phone || '',
      email: profile.companyEmail,
      companyLogoUrl: profile.companyLogoUrl
    };
    res.json(mappedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    next(error);
  }
};

const updateProfile = async (req, res,next) => {
  try {
    const userId = req?.user?._id // Replace with actual userId from auth
    const profileData = {
      companyName: req.body.companyName,
      companyWebsite: req.body.website,
      companyLinkedin: req.body.linkedin,
      companyDescription: req.body.description,
      industry: req.body.industry,
      companySize: req.body.companySize,
      location: req.body.location,
      phone: req.body.phone,
      companyEmail: req.body.email,
      companyLogoUrl: req.body.companyLogoUrl
    };
    const profile = await EmployerModel.findOneAndUpdate(
      { userId },
      profileData,
      { new: true, upsert: true }
    );
    const mappedProfile = {
      companyName: profile.companyName,
      website: profile.companyWebsite,
      linkedin: profile.companyLinkedin,
      comapanyDescription: profile.companyDescription,
      industry: profile.industry,
      companySize: profile.companySize,
      location: profile.location,
      phone: profile.phone,
      email: profile.companyEmail,
      companyLogoUrl: profile.companyLogo
    };
    res.json({ message: 'Profile updated successfully', profile: mappedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    next(error);
  }
};

module.exports = {
    getProfile,
    updateProfile
}