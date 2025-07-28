const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        unique: true
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required'],
        validate: {
            validator: v => v.length > 0,
            message: 'At least one skill is required'
        }
    },
    headline: String,
    portfolio: String,
    linkedin: String,
    github: String,
    resume: {
        url: String,
        publicId: String
    },
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        currentlyStudying: Boolean,
        description: String
    }],
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: Boolean,
        description: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'searching', 'not-searching'],
        default: 'active'
    },
    preferredJobTypes: [String],
    preferredLocations: [String],
    salaryExpectation: {
        amount: Number,
        currency: {
            type: String,
            default: "USD"
        },
        period: {
            type: String,
            enum: ['hourly', 'monthly', 'yearly'],
            default: 'monthly'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
candidateSchema.index({ skills: 1 });
candidateSchema.index({ status: 1 });
candidateSchema.index({ preferredJobTypes: 1 });
candidateSchema.index({ preferredLocations: 1 });

const CandidateModel = mongoose.model("candidates", candidateSchema);
module.exports = CandidateModel;