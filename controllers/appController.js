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

module.exports = {
    getAllAppicationsForCurrentUser
}