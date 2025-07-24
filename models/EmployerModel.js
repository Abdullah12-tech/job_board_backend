const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    companyEmail: {
        type: String,
        required: [true, 'Company email is required'],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    companyWebsite: {
        type: String,
        required: [true, 'Company website is required'],
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please fill a valid website URL']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    companyLinkedin: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'Please fill a valid URL']
    },
    companyDescription: {
        type: String,
        required: [true, 'Company description is required'],
        minlength: [50, 'Description should be at least 50 characters']
    },
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
        required: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required']
    },
    logo: {
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

// Indexes
employerSchema.index({ companyName: 'text' });
employerSchema.index({ companyEmail: 1 }, { unique: true });
employerSchema.index({ status: 1 });
employerSchema.index({ industry: 1 });

const EmployerModel = mongoose.model("employers", employerSchema);
module.exports = EmployerModel;