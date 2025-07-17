const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    skills: {
        type: [String],
        required: true
    },
    headline: {
        type: String
    },
    portfolio: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },

    // You can store resume URL if you add upload later
    resume: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const CandidateModel = mongoose.model("candidates", candidateSchema);
module.exports = CandidateModel
