const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");
const getAllEmployers = async (req, res, next) => {
    try {
        const employers = await userModel.find({ role: "employer" });
        if (!employers || employers.length === 0) {
            return res.status(404).json({
                message: "No employers found",
                status: "error"
            });
        }

        // Get employer details and jobs for each employer
        const employersWithDetails = await Promise.all(employers.map(async (employer) => {
            const employerDetails = await EmployerModel.findOne({ userId: employer._id })
                .populate("userId", 'name email role');
            const jobsPosted = await jobModel.find({ postedBy: employer._id });
            
            return {
                employer: employerDetails,
                jobs: jobsPosted
            };
        }));

        return res.status(200).json({
            data: employersWithDetails,
            status: "success"
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const getAllCandidates = async (req, res, next) => {
    try {
        const candidates = await userModel.find({ role: "candidate" });
        if (!candidates || candidates.length === 0) {
            return res.status(404).json({
                message: "No candidates found",
                status: "error"
            });
        }

        // Get candidate details for each candidate
        const candidatesWithDetails = await Promise.all(candidates.map(async (candidate) => {
            return await CandidateModel.findOne({ userId: candidate._id })
                .populate("userId", 'name email role');
        }));

        return res.status(200).json({
            data: candidatesWithDetails,
            status: "success"
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
const fetchUserById = async (req, res, next) => {
    const {id} = req.params
    try {
        const user = await userModel.findById(id);
        if(!user){
            return res.status(400).json({
                message: "No user found",
                status:"error"
            })
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}; 
const fetchAllUsers = async (req, res, next) => {
    try {
        const user = await userModel.find().select("-password")
        if(!users){
            return res.status(400).json({
                message: "users not found",
                status:"error"
            })
        }

        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        next(err);
    }
}; 
const deleteUser = async (req,res,next)=>{
    try {
        const userId = req?.user?._id
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(400).json({
                message: "user not deleted",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "User has been deleted",
            status: "error"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAllCandidates,
    getAllEmployers,
    deleteUser,
    fetchUserById,
    fetchAllUsers
}