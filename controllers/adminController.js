// adminController.js

const CandidateModel = require("../models/CandidateModel");
const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");


// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalJobs = await jobModel.countDocuments();
    const totalCompanies = await EmployerModel.countDocuments();
    const pendingCompanies = await EmployerModel.countDocuments({ status: 'pending' });
    const activeJobs = await jobModel.countDocuments({ status: 'active' });
    
    const stats = {
      totalUsers,
      totalJobs,
      totalCompanies,
      pendingCompanies,
      activeJobs,
      recentUsers: await userModel.find().sort({ createdAt: -1 }).limit(5),
      recentJobs: await jobModel.find().sort({ createdAt: -1 }).limit(5)
    };
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Management
const fetchAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;
    
    const user = await userModel.findByIdAndUpdate(
      id, 
      { role, status },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete associated profile based on role
    if (user.role === 'employer') {
      await EmployerModel.findOneAndDelete({ userId: user._id });
    } else if (user.role === 'candidate') {
      await CandidateModel.findOneAndDelete({ userId: user._id });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Job Management
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobModel.find().populate('postedBy', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { status, flagged } = req.body;
    const job = await jobModel.findByIdAndUpdate(
      req.params.id,
      { status, flagged },
      { new: true }
    ).populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await jobModel.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Company Management
const getAllCompanies = async (req, res) => {
  try {
    const companies = await EmployerModel.find({ status: 'pending' })
      .populate('userId', 'name email');
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveCompany = async (req, res) => {
  try {
    const company = await EmployerModel.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Also update user role to employer if not already
    await userModel.findByIdAndUpdate(company?.userId, { role: 'employer' });
    
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectCompany = async (req, res) => {
  try {
    const company = await EmployerModel.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    rejectCompany,
    approveCompany,
    getAllCompanies,
    deleteJob,
    updateJob,
    getJobById,
    getAllJobs,
    deleteUser,
    updateUser,
    fetchUserById,
    fetchAllUsers,
    getDashboardStats
}