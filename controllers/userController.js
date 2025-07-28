const CandidateModel = require("../models/CandidateModel");
const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");
const userModel = require("../models/userModel");


const getAllEmployers = async (req, res, next) => {
    try {
        const employers = await EmployerModel.find() // Only approved employers
            .populate({
                path: 'userId',
                select: 'name email role',
                match: { role: 'employer' }
            })
        const jobs = await jobModel.find({postedBy: employers?.userId?._id});

        if (!employers || employers.length === 0) {
            return res.status(404).json({
                message: "No employers found",
                status: "error"
            });
        }

        const formattedEmployers = employers.map(employer => ({
            _id: employer._id,
            name: employer?.companyName,
            email: employer.userId?.email || employer.companyEmail,
            website: employer.companyWebsite,
            logo: employer.companyLogo?.url || 'https://placeholder.com/200x200',
            location: employer.location,
            industry: employer.industry,
            description: employer.companyDescription,
            jobsCount: jobs?.length || 0,
            companySize: employer.companySize,
            linkedin: employer.companyLinkedin
        }));

        return res.status(200).json({
            data: formattedEmployers,
            status: "success"
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getEmployerById = async (req, res, next) => {
    const {id} = req.params
    try {
        const employer = await EmployerModel.findById(id)
            .populate({
                path: 'userId',
                select: 'name email role'
            })
        const jobs = await jobModel.findOne({postedBy: employer?.userId?._id}).select('title description salary location type createdAt');

        if (!employer) {
            return res.status(404).json({
                message: "Employer not found",
                status: "error"
            });
        }

        const formattedEmployer = {
            _id: employer._id,
            name: employer?.companyName,
            email: employer.userId?.email || employer.companyEmail,
            website: employer.companyWebsite,
            logo: employer.companyLogo?.url || 'https://placeholder.com/200x200',
            location: employer.location,
            industry: employer.industry,
            description: employer.companyDescription,
            jobs: jobs || [],
            companySize: employer.companySize,
            linkedin: employer.companyLinkedin,
            phone: employer.phone,
            isVerified: employer.verification?.isVerified || false
        };

        return res.status(200).json({
            data: formattedEmployer,
            status: "success"
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
const getCandidateById = async (req, res, next) => {
  try {
    const candidateId = req.params.id;
    
    // Find the candidate document
    const candidate = await CandidateModel.findOne({ userId: candidateId })
      .populate("userId", 'name email profilePicture role')
      .lean();
    
    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
        status: "error"
      });
    }

    return res.status(200).json({
      data: candidate,
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
    deleteUser,
    fetchUserById,
    fetchAllUsers,
    getAllCandidates,
    getAllEmployers,
    getEmployerById,
    getCandidateById
}