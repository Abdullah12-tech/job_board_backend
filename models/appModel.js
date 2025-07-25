const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    applicant: {
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
    jobID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    notes: {
        type: String
    },
    feedback: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Optimized indexes
applicationSchema.index({ applicant: 1, job: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ status: 1 });

const appModel = mongoose.model("applications", applicationSchema);
module.exports = appModel;