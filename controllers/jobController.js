const EmployerModel = require("../models/EmployerModel");
const jobModel = require("../models/jobModel");

const postJob = async (req,res,next)=>{
    try {
        const userId = req.user?._id
        const job = await jobModel.create({...req.body, postedBy: userId});
        if(!job){
            return res.status(400).json({
                message: "job not posted",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "job has been posted successfully",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const deleteJob = async (req,res,next)=>{
    try {
        const {id} = req.params
        const job = await jobModel.findByIdAndUpdate(id);
        if(!job){
            return res.status(400).json({
                message: "job not deleted",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "job has been deleted",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const filterJobs = async (req,res,next)=>{
    const {type,location,salary,workType} = req.query;
    try {
        const filteredJobs = await jobModel.find({type: type,location: location,salary: salary,workType: workType})
        if(!filteredJobs){
            return res.status(400).json({
                message: "No job found with the filter",
                status: "error"
            })
        }
        return res.status(200).json(filteredJobs);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const updateJob = async (req,res,next)=>{
    try {
        const job = await jobModel.findByIdAndUpdate({...req.body});
        if(!job){
            return res.status(400).json({
                message: "job not updated",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "job has been updated",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

const getAllJobs = async (req,res,next)=>{
    try {
        const jobs = await jobModel.find({status: "active"}).populate("postedBy")
        if(!jobs){
            return res.status(400).json({
                message: "No jobs found",
                status: "error"
            })
        }
        return res.status(200).json(jobs);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get the job and populate the 'postedBy' field (User)
    const job = await jobModel.findById(id).populate('postedBy');

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        status: "error"
      });
    }

    // Get the employer details using postedBy (User)
    const employer = await EmployerModel.findOne({ userId: job.postedBy?._id});

    // Optional: add employer details (like companyName) to the job response
    const jobWithCompany = {
      ...job._doc,
      companyName: employer?.companyName || "Unknown Company",
      companyWebsite: employer?.companyWebsite || null,
      companyLogoUrl: employer?.companyLogoUrl || null,
    };

    return res.status(200).json(jobWithCompany);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports = {
    postJob,
    deleteJob,
    updateJob,
    getAllJobs,
    getJobById,
    filterJobs
}