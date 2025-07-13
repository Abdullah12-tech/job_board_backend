const isCandidate = async (req,res,next)=>{
    const user = req.user;
    if (user.role !== "candidate") {
        return res.status(403).json({
            message: "You must be a candidate before applying for jobs",
            status: "error"
        })
    }
    next()
}
module.exports = isCandidate