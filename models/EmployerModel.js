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
    companyWebsite: {
        type: String,
        required: true
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

module.exports = mongoose.model("employers", employerSchema);
