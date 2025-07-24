const isAdmin = async (req,res,next)=>{
    const user = req.user;
    if (user.role !== "admin") {
        return res.status(403).json({
            message: "You must be an admin",
            status: "error"
        })
    }
    next()
}
module.exports = isAdmin