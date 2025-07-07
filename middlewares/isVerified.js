const isVerified = async (req,res,next)=>{
    const user = req.user;
    if (user.isVerified) {
        return res.status(403).json({
            message: "please be verified before posting or applying for jobs",
            status: "error"
        })
    }
    next()
}
module.exports = isVerified;