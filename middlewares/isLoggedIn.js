const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLoggedIn = async (req,res, next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(403).json({
            status: "error",
            message: "Please provide a token"
        })
    }
    
    const decoded = await jwt.verify(token, process.env.jwt_secret)
    console.log(decoded);
    
    const user = await userModel.findById(decoded.id)
    if (!user) {
        return res.status(403).json({
            status: "error",
            message: "This token belong to no one"
        })
    }
    req.user = user
    next()
}

module.exports = isLoggedIn