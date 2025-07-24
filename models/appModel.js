const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
    applicant: {  // Changed from "applicants" to "applicant" since it's a single reference
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    status: {
        type: String,
        enum: ['applied', 'viewed', 'shortlisted', 'interviewing', 'hired', 'rejected', 'withdrawn'],
        default: 'applied'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    resume: {
        type: String,
        required: [true, "Resume is required"]
    },
    coverLetter: {
        type: String
    },
    job: {  // Changed from "jobID" to "job" for consistency
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true
    },
    notes: {
        type: String
    },
    feedback: {
        type: String
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add indexing for better query performance
appSchema.index({ applicant: 1 });
appSchema.index({ job: 1 });
appSchema.index({ status: 1 });

const appModel = mongoose.model("applications", appSchema);
module.exports = appModel;