// adminRoutes.js
const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");
const { 
    fetchAllUsers,
    fetchUserById,
    getDashboardStats,
    updateUser,
    deleteUser,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getAllCompanies,
    approveCompany,
    rejectCompany
 } = require("../controllers/adminController");

const adminRouter = express.Router();

// Dashboard
adminRouter.get('/dashboard/stats', isLoggedIn, isAdmin, getDashboardStats);

// User Management
adminRouter.get('/users', isLoggedIn, isAdmin, fetchAllUsers);
adminRouter.get('/users/:id', isLoggedIn, isAdmin, fetchUserById);
adminRouter.put('/users/:id', isLoggedIn, isAdmin, updateUser);
adminRouter.delete('/users/:id', isLoggedIn, isAdmin, deleteUser);

// Job Management
adminRouter.get('/jobs', isLoggedIn, isAdmin, getAllJobs);
adminRouter.get('/jobs/:id', isLoggedIn, isAdmin, getJobById);
adminRouter.put('/jobs/:id', isLoggedIn, isAdmin, updateJob);
adminRouter.delete('/jobs/:id', isLoggedIn, isAdmin, deleteJob);

// Company Management
adminRouter.get('/companies', isLoggedIn, isAdmin, getAllCompanies);
adminRouter.put('/companies/:id/approve', isLoggedIn, isAdmin, approveCompany);
adminRouter.put('/companies/:id/reject', isLoggedIn, isAdmin, rejectCompany);

module.exports = adminRouter;