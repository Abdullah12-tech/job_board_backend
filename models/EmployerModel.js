const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        trim: true
    },
    companyEmail: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    companyWebsite: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid website URL']
    },
    location: {
        type: String,
    },
    companyLinkedin: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please fill a valid URL']
    },
    companyDescription: {
        type: String,
        minlength: [50, 'Description should be at least 50 characters']
    },
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    },
    phone: {
        type: String,
    },
    industry: {
        type: String,
    },
    companyLogo: {
        url: String,
        publicId: String
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'suspended'],
        default: 'pending'
    },
    verification: {
        isVerified: {
            type: Boolean,
            default: false
        },
        documents: [{
            type: { type: String },
            url: String,
            publicId: String
        }]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Optimized indexes
// employerSchema.index({ companyName: 'text', companyDescription: 'text' });
// employerSchema.index({ status: 1 });
// employerSchema.index({ industry: 1 });
// employerSchema.index({ location: 1 });

const EmployerModel = mongoose.model("employers", employerSchema);
module.exports = EmployerModel;