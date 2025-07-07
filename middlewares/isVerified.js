const isVerified = async (req,res,next)=>{
    const user = req.user;
    if (user.isVerified) {
        res.status(403).json({
            message: "please be verified before adding product",
            status: "error"
        })
    }
    res.status(200).json({
        message: "You are now verified",
        status: "success"
    })
    next()
}
module.exports = isVerified;