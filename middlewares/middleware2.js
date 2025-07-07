const MiddlewareTwo = (req,res,next)=>{
    console.log("Middleware Two is running");
    next()
    return res.status(403)
}
module.exports = MiddlewareTwo