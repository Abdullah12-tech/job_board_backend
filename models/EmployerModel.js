const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
    },
    companyWebsite: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    companyLinkedin: {
        type: String
    },
    companyDescription: {
        type: String
    },
    companySize: {
        type: String
    },
    phone: {
        type: String,
    },
    industry: {
        type: String
    },
    companyLogoUrl: {
        type: String
    }, // if uploading logo

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const EmployerModel = mongoose.model("employers", employerSchema);
module.exports = EmployerModel
