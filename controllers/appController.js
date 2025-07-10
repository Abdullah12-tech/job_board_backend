const appModel = require("../models/appModel");

const getAllAppicationsForCurrentUser = async (req,res,next)=>{
    try {
        const user = req.user;
        const applications = await appModel.find({applicants: user._id});
        if(!applications){
            return res.status(400).json({
                message: "No application found this user",
                status: "error"
            })
        }
        return res.status(200).json(applications);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const applyJob = async (req,res,next)=>{
    if(!req.file){
        return res.status(400).json({
            message: "file not found"
        })
    }
    const resume = req.file.path;
    try {
        const {jobID} = req.params
        const application = await appModel.create({...req.body,resume: resume,applicants: req.user._id, jobID: jobID});
        if(!application){
            return res.status(400).json({
                message: "Application not submitted successfully",
                status: "error"
            })
        }
        return res.status(200).json({
            message: "Application has been sent",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAllAppicationsForCurrentUser,
    applyJob
}