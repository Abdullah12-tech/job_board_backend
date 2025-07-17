const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const sendVerificationEmail = require("../services/nodemailer/sendMail");
const randomGenerate = require("../utils/randomGenerate");
const sendPasswordResetEmail = require("../services/nodemailer/passResetMail");
const CandidateModel = require("../models/CandidateModel");
const EmployerModel = require("../models/EmployerModel");
const signUp = async (req, res,next) => {
    const { password, email, name,role,...details } = req.body;
    try {
        const salt = await bcrypt.genSalt(10)
        const token = randomGenerate(8);
        const hashedPassword = await bcrypt.hash(password, salt)
        const verificationExp = Date.now() + 3000000
        const user = await userModel.create({ ...req.body, password: hashedPassword, verificationToken: token, verificationExp: verificationExp,role })
        if(role === "candidate"){
            await CandidateModel.create({userId: user._id, ...details})
        }else if(role === "employer"){
            await EmployerModel.create({userId: user._id, ...details})
        }
        const userFirstName = name.split(" ")[0]
        sendVerificationEmail(email, userFirstName, token)
        return res.status(201).json({
            status: "success",
            message: "signup successful",
            user
        })

    } catch (err) {
        console.log(err);
        next(err)
    }
}

const verifyEmail = async (req, res,next) => {
    const { token } = req.params;
    try {
        const user = await userModel.findOne({ verificationToken: token })
        if (!user) {
            return res.status(403).json({
                message: "The token is invalid or has been verified"
            })
        }
        if (user.verificationExp < Date.now()) {
            return res.status(403).json({
                message: "Token has expired"
            })
        }

        await userModel.findByIdAndUpdate(user._id, { 
            isVerified: true,
            verificationToken: null,
            verificationExp: null
         })
        return res.status(200).json({
            message: "Email has been verified",
            token
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}



const findEmail = async (req,res,next)=>{
    const {email} = req.body
    const token = randomGenerate(8)
    const tokenExpire = Date.now() + 3000000
    try {
        const user = await userModel.findOne({email: email})
        if (!user) {
            res.status(401).json({
                message: "Email does not exist",
                status: "error"
            })
        }
        
        const userFirstName = user?.name.split(" ")[0]
        await userModel.findByIdAndUpdate(user._id,{
            verificationToken: token,
            verificationExp: tokenExpire,
        })
        sendPasswordResetEmail(user.email, userFirstName, token)
        res.status(200).json({
            message: "Password Reset Email has been sent to you",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}
const fetchCurrentUser = async (req,res,next)=>{
    try {
        const userId = req?.user?._id;
        const user = await userModel.findById(userId).select("name email role")
        if(!user){
            return res.status(400).json({
                message: "User not found",
                status: "error"
            })
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const verifyPasswordReset = async (req,res,next)=>{
    const {token} = req.params
    const {password} = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.findOne({verificationToken: token});
        if (!user) {
            return res.status(401).json({
                message: "Invalid token",
                status: "error"
            })
        }

        if (user.verificationExp < Date.now() ) {
            return res.status(403).json({
                message: "Token has expired",
                status: "error"
            })
        }
        await userModel.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            verificationToken: null,
            verificationExp: null
        })

        return res.status(200).json({
            message: "You password has been changed",
            status: "success"
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

const login = async (req, res,next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Email or password incorrect",
                status: "error"
            })
        }
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: "error"
            })
        }
        if(!user.isVerified){
            return res.status(400).json({
                message: "Email not verified",
                status: "error"
            })
        }
        const accessToken = jwt.sign({ email: user.email,role: user.role, id: user._id }, process.env.jwt_secret, {
            expiresIn: process.env.jwt_expires
        })

        return res.status(201).json({
            message: "Logged in successful",
            status: "success",
            accessToken,
            user
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = {
    signUp,
    login,
    verifyEmail,
    findEmail,
    verifyPasswordReset,
    fetchCurrentUser
}