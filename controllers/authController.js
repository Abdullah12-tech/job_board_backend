const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const sendVerificationEmail = require("../services/nodemailer/sendMail");
const randomGenerate = require("../utils/randomGenerate");
const sendPasswordResetEmail = require("../services/nodemailer/passResetMail");
const CandidateModel = require("../models/CandidateModel");
const EmployerModel = require("../models/EmployerModel");
const mongoose = require("mongoose");
const signUp = async (req, res, next) => {
    const { password, email, name, role, ...details } = req.body;
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start a transaction

    try {
        const salt = await bcrypt.genSalt(10);
        const token = randomGenerate(8);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationExp = Date.now() + 3000000;

        // Check if email already exists before creating anything
        const existingUser = await userModel.findOne({ email }).session(session);
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                status: "error",
                message: "Email already exists"
            });
        }

        // Create user within the transaction
        const user = await userModel.create([{
            ...req.body,
            password: hashedPassword,
            verificationToken: token,
            verificationExp: verificationExp,
            role
        }], { session });

        // Create role-specific profile within the same transaction
        if (role === "candidate") {
            await CandidateModel.create([{ userId: user[0]._id, ...details }], { session });
        } else if (role === "employer") {
            await EmployerModel.create([{ userId: user[0]._id, ...details }], { session });
        }

        // If everything succeeds, commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Send verification email (outside transaction)
        const userFirstName = name.split(" ")[0];
        await sendVerificationEmail(email, userFirstName, token);

        return res.status(201).json({
            status: "success",
            message: "Signup successful"
        });

    } catch (err) {
        // If any error occurs, abort the transaction
        await session.abortTransaction();
        session.endSession();
        next(err); // Forward to error handler
    }
};



const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Account is already verified" });
    }

    // Generate new token and expiration
    const token = randomGenerate(8);
    const verificationExp = Date.now() + 3000000; // 50 minutes
    
    // Update user with new token
    user.verificationToken = token;
    user.verificationExp = verificationExp;
    await user.save();

    // Send verification email
    const userFirstName = user.name.split(" ")[0];
    await sendVerificationEmail(email, userFirstName, token);

    res.status(200).json({ 
      message: "Verification email resent successfully" 
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const verifyEmail = async (req, res, next) => {
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



const findEmail = async (req, res, next) => {
    const { email } = req.body
    const token = randomGenerate(8)
    const tokenExpire = Date.now() + 3000000
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            res.status(401).json({
                message: "Email does not exist",
                status: "error"
            })
        }

        const userFirstName = user?.name.split(" ")[0]
        await userModel.findByIdAndUpdate(user._id, {
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
const fetchCurrentUser = async (req, res, next) => {
    try {
        const userId = req?.user?._id;
        const user = await userModel.findById(userId).select("name email role")
        if (!user) {
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

const verifyPasswordReset = async (req, res, next) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.findOne({ verificationToken: token });
        if (!user) {
            return res.status(401).json({
                message: "Invalid token",
                status: "error"
            })
        }

        if (user.verificationExp < Date.now()) {
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

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Add .select('+password') to include the hidden password field
        const user = await userModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).json({
                message: "Email or password incorrect",
                status: "error"
            });
        }

        // Add check for missing password
        if (!user.password) {
            return res.status(400).json({
                message: "Account not properly set up. Please reset your password.",
                status: "error"
            });
        }

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: "error"
            })
        }
        if (!user.isVerified) {
            return res.status(400).json({
                message: "Email not verified",
                status: "error"
            })
        }
        const accessToken = jwt.sign({ email: user.email, role: user.role, id: user._id }, process.env.jwt_secret, {
            expiresIn: process.env.jwt_expires
        })

        return res.status(201).json({
            message: "Logged in successful",
            status: "success",
            accessToken,
            user
        })
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signUp,
    login,
    verifyEmail,
    findEmail,
    resendVerification,
    verifyPasswordReset,
    fetchCurrentUser
}