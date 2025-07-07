const jobModel = require("../models/jobModel");

const postJob = async (req,res,next)=>{
    try {
        const job = await jobModel.create(req.body);
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
        const jobs = await jobModel.find();
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
const getJobById = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const job = await jobModel.findById(id);
        if(!job){
            return res.status(400).json({
                message: "job not found",
                status: "error"
            })
        }
        return res.status(200).json(job);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports = {
    postJob,
    deleteJob,
    updateJob,
    getAllJobs,
    getJobById
}