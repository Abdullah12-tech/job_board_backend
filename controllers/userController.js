const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");
const getAllEmployers = async (req,res,next)=>{
    try {
        const employers = await userModel.find({role: "employer"});
        if(!employers){
            return res.status(400).json({
                message: "employer not found",
                status: "error"
            })
        }
        const employerDetails = await EmployerModel.find({userId: employers?._id}).populate("userId", 'name email role');
        const jobsPostedByEmployer = await jobModel.find({postedBy: employersDetails?.userId});
        if(!employerDetails){
            return res.status(400).json({
                message: "Employer details not found",
                status: "error"
            })
        }
        return res.status(400).json(employerDetails, jobsPostedByEmployer);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const getAllCandidates = async (req,res,next)=>{
    try {
        const candidates = await userModel.find({role: "candidate"})
        if(!candidates){
            return res.status(400).json({
                message: "No candidate found",
                status: "error"
            })
        }
        const candidateDetails = await CandidateModel.find({userId: candidates?._id}).populate("userId", 'name email role')
        if(!candidateDetails){
            return res.status(400).json({
                message: "candidate details not found",
                status: "error"
            })
        }
        return res.status(400).json(candidateDetails);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
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
    deleteUser
}