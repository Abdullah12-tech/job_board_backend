const MiddlewareOne = (req,res,next)=>{
console.log("MiddlewareOne");
next()
}
module.exports = MiddlewareOne