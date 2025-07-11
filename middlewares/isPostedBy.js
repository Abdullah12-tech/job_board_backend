const jobModel = require("../models/jobModel");

const isPostedBy = async (req,res,next)=>{
    try {
        const user = req.user;
        const jobPosted = await jobModel.find({postedBy: user._id});
        if(!jobPosted){
            return res.status(400).json({
                message: "This job is not posted by you",
                status: "error"
            })
        } 
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports = isPostedBy