const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers",
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    hrEmail: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required']
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Volunteer'],
        required: true
    },
    workType: {
        type: String,
        enum: ['On-site', 'Remote', 'Hybrid'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salaryRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "USD"
        },
        period: {
            type: String,
            enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
            default: 'monthly'
        }
    },
    category: {
        type: String,
    },
    benefits: [String],
    requirements: [String],
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'closed', 'archived'],
        default: 'draft'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    applicationsCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Optimized indexes
jobSchema.index({ 
    title: 'text', 
    description: 'text',
    skills: 'text',
    location: 'text'
});
jobSchema.index({ employer: 1, status: 1 });
jobSchema.index({ type: 1, workType: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });

const jobModel = mongoose.model("jobs", jobSchema);
module.exports = jobModel;