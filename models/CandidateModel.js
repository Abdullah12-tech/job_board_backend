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
    headline: {
        type: String,
        maxlength: [120, 'Headline cannot be more than 120 characters']
    },
    portfolio: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid URL']
    },
    linkedin: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid URL']
    },
    github: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid URL']
    },
    resume: {
        url: String,
        publicId: String
    },
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
        description: String
    }],
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        current: Boolean,
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

// Optimized indexes
candidateSchema.index({ skills: 1 });
candidateSchema.index({ status: 1 });
candidateSchema.index({ preferredJobTypes: 1 });
candidateSchema.index({ preferredLocations: 1 });

const CandidateModel = mongoose.model("candidates", candidateSchema);
module.exports = CandidateModel;