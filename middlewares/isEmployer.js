const isEmployer = async (req,res,next)=>{
    const user = req.user;
    if (user.role !== "employer") {
        return res.status(403).json({
            message: "You must be an employer before posting or deleting jobs",
            status: "error"
        })
    }
    next()
}
module.exports = isEmployer