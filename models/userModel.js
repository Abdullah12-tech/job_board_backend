const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    role: {
        type: String,
        enum: ["employer", "candidate", "admin"],
        default: "candidate",
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        select: false
    },
    verificationExpires: {
        type: Date,
        select: false
    },
    lastLogin: {
        type: Date
    },
    status: {
        type: String,
        enum: ["active", "suspended", "deleted"],
        default: "active"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Optimized indexes
userSchema.index({ role: 1, status: 1 });
userSchema.index({ isVerified: 1 });

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;